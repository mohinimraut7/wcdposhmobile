import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, StatusBar, ActivityIndicator, Alert,Image
} from 'react-native';
import wcdLogo from '../assets/wcdlogo.jpeg';

const API_BASE  = 'https://mahaposhact.saavi.co.in/api';
const PINK      = '#CD366B';
const PINK_DARK = '#b82a5c';
const BLUE      = '#2C3D83';
const BLUE_DEEP = '#1d2a60';
const CREAM     = '#FBF3EE';

export default function LoginScreen({navigation}: any) {
  const [mode, setMode]         = useState<'password' | 'otp'>('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const [mobile, setMobile]         = useState('');
  const [otp, setOtp]               = useState('');
  const [otpSent, setOtpSent]       = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // ── Password Login → /inspection-officer/login ──
  const handlePasswordLogin = async () => {
    if (!username.trim()) {Alert.alert('Error', 'Username enter kara'); return;}
    if (!password)        {Alert.alert('Error', 'Password enter kara'); return;}
    try {
      setLoading(true);
      const res  = await fetch(`${API_BASE}/inspection-officer/login`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify({username: username.trim(), password}),
      });
      const data = await res.json();
      if (!data.success) {Alert.alert('Error', data.message || 'Login failed'); return;}

      if (data.token) await AsyncStorage.setItem('authToken', data.token);
      if (data.user)  await AsyncStorage.setItem('authUser', JSON.stringify(data.user));

      navigation.replace('OfficerSurveys');
    } catch (err) {
      Alert.alert('Error', 'Server error. Internet check kara.');
    } finally {
      setLoading(false);
    }
  };

  // ── Send OTP → /sendOtp ──
  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) {Alert.alert('Error', 'Valid 10 digit mobile taka'); return;}
    try {
      setOtpLoading(true);
      const res  = await fetch(`${API_BASE}/sendOtp`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify({mobileNo: mobile}),
      });
      const data = await res.json();
      if (!data.success) {Alert.alert('Error', data.message || 'OTP pathavta ala nahi'); return;}
      setOtpSent(true);
      Alert.alert('Success', 'OTP pathavla aahe');
    } catch (err) {
      Alert.alert('Error', 'Server error');
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Verify OTP → /loginByMobile ──
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {Alert.alert('Error', 'OTP enter kara'); return;}
    try {
      setOtpLoading(true);
      const res  = await fetch(`${API_BASE}/loginByMobile`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify({mobileNo: mobile, otp: otp.trim()}),
      });
      const data = await res.json();
      if (!data.success) {Alert.alert('Error', data.message || 'Login failed'); return;}

      if (data.token) await AsyncStorage.setItem('authToken', data.token);
      if (data.user)  await AsyncStorage.setItem('authUser', JSON.stringify(data.user));

      navigation.replace('OfficerSurveys');
    } catch (err) {
      Alert.alert('Error', 'Server error');
    } finally {
      setOtpLoading(false);
    }
  };

  const switchMode = (next: 'password' | 'otp') => {
    setMode(next);
    setOtpSent(false);
    setOtp('');
    setMobile('');
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

      {/* Top Bar */}
      <View style={s.topbar}>
        <View style={s.topbarLeft}>
          <View style={s.topbarIcon}><Text style={s.topbarIconText}>🛡</Text></View>
          <View>
            <Text style={s.topbarTitle}>Government of Maharashtra</Text>
            <Text style={s.topbarSub}>Women &amp; Child Development</Text>
          </View>
        </View>
        <View style={s.statusPill}>
          <View style={s.statusDot} />
          <Text style={s.statusText}>Online</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

           {/* ── Info Card ── */}
        <View style={s.infoCard}>
          <View style={s.badgeRow}>
            <View style={s.logoBadge}><Text style={{fontSize: 24}}>🛡</Text></View>
            <View style={s.logoBadge}><Text style={{fontSize: 24}}>⭐</Text></View>
          </View>
          <Text style={s.infoTitle}>WCD Inspection</Text>
          <Text style={s.infoSub}>Maharashtra State</Text>
          <View style={s.portalPill}>
            <Text style={s.portalPillText}>👮 INSPECTION OFFICER PORTAL</Text>
          </View>
          <Text style={s.infoDesc}>
            Women &amp; Child Development —{'\n'}
            Unified Inspection Management System
          </Text>
          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Text style={s.statNum}>1,284</Text>
              <Text style={s.statLabel}>Inspections</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statNum}>86</Text>
              <Text style={s.statLabel}>Officers</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statNum}>34</Text>
              <Text style={s.statLabel}>Districts</Text>
            </View>
          </View>
        </View>

        {/* ── Login Card ── */}
        <View style={s.card}>

          {/* Brand */}
          <View style={s.brandRow}>
            <View style={s.brand}>
              <View style={s.brandIcon}><Text style={{fontSize: 22}}>🛡</Text></View>
              <View>
                <Text style={s.brandTitle}>WCD Admin</Text>
                <Text style={s.brandSub}>Inspection Officer Portal</Text>
              </View>
            </View>
            <View style={s.versionPill}><Text style={s.versionText}>v2.0</Text></View>
          </View>

          {/* Role Badge */}
          <View style={s.roleBadge}>
            <Text style={s.roleBadgeText}>👮 Inspection Officer Login</Text>
          </View>

          <Text style={s.heading}>Welcome Back</Text>
          <Text style={s.subheading}>Sign in to access your assigned surveys</Text>

          {/* Mode Tabs */}
          <View style={s.tabs}>
            <TouchableOpacity
              style={[s.tab, mode === 'password' && s.tabActive]}
              onPress={() => switchMode('password')}>
              <Text style={[s.tabText, mode === 'password' && s.tabTextActive]}>🔒 Password Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.tab, mode === 'otp' && s.tabActive]}
              onPress={() => switchMode('otp')}>
              <Text style={[s.tabText, mode === 'otp' && s.tabTextActive]}>📱 OTP Login</Text>
            </TouchableOpacity>
          </View>

          {/* ── PASSWORD MODE ── */}
          {mode === 'password' && (
            <>
              <Text style={s.fieldLabel}>USERNAME</Text>
              <View style={s.inputWrap}>
                <View style={s.inputIcon}><Text>👤</Text></View>
                <TextInput
                  style={s.input}
                  placeholder="Enter your username"
                  placeholderTextColor="rgba(44,61,131,0.35)"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              <Text style={s.fieldLabel}>PASSWORD</Text>
              <View style={s.inputWrap}>
                <View style={s.inputIcon}><Text>🔒</Text></View>
                <TextInput
                  style={[s.input, {flex: 1}]}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(44,61,131,0.35)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(!showPass)}>
                  <Text style={s.eyeText}>{showPass ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[s.submitBtn, loading && s.submitBtnDisabled]}
                onPress={handlePasswordLogin}
                disabled={loading}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.submitBtnText}>→ Sign In to Dashboard</Text>}
              </TouchableOpacity>
            </>
          )}

          {/* ── OTP MODE ── */}
          {mode === 'otp' && (
            <>
              <Text style={s.fieldLabel}>MOBILE NUMBER</Text>
              <View style={s.otpRow}>
                <View style={[s.inputWrap, {flex: 1}]}>
                  <View style={s.inputIcon}><Text>📱</Text></View>
                  <TextInput
                    style={s.input}
                    placeholder="10 digit mobile"
                    placeholderTextColor="rgba(44,61,131,0.35)"
                    value={mobile}
                    onChangeText={t => setMobile(t.replace(/\D/g, '').slice(0, 10))}
                    keyboardType="numeric"
                    maxLength={10}
                    editable={!otpSent}
                  />
                </View>
                <TouchableOpacity
                  style={[s.sendOtpBtn, (otpLoading || otpSent) && s.submitBtnDisabled]}
                  onPress={handleSendOtp}
                  disabled={otpLoading || otpSent}>
                  <Text style={s.sendOtpText}>
                    {otpSent ? 'Sent ✓' : otpLoading ? '...' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>
              </View>

              {otpSent && <Text style={s.otpNote}>✓ OTP tumchya mobile var pathavla aahe</Text>}

              {otpSent && (
                <>
                  <Text style={s.fieldLabel}>ENTER OTP</Text>
                  <View style={s.inputWrap}>
                    <View style={s.inputIcon}><Text>#</Text></View>
                    <TextInput
                      style={s.input}
                      placeholder="6 digit OTP"
                      placeholderTextColor="rgba(44,61,131,0.35)"
                      value={otp}
                      onChangeText={t => setOtp(t.replace(/\D/g, '').slice(0, 6))}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>
                </>
              )}

              <TouchableOpacity
                style={[s.submitBtn, (!otpSent || otpLoading) && s.submitBtnDisabled]}
                onPress={handleVerifyOtp}
                disabled={!otpSent || otpLoading}>
                {otpLoading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.submitBtnText}>→ Verify &amp; Sign In</Text>}
              </TouchableOpacity>
            </>
          )}

          {/* Company Link */}
          <View style={s.linksRow}>
            <Text style={s.linksText}>Company? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CompanyLogin')}>
              <Text style={s.linksLink}>Company Login</Text>
            </TouchableOpacity>
          </View>
        </View>

     

        {/* Officer Duties Card */}
        {/* <View style={s.dutiesCard}>
          <View style={s.dutiesHead}>
            <Text style={s.dutiesLabel}>OFFICER DUTIES</Text>
            <Text style={s.dutiesTag}>POSH Act</Text>
          </View>
          {[
            {icon: '📋', title: 'View Assigned Surveys',    desc: 'See all assigned org surveys'},
            {icon: '🔍', title: 'Conduct Inspections',      desc: 'Physical / questionnaire visits'},
            {icon: '📝', title: 'Submit Review Reports',     desc: 'Case type & compliance status'},
            {icon: '📍', title: 'Geo-tagged Reporting',      desc: 'Location-based report submission'},
          ].map((d, i) => (
            <View key={i} style={s.dutyRow}>
              <View style={s.dutyIconBox}><Text style={{fontSize: 14}}>{d.icon}</Text></View>
              <View style={{flex: 1}}>
                <Text style={s.dutyTitle}>{d.title}</Text>
                <Text style={s.dutyDesc}>{d.desc}</Text>
              </View>
            </View>
          ))}
          <View style={s.secureNote}>
            <Text style={s.secureText}>🔒 Secure Government Portal · 256-bit SSL Encrypted</Text>
          </View>
        </View> */}

      </ScrollView>

      <View style={s.footer}>
        <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   {flex: 1, backgroundColor: CREAM},
  scroll: {padding: 16, paddingBottom: 8},

  topbar:         {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  topbarLeft:     {flexDirection: 'row', alignItems: 'center', gap: 10},
  topbarIcon:     {width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  topbarIconText: {fontSize: 16},
  topbarTitle:    {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
  topbarSub:      {fontSize: 11, color: 'rgba(44,61,131,0.55)'},
  statusPill:     {flexDirection: 'row', alignItems: 'center', gap: 5},
  statusDot:      {width: 7, height: 7, borderRadius: 4, backgroundColor: PINK},
  statusText:     {fontSize: 12, fontWeight: '600', color: PINK},

  card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 22, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

  brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
  brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  brandTitle:  {fontSize: 17, fontWeight: '800', color: BLUE_DEEP},
  brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
  versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
  versionText: {fontSize: 11, fontWeight: '700', color: PINK},

  roleBadge:     {flexDirection: 'row', justifyContent: 'center', marginBottom: 14},
  roleBadgeText: {fontSize: 13, fontWeight: '800', color: BLUE, backgroundColor: 'rgba(44,61,131,0.07)', paddingHorizontal: 16, paddingVertical: 7, borderRadius: 999},

  heading:    {fontSize: 26, fontWeight: '800', color: BLUE_DEEP, letterSpacing: -0.3, marginBottom: 4},
  subheading: {fontSize: 13, color: 'rgba(44,61,131,0.55)', marginBottom: 18},

  tabs:          {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 4, gap: 4, marginBottom: 18},
  tab:           {flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: 'center'},
  tabActive:     {backgroundColor: PINK, shadowColor: PINK, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4},
  tabText:       {fontSize: 12, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
  tabTextActive: {color: '#fff'},

  fieldLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8},
  inputWrap:  {flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, marginBottom: 14, overflow: 'hidden'},
  inputIcon:  {width: 42, backgroundColor: 'rgba(44,61,131,0.05)', paddingVertical: 13, alignItems: 'center', borderRightWidth: 1, borderRightColor: 'rgba(44,61,131,0.12)'},
  input:      {flex: 1, fontSize: 14, color: BLUE_DEEP, paddingHorizontal: 12, paddingVertical: 13},
  eyeBtn:     {paddingHorizontal: 12},
  eyeText:    {fontSize: 16},

  otpRow:     {flexDirection: 'row', gap: 10, marginBottom: 0},
  sendOtpBtn: {backgroundColor: BLUE, paddingHorizontal: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14},
  sendOtpText:{color: '#fff', fontSize: 12, fontWeight: '700'},
  otpNote:    {fontSize: 12, color: PINK, fontWeight: '600', marginBottom: 12},

  submitBtn:         {backgroundColor: PINK, borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 6, shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
  submitBtnDisabled: {opacity: 0.5},
  submitBtnText:     {color: '#fff', fontSize: 15, fontWeight: '700'},

  linksRow:  {flexDirection: 'row', justifyContent: 'center', marginTop: 16},
  linksText: {fontSize: 13, color: 'rgba(44,61,131,0.55)'},
  linksLink: {fontSize: 13, fontWeight: '700', color: PINK},

  infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 24, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
  badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
  logoBadge:      {width: 50, height: 50, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
  infoTitle:      {color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 4},
  infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
  portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
  portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
  infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 18},
  statsRow:       {flexDirection: 'row', justifyContent: 'space-around'},
  statItem:       {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
  statNum:        {color: '#fff', fontSize: 20, fontWeight: '800'},
  statLabel:      {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

  dutiesCard:  {backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.06, shadowRadius: 14, elevation: 3},
  dutiesHead:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14},
  dutiesLabel: {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 1, textTransform: 'uppercase'},
  dutiesTag:   {fontSize: 12, fontWeight: '700', color: PINK},
  dutyRow:     {flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(44,61,131,0.08)', backgroundColor: 'rgba(44,61,131,0.02)', marginBottom: 8},
  dutyIconBox: {width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center', flexShrink: 0},
  dutyTitle:   {fontSize: 12, fontWeight: '700', color: BLUE_DEEP},
  dutyDesc:    {fontSize: 11, color: 'rgba(44,61,131,0.5)', marginTop: 2},
  secureNote:  {flexDirection: 'row', justifyContent: 'center', paddingTop: 12, marginTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
  secureText:  {fontSize: 11, color: 'rgba(44,61,131,0.45)', fontWeight: '500'},

  footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
  footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},
});