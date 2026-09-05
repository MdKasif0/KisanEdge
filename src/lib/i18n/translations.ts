export const LANGUAGES = {
  en: { name: "English", nativeName: "English" },
  hi: { name: "Hindi", nativeName: "हिन्दी" },
  bn: { name: "Bengali", nativeName: "বাংলা" },
  mr: { name: "Marathi", nativeName: "मराठी" },
  te: { name: "Telugu", nativeName: "తెలుగు" },
  ta: { name: "Tamil", nativeName: "தமிழ்" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ" },
  ml: { name: "Malayalam", nativeName: "മലയാളം" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી" },
  pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export type TranslationKey =
  | "onboarding.welcome.tagline"
  | "onboarding.welcome.desc"
  | "onboarding.welcome.start"
  | "onboarding.welcome.skip"
  | "onboarding.lang.title"
  | "onboarding.lang.subtitle"
  | "onboarding.role.title"
  | "onboarding.role.farmer"
  | "onboarding.role.farmerDesc"
  | "onboarding.role.home"
  | "onboarding.role.homeDesc"
  | "onboarding.loc.title"
  | "onboarding.loc.desc"
  | "onboarding.loc.allow"
  | "onboarding.loc.deny"
  | "onboarding.notif.title"
  | "onboarding.notif.desc"
  | "onboarding.notif.allow"
  | "onboarding.notif.deny"
  | "onboarding.crop.farmerTitle"
  | "onboarding.crop.farmerDesc"
  | "onboarding.crop.homeTitle"
  | "onboarding.crop.homeDesc"
  | "onboarding.crop.continue"
  | "nav.home"
  | "nav.farm"
  | "nav.scan"
  | "nav.weather"
  | "nav.alerts"
  | "nav.assistant"
  | "nav.tools"
  | "nav.profile"
  | "nav.plants"
  | "dashboard.greeting"
  | "dashboard.subtitle"
  | "profile.title"
  | "profile.settings";

export const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    "onboarding.welcome.tagline": "Smart care for every plant.",
    "onboarding.welcome.desc": "Detect plant diseases, understand crop health and get personalized guidance.",
    "onboarding.welcome.start": "Get Started",
    "onboarding.welcome.skip": "Already exploring? Skip",
    "onboarding.lang.title": "Choose your language",
    "onboarding.lang.subtitle": "You can change this anytime from Settings.",
    "onboarding.role.title": "How do you grow plants?",
    "onboarding.role.farmer": "FARMER",
    "onboarding.role.farmerDesc": "Grow crops in fields",
    "onboarding.role.home": "HOME GROWER",
    "onboarding.role.homeDesc": "Grow plants at home, in pots or a garden",
    "onboarding.loc.title": "Enable location",
    "onboarding.loc.desc": "Use your location for local weather, crop conditions and personalized alerts.",
    "onboarding.loc.allow": "Allow Location",
    "onboarding.loc.deny": "Not Now",
    "onboarding.notif.title": "Stay protected",
    "onboarding.notif.desc": "Receive important disease, weather, irrigation and plant-care alerts.",
    "onboarding.notif.allow": "Allow Notifications",
    "onboarding.notif.deny": "Not Now",
    "onboarding.crop.farmerTitle": "Select your crops",
    "onboarding.crop.farmerDesc": "Choose the crops you currently grow.",
    "onboarding.crop.homeTitle": "Select your plants",
    "onboarding.crop.homeDesc": "Choose the plants you want to care for.",
    "onboarding.crop.continue": "Continue",
    "nav.home": "Home",
    "nav.farm": "My Farm",
    "nav.scan": "Scan",
    "nav.weather": "Weather",
    "nav.alerts": "Alerts",
    "nav.assistant": "Assistant",
    "nav.tools": "Tools",
    "nav.profile": "Profile",
    "nav.plants": "Plants",
    "dashboard.greeting": "Good morning",
    "dashboard.subtitle": "Here is your farm overview today.",
    "profile.title": "Profile",
    "profile.settings": "Settings"
  },
  hi: {
    "onboarding.welcome.tagline": "हर पौधे के लिए स्मार्ट देखभाल।",
    "onboarding.welcome.desc": "पौधों की बीमारियों का पता लगाएं, फसल के स्वास्थ्य को समझें और व्यक्तिगत मार्गदर्शन प्राप्त करें।",
    "onboarding.welcome.start": "शुरू करें",
    "onboarding.welcome.skip": "पहले से पता लगा रहे हैं? छोड़ें",
    "onboarding.lang.title": "अपनी भाषा चुनें",
    "onboarding.lang.subtitle": "आप इसे सेटिंग्स से कभी भी बदल सकते हैं।",
    "onboarding.role.title": "आप पौधे कैसे उगाते हैं?",
    "onboarding.role.farmer": "किसान",
    "onboarding.role.farmerDesc": "खेतों में फसल उगाएं",
    "onboarding.role.home": "घरेलू उत्पादक",
    "onboarding.role.homeDesc": "घर पर, गमलों में या बगीचे में पौधे उगाएं",
    "onboarding.loc.title": "स्थान सक्षम करें",
    "onboarding.loc.desc": "स्थानीय मौसम, फसल की स्थिति और व्यक्तिगत अलर्ट के लिए अपने स्थान का उपयोग करें।",
    "onboarding.loc.allow": "स्थान की अनुमति दें",
    "onboarding.loc.deny": "अभी नहीं",
    "onboarding.notif.title": "सुरक्षित रहें",
    "onboarding.notif.desc": "महत्वपूर्ण बीमारी, मौसम, सिंचाई और पौधों की देखभाल के अलर्ट प्राप्त करें।",
    "onboarding.notif.allow": "सूचनाएं अनुमति दें",
    "onboarding.notif.deny": "अभी नहीं",
    "onboarding.crop.farmerTitle": "अपनी फसलें चुनें",
    "onboarding.crop.farmerDesc": "वे फसलें चुनें जो आप वर्तमान में उगाते हैं।",
    "onboarding.crop.homeTitle": "अपने पौधे चुनें",
    "onboarding.crop.homeDesc": "वे पौधे चुनें जिनकी आप देखभाल करना चाहते हैं।",
    "onboarding.crop.continue": "जारी रखें",
    "nav.home": "होम",
    "nav.farm": "मेरा खेत",
    "nav.scan": "स्कैन",
    "nav.weather": "मौसम",
    "nav.alerts": "अलर्ट",
    "nav.assistant": "सहायक",
    "nav.tools": "उपकरण",
    "nav.profile": "प्रोफ़ाइल",
    "nav.plants": "पौधे",
    "dashboard.greeting": "सुप्रभात",
    "dashboard.subtitle": "यहाँ आज आपके खेत का अवलोकन है।",
    "profile.title": "प्रोफ़ाइल",
    "profile.settings": "सेटिंग्स"
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, kn: {} as any, ml: {} as any, gu: {} as any, pa: {} as any
};

// Generate mock translations for other languages for prototype purposes
const enKeys = Object.keys(translations.en) as TranslationKey[];
['bn', 'mr', 'te', 'ta', 'kn', 'ml', 'gu', 'pa'].forEach(lang => {
  enKeys.forEach(key => {
    translations[lang as LanguageCode][key] = `[${lang.toUpperCase()}] ${translations.en[key]}`;
  });
});
