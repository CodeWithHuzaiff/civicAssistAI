

const schemes = [
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    nameHi: "पीएम-किसान सम्मान निधि",
    description:
      "Direct income support of ₹6,000 per year to small and marginal farmer families across India, paid in three equal installments.",
    descriptionHi:
      "भारत भर में छोटे और सीमांत किसान परिवारों को तीन समान किस्तों में ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता।",
    eligibility: {
      maxIncome: 200000,
      occupations: ["farmer", "agriculture", "farming"],
      states: "all",
    },
    benefits: "₹6,000 per year in 3 installments of ₹2,000 each",
    benefitsHi: "₹6,000 प्रति वर्ष, ₹2,000 की 3 किस्तों में",
    requiredDocuments: [
      "Aadhaar Card",
      "Land ownership documents",
      "Bank account details",
      "State domicile certificate",
    ],
    nextSteps: [
      "Visit your nearest Common Service Centre (CSC)",
      "Register on the PM-KISAN portal with Aadhaar",
      "Submit land ownership documents",
      "Link your bank account for direct benefit transfer",
    ],
    category: "Agriculture",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PMJAY",
    nameHi: "आयुष्मान भारत - पीएमजेएवाई",
    description:
      "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary hospitalization. Covers pre and post hospitalization expenses.",
    descriptionHi:
      "माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवरेज।",
    eligibility: {
      maxIncome: 300000,
      states: "all",
      maxFamilySize: 10,
    },
    benefits: "₹5,00,000 health insurance cover per family per year",
    benefitsHi: "प्रति परिवार प्रति वर्ष ₹5,00,000 स्वास्थ्य बीमा कवर",
    requiredDocuments: [
      "Aadhaar Card",
      "Ration Card",
      "Income certificate",
      "Family details",
    ],
    nextSteps: [
      "Check eligibility on mera.pmjay.gov.in",
      "Visit empanelled hospital with Aadhaar",
      "Get Ayushman Card generated at the hospital",
      "Avail cashless treatment at any empanelled hospital",
    ],
    category: "Healthcare",
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    nameHi: "प्रधानमंत्री आवास योजना (पीएमएवाई)",
    description:
      "Affordable housing scheme providing financial assistance for constructing or purchasing a house. Interest subsidy on home loans for economically weaker sections.",
    descriptionHi:
      "घर बनाने या खरीदने के लिए वित्तीय सहायता प्रदान करने वाली किफायती आवास योजना। आर्थिक रूप से कमजोर वर्गों के लिए गृह ऋण पर ब्याज सब्सिडी।",
    eligibility: {
      maxIncome: 1800000,
      minAge: 21,
      states: "all",
    },
    benefits:
      "Interest subsidy of 6.5% on home loans up to ₹6 lakh for 20 years (EWS/LIG)",
    benefitsHi:
      "20 वर्षों के लिए ₹6 लाख तक के गृह ऋण पर 6.5% ब्याज सब्सिडी (EWS/LIG)",
    requiredDocuments: [
      "Aadhaar Card",
      "Income certificate",
      "Property documents",
      "Bank statements",
      "Proof of not owning a pucca house",
    ],
    nextSteps: [
      "Apply online at pmaymis.gov.in",
      "Visit your bank or housing finance company",
      "Submit all required documents",
      "Wait for verification and approval",
    ],
    category: "Housing",
  },
  {
    id: "mudra-loan",
    name: "Pradhan Mantri MUDRA Yojana",
    nameHi: "प्रधानमंत्री मुद्रा योजना",
    description:
      "Micro-finance loans up to ₹10 lakh for small businesses and entrepreneurs. Three categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh).",
    descriptionHi:
      "छोटे व्यवसायों और उद्यमियों के लिए ₹10 लाख तक के सूक्ष्म-वित्त ऋण। तीन श्रेणियां: शिशु, किशोर और तरुण।",
    eligibility: {
      maxIncome: 500000,
      minAge: 18,
      occupations: [
        "business",
        "self-employed",
        "entrepreneur",
        "shopkeeper",
        "vendor",
        "trader",
      ],
      states: "all",
    },
    benefits:
      "Collateral-free loans: Shishu (up to ₹50,000), Kishore (up to ₹5 lakh), Tarun (up to ₹10 lakh)",
    benefitsHi:
      "बिना गारंटी ऋण: शिशु (₹50,000 तक), किशोर (₹5 लाख तक), तरुण (₹10 लाख तक)",
    requiredDocuments: [
      "Aadhaar Card",
      "PAN Card",
      "Business plan or proposal",
      "Identity & address proof",
      "Passport-size photographs",
    ],
    nextSteps: [
      "Visit any nationalized bank, NBFC, or MFI",
      "Fill the MUDRA loan application form",
      "Submit business plan and required documents",
      "Loan sanctioned within 7-10 working days",
    ],
    category: "Business & Finance",
  },
  {
    id: "scholarship-sc-st",
    name: "Post-Matric Scholarship for SC/ST Students",
    nameHi: "अनुसूचित जाति/जनजाति छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति",
    description:
      "Scholarship for SC/ST students pursuing post-matriculation education including professional and technical courses. Covers tuition fees and maintenance allowance.",
    descriptionHi:
      "पोस्ट-मैट्रिक शिक्षा प्राप्त कर रहे अनुसूचित जाति/जनजाति छात्रों के लिए छात्रवृत्ति। ट्यूशन फीस और रखरखाव भत्ता शामिल।",
    eligibility: {
      maxIncome: 250000,
      minAge: 16,
      maxAge: 35,
      categories: ["SC", "ST"],
      occupations: ["student", "education"],
      states: "all",
    },
    benefits:
      "Full tuition fee reimbursement + maintenance allowance of ₹500-₹1,200/month",
    benefitsHi:
      "पूर्ण ट्यूशन शुल्क प्रतिपूर्ति + ₹500-₹1,200/माह रखरखाव भत्ता",
    requiredDocuments: [
      "Aadhaar Card",
      "Caste certificate (SC/ST)",
      "Income certificate",
      "Previous year marksheets",
      "Current admission proof",
      "Bank account details",
    ],
    nextSteps: [
      "Apply on National Scholarship Portal (scholarships.gov.in)",
      "Get institution verification",
      "Submit caste and income certificates",
      "Track application status online",
    ],
    category: "Education",
  },
  {
    id: "lpg-subsidy",
    name: "Pradhan Mantri Ujjwala Yojana (LPG Subsidy)",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना (एलपीजी सब्सिडी)",
    description:
      "Free LPG connections to women from BPL (Below Poverty Line) families. Provides financial support for the first LPG refill and stove.",
    descriptionHi:
      "बीपीएल (गरीबी रेखा से नीचे) परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन। पहली एलपीजी रिफिल और स्टोव के लिए वित्तीय सहायता।",
    eligibility: {
      maxIncome: 120000,
      genders: ["female"],
      minAge: 18,
      states: "all",
    },
    benefits:
      "Free LPG connection (worth ₹1,600) + subsidy of ₹200 per cylinder refill",
    benefitsHi:
      "मुफ्त एलपीजी कनेक्शन (₹1,600 मूल्य) + प्रति सिलेंडर रिफिल ₹200 सब्सिडी",
    requiredDocuments: [
      "Aadhaar Card",
      "BPL Ration Card",
      "Bank account details",
      "Passport-size photograph",
      "Address proof",
    ],
    nextSteps: [
      "Visit nearest LPG distributor",
      "Fill the Ujjwala Yojana application form",
      "Submit KYC documents",
      "Receive free LPG connection within 7 days",
    ],
    category: "Energy & Welfare",
  },
  {
    id: "msme-credit",
    name: "MSME Credit Guarantee Scheme (CGTMSE)",
    nameHi: "एमएसएमई क्रेडिट गारंटी योजना (सीजीटीएमएसई)",
    description:
      "Collateral-free credit facility for micro, small and medium enterprises. Covers loans up to ₹5 crore with a government-backed guarantee.",
    descriptionHi:
      "सूक्ष्म, लघु और मध्यम उद्यमों के लिए बिना गारंटी ऋण सुविधा। सरकारी गारंटी के साथ ₹5 करोड़ तक के ऋण।",
    eligibility: {
      maxIncome: 5000000,
      minAge: 21,
      occupations: [
        "business",
        "self-employed",
        "entrepreneur",
        "manufacturer",
        "msme",
      ],
      states: "all",
    },
    benefits:
      "Collateral-free loans up to ₹5 crore with government guarantee covering up to 85%",
    benefitsHi:
      "85% तक सरकारी गारंटी के साथ ₹5 करोड़ तक बिना गारंटी ऋण",
    requiredDocuments: [
      "Udyam Registration Certificate",
      "PAN Card",
      "Business financial statements",
      "GST registration (if applicable)",
      "Bank statements (last 6 months)",
    ],
    nextSteps: [
      "Register your MSME on Udyam Registration portal",
      "Approach any scheduled commercial bank",
      "Apply for credit under CGTMSE scheme",
      "Submit financial and business documents",
    ],
    category: "Business & Finance",
  },
  {
    id: "skill-india",
    name: "Pradhan Mantri Kaushal Vikas Yojana (Skill India)",
    nameHi: "प्रधानमंत्री कौशल विकास योजना (स्किल इंडिया)",
    description:
      "Free skill development training and certification for Indian youth. Covers 300+ job roles across 40+ sectors with placement assistance.",
    descriptionHi:
      "भारतीय युवाओं के लिए मुफ्त कौशल विकास प्रशिक्षण और प्रमाणन। प्लेसमेंट सहायता के साथ 40+ क्षेत्रों में 300+ जॉब रोल।",
    eligibility: {
      maxIncome: 350000,
      minAge: 15,
      maxAge: 45,
      states: "all",
    },
    benefits:
      "Free training + certification + ₹8,000 reward on successful completion + placement assistance",
    benefitsHi:
      "मुफ्त प्रशिक्षण + प्रमाणन + सफल समापन पर ₹8,000 पुरस्कार + प्लेसमेंट सहायता",
    requiredDocuments: [
      "Aadhaar Card",
      "Educational certificates",
      "Bank account details",
      "Passport-size photographs",
    ],
    nextSteps: [
      "Visit pmkvyofficial.org to find training centres",
      "Choose a skill course matching your interest",
      "Enrol at nearest PMKVY training centre",
      "Complete training and get certified",
    ],
    category: "Skill Development",
  },
  {
    id: "state-scholarship-obc",
    name: "State-Level OBC Scholarship Scheme",
    nameHi: "राज्य-स्तरीय ओबीसी छात्रवृत्ति योजना",
    description:
      "State government scholarship for OBC students pursuing higher education. Available in most major states with varying benefit amounts.",
    descriptionHi:
      "उच्च शिक्षा प्राप्त कर रहे ओबीसी छात्रों के लिए राज्य सरकार की छात्रवृत्ति। अधिकांश प्रमुख राज्यों में विभिन्न लाभ राशि के साथ उपलब्ध।",
    eligibility: {
      maxIncome: 300000,
      minAge: 16,
      maxAge: 30,
      categories: ["OBC"],
      occupations: ["student", "education"],
      states: [
        "Uttar Pradesh",
        "Bihar",
        "Madhya Pradesh",
        "Rajasthan",
        "Maharashtra",
        "Karnataka",
        "Tamil Nadu",
        "West Bengal",
        "Gujarat",
        "Andhra Pradesh",
        "Telangana",
        "Odisha",
        "Kerala",
        "Jharkhand",
        "Chhattisgarh",
      ],
    },
    benefits:
      "Tuition fee reimbursement + maintenance allowance of ₹300-₹1,000/month (varies by state)",
    benefitsHi:
      "ट्यूशन फीस प्रतिपूर्ति + ₹300-₹1,000/माह रखरखाव भत्ता (राज्य के अनुसार भिन्न)",
    requiredDocuments: [
      "Aadhaar Card",
      "Caste certificate (OBC)",
      "Income certificate",
      "Domicile certificate",
      "Previous year marksheets",
      "Bank account details",
    ],
    nextSteps: [
      "Apply on your state's scholarship portal",
      "Submit OBC and income certificates",
      "Get verification from your educational institution",
      "Track application and disbursement status",
    ],
    category: "Education",
  },
  {
    id: "senior-citizen-pension",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    nameHi: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (IGNOAPS)",
    description:
      "Monthly pension for senior citizens from BPL families. Central government provides ₹200-₹500 per month, with states often adding matching contributions.",
    descriptionHi:
      "बीपीएल परिवारों के वरिष्ठ नागरिकों के लिए मासिक पेंशन। केंद्र सरकार ₹200-₹500 प्रति माह प्रदान करती है, राज्य अक्सर समान योगदान जोड़ते हैं।",
    eligibility: {
      maxIncome: 200000,
      minAge: 60,
      states: "all",
    },
    benefits:
      "₹200/month (60-79 years) or ₹500/month (80+ years) from Central Govt + State contribution",
    benefitsHi:
      "केंद्र सरकार से ₹200/माह (60-79 वर्ष) या ₹500/माह (80+ वर्ष) + राज्य का योगदान",
    requiredDocuments: [
      "Aadhaar Card",
      "Age proof / Birth certificate",
      "BPL Card or Income certificate",
      "Bank account details",
      "Passport-size photograph",
    ],
    nextSteps: [
      "Visit your Block Development Office or Gram Panchayat",
      "Fill the pension application form",
      "Submit age proof and income documents",
      "Pension credited to bank account monthly after approval",
    ],
    category: "Social Welfare",
  },
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Andaman & Nicobar Islands",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Lakshadweep",
];

module.exports = { schemes, INDIAN_STATES };
