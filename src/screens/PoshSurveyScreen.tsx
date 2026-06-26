// import React, {useState} from 'react';
// import {
//   View,
//   Text,
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

// const SURVEY_PARTS = [
//   {
//     id: 1,
//     title: 'Part A – POSH Policy and Internal Committee (IC) Related Compliance',
//     active: true,
//   },
//   {id: 2, title: 'Part B – Support / Assistance to the Aggrieved Woman', active: false},
//   {id: 3, title: 'Part C – Awareness and Training', active: false},
//   {id: 4, title: "Part D – Employer's Responsibility", active: false},
//   {
//     id: 5,
//     title: 'Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding',
//     active: false,
//   },
// ];

// const QUESTIONS: {id: number; text: string}[] = [
//   {
//     id: 1,
//     text: 'Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)',
//   },
//   {
//     id: 2,
//     text: 'Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))',
//   },
//   {
//     id: 3,
//     text: 'Has She-Box Portal been made available on the official website and on official social media?',
//   },
//   {
//     id: 4,
//     text: 'Does the policy include a remote / virtual (work from home) work environment?',
//   },
//   {
//     id: 5,
//     text: 'Is there an Internal Committee (IC) constituted in each office/unit?',
//   },
//   {
//     id: 6,
//     text: 'Does the Internal Committee (IC) have at least 4 members?',
//   },
//   {
//     id: 7,
//     text: 'Are at least 50% of the internal committee members women?',
//   },
//   {
//     id: 8,
//     text: 'Has a senior female employee been appointed as internal committee chairperson?',
//   },
//   {
//     id: 9,
//     text: 'As per Section 4(2)(c) of POSH Act 2013, has a member of external NGO or social organization been included in the committee?',
//   },
// ];

// type Answers = Record<number, 'yes' | 'no' | null>;

// const PoshSurveyScreen = ({navigation}: any) => {
//   const [answers, setAnswers] = useState<Answers>(
//     Object.fromEntries(QUESTIONS.map(q => [q.id, null])),
//   );
//   const [loading, setLoading] = useState(false);

//   const answered = Object.values(answers).filter(v => v !== null).length;
//   const progress = (answered / QUESTIONS.length) * 100;

//   const setAnswer = (qId: number, val: 'yes' | 'no') => {
//     setAnswers(prev => ({...prev, [qId]: val}));
//   };

//   const handleNext = async () => {
//     setLoading(true);
//     try {
//       // TODO: Replace with real API call
//       const response = await fetch(`${API_BASE_URL}/survey/part-a`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({answers, part: 'A'}),
//       });
//       if (response.ok) {
//         // TODO: Navigate to Part B
//         console.log('Part A submitted!');
//       }
//     } catch (err) {
//       // API not live — just log for now
//       console.log('API not live yet. Answers:', answers);
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
//         <TouchableOpacity style={styles.surveyBadge}>
//           <Text style={styles.surveyBadgeText}>POSH Survey</Text>
//         </TouchableOpacity>
//         <Text style={styles.langText}>EN |</Text>
//       </View>

//       {/* ── Breadcrumb ── */}
//       <View style={styles.breadcrumb}>
//         <Text style={styles.breadcrumbText}>
//           WCD Portal {'>'} Company {'>'} POSH Survey · पॉश सर्वेक्षण
//         </Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* ── Survey Header Card ── */}
//         <View style={styles.surveyCard}>
//           <View style={styles.surveyCardRow}>
//             <View style={styles.surveyCardLeft}>
//               <View style={styles.surveyIconBox}>
//                 <Text style={styles.surveyIcon}>📋</Text>
//               </View>
//               <View style={styles.surveyInfo}>
//                 <Text style={styles.surveyTitle}>POSH Survey</Text>
//                 <Text style={styles.surveySubtitle}>
//                   Inspection Portal · निरीक्षण पोर्टल
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.versionBadge}>
//               <Text style={styles.versionText}>v2.0</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Progress ── */}
//         <View style={styles.progressCard}>
//           <View style={styles.progressHeader}>
//             <Text style={styles.progressLabel}>PART 1 OF 5</Text>
//             <Text style={styles.progressPct}>{Math.round(progress)}%</Text>
//           </View>
//           <View style={styles.progressTrack}>
//             <View style={[styles.progressFill, {width: `${progress}%`}]} />
//           </View>
//         </View>

