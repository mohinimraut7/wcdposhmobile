// import React, {useState, useMemo,useRef, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const API_BASE = 'https://mahaposhact.saavi.co.in/api/org';

// const PINK      = '#CD366B';
// const PINK_DARK = '#b82a5c';
// const BLUE      = '#2C3D83';
// const BLUE_DEEP = '#1d2a60';
// const CREAM     = '#FBF3EE';
// const GREEN     = '#22c55e';
// const RED       = '#ef4444';

// // ─── POSH Questions Data ─────────────────────────────────
// const POSH_QUESTIONS = {
//   parts: [
//     {
//       title: {
//         en: 'Part A – POSH Policy and Internal Committee (IC) Related Compliance',
//         mr: 'भाग अ – पॉश धोरण आणि अंतर्गत समिती (IC) संबंधित अनुपालन',
//       },
//       questions: [
//         {no: 1,  en: 'Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)', mr: 'पॉश धोरण तयार केले आणि स्वीकारले आहे का?'},
//         {no: 2,  en: 'Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))', mr: 'धोरण सर्व कर्मचाऱ्यांना वितरित केले आहे का?'},
//         {no: 3,  en: 'Has She-Box Portal been made available on the official website and on official social media?', mr: 'शी-बॉक्स पोर्टल अधिकृत वेबसाइटवर उपलब्ध आहे का?'},
//         {no: 4,  en: 'Does the policy include a remote / virtual (work from home) work environment?', mr: 'धोरणात दूरस्थ / व्हर्च्युअल कामाच्या वातावरणाचा समावेश आहे का?'},
//         {no: 5,  en: 'Is there an Internal Committee (IC) constituted in each office/unit?', mr: 'प्रत्येक कार्यालय/युनिटमध्ये अंतर्गत समिती स्थापन केली आहे का?'},
//         {no: 6,  en: 'Does the Internal Committee (IC) have at least 4 members?', mr: 'अंतर्गत समितीमध्ये किमान 4 सदस्य आहेत का?'},
//         {no: 7,  en: 'Are at least 50% of the internal committee members women?', mr: 'अंतर्गत समितीच्या किमान 50% सदस्य महिला आहेत का?'},
//         {no: 8,  en: 'Has a senior female employee been appointed as internal committee chairperson?', mr: 'वरिष्ठ महिला कर्मचाऱ्याला अंतर्गत समितीचे अध्यक्ष म्हणून नियुक्त केले आहे का?'},
//         {no: 9,  en: 'As per Section 4(2)(c), has a member of external NGO or social organization been included in the committee?', mr: 'बाह्य NGO किंवा सामाजिक संस्थेचा सदस्य समितीमध्ये समाविष्ट केला आहे का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part B – Support / Assistance to the Aggrieved Woman',
//         mr: 'भाग ब – पीडित महिलेला आधार / सहाय्य',
//       },
//       questions: [
//         {no: 10, en: 'Is interim relief provided to the aggrieved woman during inquiry? (As per Section 12)', mr: 'चौकशी दरम्यान पीडित महिलेला अंतरिम दिलासा दिला जातो का?'},
//         {no: 11, en: 'Is the aggrieved woman given option to seek conciliation before initiating inquiry? (Section 10)', mr: 'चौकशी सुरू करण्यापूर्वी पीडित महिलेला समेट करण्याचा पर्याय दिला जातो का?'},
//         {no: 12, en: 'Is the identity of the aggrieved woman kept confidential during inquiry? (Section 16)', mr: 'चौकशी दरम्यान पीडित महिलेची ओळख गोपनीय ठेवली जाते का?'},
//         {no: 13, en: 'Is the aggrieved woman informed about the right to appeal against the IC decision? (Section 18)', mr: 'IC निर्णयाविरुद्ध अपील करण्याच्या अधिकाराबद्दल पीडित महिलेला सांगितले जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part C – Awareness and Training',
//         mr: 'भाग क – जागृती आणि प्रशिक्षण',
//       },
//       questions: [
//         {no: 14, en: 'Has awareness about POSH Act been spread among all employees? (Section 19(c))', mr: 'सर्व कर्मचाऱ्यांमध्ये पॉश कायद्याबद्दल जागृती केली आहे का?'},
//         {no: 15, en: 'Has orientation/training been provided to IC members? (Section 19(g))', mr: 'IC सदस्यांना अभिमुखता/प्रशिक्षण दिले आहे का?'},
//         {no: 16, en: 'Are workshops/seminars organized for employees on POSH Act? (Section 19(c))', mr: 'कर्मचाऱ्यांसाठी पॉश कायद्यावर कार्यशाळा/सेमिनार आयोजित केले जातात का?'},
//         {no: 17, en: 'Is information about POSH policy displayed at workplace notice boards?', mr: 'कामाच्या ठिकाणी नोटीस बोर्डवर पॉश धोरणाची माहिती प्रदर्शित केली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: "Part D – Employer's Responsibility",
//         mr: 'भाग ड – नियोक्त्याची जबाबदारी',
//       },
//       questions: [
//         {no: 18, en: 'Is annual report on sexual harassment complaints submitted to District Officer? (Section 21)', mr: 'जिल्हा अधिकाऱ्याला लैंगिक छळाच्या तक्रारींचा वार्षिक अहवाल सादर केला जातो का?'},
//         {no: 19, en: 'Is safe working environment provided to employees? (Section 19(a))', mr: 'कर्मचाऱ्यांना सुरक्षित कामाचे वातावरण दिले जाते का?'},
//         {no: 20, en: 'Has a third-party / employer organized workshops for IC members in last one year?', mr: 'मागील एक वर्षात IC सदस्यांसाठी तृतीय पक्ष/नियोक्त्याने कार्यशाळा आयोजित केल्या आहेत का?'},
//         {no: 21, en: 'Is action taken against false or malicious complaints? (Section 14)', mr: 'खोट्या किंवा दुर्भावनापूर्ण तक्रारींविरुद्ध कारवाई केली जाते का?'},
//         {no: 22, en: 'Is information about POSH policy shared with new employees during induction?', mr: 'नवीन कर्मचाऱ्यांना इंडक्शन दरम्यान पॉश धोरणाची माहिती दिली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding',
//         mr: 'भाग इ – लैंगिक छळ इलेक्ट्रॉनिक बॉक्स (SHe-Box) नोंदणी',
//       },
//       questions: [
//         {no: 23, en: 'Has the organization been registered on SHe-Box portal?', mr: 'संस्था SHe-Box पोर्टलवर नोंदणीकृत आहे का?'},
//         {no: 24, en: 'Has the IC Chairperson been registered on SHe-Box portal?', mr: 'IC अध्यक्ष SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 25, en: 'Are all IC members registered on SHe-Box portal?', mr: 'सर्व IC सदस्य SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 26, en: 'Is the link of SHe-Box portal shared with all employees?', mr: 'SHe-Box पोर्टलची लिंक सर्व कर्मचाऱ्यांसोबत शेअर केली आहे का?'},
//       ],
//     },
//   ],
// };

// const TOTAL_PARTS = POSH_QUESTIONS.parts.length;

// export default function PoshSurveyScreen({navigation}: any) {
//   const [partIndex, setPartIndex] = useState(0);
//   const [answers, setAnswers]     = useState<Record<number, 'yes' | 'no'>>({});
//   const [loading, setLoading]     = useState(false);
//   const [lang, setLang]           = useState<'en' | 'mr'>('en');

//   const scrollRef = useRef<ScrollView>(null);
//   const currentPart = POSH_QUESTIONS.parts[partIndex];
//   const progressPct = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({y: 0, animated: true});
//   }, [partIndex]);

//   const allAnsweredInPart = useMemo(
//     () => currentPart.questions.every(q => answers[q.no]),
//     [currentPart, answers],
//   );

//   const setAnswer = (qNo: number, val: 'yes' | 'no') =>
//     setAnswers(prev => ({...prev, [qNo]: val}));

//   const answeredCount = currentPart.questions.filter(q => answers[q.no]).length;

//   const handleLogout = () => {
//   Alert.alert(
//     'Logout',
//     'Are you sure you want to logout?',
//     [
//       {text: 'Cancel', style: 'cancel'},
//       {text: 'Logout', style: 'destructive', onPress: async () => {
//         await AsyncStorage.removeItem('orgToken');
//         await AsyncStorage.removeItem('companyUser');
//         navigation.replace('CompanyLogin');
//       }},
//     ]
//   );
// };

//   const handleNext = () => {
//     if (!allAnsweredInPart) {
//       Alert.alert(
//         lang === 'en' ? 'Incomplete' : 'अपूर्ण',
//         lang === 'en' ? 'Please answer all questions' : 'कृपया सर्व प्रश्नांची उत्तरे द्या',
//       );
//       return;
//     }
//     if (partIndex < TOTAL_PARTS - 1) {
//       setPartIndex(partIndex + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   // ── POST /api/org/survey/submit ──
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
      
//       const orgToken = await AsyncStorage.getItem('orgToken') || '';


//       const payload = {
//         answers: Object.entries(answers).map(([questionNo, value]) => ({
//           questionid: Number(questionNo),
//           answer: value,
//         })),
//       };

//       const res = await fetch(`${API_BASE}/survey/submit`, {
//         method:  'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!data.success) {
//         Alert.alert('Error', data.message || 'Submission failed');
//         return;
//       }

//       Alert.alert(
//         lang === 'en' ? 'Success!' : 'यशस्वी!',
//         lang === 'en' ? 'Survey submitted successfully!' : 'सर्वेक्षण यशस्वीरित्या सबमिट झाले!',
//         [{text: 'OK', onPress: () => navigation.navigate('CompanyLogin')}],
//       );
//     } catch (err) {
//       Alert.alert('Error', 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={s.safe}>
//       <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

//       {/* Top Bar */}
//       <View style={s.topbar}>
//         <TouchableOpacity
//           style={s.backBtn}
//           onPress={() => partIndex > 0 ? setPartIndex(partIndex - 1) : navigation.goBack()}>
//           <Text style={s.backText}>← {partIndex > 0 ? 'Back' : 'Home'}</Text>
//         </TouchableOpacity>
//         <Text style={s.topbarTitle}>POSH Survey</Text>
//         {/* Lang Toggle */}
//         <View style={s.langToggle}>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'en' && s.langBtnActive]}
//             onPress={() => setLang('en')}>
//             <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
//             onPress={() => setLang('mr')}>
//             <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
//   {/* <Text style={s.logoutIcon}>Logout</Text> */}
//   <MaterialIcons name="logout" size={20} color={PINK} />
// </TouchableOpacity>
//       </View>

//       {/* <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled"> */}

//         <ScrollView
//   ref={scrollRef}
//   contentContainerStyle={s.scroll}
//   keyboardShouldPersistTaps="handled">

//          {/* ── Info Card ── */}
//         <View style={s.infoCard}>
//           <View style={s.badgeRow}>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
//           </View>
//           <Text style={s.infoTitle}>POSH Survey</Text>
//           <Text style={s.infoSub}>Maharashtra State</Text>
//           <View style={s.portalPill}>
//             <Text style={s.portalPillText}>🛡 COMPLIANCE PORTAL</Text>
//           </View>
//           <Text style={s.infoDesc}>
//             Women &amp; Child Development —{'\n'}
//             POSH Compliance Inspection System
//           </Text>

//           {/* Overall Progress */}
//           <View style={s.overallProgress}>
//             <Text style={s.overallLabel}>OVERALL PROGRESS</Text>
//             <View style={s.overallTrack}>
//               <View style={[s.overallFill, {width: `${progressPct}%`}]} />
//             </View>
//             <View style={s.overallMeta}>
//               <Text style={s.overallNum}>Part {partIndex + 1}</Text>
//               <Text style={s.overallTotal}>of {TOTAL_PARTS} Parts</Text>
//             </View>
//           </View>

//           <View style={s.statsRow}>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{Object.keys(answers).length}</Text>
//               <Text style={s.statLabel}>Answered</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{TOTAL_PARTS}</Text>
//               <Text style={s.statLabel}>Parts</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>34</Text>
//               <Text style={s.statLabel}>Districts</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Parts Tracker ── */}
//         {/* <View style={s.partsCard}>
//           <View style={s.partsHead}>
//             <Text style={s.partsLabel}>SURVEY PARTS</Text>
//             <Text style={s.partsTag}>{partIndex + 1} of {TOTAL_PARTS}</Text>
//           </View>
//           {POSH_QUESTIONS.parts.map((p, i) => (
//             <View
//               key={i}
//               style={[
//                 s.partRow,
//                 i === partIndex && s.partRowActive,
//                 i < partIndex && s.partRowDone,
//               ]}>
//               <View style={[s.partDot, i === partIndex && s.partDotActive, i < partIndex && s.partDotDone]}>
//                 <Text style={[s.partDotText, (i === partIndex || i < partIndex) && s.partDotTextActive]}>
//                   {i < partIndex ? '✓' : i + 1}
//                 </Text>
//               </View>
//               <Text style={s.partRowTitle} numberOfLines={2}>{p.title[lang]}</Text>
//               {i < partIndex && (
//                 <View style={s.doneBadge}>
//                   <Text style={s.doneBadgeText}>Done</Text>
//                 </View>
//               )}
//             </View>
//           ))}
//           <View style={s.secureNote}>
//             <Text style={s.secureText}>🔒 Secure Government Portal · 256-bit SSL</Text>
//           </View>
//         </View> */}

//         {/* ── Survey Card ── */}
//         <View style={s.card}>

//           {/* Brand */}
//           <View style={s.brandRow}>
//             <View style={s.brand}>
//               <View style={s.brandIcon}>
//                 <Text style={{fontSize: 22}}>📋</Text>
//               </View>
//               <View>
//                 <Text style={s.brandTitle}>POSH Survey Form</Text>
//                 <Text style={s.brandSub}>Inspection Portal</Text>
//               </View>
//             </View>
//             <View style={s.versionPill}>
//               <Text style={s.versionText}>v2.0</Text>
//             </View>
//           </View>

//           {/* Progress */}
//           <View style={s.progressCard}>
//             <View style={s.progressMeta}>
//               <Text style={s.progressLabel}>
//                 {lang === 'en' ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`}
//               </Text>
//               <Text style={s.progressPct}>{progressPct}%</Text>
//             </View>
//             <View style={s.progressTrack}>
//               <View style={[s.progressFill, {width: `${progressPct}%`}]} />
//             </View>
//           </View>

//           {/* Part Heading */}
//           <View style={s.partHead}>
//             <View style={s.partIcon}>
//               <Text style={{fontSize: 14}}>🛡</Text>
//             </View>
//             <Text style={s.partTitle} numberOfLines={3}>
//               {currentPart.title[lang]}
//             </Text>
//             <View style={s.partCount}>
//               <Text style={s.partCountText}>{answeredCount}/{currentPart.questions.length}</Text>
//             </View>
//           </View>

//           {/* Questions */}
//           {currentPart.questions.map(q => (
//             <View
//               key={q.no}
//               style={[s.qCard, answers[q.no] && s.qCardAnswered]}>
//               <Text style={s.qText}>
//                 <Text style={s.qNo}>{q.no}. </Text>
//                 {q[lang]}
//               </Text>
//               <View style={s.qOptions}>
//                 <TouchableOpacity
//                   style={[s.optBtn, answers[q.no] === 'yes' && s.optBtnYes]}
//                   onPress={() => setAnswer(q.no, 'yes')}>
//                   <Text style={[s.optText, answers[q.no] === 'yes' && s.optTextYes]}>
//                     ✓  {lang === 'en' ? 'Yes' : 'होय'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[s.optBtn, answers[q.no] === 'no' && s.optBtnNo]}
//                   onPress={() => setAnswer(q.no, 'no')}>
//                   <Text style={[s.optText, answers[q.no] === 'no' && s.optTextNo]}>
//                     ✗  {lang === 'en' ? 'No' : 'नाही'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}

//           {/* Nav Buttons */}
//           <View style={s.btnRow}>
//             {partIndex > 0 && (
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setPartIndex(partIndex - 1)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>← {lang === 'en' ? 'Previous' : 'मागे'}</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity
//               style={[s.submitBtn, loading && s.btnDisabled]}
//               onPress={handleNext}
//               disabled={loading}>
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={s.submitBtnText}>
//                     {partIndex === TOTAL_PARTS - 1
//                       ? (lang === 'en' ? 'Submit Survey ✓' : 'सबमिट करा ✓')
//                       : (lang === 'en' ? 'Next →' : 'पुढे →')}
//                   </Text>}
//             </TouchableOpacity>
//           </View>
//         </View>

       

//       </ScrollView>

