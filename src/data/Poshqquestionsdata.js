// ══════════════════════════════════════════════════════
// POSH Survey Form — Question Bank
// 5 Parts (A–E), 31 questions total
// Each question has en/mr text + optional law reference
// ══════════════════════════════════════════════════════

const poshQuestions = {
  parts: [
    {
      id: "A",
      title: { en: "Part A – POSH Policy and Internal Committee (IC) Related Compliance", mr: "भाग अ – POSH धोरण आणि अंतर्गत समिती (IC) संबंधित अनुपालन" },
      questions: [
        {
          no: 1,
          en: "Has the POSH policy been formulated and adopted? (As per Rule 13(a) of POSH Act 2013)",
          mr: "POSH धोरण तयार करून ते स्वीकारले आहे का? (POSH कायदा २०१३ च्या नियम १३(अ) नुसार)",
        },
        {
          no: 2,
          en: "Has the policy been distributed to all employees (including apprentices / contract employees)? (As per Section 19(b))",
          mr: "सर्व कर्मचाऱ्यांना धोरण (शिकाऊ उमेदवार / कंत्राटी कर्मचाऱ्यांसह) वितरित केले आहे का? (कलम १९(ब) नुसार)",
        },
        {
          no: 3,
          en: "Has SHe-Box Portal been made available on the official website of the establishment and on official social media available for publicity?",
          mr: "आस्थापनेच्या संकेतस्थळावर आणि प्रचार प्रसिद्धीसाठी उपलब्ध असलेल्या अधिकृत माध्यमांवर (Social Media) SHe-Box Portal उपलब्ध केले आहे का?",
        },
        {
          no: 4,
          en: "Does the policy include a remote / virtual (work from home) work environment?",
          mr: "धोरणामध्ये रिमोट / व्हर्च्युअल (Work from home) कामाच्या वातावरणाचा समावेश आहे का?",
        },
        {
          no: 5,
          en: "Is there an 'Internal Committee' (IC) constituted in each office/unit?",
          mr: "आस्थापनेच्या प्रत्येक कार्यालय/युनिटमध्ये 'अंतर्गत समिती' (IC) स्थापन केली आहे का?",
        },
        {
          no: 6,
          en: "Does the Internal Committee (IC) have at least 4 members?",
          mr: "अंतर्गत समितीमध्ये (IC) किमान ४ सदस्य आहेत का?",
        },
        {
          no: 7,
          en: "Are at least 50% of the internal committee members women?",
          mr: "अंतर्गत समितीच्या सदस्यांपैकी किमान ५०% महिला आहेत का?",
        },
        {
          no: 8,
          en: "Has a senior female employee been appointed as internal committee chairperson?",
          mr: "अंतर्गत समिती अध्यक्ष म्हणून वरिष्ठ महिला कर्मचारी यांची नियुक्ती केली आहे का?",
        },
        {
          no: 9,
          en: "As per Section 4(2)(c) of the POSH Act 2013, has a member of external NGO or social organization been included in the committee?",
          mr: "POSH Act 2013 च्या Section 4(2)(c) नुसार बाह्य NGO किंवा सामाजिक संस्थेच्या सदस्याचा समितीत समावेश केला आहे का?",
        },
      ],
    },
    {
      id: "B",
      title: { en: "Part B – Support / Assistance to the Aggrieved Woman", mr: "भाग ब – पीडित महिलेला सहकार्य/मदत" },
      questions: [
        {
          no: 10,
          en: "Are there various channels available to report sexual harassment as per Section 9 of POSH Act 2013? (Email, written, online (SHe-Box Portal))",
          mr: "Section 9 नुसार लैंगिक छळवणुकीची तक्रार करण्यासाठी खालील विविध माध्यमे उपलब्ध आहेत का? (ईमेल, लेखी, ऑनलाइन/SHe Box Portal)",
        },
        {
          no: 11,
          en: "Are complaints acknowledged / addressed within 7 days? (As per Rule 7(2))",
          mr: "(नियम ७(२) नुसार) तक्रारींची ७ दिवसांच्या आत पोचपावती/दखल घेतली जाते का?",
        },
        {
          no: 12,
          en: "Is full confidentiality and transparency maintained during the investigation? (As per Section 16)",
          mr: "(कलम १६ नुसार) चौकशी दरम्यान पूर्ण गोपनीयता व पारदर्शकता राखली जाते का?",
        },
        {
          no: 13,
          en: "Is interim relief given if requested by the aggrieved woman? (As per Section 12)",
          mr: "पीडित महिलेने विनंती केल्यास अंतरिम दिलासा (Interim relief) दिला जातो का? (कलम १२ नुसार)",
        },
        {
          no: 14,
          en: "Is it ensured that no retaliatory action is taken against complainants or witnesses?",
          mr: "तक्रारदार किंवा साक्षीदारांविरुद्ध कोणतीही सूडबुद्धीची कारवाई केली जात नाही, याची खात्री केली जाते का?",
        },
        {
          no: 15,
          en: "Is counseling / legal assistance provided if requested or required?",
          mr: "मागणी केल्यास किंवा आवश्यक असल्यास समुपदेशन/कायदेशीर मदत दिली जाते का?",
        },
      ],
    },
    {
      id: "C",
      title: { en: "Part C – Awareness and Training", mr: "भाग क – जागरूकता आणि प्रशिक्षण" },
      questions: [
        {
          no: 16,
          en: "Have IC members been trained on grievance handling? (As per Section 19(c))",
          mr: "IC सदस्यांना तक्रार हाताळणीबाबत प्रशिक्षण देण्यात आले आहे का? (कलम १९(क) नुसार)",
        },
        {
          no: 17,
          en: "Are awareness programs as per POSH Act regularly organized for employees? (As per Section 19(c))",
          mr: "कर्मचाऱ्यांच्या प्रबोधनासाठी नियमितपणे POSH कायद्यानुसार जाणीव जागृतीचे कार्यक्रम आयोजित केले जातात का? (कलम १९(क) नुसार)",
        },
      ],
    },
    {
      id: "D",
      title: { en: "Part D – Employer's Responsibility", mr: "भाग ड – नियोक्त्याची / मालकाची जबाबदारी" },
      questions: [
        {
          no: 18,
          en: "Is the inquiry completed within 90 days? (As per Section 11(4))",
          mr: "कलम ११(४) नुसार चौकशी ९० दिवसांच्या आत पूर्ण केली जाते का?",
        },
        {
          no: 19,
          en: "Has the owner acted on the internal committee (IC) report within 60 days? (As per Section 13(4))",
          mr: "नियोक्त्याने अंतर्गत समितीच्या अहवालानुसार ६० दिवसांच्या आत कार्यवाही केली आहे का? (कलम १३(४) नुसार)",
        },
        {
          no: 20,
          en: "Are records of complaints / inquiries securely preserved? (As per Section 16)",
          mr: "(कलम १६ नुसार) तक्रारी/चौकशीचे रेकॉर्ड सुरक्षितपणे जतन केले जाते का?",
        },
        {
          no: 21,
          en: "Is a secure work environment (physical and digital) ensured? (As per Section 19(a))",
          mr: "(कलम १९(अ) नुसार) सुरक्षित कामाचे वातावरण (भौतिक आणि डिजिटल) सुनिश्चित केले आहे का?",
        },
        {
          no: 22,
          en: "Does the Internal Committee (IC) submit an annual report to the Owner / District Officer every year? (As per Section 21)",
          mr: "(कलम २१ नुसार) अंतर्गत समिती (IC) मालक / जिल्हा अधिकाऱ्यांकडे वार्षिक अहवाल दरवर्षी सादर करतो का?",
        },
        {
          no: 23,
          en: "Does the owner / head of the establishment include POSH compliance in his annual report / filing? (As per Rule 14)",
          mr: "मालक/ आस्थापना प्रमुख आपल्या वार्षिक अहवालात / फायलिंगमध्ये POSH अनुपालनाचा समावेश करतो का? (नियम १४ नुसार)",
        },
        {
          no: 24,
          en: "Are disciplinary actions taken in cases of proven misconduct?",
          mr: "सिद्ध झालेल्या गैरवर्तनाच्या प्रकरणांमध्ये शिस्तभंगविषयक कारवाई केली जाते का?",
        },
        {
          no: 25,
          en: "Is POSH compliance checked regularly?",
          mr: "POSH अधिनियमाच्या अंमलबजावणीचे आपल्या आस्थापनेची नियमित तपासणी होते का?",
        },
      ],
    },
    {
      id: "E",
      title: { en: "Part E – Sexual Harassment Electronic Box (SHe-Box) On-boarding", mr: "भाग इ – लैंगिक छळ इलेक्ट्रॉनिक बॉक्स (SHe-Box) ऑन-बोर्डिंग" },
      questions: [
        {
          no: 26,
          en: "Has the organization appointed a 'Nodal Officer' for SHe-Box Portal?",
          mr: "संस्थेने SHe-Box पोर्टलसाठी 'नोडल अधिकारी' नियुक्त केला आहे का?",
        },
        {
          no: 27,
          en: "Have details of Nodal Officers of all offices having more than 10 employees been updated on SHe-Box?",
          mr: "१० पेक्षा जास्त कर्मचारी असलेल्या सर्व कार्यालयांच्या नोडल अधिकाऱ्यांचे तपशील SHe-Box वर अपडेट केला आहे का?",
        },
        {
          no: 28,
          en: "Are IC details of Head Office uploaded on SHe-Box portal?",
          mr: "मुख्य कार्यालयाचे (Head Office) IC तपशील SHe-Box पोर्टलवर अपलोड केले आहेत का?",
        },
        {
          no: 29,
          en: "Are IC details of all other offices uploaded on SHe-Box portal?",
          mr: "इतर सर्व कार्यालयांचे IC तपशील SHe-Box पोर्टलवर अपलोड केले आहेत का?",
        },
        {
          no: 30,
          en: "Is the Annual Report uploaded on the SHe-Box portal?",
          mr: "SHe-Box पोर्टलवर वार्षिक अहवाल अपलोड केला आहे का?",
        },
      ],
    },
  ],
};

export default poshQuestions;