//         {/* ── Part A Questions ── */}
//         <View style={styles.questionsCard}>
//           <View style={styles.partHeader}>
//             <View style={styles.partIconBox}>
//               <Text style={styles.partIcon}>🔴</Text>
//             </View>
//             <View style={styles.partTitleBox}>
//               <Text style={styles.partTitle}>
//                 Part A – POSH Policy and Internal Committee (IC) Related
//                 Compliance
//               </Text>
//               <Text style={styles.answeredText}>{answered}/9 answered</Text>
//             </View>
//           </View>

//           {QUESTIONS.map((q, idx) => (
//             <View key={q.id} style={styles.questionItem}>
//               <Text style={styles.questionText}>
//                 <Text style={styles.questionNum}>{idx + 1}. </Text>
//                 {q.text}
//               </Text>
//               <View style={styles.optionRow}>
//                 <TouchableOpacity
//                   style={[
//                     styles.optionBtn,
//                     answers[q.id] === 'yes' && styles.optionBtnSelected,
//                   ]}
//                   onPress={() => setAnswer(q.id, 'yes')}>
//                   <Text
//                     style={[
//                       styles.optionText,
//                       answers[q.id] === 'yes' && styles.optionTextSelected,
//                     ]}>
//                     ✓  Yes ·
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.optionBtn,
//                     answers[q.id] === 'no' && styles.optionBtnNoSelected,
//                   ]}
//                   onPress={() => setAnswer(q.id, 'no')}>
//                   <Text
//                     style={[
//                       styles.optionText,
//                       answers[q.id] === 'no' && styles.optionTextNoSelected,
//                     ]}>
//                     ✕  No ·
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}

//           <TouchableOpacity
//             style={styles.nextBtn}
//             onPress={handleNext}
//             disabled={loading}>
//             <Text style={styles.nextBtnText}>
//               {loading ? 'Submitting...' : 'Next ·  →'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* ── Overall Progress Stats ── */}
//         <View style={styles.statsCard}>
//           <View style={styles.statsHeader}>
//             <View>
//               <Text style={styles.statsTitle}>POSH Survey</Text>
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
//             <Text style={styles.complianceBtnText}>🛡  COMPLIANCE PORTAL</Text>
//           </TouchableOpacity>

//           <Text style={styles.overallLabel}>OVERALL PROGRESS</Text>
//           <View style={styles.overallTrack}>
//             <View style={styles.overallFill} />
//           </View>
//           <Text style={styles.overallMeta}>Part 1         of 5 Parts</Text>

