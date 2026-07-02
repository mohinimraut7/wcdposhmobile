
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

// ── Maharashtra Districts & Talukas ──
const MH_DISTRICT_TALUKAS: Record<string, string[]> = {
  'Ahmednagar': ['Ahmednagar','Akole','Jamkhed','Karjat','Kopargaon','Nagar','Nevasa','Parner','Pathardi','Rahata','Rahuri','Sangamner','Shevgaon','Shrigonda','Shrirampur'],
  'Akola': ['Akola','Akot','Balapur','Barshitakli','Murtizapur','Patur','Telhara'],
  'Amravati': ['Amravati','Achalpur','Anjangaon Surji','Chandur Bazar','Chandur Railway','Chikhaldara','Daryapur','Dhamangaon Railway','Morshi','Nandgaon Khandeshwar','Teosa','Warud'],
  'Aurangabad': ['Aurangabad','Gangapur','Kannad','Khuldabad','Paithan','Phulambri','Silllod','Soegaon','Vaijapur'],
  'Beed': ['Beed','Ambajogai','Ashti','Dharur','Georai','Kaij','Majalgaon','Parli','Patoda','Shirur Kasar','Wadwani'],
  'Bhandara': ['Bhandara','Lakhandur','Lakhani','Mohadi','Pauni','Sakoli','Tumsar'],
  'Buldhana': ['Buldhana','Chikhli','Deulgaon Raja','Jalgaon Jamod','Khamgaon','Lonar','Malkapur','Mehkar','Motala','Nandura','Sangrampur','Shegaon','Sindkhed Raja'],
  'Chandrapur': ['Chandrapur','Ballarpur','Bhadravati','Brahmapuri','Chimur','Gondpipri','Jiwati','Korpana','Mul','Nagbhid','Pombhurna','Rajura','Saoli','Sindewahi','Warora'],
  'Dhule': ['Dhule','Sakri','Shirpur','Sindkheda'],
  'Gadchiroli': ['Gadchiroli','Aheri','Armori','Bhamragad','Chamorshi','Corpana','Dhanora','Desaiganj','Etapalli','Kurkheda','Mulchera','Sironcha'],
  'Gondia': ['Gondia','Amgaon','Arjuni Morgaon','Deori','Goregaon','Salekasa','Sadak Arjuni','Tirora'],
  'Hingoli': ['Hingoli','Aundha Nagnath','Basmath','Kalamnuri','Sengaon'],
  'Jalgaon': ['Jalgaon','Amalner','Bhadgaon','Bhusawal','Bodwad','Chalisgaon','Chopda','Dharangaon','Erandol','Jamner','Muktainagar','Pachora','Parola','Raver','Yawal'],
  'Jalna': ['Jalna','Ambad','Badnapur','Bhokardan','Ghansawangi','Jafrabad','Mantha','Partur'],
  'Kolhapur': ['Kolhapur','Ajra','Bavda','Bhudargad','Chandgad','Gadhinglaj','Hatkanangle','Kagal','Karvir','Panhala','Radhanagari','Shahuwadi','Shirol'],
  'Latur': ['Latur','Ahmadpur','Ausa','Chakur','Deoni','Jalkot','Nilanga','Renapur','Shirur Anantpal','Udgir'],
  'Mumbai City': ['Mumbai City'],
  'Mumbai Suburban': ['Andheri','Borivali','Kurla'],
  'Nagpur': ['Nagpur','Bhiwapur','Hingna','Kalameshwar','Kamptee','Katol','Kuhi','Mauda','Mohadi','Narkhed','Parseoni','Ramtek','Savner','Umred'],
  'Nanded': ['Nanded','Ardhapur','Bhokar','Biloli','Deglur','Dharmabad','Hadgaon','Himayatnagar','Kandhar','Kinwat','Loha','Mahur','Mudkhed','Mukhed','Naigaon','Umri'],
  'Nandurbar': ['Nandurbar','Akkalkuwa','Akrani','Nawapur','Shahada','Taloda'],
  'Nashik': ['Nashik','Baglan','Chandwad','Deola','Dindori','Igatpuri','Kalwan','Malegaon','Nandgaon','Niphad','Peint','Sinnar','Surgana','Trimbakeshwar','Yeola'],
  'Osmanabad': ['Osmanabad','Bhoom','Kalamb','Lohara','Paranda','Tuljapur','Umarga','Washi'],
  'Palghar': ['Palghar','Dahanu','Jawhar','Mokhada','Talasari','Vasai','Vikramgad','Wada'],
  'Parbhani': ['Parbhani','Gangakhed','Jintur','Manwath','Palam','Pathri','Purna','Sailu','Selu','Sonpeth'],
  'Pune': ['Pune City','Ambegaon','Baramati','Bhor','Daund','Haveli','Indapur','Junnar','Khed','Maval','Mulshi','Purandar','Shirur','Velhe'],
  'Raigad': ['Alibag','Karjat','Khalapur','Mahad','Mangaon','Mhasla','Murud','Panvel','Pen','Poladpur','Roha','Shrivardhan','Sudhagad','Tala','Uran'],
  'Ratnagiri': ['Ratnagiri','Chiplun','Dapoli','Guhagar','Khed','Lanja','Mandangad','Rajapur','Sangameshwar'],
  'Sangli': ['Sangli','Atpadi','Jat','Kadegaon','Kavathemahankal','Khanapur','Miraj','Palus','Shirala','Tasgaon','Valva'],
  'Satara': ['Satara','Jaoli','Karad','Khandala','Khatav','Koregaon','Mahabaleshwar','Man','Patan','Phaltan','Wai'],
  'Sindhudurg': ['Sindhudurg','Devgad','Dodamarg','Kankavli','Kudal','Malvan','Sawantwadi','Vaibhavwadi','Vengurla'],
  'Solapur': ['Solapur North','Solapur South','Akkalkot','Barshi','Karmala','Madha','Malshiras','Mangalvedhe','Mohol','Pandharpur','Sangola','South Solapur'],
  'Thane': ['Thane','Ambarnath','Bhiwandi','Kalyan','Murbad','Shahapur','Ulhasnagar'],
  'Wardha': ['Wardha','Arvi','Ashti','Deoli','Hinganghat','Karanja','Samudrapur','Seloo'],
  'Washim': ['Washim','Malegaon','Mangrulpir','Manora','Risod','Karanja'],
  'Yavatmal': ['Yavatmal','Arni','Babulgaon','Darwha','Digras','Ghatanji','Kalamb','Kelapur','Mahagaon','Maregaon','Ner','Pusad','Ralegaon','Umarkhed','Wani','Zari Jamani'],
};

