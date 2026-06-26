// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';

// // ─── API CONFIG ─────────────────────────────────────────
// // TODO: Replace with your live URL when backend is ready
// const API_BASE_URL = 'https://YOUR_API_URL_HERE.com/api';
// // ────────────────────────────────────────────────────────

// const STEPS = [
//   {
//     id: 1,
//     title: 'Company & Location',
//     desc: 'Basic info, industry type, address',
//   },
//   {
//     id: 2,
//     title: 'Contact & POSH',
//     desc: 'Contact person, email, POSH status',
//   },
//   {
//     id: 3,
//     title: 'Company Profile',
//     desc: 'GST, PAN, website, description',
//   },
//   {
//     id: 4,
//     title: 'POSH Survey',
//     desc: 'Inspection survey & compliance report',
//   },
// ];

// const RegisterScreen = ({navigation}: any) => {
//   const [currentStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Step 1 form fields
//   const [orgType, setOrgType] = useState('');
//   const [industrySector, setIndustrySector] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [regType, setRegType] = useState('');
//   const [regNumber, setRegNumber] = useState('');
//   const [totalEmployees, setTotalEmployees] = useState('');
//   const [address, setAddress] = useState('');
//   const [district, setDistrict] = useState('');
//   const [taluka, setTaluka] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState('');

//   const handleNext = async () => {
//     setLoading(true);
//     try {
//       // TODO: Replace with real API call
//       const response = await fetch(`${API_BASE_URL}/company/register/step1`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           orgType,
//           industrySector,
//           companyName,
//           regType,
//           regNumber,
//           totalEmployees,
//           address,
//           district,
//           taluka,
//           city,
//           pincode,
//         }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         // TODO: Navigate to step 2
//         navigation.navigate('Survey');
//       }
//     } catch (err) {
//       // API not live yet — navigate directly for testing
//       navigation.navigate('Survey');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar backgroundColor="#1a2340" barStyle="light-content" />

//       {/* ── Top Header ── */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <View style={styles.logoBox}>
//             <Text style={styles.logoText}>🛡</Text>
//           </View>
//           <View>
//             <Text style={styles.headerTitle}>WCD Portal</Text>
//             <Text style={styles.headerSubtitle}>Company</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.registerBadge}>
//           <Text style={styles.registerBadgeText}>Register</Text>
//         </TouchableOpacity>
//         <Text style={styles.langText}>EN |</Text>
//       </View>

//       {/* ── Breadcrumb ── */}
//       <View style={styles.breadcrumb}>
//         <Text style={styles.breadcrumbText}>
//           WCD Portal {'>'} Company {'>'} Registration ·
//         </Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* ── Admin Card ── */}
//         <View style={styles.adminCard}>
//           <View style={styles.shieldBox}>
//             <Text style={styles.shieldIcon}>🛡</Text>
//           </View>
//           <View style={styles.adminInfo}>
//             <Text style={styles.adminName}>WCD Admin</Text>
//             <Text style={styles.adminSub}>Company Registration</Text>
//           </View>
//           <View style={styles.versionBadge}>
//             <Text style={styles.versionText}>v2.0</Text>
//           </View>
//         </View>

//         {/* ── Form ── */}
//         <View style={styles.formCard}>
//           <Text style={styles.formTitle}>Company & Location</Text>
//           <Text style={styles.formSubtitle}>
//             Basic company information and address · कंपनी माहिती
//           </Text>

//           {/* Step Tabs */}
//           <View style={styles.stepTabs}>
//             {[
//               {num: 1, label: 'Company'},
//               {num: 2, label: 'Contact'},
//               {num: 3, label: 'Profile'},
//             ].map(tab => (
//               <View
//                 key={tab.num}
//                 style={[
//                   styles.stepTab,
//                   currentStep === tab.num && styles.stepTabActive,
//                 ]}>
//                 <Text
//                   style={[
//                     styles.stepTabText,
//                     currentStep === tab.num && styles.stepTabTextActive,
//                   ]}>
//                   {tab.num} {tab.label}
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* Company Details */}
//           <Text style={styles.sectionLabel}>🏢 COMPANY DETAILS · कंपनी तपशील</Text>

//           <View style={styles.row}>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>ORG TYPE *</Text>
//               <View style={styles.selectBox}>
//                 <Text style={styles.placeholder}>Select type</Text>
//                 <Text style={styles.arrow}>▼</Text>
//               </View>
//             </View>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>INDUSTRY SECTOR</Text>
//               <View style={styles.selectBox}>
//                 <Text style={styles.placeholder}>Select sector</Text>
//                 <Text style={styles.arrow}>▼</Text>
//               </View>
//             </View>
//           </View>