//           <View style={styles.overallStats}>
//             <View style={styles.overallStatItem}>
//               <Text style={styles.overallStatValue}>0</Text>
//               <Text style={styles.overallStatLabel}>Answered</Text>
//             </View>
//             <View style={styles.overallStatItem}>
//               <Text style={styles.overallStatValue}>5</Text>
//               <Text style={styles.overallStatLabel}>Parts</Text>
//             </View>
//             <View style={styles.overallStatItem}>
//               <Text style={styles.overallStatValue}>34</Text>
//               <Text style={styles.overallStatLabel}>Districts</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Survey Parts List ── */}
//         <View style={styles.partsCard}>
//           <View style={styles.partsHeader}>
//             <Text style={styles.partsTitle}>SURVEY PARTS</Text>
//             <Text style={styles.partsCount}>1 of 5</Text>
//           </View>
//           {SURVEY_PARTS.map(part => (
//             <View
//               key={part.id}
//               style={[
//                 styles.partRow,
//                 part.active && styles.partRowActive,
//               ]}>
//               <View
//                 style={[
//                   styles.partNum,
//                   part.active && styles.partNumActive,
//                 ]}>
//                 <Text
//                   style={[
//                     styles.partNumText,
//                     part.active && styles.partNumTextActive,
//                   ]}>
//                   {part.id}
//                 </Text>
//               </View>
//               <Text
//                 style={[
//                   styles.partRowTitle,
//                   !part.active && styles.partRowTitleMuted,
//                 ]}>
//                 {part.title}
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* ── Security ── */}
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
//   surveyBadge: {
//     backgroundColor: '#c0392b',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   surveyBadgeText: {color: '#fff', fontSize: 12, fontWeight: '700'},
//   langText: {color: '#aab', fontSize: 13},
//   breadcrumb: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   breadcrumbText: {fontSize: 11, color: '#888'},
//   surveyCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     borderRadius: 12,
//     padding: 16,
//     elevation: 2,
//   },
//   surveyCardRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   surveyCardLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
//   surveyIconBox: {
//     width: 44,
//     height: 44,
//     backgroundColor: '#f5f4f0',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   surveyIcon: {fontSize: 22},
//   surveyInfo: {},
//   surveyTitle: {fontSize: 16, fontWeight: '700', color: '#1a2340'},
//   surveySubtitle: {fontSize: 12, color: '#c0392b'},
//   versionBadge: {
//     backgroundColor: '#1a2340',
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   versionText: {color: '#fff', fontSize: 12, fontWeight: '600'},
//   progressCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   progressHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   progressLabel: {fontSize: 12, fontWeight: '700', color: '#666'},
//   progressPct: {fontSize: 12, fontWeight: '700', color: '#c0392b'},
//   progressTrack: {
//     height: 6,
//     backgroundColor: '#f0ece8',
//     borderRadius: 3,
//   },
//   progressFill: {
//     height: 6,
//     backgroundColor: '#c0392b',
//     borderRadius: 3,
//   },
//   questionsCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   partHeader: {
//     flexDirection: 'row',
//     gap: 12,
//     marginBottom: 16,
//     alignItems: 'flex-start',
//   },
//   partIconBox: {
//     width: 28,
//     height: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 2,
//   },
//   partIcon: {fontSize: 16},
//   partTitleBox: {flex: 1},
//   partTitle: {fontSize: 14, fontWeight: '700', color: '#1a2340', lineHeight: 20},
//   answeredText: {fontSize: 12, color: '#999', marginTop: 4},
//   questionItem: {marginBottom: 20},
//   questionText: {fontSize: 13, color: '#333', lineHeight: 19, marginBottom: 10},
//   questionNum: {fontWeight: '700', color: '#111'},
//   optionRow: {flexDirection: 'row', gap: 10},
//   optionBtn: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: 'center',
//     backgroundColor: '#fafafa',
//   },
//   optionBtnSelected: {
//     borderColor: '#1a7a4a',
//     backgroundColor: '#e8f5ee',
//   },
//   optionBtnNoSelected: {
//     borderColor: '#c0392b',
//     backgroundColor: '#fdecea',
//   },
//   optionText: {fontSize: 13, fontWeight: '600', color: '#555'},
//   optionTextSelected: {color: '#1a7a4a'},
//   optionTextNoSelected: {color: '#c0392b'},
//   nextBtn: {
//     backgroundColor: '#c0392b',
//     borderRadius: 10,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   nextBtnText: {color: '#fff', fontWeight: '700', fontSize: 15},
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
//     marginBottom: 14,
//   },
//   complianceBtnText: {color: '#fff', fontWeight: '700', fontSize: 14},
//   overallLabel: {color: '#aab', fontSize: 11, fontWeight: '700', marginBottom: 8},
//   overallTrack: {
//     height: 4,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: 2,
//     marginBottom: 6,
//   },
//   overallFill: {height: 4, backgroundColor: '#c0392b', width: '10%', borderRadius: 2},
//   overallMeta: {color: '#aab', fontSize: 11, marginBottom: 16},
//   overallStats: {flexDirection: 'row', justifyContent: 'space-around'},
//   overallStatItem: {alignItems: 'center'},
//   overallStatValue: {color: '#fff', fontSize: 22, fontWeight: '700'},
//   overallStatLabel: {color: '#aab', fontSize: 12, marginTop: 2},
//   partsCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 16,
//     elevation: 2,
//   },
//   partsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   partsTitle: {fontSize: 13, fontWeight: '700', color: '#333'},
//   partsCount: {fontSize: 13, color: '#888'},
//   partRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 12,
//     marginBottom: 14,
//   },
//   partRowActive: {},
//   partNum: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 1,
//   },
//   partNumActive: {backgroundColor: '#c0392b'},
//   partNumText: {fontSize: 13, fontWeight: '700', color: '#888'},
//   partNumTextActive: {color: '#fff'},
//   partRowTitle: {flex: 1, fontSize: 13, fontWeight: '600', color: '#1a2340', lineHeight: 18},
//   partRowTitleMuted: {color: '#aaa'},
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

