import React, {useState, useEffect, useMemo, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, StatusBar, ActivityIndicator, Alert,
  TextInput, Modal, RefreshControl,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import poshQuestions from '../data/Poshqquestionsdata';
import {API_BASE} from '../config';
import {launchImageLibrary} from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';
import {pick, types, isErrorWithCode, errorCodes} from '@react-native-documents/picker';

// ── Real question bank — same as web ──
const ALL_QUESTIONS = poshQuestions.parts.flatMap(p => p.questions);
const getQText = (q: any) =>
  q.en || q.question || q.text || q.questionEn || q.questionText || q.q || '';

// const API_BASE  = 'https://mahaposhact.saavi.co.in/api';
const PINK      = '#CD366B';
const PINK_DARK = '#b82a5c';
const BLUE      = '#2C3D83';
const BLUE_DEEP = '#1d2a60';
const CREAM     = '#FBF3EE';

const CASE_OPTIONS = [
  {value: 'case1', label: 'Case 1 — Physical Visit (1st Visit)'},
  {value: 'case2', label: 'Case 2 — Questionnaire Inspection'},
  {value: 'case3', label: 'Case 3 — Re-inspection Notice'},
  {value: 'case4', label: 'Case 4 — Final Inspection (after 15 days)'},
];

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

interface QuestionReview {
  answer:  'yes' | 'no' | '';
  comment: string;
}

interface PickedFile {
  uri:  string;
  type: string;
  name: string;
}

interface ReviewState {
  casetype:           string;
  officername:        string;
  officerdesignation: string;
  finalremark:        string;
  latitude:           number | null;
  longitude:          number | null;
  locationLoading:    boolean;
  locationError:      string;
  reviewRound:        number;
  roundLoading:       boolean;
  noQuestionIds:      number[];
  questionReviews:    Record<number, QuestionReview>;
  companyAnswers:     Record<string, string>;
   officerPhoto:       PickedFile | null;   // ← ADD
  officerDocument:    PickedFile | null;   // ← ADD
  officerSignature:   PickedFile | null;   // ← ADD
}

const EMPTY_REVIEW: ReviewState = {
  casetype:           'case1',
  officername:        '',
  officerdesignation: 'Inspection Officer',
  finalremark:        '',
  latitude:           null,
  longitude:          null,
  locationLoading:    false,
  locationError:      '',
  reviewRound:        1,
  roundLoading:       false,
  noQuestionIds:      [],
  questionReviews:    {},
  companyAnswers:     {},
   officerPhoto:       null,   // ← ADD
  officerDocument:    null,   // ← ADD
  officerSignature:   null,   // ← ADD
};

// ── Simple dropdown ──
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

// ── Single question review row ──
const QuestionRow = React.memo(function QuestionRow({
  q,
  review,
  companyAns,
  onAnswer,
  onComment,
}: {
  q:          {no: number; [key: string]: any};
  review:     QuestionReview | undefined;
  companyAns: string | undefined;
  onAnswer:   (no: number, ans: 'yes' | 'no') => void;
  onComment:  (no: number, text: string)       => void;
}) {
  const offAns  = review?.answer || '';
  const qText   = getQText(q) || `Question ${q.no}`;
  const cmpLabel =
    companyAns === 'yes' ? '✓ Yes' :
    companyAns === 'no'  ? '✗ No'  : '—';
  const cmpColor =
    companyAns === 'yes' ? '#15803d' :
    companyAns === 'no'  ? '#b91c1c' : 'rgba(44,61,131,0.45)';
  const cmpBg =
    companyAns === 'yes' ? 'rgba(34,197,94,0.12)'  :
    companyAns === 'no'  ? 'rgba(239,68,68,0.12)'  : 'rgba(44,61,131,0.07)';

  const rowBorder =
    offAns === 'yes' ? 'rgba(34,197,94,0.35)' :
    offAns === 'no'  ? 'rgba(239,68,68,0.35)' : 'rgba(44,61,131,0.10)';
  const rowBg =
    offAns === 'yes' ? 'rgba(34,197,94,0.03)' :
    offAns === 'no'  ? 'rgba(239,68,68,0.03)' : '#fff';

  return (
    <View style={[qr.row, {borderColor: rowBorder, backgroundColor: rowBg}]}>
      <Text style={qr.qText}>
        <Text style={qr.qNo}>{q.no}. </Text>
        {qText}
      </Text>

      <View style={[qr.companyBadge, {backgroundColor: cmpBg}]}>
        <Text style={[qr.companyLabel, {color: cmpColor}]}>
          Company: {cmpLabel}
        </Text>
      </View>

      <View style={qr.officerRow}>
        <Text style={qr.officerLabel}>Officer Review</Text>
        <View style={qr.btnPair}>
          <TouchableOpacity
            style={[qr.optBtn, offAns === 'yes' && qr.yesActive]}
            onPress={() => onAnswer(q.no, 'yes')}>
            <Text style={[qr.optText, offAns === 'yes' && {color: '#fff'}]}>✓ Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[qr.optBtn, offAns === 'no' && qr.noActive]}
            onPress={() => onAnswer(q.no, 'no')}>
            <Text style={[qr.optText, offAns === 'no' && {color: '#fff'}]}>✗ No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {offAns === 'no' && (
        <View style={qr.commentWrap}>
          <Text style={qr.commentLabel}>⚠ Comment required for No answer</Text>
          <TextInput
            style={qr.commentInput}
            placeholder="Non-compliance चे कारण लिहा..."
            placeholderTextColor="rgba(44,61,131,0.35)"
            value={review?.comment || ''}
            onChangeText={t => onComment(q.no, t)}
            multiline
            textAlignVertical="top"
          />
        </View>
      )}
    </View>
  );
});