//           <Text style={styles.fieldLabel}>COMPANY NAME *</Text>
//           <View style={styles.inputBox}>
//             <Text style={styles.inputIcon}>🏢</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Registered company name"
//               placeholderTextColor="#bbb"
//               value={companyName}
//               onChangeText={setCompanyName}
//             />
//           </View>

//           <View style={styles.row}>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>REG. TYPE *</Text>
//               <View style={styles.selectBox}>
//                 <Text style={styles.placeholder}>Select type</Text>
//                 <Text style={styles.arrow}>▼</Text>
//               </View>
//             </View>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>REG. NUMBER *</Text>
//               <View style={styles.inputBox}>
//                 <Text style={styles.inputIcon}>#</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g. 27AAAAA"
//                   placeholderTextColor="#bbb"
//                   value={regNumber}
//                   onChangeText={setRegNumber}
//                 />
//               </View>
//             </View>
//           </View>

//           <Text style={styles.fieldLabel}>TOTAL EMPLOYEES</Text>
//           <View style={styles.inputBox}>
//             <Text style={styles.inputIcon}>👥</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g. 120"
//               placeholderTextColor="#bbb"
//               keyboardType="numeric"
//               value={totalEmployees}
//               onChangeText={setTotalEmployees}
//             />
//           </View>

//           {/* Location Details */}
//           <Text style={styles.sectionLabel}>📍 LOCATION DETAILS · स्थान तपशील</Text>

//           <Text style={styles.fieldLabel}>ADDRESS</Text>
//           <View style={styles.inputBox}>
//             <Text style={styles.inputIcon}>🏠</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Street, building, area"
//               placeholderTextColor="#bbb"
//               value={address}
//               onChangeText={setAddress}
//             />
//           </View>

//           <View style={styles.row}>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>DISTRICT *</Text>
//               <View style={styles.inputBox}>
//                 <Text style={styles.inputIcon}>📍</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g. Pune"
//                   placeholderTextColor="#bbb"
//                   value={district}
//                   onChangeText={setDistrict}
//                 />
//               </View>
//             </View>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>TALUKA</Text>
//               <View style={styles.inputBox}>
//                 <Text style={styles.inputIcon}>📍</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g. Haveli"
//                   placeholderTextColor="#bbb"
//                   value={taluka}
//                   onChangeText={setTaluka}
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>CITY</Text>
//               <View style={styles.inputBox}>
//                 <Text style={styles.inputIcon}>🌐</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g. Pune"
//                   placeholderTextColor="#bbb"
//                   value={city}
//                   onChangeText={setCity}
//                 />
//               </View>
//             </View>
//             <View style={styles.halfField}>
//               <Text style={styles.fieldLabel}>PINCODE</Text>
//               <View style={styles.inputBox}>
//                 <Text style={styles.inputIcon}>📍</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="6 digit"
//                   placeholderTextColor="#bbb"
//                   keyboardType="numeric"
//                   maxLength={6}
//                   value={pincode}
//                   onChangeText={setPincode}
//                 />
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.nextBtn}
//             onPress={handleNext}
//             disabled={loading}>
//             <Text style={styles.nextBtnText}>
//               {loading ? 'Saving...' : 'Next ·  →'}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.signInRow}>
//             <Text style={styles.signInText}>Already registered? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.signInLink}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* ── Stats Card ── */}
//         <View style={styles.statsCard}>
//           <View style={styles.statsHeader}>
//             <View>
//               <Text style={styles.statsTitle}>WCD Inspection</Text>
//               <Text style={styles.statsSubtitle}>Maharashtra State</Text>
//             </View>
//             <View style={styles.statsIcons}>
//               <View style={styles.iconCircle}>
//                 <Text>🛡</Text>
//               </View>
//               <View style={[styles.iconCircle, styles.iconCircleYellow]}>
//                 <Text>⭐</Text>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.complianceBtn}>
//             <Text style={styles.complianceBtnText}>🛡  COMPANY PORTAL</Text>
//           </TouchableOpacity>