// export default PoshSurveyScreen;

import React, {useState, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
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
const GREEN     = '#22c55e';
const RED       = '#ef4444';

// ─── POSH Questions Data ─────────────────────────────────
const POSH_QUESTIONS = {
  parts: [
    {
      title: {
        en: 'Part A – POSH Policy and Internal Committee (IC) Related Compliance',
        mr: 'भाग अ – पॉश धोरण आणि अंतर्गत समिती (IC) संबंधित अनुपालन',
      },
      questions: [
        {no: 1,  en: 'Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)', mr: 'पॉश धोरण तयार केले आणि स्वीकारले आहे का?'},
        {no: 2,  en: 'Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))', mr: 'धोरण सर्व कर्मचाऱ्यांना वितरित केले आहे का?'},
        {no: 3,  en: 'Has She-Box Portal been made available on the official website and on official social media?', mr: 'शी-बॉक्स पोर्टल अधिकृत वेबसाइटवर उपलब्ध आहे का?'},
        {no: 4,  en: 'Does the policy include a remote / virtual (work from home) work environment?', mr: 'धोरणात दूरस्थ / व्हर्च्युअल कामाच्या वातावरणाचा समावेश आहे का?'},
        {no: 5,  en: 'Is there an Internal Committee (IC) constituted in each office/unit?', mr: 'प्रत्येक कार्यालय/युनिटमध्ये अंतर्गत समिती स्थापन केली आहे का?'},
        {no: 6,  en: 'Does the Internal Committee (IC) have at least 4 members?', mr: 'अंतर्गत समितीमध्ये किमान 4 सदस्य आहेत का?'},
        {no: 7,  en: 'Are at least 50% of the internal committee members women?', mr: 'अंतर्गत समितीच्या किमान 50% सदस्य महिला आहेत का?'},
        {no: 8,  en: 'Has a senior female employee been appointed as internal committee chairperson?', mr: 'वरिष्ठ महिला कर्मचाऱ्याला अंतर्गत समितीचे अध्यक्ष म्हणून नियुक्त केले आहे का?'},
        {no: 9,  en: 'As per Section 4(2)(c), has a member of external NGO or social organization been included in the committee?', mr: 'बाह्य NGO किंवा सामाजिक संस्थेचा सदस्य समितीमध्ये समाविष्ट केला आहे का?'},
      ],
    },
    {
      title: {
        en: 'Part B – Support / Assistance to the Aggrieved Woman',
        mr: 'भाग ब – पीडित महिलेला आधार / सहाय्य',
      },
      questions: [
        {no: 10, en: 'Is interim relief provided to the aggrieved woman during inquiry? (As per Section 12)', mr: 'चौकशी दरम्यान पीडित महिलेला अंतरिम दिलासा दिला जातो का?'},
        {no: 11, en: 'Is the aggrieved woman given option to seek conciliation before initiating inquiry? (Section 10)', mr: 'चौकशी सुरू करण्यापूर्वी पीडित महिलेला समेट करण्याचा पर्याय दिला जातो का?'},
        {no: 12, en: 'Is the identity of the aggrieved woman kept confidential during inquiry? (Section 16)', mr: 'चौकशी दरम्यान पीडित महिलेची ओळख गोपनीय ठेवली जाते का?'},
        {no: 13, en: 'Is the aggrieved woman informed about the right to appeal against the IC decision? (Section 18)', mr: 'IC निर्णयाविरुद्ध अपील करण्याच्या अधिकाराबद्दल पीडित महिलेला सांगितले जाते का?'},
      ],
    },
    {
      title: {
        en: 'Part C – Awareness and Training',
        mr: 'भाग क – जागृती आणि प्रशिक्षण',
      },
      questions: [
        {no: 14, en: 'Has awareness about POSH Act been spread among all employees? (Section 19(c))', mr: 'सर्व कर्मचाऱ्यांमध्ये पॉश कायद्याबद्दल जागृती केली आहे का?'},
        {no: 15, en: 'Has orientation/training been provided to IC members? (Section 19(g))', mr: 'IC सदस्यांना अभिमुखता/प्रशिक्षण दिले आहे का?'},
        {no: 16, en: 'Are workshops/seminars organized for employees on POSH Act? (Section 19(c))', mr: 'कर्मचाऱ्यांसाठी पॉश कायद्यावर कार्यशाळा/सेमिनार आयोजित केले जातात का?'},
        {no: 17, en: 'Is information about POSH policy displayed at workplace notice boards?', mr: 'कामाच्या ठिकाणी नोटीस बोर्डवर पॉश धोरणाची माहिती प्रदर्शित केली जाते का?'},
      ],
    },
    {
      title: {
        en: "Part D – Employer's Responsibility",
        mr: 'भाग ड – नियोक्त्याची जबाबदारी',
      },
      questions: [
        {no: 18, en: 'Is annual report on sexual harassment complaints submitted to District Officer? (Section 21)', mr: 'जिल्हा अधिकाऱ्याला लैंगिक छळाच्या तक्रारींचा वार्षिक अहवाल सादर केला जातो का?'},
        {no: 19, en: 'Is safe working environment provided to employees? (Section 19(a))', mr: 'कर्मचाऱ्यांना सुरक्षित कामाचे वातावरण दिले जाते का?'},
        {no: 20, en: 'Has a third-party / employer organized workshops for IC members in last one year?', mr: 'मागील एक वर्षात IC सदस्यांसाठी तृतीय पक्ष/नियोक्त्याने कार्यशाळा आयोजित केल्या आहेत का?'},
        {no: 21, en: 'Is action taken against false or malicious complaints? (Section 14)', mr: 'खोट्या किंवा दुर्भावनापूर्ण तक्रारींविरुद्ध कारवाई केली जाते का?'},
        {no: 22, en: 'Is information about POSH policy shared with new employees during induction?', mr: 'नवीन कर्मचाऱ्यांना इंडक्शन दरम्यान पॉश धोरणाची माहिती दिली जाते का?'},
      ],
    },
    {
      title: {
        en: 'Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding',
        mr: 'भाग इ – लैंगिक छळ इलेक्ट्रॉनिक बॉक्स (SHe-Box) नोंदणी',
      },
      questions: [
        {no: 23, en: 'Has the organization been registered on SHe-Box portal?', mr: 'संस्था SHe-Box पोर्टलवर नोंदणीकृत आहे का?'},
        {no: 24, en: 'Has the IC Chairperson been registered on SHe-Box portal?', mr: 'IC अध्यक्ष SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
        {no: 25, en: 'Are all IC members registered on SHe-Box portal?', mr: 'सर्व IC सदस्य SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
        {no: 26, en: 'Is the link of SHe-Box portal shared with all employees?', mr: 'SHe-Box पोर्टलची लिंक सर्व कर्मचाऱ्यांसोबत शेअर केली आहे का?'},
      ],
    },
  ],
};

const TOTAL_PARTS = POSH_QUESTIONS.parts.length;

export default function PoshSurveyScreen({navigation}: any) {
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers]     = useState<Record<number, 'yes' | 'no'>>({});
  const [loading, setLoading]     = useState(false);
  const [lang, setLang]           = useState<'en' | 'mr'>('en');

  const currentPart = POSH_QUESTIONS.parts[partIndex];
  const progressPct = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

  const allAnsweredInPart = useMemo(
    () => currentPart.questions.every(q => answers[q.no]),
    [currentPart, answers],
  );

  const setAnswer = (qNo: number, val: 'yes' | 'no') =>
    setAnswers(prev => ({...prev, [qNo]: val}));

  const answeredCount = currentPart.questions.filter(q => answers[q.no]).length;

  const handleNext = () => {
    if (!allAnsweredInPart) {
      Alert.alert(
        lang === 'en' ? 'Incomplete' : 'अपूर्ण',
        lang === 'en' ? 'Please answer all questions' : 'कृपया सर्व प्रश्नांची उत्तरे द्या',
      );
      return;
    }
    if (partIndex < TOTAL_PARTS - 1) {
      setPartIndex(partIndex + 1);
    } else {
      handleSubmit();
    }
  };

  // ── POST /api/org/survey/submit ──
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const orgToken = await AsyncStorage.getItem('orgToken') || '';


      const payload = {
        answers: Object.entries(answers).map(([questionNo, value]) => ({
          questionid: Number(questionNo),
          answer: value,
        })),
      };

      const res = await fetch(`${API_BASE}/survey/submit`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) {
        Alert.alert('Error', data.message || 'Submission failed');
        return;
      }

      Alert.alert(
        lang === 'en' ? 'Success!' : 'यशस्वी!',
        lang === 'en' ? 'Survey submitted successfully!' : 'सर्वेक्षण यशस्वीरित्या सबमिट झाले!',
        [{text: 'OK', onPress: () => navigation.navigate('CompanyLogin')}],
      );
    } catch (err) {
      Alert.alert('Error', 'Server error');
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
          onPress={() => partIndex > 0 ? setPartIndex(partIndex - 1) : navigation.goBack()}>
          <Text style={s.backText}>← {partIndex > 0 ? 'Back' : 'Home'}</Text>
        </TouchableOpacity>
        <Text style={s.topbarTitle}>POSH Survey</Text>
        {/* Lang Toggle */}
        <View style={s.langToggle}>
          <TouchableOpacity
            style={[s.langBtn, lang === 'en' && s.langBtnActive]}
            onPress={() => setLang('en')}>
            <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
            onPress={() => setLang('mr')}>
            <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>मर</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

        {/* ── Survey Card ── */}
        <View style={s.card}>

          {/* Brand */}
          <View style={s.brandRow}>
            <View style={s.brand}>
              <View style={s.brandIcon}>
                <Text style={{fontSize: 22}}>📋</Text>
              </View>
              <View>
                <Text style={s.brandTitle}>POSH Survey</Text>
                <Text style={s.brandSub}>Inspection Portal</Text>
              </View>
            </View>
            <View style={s.versionPill}>
              <Text style={s.versionText}>v2.0</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={s.progressCard}>
            <View style={s.progressMeta}>
              <Text style={s.progressLabel}>
                {lang === 'en' ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`}
              </Text>
              <Text style={s.progressPct}>{progressPct}%</Text>
            </View>
            <View style={s.progressTrack}>
              <View style={[s.progressFill, {width: `${progressPct}%`}]} />
            </View>
          </View>

          {/* Part Heading */}
          <View style={s.partHead}>
            <View style={s.partIcon}>
              <Text style={{fontSize: 14}}>🛡</Text>
            </View>
            <Text style={s.partTitle} numberOfLines={3}>
              {currentPart.title[lang]}
            </Text>
            <View style={s.partCount}>
              <Text style={s.partCountText}>{answeredCount}/{currentPart.questions.length}</Text>
            </View>
          </View>

          {/* Questions */}
          {currentPart.questions.map(q => (
            <View
              key={q.no}
              style={[s.qCard, answers[q.no] && s.qCardAnswered]}>
              <Text style={s.qText}>
                <Text style={s.qNo}>{q.no}. </Text>
                {q[lang]}
              </Text>
              <View style={s.qOptions}>
                <TouchableOpacity
                  style={[s.optBtn, answers[q.no] === 'yes' && s.optBtnYes]}
                  onPress={() => setAnswer(q.no, 'yes')}>
                  <Text style={[s.optText, answers[q.no] === 'yes' && s.optTextYes]}>
                    ✓  {lang === 'en' ? 'Yes' : 'होय'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.optBtn, answers[q.no] === 'no' && s.optBtnNo]}
                  onPress={() => setAnswer(q.no, 'no')}>
                  <Text style={[s.optText, answers[q.no] === 'no' && s.optTextNo]}>
                    ✗  {lang === 'en' ? 'No' : 'नाही'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Nav Buttons */}
          <View style={s.btnRow}>
            {partIndex > 0 && (
              <TouchableOpacity
                style={s.ghostBtn}
                onPress={() => setPartIndex(partIndex - 1)}
                disabled={loading}>
                <Text style={s.ghostBtnText}>← {lang === 'en' ? 'Previous' : 'मागे'}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[s.submitBtn, loading && s.btnDisabled]}
              onPress={handleNext}
              disabled={loading}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={s.submitBtnText}>
                    {partIndex === TOTAL_PARTS - 1
                      ? (lang === 'en' ? 'Submit Survey ✓' : 'सबमिट करा ✓')
                      : (lang === 'en' ? 'Next →' : 'पुढे →')}
                  </Text>}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Info Card ── */}
        <View style={s.infoCard}>
          <View style={s.badgeRow}>
            <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
            <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
          </View>
          <Text style={s.infoTitle}>POSH Survey</Text>
          <Text style={s.infoSub}>Maharashtra State</Text>
          <View style={s.portalPill}>
            <Text style={s.portalPillText}>🛡 COMPLIANCE PORTAL</Text>
          </View>
          <Text style={s.infoDesc}>
            Women &amp; Child Development —{'\n'}
            POSH Compliance Inspection System
          </Text>

          {/* Overall Progress */}
          <View style={s.overallProgress}>
            <Text style={s.overallLabel}>OVERALL PROGRESS</Text>
            <View style={s.overallTrack}>
              <View style={[s.overallFill, {width: `${progressPct}%`}]} />
            </View>
            <View style={s.overallMeta}>
              <Text style={s.overallNum}>Part {partIndex + 1}</Text>
              <Text style={s.overallTotal}>of {TOTAL_PARTS} Parts</Text>
            </View>
          </View>

          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Text style={s.statNum}>{Object.keys(answers).length}</Text>
              <Text style={s.statLabel}>Answered</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statNum}>{TOTAL_PARTS}</Text>
              <Text style={s.statLabel}>Parts</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statNum}>34</Text>
              <Text style={s.statLabel}>Districts</Text>
            </View>
          </View>
        </View>

        {/* ── Parts Tracker ── */}
        <View style={s.partsCard}>
          <View style={s.partsHead}>
            <Text style={s.partsLabel}>SURVEY PARTS</Text>
            <Text style={s.partsTag}>{partIndex + 1} of {TOTAL_PARTS}</Text>
          </View>
          {POSH_QUESTIONS.parts.map((p, i) => (
            <View
              key={i}
              style={[
                s.partRow,
                i === partIndex && s.partRowActive,
                i < partIndex && s.partRowDone,
              ]}>
              <View style={[s.partDot, i === partIndex && s.partDotActive, i < partIndex && s.partDotDone]}>
                <Text style={[s.partDotText, (i === partIndex || i < partIndex) && s.partDotTextActive]}>
                  {i < partIndex ? '✓' : i + 1}
                </Text>
              </View>
              <Text style={s.partRowTitle} numberOfLines={2}>{p.title[lang]}</Text>
              {i < partIndex && (
                <View style={s.doneBadge}>
                  <Text style={s.doneBadgeText}>Done</Text>
                </View>
              )}
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

const s = StyleSheet.create({
  safe:   {flex: 1, backgroundColor: CREAM},
  scroll: {padding: 16, paddingBottom: 8},

  topbar:          {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  backBtn:         {paddingVertical: 4, paddingRight: 8},
  backText:        {fontSize: 13, color: BLUE, fontWeight: '700'},
  topbarTitle:     {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  langToggle:      {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 10, padding: 3, gap: 3},
  langBtn:         {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7},
  langBtnActive:   {backgroundColor: PINK},
  langBtnText:     {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
  langBtnTextActive:{color: '#fff'},

  card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

  brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
  brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  brandTitle:  {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
  brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
  versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
  versionText: {fontSize: 11, fontWeight: '700', color: PINK},

  progressCard:  {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#E0B978'},
  progressMeta:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
  progressLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', textTransform: 'uppercase', letterSpacing: 0.5},
  progressPct:   {fontSize: 12, fontWeight: '800', color: PINK},
  progressTrack: {height: 6, backgroundColor: 'rgba(205,54,107,0.12)', borderRadius: 99, overflow: 'hidden'},
  progressFill:  {height: 6, backgroundColor: PINK, borderRadius: 99},

  partHead:      {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16},
  partIcon:      {width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2},
  partTitle:     {flex: 1, fontSize: 13, fontWeight: '800', color: BLUE_DEEP, lineHeight: 19},
  partCount:     {backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, flexShrink: 0},
  partCountText: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},

  qCard:         {borderWidth: 1, borderColor: 'rgba(44,61,131,0.10)', borderRadius: 14, padding: 16, marginBottom: 10, backgroundColor: 'rgba(44,61,131,0.015)'},
  qCardAnswered: {borderColor: 'rgba(44,61,131,0.15)', backgroundColor: 'rgba(44,61,131,0.025)'},
  qText:         {fontSize: 13, lineHeight: 20, color: BLUE_DEEP, marginBottom: 12},
  qNo:           {color: PINK, fontWeight: '800'},
  qOptions:      {flexDirection: 'row', gap: 10},
  optBtn:        {flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.12)', backgroundColor: '#fff', alignItems: 'center'},
  optBtnYes:     {backgroundColor: GREEN, borderColor: 'transparent', shadowColor: GREEN, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
  optBtnNo:      {backgroundColor: RED, borderColor: 'transparent', shadowColor: RED, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
  optText:       {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
  optTextYes:    {color: '#fff'},
  optTextNo:     {color: '#fff'},

  btnRow:        {flexDirection: 'row', gap: 10, marginTop: 8},
  ghostBtn:      {paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
  ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
  btnDisabled:   {opacity: 0.5},
  submitBtnText: {color: '#fff', fontSize: 14, fontWeight: '700'},

  infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
  badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
  logoBadge:      {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
  infoTitle:      {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
  infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
  portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
  portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
  infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 16},

  overallProgress: {backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
  overallLabel:    {color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8},
  overallTrack:    {height: 8, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 99, overflow: 'hidden', marginBottom: 8},
  overallFill:     {height: 8, backgroundColor: PINK, borderRadius: 99},
  overallMeta:     {flexDirection: 'row', justifyContent: 'space-between'},
  overallNum:      {color: '#fff', fontSize: 13, fontWeight: '800'},
  overallTotal:    {color: 'rgba(255,255,255,0.45)', fontSize: 12},

  statsRow:  {flexDirection: 'row', justifyContent: 'space-around'},
  statItem:  {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
  statNum:   {color: '#fff', fontSize: 18, fontWeight: '800'},
  statLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

  partsCard:  {backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.06, shadowRadius: 14, elevation: 3},
  partsHead:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14},
  partsLabel: {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 1, textTransform: 'uppercase'},
  partsTag:   {fontSize: 12, fontWeight: '700', color: PINK},
  partRow:    {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(44,61,131,0.08)', backgroundColor: 'rgba(44,61,131,0.02)', marginBottom: 8},
  partRowActive:{borderColor: 'rgba(205,54,107,0.22)', backgroundColor: 'rgba(205,54,107,0.04)'},
  partRowDone:  {borderColor: 'rgba(44,61,131,0.12)', backgroundColor: 'rgba(44,61,131,0.03)'},
  partDot:      {width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(44,61,131,0.08)', justifyContent: 'center', alignItems: 'center', flexShrink: 0},
  partDotActive:{backgroundColor: PINK},
  partDotDone:  {backgroundColor: BLUE},
  partDotText:  {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
  partDotTextActive:{color: '#fff'},
  partRowTitle: {flex: 1, fontSize: 11, fontWeight: '700', color: BLUE_DEEP, lineHeight: 16},
  doneBadge:    {backgroundColor: 'rgba(34,197,94,0.12)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2},
  doneBadgeText:{fontSize: 10, fontWeight: '700', color: '#15803d'},

  secureNote: {flexDirection: 'row', justifyContent: 'center', paddingTop: 12, marginTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
  secureText: {fontSize: 11, color: 'rgba(44,61,131,0.45)', fontWeight: '500'},

  footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
  footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},
});