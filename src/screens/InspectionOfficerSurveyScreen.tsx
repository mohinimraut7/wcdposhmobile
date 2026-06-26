import React, {useState, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, StatusBar, ActivityIndicator, Alert,
  TextInput, Modal, RefreshControl,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const API_BASE  = 'https://mahaposhact.saavi.co.in/api';
const PINK      = '#CD366B';
const PINK_DARK = '#b82a5c';
const BLUE      = '#2C3D83';
const BLUE_DEEP = '#1d2a60';
const CREAM     = '#FBF3EE';
const GREEN     = '#22c55e';
const RED       = '#ef4444';
const AMBER     = '#f59e0b';

// ── Case Type options (same as web Surveys.jsx) ──
const CASE_OPTIONS = [
  {value: 'case1', label: 'Case 1 — Physical Visit (1st Visit)'},
  {value: 'case2', label: 'Case 2 — Questionnaire Inspection'},
  {value: 'case3', label: 'Case 3 — Re-inspection Notice'},
  {value: 'case4', label: 'Case 4 — Final Inspection (after 15 days)'},
];

const STATUS_OPTIONS: Record<string, {value: string; label: string}[]> = {
  case1: [
    {value: 'compiled',    label: '✓ Compiled — Complied'},
    {value: 'notcompiled', label: '✗ Not Compiled — Non-Compliant'},
    {value: 'pending',     label: '⏳ Pending — Under Review'},
  ],
  case2: [
    {value: 'compiled',    label: '✓ Compiled — Complied'},
    {value: 'notcompiled', label: '✗ Not Compiled — Non-Compliant'},
    {value: 'pending',     label: '⏳ Pending — Under Review'},
  ],
  case3: [
    {value: 'pending',     label: '⏳ Pending — Notice Issued'},
    {value: 'notcompiled', label: '✗ Not Compiled — No Response'},
  ],
  case4: [
    {value: 'compiled',    label: '✓ Compiled — Final Compliance'},
    {value: 'rejected',    label: '✗ Rejected — Permanently Rejected'},
  ],
};

interface Survey {
  submissionid: number;
  orgid:        number;
  orgname:      string;
  orgtype:      string;
  district:     string;
  taluka:       string;
  concernname:  string;
  concernmobile:string;
  submittedat:  string;
}

interface ReviewForm {
  casetype:           string;
  status:             string;
  officername:        string;
  officerdesignation: string;
  finalremark:        string;
  latitude:           number | null;
  longitude:          number | null;
  locationLoading:    boolean;
  locationError:      string;
}

const EMPTY_REVIEW: ReviewForm = {
  casetype:           'case1',
  status:             'compiled',
  officername:        '',
  officerdesignation: 'Inspection Officer',
  finalremark:        '',
  latitude:           null,
  longitude:          null,
  locationLoading:    false,
  locationError:      '',
};

// ── Simple Select Row ──
function SelectRow({
  label, value, options, onSelect,
}: {label: string; value: string; options: {value: string; label: string}[]; onSelect: (v: string) => void}) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  return (
    <View style={{marginBottom: 14}}>
      <Text style={ms.flbl}>{label}</Text>
      <TouchableOpacity style={ms.selectBox} onPress={() => setOpen(!open)}>
        <Text style={ms.selectText} numberOfLines={1}>
          {selected ? selected.label : `Select ${label}`}
        </Text>
        <Text style={ms.selectArrow}>▼</Text>
      </TouchableOpacity>
      {open && (
        <View style={ms.menu}>
          {options.map(o => (
            <TouchableOpacity
              key={o.value}
              style={[ms.menuItem, value === o.value && ms.menuItemActive]}
              onPress={() => {onSelect(o.value); setOpen(false);}}>
              <Text style={[ms.menuText, value === o.value && ms.menuTextActive]}>
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function InspectionOfficerSurveyScreen({navigation}: any) {
  const [surveys, setSurveys]     = useState<Survey[]>([]);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch]       = useState('');
  const [authUser, setAuthUser]   = useState<any>(null);

  // Review modal
  const [reviewSurvey, setReviewSurvey]       = useState<Survey | null>(null);
  const [reviewForm, setReviewForm]           = useState<ReviewForm>(EMPTY_REVIEW);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Detail modal
  const [detailSurvey, setDetailSurvey]   = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Load auth user from storage
  useEffect(() => {
    AsyncStorage.getItem('authUser').then(val => {
      if (val) setAuthUser(JSON.parse(val));
    });
  }, []);

  // Fetch surveys from /surveys API
  const fetchSurveys = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const token = await AsyncStorage.getItem('authToken') || '';
      const res   = await fetch(`${API_BASE}/surveys`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
        },
      });
      const data = await res.json();
      if (data.success) setSurveys(data.data || []);
    } catch (err) {
      Alert.alert('Error', 'Surveys load karnya madhe error aala');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {fetchSurveys();}, []);

  // Fetch survey detail
  const openDetail = async (submissionid: number) => {
    setDetailLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken') || '';
      const res   = await fetch(`${API_BASE}/surveys/${submissionid}`, {
        headers: token ? {Authorization: `Bearer ${token}`} : {},
      });
      const data = await res.json();
      if (data.success) setDetailSurvey({...data, submissionid});
    } catch {
      Alert.alert('Error', 'Detail load karnya madhe error');
    } finally {
      setDetailLoading(false);
    }
  };

  // Open review modal + get geolocation
  const openReviewModal = (survey: Survey) => {
    const officerName =
      authUser?.fullName || authUser?.fullname || authUser?.userName || authUser?.username || '';
    const initial: ReviewForm = {
      ...EMPTY_REVIEW,
      officername:     officerName,
      locationLoading: true,
    };
    setReviewSurvey(survey);
    setReviewForm(initial);

    Geolocation.getCurrentPosition(
      pos => {
        setReviewForm(p => ({
          ...p,
          latitude:        pos.coords.latitude,
          longitude:       pos.coords.longitude,
          locationLoading: false,
          locationError:   '',
        }));
      },
      () => {
        setReviewForm(p => ({
          ...p,
          locationLoading: false,
          locationError:   'Location unavailable — default coordinates use hotil',
          latitude:        0,
          longitude:       0,
        }));
      },
      {timeout: 8000, enableHighAccuracy: false},
    );
  };

  const updateReview = (key: keyof ReviewForm) => (val: string) =>
    setReviewForm(p => ({...p, [key]: val}));

  const handleCasetypeChange = (ct: string) =>
    setReviewForm(p => ({...p, casetype: ct, status: STATUS_OPTIONS[ct][0].value}));

  // Submit review → /officer/report/quick-review
  const handleReviewSubmit = async () => {
    if (!reviewForm.officername.trim())        {Alert.alert('Error', 'Officer Name bhara'); return;}
    if (!reviewForm.officerdesignation.trim()) {Alert.alert('Error', 'Designation bhara'); return;}
    if (!reviewForm.finalremark.trim())        {Alert.alert('Error', 'Remark / Observation bhara'); return;}
    if (reviewForm.locationLoading)            {Alert.alert('Info', 'Location fetch hoto aahe, thamba...'); return;}

    setSubmittingReview(true);
    try {
      const token = await AsyncStorage.getItem('authToken') || '';
      const res   = await fetch(`${API_BASE}/officer/report/quick-review`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
        },
        body: JSON.stringify({
          orgid:              reviewSurvey!.orgid,
          casetype:           reviewForm.casetype,
          status:             reviewForm.status,
          officername:        reviewForm.officername.trim(),
          officerdesignation: reviewForm.officerdesignation.trim(),
          finalremark:        reviewForm.finalremark.trim(),
          latitude:           reviewForm.latitude  ?? 0,
          longitude:          reviewForm.longitude ?? 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        Alert.alert('Success', 'Review submit kelee!', [{
          text: 'OK',
          onPress: () => {setReviewSurvey(null); fetchSurveys();},
        }]);
      } else {
        Alert.alert('Error', data.message || 'Review submit failed');
      }
    } catch {
      Alert.alert('Error', 'Server error');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Logout
  const handleLogout = () => {
    Alert.alert('Logout', 'Logout karnar ahat?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', style: 'destructive', onPress: async () => {
        await AsyncStorage.multiRemove(['authToken', 'authUser']);
        navigation.replace('Login');
      }},
    ]);
  };

  // Filtered surveys
  const filtered = useMemo(() => {
    if (!search.trim()) return surveys;
    const q = search.toLowerCase();
    return surveys.filter(s =>
      (s.orgname || '').toLowerCase().includes(q) ||
      (s.district || '').toLowerCase().includes(q) ||
      (s.concernname || '').toLowerCase().includes(q) ||
      (s.concernmobile || '').includes(q),
    );
  }, [surveys, search]);

  // Status color helper
  const statusColor = (status: string) => {
    if (status === 'compiled')    return {color: '#15803d', bg: 'rgba(34,197,94,0.12)'};
    if (status === 'notcompiled') return {color: '#b91c1c', bg: 'rgba(239,68,68,0.12)'};
    if (status === 'rejected')    return {color: '#b91c1c', bg: 'rgba(239,68,68,0.12)'};
    if (status === 'pending')     return {color: '#b45309', bg: 'rgba(245,158,11,0.12)'};
    return {color: BLUE, bg: 'rgba(44,61,131,0.08)'};
  };

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'}) : '—';

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

      {/* Top Bar */}
      <View style={s.topbar}>
        <View style={s.topbarLeft}>
          <View style={s.topbarIcon}><Text style={{fontSize: 16}}>🛡</Text></View>
          <View>
            <Text style={s.topbarTitle}>WCD Inspection</Text>
            <Text style={s.topbarSub}>Officer: {authUser?.fullName || authUser?.fullname || '—'}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Text style={s.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchSurveys(true)} colors={[PINK]} />}>

        {/* ── Header ── */}
        <View style={s.pageHeader}>
          <View style={s.pageHeaderLeft}>
            <View style={s.pageHeaderIcon}><Text style={{fontSize: 22}}>📋</Text></View>
            <View>
              <Text style={s.pageTitle}>POSH Survey Submissions</Text>
              <Text style={s.pageSubtitle}>Assigned surveys for inspection</Text>
            </View>
          </View>
          <TouchableOpacity style={s.refreshBtn} onPress={() => fetchSurveys(true)}>
            <Text style={s.refreshBtnText}>🔄 Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.statCard}>
            <View style={s.statIcon}><Text style={{fontSize: 18}}>📋</Text></View>
            <Text style={s.statNum}>{filtered.length}</Text>
            <Text style={s.statLabel}>Total Surveys</Text>
          </View>
          <View style={s.statCard}>
            <View style={s.statIcon}><Text style={{fontSize: 18}}>📍</Text></View>
            <Text style={s.statNum}>{new Set(filtered.map(s => s.district)).size}</Text>
            <Text style={s.statLabel}>Districts</Text>
          </View>
          <View style={s.statCard}>
            <View style={s.statIcon}><Text style={{fontSize: 18}}>✅</Text></View>
            <Text style={s.statNum}>34</Text>
            <Text style={s.statLabel}>MH Total</Text>
          </View>
        </View>

        {/* Search */}
        <View style={s.searchWrap}>
          <Text style={{fontSize: 14, paddingHorizontal: 4}}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search org, district, contact..."
            placeholderTextColor="rgba(44,61,131,0.35)"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{fontSize: 14, paddingHorizontal: 8, color: 'rgba(44,61,131,0.4)'}}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Survey List */}
        <View style={s.tableCard}>
          <View style={s.tableHead}>
            <Text style={s.tableHeadTitle}>All Survey Submissions</Text>
            <View style={s.tableCount}>
              <Text style={s.tableCountText}>{filtered.length} records</Text>
            </View>
          </View>

          {loading ? (
            <View style={s.centerBox}>
              <ActivityIndicator color={PINK} size="large" />
              <Text style={s.centerText}>Loading surveys…</Text>
            </View>
          ) : filtered.length === 0 ? (
            <View style={s.centerBox}>
              <Text style={{fontSize: 36, marginBottom: 10}}>📋</Text>
              <Text style={s.centerText}>
                {surveys.length === 0 ? 'Koni survey submit nahi kele abhi.' : 'Filter madhe koni record nahi.'}
              </Text>
            </View>
          ) : (
            filtered.map(sv => (
              <View key={sv.submissionid} style={s.surveyCard}>
                {/* Org Row */}
                <View style={s.orgRow}>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>
                      {(sv.orgname || '?').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={s.orgName} numberOfLines={1}>{sv.orgname || '—'}</Text>
                    <Text style={s.orgType}>{sv.orgtype || '—'}</Text>
                  </View>
                  <Text style={s.dateText}>{formatDate(sv.submittedat)}</Text>
                </View>

                {/* Info Pills */}
                <View style={s.pillsRow}>
                  <View style={s.districtPill}>
                    <Text style={s.districtPillText}>📍 {sv.district || '—'}</Text>
                  </View>
                  {sv.taluka ? (
                    <View style={s.talukaPill}>
                      <Text style={s.talukaPillText}>🏠 {sv.taluka}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Contact */}
                <View style={s.contactRow}>
                  <Text style={s.contactText}>👤 {sv.concernname || '—'}</Text>
                  <Text style={s.contactText}>📱 {sv.concernmobile || '—'}</Text>
                </View>

                {/* Action Buttons */}
                <View style={s.actionRow}>
                  <TouchableOpacity
                    style={s.viewBtn}
                    onPress={() => openDetail(sv.submissionid)}>
                    <Text style={s.viewBtnText}>👁 View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={s.reviewBtn}
                    onPress={() => openReviewModal(sv)}>
                    <Text style={s.reviewBtnText}>📝 Review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>

      {/* ── Detail Modal ── */}
      <Modal visible={!!detailSurvey} animationType="slide" transparent onRequestClose={() => setDetailSurvey(null)}>
        <View style={ms.overlay}>
          <View style={ms.modal}>
            <View style={ms.mhead}>
              <View>
                <Text style={ms.mtitle}>Survey Detail</Text>
                <Text style={ms.msub}>Submission #{detailSurvey?.submissionid}</Text>
              </View>
              <TouchableOpacity style={ms.mclose} onPress={() => setDetailSurvey(null)}>
                <Text style={ms.mcloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {detailLoading ? (
              <View style={ms.centerBox}>
                <ActivityIndicator color={PINK} />
                <Text style={ms.centerText}>Loading…</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Org Info */}
                <Text style={ms.sectionTitle}>ORGANIZATION INFO</Text>
                <View style={ms.infoGrid}>
                  {[
                    ['Org Name',  detailSurvey?.submission?.orgname],
                    ['Org Type',  detailSurvey?.submission?.orgtype],
                    ['District',  detailSurvey?.submission?.district],
                    ['Taluka',    detailSurvey?.submission?.taluka],
                    ['Contact',   detailSurvey?.submission?.concernname],
                    ['Mobile',    detailSurvey?.submission?.concernmobile],
                    ['Submitted', formatDate(detailSurvey?.submission?.submittedat)],
                  ].map(([label, val]) => (
                    <View key={String(label)} style={ms.infoItem}>
                      <Text style={ms.infoLabel}>{label}</Text>
                      <Text style={ms.infoVal}>{val || '—'}</Text>
                    </View>
                  ))}
                </View>

                {/* Answers */}
                <Text style={[ms.sectionTitle, {marginTop: 16}]}>
                  SURVEY ANSWERS ({Object.keys(detailSurvey?.answers || {}).length} questions)
                </Text>
                {Object.entries(detailSurvey?.answers || {}).map(([qid, ans]) => (
                  <View key={qid} style={ms.ansRow}>
                    <Text style={ms.ansQ}><Text style={ms.ansQId}>Q{qid}. </Text>Question {qid}</Text>
                    <View style={[ms.ansBadge, {backgroundColor: ans === 'yes' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}]}>
                      <Text style={[ms.ansBadgeText, {color: ans === 'yes' ? '#15803d' : '#b91c1c'}]}>
                        {ans === 'yes' ? '✓ Yes' : '✗ No'}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* ── Review Modal ── */}
      <Modal visible={!!reviewSurvey} animationType="slide" transparent onRequestClose={() => setReviewSurvey(null)}>
        <View style={ms.overlay}>
          <View style={ms.modal}>
            <View style={ms.mhead}>
              <View>
                <Text style={ms.mtitle}>Survey Review</Text>
                <Text style={ms.msub}>Inspection Officer Report</Text>
              </View>
              <TouchableOpacity style={ms.mclose} onPress={() => setReviewSurvey(null)}>
                <Text style={ms.mcloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {/* Org info box */}
              <View style={ms.orgBox}>
                <Text style={ms.orgBoxName}>{reviewSurvey?.orgname || '—'}</Text>
                <Text style={ms.orgBoxSub}>
                  {reviewSurvey?.district} · {reviewSurvey?.taluka || '—'} · {reviewSurvey?.orgtype || '—'}
                </Text>
              </View>

              {/* Survey submitted badge */}
              <View style={ms.successBadge}>
                <Text style={ms.successBadgeText}>✅ Survey Successfully Submitted</Text>
              </View>

              {/* Case Type */}
              <SelectRow
                label="Case Type"
                value={reviewForm.casetype}
                options={CASE_OPTIONS}
                onSelect={handleCasetypeChange}
              />

              {/* Status */}
              <SelectRow
                label="Inspection Status"
                value={reviewForm.status}
                options={STATUS_OPTIONS[reviewForm.casetype] || []}
                onSelect={val => setReviewForm(p => ({...p, status: val}))}
              />

              {/* Officer Details divider */}
              <View style={ms.divider}>
                <Text style={ms.dividerText}>OFFICER DETAILS</Text>
                <View style={ms.dividerLine} />
              </View>

              {/* Officer Name */}
              <Text style={ms.flbl}>OFFICER NAME</Text>
              <TextInput
                style={ms.textInput}
                placeholder="Full Name"
                placeholderTextColor="rgba(44,61,131,0.35)"
                value={reviewForm.officername}
                onChangeText={updateReview('officername')}
              />

              {/* Designation */}
              <Text style={ms.flbl}>DESIGNATION</Text>
              <TextInput
                style={ms.textInput}
                placeholder="e.g. Inspection Officer"
                placeholderTextColor="rgba(44,61,131,0.35)"
                value={reviewForm.officerdesignation}
                onChangeText={updateReview('officerdesignation')}
              />

              {/* Remark */}
              <Text style={ms.flbl}>REMARK / OBSERVATION</Text>
              <TextInput
                style={[ms.textInput, {height: 90, textAlignVertical: 'top'}]}
                placeholder="Write your observation / remarks here..."
                placeholderTextColor="rgba(44,61,131,0.35)"
                value={reviewForm.finalremark}
                onChangeText={updateReview('finalremark')}
                multiline
              />

              {/* Location Status */}
              {reviewForm.locationLoading ? (
                <View style={[ms.locationBox, ms.locationLoading]}>
                  <ActivityIndicator color={BLUE} size="small" />
                  <Text style={ms.locationText}>📍 Location fetch hoto aahe…</Text>
                </View>
              ) : reviewForm.locationError ? (
                <View style={[ms.locationBox, ms.locationWarning]}>
                  <Text style={ms.locationText}>⚠️ {reviewForm.locationError}</Text>
                </View>
              ) : (
                <View style={[ms.locationBox, ms.locationSuccess]}>
                  <Text style={ms.locationText}>
                    ✅ Location milali — {reviewForm.latitude?.toFixed(4)}, {reviewForm.longitude?.toFixed(4)}
                  </Text>
                </View>
              )}

              {/* Buttons */}
              <View style={ms.btnRow}>
                <TouchableOpacity style={ms.cancelBtn} onPress={() => setReviewSurvey(null)}>
                  <Text style={ms.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    ms.submitBtn,
                    reviewForm.status === 'rejected' && ms.submitBtnReject,
                    (submittingReview || reviewForm.locationLoading) && ms.submitBtnDisabled,
                  ]}
                  onPress={handleReviewSubmit}
                  disabled={submittingReview || reviewForm.locationLoading}>
                  {submittingReview
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={ms.submitBtnText}>
                        {reviewForm.status === 'rejected' ? '✗ Submit Rejection' : '✓ Submit Review'}
                      </Text>}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={s.footer}>
        <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

// ── Screen Styles ──
const s = StyleSheet.create({
  safe:   {flex: 1, backgroundColor: CREAM},
  scroll: {padding: 16, paddingBottom: 16},

  topbar:      {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  topbarLeft:  {flexDirection: 'row', alignItems: 'center', gap: 10},
  topbarIcon:  {width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  topbarTitle: {fontSize: 14, fontWeight: '800', color: BLUE_DEEP},
  topbarSub:   {fontSize: 11, color: 'rgba(44,61,131,0.55)', marginTop: 1},
  logoutBtn:   {paddingHorizontal: 14, paddingVertical: 7, backgroundColor: 'rgba(205,54,107,0.10)', borderRadius: 999},
  logoutText:  {fontSize: 12, fontWeight: '700', color: PINK},

  pageHeader:     {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10},
  pageHeaderLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  pageHeaderIcon: {width: 46, height: 46, borderRadius: 13, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  pageTitle:      {fontSize: 18, fontWeight: '800', color: BLUE_DEEP, letterSpacing: -0.2},
  pageSubtitle:   {fontSize: 12, color: 'rgba(44,61,131,0.55)', marginTop: 2},
  refreshBtn:     {paddingHorizontal: 14, paddingVertical: 9, backgroundColor: PINK, borderRadius: 10, shadowColor: PINK, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
  refreshBtnText: {color: '#fff', fontSize: 12, fontWeight: '700'},

  statsRow: {flexDirection: 'row', gap: 10, marginBottom: 16},
  statCard: {flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: BLUE, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2},
  statIcon: {width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(44,61,131,0.06)', justifyContent: 'center', alignItems: 'center', marginBottom: 6},
  statNum:  {fontSize: 20, fontWeight: '800', color: BLUE_DEEP},
  statLabel:{fontSize: 10, color: 'rgba(44,61,131,0.5)', fontWeight: '600', marginTop: 2, textAlign: 'center'},

  searchWrap:  {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 14},
  searchInput: {flex: 1, fontSize: 13, color: BLUE_DEEP, paddingVertical: 8, paddingHorizontal: 4},

  tableCard:       {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, overflow: 'hidden', shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},
  tableHead:       {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  tableHeadTitle:  {fontSize: 14, fontWeight: '800', color: BLUE_DEEP},
  tableCount:      {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999},
  tableCountText:  {fontSize: 11, fontWeight: '700', color: PINK},

  centerBox:  {padding: 50, alignItems: 'center'},
  centerText: {fontSize: 13, color: 'rgba(44,61,131,0.4)', marginTop: 10, textAlign: 'center'},

  surveyCard: {padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
  orgRow:     {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10},
  avatar:     {width: 36, height: 36, borderRadius: 10, backgroundColor: BLUE, justifyContent: 'center', alignItems: 'center', flexShrink: 0},
  avatarText: {color: '#fff', fontSize: 15, fontWeight: '800'},
  orgName:    {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  orgType:    {fontSize: 11, color: 'rgba(44,61,131,0.45)', marginTop: 2},
  dateText:   {fontSize: 11, color: 'rgba(44,61,131,0.45)', flexShrink: 0},

  pillsRow:      {flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8},
  districtPill:  {flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(44,61,131,0.07)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999},
  districtPillText:{fontSize: 11, fontWeight: '700', color: BLUE},
  talukaPill:    {flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(107,33,168,0.07)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999},
  talukaPillText:{fontSize: 11, fontWeight: '700', color: '#6b21a8'},

  contactRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12},
  contactText:{fontSize: 12, color: 'rgba(44,61,131,0.6)'},

  actionRow:    {flexDirection: 'row', gap: 8},
  viewBtn:      {flex: 1, paddingVertical: 9, borderRadius: 9, backgroundColor: 'rgba(205,54,107,0.08)', alignItems: 'center'},
  viewBtnText:  {fontSize: 12, fontWeight: '700', color: PINK},
  reviewBtn:    {flex: 1, paddingVertical: 9, borderRadius: 9, backgroundColor: 'rgba(34,197,94,0.10)', alignItems: 'center'},
  reviewBtnText:{fontSize: 12, fontWeight: '700', color: '#15803d'},

  footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
  footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},
});

// ── Modal Styles ──
const ms = StyleSheet.create({
  overlay: {flex: 1, backgroundColor: 'rgba(29,42,96,0.5)', justifyContent: 'flex-end'},
  modal:   {backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 4, borderTopColor: PINK, padding: 22, maxHeight: '92%'},

  mhead:     {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  mtitle:    {fontSize: 17, fontWeight: '800', color: BLUE_DEEP},
  msub:      {fontSize: 12, color: PINK, fontWeight: '600', marginTop: 2},
  mclose:    {width: 30, height: 30, borderRadius: 9, backgroundColor: 'rgba(44,61,131,0.07)', justifyContent: 'center', alignItems: 'center'},
  mcloseText:{fontSize: 14, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},

  centerBox:  {padding: 30, alignItems: 'center'},
  centerText: {fontSize: 13, color: 'rgba(44,61,131,0.4)', marginTop: 10},

  sectionTitle: {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 10},
  infoGrid:     {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4},
  infoItem:     {width: '47%', backgroundColor: 'rgba(44,61,131,0.03)', borderRadius: 10, padding: 10},
  infoLabel:    {fontSize: 10, color: 'rgba(44,61,131,0.45)', fontWeight: '700', marginBottom: 3},
  infoVal:      {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
  ansRow:       {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(44,61,131,0.025)', borderRadius: 10, marginBottom: 6},
  ansQ:         {fontSize: 12, color: BLUE_DEEP, fontWeight: '500', flex: 1, marginRight: 8},
  ansQId:       {color: PINK, fontWeight: '800'},
  ansBadge:     {paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999},
  ansBadgeText: {fontSize: 11, fontWeight: '700'},

  // Review modal
  orgBox:     {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 14, borderLeftWidth: 3, borderLeftColor: PINK},
  orgBoxName: {fontSize: 15, fontWeight: '800', color: BLUE_DEEP},
  orgBoxSub:  {fontSize: 12, color: 'rgba(44,61,131,0.5)', marginTop: 3},

  successBadge:     {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(34,197,94,0.10)', borderRadius: 999, paddingVertical: 7, paddingHorizontal: 16, alignSelf: 'center', marginBottom: 16},
  successBadgeText: {fontSize: 12.5, fontWeight: '700', color: '#15803d'},

  flbl:      {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8},
  selectBox: {flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#fff', marginBottom: 0},
  selectText:{flex: 1, fontSize: 13, fontWeight: '600', color: BLUE_DEEP},
  selectArrow:{fontSize: 10, color: 'rgba(44,61,131,0.5)'},
  menu:      {borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', marginTop: 4, marginBottom: 4},
  menuItem:  {paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
  menuItemActive:{backgroundColor: 'rgba(205,54,107,0.06)'},
  menuText:  {fontSize: 13, color: BLUE_DEEP},
  menuTextActive:{color: PINK, fontWeight: '700'},

  divider:     {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: 4},
  dividerText: {fontSize: 10.5, fontWeight: '800', color: 'rgba(44,61,131,0.35)', letterSpacing: 0.8, textTransform: 'uppercase'},
  dividerLine: {flex: 1, height: 1, backgroundColor: 'rgba(44,61,131,0.08)'},

  textInput: {borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', borderRadius: 12, padding: 12, fontSize: 14, color: BLUE_DEEP, backgroundColor: '#fff', marginBottom: 14},

  locationBox:     {flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 10, marginBottom: 16},
  locationLoading: {backgroundColor: 'rgba(44,61,131,0.05)'},
  locationSuccess: {backgroundColor: 'rgba(34,197,94,0.08)'},
  locationWarning: {backgroundColor: 'rgba(245,158,11,0.08)'},
  locationText:    {fontSize: 12, fontWeight: '600', color: BLUE_DEEP, flex: 1},

  btnRow:           {flexDirection: 'row', gap: 10, marginTop: 4, marginBottom: 8},
  cancelBtn:        {paddingHorizontal: 20, paddingVertical: 13, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
  cancelBtnText:    {fontSize: 13.5, fontWeight: '700', color: BLUE_DEEP},
  submitBtn:        {flex: 1, paddingVertical: 13, borderRadius: 12, backgroundColor: PINK, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
  submitBtnReject:  {backgroundColor: '#e53e3e'},
  submitBtnDisabled:{opacity: 0.5},
  submitBtnText:    {color: '#fff', fontSize: 14, fontWeight: '700'},
});