//       <View style={s.footer}>
//         <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const s = StyleSheet.create({
//   safe:   {flex: 1, backgroundColor: CREAM},
//   scroll: {padding: 16, paddingBottom: 8},

//   topbar:          {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   backBtn:         {paddingVertical: 4, paddingRight: 8},
//   backText:        {fontSize: 13, color: BLUE, fontWeight: '700'},
//   logoutBtn:  {width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
// logoutIcon: {fontSize: 18, color: PINK, fontWeight: '800'},
//   topbarTitle:     {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   langToggle:      {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 10, padding: 3, gap: 3},
//   langBtn:         {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7},
//   langBtnActive:   {backgroundColor: PINK},
//   langBtnText:     {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
//   langBtnTextActive:{color: '#fff'},

//   card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

//   brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
//   brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
//   brandTitle:  {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
//   versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
//   versionText: {fontSize: 11, fontWeight: '700', color: PINK},

//   progressCard:  {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#E0B978'},
//   progressMeta:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   progressLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', textTransform: 'uppercase', letterSpacing: 0.5},
//   progressPct:   {fontSize: 12, fontWeight: '800', color: PINK},
//   progressTrack: {height: 6, backgroundColor: 'rgba(205,54,107,0.12)', borderRadius: 99, overflow: 'hidden'},
//   progressFill:  {height: 6, backgroundColor: PINK, borderRadius: 99},

//   partHead:      {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16},
//   partIcon:      {width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2},
//   partTitle:     {flex: 1, fontSize: 13, fontWeight: '800', color: BLUE_DEEP, lineHeight: 19},
//   partCount:     {backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, flexShrink: 0},
//   partCountText: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},

//   qCard:         {borderWidth: 1, borderColor: 'rgba(44,61,131,0.10)', borderRadius: 14, padding: 16, marginBottom: 10, backgroundColor: 'rgba(44,61,131,0.015)'},
//   qCardAnswered: {borderColor: 'rgba(44,61,131,0.15)', backgroundColor: 'rgba(44,61,131,0.025)'},
//   qText:         {fontSize: 13, lineHeight: 20, color: BLUE_DEEP, marginBottom: 12},
//   qNo:           {color: PINK, fontWeight: '800'},
//   qOptions:      {flexDirection: 'row', gap: 10},
//   optBtn:        {flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.12)', backgroundColor: '#fff', alignItems: 'center'},
//   optBtnYes:     {backgroundColor: GREEN, borderColor: 'transparent', shadowColor: GREEN, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optBtnNo:      {backgroundColor: RED, borderColor: 'transparent', shadowColor: RED, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optText:       {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
//   optTextYes:    {color: '#fff'},
//   optTextNo:     {color: '#fff'},

//   btnRow:        {flexDirection: 'row', gap: 10, marginTop: 8},
//   ghostBtn:      {paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
//   ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
//   btnDisabled:   {opacity: 0.5},
//   submitBtnText: {color: '#fff', fontSize: 14, fontWeight: '700'},

//   infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
//   badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
//   logoBadge:      {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
//   infoTitle:      {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
//   infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
//   portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
//   portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
//   infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 16},

//   overallProgress: {backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   overallLabel:    {color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8},
//   overallTrack:    {height: 8, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 99, overflow: 'hidden', marginBottom: 8},
//   overallFill:     {height: 8, backgroundColor: PINK, borderRadius: 99},
//   overallMeta:     {flexDirection: 'row', justifyContent: 'space-between'},
//   overallNum:      {color: '#fff', fontSize: 13, fontWeight: '800'},
//   overallTotal:    {color: 'rgba(255,255,255,0.45)', fontSize: 12},

//   statsRow:  {flexDirection: 'row', justifyContent: 'space-around'},
//   statItem:  {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   statNum:   {color: '#fff', fontSize: 18, fontWeight: '800'},
//   statLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

//   partsCard:  {backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.06, shadowRadius: 14, elevation: 3},
//   partsHead:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14},
//   partsLabel: {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 1, textTransform: 'uppercase'},
//   partsTag:   {fontSize: 12, fontWeight: '700', color: PINK},
//   partRow:    {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(44,61,131,0.08)', backgroundColor: 'rgba(44,61,131,0.02)', marginBottom: 8},
//   partRowActive:{borderColor: 'rgba(205,54,107,0.22)', backgroundColor: 'rgba(205,54,107,0.04)'},
//   partRowDone:  {borderColor: 'rgba(44,61,131,0.12)', backgroundColor: 'rgba(44,61,131,0.03)'},
//   partDot:      {width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(44,61,131,0.08)', justifyContent: 'center', alignItems: 'center', flexShrink: 0},
//   partDotActive:{backgroundColor: PINK},
//   partDotDone:  {backgroundColor: BLUE},
//   partDotText:  {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
//   partDotTextActive:{color: '#fff'},
//   partRowTitle: {flex: 1, fontSize: 11, fontWeight: '700', color: BLUE_DEEP, lineHeight: 16},
//   doneBadge:    {backgroundColor: 'rgba(34,197,94,0.12)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2},
//   doneBadgeText:{fontSize: 10, fontWeight: '700', color: '#15803d'},

//   secureNote: {flexDirection: 'row', justifyContent: 'center', paddingTop: 12, marginTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
//   secureText: {fontSize: 11, color: 'rgba(44,61,131,0.45)', fontWeight: '500'},

//   footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
//   footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},
// });





// import React, {useState, useMemo, useRef, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
//   Modal,
// } from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const API_BASE = 'https://mahaposhact.saavi.co.in/api/org';

// const PINK      = '#CD366B';
// const PINK_DARK = '#b82a5c';
// const BLUE      = '#2C3D83';
// const BLUE_DEEP = '#1d2a60';
// const CREAM     = '#FBF3EE';
// const GREEN     = '#22c55e';
// const RED       = '#ef4444';

// // ─── POSH Questions Data ─────────────────────────────────
// const POSH_QUESTIONS = {
//   parts: [
//     {
//       title: {
//         en: 'Part A – POSH Policy and Internal Committee (IC) Related Compliance',
//         mr: 'भाग अ – पॉश धोरण आणि अंतर्गत समिती (IC) संबंधित अनुपालन',
//       },
//       questions: [
//         {no: 1,  en: 'Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)', mr: 'पॉश धोरण तयार केले आणि स्वीकारले आहे का?'},
//         {no: 2,  en: 'Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))', mr: 'धोरण सर्व कर्मचाऱ्यांना वितरित केले आहे का?'},
//         {no: 3,  en: 'Has She-Box Portal been made available on the official website and on official social media?', mr: 'शी-बॉक्स पोर्टल अधिकृत वेबसाइटवर उपलब्ध आहे का?'},
//         {no: 4,  en: 'Does the policy include a remote / virtual (work from home) work environment?', mr: 'धोरणात दूरस्थ / व्हर्च्युअल कामाच्या वातावरणाचा समावेश आहे का?'},
//         {no: 5,  en: 'Is there an Internal Committee (IC) constituted in each office/unit?', mr: 'प्रत्येक कार्यालय/युनिटमध्ये अंतर्गत समिती स्थापन केली आहे का?'},
//         {no: 6,  en: 'Does the Internal Committee (IC) have at least 4 members?', mr: 'अंतर्गत समितीमध्ये किमान 4 सदस्य आहेत का?'},
//         {no: 7,  en: 'Are at least 50% of the internal committee members women?', mr: 'अंतर्गत समितीच्या किमान 50% सदस्य महिला आहेत का?'},
//         {no: 8,  en: 'Has a senior female employee been appointed as internal committee chairperson?', mr: 'वरिष्ठ महिला कर्मचाऱ्याला अंतर्गत समितीचे अध्यक्ष म्हणून नियुक्त केले आहे का?'},
//         {no: 9,  en: 'As per Section 4(2)(c), has a member of external NGO or social organization been included in the committee?', mr: 'बाह्य NGO किंवा सामाजिक संस्थेचा सदस्य समितीमध्ये समाविष्ट केला आहे का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part B – Support / Assistance to the Aggrieved Woman',
//         mr: 'भाग ब – पीडित महिलेला आधार / सहाय्य',
//       },
//       questions: [
//         {no: 10, en: 'Is interim relief provided to the aggrieved woman during inquiry? (As per Section 12)', mr: 'चौकशी दरम्यान पीडित महिलेला अंतरिम दिलासा दिला जातो का?'},
//         {no: 11, en: 'Is the aggrieved woman given option to seek conciliation before initiating inquiry? (Section 10)', mr: 'चौकशी सुरू करण्यापूर्वी पीडित महिलेला समेट करण्याचा पर्याय दिला जातो का?'},
//         {no: 12, en: 'Is the identity of the aggrieved woman kept confidential during inquiry? (Section 16)', mr: 'चौकशी दरम्यान पीडित महिलेची ओळख गोपनीय ठेवली जाते का?'},
//         {no: 13, en: 'Is the aggrieved woman informed about the right to appeal against the IC decision? (Section 18)', mr: 'IC निर्णयाविरुद्ध अपील करण्याच्या अधिकाराबद्दल पीडित महिलेला सांगितले जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part C – Awareness and Training',
//         mr: 'भाग क – जागृती आणि प्रशिक्षण',
//       },
//       questions: [
//         {no: 14, en: 'Has awareness about POSH Act been spread among all employees? (Section 19(c))', mr: 'सर्व कर्मचाऱ्यांमध्ये पॉश कायद्याबद्दल जागृती केली आहे का?'},
//         {no: 15, en: 'Has orientation/training been provided to IC members? (Section 19(g))', mr: 'IC सदस्यांना अभिमुखता/प्रशिक्षण दिले आहे का?'},
//         {no: 16, en: 'Are workshops/seminars organized for employees on POSH Act? (Section 19(c))', mr: 'कर्मचाऱ्यांसाठी पॉश कायद्यावर कार्यशाळा/सेमिनार आयोजित केले जातात का?'},
//         {no: 17, en: 'Is information about POSH policy displayed at workplace notice boards?', mr: 'कामाच्या ठिकाणी नोटीस बोर्डवर पॉश धोरणाची माहिती प्रदर्शित केली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: "Part D – Employer's Responsibility",
//         mr: 'भाग ड – नियोक्त्याची जबाबदारी',
//       },
//       questions: [
//         {no: 18, en: 'Is annual report on sexual harassment complaints submitted to District Officer? (Section 21)', mr: 'जिल्हा अधिकाऱ्याला लैंगिक छळाच्या तक्रारींचा वार्षिक अहवाल सादर केला जातो का?'},
//         {no: 19, en: 'Is safe working environment provided to employees? (Section 19(a))', mr: 'कर्मचाऱ्यांना सुरक्षित कामाचे वातावरण दिले जाते का?'},
//         {no: 20, en: 'Has a third-party / employer organized workshops for IC members in last one year?', mr: 'मागील एक वर्षात IC सदस्यांसाठी तृतीय पक्ष/नियोक्त्याने कार्यशाळा आयोजित केल्या आहेत का?'},
//         {no: 21, en: 'Is action taken against false or malicious complaints? (Section 14)', mr: 'खोट्या किंवा दुर्भावनापूर्ण तक्रारींविरुद्ध कारवाई केली जाते का?'},
//         {no: 22, en: 'Is information about POSH policy shared with new employees during induction?', mr: 'नवीन कर्मचाऱ्यांना इंडक्शन दरम्यान पॉश धोरणाची माहिती दिली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding',
//         mr: 'भाग इ – लैंगिक छळ इलेक्ट्रॉनिक बॉक्स (SHe-Box) नोंदणी',
//       },
//       questions: [
//         {no: 23, en: 'Has the organization been registered on SHe-Box portal?', mr: 'संस्था SHe-Box पोर्टलवर नोंदणीकृत आहे का?'},
//         {no: 24, en: 'Has the IC Chairperson been registered on SHe-Box portal?', mr: 'IC अध्यक्ष SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 25, en: 'Are all IC members registered on SHe-Box portal?', mr: 'सर्व IC सदस्य SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 26, en: 'Is the link of SHe-Box portal shared with all employees?', mr: 'SHe-Box पोर्टलची लिंक सर्व कर्मचाऱ्यांसोबत शेअर केली आहे का?'},
//       ],
//     },
//   ],
// };

// const TOTAL_PARTS = POSH_QUESTIONS.parts.length;

// export default function PoshSurveyScreen({navigation}: any) {
//   const [partIndex, setPartIndex] = useState(0);
//   const [answers, setAnswers]     = useState<Record<number, 'yes' | 'no'>>({});
//   const [loading, setLoading]     = useState(false);
//   const [lang, setLang]           = useState<'en' | 'mr'>('en');

//   // ── Preview modal shown after last part is completed, before actual submit ──
//   const [showPreview, setShowPreview] = useState(false);

//   const scrollRef = useRef<ScrollView>(null);
//   const currentPart = POSH_QUESTIONS.parts[partIndex];
//   const progressPct = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({y: 0, animated: true});
//   }, [partIndex]);

//   const allAnsweredInPart = useMemo(
//     () => currentPart.questions.every(q => answers[q.no]),
//     [currentPart, answers],
//   );

//   const setAnswer = (qNo: number, val: 'yes' | 'no') =>
//     setAnswers(prev => ({...prev, [qNo]: val}));

//   const answeredCount = currentPart.questions.filter(q => answers[q.no]).length;

//   const handleLogout = () => {
//   Alert.alert(
//     'Logout',
//     'Are you sure you want to logout?',
//     [
//       {text: 'Cancel', style: 'cancel'},
//       {text: 'Logout', style: 'destructive', onPress: async () => {
//         await AsyncStorage.removeItem('orgToken');
//         await AsyncStorage.removeItem('companyUser');
//         navigation.replace('CompanyLogin');
//       }},
//     ]
//   );
// };

//   const handleNext = () => {
//     if (!allAnsweredInPart) {
//       Alert.alert(
//         lang === 'en' ? 'Incomplete' : 'अपूर्ण',
//         lang === 'en' ? 'Please answer all questions' : 'कृपया सर्व प्रश्नांची उत्तरे द्या',
//       );
//       return;
//     }
//     if (partIndex < TOTAL_PARTS - 1) {
//       setPartIndex(partIndex + 1);
//     } else {
//       // ── Last part done — show preview instead of submitting directly ──
//       setShowPreview(true);
//     }
//   };

//   // ── Jump to a given part to fix an answer, then close preview ──
//   const handleEditPart = (pIdx: number) => {
//     setShowPreview(false);
//     setPartIndex(pIdx);
//   };

//   // ── POST /api/org/survey/submit ──
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const orgToken = await AsyncStorage.getItem('orgToken') || '';


//       const payload = {
//         answers: Object.entries(answers).map(([questionNo, value]) => ({
//           questionid: Number(questionNo),
//           answer: value,
//         })),
//       };

//       const res = await fetch(`${API_BASE}/survey/submit`, {
//         method:  'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!data.success) {
//         Alert.alert('Error', data.message || 'Submission failed');
//         return;
//       }

//       setShowPreview(false);
//       Alert.alert(
//         lang === 'en' ? 'Success!' : 'यशस्वी!',
//         lang === 'en' ? 'Survey submitted successfully!' : 'सर्वेक्षण यशस्वीरित्या सबमिट झाले!',
//         [{text: 'OK', onPress: () => navigation.navigate('CompanyLogin')}],
//       );
//     } catch (err) {
//       Alert.alert('Error', 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={s.safe}>
//       <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

//       {/* Top Bar */}
//       <View style={s.topbar}>
//         <TouchableOpacity
//           style={s.backBtn}
//           onPress={() => partIndex > 0 ? setPartIndex(partIndex - 1) : navigation.goBack()}>
//           <Text style={s.backText}>← {partIndex > 0 ? 'Back' : 'Home'}</Text>
//         </TouchableOpacity>
//         <Text style={s.topbarTitle}>POSH Survey</Text>
//         {/* Lang Toggle */}
//         <View style={s.langToggle}>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'en' && s.langBtnActive]}
//             onPress={() => setLang('en')}>
//             <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
//             onPress={() => setLang('mr')}>
//             <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
//   {/* <Text style={s.logoutIcon}>Logout</Text> */}
//   <MaterialIcons name="logout" size={20} color={PINK} />
// </TouchableOpacity>
//       </View>

//         <ScrollView
//   ref={scrollRef}
//   contentContainerStyle={s.scroll}
//   keyboardShouldPersistTaps="handled">