const MH_DISTRICTS = Object.keys(MH_DISTRICT_TALUKAS).sort();

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
        <Text style={[fs.inputText, !value && {color: 'rgba(44,61,131,0.35)'}]} numberOfLines={1}>
          {value || `Select ${label.replace(' *','')}`}
        </Text>
        <Text style={fs.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <ScrollView style={fs.menu} nestedScrollEnabled>
          {options.map(o => (
            <TouchableOpacity
              key={o}
              style={[fs.menuItem, value === o && fs.menuItemActive]}
              onPress={() => {onSelect(o); setOpen(false);}}>
              <Text style={[fs.menuText, value === o && fs.menuTextActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
          style={[fs.inputText, {flex: 1}, multiline && {height: 72, textAlignVertical: 'top', paddingTop: 12}]}
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

  // District change → taluka reset
  const handleDistrictChange = (district: string) => {
    setForm(prev => ({...prev, district, taluka: ''}));
  };

  // Talukas for selected district
  const talukaOptions = form.district ? (MH_DISTRICT_TALUKAS[form.district] || []) : [];

  const handleNext = () => {
    if (page === 0) {
      if (!form.orgtype)     { Alert.alert('Error', 'Org Type select kara'); return; }
      if (!form.companyName) { Alert.alert('Error', 'Company Name bhara'); return; }
      if (!form.district)    { Alert.alert('Error', 'District select kara'); return; }
      setPage(1); return;
    }
    if (page === 1) {
      if (!form.username)     { Alert.alert('Error', 'Username bhara'); return; }
      if (!form.contactPhone) { Alert.alert('Error', 'Mobile Number bhara'); return; }
      if (!form.password)     { Alert.alert('Error', 'Password bhara'); return; }
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

      if (data.token) {
        await AsyncStorage.setItem('orgToken', data.token);
      }
      if (data.org || data.organization) {
        await AsyncStorage.setItem('companyUser', JSON.stringify(data.org || data.organization));
      }

      Alert.alert('Success', 'Registration successful! Please log in to continue to the POSH Survey..', [
        {text: 'OK', onPress: () => navigation.navigate('CompanyLogin')},
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

      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" nestedScrollEnabled>

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

              {/* District Dropdown — Maharashtra only */}
              <SelectField
                label="District *"
                icon="📍"
                value={form.district}
                options={MH_DISTRICTS}
                onSelect={handleDistrictChange}
              />

              {/* Taluka — depends on district */}
              {form.district ? (
                <SelectField
                  label="Taluka"
                  icon="📍"
                  value={form.taluka}
                  options={talukaOptions}
                  onSelect={update('taluka')}
                />
              ) : (
                <View style={{marginBottom: 14}}>
                  <Text style={fs.fieldLabel}>TALUKA</Text>
                  <View style={[fs.inputWrap, {opacity: 0.5}]}>
                    <View style={fs.inputIcon}><Text>📍</Text></View>
                    <Text style={[fs.inputText, {color: 'rgba(44,61,131,0.35)'}]}>
                      Aadhi District select kara
                    </Text>
                  </View>
                </View>
              )}

              <View style={s.twoCol}>
                <View style={{flex: 1}}>
                  <InputField label="City" icon="🌐" placeholder="e.g. Pune" value={form.city} onChangeText={update('city')} />
                </View>
                <View style={{flex: 1}}>
                  <InputField label="Pincode" icon="📮" placeholder="6 digit" value={form.pincode} onChangeText={t => update('pincode')(t.replace(/\D/g, '').slice(0, 6))} keyboardType="numeric" maxLength={6} />
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

      

        {/* Steps Card */}
        {/* <View style={s.stepsCard}>
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
        </View> */}

      </ScrollView>

      <View style={s.footer}>
        <Text style={s.footerText}>© 2025 WCD Maharashtra. All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

// ── Field Styles ──
const fs = StyleSheet.create({
  fieldLabel:    {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8},
  inputWrap:     {flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, overflow: 'visible', backgroundColor: '#fff'},
  inputIcon:     {width: 42, backgroundColor: 'rgba(44,61,131,0.05)', paddingVertical: 13, alignItems: 'center', borderRightWidth: 1, borderRightColor: 'rgba(44,61,131,0.12)', borderTopLeftRadius: 12, borderBottomLeftRadius: 12},
  inputText:     {flex: 1, fontSize: 13, color: '#1d2a60', paddingHorizontal: 10, paddingVertical: 13},
  arrow:         {paddingRight: 12, fontSize: 10, color: 'rgba(44,61,131,0.5)'},
  menu:          {borderWidth: 1, borderColor: 'rgba(44,61,131,0.12)', borderRadius: 12, marginTop: 4, backgroundColor: '#fff', maxHeight: 220, zIndex: 999},
  menuItem:      {paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.06)'},
  menuItemActive:{backgroundColor: 'rgba(205,54,107,0.06)'},
  menuText:      {fontSize: 13, color: '#1d2a60'},
  menuTextActive:{color: '#CD366B', fontWeight: '700'},
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

  card: {backgroundColor: '#fff', borderRadius: 20, borderTopWidth: 4, borderTopColor: PINK, padding: 22, marginBottom: 16, shadowColor: BLUE, shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4},

  brandRow:    {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(44,61,131,0.08)'},
  brand:       {flexDirection: 'row', alignItems: 'center', gap: 12},
  brandIcon:   {width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(205,54,107,0.10)', justifyContent: 'center', alignItems: 'center'},
  brandTitle:  {fontSize: 17, fontWeight: '800', color: BLUE_DEEP},
  brandSub:    {fontSize: 12, fontWeight: '600', color: PINK, marginTop: 2},
  versionPill: {backgroundColor: 'rgba(205,54,107,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999},
  versionText: {fontSize: 11, fontWeight: '700', color: PINK},

  heading:    {fontSize: 22, fontWeight: '800', color: BLUE_DEEP, letterSpacing: -0.3, marginBottom: 4},
  subheading: {fontSize: 13, color: 'rgba(44,61,131,0.55)', marginBottom: 18},

  stepper:        {flexDirection: 'row', backgroundColor: 'rgba(44,61,131,0.04)', borderRadius: 12, padding: 4, gap: 4, marginBottom: 20},
  step:           {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 9, borderRadius: 9},
  stepActive:     {backgroundColor: PINK, shadowColor: PINK, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4},
  stepDone:       {backgroundColor: 'rgba(44,61,131,0.08)'},
  stepNum:        {width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center'},
  stepNumActive:  {backgroundColor: 'rgba(255,255,255,0.25)'},
  stepNumDone:    {backgroundColor: BLUE},
  stepNumText:    {fontSize: 10, fontWeight: '800', color: 'rgba(44,61,131,0.45)'},
  stepNumTextActive: {color: '#fff'},
  stepLabel:      {fontSize: 11, fontWeight: '700', color: 'rgba(44,61,131,0.45)'},
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

  infoCard:       {backgroundColor: BLUE, borderRadius: 20, padding: 22, marginBottom: 16, shadowColor: BLUE_DEEP, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6},
  badgeRow:       {flexDirection: 'row', justifyContent: 'center', gap: 14, marginBottom: 16},
  logoBadge:      {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'},
  infoTitle:      {color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4},
  infoSub:        {color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', marginBottom: 14},
  portalPill:     {backgroundColor: PINK, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14},
  portalPillText: {color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.6},
  infoDesc:       {color: 'rgba(255,255,255,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 18},
  statsRow:       {flexDirection: 'row', justifyContent: 'space-around'},
  statItem:       {alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)'},
  statNum:        {color: '#fff', fontSize: 18, fontWeight: '800'},
  statLabel:      {color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2},

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