export default function InspectionOfficerSurveyScreen({navigation}: any) {
  const [surveys, setSurveys]       = useState<Survey[]>([]);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch]         = useState('');
  const [authUser, setAuthUser]     = useState<any>(null);

  const [reviewSurvey, setReviewSurvey]         = useState<Survey | null>(null);
  const [rv, setRv]                             = useState<ReviewState>(EMPTY_REVIEW);
  const [submittingReview, setSubmittingReview] = useState(false);

  const [detailSurvey, setDetailSurvey]   = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('authUser').then(val => {
      if (val) setAuthUser(JSON.parse(val));
    });
  }, []);

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
    } catch {
      Alert.alert('Error', 'Surveys load karnya madhe error aala');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {fetchSurveys();}, []);

  const openDetail = async (submissionid: number) => {
    setDetailLoading(true);
    setDetailSurvey({submissionid, loading: true});
    try {
      const token = await AsyncStorage.getItem('authToken') || '';
      const res   = await fetch(`${API_BASE}/surveys/${submissionid}`, {
        headers: token ? {Authorization: `Bearer ${token}`} : {},
      });
      const data = await res.json();
      if (data.success) setDetailSurvey({...data, submissionid, loading: false});
    } catch {
      Alert.alert('Error', 'Detail load karnya madhe error');
      setDetailSurvey(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Open Review Modal: fetch round + company answers + geolocation ──
  const openReviewModal = async (survey: Survey) => {
    const officerName =
      authUser?.fullName || authUser?.fullname ||
      authUser?.userName || authUser?.username || '';

    const initial: ReviewState = {
      ...EMPTY_REVIEW,
      officername:     officerName,
      locationLoading: true,
      roundLoading:    true,
    };
    setReviewSurvey(survey);
    setRv(initial);

    // 1) Geolocation
    Geolocation.getCurrentPosition(
      pos => setRv(p => ({
        ...p,
        latitude:        pos.coords.latitude,
        longitude:       pos.coords.longitude,
        locationLoading: false,
        locationError:   '',
      })),
      () => setRv(p => ({
        ...p,
        locationLoading: false,
        locationError:   'Location unavailable — default 0,0 use hoil',
        latitude:        0,
        longitude:       0,
      })),
      {timeout: 8000, enableHighAccuracy: false},
    );

    // 2) Review round
    try {
      const token = await AsyncStorage.getItem('authToken') || '';
      const res   = await fetch(
        `${API_BASE}/officer/report/get-round?orgid=${survey.orgid}`,
        {headers: token ? {Authorization: `Bearer ${token}`} : {}},
      );
      const data = await res.json();
      if (data.success) {
        setRv(p => ({
          ...p,
          reviewRound:   data.reviewround  || 1,
          noQuestionIds: data.noQuestionIds || [],
          roundLoading:  false,
        }));
      } else {
        setRv(p => ({...p, roundLoading: false}));
      }
    } catch {
      setRv(p => ({...p, roundLoading: false}));
    }

    // 3) Company answers
    try {
      const token = await AsyncStorage.getItem('authToken') || '';
      const res   = await fetch(`${API_BASE}/surveys/${survey.submissionid}`, {
        headers: token ? {Authorization: `Bearer ${token}`} : {},
      });
      const data = await res.json();
      if (data.success) {
        setRv(p => ({...p, companyAnswers: data.answers || {}}));
      }
    } catch { /* ignore */ }
  };

  const questionsToReview = useMemo(() => {
    if (rv.reviewRound === 1) return ALL_QUESTIONS;
    return ALL_QUESTIONS.filter(q => rv.noQuestionIds.includes(q.no));
  }, [rv.reviewRound, rv.noQuestionIds]);

  const answeredCount = questionsToReview.filter(q => rv.questionReviews[q.no]?.answer).length;
  const hasAnyNo      = questionsToReview.some(q => rv.questionReviews[q.no]?.answer === 'no');

  const setQAnswer = useCallback((no: number, ans: 'yes' | 'no') => {
    setRv(p => ({
      ...p,
      questionReviews: {
        ...p.questionReviews,
        [no]: {
          answer:  ans,
          comment: ans === 'yes' ? '' : (p.questionReviews[no]?.comment || ''),
        },
      },
    }));
  }, []);

  const setQComment = useCallback((no: number, text: string) => {
    setRv(p => ({
      ...p,
      questionReviews: {
        ...p.questionReviews,
        [no]: {...p.questionReviews[no], comment: text},
      },
    }));
  }, []);


  const pickImage = useCallback((field: 'officerPhoto' | 'officerSignature') => {
  launchImageLibrary({mediaType: 'photo', quality: 0.8}, (res) => {
    if (res.didCancel || res.errorCode) return;
    const asset = res.assets?.[0];
    if (!asset?.uri) return;
    setRv(p => ({
      ...p,
      [field]: {
        uri:  asset.uri!,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `${field}.jpg`,
      },
    }));
  });
}, []);

// const pickDocument = useCallback(async () => {
//   try {
//     const res = await DocumentPicker.pickSingle({
//       type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
//     });
//     setRv(p => ({
//       ...p,
//       officerDocument: {
//         uri:  res.uri,
//         type: res.type || 'application/octet-stream',
//         name: res.name || 'document',
//       },
//     }));
//   } catch (err) {
//     if (!DocumentPicker.isCancel(err)) {
//       Alert.alert('Error', 'Document select karnya madhe error');
//     }
//   }
// }, []);



const pickDocument = useCallback(async () => {
  try {
    const [res] = await pick({
      type: [types.images, types.pdf],
    });
    setRv(p => ({
      ...p,
      officerDocument: {
        uri:  res.uri,
        type: res.type || 'application/octet-stream',
        name: res.name || 'document',
      },
    }));
  } catch (err) {
    if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
      // user cancelled — ignore
    } else {
      Alert.alert('Error', 'Document select karnya madhe error');
    }
  }
}, []);



  // ── Submit ──
  const handleReviewSubmit = async () => {
    if (!rv.officername.trim())        {Alert.alert('Error', 'Officer Name bhara'); return;}
    if (!rv.officerdesignation.trim()) {Alert.alert('Error', 'Designation bhara'); return;}
    if (!rv.finalremark.trim())        {Alert.alert('Error', 'Overall Remark bhara'); return;}
    if (rv.locationLoading)            {Alert.alert('Info',  'Location fetch hoto aahe…'); return;}
    if (rv.roundLoading)               {Alert.alert('Info',  'Round info load hoto aahe…'); return;}

    const unanswered = questionsToReview.filter(q => !rv.questionReviews[q.no]?.answer);
    if (unanswered.length > 0) {
      Alert.alert('Error', `${unanswered.length} question(s) cha answer dya`); return;
    }
    const noWithoutComment = questionsToReview.filter(
      q => rv.questionReviews[q.no]?.answer === 'no' &&
           !rv.questionReviews[q.no]?.comment?.trim(),
    );
    if (noWithoutComment.length > 0) {
      Alert.alert('Error', `${noWithoutComment.length} No answer(s) la comment laha`); return;
    }

    // setSubmittingReview(true);
    // try {
    //   const token = await AsyncStorage.getItem('authToken') || '';
    //   const payload = {
    //     orgid:              reviewSurvey!.orgid,
    //     casetype:           rv.casetype,
    //     officername:        rv.officername.trim(),
    //     officerdesignation: rv.officerdesignation.trim(),
    //     finalremark:        rv.finalremark.trim(),
    //     latitude:           rv.latitude  ?? 0,
    //     longitude:          rv.longitude ?? 0,
    //     questionReviews:    questionsToReview.map(q => ({
    //       questionid: q.no,
    //       answer:     rv.questionReviews[q.no]?.answer,
    //       comment:    rv.questionReviews[q.no]?.comment || '',
    //     })),
    //   };
    //   const res  = await fetch(`${API_BASE}/officer/report/quick-review`, {
    //     method:  'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       ...(token ? {Authorization: `Bearer ${token}`} : {}),
    //     },
    //     body: JSON.stringify(payload),
    //   });

setSubmittingReview(true);
    try {
      const token = await AsyncStorage.getItem('authToken') || '';

      const reviewsArray = questionsToReview.map(q => ({
        questionid: q.no,
        answer:     rv.questionReviews[q.no]?.answer,
        comment:    rv.questionReviews[q.no]?.comment || '',
      }));

      const fd = new FormData();
      fd.append('orgid',              String(reviewSurvey!.orgid));
      fd.append('casetype',           rv.casetype);
      fd.append('officername',        rv.officername.trim());
      fd.append('officerdesignation', rv.officerdesignation.trim());
      fd.append('finalremark',        rv.finalremark.trim());
      fd.append('latitude',           String(rv.latitude  ?? 0));
      fd.append('longitude',          String(rv.longitude ?? 0));
      fd.append('questionReviews',    JSON.stringify(reviewsArray));

      if (rv.officerPhoto) {
        fd.append('officerPhoto', {
          uri:  rv.officerPhoto.uri,
          type: rv.officerPhoto.type,
          name: rv.officerPhoto.name,
        } as any);
      }
      if (rv.officerDocument) {
        fd.append('officerDocument', {
          uri:  rv.officerDocument.uri,
          type: rv.officerDocument.type,
          name: rv.officerDocument.name,
        } as any);
      }
      if (rv.officerSignature) {
        fd.append('officerSignature', {
          uri:  rv.officerSignature.uri,
          type: rv.officerSignature.type,
          name: rv.officerSignature.name,
        } as any);
      }

      const res = await fetch(`${API_BASE}/officer/report/quick-review`, {
        method:  'POST',
        headers: {
          Accept: 'application/json',
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
          // ⚠️ Content-Type manually सेट करू नये — RN fetch स्वतः multipart boundary टाकतो
        },
        body: fd as any,
      });
      const data = await res.json();

    
      if (data.success) {
        const fs = data.finalstatus;
        const msg =
          fs === 'compiled'  ? '✅ Survey Complied! Final submission done.' :
          fs === 'rejected'  ? '❌ Survey Permanently Rejected.'           :
                               '📋 Review submitted. 15-day notice issued.';
        Alert.alert('Success', msg, [{
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

  // const handleLogout = () => {
  //   Alert.alert('Logout', 'Logout karnar ahat?', [
  //     {text: 'Cancel', style: 'cancel'},
  //     {text: 'Logout', style: 'destructive', onPress: async () => {
  //       await AsyncStorage.multiRemove(['authToken', 'authUser']);
  //       navigation.replace('CompanyLogin');
  //     }},
  //   ]);
  // };

  const handleLogout = () => {
  Alert.alert('Logout', 'Logout karnar ahat?', [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Logout', style: 'destructive', onPress: async () => {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('authUser');
      navigation.replace('CompanyLogin');
    }},
  ]);
};

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

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'}) : '—';

  const submitLabel =
    hasAnyNo && rv.reviewRound === 2 ? '⚠ Submit (Will Reject)'    :
    hasAnyNo                         ? '📋 Submit (15-day Notice)'  :
                                       '✅ Submit (All Complied)';
  const submitIsReject = hasAnyNo && rv.reviewRound === 2;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

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

        <View style={s.statsRow}>
          {[
            {icon: '📋', num: filtered.length,                              label: 'Total Surveys'},
            {icon: '📍', num: new Set(filtered.map(sv => sv.district)).size, label: 'Districts'},
            {icon: '✅', num: 34,                                            label: 'MH Total'},
          ].map(({icon, num, label}) => (
            <View key={label} style={s.statCard}>
              <View style={s.statIcon}><Text style={{fontSize: 18}}>{icon}</Text></View>
              <Text style={s.statNum}>{num}</Text>
              <Text style={s.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

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
                <View style={s.orgRow}>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{(sv.orgname || '?').charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={s.orgName} numberOfLines={1}>{sv.orgname || '—'}</Text>
                    <Text style={s.orgType}>{sv.orgtype || '—'}</Text>
                  </View>
                  <Text style={s.dateText}>{formatDate(sv.submittedat)}</Text>
                </View>

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

                <View style={s.contactRow}>
                  <Text style={s.contactText}>👤 {sv.concernname || '—'}</Text>
                  <Text style={s.contactText}>📱 {sv.concernmobile || '—'}</Text>
                </View>

                <View style={s.actionRow}>
                  <TouchableOpacity style={s.viewBtn} onPress={() => openDetail(sv.submissionid)}>
                    <Text style={s.viewBtnText}>👁 View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.reviewBtn} onPress={() => openReviewModal(sv)}>
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
                <Text style={ms.sectionTitle}>ORGANIZATION INFO</Text>
                <View style={ms.infoGrid}>
                  {[
                    ['Org Name',  detailSurvey?.submission?.orgname],
                    ['Org Type',  detailSurvey?.submission?.orgtype],
                    ['District',  detailSurvey?.submission?.district],
                    ['Taluka',    detailSurvey?.submission?.taluka],
                    ['Ward',      detailSurvey?.submission?.ward],
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

                <Text style={[ms.sectionTitle, {marginTop: 16}]}>
                  SURVEY ANSWERS ({Object.keys(detailSurvey?.answers || {}).length} questions)
                </Text>
                {Object.entries(detailSurvey?.answers || {}).map(([qid, ans]) => {
                  const qDef = ALL_QUESTIONS.find(q => String(q.no) === String(qid));
                  const qText = qDef ? getQText(qDef) : `Question ${qid}`;
                  return (
                    <View key={qid} style={ms.ansRow}>
                      <Text style={ms.ansQ} numberOfLines={2}>
                        <Text style={ms.ansQId}>Q{qid}. </Text>{qText}
                      </Text>
                      <View style={[ms.ansBadge, {backgroundColor: ans === 'yes' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}]}>
                        <Text style={[ms.ansBadgeText, {color: ans === 'yes' ? '#15803d' : '#b91c1c'}]}>
                          {ans === 'yes' ? '✓ Yes' : '✗ No'}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* ── Review Modal ── */}
      <Modal
        visible={!!reviewSurvey}
        animationType="slide"
        transparent
        onRequestClose={() => setReviewSurvey(null)}>
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

              <View style={ms.orgBox}>
                <Text style={ms.orgBoxName}>{reviewSurvey?.orgname || '—'}</Text>
                <Text style={ms.orgBoxSub}>
                  {reviewSurvey?.district} · {reviewSurvey?.taluka || '—'} · {reviewSurvey?.orgtype || '—'}
                </Text>
              </View>

              {rv.roundLoading ? (
                <View style={[ms.roundBadge, ms.roundBadge1]}>
                  <ActivityIndicator color={BLUE} size="small" />
                  <Text style={ms.roundBadgeText}>Round info load hoto aahe…</Text>
                </View>
              ) : rv.reviewRound === 1 ? (
                <View style={[ms.roundBadge, ms.roundBadge1]}>
                  <Text style={ms.roundBadgeText}>📋 1st Review — सगळ्या questions review करा</Text>
                </View>
              ) : (
                <View style={[ms.roundBadge, ms.roundBadge2]}>
                  <Text style={[ms.roundBadgeText, {color: '#b45309'}]}>
                    ⚠️ 2nd Review (15 days) — {rv.noQuestionIds.length} Non-compliant questions only
                  </Text>
                </View>
              )}

              <SelectRow
                label="Case Type"
                value={rv.casetype}
                options={CASE_OPTIONS}
                onSelect={v => setRv(p => ({...p, casetype: v}))}
              />

              <View style={ms.divider}>
                <Text style={ms.dividerText}>OFFICER DETAILS</Text>
                <View style={ms.dividerLine} />
              </View>

              

              <Text style={ms.flbl}>OFFICER NAME</Text>
<TextInput
  style={[ms.textInput, ms.textInputDisabled]}
  placeholder="Full Name"
  placeholderTextColor="rgba(44,61,131,0.35)"
  value={rv.officername}
  editable={false}
/>

              {/* <Text style={ms.flbl}>DESIGNATION</Text>
              <TextInput
                style={ms.textInput}
                placeholder="e.g. Inspection Officer"
                placeholderTextColor="rgba(44,61,131,0.35)"
                value={rv.officerdesignation}
                onChangeText={v => setRv(p => ({...p, officerdesignation: v}))}
              /> */}

              <Text style={ms.flbl}>DESIGNATION</Text>
<TextInput
  style={[ms.textInput, ms.textInputDisabled]}
  placeholder="e.g. Inspection Officer"
  placeholderTextColor="rgba(44,61,131,0.35)"
  value={rv.officerdesignation}
  editable={false}
/>

<View style={ms.divider}>
  <Text style={ms.dividerText}>OFFICER UPLOADS (OPTIONAL)</Text>
  <View style={ms.dividerLine} />
</View>

<View style={ms.uploadRow}>
  <TouchableOpacity style={ms.uploadBox} onPress={() => pickImage('officerPhoto')}>
    <Text style={ms.uploadIcon}>📷</Text>
    <Text style={ms.uploadLabel}>Photo</Text>
    {rv.officerPhoto && <Text style={ms.uploadFileName} numberOfLines={1}>✓ {rv.officerPhoto.name}</Text>}
  </TouchableOpacity>

  <TouchableOpacity style={ms.uploadBox} onPress={pickDocument}>
    <Text style={ms.uploadIcon}>📄</Text>
    <Text style={ms.uploadLabel}>Document</Text>
    {rv.officerDocument && <Text style={ms.uploadFileName} numberOfLines={1}>✓ {rv.officerDocument.name}</Text>}
  </TouchableOpacity>

  <TouchableOpacity style={ms.uploadBox} onPress={() => pickImage('officerSignature')}>
    <Text style={ms.uploadIcon}>✍️</Text>
    <Text style={ms.uploadLabel}>Signature</Text>
    {rv.officerSignature && <Text style={ms.uploadFileName} numberOfLines={1}>✓ {rv.officerSignature.name}</Text>}
  </TouchableOpacity>
</View>



              <View style={ms.divider}>
                <Text style={ms.dividerText}>QUESTION REVIEW</Text>
                <View style={ms.dividerLine} />
                <View style={ms.answeredPill}>
                  <Text style={ms.answeredPillText}>{answeredCount}/{questionsToReview.length}</Text>
                </View>
              </View>

              {rv.roundLoading ? (
                <View style={ms.centerBox}>
                  <ActivityIndicator color={PINK} />
                  <Text style={ms.centerText}>Questions load hoto aahet…</Text>
                </View>
              ) : (
                questionsToReview.map(q => (
                  <QuestionRow
                    key={q.no}
                    q={q}
                    review={rv.questionReviews[q.no]}
                    companyAns={rv.companyAnswers[q.no] || rv.companyAnswers[String(q.no)]}
                    onAnswer={setQAnswer}
                    onComment={setQComment}
                  />
                ))
              )}

              {hasAnyNo && (
                <View style={ms.warnBox}>
                  <Text style={ms.warnText}>
                    {rv.reviewRound === 1
                      ? '⚠️ No असलेल्या questions ला 15 days notice दिला जाईल'
                      : '⚠️ 2nd round मध्ये No आले तर survey Permanently Rejected होईल'}
                  </Text>
                </View>
              )}

              <View style={ms.divider}>
                <Text style={ms.dividerText}>OVERALL REMARK</Text>
                <View style={ms.dividerLine} />
              </View>

              <TextInput
                style={[ms.textInput, {height: 90, textAlignVertical: 'top'}]}
                placeholder="Write overall observation / remarks here..."
                placeholderTextColor="rgba(44,61,131,0.35)"
                value={rv.finalremark}
                onChangeText={v => setRv(p => ({...p, finalremark: v}))}
                multiline
              />

              {rv.locationLoading ? (
                <View style={[ms.locationBox, ms.locationLoading]}>
                  <ActivityIndicator color={BLUE} size="small" />
                  <Text style={ms.locationText}>📍 Location fetch hoto aahe…</Text>
                </View>
              ) : rv.locationError ? (
                <View style={[ms.locationBox, ms.locationWarning]}>
                  <Text style={ms.locationText}>⚠️ {rv.locationError}</Text>
                </View>
              ) : (
                <View style={[ms.locationBox, ms.locationSuccess]}>
                  <Text style={ms.locationText}>
                    ✅ Location milali — {rv.latitude?.toFixed(4)}, {rv.longitude?.toFixed(4)}
                  </Text>
                </View>
              )}

              <View style={ms.btnRow}>
                <TouchableOpacity style={ms.cancelBtn} onPress={() => setReviewSurvey(null)}>
                  <Text style={ms.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    ms.submitBtn,
                    submitIsReject       && ms.submitBtnReject,
                    (submittingReview || rv.locationLoading || rv.roundLoading) && ms.submitBtnDisabled,
                  ]}
                  onPress={handleReviewSubmit}
                  disabled={submittingReview || rv.locationLoading || rv.roundLoading}>
                  {submittingReview
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={ms.submitBtnText}>{submitLabel}</Text>}
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

// ── Question Row Styles ──
const qr = StyleSheet.create({
  row: {
    borderWidth:   1.5,
    borderRadius:  14,
    padding:       12,
    marginBottom:  8,
    backgroundColor: '#fff',
  },
  qText:   {fontSize: 12.5, lineHeight: 18, color: BLUE_DEEP, marginBottom: 8},
  qNo:     {color: PINK, fontWeight: '800'},
  companyBadge: {alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, marginBottom: 10},
  companyLabel: {fontSize: 11, fontWeight: '700'},
  officerRow:   {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  officerLabel: {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)', textTransform: 'uppercase', letterSpacing: 0.5},
  btnPair:      {flexDirection: 'row', gap: 6},
  optBtn:       {paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', backgroundColor: '#fff'},
  optText:      {fontSize: 12.5, fontWeight: '700', color: BLUE_DEEP},
  yesActive:    {backgroundColor: '#22c55e', borderColor: 'transparent'},
  noActive:     {backgroundColor: '#ef4444', borderColor: 'transparent'},
  commentWrap:  {marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(239,68,68,0.15)', paddingTop: 10},
  commentLabel: {fontSize: 11, fontWeight: '700', color: '#b91c1c', marginBottom: 6},
  commentInput: {
    borderWidth: 1.5, borderColor: 'rgba(239,68,68,0.3)', borderRadius: 10,
    padding: 10, fontSize: 13, color: BLUE_DEEP, minHeight: 65,
    backgroundColor: 'rgba(239,68,68,0.02)', textAlignVertical: 'top',
  },
});

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
  districtPill:  {backgroundColor: 'rgba(44,61,131,0.07)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999},
  districtPillText:{fontSize: 11, fontWeight: '700', color: BLUE},
  talukaPill:    {backgroundColor: 'rgba(107,33,168,0.07)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999},
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
  modal:   {backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 4, borderTopColor: PINK, padding: 22, maxHeight: '95%'},

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

  orgBox:     {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 14, borderLeftWidth: 3, borderLeftColor: PINK},
  orgBoxName: {fontSize: 15, fontWeight: '800', color: BLUE_DEEP},
  orgBoxSub:  {fontSize: 12, color: 'rgba(44,61,131,0.5)', marginTop: 3},

  roundBadge:  {flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, alignSelf: 'flex-start', marginBottom: 14},
  roundBadge1: {backgroundColor: 'rgba(44,61,131,0.08)'},
  roundBadge2: {backgroundColor: 'rgba(245,158,11,0.12)'},
  roundBadgeText: {fontSize: 12.5, fontWeight: '700', color: BLUE},

  flbl:      {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8},
  selectBox: {flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#fff'},
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
  answeredPill:{backgroundColor: 'rgba(205,54,107,0.10)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999},
  answeredPillText:{fontSize: 11, fontWeight: '700', color: PINK},

  warnBox:  {flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 10, backgroundColor: 'rgba(245,158,11,0.10)', borderWidth: 1, borderColor: 'rgba(245,158,11,0.25)', marginBottom: 14},
  warnText: {fontSize: 12.5, fontWeight: '600', color: '#b45309', flex: 1},

  textInput: {borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', borderRadius: 12, padding: 12, fontSize: 14, color: BLUE_DEEP, backgroundColor: '#fff', marginBottom: 14},
textInputDisabled: {backgroundColor: 'rgba(44,61,131,0.04)', color: 'rgba(44,61,131,0.6)'},
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

  uploadRow: {flexDirection: 'row', gap: 8, marginBottom: 14},
uploadBox: {
  flex: 1, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)',
  borderRadius: 12, padding: 12, alignItems: 'center', backgroundColor: '#fff',
},
uploadIcon:     {fontSize: 20, marginBottom: 4},
uploadLabel:    {fontSize: 11, fontWeight: '700', color: BLUE_DEEP},
uploadFileName: {fontSize: 9.5, color: '#15803d', marginTop: 4, fontWeight: '600', maxWidth: 90},
});