//          {/* ── Info Card ── */}
//         <View style={s.infoCard}>
//           <View style={s.badgeRow}>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
//           </View>
//           <Text style={s.infoTitle}>POSH Survey</Text>
//           <Text style={s.infoSub}>Maharashtra State</Text>
//           <View style={s.portalPill}>
//             <Text style={s.portalPillText}>🛡 COMPLIANCE PORTAL</Text>
//           </View>
//           <Text style={s.infoDesc}>
//             Women &amp; Child Development —{'\n'}
//             POSH Compliance Inspection System
//           </Text>

//           {/* Overall Progress */}
//           <View style={s.overallProgress}>
//             <Text style={s.overallLabel}>OVERALL PROGRESS</Text>
//             <View style={s.overallTrack}>
//               <View style={[s.overallFill, {width: `${progressPct}%`}]} />
//             </View>
//             <View style={s.overallMeta}>
//               <Text style={s.overallNum}>Part {partIndex + 1}</Text>
//               <Text style={s.overallTotal}>of {TOTAL_PARTS} Parts</Text>
//             </View>
//           </View>

//           <View style={s.statsRow}>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{Object.keys(answers).length}</Text>
//               <Text style={s.statLabel}>Answered</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{TOTAL_PARTS}</Text>
//               <Text style={s.statLabel}>Parts</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>34</Text>
//               <Text style={s.statLabel}>Districts</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Survey Card ── */}
//         <View style={s.card}>

//           {/* Brand */}
//           <View style={s.brandRow}>
//             <View style={s.brand}>
//               <View style={s.brandIcon}>
//                 <Text style={{fontSize: 22}}>📋</Text>
//               </View>
//               <View>
//                 <Text style={s.brandTitle}>POSH Survey Form</Text>
//                 <Text style={s.brandSub}>Inspection Portal</Text>
//               </View>
//             </View>
//             <View style={s.versionPill}>
//               <Text style={s.versionText}>v2.0</Text>
//             </View>
//           </View>

//           {/* Progress */}
//           <View style={s.progressCard}>
//             <View style={s.progressMeta}>
//               <Text style={s.progressLabel}>
//                 {lang === 'en' ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`}
//               </Text>
//               <Text style={s.progressPct}>{progressPct}%</Text>
//             </View>
//             <View style={s.progressTrack}>
//               <View style={[s.progressFill, {width: `${progressPct}%`}]} />
//             </View>
//           </View>

//           {/* Part Heading */}
//           <View style={s.partHead}>
//             <View style={s.partIcon}>
//               <Text style={{fontSize: 14}}>🛡</Text>
//             </View>
//             <Text style={s.partTitle} numberOfLines={3}>
//               {currentPart.title[lang]}
//             </Text>
//             <View style={s.partCount}>
//               <Text style={s.partCountText}>{answeredCount}/{currentPart.questions.length}</Text>
//             </View>
//           </View>

//           {/* Questions */}
//           {currentPart.questions.map(q => (
//             <View
//               key={q.no}
//               style={[s.qCard, answers[q.no] && s.qCardAnswered]}>
//               <Text style={s.qText}>
//                 <Text style={s.qNo}>{q.no}. </Text>
//                 {q[lang]}
//               </Text>
//               <View style={s.qOptions}>
//                 <TouchableOpacity
//                   style={[s.optBtn, answers[q.no] === 'yes' && s.optBtnYes]}
//                   onPress={() => setAnswer(q.no, 'yes')}>
//                   <Text style={[s.optText, answers[q.no] === 'yes' && s.optTextYes]}>
//                     ✓  {lang === 'en' ? 'Yes' : 'होय'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[s.optBtn, answers[q.no] === 'no' && s.optBtnNo]}
//                   onPress={() => setAnswer(q.no, 'no')}>
//                   <Text style={[s.optText, answers[q.no] === 'no' && s.optTextNo]}>
//                     ✗  {lang === 'en' ? 'No' : 'नाही'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}

//           {/* Nav Buttons */}
//           <View style={s.btnRow}>
//             {partIndex > 0 && (
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setPartIndex(partIndex - 1)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>← {lang === 'en' ? 'Previous' : 'मागे'}</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity
//               style={[s.submitBtn, loading && s.btnDisabled]}
//               onPress={handleNext}
//               disabled={loading}>
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={s.submitBtnText}>
//                     {partIndex === TOTAL_PARTS - 1
//                       ? (lang === 'en' ? 'Review & Submit ✓' : 'तपासा आणि सबमिट करा ✓')
//                       : (lang === 'en' ? 'Next →' : 'पुढे →')}
//                   </Text>}
//             </TouchableOpacity>
//           </View>
//         </View>

//       </ScrollView>

//       <View style={s.footer}>
//         <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
//       </View>

//       {/* ── Preview Modal ── shown after last part, before real submit ── */}
//       <Modal
//         visible={showPreview}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setShowPreview(false)}>
//         <View style={s.modalOverlay}>
//           <View style={s.modalCard}>

//             {/* Modal Header */}
//             <View style={s.modalHeader}>
//               <View>
//                 <Text style={s.modalTitle}>
//                   {lang === 'en' ? 'Review Your Answers' : 'तुमची उत्तरे तपासा'}
//                 </Text>
//                 <Text style={s.modalSub}>
//                   {lang === 'en'
//                     ? `${Object.keys(answers).length} of ${POSH_QUESTIONS.parts.reduce((a, p) => a + p.questions.length, 0)} answered`
//                     : `${Object.keys(answers).length} पैकी ${POSH_QUESTIONS.parts.reduce((a, p) => a + p.questions.length, 0)} उत्तर दिले`}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={s.modalCloseBtn}
//                 onPress={() => setShowPreview(false)}
//                 disabled={loading}>
//                 <MaterialIcons name="close" size={20} color={BLUE_DEEP} />
//               </TouchableOpacity>
//             </View>

//             {/* Modal Body */}
//             <ScrollView style={s.modalBody} contentContainerStyle={{paddingBottom: 12}}>
//               {POSH_QUESTIONS.parts.map((part, pIdx) => (
//                 <View key={pIdx} style={s.previewPartBlock}>
//                   <View style={s.previewPartHead}>
//                     <Text style={s.previewPartTitle} numberOfLines={2}>
//                       {part.title[lang]}
//                     </Text>
//                     <TouchableOpacity
//                       style={s.editBtn}
//                       onPress={() => handleEditPart(pIdx)}
//                       disabled={loading}>
//                       <MaterialIcons name="edit" size={14} color={PINK} />
//                       <Text style={s.editBtnText}>
//                         {lang === 'en' ? 'Edit' : 'बदला'}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   {part.questions.map(q => (
//                     <View key={q.no} style={s.previewQRow}>
//                       <Text style={s.previewQText}>
//                         <Text style={s.qNo}>{q.no}. </Text>
//                         {q[lang]}
//                       </Text>
//                       <View
//                         style={[
//                           s.previewAnsBadge,
//                           answers[q.no] === 'yes' && s.previewAnsYes,
//                           answers[q.no] === 'no' && s.previewAnsNo,
//                         ]}>
//                         <Text style={s.previewAnsText}>
//                           {answers[q.no] === 'yes'
//                             ? (lang === 'en' ? 'Yes' : 'होय')
//                             : answers[q.no] === 'no'
//                             ? (lang === 'en' ? 'No' : 'नाही')
//                             : (lang === 'en' ? 'Not answered' : 'उत्तर नाही')}
//                         </Text>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </ScrollView>