//           <View style={styles.statsRow}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>1,284</Text>
//               <Text style={styles.statLabel}>Inspections</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>342</Text>
//               <Text style={styles.statLabel}>Companies</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>34</Text>
//               <Text style={styles.statLabel}>Districts</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Registration Steps ── */}
//         <View style={styles.stepsCard}>
//           <View style={styles.stepsHeader}>
//             <Text style={styles.stepsTitle}>REGISTRATION STEPS</Text>
//             <Text style={styles.stepsCount}>1 of 4</Text>
//           </View>
//           {STEPS.map(step => (
//             <View
//               key={step.id}
//               style={[
//                 styles.stepRow,
//                 step.id === currentStep && styles.stepRowActive,
//               ]}>
//               <View
//                 style={[
//                   styles.stepNum,
//                   step.id === currentStep && styles.stepNumActive,
//                   step.id < currentStep && styles.stepNumDone,
//                 ]}>
//                 <Text
//                   style={[
//                     styles.stepNumText,
//                     (step.id === currentStep || step.id < currentStep) &&
//                       styles.stepNumTextActive,
//                   ]}>
//                   {step.id < currentStep ? '✓' : step.id}
//                 </Text>
//               </View>
//               <View style={styles.stepInfo}>
//                 <Text
//                   style={[
//                     styles.stepTitle,
//                     step.id === currentStep && styles.stepTitleActive,
//                   ]}>
//                   {step.title}
//                 </Text>
//                 <Text style={styles.stepDesc}>{step.desc}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* ── Security Note ── */}
//         <View style={styles.securityNote}>
//           <Text style={styles.securityText}>
//             🔒 Secure Government Portal · 256-bit SSL Encrypted
//           </Text>
//         </View>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>© 2025 WCD Maharashtra</Text>
//           <View style={styles.footerLinks}>
//             <Text style={styles.footerLink}>Privacy</Text>
//             <Text style={styles.footerDot}> · </Text>
//             <Text style={styles.footerLink}>Terms</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {flex: 1, backgroundColor: '#f5f4f0'},
//   scroll: {paddingBottom: 32},
//   header: {
//     backgroundColor: '#1a2340',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     gap: 8,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     flex: 1,
//   },
//   logoBox: {
//     width: 36,
//     height: 36,
//     backgroundColor: '#f5a623',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoText: {fontSize: 18},
//   headerTitle: {color: '#fff', fontWeight: '600', fontSize: 15},
//   headerSubtitle: {color: '#aab', fontSize: 12},
//   registerBadge: {
//     backgroundColor: '#c0392b',
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//   },
//   registerBadgeText: {color: '#fff', fontSize: 13, fontWeight: '600'},
//   langText: {color: '#aab', fontSize: 13},
//   breadcrumb: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   breadcrumbText: {fontSize: 12, color: '#888'},
//   adminCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     elevation: 2,
//   },
//   shieldBox: {
//     width: 44,
//     height: 44,
//     backgroundColor: '#1a2340',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   shieldIcon: {fontSize: 22},
//   adminInfo: {flex: 1},
//   adminName: {fontSize: 16, fontWeight: '700', color: '#1a2340'},
//   adminSub: {fontSize: 12, color: '#c0392b'},
//   versionBadge: {
//     backgroundColor: '#1a2340',
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   versionText: {color: '#fff', fontSize: 12, fontWeight: '600'},
//   formCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 20,
//     elevation: 2,
//   },
//   formTitle: {fontSize: 24, fontWeight: '700', color: '#111', marginBottom: 4},
//   formSubtitle: {fontSize: 13, color: '#888', marginBottom: 20},
//   stepTabs: {flexDirection: 'row', gap: 6, marginBottom: 20},
//   stepTab: {
//     flex: 1,
//     backgroundColor: '#f0ece8',
//     borderRadius: 20,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   stepTabActive: {backgroundColor: '#c0392b'},
//   stepTabText: {fontSize: 12, color: '#666', fontWeight: '600'},
//   stepTabTextActive: {color: '#fff'},
//   sectionLabel: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#555',
//     marginBottom: 14,
//     marginTop: 8,
//     letterSpacing: 0.3,
//   },
//   row: {flexDirection: 'row', gap: 10, marginBottom: 0},
//   halfField: {flex: 1},
//   fieldLabel: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: '#666',
//     marginBottom: 6,
//     letterSpacing: 0.5,
//   },
//   selectBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     backgroundColor: '#fafafa',
//     marginBottom: 12,
//   },
//   placeholder: {fontSize: 13, color: '#bbb'},
//   arrow: {fontSize: 10, color: '#888'},
//   inputBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     marginBottom: 12,
//     backgroundColor: '#fafafa',
//     gap: 8,
//   },
//   inputIcon: {fontSize: 14, color: '#888'},
//   input: {flex: 1, fontSize: 13, color: '#111'},
//   nextBtn: {
//     backgroundColor: '#c0392b',
//     borderRadius: 10,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 14,
//   },
//   nextBtnText: {color: '#fff', fontWeight: '700', fontSize: 15},
//   signInRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signInText: {fontSize: 13, color: '#555'},
//   signInLink: {fontSize: 13, color: '#c0392b', fontWeight: '700'},
//   statsCard: {
//     backgroundColor: '#1a2340',
//     margin: 16,
//     borderRadius: 14,
//     padding: 18,
//   },
//   statsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 14,
//   },
//   statsTitle: {color: '#fff', fontSize: 18, fontWeight: '700'},
//   statsSubtitle: {color: '#aab', fontSize: 12, marginTop: 2},
//   statsIcons: {flexDirection: 'row', gap: 8},
//   iconCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconCircleYellow: {backgroundColor: '#f5a623'},
//   complianceBtn: {
//     backgroundColor: '#c0392b',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   complianceBtnText: {color: '#fff', fontWeight: '700', fontSize: 14},
//   statsRow: {flexDirection: 'row', justifyContent: 'space-around'},
//   statItem: {alignItems: 'center'},
//   statValue: {color: '#fff', fontSize: 22, fontWeight: '700'},
//   statLabel: {color: '#aab', fontSize: 12, marginTop: 2},
//   stepsCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 16,
//     elevation: 2,
//   },
//   stepsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   stepsTitle: {fontSize: 13, fontWeight: '700', color: '#333'},
//   stepsCount: {fontSize: 13, color: '#888'},
//   stepRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 12,
//     marginBottom: 14,
//   },
//   stepRowActive: {},
//   stepNum: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   stepNumActive: {backgroundColor: '#c0392b'},
//   stepNumDone: {backgroundColor: '#1a2340'},
//   stepNumText: {fontSize: 13, fontWeight: '700', color: '#888'},
//   stepNumTextActive: {color: '#fff'},
//   stepInfo: {flex: 1},
//   stepTitle: {fontSize: 13, fontWeight: '600', color: '#555'},
//   stepTitleActive: {color: '#1a2340'},
//   stepDesc: {fontSize: 11, color: '#999', marginTop: 2},
//   securityNote: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     marginHorizontal: 16,
//   },
//   securityText: {fontSize: 12, color: '#888'},
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 4,
//   },
//   footerText: {fontSize: 12, color: '#888'},
//   footerLinks: {flexDirection: 'row'},
//   footerLink: {fontSize: 12, color: '#555'},
//   footerDot: {fontSize: 12, color: '#999'},
// });

