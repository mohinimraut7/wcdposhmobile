import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';

const API_BASE = 'https://mahaposhact.saavi.co.in/api/org';

const PINK      = '#CD366B';
const PINK_DARK = '#b82a5c';
const BLUE      = '#2C3D83';
const BLUE_DEEP = '#1d2a60';
const CREAM     = '#FBF3EE';

export default function CompanyLoginScreen({navigation}: any) {
  const [mode, setMode] = useState<'password' | 'otp'>('password');

  // password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  // otp
  const [mobile, setMobile]         = useState('');
  const [otp, setOtp]               = useState('');
  const [otpSent, setOtpSent]       = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // ── POST /api/org/login-username ──
  const handlePasswordLogin = async () => {
    if (!username.trim()) {Alert.alert('Error', 'Username enter kara'); return;}
    if (!password)        {Alert.alert('Error', 'Password enter kara'); return;}
    try {
      setLoading(true);
      const res  = await fetch(`${API_BASE}/login-username`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify({username: username.trim(), password}),
      });
      const data = await res.json();
      if (!data.success) {Alert.alert('Error', data.message || 'Login failed'); return;}
      // TODO: AsyncStorage madhe token save kar
 // ── Token save kar ──
    if (data.token) {
      await AsyncStorage.setItem('orgToken', data.token);
    }
    if (data.org || data.organization) {
      await AsyncStorage.setItem('companyUser', JSON.stringify(data.org || data.organization));
    }

      Alert.alert('Success', 'Login successful!', [
        {text: 'OK', onPress: () => navigation.navigate('Survey')},
      ]);
    } catch (err) {
      Alert.alert('Error', 'Server error');
    } finally {
      setLoading(false);
    }
  };

  // ── POST /api/org/send-otp ──
  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) {Alert.alert('Error', 'Valid 10 digit mobile taka'); return;}
    try {
      setOtpLoading(true);
      const res  = await fetch(`${API_BASE}/send-otp`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify({concernmobile: mobile}),
      });
      const data = await res.json();
      if (!data.success) {Alert.alert('Error', data.message || 'OTP pathavta ala nahi'); return;}
      setOtpSent(true);

 // ── Token save kar ──  👈 HE ADD KAR
    if (data.token) {
      await AsyncStorage.setItem('orgToken', data.token);
    }
    if (data.org || data.organization) {
      await AsyncStorage.setItem('companyUser', JSON.stringify(data.org || data.organization));
    }


      Alert.alert('Success', 'OTP pathavla aahe');
    } catch (err) {
      Alert.alert('Error', 'Server error');
    } finally {
      setOtpLoading(false);
    }
  };

  // ── POST /api/org/verify-otp ──
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {Alert.alert('Error', 'OTP enter kara'); return;}
    try {
      setOtpLoading(true);
      const res  = await fetch(`${API_BASE}/verify-otp`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify({concernmobile: mobile, otp: otp.trim()}),
      });
      const data = await res.json();
      if (!data.success) {Alert.alert('Error', data.message || 'Login failed'); return;}
      Alert.alert('Success', 'Login successful!', [
        {text: 'OK', onPress: () => navigation.navigate('Survey')},
      ]);
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
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

      {/* Top Bar */}
      <View style={s.topbar}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={s.topbarCenter}>
          <View style={s.topbarIcon}><Text style={{fontSize: 14}}>🛡</Text></View>
          <Text style={s.topbarTitle}>WCD Portal</Text>
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
            <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
            <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
          </View>
          <Text style={s.infoTitle}>Company Portal</Text>
          <Text style={s.infoSub}>Maharashtra WCD</Text>
          <View style={s.portalPill}>
            <Text style={s.portalPillText}>🛡 POSH COMPLIANCE</Text>
          </View>
          <Text style={s.infoDesc}>
            POSH Act 2013 Compliance —{'\n'}
            Register, Survey & Inspection Management
          </Text>
          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Text style={s.statNum}>1,284</Text>
              <Text style={s.statLabel}>Surveys</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statNum}>342</Text>
              <Text style={s.statLabel}>Companies</Text>
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
              <View style={s.brandIcon}>
                <Text style={{fontSize: 22}}>🏢</Text>
              </View>
              <View>
                <Text style={s.brandTitle}>WCD Portal</Text>
                <Text style={s.brandSub}>Company Login</Text>
              </View>
            </View>
            <View style={s.versionPill}>
              <Text style={s.versionText}>v2.0</Text>
            </View>
          </View>

          <Text style={s.heading}>Company Sign In</Text>
          <Text style={s.subheading}>Login to access POSH Survey and compliance tools</Text>

          {/* Mode Tabs */}
          <View style={s.tabs}>
            <TouchableOpacity
              style={[s.tab, mode === 'password' && s.tabActive]}
              onPress={() => switchMode('password')}>
              <Text style={[s.tabText, mode === 'password' && s.tabTextActive]}>
                👤 Username & Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.tab, mode === 'otp' && s.tabActive]}
              onPress={() => switchMode('otp')}>
              <Text style={[s.tabText, mode === 'otp' && s.tabTextActive]}>
                📱 Mobile OTP
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── PASSWORD ── */}
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
                <TouchableOpacity
                  style={s.eyeBtn}
                  onPress={() => setShowPass(!showPass)}>
                  <Text>{showPass ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[s.submitBtn, loading && s.btnDisabled]}
                onPress={handlePasswordLogin}
                disabled={loading}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.submitBtnText}>→ Sign In</Text>}
              </TouchableOpacity>
            </>
          )}

          {/* ── OTP ── */}
          {mode === 'otp' && (
            <>
              <Text style={s.fieldLabel}>MOBILE NUMBER</Text>
              <View style={s.otpRow}>
                <View style={[s.inputWrap, {flex: 1, marginBottom: 0}]}>
                  <View style={s.inputIcon}><Text>📱</Text></View>
                  <TextInput
                    style={s.input}
                    placeholder="10 digit mobile"
                    placeholderTextColor="rgba(44,61,131,0.35)"
                    value={mobile}
                    onChangeText={t => setMobile(t.replace(/\D/g, '').slice(0, 10))}
                    keyboardType="numeric"
                    editable={!otpSent}
                  />
                </View>
                <TouchableOpacity
                  style={[s.sendOtpBtn, (otpLoading || otpSent) && s.btnDisabled]}
                  onPress={handleSendOtp}
                  disabled={otpLoading || otpSent}>
                  <Text style={s.sendOtpText}>
                    {otpSent ? 'Sent ✓' : otpLoading ? '...' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>
              </View>

              {otpSent && (
                <Text style={s.otpNote}>✓ OTP tumchya mobile var pathavla aahe</Text>
              )}

              {otpSent && (
                <>
                  <Text style={[s.fieldLabel, {marginTop: 14}]}>ENTER OTP</Text>
                  <View style={s.inputWrap}>
                    <View style={s.inputIcon}><Text style={{fontWeight:'800'}}>#</Text></View>
                    <TextInput
                      style={s.input}
                      placeholder="6 digit OTP"
                      placeholderTextColor="rgba(44,61,131,0.35)"
                      value={otp}
                      onChangeText={t => setOtp(t.replace(/\D/g, '').slice(0, 6))}
                      keyboardType="numeric"
                    />
                  </View>
                </>
              )}

              <TouchableOpacity
                style={[s.submitBtn, {marginTop: 14}, (!otpSent || otpLoading) && s.btnDisabled]}
                onPress={handleVerifyOtp}
                disabled={!otpSent || otpLoading}>
                {otpLoading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.submitBtnText}>→ Verify & Sign In</Text>}
              </TouchableOpacity>
            </>
          )}

          {/* Links */}
          <View style={s.linksRow}>
            <Text style={s.linksText}>New company? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={s.linksLink}>Register here</Text>
            </TouchableOpacity>
            <Text style={s.linksSep}> · </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={s.linksLink}>Admin Login</Text>
            </TouchableOpacity>
          </View>
        </View>

      

        {/* Flow Card */}
        {/* <View style={s.flowCard}>
          <View style={s.flowHead}>
            <Text style={s.flowLabel}>COMPANY FLOW</Text>
            <Text style={s.flowTag}>4 Steps</Text>
          </View>
          {[
            {label: 'Register',    desc: 'Company details & location',      done: true,  active: false},
            {label: 'Login',       desc: 'Username/password or mobile OTP', done: false, active: true},
            {label: 'POSH Survey', desc: 'Complete compliance survey',      done: false, active: false},
            {label: 'Inspection',  desc: 'Officer visit & report',          done: false, active: false},
          ].map((step, i) => (
            <View key={i} style={[s.flowStep, step.active && s.flowStepActive]}>
              <View style={[s.flowDot, step.active && s.flowDotActive, step.done && s.flowDotDone]}>
                <Text style={[s.flowDotText, (step.active || step.done) && s.flowDotTextActive]}>
                  {step.done ? '✓' : i + 1}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={s.flowStepTitle}>{step.label}</Text>
                <Text style={s.flowStepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
          <View style={s.secureNote}>
            <Text style={s.secureText}>🔒 Secure Portal · 256-bit SSL Encrypted</Text>
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

  topbar:       {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  backBtn:      {paddingVertical: 4, paddingRight: 8},
  backText:     {fontSize: 13, color: BLUE, fontWeight: '700'},
  topbarCenter: {flexDirection: 'row', alignItems: 'center', gap: 8},
  topbarIcon:   {width: 28, height: 28, borderRadius: 7, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  topbarTitle:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  statusPill:   {flexDirection: 'row', alignItems: 'center', gap: 5},
  statusDot:    {width: 7, height: 7, borderRadius: 4, backgroundColor: PINK},
  statusText:   {fontSize: 12, fontWeight: '600', color: PINK},

  card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 22, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

  brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
  brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  brandTitle:  {fontSize: 17, fontWeight: '800', color: BLUE_DEEP},
  brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
  versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
  versionText: {fontSize: 11, fontWeight: '700', color: PINK},

  heading:    {fontSize: 25, fontWeight: '800', color: BLUE_DEEP, letterSpacing: -0.3, marginBottom: 4},
  subheading: {fontSize: 13, color: 'rgba(44,61,131,0.55)', marginBottom: 18},

  tabs:          {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 4, gap: 4, marginBottom: 18},
  tab:           {flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: 'center'},
  tabActive:     {backgroundColor: PINK, shadowColor: PINK, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4},
  tabText:       {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
  tabTextActive: {color: '#fff'},

  fieldLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8},

  inputWrap: {flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, marginBottom: 14, overflow: 'hidden'},
  inputIcon: {width: 42, backgroundColor: 'rgba(44,61,131,0.05)', paddingVertical: 13, alignItems: 'center', borderRightWidth: 1, borderRightColor: 'rgba(44,61,131,0.12)'},
  input:     {flex: 1, fontSize: 14, color: BLUE_DEEP, paddingHorizontal: 12, paddingVertical: 13},
  eyeBtn:    {paddingHorizontal: 12},

  otpRow:     {flexDirection: 'row', gap: 10, marginBottom: 0},
  sendOtpBtn: {backgroundColor: BLUE, paddingHorizontal: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 0},
  sendOtpText:{color: '#fff', fontSize: 12, fontWeight: '700'},
  otpNote:    {fontSize: 12, color: PINK, fontWeight: '600', marginTop: 10},

  submitBtn:     {backgroundColor: PINK, borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 6, shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
  btnDisabled:   {opacity: 0.5},
  submitBtnText: {color: '#fff', fontSize: 15, fontWeight: '700'},

  linksRow:  {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, flexWrap: 'wrap'},
  linksText: {fontSize: 13, color: 'rgba(44,61,131,0.55)'},
  linksLink: {fontSize: 13, fontWeight: '700', color: PINK},
  linksSep:  {fontSize: 13, color: 'rgba(44,61,131,0.3)'},

  infoCard:    {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
  badgeRow:    {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
  logoBadge:   {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
  infoTitle:   {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
  infoSub:     {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
  portalPill:  {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14, shadowColor: PINK, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 4},
  portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
  infoDesc:    {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 18},
  statsRow:    {flexDirection: 'row', justifyContent: 'space-around'},
  statItem:    {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
  statNum:     {color: '#fff', fontSize: 18, fontWeight: '800'},
  statLabel:   {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

  flowCard:      {backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.06, shadowRadius: 14, elevation: 3},
  flowHead:      {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14},
  flowLabel:     {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 1, textTransform: 'uppercase'},
  flowTag:       {fontSize: 12, fontWeight: '700', color: PINK},
  flowStep:      {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(44,61,131,0.08)', backgroundColor: 'rgba(44,61,131,0.02)', marginBottom: 8},
  flowStepActive:{borderColor: 'rgba(205,54,107,0.22)', backgroundColor: 'rgba(205,54,107,0.04)'},
  flowDot:       {width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(44,61,131,0.08)', justifyContent: 'center', alignItems: 'center'},
  flowDotActive: {backgroundColor: PINK},
  flowDotDone:   {backgroundColor: BLUE},
  flowDotText:   {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
  flowDotTextActive: {color: '#fff'},
  flowStepTitle: {fontSize: 12, fontWeight: '700', color: BLUE_DEEP},
  flowStepDesc:  {fontSize: 10, color: 'rgba(44,61,131,0.5)', marginTop: 1},
  secureNote:    {flexDirection: 'row', justifyContent: 'center', paddingTop: 12, marginTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
  secureText:    {fontSize: 11, color: 'rgba(44,61,131,0.45)', fontWeight: '500'},

  footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
  footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},
});