//             {/* Modal Footer */}
//             <View style={s.modalFooter}>
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setShowPreview(false)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>
//                   {lang === 'en' ? 'Continue Editing' : 'संपादन सुरू ठेवा'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[s.submitBtn, loading && s.btnDisabled]}
//                 onPress={handleSubmit}
//                 disabled={loading}>
//                 {loading
//                   ? <ActivityIndicator color="#fff" />
//                   : <Text style={s.submitBtnText}>
//                       {lang === 'en' ? 'Confirm & Submit ✓' : 'खात्री करा आणि सबमिट करा ✓'}
//                     </Text>}
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const s = StyleSheet.create({
//   safe:   {flex: 1, backgroundColor: CREAM},
//   scroll: {padding: 16, paddingBottom: 8},

//   topbar:          {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   backBtn:         {paddingVertical: 4, paddingRight: 8},
//   backText:        {fontSize: 13, color: BLUE, fontWeight: '700'},
//   logoutBtn:  {width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
// logoutIcon: {fontSize: 18, color: PINK, fontWeight: '800'},
//   topbarTitle:     {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   langToggle:      {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 10, padding: 3, gap: 3},
//   langBtn:         {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7},
//   langBtnActive:   {backgroundColor: PINK},
//   langBtnText:     {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
//   langBtnTextActive:{color: '#fff'},

//   card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

//   brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
//   brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
//   brandTitle:  {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
//   versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
//   versionText: {fontSize: 11, fontWeight: '700', color: PINK},

//   progressCard:  {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#E0B978'},
//   progressMeta:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   progressLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', textTransform: 'uppercase', letterSpacing: 0.5},
//   progressPct:   {fontSize: 12, fontWeight: '800', color: PINK},
//   progressTrack: {height: 6, backgroundColor: 'rgba(205,54,107,0.12)', borderRadius: 99, overflow: 'hidden'},
//   progressFill:  {height: 6, backgroundColor: PINK, borderRadius: 99},

//   partHead:      {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16},
//   partIcon:      {width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2},
//   partTitle:     {flex: 1, fontSize: 13, fontWeight: '800', color: BLUE_DEEP, lineHeight: 19},
//   partCount:     {backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, flexShrink: 0},
//   partCountText: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},

//   qCard:         {borderWidth: 1, borderColor: 'rgba(44,61,131,0.10)', borderRadius: 14, padding: 16, marginBottom: 10, backgroundColor: 'rgba(44,61,131,0.015)'},
//   qCardAnswered: {borderColor: 'rgba(44,61,131,0.15)', backgroundColor: 'rgba(44,61,131,0.025)'},
//   qText:         {fontSize: 13, lineHeight: 20, color: BLUE_DEEP, marginBottom: 12},
//   qNo:           {color: PINK, fontWeight: '800'},
//   qOptions:      {flexDirection: 'row', gap: 10},
//   optBtn:        {flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.12)', backgroundColor: '#fff', alignItems: 'center'},
//   optBtnYes:     {backgroundColor: GREEN, borderColor: 'transparent', shadowColor: GREEN, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optBtnNo:      {backgroundColor: RED, borderColor: 'transparent', shadowColor: RED, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optText:       {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
//   optTextYes:    {color: '#fff'},
//   optTextNo:     {color: '#fff'},

//   btnRow:        {flexDirection: 'row', gap: 10, marginTop: 8},
//   ghostBtn:      {paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
//   ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
//   btnDisabled:   {opacity: 0.5},
//   submitBtnText: {color: '#fff', fontSize: 14, fontWeight: '700'},

//   infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
//   badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
//   logoBadge:      {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
//   infoTitle:      {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
//   infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
//   portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
//   portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
//   infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 16},

//   overallProgress: {backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   overallLabel:    {color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8},
//   overallTrack:    {height: 8, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 99, overflow: 'hidden', marginBottom: 8},
//   overallFill:     {height: 8, backgroundColor: PINK, borderRadius: 99},
//   overallMeta:     {flexDirection: 'row', justifyContent: 'space-between'},
//   overallNum:      {color: '#fff', fontSize: 13, fontWeight: '800'},
//   overallTotal:    {color: 'rgba(255,255,255,0.45)', fontSize: 12},

//   statsRow:  {flexDirection: 'row', justifyContent: 'space-around'},
//   statItem:  {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   statNum:   {color: '#fff', fontSize: 18, fontWeight: '800'},
//   statLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

//   partsCard:  {backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.06, shadowRadius: 14, elevation: 3},
//   partsHead:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14},
//   partsLabel: {fontSize: 11, fontWeight: '800', color: 'rgba(44,61,131,0.45)', letterSpacing: 1, textTransform: 'uppercase'},
//   partsTag:   {fontSize: 12, fontWeight: '700', color: PINK},
//   partRow:    {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(44,61,131,0.08)', backgroundColor: 'rgba(44,61,131,0.02)', marginBottom: 8},
//   partRowActive:{borderColor: 'rgba(205,54,107,0.22)', backgroundColor: 'rgba(205,54,107,0.04)'},
//   partRowDone:  {borderColor: 'rgba(44,61,131,0.12)', backgroundColor: 'rgba(44,61,131,0.03)'},
//   partDot:      {width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(44,61,131,0.08)', justifyContent: 'center', alignItems: 'center', flexShrink: 0},
//   partDotActive:{backgroundColor: PINK},
//   partDotDone:  {backgroundColor: BLUE},
//   partDotText:  {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
//   partDotTextActive:{color: '#fff'},
//   partRowTitle: {flex: 1, fontSize: 11, fontWeight: '700', color: BLUE_DEEP, lineHeight: 16},
//   doneBadge:    {backgroundColor: 'rgba(34,197,94,0.12)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2},
//   doneBadgeText:{fontSize: 10, fontWeight: '700', color: '#15803d'},

//   secureNote: {flexDirection: 'row', justifyContent: 'center', paddingTop: 12, marginTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
//   secureText: {fontSize: 11, color: 'rgba(44,61,131,0.45)', fontWeight: '500'},

//   footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
//   footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},

//   // ── Preview Modal styles ──
//   modalOverlay:   {flex: 1, backgroundColor: 'rgba(29,42,96,0.55)', justifyContent: 'flex-end'},
//   modalCard:      {backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: '88%', paddingTop: 18, paddingHorizontal: 18, paddingBottom: 14},
//   modalHeader:    {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   modalTitle:     {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   modalSub:       {fontSize: 12, color: 'rgba(44,61,131,0.5)', marginTop: 3},
//   modalCloseBtn:  {width: 30, height: 30, borderRadius: 999, backgroundColor: 'rgba(44,61,131,0.06)', justifyContent: 'center', alignItems: 'center'},
//   modalBody:      {maxHeight: '75%'},

//   previewPartBlock: {marginBottom: 18},
//   previewPartHead:  {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
//   previewPartTitle: {flex: 1, fontSize: 12.5, fontWeight: '800', color: BLUE_DEEP, lineHeight: 17, paddingRight: 8},
//   editBtn:          {flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(205,54,107,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5},
//   editBtnText:      {fontSize: 11, fontWeight: '700', color: PINK},

//   previewQRow:      {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
//   previewQText:     {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18},
//   previewAnsBadge:  {borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(44,61,131,0.08)', flexShrink: 0},
//   previewAnsYes:    {backgroundColor: GREEN},
//   previewAnsNo:     {backgroundColor: RED},
//   previewAnsText:   {fontSize: 11, fontWeight: '700', color: '#fff'},

//   modalFooter:    {flexDirection: 'row', gap: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},
// });




// import React, {useState, useMemo, useRef, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
//   Modal,
// } from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const API_BASE = 'https://mahaposhact.saavi.co.in/api/org';

// const PINK      = '#CD366B';
// const PINK_DARK = '#b82a5c';
// const BLUE      = '#2C3D83';
// const BLUE_DEEP = '#1d2a60';
// const CREAM     = '#FBF3EE';
// const GREEN     = '#22c55e';
// const RED       = '#ef4444';
// const AMBER     = '#d97706';

// // ─── POSH Questions Data ─────────────────────────────────
// const POSH_QUESTIONS = {
//   parts: [
//     {
//       title: {
//         en: 'Part A – POSH Policy and Internal Committee (IC) Related Compliance',
//         mr: 'भाग अ – पॉश धोरण आणि अंतर्गत समिती (IC) संबंधित अनुपालन',
//       },
//       questions: [
//         {no: 1,  en: 'Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)', mr: 'पॉश धोरण तयार केले आणि स्वीकारले आहे का?'},
//         {no: 2,  en: 'Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))', mr: 'धोरण सर्व कर्मचाऱ्यांना वितरित केले आहे का?'},
//         {no: 3,  en: 'Has She-Box Portal been made available on the official website and on official social media?', mr: 'शी-बॉक्स पोर्टल अधिकृत वेबसाइटवर उपलब्ध आहे का?'},
//         {no: 4,  en: 'Does the policy include a remote / virtual (work from home) work environment?', mr: 'धोरणात दूरस्थ / व्हर्च्युअल कामाच्या वातावरणाचा समावेश आहे का?'},
//         {no: 5,  en: 'Is there an Internal Committee (IC) constituted in each office/unit?', mr: 'प्रत्येक कार्यालय/युनिटमध्ये अंतर्गत समिती स्थापन केली आहे का?'},
//         {no: 6,  en: 'Does the Internal Committee (IC) have at least 4 members?', mr: 'अंतर्गत समितीमध्ये किमान 4 सदस्य आहेत का?'},
//         {no: 7,  en: 'Are at least 50% of the internal committee members women?', mr: 'अंतर्गत समितीच्या किमान 50% सदस्य महिला आहेत का?'},
//         {no: 8,  en: 'Has a senior female employee been appointed as internal committee chairperson?', mr: 'वरिष्ठ महिला कर्मचाऱ्याला अंतर्गत समितीचे अध्यक्ष म्हणून नियुक्त केले आहे का?'},
//         {no: 9,  en: 'As per Section 4(2)(c), has a member of external NGO or social organization been included in the committee?', mr: 'बाह्य NGO किंवा सामाजिक संस्थेचा सदस्य समितीमध्ये समाविष्ट केला आहे का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part B – Support / Assistance to the Aggrieved Woman',
//         mr: 'भाग ब – पीडित महिलेला आधार / सहाय्य',
//       },
//       questions: [
//         {no: 10, en: 'Is interim relief provided to the aggrieved woman during inquiry? (As per Section 12)', mr: 'चौकशी दरम्यान पीडित महिलेला अंतरिम दिलासा दिला जातो का?'},
//         {no: 11, en: 'Is the aggrieved woman given option to seek conciliation before initiating inquiry? (Section 10)', mr: 'चौकशी सुरू करण्यापूर्वी पीडित महिलेला समेट करण्याचा पर्याय दिला जातो का?'},
//         {no: 12, en: 'Is the identity of the aggrieved woman kept confidential during inquiry? (Section 16)', mr: 'चौकशी दरम्यान पीडित महिलेची ओळख गोपनीय ठेवली जाते का?'},
//         {no: 13, en: 'Is the aggrieved woman informed about the right to appeal against the IC decision? (Section 18)', mr: 'IC निर्णयाविरुद्ध अपील करण्याच्या अधिकाराबद्दल पीडित महिलेला सांगितले जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part C – Awareness and Training',
//         mr: 'भाग क – जागृती आणि प्रशिक्षण',
//       },
//       questions: [
//         {no: 14, en: 'Has awareness about POSH Act been spread among all employees? (Section 19(c))', mr: 'सर्व कर्मचाऱ्यांमध्ये पॉश कायद्याबद्दल जागृती केली आहे का?'},
//         {no: 15, en: 'Has orientation/training been provided to IC members? (Section 19(g))', mr: 'IC सदस्यांना अभिमुखता/प्रशिक्षण दिले आहे का?'},
//         {no: 16, en: 'Are workshops/seminars organized for employees on POSH Act? (Section 19(c))', mr: 'कर्मचाऱ्यांसाठी पॉश कायद्यावर कार्यशाळा/सेमिनार आयोजित केले जातात का?'},
//         {no: 17, en: 'Is information about POSH policy displayed at workplace notice boards?', mr: 'कामाच्या ठिकाणी नोटीस बोर्डवर पॉश धोरणाची माहिती प्रदर्शित केली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: "Part D – Employer's Responsibility",
//         mr: 'भाग ड – नियोक्त्याची जबाबदारी',
//       },
//       questions: [
//         {no: 18, en: 'Is annual report on sexual harassment complaints submitted to District Officer? (Section 21)', mr: 'जिल्हा अधिकाऱ्याला लैंगिक छळाच्या तक्रारींचा वार्षिक अहवाल सादर केला जातो का?'},
//         {no: 19, en: 'Is safe working environment provided to employees? (Section 19(a))', mr: 'कर्मचाऱ्यांना सुरक्षित कामाचे वातावरण दिले जाते का?'},
//         {no: 20, en: 'Has a third-party / employer organized workshops for IC members in last one year?', mr: 'मागील एक वर्षात IC सदस्यांसाठी तृतीय पक्ष/नियोक्त्याने कार्यशाळा आयोजित केल्या आहेत का?'},
//         {no: 21, en: 'Is action taken against false or malicious complaints? (Section 14)', mr: 'खोट्या किंवा दुर्भावनापूर्ण तक्रारींविरुद्ध कारवाई केली जाते का?'},
//         {no: 22, en: 'Is information about POSH policy shared with new employees during induction?', mr: 'नवीन कर्मचाऱ्यांना इंडक्शन दरम्यान पॉश धोरणाची माहिती दिली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding',
//         mr: 'भाग इ – लैंगिक छळ इलेक्ट्रॉनिक बॉक्स (SHe-Box) नोंदणी',
//       },
//       questions: [
//         {no: 23, en: 'Has the organization been registered on SHe-Box portal?', mr: 'संस्था SHe-Box पोर्टलवर नोंदणीकृत आहे का?'},
//         {no: 24, en: 'Has the IC Chairperson been registered on SHe-Box portal?', mr: 'IC अध्यक्ष SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 25, en: 'Are all IC members registered on SHe-Box portal?', mr: 'सर्व IC सदस्य SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 26, en: 'Is the link of SHe-Box portal shared with all employees?', mr: 'SHe-Box पोर्टलची लिंक सर्व कर्मचाऱ्यांसोबत शेअर केली आहे का?'},
//       ],
//     },
//   ],
// };

// const TOTAL_PARTS = POSH_QUESTIONS.parts.length;
// const TOTAL_QUESTIONS = POSH_QUESTIONS.parts.reduce((a, p) => a + p.questions.length, 0);

// export default function PoshSurveyScreen({navigation}: any) {
//   const [partIndex, setPartIndex] = useState(0);
//   const [answers, setAnswers]     = useState<Record<number, 'yes' | 'no'>>({});
//   const [loading, setLoading]     = useState(false);
//   const [lang, setLang]           = useState<'en' | 'mr'>('en');

//   // ── Preview modal shown after last part is completed, before actual submit ──
//   const [showPreview, setShowPreview] = useState(false);

//   // ── Status-check state: decides which screen to show ──
//   const [checkingStatus, setCheckingStatus] = useState(true);
//   const [submitted, setSubmitted]           = useState(false);
//   const [canEdit, setCanEdit]               = useState(false);
//   const [reviewStatus, setReviewStatus]     = useState<string | null>(null);

//   const scrollRef = useRef<ScrollView>(null);
//   const currentPart = POSH_QUESTIONS.parts[partIndex];
//   const progressPct = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({y: 0, animated: true});
//   }, [partIndex]);

//   // ── On screen open: check whether this org already submitted, and whether editing is allowed ──
//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const orgToken = (await AsyncStorage.getItem('orgToken')) || '';

//         const res = await fetch(`${API_BASE}/survey/status`, {
//           headers: {
//             'Content-Type': 'application/json',
//             ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
//           },
//         });
//         const data = await res.json();

//         if (data.success && data.submitted) {
//           setSubmitted(true);
//           setCanEdit(!!data.canEdit);
//           setReviewStatus(data.status || null);

//           // Prefill previous answers so read-only view / edit form both have data
//           if (data.answers) {
//             const prefilled: Record<number, 'yes' | 'no'> = {};
//             Object.entries(data.answers).forEach(([qid, val]) => {
//               prefilled[Number(qid)] = val as 'yes' | 'no';
//             });
//             setAnswers(prefilled);
//           }
//         } else {
//           setSubmitted(false);
//         }
//       } catch (err) {
//         // Network issue — fail safe by letting them use the normal form
//         setSubmitted(false);
//       } finally {
//         setCheckingStatus(false);
//       }
//     };
//     checkStatus();
//   }, []);

//   const allAnsweredInPart = useMemo(
//     () => currentPart.questions.every(q => answers[q.no]),
//     [currentPart, answers],
//   );

//   const setAnswer = (qNo: number, val: 'yes' | 'no') =>
//     setAnswers(prev => ({...prev, [qNo]: val}));

//   const answeredCount = currentPart.questions.filter(q => answers[q.no]).length;

//   const handleLogout = () => {
//   Alert.alert(
//     'Logout',
//     'Are you sure you want to logout?',
//     [
//       {text: 'Cancel', style: 'cancel'},
//       {text: 'Logout', style: 'destructive', onPress: async () => {
//         await AsyncStorage.removeItem('orgToken');
//         await AsyncStorage.removeItem('companyUser');
//         navigation.replace('CompanyLogin');
//       }},
//     ]
//   );
// };

//   const handleNext = () => {
//     if (!allAnsweredInPart) {
//       Alert.alert(
//         lang === 'en' ? 'Incomplete' : 'अपूर्ण',
//         lang === 'en' ? 'Please answer all questions' : 'कृपया सर्व प्रश्नांची उत्तरे द्या',
//       );
//       return;
//     }
//     if (partIndex < TOTAL_PARTS - 1) {
//       setPartIndex(partIndex + 1);
//     } else {
//       // ── Last part done — show preview instead of submitting directly ──
//       setShowPreview(true);
//     }
//   };

//   // ── Jump to a given part to fix an answer, then close preview ──
//   const handleEditPart = (pIdx: number) => {
//     setShowPreview(false);
//     setPartIndex(pIdx);
//   };

//   // ── POST /api/org/survey/submit ──
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const orgToken = await AsyncStorage.getItem('orgToken') || '';


//       const payload = {
//         answers: Object.entries(answers).map(([questionNo, value]) => ({
//           questionid: Number(questionNo),
//           answer: value,
//         })),
//       };

//       const res = await fetch(`${API_BASE}/survey/submit`, {
//         method:  'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!data.success) {
//         Alert.alert('Error', data.message || 'Submission failed');
//         return;
//       }

//       setShowPreview(false);
//       Alert.alert(
//         lang === 'en' ? 'Success!' : 'यशस्वी!',
//         lang === 'en' ? 'Survey submitted successfully!' : 'सर्वेक्षण यशस्वीरित्या सबमिट झाले!',
//         [{text: 'OK', onPress: () => navigation.navigate('CompanyLogin')}],
//       );
//     } catch (err) {
//       Alert.alert('Error', 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────
//   // Loading state while status-check API call is in flight
//   // ─────────────────────────────────────────────────────────
//   if (checkingStatus) {
//     return (
//       <SafeAreaView style={[s.safe, {justifyContent: 'center', alignItems: 'center'}]}>
//         <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />
//         <ActivityIndicator size="large" color={PINK} />
//         <Text style={{marginTop: 12, color: BLUE_DEEP, fontWeight: '600'}}>
//           {lang === 'en' ? 'Checking survey status…' : 'सर्वेक्षण स्थिती तपासत आहे…'}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   // ─────────────────────────────────────────────────────────
//   // READ-ONLY VIEW: submitted, and NOT allowed to edit
//   // (report doesn't exist yet i.e. under review, or it's compiled/approved)
//   // ─────────────────────────────────────────────────────────
//   if (submitted && !canEdit) {
//     return (
//       <SafeAreaView style={s.safe}>
//         <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

//         <View style={s.topbar}>
//           <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
//             <Text style={s.backText}>← Home</Text>
//           </TouchableOpacity>
//           <Text style={s.topbarTitle}>POSH Survey</Text>
//           <View style={s.langToggle}>
//             <TouchableOpacity
//               style={[s.langBtn, lang === 'en' && s.langBtnActive]}
//               onPress={() => setLang('en')}>
//               <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
//               onPress={() => setLang('mr')}>
//               <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
//             <MaterialIcons name="logout" size={20} color={PINK} />
//           </TouchableOpacity>
//         </View>

//         <ScrollView contentContainerStyle={s.scroll}>

//           {/* Status banner */}
//           <View style={s.readOnlyBanner}>
//             <MaterialIcons name="lock-outline" size={20} color={BLUE_DEEP} />
//             <Text style={s.readOnlyBannerText}>
//               {reviewStatus === 'compiled'
//                 ? (lang === 'en'
//                     ? 'Your survey has been approved. This is a view-only copy.'
//                     : 'तुमचे सर्वेक्षण मंजूर झाले आहे. ही फक्त पाहण्यासाठीची प्रत आहे.')
//                 : (lang === 'en'
//                     ? 'Your survey has already been submitted and is awaiting Inspection Officer review. It cannot be edited right now.'
//                     : 'तुमचे सर्वेक्षण आधीच सबमिट झाले आहे आणि निरीक्षण अधिकाऱ्याच्या पुनरावलोकनाच्या प्रतीक्षेत आहे. सध्या ते संपादित करता येणार नाही.')}
//             </Text>
//           </View>

//           {/* Read-only Q&A list */}
//           <View style={s.card}>
//             {POSH_QUESTIONS.parts.map((part, pIdx) => (
//               <View key={pIdx} style={s.previewPartBlock}>
//                 <Text style={s.previewPartTitle}>{part.title[lang]}</Text>
//                 {part.questions.map(q => (
//                   <View key={q.no} style={s.previewQRow}>
//                     <Text style={s.previewQText}>
//                       <Text style={s.qNo}>{q.no}. </Text>
//                       {q[lang]}
//                     </Text>
//                     <View
//                       style={[
//                         s.previewAnsBadge,
//                         answers[q.no] === 'yes' && s.previewAnsYes,
//                         answers[q.no] === 'no' && s.previewAnsNo,
//                       ]}>
//                       <Text style={s.previewAnsText}>
//                         {answers[q.no] === 'yes'
//                           ? (lang === 'en' ? 'Yes' : 'होय')
//                           : answers[q.no] === 'no'
//                           ? (lang === 'en' ? 'No' : 'नाही')
//                           : '—'}
//                       </Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>

//         </ScrollView>

//         <View style={s.footer}>
//           <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ─────────────────────────────────────────────────────────
//   // NORMAL / EDITABLE FLOW

//   // (either never submitted, or submitted+rejected/notcompiled → editing allowed)
//   // ─────────────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={s.safe}>
//       <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

//       {/* Top Bar */}
//       <View style={s.topbar}>
//         <TouchableOpacity
//           style={s.backBtn}
//           onPress={() => partIndex > 0 ? setPartIndex(partIndex - 1) : navigation.goBack()}>
//           <Text style={s.backText}>← {partIndex > 0 ? 'Back' : 'Home'}</Text>
//         </TouchableOpacity>
//         <Text style={s.topbarTitle}>POSH Survey</Text>
//         {/* Lang Toggle */}
//         <View style={s.langToggle}>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'en' && s.langBtnActive]}
//             onPress={() => setLang('en')}>
//             <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
//             onPress={() => setLang('mr')}>
//             <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
//   <MaterialIcons name="logout" size={20} color={PINK} />
// </TouchableOpacity>
//       </View>

//         <ScrollView
//   ref={scrollRef}
//   contentContainerStyle={s.scroll}
//   keyboardShouldPersistTaps="handled">

//          {/* ── Resubmission Banner (only when editing a rejected/notcompiled survey) ── */}
//         {submitted && canEdit && (
//           <View style={s.editBanner}>
//             <MaterialIcons name="info-outline" size={18} color="#92400e" />
//             <Text style={s.editBannerText}>
//               {reviewStatus === 'rejected'
//                 ? (lang === 'en'
//                     ? 'Your previous submission was rejected. Please review and resubmit.'
//                     : 'तुमचे मागील सबमिशन नाकारले गेले आहे. कृपया तपासून पुन्हा सबमिट करा.')
//                 : (lang === 'en'
//                     ? 'Your previous submission was marked non-compliant. Please update and resubmit.'
//                     : 'तुमचे मागील सबमिशन असंमत ठरले आहे. कृपया अद्ययावत करून पुन्हा सबमिट करा.')}
//             </Text>
//           </View>
//         )}

//          {/* ── Info Card ── */}
//         <View style={s.infoCard}>
//           <View style={s.badgeRow}>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
//           </View>
//           <Text style={s.infoTitle}>POSH Survey</Text>
//           <Text style={s.infoSub}>Maharashtra State</Text>
//           <View style={s.portalPill}>
//             <Text style={s.portalPillText}>🛡 COMPLIANCE PORTAL</Text>
//           </View>
//           <Text style={s.infoDesc}>
//             Women &amp; Child Development —{'\n'}
//             POSH Compliance Inspection System
//           </Text>

//           {/* Overall Progress */}
//           <View style={s.overallProgress}>
//             <Text style={s.overallLabel}>OVERALL PROGRESS</Text>
//             <View style={s.overallTrack}>
//               <View style={[s.overallFill, {width: `${progressPct}%`}]} />
//             </View>
//             <View style={s.overallMeta}>
//               <Text style={s.overallNum}>Part {partIndex + 1}</Text>
//               <Text style={s.overallTotal}>of {TOTAL_PARTS} Parts</Text>
//             </View>
//           </View>

//           <View style={s.statsRow}>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{Object.keys(answers).length}</Text>
//               <Text style={s.statLabel}>Answered</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{TOTAL_PARTS}</Text>
//               <Text style={s.statLabel}>Parts</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>34</Text>
//               <Text style={s.statLabel}>Districts</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Survey Card ── */}
//         <View style={s.card}>

//           {/* Brand */}
//           <View style={s.brandRow}>
//             <View style={s.brand}>
//               <View style={s.brandIcon}>
//                 <Text style={{fontSize: 22}}>📋</Text>
//               </View>
//               <View>
//                 <Text style={s.brandTitle}>POSH Survey Form</Text>
//                 <Text style={s.brandSub}>Inspection Portal</Text>
//               </View>
//             </View>
//             <View style={s.versionPill}>
//               <Text style={s.versionText}>v2.0</Text>
//             </View>
//           </View>

//           {/* Progress */}
//           <View style={s.progressCard}>
//             <View style={s.progressMeta}>
//               <Text style={s.progressLabel}>
//                 {lang === 'en' ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`}
//               </Text>
//               <Text style={s.progressPct}>{progressPct}%</Text>
//             </View>
//             <View style={s.progressTrack}>
//               <View style={[s.progressFill, {width: `${progressPct}%`}]} />
//             </View>
//           </View>

//           {/* Part Heading */}
//           <View style={s.partHead}>
//             <View style={s.partIcon}>
//               <Text style={{fontSize: 14}}>🛡</Text>
//             </View>
//             <Text style={s.partTitle} numberOfLines={3}>
//               {currentPart.title[lang]}
//             </Text>
//             <View style={s.partCount}>
//               <Text style={s.partCountText}>{answeredCount}/{currentPart.questions.length}</Text>
//             </View>
//           </View>

//           {/* Questions */}
//           {currentPart.questions.map(q => (
//             <View
//               key={q.no}
//               style={[s.qCard, answers[q.no] && s.qCardAnswered]}>
//               <Text style={s.qText}>
//                 <Text style={s.qNo}>{q.no}. </Text>
//                 {q[lang]}
//               </Text>
//               <View style={s.qOptions}>
//                 <TouchableOpacity
//                   style={[s.optBtn, answers[q.no] === 'yes' && s.optBtnYes]}
//                   onPress={() => setAnswer(q.no, 'yes')}>
//                   <Text style={[s.optText, answers[q.no] === 'yes' && s.optTextYes]}>
//                     ✓  {lang === 'en' ? 'Yes' : 'होय'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[s.optBtn, answers[q.no] === 'no' && s.optBtnNo]}
//                   onPress={() => setAnswer(q.no, 'no')}>
//                   <Text style={[s.optText, answers[q.no] === 'no' && s.optTextNo]}>
//                     ✗  {lang === 'en' ? 'No' : 'नाही'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}

//           {/* Nav Buttons */}
//           <View style={s.btnRow}>
//             {partIndex > 0 && (
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setPartIndex(partIndex - 1)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>← {lang === 'en' ? 'Previous' : 'मागे'}</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity
//               style={[s.submitBtn, loading && s.btnDisabled]}
//               onPress={handleNext}
//               disabled={loading}>
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={s.submitBtnText}>
//                     {partIndex === TOTAL_PARTS - 1
//                       ? (lang === 'en' ? 'Review & Submit ✓' : 'तपासा आणि सबमिट करा ✓')
//                       : (lang === 'en' ? 'Next →' : 'पुढे →')}
//                   </Text>}
//             </TouchableOpacity>
//           </View>
//         </View>

//       </ScrollView>

//       <View style={s.footer}>
//         <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
//       </View>

//       {/* ── Preview Modal ── shown after last part, before real submit ── */}
//       <Modal
//         visible={showPreview}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setShowPreview(false)}>
//         <View style={s.modalOverlay}>
//           <View style={s.modalCard}>

//             {/* Modal Header */}
//             <View style={s.modalHeader}>
//               <View>
//                 <Text style={s.modalTitle}>
//                   {lang === 'en' ? 'Review Your Answers' : 'तुमची उत्तरे तपासा'}
//                 </Text>
//                 <Text style={s.modalSub}>
//                   {lang === 'en'
//                     ? `${Object.keys(answers).length} of ${TOTAL_QUESTIONS} answered`
//                     : `${Object.keys(answers).length} पैकी ${TOTAL_QUESTIONS} उत्तर दिले`}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={s.modalCloseBtn}
//                 onPress={() => setShowPreview(false)}
//                 disabled={loading}>
//                 <MaterialIcons name="close" size={20} color={BLUE_DEEP} />
//               </TouchableOpacity>
//             </View>

//             {/* Modal Body */}
//             <ScrollView style={s.modalBody} contentContainerStyle={{paddingBottom: 12}}>
//               {POSH_QUESTIONS.parts.map((part, pIdx) => (
//                 <View key={pIdx} style={s.previewPartBlock}>
//                   <View style={s.previewPartHead}>
//                     <Text style={s.previewPartTitle} numberOfLines={2}>
//                       {part.title[lang]}
//                     </Text>
//                     <TouchableOpacity
//                       style={s.editBtn}
//                       onPress={() => handleEditPart(pIdx)}
//                       disabled={loading}>
//                       <MaterialIcons name="edit" size={14} color={PINK} />
//                       <Text style={s.editBtnText}>
//                         {lang === 'en' ? 'Edit' : 'बदला'}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   {part.questions.map(q => (
//                     <View key={q.no} style={s.previewQRow}>
//                       <Text style={s.previewQText}>
//                         <Text style={s.qNo}>{q.no}. </Text>
//                         {q[lang]}
//                       </Text>
//                       <View
//                         style={[
//                           s.previewAnsBadge,
//                           answers[q.no] === 'yes' && s.previewAnsYes,
//                           answers[q.no] === 'no' && s.previewAnsNo,
//                         ]}>
//                         <Text style={s.previewAnsText}>
//                           {answers[q.no] === 'yes'
//                             ? (lang === 'en' ? 'Yes' : 'होय')
//                             : answers[q.no] === 'no'
//                             ? (lang === 'en' ? 'No' : 'नाही')
//                             : (lang === 'en' ? 'Not answered' : 'उत्तर नाही')}
//                         </Text>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </ScrollView>

//             {/* Modal Footer */}
//             <View style={s.modalFooter}>
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setShowPreview(false)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>
//                   {lang === 'en' ? 'Continue Editing' : 'संपादन सुरू ठेवा'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[s.submitBtn, loading && s.btnDisabled]}
//                 onPress={handleSubmit}
//                 disabled={loading}>
//                 {loading
//                   ? <ActivityIndicator color="#fff" />
//                   : <Text style={s.submitBtnText}>
//                       {lang === 'en' ? 'Confirm & Submit ✓' : 'खात्री करा आणि सबमिट करा ✓'}
//                     </Text>}
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const s = StyleSheet.create({
//   safe:   {flex: 1, backgroundColor: CREAM},
//   scroll: {padding: 16, paddingBottom: 8},

//   topbar:          {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   backBtn:         {paddingVertical: 4, paddingRight: 8},
//   backText:        {fontSize: 13, color: BLUE, fontWeight: '700'},
//   logoutBtn:  {width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
// logoutIcon: {fontSize: 18, color: PINK, fontWeight: '800'},
//   topbarTitle:     {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   langToggle:      {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 10, padding: 3, gap: 3},
//   langBtn:         {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7},
//   langBtnActive:   {backgroundColor: PINK},
//   langBtnText:     {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
//   langBtnTextActive:{color: '#fff'},

//   card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

//   brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
//   brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
//   brandTitle:  {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
//   versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
//   versionText: {fontSize: 11, fontWeight: '700', color: PINK},

//   progressCard:  {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#E0B978'},
//   progressMeta:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   progressLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', textTransform: 'uppercase', letterSpacing: 0.5},
//   progressPct:   {fontSize: 12, fontWeight: '800', color: PINK},
//   progressTrack: {height: 6, backgroundColor: 'rgba(205,54,107,0.12)', borderRadius: 99, overflow: 'hidden'},
//   progressFill:  {height: 6, backgroundColor: PINK, borderRadius: 99},

//   partHead:      {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16},
//   partIcon:      {width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2},
//   partTitle:     {flex: 1, fontSize: 13, fontWeight: '800', color: BLUE_DEEP, lineHeight: 19},
//   partCount:     {backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, flexShrink: 0},
//   partCountText: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},

//   qCard:         {borderWidth: 1, borderColor: 'rgba(44,61,131,0.10)', borderRadius: 14, padding: 16, marginBottom: 10, backgroundColor: 'rgba(44,61,131,0.015)'},
//   qCardAnswered: {borderColor: 'rgba(44,61,131,0.15)', backgroundColor: 'rgba(44,61,131,0.025)'},
//   qText:         {fontSize: 13, lineHeight: 20, color: BLUE_DEEP, marginBottom: 12},
//   qNo:           {color: PINK, fontWeight: '800'},
//   qOptions:      {flexDirection: 'row', gap: 10},
//   optBtn:        {flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.12)', backgroundColor: '#fff', alignItems: 'center'},
//   optBtnYes:     {backgroundColor: GREEN, borderColor: 'transparent', shadowColor: GREEN, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optBtnNo:      {backgroundColor: RED, borderColor: 'transparent', shadowColor: RED, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optText:       {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
//   optTextYes:    {color: '#fff'},
//   optTextNo:     {color: '#fff'},

//   btnRow:        {flexDirection: 'row', gap: 10, marginTop: 8},
//   ghostBtn:      {paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
//   ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
//   btnDisabled:   {opacity: 0.5},
//   submitBtnText: {color: '#fff', fontSize: 14, fontWeight: '700'},

//   infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
//   badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
//   logoBadge:      {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
//   infoTitle:      {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
//   infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
//   portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
//   portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
//   infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 16},

//   overallProgress: {backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   overallLabel:    {color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8},
//   overallTrack:    {height: 8, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 99, overflow: 'hidden', marginBottom: 8},
//   overallFill:     {height: 8, backgroundColor: PINK, borderRadius: 99},
//   overallMeta:     {flexDirection: 'row', justifyContent: 'space-between'},
//   overallNum:      {color: '#fff', fontSize: 13, fontWeight: '800'},
//   overallTotal:    {color: 'rgba(255,255,255,0.45)', fontSize: 12},

//   statsRow:  {flexDirection: 'row', justifyContent: 'space-around'},
//   statItem:  {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   statNum:   {color: '#fff', fontSize: 18, fontWeight: '800'},
//   statLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

//   footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
//   footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},

//   // ── Preview Modal styles ──
//   modalOverlay:   {flex: 1, backgroundColor: 'rgba(29,42,96,0.55)', justifyContent: 'flex-end'},
//   modalCard:      {backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: '88%', paddingTop: 18, paddingHorizontal: 18, paddingBottom: 14},
//   modalHeader:    {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   modalTitle:     {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   modalSub:       {fontSize: 12, color: 'rgba(44,61,131,0.5)', marginTop: 3},
//   modalCloseBtn:  {width: 30, height: 30, borderRadius: 999, backgroundColor: 'rgba(44,61,131,0.06)', justifyContent: 'center', alignItems: 'center'},
//   modalBody:      {maxHeight: '75%'},

//   previewPartBlock: {marginBottom: 18},
//   previewPartHead:  {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
//   previewPartTitle: {flex: 1, fontSize: 12.5, fontWeight: '800', color: BLUE_DEEP, lineHeight: 17, paddingRight: 8, marginBottom: 8},
//   editBtn:          {flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(205,54,107,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5},
//   editBtnText:      {fontSize: 11, fontWeight: '700', color: PINK},

//   previewQRow:      {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
//   previewQText:     {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18},
//   previewAnsBadge:  {borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(44,61,131,0.08)', flexShrink: 0},
//   previewAnsYes:    {backgroundColor: GREEN},
//   previewAnsNo:     {backgroundColor: RED},
//   previewAnsText:   {fontSize: 11, fontWeight: '700', color: '#fff'},

//   modalFooter:    {flexDirection: 'row', gap: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},

//   // ── Read-only full screen banner ──
//   readOnlyBanner: {flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 14, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: BLUE},
//   readOnlyBannerText: {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18, fontWeight: '600'},

//   // ── Edit / resubmit banner (rejected / notcompiled) ──
//   editBanner: {flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: '#fef3c7', borderRadius: 14, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: AMBER},
//   editBannerText: {flex: 1, fontSize: 12.5, color: '#92400e', lineHeight: 18, fontWeight: '600'},
// });






// import React, {useState, useMemo, useRef, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
//   Modal,
// } from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const API_BASE = 'https://mahaposhact.saavi.co.in/api/org';

// const PINK      = '#CD366B';
// const PINK_DARK = '#b82a5c';
// const BLUE      = '#2C3D83';
// const BLUE_DEEP = '#1d2a60';
// const CREAM     = '#FBF3EE';
// const GREEN     = '#22c55e';
// const RED       = '#ef4444';
// const AMBER     = '#d97706';
// const GRAY      = '#9ca3af';

// // ─── POSH Questions Data ─────────────────────────────────
// const POSH_QUESTIONS = {
//   parts: [
//     {
//       title: {
//         en: 'Part A – POSH Policy and Internal Committee (IC) Related Compliance',
//         mr: 'भाग अ – पॉश धोरण आणि अंतर्गत समिती (IC) संबंधित अनुपालन',
//       },
//       questions: [
//         {no: 1,  en: 'Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)', mr: 'पॉश धोरण तयार केले आणि स्वीकारले आहे का?'},
//         {no: 2,  en: 'Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))', mr: 'धोरण सर्व कर्मचाऱ्यांना वितरित केले आहे का?'},
//         {no: 3,  en: 'Has She-Box Portal been made available on the official website and on official social media?', mr: 'शी-बॉक्स पोर्टल अधिकृत वेबसाइटवर उपलब्ध आहे का?'},
//         {no: 4,  en: 'Does the policy include a remote / virtual (work from home) work environment?', mr: 'धोरणात दूरस्थ / व्हर्च्युअल कामाच्या वातावरणाचा समावेश आहे का?'},
//         {no: 5,  en: 'Is there an Internal Committee (IC) constituted in each office/unit?', mr: 'प्रत्येक कार्यालय/युनिटमध्ये अंतर्गत समिती स्थापन केली आहे का?'},
//         {no: 6,  en: 'Does the Internal Committee (IC) have at least 4 members?', mr: 'अंतर्गत समितीमध्ये किमान 4 सदस्य आहेत का?'},
//         {no: 7,  en: 'Are at least 50% of the internal committee members women?', mr: 'अंतर्गत समितीच्या किमान 50% सदस्य महिला आहेत का?'},
//         {no: 8,  en: 'Has a senior female employee been appointed as internal committee chairperson?', mr: 'वरिष्ठ महिला कर्मचाऱ्याला अंतर्गत समितीचे अध्यक्ष म्हणून नियुक्त केले आहे का?'},
//         {no: 9,  en: 'As per Section 4(2)(c), has a member of external NGO or social organization been included in the committee?', mr: 'बाह्य NGO किंवा सामाजिक संस्थेचा सदस्य समितीमध्ये समाविष्ट केला आहे का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part B – Support / Assistance to the Aggrieved Woman',
//         mr: 'भाग ब – पीडित महिलेला आधार / सहाय्य',
//       },
//       questions: [
//         {no: 10, en: 'Is interim relief provided to the aggrieved woman during inquiry? (As per Section 12)', mr: 'चौकशी दरम्यान पीडित महिलेला अंतरिम दिलासा दिला जातो का?'},
//         {no: 11, en: 'Is the aggrieved woman given option to seek conciliation before initiating inquiry? (Section 10)', mr: 'चौकशी सुरू करण्यापूर्वी पीडित महिलेला समेट करण्याचा पर्याय दिला जातो का?'},
//         {no: 12, en: 'Is the identity of the aggrieved woman kept confidential during inquiry? (Section 16)', mr: 'चौकशी दरम्यान पीडित महिलेची ओळख गोपनीय ठेवली जाते का?'},
//         {no: 13, en: 'Is the aggrieved woman informed about the right to appeal against the IC decision? (Section 18)', mr: 'IC निर्णयाविरुद्ध अपील करण्याच्या अधिकाराबद्दल पीडित महिलेला सांगितले जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part C – Awareness and Training',
//         mr: 'भाग क – जागृती आणि प्रशिक्षण',
//       },
//       questions: [
//         {no: 14, en: 'Has awareness about POSH Act been spread among all employees? (Section 19(c))', mr: 'सर्व कर्मचाऱ्यांमध्ये पॉश कायद्याबद्दल जागृती केली आहे का?'},
//         {no: 15, en: 'Has orientation/training been provided to IC members? (Section 19(g))', mr: 'IC सदस्यांना अभिमुखता/प्रशिक्षण दिले आहे का?'},
//         {no: 16, en: 'Are workshops/seminars organized for employees on POSH Act? (Section 19(c))', mr: 'कर्मचाऱ्यांसाठी पॉश कायद्यावर कार्यशाळा/सेमिनार आयोजित केले जातात का?'},
//         {no: 17, en: 'Is information about POSH policy displayed at workplace notice boards?', mr: 'कामाच्या ठिकाणी नोटीस बोर्डवर पॉश धोरणाची माहिती प्रदर्शित केली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: "Part D – Employer's Responsibility",
//         mr: 'भाग ड – नियोक्त्याची जबाबदारी',
//       },
//       questions: [
//         {no: 18, en: 'Is annual report on sexual harassment complaints submitted to District Officer? (Section 21)', mr: 'जिल्हा अधिकाऱ्याला लैंगिक छळाच्या तक्रारींचा वार्षिक अहवाल सादर केला जातो का?'},
//         {no: 19, en: 'Is safe working environment provided to employees? (Section 19(a))', mr: 'कर्मचाऱ्यांना सुरक्षित कामाचे वातावरण दिले जाते का?'},
//         {no: 20, en: 'Has a third-party / employer organized workshops for IC members in last one year?', mr: 'मागील एक वर्षात IC सदस्यांसाठी तृतीय पक्ष/नियोक्त्याने कार्यशाळा आयोजित केल्या आहेत का?'},
//         {no: 21, en: 'Is action taken against false or malicious complaints? (Section 14)', mr: 'खोट्या किंवा दुर्भावनापूर्ण तक्रारींविरुद्ध कारवाई केली जाते का?'},
//         {no: 22, en: 'Is information about POSH policy shared with new employees during induction?', mr: 'नवीन कर्मचाऱ्यांना इंडक्शन दरम्यान पॉश धोरणाची माहिती दिली जाते का?'},
//       ],
//     },
//     {
//       title: {
//         en: 'Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding',
//         mr: 'भाग इ – लैंगिक छळ इलेक्ट्रॉनिक बॉक्स (SHe-Box) नोंदणी',
//       },
//       questions: [
//         {no: 23, en: 'Has the organization been registered on SHe-Box portal?', mr: 'संस्था SHe-Box पोर्टलवर नोंदणीकृत आहे का?'},
//         {no: 24, en: 'Has the IC Chairperson been registered on SHe-Box portal?', mr: 'IC अध्यक्ष SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 25, en: 'Are all IC members registered on SHe-Box portal?', mr: 'सर्व IC सदस्य SHe-Box पोर्टलवर नोंदणीकृत आहेत का?'},
//         {no: 26, en: 'Is the link of SHe-Box portal shared with all employees?', mr: 'SHe-Box पोर्टलची लिंक सर्व कर्मचाऱ्यांसोबत शेअर केली आहे का?'},
//       ],
//     },
//   ],
// };

// const TOTAL_PARTS = POSH_QUESTIONS.parts.length;
// const TOTAL_QUESTIONS = POSH_QUESTIONS.parts.reduce((a, p) => a + p.questions.length, 0);

// export default function PoshSurveyScreen({navigation}: any) {
//   const [partIndex, setPartIndex] = useState(0);
//   const [answers, setAnswers]     = useState<Record<number, 'yes' | 'no'>>({});
//   const [loading, setLoading]     = useState(false);
//   const [lang, setLang]           = useState<'en' | 'mr'>('en');

//   // ── Preview modal shown after last part is completed, before actual submit ──
//   const [showPreview, setShowPreview] = useState(false);

//   // ── Status-check state: decides which screen to show ──
//   const [checkingStatus, setCheckingStatus] = useState(true);
//   const [submitted, setSubmitted]           = useState(false);
//   const [canEdit, setCanEdit]               = useState(false);
//   const [reviewStatus, setReviewStatus]     = useState<string | null>(null);

//   // ── Which questions are actually editable when resubmitting, + officer's comment on each ──
//   const [editableIds, setEditableIds]           = useState<Set<number>>(new Set());
//   const [officerComments, setOfficerComments]   = useState<Record<number, string>>({});

//   const scrollRef = useRef<ScrollView>(null);
//   const currentPart = POSH_QUESTIONS.parts[partIndex];
//   const progressPct = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({y: 0, animated: true});
//   }, [partIndex]);

//   // ── On screen open: check whether this org already submitted, and whether editing is allowed ──
//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const orgToken = (await AsyncStorage.getItem('orgToken')) || '';

//         const res = await fetch(`${API_BASE}/survey/status`, {
//           headers: {
//             'Content-Type': 'application/json',
//             ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
//           },
//         });
//         const data = await res.json();

//         if (data.success && data.submitted) {
//           setSubmitted(true);
//           setCanEdit(!!data.canEdit);
//           setReviewStatus(data.status || null);

//           // Prefill previous answers so read-only view / edit form both have data
//           if (data.answers) {
//             const prefilled: Record<number, 'yes' | 'no'> = {};
//             Object.entries(data.answers).forEach(([qid, val]) => {
//               prefilled[Number(qid)] = val as 'yes' | 'no';
//             });
//             setAnswers(prefilled);
//           }

//           // Which specific questions the officer flagged — only these unlock for editing
//           if (data.editableQuestions) {
//             const ids = new Set<number>();
//             const comments: Record<number, string> = {};
//             Object.entries(data.editableQuestions).forEach(([qid, val]: [string, any]) => {
//               const n = Number(qid);
//               ids.add(n);
//               comments[n] = val?.comment || '';
//             });
//             setEditableIds(ids);
//             setOfficerComments(comments);
//           }
//         } else {
//           setSubmitted(false);
//         }
//       } catch (err) {
//         // Network issue — fail safe by letting them use the normal form
//         setSubmitted(false);
//       } finally {
//         setCheckingStatus(false);
//       }
//     };
//     checkStatus();
//   }, []);

//   // A question is locked when we're in "edit previous submission" mode
//   // AND that specific question was NOT flagged by the officer.
//   const isLocked = (qNo: number) => submitted && canEdit && !editableIds.has(qNo);

//   const allAnsweredInPart = useMemo(
//     () => currentPart.questions.every(q => answers[q.no]),
//     [currentPart, answers],
//   );

//   const setAnswer = (qNo: number, val: 'yes' | 'no') => {
//     if (isLocked(qNo)) return; // guard — locked questions can't be changed
//     setAnswers(prev => ({...prev, [qNo]: val}));
//   };

//   const answeredCount = currentPart.questions.filter(q => answers[q.no]).length;

//   const handleLogout = () => {
//   Alert.alert(
//     'Logout',
//     'Are you sure you want to logout?',
//     [
//       {text: 'Cancel', style: 'cancel'},
//       {text: 'Logout', style: 'destructive', onPress: async () => {
//         await AsyncStorage.removeItem('orgToken');
//         await AsyncStorage.removeItem('companyUser');
//         navigation.replace('CompanyLogin');
//       }},
//     ]
//   );
// };

//   const handleNext = () => {
//     if (!allAnsweredInPart) {
//       Alert.alert(
//         lang === 'en' ? 'Incomplete' : 'अपूर्ण',
//         lang === 'en' ? 'Please answer all questions' : 'कृपया सर्व प्रश्नांची उत्तरे द्या',
//       );
//       return;
//     }
//     if (partIndex < TOTAL_PARTS - 1) {
//       setPartIndex(partIndex + 1);
//     } else {
//       // ── Last part done — show preview instead of submitting directly ──
//       setShowPreview(true);
//     }
//   };

//   // ── Jump to a given part to fix an answer, then close preview ──
//   const handleEditPart = (pIdx: number) => {
//     setShowPreview(false);
//     setPartIndex(pIdx);
//   };

//   // ── POST /api/org/survey/submit ──
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const orgToken = await AsyncStorage.getItem('orgToken') || '';


//       const payload = {
//         answers: Object.entries(answers).map(([questionNo, value]) => ({
//           questionid: Number(questionNo),
//           answer: value,
//         })),
//       };

//       const res = await fetch(`${API_BASE}/survey/submit`, {
//         method:  'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!data.success) {
//         Alert.alert('Error', data.message || 'Submission failed');
//         return;
//       }

//       setShowPreview(false);
//       Alert.alert(
//         lang === 'en' ? 'Success!' : 'यशस्वी!',
//         lang === 'en' ? 'Survey submitted successfully!' : 'सर्वेक्षण यशस्वीरित्या सबमिट झाले!',
//         [{text: 'OK', onPress: () => navigation.navigate('CompanyLogin')}],
//       );
//     } catch (err) {
//       Alert.alert('Error', 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────
//   // Loading state while status-check API call is in flight
//   // ─────────────────────────────────────────────────────────
//   if (checkingStatus) {
//     return (
//       <SafeAreaView style={[s.safe, {justifyContent: 'center', alignItems: 'center'}]}>
//         <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />
//         <ActivityIndicator size="large" color={PINK} />
//         <Text style={{marginTop: 12, color: BLUE_DEEP, fontWeight: '600'}}>
//           {lang === 'en' ? 'Checking survey status…' : 'सर्वेक्षण स्थिती तपासत आहे…'}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   // ─────────────────────────────────────────────────────────
//   // READ-ONLY VIEW: submitted, and NOT allowed to edit
//   // (report doesn't exist yet i.e. under review, or it's compiled/approved)
//   // ─────────────────────────────────────────────────────────
//   if (submitted && !canEdit) {
//     return (
//       <SafeAreaView style={s.safe}>
//         <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

//         <View style={s.topbar}>
//           <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
//             <Text style={s.backText}>← Home</Text>
//           </TouchableOpacity>
//           <Text style={s.topbarTitle}>POSH Survey</Text>
//           <View style={s.langToggle}>
//             <TouchableOpacity
//               style={[s.langBtn, lang === 'en' && s.langBtnActive]}
//               onPress={() => setLang('en')}>
//               <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
//               onPress={() => setLang('mr')}>
//               <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
//             <MaterialIcons name="logout" size={20} color={PINK} />
//           </TouchableOpacity>
//         </View>

//         <ScrollView contentContainerStyle={s.scroll}>

//           {/* Status banner */}
//           <View style={s.readOnlyBanner}>
//             <MaterialIcons name="lock-outline" size={20} color={BLUE_DEEP} />
//             <Text style={s.readOnlyBannerText}>
//               {reviewStatus === 'compiled'
//                 ? (lang === 'en'
//                     ? 'Your survey has been approved. This is a view-only copy.'
//                     : 'तुमचे सर्वेक्षण मंजूर झाले आहे. ही फक्त पाहण्यासाठीची प्रत आहे.')
//                 : (lang === 'en'
//                     ? 'Your survey has already been submitted and is awaiting Inspection Officer review. It cannot be edited right now.'
//                     : 'तुमचे सर्वेक्षण आधीच सबमिट झाले आहे आणि निरीक्षण अधिकाऱ्याच्या पुनरावलोकनाच्या प्रतीक्षेत आहे. सध्या ते संपादित करता येणार नाही.')}
//             </Text>
//           </View>

//           {/* Read-only Q&A list */}
//           <View style={s.card}>
//             {POSH_QUESTIONS.parts.map((part, pIdx) => (
//               <View key={pIdx} style={s.previewPartBlock}>
//                 <Text style={s.previewPartTitle}>{part.title[lang]}</Text>
//                 {part.questions.map(q => (
//                   <View key={q.no} style={s.previewQRow}>
//                     <Text style={s.previewQText}>
//                       <Text style={s.qNo}>{q.no}. </Text>
//                       {q[lang]}
//                     </Text>
//                     <View
//                       style={[
//                         s.previewAnsBadge,
//                         answers[q.no] === 'yes' && s.previewAnsYes,
//                         answers[q.no] === 'no' && s.previewAnsNo,
//                       ]}>
//                       <Text style={s.previewAnsText}>
//                         {answers[q.no] === 'yes'
//                           ? (lang === 'en' ? 'Yes' : 'होय')
//                           : answers[q.no] === 'no'
//                           ? (lang === 'en' ? 'No' : 'नाही')
//                           : '—'}
//                       </Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>

//         </ScrollView>

//         <View style={s.footer}>
//           <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ─────────────────────────────────────────────────────────
//   // NORMAL / EDITABLE FLOW
//   // (either never submitted, or submitted+rejected/notcompiled → editing allowed)
//   // ─────────────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={s.safe}>
//       <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

//       {/* Top Bar */}
//       <View style={s.topbar}>
//         <TouchableOpacity
//           style={s.backBtn}
//           onPress={() => partIndex > 0 ? setPartIndex(partIndex - 1) : navigation.goBack()}>
//           <Text style={s.backText}>← {partIndex > 0 ? 'Back' : 'Home'}</Text>
//         </TouchableOpacity>
//         <Text style={s.topbarTitle}>POSH Survey</Text>
//         {/* Lang Toggle */}
//         <View style={s.langToggle}>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'en' && s.langBtnActive]}
//             onPress={() => setLang('en')}>
//             <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
//             onPress={() => setLang('mr')}>
//             <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
//   <MaterialIcons name="logout" size={20} color={PINK} />
// </TouchableOpacity>
//       </View>

//         <ScrollView
//   ref={scrollRef}
//   contentContainerStyle={s.scroll}
//   keyboardShouldPersistTaps="handled">

//          {/* ── Resubmission Banner (only when editing a rejected/notcompiled survey) ── */}
//         {submitted && canEdit && (
//           <View style={s.editBanner}>
//             <MaterialIcons name="info-outline" size={18} color="#92400e" />
//             <Text style={s.editBannerText}>
//               {reviewStatus === 'rejected'
//                 ? (lang === 'en'
//                     ? `Your previous submission was rejected. Only ${editableIds.size} flagged question(s) below can be updated.`
//                     : `तुमचे मागील सबमिशन नाकारले गेले आहे. फक्त खालील ${editableIds.size} चिन्हांकित प्रश्न बदलता येतील.`)
//                 : (lang === 'en'
//                     ? `Your previous submission was marked non-compliant. Only ${editableIds.size} flagged question(s) below can be updated.`
//                     : `तुमचे मागील सबमिशन असंमत ठरले आहे. फक्त खालील ${editableIds.size} चिन्हांकित प्रश्न बदलता येतील.`)}
//             </Text>
//           </View>
//         )}

//          {/* ── Info Card ── */}
//         <View style={s.infoCard}>
//           <View style={s.badgeRow}>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>🛡</Text></View>
//             <View style={s.logoBadge}><Text style={{fontSize: 22}}>⭐</Text></View>
//           </View>
//           <Text style={s.infoTitle}>POSH Survey</Text>
//           <Text style={s.infoSub}>Maharashtra State</Text>
//           <View style={s.portalPill}>
//             <Text style={s.portalPillText}>🛡 COMPLIANCE PORTAL</Text>
//           </View>
//           <Text style={s.infoDesc}>
//             Women &amp; Child Development —{'\n'}
//             POSH Compliance Inspection System
//           </Text>

//           {/* Overall Progress */}
//           <View style={s.overallProgress}>
//             <Text style={s.overallLabel}>OVERALL PROGRESS</Text>
//             <View style={s.overallTrack}>
//               <View style={[s.overallFill, {width: `${progressPct}%`}]} />
//             </View>
//             <View style={s.overallMeta}>
//               <Text style={s.overallNum}>Part {partIndex + 1}</Text>
//               <Text style={s.overallTotal}>of {TOTAL_PARTS} Parts</Text>
//             </View>
//           </View>

//           <View style={s.statsRow}>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{Object.keys(answers).length}</Text>
//               <Text style={s.statLabel}>Answered</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>{TOTAL_PARTS}</Text>
//               <Text style={s.statLabel}>Parts</Text>
//             </View>
//             <View style={s.statItem}>
//               <Text style={s.statNum}>34</Text>
//               <Text style={s.statLabel}>Districts</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Survey Card ── */}
//         <View style={s.card}>

//           {/* Brand */}
//           <View style={s.brandRow}>
//             <View style={s.brand}>
//               <View style={s.brandIcon}>
//                 <Text style={{fontSize: 22}}>📋</Text>
//               </View>
//               <View>
//                 <Text style={s.brandTitle}>POSH Survey Form</Text>
//                 <Text style={s.brandSub}>Inspection Portal</Text>
//               </View>
//             </View>
//             <View style={s.versionPill}>
//               <Text style={s.versionText}>v2.0</Text>
//             </View>
//           </View>

//           {/* Progress */}
//           <View style={s.progressCard}>
//             <View style={s.progressMeta}>
//               <Text style={s.progressLabel}>
//                 {lang === 'en' ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`}
//               </Text>
//               <Text style={s.progressPct}>{progressPct}%</Text>
//             </View>
//             <View style={s.progressTrack}>
//               <View style={[s.progressFill, {width: `${progressPct}%`}]} />
//             </View>
//           </View>

//           {/* Part Heading */}
//           <View style={s.partHead}>
//             <View style={s.partIcon}>
//               <Text style={{fontSize: 14}}>🛡</Text>
//             </View>
//             <Text style={s.partTitle} numberOfLines={3}>
//               {currentPart.title[lang]}
//             </Text>
//             <View style={s.partCount}>
//               <Text style={s.partCountText}>{answeredCount}/{currentPart.questions.length}</Text>
//             </View>
//           </View>

//           {/* Questions */}
//           {currentPart.questions.map(q => {
//             const locked = isLocked(q.no);
//             return (
//               <View
//                 key={q.no}
//                 style={[
//                   s.qCard,
//                   answers[q.no] && s.qCardAnswered,
//                   locked && s.qCardLocked,
//                 ]}>
//                 <View style={s.qTextRow}>
//                   <Text style={[s.qText, locked && s.qTextLocked]}>
//                     <Text style={[s.qNo, locked && s.qNoLocked]}>{q.no}. </Text>
//                     {q[lang]}
//                   </Text>
//                   {locked && (
//                     <MaterialIcons name="lock-outline" size={15} color={GRAY} style={{marginLeft: 6}} />
//                   )}
//                 </View>

//                 {locked ? (
//                   // ── Locked question: show previous answer only, no interaction ──
//                   <View style={s.lockedAnsRow}>
//                     <View
//                       style={[
//                         s.lockedAnsBadge,
//                         answers[q.no] === 'yes' && s.lockedAnsYes,
//                         answers[q.no] === 'no' && s.lockedAnsNo,
//                       ]}>
//                       <Text style={s.lockedAnsText}>
//                         {answers[q.no] === 'yes'
//                           ? (lang === 'en' ? '✓ Yes (locked)' : '✓ होय (लॉक)')
//                           : (lang === 'en' ? '✗ No (locked)' : '✗ नाही (लॉक)')}
//                       </Text>
//                     </View>
//                   </View>
//                 ) : (
//                   <>
//                     <View style={s.qOptions}>
//                       <TouchableOpacity
//                         style={[s.optBtn, answers[q.no] === 'yes' && s.optBtnYes]}
//                         onPress={() => setAnswer(q.no, 'yes')}>
//                         <Text style={[s.optText, answers[q.no] === 'yes' && s.optTextYes]}>
//                           ✓  {lang === 'en' ? 'Yes' : 'होय'}
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={[s.optBtn, answers[q.no] === 'no' && s.optBtnNo]}
//                         onPress={() => setAnswer(q.no, 'no')}>
//                         <Text style={[s.optText, answers[q.no] === 'no' && s.optTextNo]}>
//                           ✗  {lang === 'en' ? 'No' : 'नाही'}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>

//                     {/* Officer's comment — shown for flagged/editable questions only */}
//                     {submitted && canEdit && officerComments[q.no] ? (
//                       <View style={s.officerCommentBox}>
//                         <MaterialIcons name="chat-bubble-outline" size={13} color="#92400e" />
//                         <Text style={s.officerCommentText}>
//                           {lang === 'en' ? 'Officer remark: ' : 'अधिकाऱ्याची टीप: '}
//                           {officerComments[q.no]}
//                         </Text>
//                       </View>
//                     ) : null}
//                   </>
//                 )}
//               </View>
//             );
//           })}

//           {/* Nav Buttons */}
//           <View style={s.btnRow}>
//             {partIndex > 0 && (
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setPartIndex(partIndex - 1)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>← {lang === 'en' ? 'Previous' : 'मागे'}</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity
//               style={[s.submitBtn, loading && s.btnDisabled]}
//               onPress={handleNext}
//               disabled={loading}>
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={s.submitBtnText}>
//                     {partIndex === TOTAL_PARTS - 1
//                       ? (lang === 'en' ? 'Review & Submit ✓' : 'तपासा आणि सबमिट करा ✓')
//                       : (lang === 'en' ? 'Next →' : 'पुढे →')}
//                   </Text>}
//             </TouchableOpacity>
//           </View>
//         </View>

//       </ScrollView>

//       <View style={s.footer}>
//         <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
//       </View>

//       {/* ── Preview Modal ── shown after last part, before real submit ── */}
//       <Modal
//         visible={showPreview}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setShowPreview(false)}>
//         <View style={s.modalOverlay}>
//           <View style={s.modalCard}>

//             {/* Modal Header */}
//             <View style={s.modalHeader}>
//               <View>
//                 <Text style={s.modalTitle}>
//                   {lang === 'en' ? 'Review Your Answers' : 'तुमची उत्तरे तपासा'}
//                 </Text>
//                 <Text style={s.modalSub}>
//                   {lang === 'en'
//                     ? `${Object.keys(answers).length} of ${TOTAL_QUESTIONS} answered`
//                     : `${Object.keys(answers).length} पैकी ${TOTAL_QUESTIONS} उत्तर दिले`}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={s.modalCloseBtn}
//                 onPress={() => setShowPreview(false)}
//                 disabled={loading}>
//                 <MaterialIcons name="close" size={20} color={BLUE_DEEP} />
//               </TouchableOpacity>
//             </View>

//             {/* Modal Body */}
//             <ScrollView style={s.modalBody} contentContainerStyle={{paddingBottom: 12}}>
//               {POSH_QUESTIONS.parts.map((part, pIdx) => (
//                 <View key={pIdx} style={s.previewPartBlock}>
//                   <View style={s.previewPartHead}>
//                     <Text style={s.previewPartTitle} numberOfLines={2}>
//                       {part.title[lang]}
//                     </Text>
//                     <TouchableOpacity
//                       style={s.editBtn}
//                       onPress={() => handleEditPart(pIdx)}
//                       disabled={loading}>
//                       <MaterialIcons name="edit" size={14} color={PINK} />
//                       <Text style={s.editBtnText}>
//                         {lang === 'en' ? 'Edit' : 'बदला'}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   {part.questions.map(q => (
//                     <View key={q.no} style={s.previewQRow}>
//                       <Text style={s.previewQText}>
//                         <Text style={s.qNo}>{q.no}. </Text>
//                         {q[lang]}
//                         {isLocked(q.no) && (
//                           <Text style={{color: GRAY, fontSize: 11}}>  🔒</Text>
//                         )}
//                       </Text>
//                       <View
//                         style={[
//                           s.previewAnsBadge,
//                           answers[q.no] === 'yes' && s.previewAnsYes,
//                           answers[q.no] === 'no' && s.previewAnsNo,
//                         ]}>
//                         <Text style={s.previewAnsText}>
//                           {answers[q.no] === 'yes'
//                             ? (lang === 'en' ? 'Yes' : 'होय')
//                             : answers[q.no] === 'no'
//                             ? (lang === 'en' ? 'No' : 'नाही')
//                             : (lang === 'en' ? 'Not answered' : 'उत्तर नाही')}
//                         </Text>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </ScrollView>

//             {/* Modal Footer */}
//             <View style={s.modalFooter}>
//               <TouchableOpacity
//                 style={s.ghostBtn}
//                 onPress={() => setShowPreview(false)}
//                 disabled={loading}>
//                 <Text style={s.ghostBtnText}>
//                   {lang === 'en' ? 'Continue Editing' : 'संपादन सुरू ठेवा'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[s.submitBtn, loading && s.btnDisabled]}
//                 onPress={handleSubmit}
//                 disabled={loading}>
//                 {loading
//                   ? <ActivityIndicator color="#fff" />
//                   : <Text style={s.submitBtnText}>
//                       {lang === 'en' ? 'Confirm & Submit ✓' : 'खात्री करा आणि सबमिट करा ✓'}
//                     </Text>}
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const s = StyleSheet.create({
//   safe:   {flex: 1, backgroundColor: CREAM},
//   scroll: {padding: 16, paddingBottom: 8},

//   topbar:          {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   backBtn:         {paddingVertical: 4, paddingRight: 8},
//   backText:        {fontSize: 13, color: BLUE, fontWeight: '700'},
//   logoutBtn:  {width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
// logoutIcon: {fontSize: 18, color: PINK, fontWeight: '800'},
//   topbarTitle:     {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   langToggle:      {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 10, padding: 3, gap: 3},
//   langBtn:         {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7},
//   langBtnActive:   {backgroundColor: PINK},
//   langBtnText:     {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},
//   langBtnTextActive:{color: '#fff'},

//   card:        {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 20, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

//   brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
//   brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
//   brandTitle:  {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
//   versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
//   versionText: {fontSize: 11, fontWeight: '700', color: PINK},

//   progressCard:  {backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#E0B978'},
//   progressMeta:  {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   progressLabel: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', textTransform: 'uppercase', letterSpacing: 0.5},
//   progressPct:   {fontSize: 12, fontWeight: '800', color: PINK},
//   progressTrack: {height: 6, backgroundColor: 'rgba(205,54,107,0.12)', borderRadius: 99, overflow: 'hidden'},
//   progressFill:  {height: 6, backgroundColor: PINK, borderRadius: 99},

//   partHead:      {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16},
//   partIcon:      {width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2},
//   partTitle:     {flex: 1, fontSize: 13, fontWeight: '800', color: BLUE_DEEP, lineHeight: 19},
//   partCount:     {backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, flexShrink: 0},
//   partCountText: {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},

//   qCard:         {borderWidth: 1, borderColor: 'rgba(44,61,131,0.10)', borderRadius: 14, padding: 16, marginBottom: 10, backgroundColor: 'rgba(44,61,131,0.015)'},
//   qCardAnswered: {borderColor: 'rgba(44,61,131,0.15)', backgroundColor: 'rgba(44,61,131,0.025)'},
//   qCardLocked:   {backgroundColor: 'rgba(44,61,131,0.03)', borderColor: 'rgba(44,61,131,0.06)'},
//   qTextRow:      {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'},
//   qText:         {flex: 1, fontSize: 13, lineHeight: 20, color: BLUE_DEEP, marginBottom: 12},
//   qTextLocked:   {color: 'rgba(44,61,131,0.45)'},
//   qNo:           {color: PINK, fontWeight: '800'},
//   qNoLocked:     {color: GRAY},
//   qOptions:      {flexDirection: 'row', gap: 10},
//   optBtn:        {flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.12)', backgroundColor: '#fff', alignItems: 'center'},
//   optBtnYes:     {backgroundColor: GREEN, borderColor: 'transparent', shadowColor: GREEN, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optBtnNo:      {backgroundColor: RED, borderColor: 'transparent', shadowColor: RED, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3},
//   optText:       {fontSize: 13, fontWeight: '700', color: BLUE_DEEP},
//   optTextYes:    {color: '#fff'},
//   optTextNo:     {color: '#fff'},

//   lockedAnsRow:    {flexDirection: 'row'},
//   lockedAnsBadge:  {borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: 'rgba(156,163,175,0.15)'},
//   lockedAnsYes:    {backgroundColor: 'rgba(34,197,94,0.10)'},
//   lockedAnsNo:     {backgroundColor: 'rgba(239,68,68,0.10)'},
//   lockedAnsText:   {fontSize: 12.5, fontWeight: '700', color: 'rgba(44,61,131,0.5)'},

//   officerCommentBox: {flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: '#fef3c7', borderRadius: 10, padding: 10, marginTop: 10},
//   officerCommentText: {flex: 1, fontSize: 11.5, color: '#92400e', lineHeight: 16, fontWeight: '600'},

//   btnRow:        {flexDirection: 'row', gap: 10, marginTop: 8},
//   ghostBtn:      {paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
//   ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
//   submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4},
//   btnDisabled:   {opacity: 0.5},
//   submitBtnText: {color: '#fff', fontSize: 14, fontWeight: '700'},

//   infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
//   badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
//   logoBadge:      {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
//   infoTitle:      {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
//   infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
//   portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
//   portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
//   infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 16},

//   overallProgress: {backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   overallLabel:    {color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8},
//   overallTrack:    {height: 8, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 99, overflow: 'hidden', marginBottom: 8},
//   overallFill:     {height: 8, backgroundColor: PINK, borderRadius: 99},
//   overallMeta:     {flexDirection: 'row', justifyContent: 'space-between'},
//   overallNum:      {color: '#fff', fontSize: 13, fontWeight: '800'},
//   overallTotal:    {color: 'rgba(255,255,255,0.45)', fontSize: 12},

//   statsRow:  {flexDirection: 'row', justifyContent: 'space-around'},
//   statItem:  {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
//   statNum:   {color: '#fff', fontSize: 18, fontWeight: '800'},
//   statLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

//   footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
//   footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},

//   // ── Preview Modal styles ──
//   modalOverlay:   {flex: 1, backgroundColor: 'rgba(29,42,96,0.55)', justifyContent: 'flex-end'},
//   modalCard:      {backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: '88%', paddingTop: 18, paddingHorizontal: 18, paddingBottom: 14},
//   modalHeader:    {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
//   modalTitle:     {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
//   modalSub:       {fontSize: 12, color: 'rgba(44,61,131,0.5)', marginTop: 3},
//   modalCloseBtn:  {width: 30, height: 30, borderRadius: 999, backgroundColor: 'rgba(44,61,131,0.06)', justifyContent: 'center', alignItems: 'center'},
//   modalBody:      {maxHeight: '75%'},

//   previewPartBlock: {marginBottom: 18},
//   previewPartHead:  {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
//   previewPartTitle: {flex: 1, fontSize: 12.5, fontWeight: '800', color: BLUE_DEEP, lineHeight: 17, paddingRight: 8, marginBottom: 8},
//   editBtn:          {flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(205,54,107,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5},
//   editBtnText:      {fontSize: 11, fontWeight: '700', color: PINK},

//   previewQRow:      {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
//   previewQText:     {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18},
//   previewAnsBadge:  {borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(44,61,131,0.08)', flexShrink: 0},
//   previewAnsYes:    {backgroundColor: GREEN},
//   previewAnsNo:     {backgroundColor: RED},
//   previewAnsText:   {fontSize: 11, fontWeight: '700', color: '#fff'},

//   modalFooter:    {flexDirection: 'row', gap: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},

//   // ── Read-only full screen banner ──
//   readOnlyBanner: {flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 14, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: BLUE},
//   readOnlyBannerText: {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18, fontWeight: '600'},

//   // ── Edit / resubmit banner (rejected / notcompiled) ──
//   editBanner: {flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: '#fef3c7', borderRadius: 14, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: AMBER},
//   editBannerText: {flex: 1, fontSize: 12.5, color: '#92400e', lineHeight: 18, fontWeight: '600'},
// });





import React, {useState, useMemo, useRef, useEffect} from 'react';
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
  Modal,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const API_BASE = 'https://mahaposhact.saavi.co.in/api/org';

const PINK      = '#CD366B';
const PINK_DARK = '#b82a5c';
const BLUE      = '#2C3D83';
const BLUE_DEEP = '#1d2a60';
const CREAM     = '#FBF3EE';
const GREEN     = '#22c55e';
const RED       = '#ef4444';
const AMBER     = '#d97706';

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
const TOTAL_QUESTIONS = POSH_QUESTIONS.parts.reduce((a, p) => a + p.questions.length, 0);
const ALL_QUESTIONS = POSH_QUESTIONS.parts.flatMap(p => p.questions);

export default function PoshSurveyScreen({navigation}: any) {
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers]     = useState<Record<number, 'yes' | 'no'>>({});
  const [loading, setLoading]     = useState(false);
  const [lang, setLang]           = useState<'en' | 'mr'>('en');

  // ── Preview modal shown after last part is completed, before actual submit (first-time flow only) ──
  const [showPreview, setShowPreview] = useState(false);

  // ── Status-check state: decides which screen to show ──
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [submitted, setSubmitted]           = useState(false);
  const [canEdit, setCanEdit]               = useState(false);
  const [reviewStatus, setReviewStatus]     = useState<string | null>(null);

  // ── Which questions were flagged non-compliant by the officer, + their comment ──
  const [editableIds, setEditableIds]           = useState<Set<number>>(new Set());
  const [officerComments, setOfficerComments]   = useState<Record<number, string>>({});

  const scrollRef = useRef<ScrollView>(null);
  const currentPart = POSH_QUESTIONS.parts[partIndex];
  const progressPct = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

  useEffect(() => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
  }, [partIndex]);

  // ── On screen open: check whether this org already submitted, and whether editing is allowed ──
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const orgToken = (await AsyncStorage.getItem('orgToken')) || '';

        const res = await fetch(`${API_BASE}/survey/status`, {
          headers: {
            'Content-Type': 'application/json',
            ...(orgToken ? {Authorization: `Bearer ${orgToken}`} : {}),
          },
        });
        const data = await res.json();

        if (data.success && data.submitted) {
          setSubmitted(true);
          setCanEdit(!!data.canEdit);
          setReviewStatus(data.status || null);

          // Prefill previous answers — needed so the final submit payload has all 26 answers
          if (data.answers) {
            const prefilled: Record<number, 'yes' | 'no'> = {};
            Object.entries(data.answers).forEach(([qid, val]) => {
              prefilled[Number(qid)] = val as 'yes' | 'no';
            });
            setAnswers(prefilled);
          }

          // Which specific questions the officer flagged — ONLY these get shown for editing
          if (data.editableQuestions) {
            const ids = new Set<number>();
            const comments: Record<number, string> = {};
            Object.entries(data.editableQuestions).forEach(([qid, val]: [string, any]) => {
              const n = Number(qid);
              ids.add(n);
              comments[n] = val?.comment || '';
            });
            setEditableIds(ids);
            setOfficerComments(comments);
          }
        } else {
          setSubmitted(false);
        }
      } catch (err) {
        // Network issue — fail safe by letting them use the normal form
        setSubmitted(false);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkStatus();
  }, []);

  const allAnsweredInPart = useMemo(
    () => currentPart.questions.every(q => answers[q.no]),
    [currentPart, answers],
  );

  const setAnswer = (qNo: number, val: 'yes' | 'no') =>
    setAnswers(prev => ({...prev, [qNo]: val}));

  const answeredCount = currentPart.questions.filter(q => answers[q.no]).length;

  const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', style: 'destructive', onPress: async () => {
        await AsyncStorage.removeItem('orgToken');
        await AsyncStorage.removeItem('companyUser');
        navigation.replace('CompanyLogin');
      }},
    ]
  );
};

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
      setShowPreview(true);
    }
  };

  const handleEditPart = (pIdx: number) => {
    setShowPreview(false);
    setPartIndex(pIdx);
  };

  // ── POST /api/org/survey/submit — sends full 26 answers (unchanged ones + edited ones) ──
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

      setShowPreview(false);
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

  // ─────────────────────────────────────────────────────────
  // Loading state while status-check API call is in flight
  // ─────────────────────────────────────────────────────────
  if (checkingStatus) {
    return (
      <SafeAreaView style={[s.safe, {justifyContent: 'center', alignItems: 'center'}]}>
        <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />
        <ActivityIndicator size="large" color={PINK} />
        <Text style={{marginTop: 12, color: BLUE_DEEP, fontWeight: '600'}}>
          {lang === 'en' ? 'Checking survey status…' : 'सर्वेक्षण स्थिती तपासत आहे…'}
        </Text>
      </SafeAreaView>
    );
  }

  // ─────────────────────────────────────────────────────────
  // READ-ONLY VIEW: submitted, NOT allowed to edit
  // (report doesn't exist yet i.e. under review, or it's compiled/approved)
  // ─────────────────────────────────────────────────────────
  if (submitted && !canEdit) {
    return (
      <SafeAreaView style={s.safe}>
        <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

        <View style={s.topbar}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backText}>← Home</Text>
          </TouchableOpacity>
          <Text style={s.topbarTitle}>POSH Survey</Text>
          <View style={s.langToggle}>
            <TouchableOpacity
              style={[s.langBtn, lang === 'en' && s.langBtnActive]}
              onPress={() => setLang('en')}>
              <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
              onPress={() => setLang('mr')}>
              <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color={PINK} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.readOnlyBanner}>
            <MaterialIcons name="lock-outline" size={20} color={BLUE_DEEP} />
            <Text style={s.readOnlyBannerText}>
              {reviewStatus === 'compiled'
                ? (lang === 'en'
                    ? 'Your survey has been approved. This is a view-only copy.'
                    : 'तुमचे सर्वेक्षण मंजूर झाले आहे. ही फक्त पाहण्यासाठीची प्रत आहे.')
                : (lang === 'en'
                    ? 'Your survey has already been submitted and is awaiting Inspection Officer review. It cannot be edited right now.'
                    : 'तुमचे सर्वेक्षण आधीच सबमिट झाले आहे आणि निरीक्षण अधिकाऱ्याच्या पुनरावलोकनाच्या प्रतीक्षेत आहे. सध्या ते संपादित करता येणार नाही.')}
            </Text>
          </View>

          <View style={s.card}>
            {POSH_QUESTIONS.parts.map((part, pIdx) => (
              <View key={pIdx} style={s.previewPartBlock}>
                <Text style={s.previewPartTitle}>{part.title[lang]}</Text>
                {part.questions.map(q => (
                  <View key={q.no} style={s.previewQRow}>
                    <Text style={s.previewQText}>
                      <Text style={s.qNo}>{q.no}. </Text>
                      {q[lang]}
                    </Text>
                    <View
                      style={[
                        s.previewAnsBadge,
                        answers[q.no] === 'yes' && s.previewAnsYes,
                        answers[q.no] === 'no' && s.previewAnsNo,
                      ]}>
                      <Text style={s.previewAnsText}>
                        {answers[q.no] === 'yes'
                          ? (lang === 'en' ? 'Yes' : 'होय')
                          : answers[q.no] === 'no'
                          ? (lang === 'en' ? 'No' : 'नाही')
                          : '—'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={s.footer}>
          <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─────────────────────────────────────────────────────────
  // RESUBMIT VIEW: submitted + rejected/notcompiled → editing allowed
  // Shows ONLY the officer-flagged non-compliant questions with their
  // comment. No pagination, no locked clutter — clean & focused.
  // ─────────────────────────────────────────────────────────
  if (submitted && canEdit) {
    const flaggedQuestions = ALL_QUESTIONS.filter(q => editableIds.has(q.no));
    const allFlaggedAnswered = flaggedQuestions.every(q => answers[q.no]);

    return (
      <SafeAreaView style={s.safe}>
        <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

        <View style={s.topbar}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backText}>← Home</Text>
          </TouchableOpacity>
          <Text style={s.topbarTitle}>POSH Survey</Text>
          <View style={s.langToggle}>
            <TouchableOpacity
              style={[s.langBtn, lang === 'en' && s.langBtnActive]}
              onPress={() => setLang('en')}>
              <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
              onPress={() => setLang('mr')}>
              <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color={PINK} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

          <View style={s.editBanner}>
            <MaterialIcons name="info-outline" size={18} color="#92400e" />
            <Text style={s.editBannerText}>
              {reviewStatus === 'rejected'
                ? (lang === 'en'
                    ? `Your previous submission was rejected. Please fix ${flaggedQuestions.length} question(s) below and resubmit.`
                    : `तुमचे मागील सबमिशन नाकारले गेले आहे. कृपया खालील ${flaggedQuestions.length} प्रश्न दुरुस्त करून पुन्हा सबमिट करा.`)
                : (lang === 'en'
                    ? `${flaggedQuestions.length} question(s) were marked non-compliant. Please fix them below and resubmit.`
                    : `${flaggedQuestions.length} प्रश्न असंमत ठरले आहेत. कृपया ते खाली दुरुस्त करून पुन्हा सबमिट करा.`)}
            </Text>
          </View>

          <View style={s.card}>
            {flaggedQuestions.length === 0 ? (
              <Text style={{color: 'rgba(44,61,131,0.5)', fontSize: 13}}>
                {lang === 'en' ? 'No flagged questions found.' : 'कोणतेही चिन्हांकित प्रश्न सापडले नाहीत.'}
              </Text>
            ) : (
              flaggedQuestions.map(q => (
                <View key={q.no} style={[s.qCard, answers[q.no] && s.qCardAnswered]}>
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

                  {officerComments[q.no] ? (
                    <View style={s.officerCommentBox}>
                      <MaterialIcons name="chat-bubble-outline" size={13} color="#92400e" />
                      <Text style={s.officerCommentText}>
                        {lang === 'en' ? 'Officer remark: ' : 'अधिकाऱ्याची टीप: '}
                        {officerComments[q.no]}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))
            )}

            <TouchableOpacity
              style={[s.submitBtn, (loading || !allFlaggedAnswered) && s.btnDisabled]}
              onPress={handleSubmit}
              disabled={loading || !allFlaggedAnswered}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={s.submitBtnText}>
                    {lang === 'en' ? 'Resubmit Survey ✓' : 'सर्वेक्षण पुन्हा सबमिट करा ✓'}
                  </Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={s.footer}>
          <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─────────────────────────────────────────────────────────
  // NORMAL FIRST-TIME FLOW — never submitted before
  // ─────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar backgroundColor={BLUE_DEEP} barStyle="light-content" />

      <View style={s.topbar}>
        <TouchableOpacity
          style={s.backBtn}
          onPress={() => partIndex > 0 ? setPartIndex(partIndex - 1) : navigation.goBack()}>
          <Text style={s.backText}>← {partIndex > 0 ? 'Back' : 'Home'}</Text>
        </TouchableOpacity>
        <Text style={s.topbarTitle}>POSH Survey</Text>
        <View style={s.langToggle}>
          <TouchableOpacity
            style={[s.langBtn, lang === 'en' && s.langBtnActive]}
            onPress={() => setLang('en')}>
            <Text style={[s.langBtnText, lang === 'en' && s.langBtnTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.langBtn, lang === 'mr' && s.langBtnActive]}
            onPress={() => setLang('mr')}>
            <Text style={[s.langBtnText, lang === 'mr' && s.langBtnTextActive]}>MR</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
  <MaterialIcons name="logout" size={20} color={PINK} />
</TouchableOpacity>
      </View>

        <ScrollView
  ref={scrollRef}
  contentContainerStyle={s.scroll}
  keyboardShouldPersistTaps="handled">

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

        <View style={s.card}>

          <View style={s.brandRow}>
            <View style={s.brand}>
              <View style={s.brandIcon}>
                <Text style={{fontSize: 22}}>📋</Text>
              </View>
              <View>
                <Text style={s.brandTitle}>POSH Survey Form</Text>
                <Text style={s.brandSub}>Inspection Portal</Text>
              </View>
            </View>
            <View style={s.versionPill}>
              <Text style={s.versionText}>v2.0</Text>
            </View>
          </View>

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
                      ? (lang === 'en' ? 'Review & Submit ✓' : 'तपासा आणि सबमिट करा ✓')
                      : (lang === 'en' ? 'Next →' : 'पुढे →')}
                  </Text>}
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      <View style={s.footer}>
        <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
      </View>

      {/* ── Preview Modal (first-time submission only) ── */}
      <Modal
        visible={showPreview}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPreview(false)}>
        <View style={s.modalOverlay}>
          <View style={s.modalCard}>

            <View style={s.modalHeader}>
              <View>
                <Text style={s.modalTitle}>
                  {lang === 'en' ? 'Review Your Answers' : 'तुमची उत्तरे तपासा'}
                </Text>
                <Text style={s.modalSub}>
                  {lang === 'en'
                    ? `${Object.keys(answers).length} of ${TOTAL_QUESTIONS} answered`
                    : `${Object.keys(answers).length} पैकी ${TOTAL_QUESTIONS} उत्तर दिले`}
                </Text>
              </View>
              <TouchableOpacity
                style={s.modalCloseBtn}
                onPress={() => setShowPreview(false)}
                disabled={loading}>
                <MaterialIcons name="close" size={20} color={BLUE_DEEP} />
              </TouchableOpacity>
            </View>

            <ScrollView style={s.modalBody} contentContainerStyle={{paddingBottom: 12}}>
              {POSH_QUESTIONS.parts.map((part, pIdx) => (
                <View key={pIdx} style={s.previewPartBlock}>
                  <View style={s.previewPartHead}>
                    <Text style={s.previewPartTitle} numberOfLines={2}>
                      {part.title[lang]}
                    </Text>
                    <TouchableOpacity
                      style={s.editBtn}
                      onPress={() => handleEditPart(pIdx)}
                      disabled={loading}>
                      <MaterialIcons name="edit" size={14} color={PINK} />
                      <Text style={s.editBtnText}>
                        {lang === 'en' ? 'Edit' : 'बदला'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {part.questions.map(q => (
                    <View key={q.no} style={s.previewQRow}>
                      <Text style={s.previewQText}>
                        <Text style={s.qNo}>{q.no}. </Text>
                        {q[lang]}
                      </Text>
                      <View
                        style={[
                          s.previewAnsBadge,
                          answers[q.no] === 'yes' && s.previewAnsYes,
                          answers[q.no] === 'no' && s.previewAnsNo,
                        ]}>
                        <Text style={s.previewAnsText}>
                          {answers[q.no] === 'yes'
                            ? (lang === 'en' ? 'Yes' : 'होय')
                            : answers[q.no] === 'no'
                            ? (lang === 'en' ? 'No' : 'नाही')
                            : (lang === 'en' ? 'Not answered' : 'उत्तर नाही')}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>

            <View style={s.modalFooter}>
              <TouchableOpacity
                style={s.ghostBtn}
                onPress={() => setShowPreview(false)}
                disabled={loading}>
                <Text style={s.ghostBtnText}>
                  {lang === 'en' ? 'Continue Editing' : 'संपादन सुरू ठेवा'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.submitBtn, loading && s.btnDisabled]}
                onPress={handleSubmit}
                disabled={loading}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.submitBtnText}>
                      {lang === 'en' ? 'Confirm & Submit ✓' : 'खात्री करा आणि सबमिट करा ✓'}
                    </Text>}
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   {flex: 1, backgroundColor: CREAM},
  scroll: {padding: 16, paddingBottom: 8},

  topbar:          {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  backBtn:         {paddingVertical: 4, paddingRight: 8},
  backText:        {fontSize: 13, color: BLUE, fontWeight: '700'},
  logoutBtn:  {width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
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

  officerCommentBox: {flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: '#fef3c7', borderRadius: 10, padding: 10, marginTop: 10},
  officerCommentText: {flex: 1, fontSize: 11.5, color: '#92400e', lineHeight: 16, fontWeight: '600'},

  btnRow:        {flexDirection: 'row', gap: 10, marginTop: 8},
  ghostBtn:      {paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(44,61,131,0.15)', justifyContent: 'center', alignItems: 'center'},
  ghostBtnText:  {fontSize: 14, fontWeight: '700', color: BLUE_DEEP},
  submitBtn:     {flex: 1, backgroundColor: PINK, borderRadius: 12, paddingVertical: 14, alignItems: 'center', shadowColor: PINK, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 4, marginTop: 4},
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

  footer:     {backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)', alignItems: 'center'},
  footerText: {fontSize: 12, color: 'rgba(44,61,131,0.45)'},

  modalOverlay:   {flex: 1, backgroundColor: 'rgba(29,42,96,0.55)', justifyContent: 'flex-end'},
  modalCard:      {backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: '88%', paddingTop: 18, paddingHorizontal: 18, paddingBottom: 14},
  modalHeader:    {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  modalTitle:     {fontSize: 16, fontWeight: '800', color: BLUE_DEEP},
  modalSub:       {fontSize: 12, color: 'rgba(44,61,131,0.5)', marginTop: 3},
  modalCloseBtn:  {width: 30, height: 30, borderRadius: 999, backgroundColor: 'rgba(44,61,131,0.06)', justifyContent: 'center', alignItems: 'center'},
  modalBody:      {maxHeight: '75%'},

  previewPartBlock: {marginBottom: 18},
  previewPartHead:  {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
  previewPartTitle: {flex: 1, fontSize: 12.5, fontWeight: '800', color: BLUE_DEEP, lineHeight: 17, paddingRight: 8, marginBottom: 8},
  editBtn:          {flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(205,54,107,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5},
  editBtnText:      {fontSize: 11, fontWeight: '700', color: PINK},

  previewQRow:      {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
  previewQText:     {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18},
  previewAnsBadge:  {borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(44,61,131,0.08)', flexShrink: 0},
  previewAnsYes:    {backgroundColor: GREEN},
  previewAnsNo:     {backgroundColor: RED},
  previewAnsText:   {fontSize: 11, fontWeight: '700', color: '#fff'},

  modalFooter:    {flexDirection: 'row', gap: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(44,61,131,0.08)'},

  readOnlyBanner: {flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: 'rgba(44,61,131,0.06)', borderRadius: 14, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: BLUE},
  readOnlyBannerText: {flex: 1, fontSize: 12.5, color: BLUE_DEEP, lineHeight: 18, fontWeight: '600'},

  editBanner: {flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: '#fef3c7', borderRadius: 14, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: AMBER},
  editBannerText: {flex: 1, fontSize: 12.5, color: '#92400e', lineHeight: 18, fontWeight: '600'},
});