// export default RegisterScreen;

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

const ORG_TYPE_OPTIONS = ['Private','Government','Semi-Government','NGO','Trust','Other'];
const INDUSTRY_OPTIONS = ['Manufacturing','IT / Software','Healthcare','Education','Retail','Construction','Finance & Banking','Hospitality','Other'];
const REG_TYPE_OPTIONS = ['GST','PAN','TAN'];

const ORG_TYPE_DB_MAP: Record<string, string> = {
  'Private': 'private', 'Government': 'government',
  'Semi-Government': 'semi-government', 'NGO': 'ngo',
  'Trust': 'trust', 'Other': 'other',
};

const PAGE_TITLES = [
  {title: 'Company & Location', sub: 'Basic company information and address'},
  {title: 'Contact & POSH',    sub: 'Contact person and POSH compliance details'},
  {title: 'Company Profile',   sub: 'Additional profile details (optional)'},
];

// ── Simple Select Component ──
function SelectField({
  label, icon, value, options, onSelect,
}: {label: string; icon: string; value: string; options: string[]; onSelect: (v: string) => void}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{marginBottom: 14}}>
      <Text style={fs.fieldLabel}>{label}</Text>
      <TouchableOpacity style={fs.inputWrap} onPress={() => setOpen(!open)}>
        <View style={fs.inputIcon}><Text>{icon}</Text></View>
        <Text style={[fs.input, !value && {color: 'rgba(44,61,131,0.35)'}]}>
          {value || `Select ${label.replace(' *','')}`}
        </Text>
        <Text style={fs.arrow}>▼</Text>
      </TouchableOpacity>
      {open && (
        <View style={fs.menu}>
          {options.map(o => (
            <TouchableOpacity
              key={o}
              style={[fs.menuItem, value === o && fs.menuItemActive]}
              onPress={() => {onSelect(o); setOpen(false);}}>
              <Text style={[fs.menuText, value === o && fs.menuTextActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ── Text Field Component ──
function InputField({
  label, icon, placeholder, value, onChangeText,
  keyboardType = 'default', maxLength, multiline = false, secureTextEntry = false,
}: any) {
  return (
    <View style={{marginBottom: 14}}>
      <Text style={fs.fieldLabel}>{label}</Text>
      <View style={[fs.inputWrap, multiline && {alignItems: 'flex-start'}]}>
        <View style={[fs.inputIcon, multiline && {paddingTop: 13}]}>
          <Text>{icon}</Text>
        </View>
        <TextInput
          style={[fs.input, {flex: 1}, multiline && {height: 72, textAlignVertical: 'top', paddingTop: 12}]}
          placeholder={placeholder}
          placeholderTextColor="rgba(44,61,131,0.35)"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

export default function RegisterScreen({navigation}: any) {
  const [page, setPage]       = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Page 0
    orgtype: '', companyName: '', regnoType: '', registrationNumber: '',
    industryType: '', totalEmployees: '', address: '', city: '',
    district: '', taluka: '', pincode: '',
    // Page 1
    contactPersonName: '', username: '', contactPhone: '',
    email: '', password: '',
    poshPolicyAdopted: '', complaintMechanismInPlace: '',
    // Page 2
    website: '', gstNumber: '', panNumber: '',
    cinNumber: '', foundedYear: '', companyDescription: '', femaleEmployees: '',
  });

  const update = (key: string) => (val: string) =>
    setForm(prev => ({...prev, [key]: val}));

  const handleNext = () => {
    if (page === 0) {
      if (!form.orgtype || !form.companyName || !form.district) {
        Alert.alert('Error', 'Org Type, Company Name ani District bharana'); return;
      }
      setPage(1); return;
    }
    if (page === 1) {
      if (!form.username || !form.contactPhone || !form.password) {
        Alert.alert('Error', 'Username, Mobile ani Password bharana'); return;
      }
      setPage(2); return;
    }
    handleSubmit();
  };

  // ── POST /api/org/register ──
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        orgtype:         ORG_TYPE_DB_MAP[form.orgtype] || 'private',
        orgsector:       form.industryType,
        orgname:         form.companyName.trim(),
        orgaddress:      form.address.trim(),
        ruralurban:      'Urban',
        district:        form.district.trim(),
        taluka:          form.taluka.trim(),
        mahapalika:      '',
        ward:            '',
        pincode:         form.pincode.trim(),
        revenuedivision: '',
        regnotype:       form.regnoType,
        regnovalue:      form.registrationNumber.trim(),
        concernname:     form.contactPersonName.trim(),
        username:        form.username.trim(),
        concernmobile:   form.contactPhone.trim(),
        concernemail:    form.email.trim(),
        password:        form.password,
      };

      const res  = await fetch(`${API_BASE}/register`, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) {
        Alert.alert('Error', data.message || 'Registration failed'); return;
      }

      // TODO: AsyncStorage madhe token save kar

       if (data.token) {
      await AsyncStorage.setItem('orgToken', data.token);
    }
    if (data.org || data.organization) {
      await AsyncStorage.setItem('companyUser', JSON.stringify(data.org || data.organization));
    }
      Alert.alert('Success', 'Registration successful! POSH Survey la ja.', [
        {text: 'OK', onPress: () => navigation.navigate('Survey')},
      ]);
    } catch (err) {
      Alert.alert('Error', 'Server error. Backend chalu aahe ka?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

      {/* Top Bar */}
      <View style={s.topbar}>
        <TouchableOpacity
          style={s.backBtn}
          onPress={() => page > 0 ? setPage(page - 1) : navigation.goBack()}>
          <Text style={s.backText}>← {page > 0 ? 'Back' : 'Login'}</Text>
        </TouchableOpacity>
        <Text style={s.topbarTitle}>Company Registration</Text>
        <View style={s.statusPill}>
          <View style={s.statusDot} />
          <Text style={s.statusText}>Online</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

        {/* ── Form Card ── */}
        <View style={s.card}>

          {/* Brand */}
          <View style={s.brandRow}>
            <View style={s.brand}>
              <View style={s.brandIcon}>
                <Text style={{fontSize: 22}}>🏢</Text>
              </View>
              <View>
                <Text style={s.brandTitle}>WCD Admin</Text>
                <Text style={s.brandSub}>Company Registration</Text>
              </View>
            </View>
            <View style={s.versionPill}>
              <Text style={s.versionText}>v2.0</Text>
            </View>
          </View>

          <Text style={s.heading}>{PAGE_TITLES[page].title}</Text>
          <Text style={s.subheading}>{PAGE_TITLES[page].sub}</Text>

          {/* Stepper */}
          <View style={s.stepper}>
            {['Company', 'Contact', 'Profile'].map((label, i) => (
              <View
                key={i}
                style={[
                  s.step,
                  page === i && s.stepActive,
                  page > i && s.stepDone,
                ]}>
                <View style={[s.stepNum, page === i && s.stepNumActive, page > i && s.stepNumDone]}>
                  <Text style={[s.stepNumText, (page === i || page > i) && s.stepNumTextActive]}>
                    {page > i ? '✓' : i + 1}
                  </Text>
                </View>
                <Text style={[s.stepLabel, page === i && s.stepLabelActive]}>{label}</Text>
              </View>
            ))}
          </View>

          {/* ── PAGE 0 ── */}
          {page === 0 && (
            <View>
              <View style={s.sectionHead}>
                <Text style={s.sectionIcon}>🏢</Text>
                <Text style={s.sectionTitle}>COMPANY DETAILS</Text>
              </View>

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <SelectField label="Org Type *" icon="🏗" value={form.orgtype} options={ORG_TYPE_OPTIONS} onSelect={update('orgtype')} />
                </View>
                <View style={{flex: 1}}>
                  <SelectField label="Industry Sector" icon="🏭" value={form.industryType} options={INDUSTRY_OPTIONS} onSelect={update('industryType')} />
                </View>
              </View>

              <InputField label="Company Name *" icon="🏢" placeholder="Registered company name" value={form.companyName} onChangeText={update('companyName')} />

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <SelectField label="Reg. Type *" icon="#️⃣" value={form.regnoType} options={REG_TYPE_OPTIONS} onSelect={update('regnoType')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Reg. Number *" icon="#️⃣" placeholder="e.g. 27AAAAA0000A1Z5" value={form.registrationNumber} onChangeText={update('registrationNumber')} />
                </View>
              </View>

              <InputField label="Total Employees" icon="👥" placeholder="e.g. 120" value={form.totalEmployees} onChangeText={update('totalEmployees')} keyboardType="numeric" />

              <View style={s.sectionHead}>
                <Text style={s.sectionIcon}>📍</Text>
                <Text style={s.sectionTitle}>LOCATION DETAILS</Text>
              </View>

              <InputField label="Address" icon="🏠" placeholder="Street, building, area" value={form.address} onChangeText={update('address')} multiline />

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="District *" icon="📍" placeholder="e.g. Pune" value={form.district} onChangeText={update('district')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Taluka" icon="📍" placeholder="e.g. Haveli" value={form.taluka} onChangeText={update('taluka')} />
                </View>
              </View>

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="City" icon="🌐" placeholder="e.g. Pune" value={form.city} onChangeText={update('city')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Pincode" icon="📍" placeholder="6 digit" value={form.pincode} onChangeText={t => update('pincode')(t.replace(/\D/g, '').slice(0, 6))} keyboardType="numeric" maxLength={6} />
                </View>
              </View>
            </View>
          )}

          {/* ── PAGE 1 ── */}
          {page === 1 && (
            <View>
              <View style={s.sectionHead}>
                <Text style={s.sectionIcon}>👤</Text>
                <Text style={s.sectionTitle}>CONTACT DETAILS</Text>
              </View>

              <InputField label="Contact Person Name" icon="👤" placeholder="Full name" value={form.contactPersonName} onChangeText={update('contactPersonName')} />
              <InputField label="Username *" icon="👤" placeholder="Choose a username" value={form.username} onChangeText={update('username')} />

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="Mobile Number *" icon="📱" placeholder="10 digit" value={form.contactPhone} onChangeText={t => update('contactPhone')(t.replace(/\D/g, '').slice(0, 10))} keyboardType="numeric" maxLength={10} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Email Address" icon="📧" placeholder="company@email.com" value={form.email} onChangeText={update('email')} keyboardType="email-address" />
                </View>
              </View>

              <InputField label="Password *" icon="🔒" placeholder="Create a login password" value={form.password} onChangeText={update('password')} secureTextEntry />

              <View style={s.sectionHead}>
                <Text style={s.sectionIcon}>🛡</Text>
                <Text style={s.sectionTitle}>POSH INFORMATION</Text>
              </View>

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <SelectField label="POSH Policy" icon="✅" value={form.poshPolicyAdopted} options={['yes','no','in_progress']} onSelect={update('poshPolicyAdopted')} />
                </View>
                <View style={{flex: 1}}>
                  <SelectField label="Complaint Mechanism" icon="⚠️" value={form.complaintMechanismInPlace} options={['yes','no','in_progress']} onSelect={update('complaintMechanismInPlace')} />
                </View>
              </View>

              <View style={s.noteBox}>
                <Text style={s.noteText}>
                  Registration नंतर तुम्ही full company profile complete करू शकता आणि POSH Inspection Survey साठी proceed करू शकता.
                </Text>
              </View>
            </View>
          )}

          {/* ── PAGE 2 ── */}
          {page === 2 && (
            <View>
              <View style={s.sectionHead}>
                <Text style={s.sectionIcon}>🏢</Text>
                <Text style={s.sectionTitle}>COMPANY PROFILE</Text>
              </View>

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="Website" icon="🌐" placeholder="https://company.com" value={form.website} onChangeText={update('website')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Founded Year" icon="#️⃣" placeholder="e.g. 2005" value={form.foundedYear} onChangeText={update('foundedYear')} keyboardType="numeric" />
                </View>
              </View>

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="GST Number" icon="#️⃣" placeholder="27AAAAA0000A1Z5" value={form.gstNumber} onChangeText={update('gstNumber')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="PAN Number" icon="#️⃣" placeholder="AAAAA0000A" value={form.panNumber} onChangeText={update('panNumber')} />
                </View>
              </View>

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="CIN Number" icon="#️⃣" placeholder="U12345MH..." value={form.cinNumber} onChangeText={update('cinNumber')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Female Employees" icon="👥" placeholder="e.g. 45" value={form.femaleEmployees} onChangeText={update('femaleEmployees')} keyboardType="numeric" />
                </View>
              </View>

              <InputField label="Company Description" icon="🏠" placeholder="Brief description of your company..." value={form.companyDescription} onChangeText={update('companyDescription')} multiline />

              <View style={[s.noteBox, {borderColor: 'rgba(205,54,107,0.15)', backgroundColor: 'rgba(205,54,107,0.04)'}]}>
                <Text style={s.noteText}>
                  🔹 हे fields optional आहेत — blank सोडू शकता. Submit केल्यावर थेट POSH Survey वर जाल.
                </Text>
              </View>
            </View>
          )}

          {/* Buttons */}
          <View style={s.btnRow}>
            {page > 0 && (
              <TouchableOpacity style={s.ghostBtn} onPress={() => setPage(page - 1)}>
                <Text style={s.ghostBtnText}>← Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[s.submitBtn, loading && s.btnDisabled]}
              onPress={handleNext}
              disabled={loading}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={s.submitBtnText}>
                    {page < 2 ? 'Next →' : 'Proceed to POSH Survey ✓'}
                  </Text>}
            </TouchableOpacity>
          </View>

          <View style={s.linksRow}>
            <Text style={s.linksText}>Already registered? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CompanyLogin')}>
              <Text style={s.linksLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Info Card ── */}
        <View style={s.infoCard}>
          <View style={s.badgeRow}>
            <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
            <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
          </View>
          <Text style={s.infoTitle}>WCD Inspection</Text>
          <Text style={s.infoSub}>Maharashtra State</Text>
          <View style={s.portalPill}>
            <Text style={s.portalPillText}>🛡 COMPANY PORTAL</Text>
          </View>
          <Text style={s.infoDesc}>
            Women &amp; Child Development —{'\n'}
            POSH Compliance &amp; Inspection System
          </Text>
          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Text style={s.statNum}>1,284</Text>
              <Text style={s.statLabel}>Inspections</Text>
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

        {/* Steps Card */}
        <View style={s.stepsCard}>
          <View style={s.stepsHead}>
            <Text style={s.stepsLabel}>REGISTRATION STEPS</Text>
            <Text style={s.stepsTag}>{page + 1} of 4</Text>
          </View>
          {[
            {label: 'Company & Location', desc: 'Basic info, industry type, address'},
            {label: 'Contact & POSH',     desc: 'Contact person, email, POSH status'},
            {label: 'Company Profile',    desc: 'GST, PAN, website, description'},
            {label: 'POSH Survey',        desc: 'Inspection survey & compliance report', posh: true},
          ].map((step, i) => (
            <View
              key={i}
              style={[
                s.stepRow,
                page === i && s.stepRowActive,
                step.posh && s.stepRowPosh,
              ]}>
              <View style={[s.stepDot, page === i && s.stepDotActive, page > i && s.stepDotDone]}>
                <Text style={[s.stepDotText, (page === i || page > i) && s.stepDotTextActive]}>
                  {page > i ? '✓' : i + 1}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[s.stepRowTitle, step.posh && {color: PINK}]}>{step.label}</Text>
                <Text style={s.stepRowDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
          <View style={s.secureNote}>
            <Text style={s.secureText}>🔒 Secure Government Portal · 256-bit SSL</Text>
          </View>
        </View>

      </ScrollView>

      <View style={s.footer}>
        <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

// ── Field Styles ──
const fs = StyleSheet.create({
  fieldLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8},
  inputWrap:  {flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, overflow: 'hidden'},
  inputIcon:  {width: 42, backgroundColor: 'rgba(44,61,131,0.05)', paddingVertical: 13, alignItems: 'center', borderRightWidth: 1, borderRightColor: 'rgba(44,61,131,0.12)'},
  input:      {flex: 1, fontSize: 13, color: '#1d2a60', paddingHorizontal: 10, paddingVertical: 13},
  arrow:      {paddingRight: 12, fontSize: 10, color: 'rgba(44,61,131,0.5)'},
  menu:       {borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, marginTop: 4, overflow: 'hidden', backgroundColor: '#fff'},
  menuItem:   {paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
  menuItemActive: {backgroundColor: 'rgba(205,54,107,0.06)'},
  menuText:   {fontSize: 13, color: '#1d2a60'},
  menuTextActive: {color: '#CD366B', fontWeight: '700'},
});

// ── Screen Styles ──
const s = StyleSheet.create({
  safe:   {flex: 1, backgroundColor: CREAM},
  scroll: {padding: 16, paddingBottom: 8},

  topbar:      {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  backBtn:     {paddingVertical: 4, paddingRight: 8},
  backText:    {fontSize: 13, color: BLUE, fontWeight: '700'},
  topbarTitle: {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  statusPill:  {flexDirection: 'row', alignItems: 'center', gap: 5},
  statusDot:   {width: 7, height: 7, borderRadius: 4, backgroundColor: PINK},
  statusText:  {fontSize: 12, fontWeight: '600', color: PINK},

  card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 22, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

  brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
  brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  brandTitle:  {fontSize: 17, fontWeight: '800', color: BLUE_DEEP},
  brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
  versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
  versionText: {fontSize: 11, fontWeight: '700', color: PINK},

  heading:    {fontSize: 22, fontWeight: '800', color: BLUE_DEEP, letterSpacing: -0.3, marginBottom: 4},
  subheading: {fontSize: 13, color: 'rgba(44,61,131,0.55)', marginBottom: 18},

  stepper:       {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 4, gap: 4, marginBottom: 20},
  step:          {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 9, borderRadius: 9},
  stepActive:    {backgroundColor: PINK, shadowColor: PINK, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4},
  stepDone:      {backgroundColor: 'rgba(44,61,131,0.08)'},
  stepNum:       {width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center'},
  stepNumActive: {backgroundColor: 'rgba(255,255,255,0.25)'},
  stepNumDone:   {backgroundColor: BLUE},
  stepNumText:   {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
  stepNumTextActive: {color: '#fff'},
  stepLabel:     {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},
  stepLabelActive:{color: '#fff'},

  sectionHead:  {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14, marginTop: 4},
  sectionIcon:  {fontSize: 14},
  sectionTitle: {fontSize: 11, fontWeight: '800', color: BLUE_DEEP, textTransform: 'uppercase', letterSpacing: 0.8},

  twoCol: {flexDirection: 'row', gap: 10},

  noteBox:  {backgroundColor: 'rgba(44,61,131,0.04)', borderWidth: 1, borderColor: 'rgba(44,61,131,0.10)', borderRadius: 10, padding: 12, marginTop: 4},
  noteText: {fontSize: 12, color: 'rgba(44,61,131,0.55)', lineHeight: 18},

  btnRow:        {flexDirection: 'row', gap: 10, marginTop: 20},
  ghostBtn:      {paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
  ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
  btnDisabled:   {opacity: 0.5},
  submitBtnText: {color: '#fff', fontSize: 14, fontWeight: '700'},

  linksRow:  {flexDirection: 'row', justifyContent: 'center', marginTop: 16},
  linksText: {fontSize: 13, color: 'rgba(44,61,131,0.55)'},
  linksLink: {fontSize: 13, fontWeight: '700', color: PINK},

  infoCard:    {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
  badgeRow:    {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
  logoBadge:   {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
  infoTitle:   {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
  infoSub:     {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
  portalPill:  {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
  portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
  infoDesc:    {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 18},
  statsRow:    {flexDirection: 'row', justifyContent: 'space-around'},
  statItem:    {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
  statNum:     {color: '#fff', fontSize: 18, fontWeight: '800'},
  statLabel:   {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

  stepsCard:    {backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.06, shadowRadius: 14, elevation: 3},
  stepsHead:    {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14},
  stepsLabel:   {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 1, textTransform: 'uppercase'},
  stepsTag:     {fontSize: 12, fontWeight: '700', color: PINK},
  stepRow:      {flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(44,61,131,0.08)', backgroundColor: 'rgba(44,61,131,0.02)', marginBottom: 8},
  stepRowActive:{borderColor: 'rgba(205,54,107,0.20)', backgroundColor: 'rgba(205,54,107,0.04)'},
  stepRowPosh:  {borderColor: 'rgba(205,54,107,0.30)', backgroundColor: 'rgba(205,54,107,0.03)'},
  stepDot:      {width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(44,61,131,0.08)', justifyContent: 'center', alignItems: 'center', marginTop: 1},
  stepDotActive:{backgroundColor: PINK},
  stepDotDone:  {backgroundColor: BLUE},
  stepDotText:  {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
  stepDotTextActive: {color: '#fff'},
  stepRowTitle: {fontSize: 12, fontWeight: '700', color: BLUE_DEEP},
  stepRowDesc:  {fontSize: 10, color: 'rgba(44,61,131,0.5)', marginTop: 2},
  secureNote:   {flexDirection: 'row', justifyContent: 'center', paddingTop: 12, marginTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
  secureText:   {fontSize: 11, color: 'rgba(44,61,131,0.45)', fontWeight: '500'},

  footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
  footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},
});