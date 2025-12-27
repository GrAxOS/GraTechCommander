// GraTech Commander - Smart Request Translator + i18n System
// مترجم الطلبات الذكي - By Suliman Alshammari
// "Your AI, Your Way, Your Language" 🌍

// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 INTERNATIONAL TRANSLATIONS (i18n)
// ═══════════════════════════════════════════════════════════════════════════════

const i18n = {
  // 🇸🇦 Arabic (Default)
  ar: {
    // Onboarding
    welcome: "مرحباً بك في GraTech Commander",
    subtitle: "الذكاء الاصطناعي بطريقتك، بخصوصيتك، بلغتك",
    letsStart: "يلا نبدأ! 🚀",
    next: "التالي →",
    back: "← رجوع",
    ready: "جاهز!",
    startChat: "🚀 ابدأ المحادثة",
    skipAlways: "تخطي دائماً",
    
    // Features
    feature_models: "5 نماذج AI",
    feature_privacy: "خصوصية 100%",
    feature_arabic: "يفهم العربي",
    feature_safety: "حماية ذكية",
    
    // Model Selection
    chooseModel: "🤖 اختر نموذج الذكاء المفضل",
    modelDesc: "كل نموذج له قوته - اختر اللي يناسبك",
    balanced: "متوازن وسريع",
    deepAnalysis: "تحليل عميق",
    codeLogic: "كود ومنطق",
    fastest: "الأسرع",
    mostPopular: "الأكثر شعبية",
    forComplex: "للمهام المعقدة",
    forDevs: "للمبرمجين",
    veryFast: "سريع جداً",
    
    // API Setup
    apiSetup: "🔑 إعداد المفتاح",
    apiDesc: "استخدم مفتاحك الخاص أو جرب بدون",
    freeDemo: "تجربة مجانية",
    demoDesc: "جرب بدون مفتاح (محدود)",
    byok: "مفتاحك الخاص (BYOK)",
    byokDesc: "تحكم كامل بـ API",
    privacyPromise: "وعدنا: مفاتيحك تبقى على جهازك فقط",
    apiKey: "🔑 API Key",
    endpoint: "🌐 Endpoint (اختياري)",
    
    // Safety
    safetyTitle: "🛡️ نظام الحماية الذكي",
    safetyDesc: "نحميك بموافقتك - كل شيء بيدك",
    confirmDelete: "🗑️ تأكيد قبل أي حذف",
    confirmCloud: "☁️ تأكيد قبل عمليات السحابة",
    explainOps: "📝 شرح كل عملية قبل التنفيذ",
    logConsent: "📜 تسجيل الموافقات",
    philosophy: "أنا هنا لخدمتك، مو أداة عليك.\nالقرار لك دائماً.",
    
    // Tips
    tips: "💡 نصائح سريعة:",
    tip1: "اكتب بالعربي العامية - أفهمك!",
    tip2: "استخدم \"🔒 آمن\" للمواضيع الحساسة",
    tip3: "اضغط \"🙈 أخفي\" لإخفاء المفاتيح",
    tip4: "زر 🚨 يوقف كل شيء فوراً",
    
    // Navigation
    chat: "💬 المحادثة",
    vault: "🔐 الخزنة",
    notes: "📝 ملاحظاتي",
    github: "🐙 GitHub",
    azure: "☁️ Azure",
    accounts: "👤 حساباتي",
    settings: "⚙️ الإعدادات",
    safety: "🛡️ الحماية",
    
    // Chat
    chatTitle: "💬 المحادثة مع الذكاء الاصطناعي",
    welcomeChat: "مرحباً! 👋",
    readyToHelp: "أنا جاهز للمساعدة. اختر النموذج وابدأ المحادثة.",
    explainMe: "💡 اشرح لي...",
    helpWrite: "✍️ ساعدني أكتب...",
    analyzeThis: "🔍 حلل هذا...",
    makeCode: "💻 سو لي كود...",
    placeholder: "اكتب بالعربي براحتك... أنا أفهمك 😊",
    send: "إرسال ▶",
    
    // Modes
    normal: "💬 عادي",
    code: "💻 كود",
    safe: "🔒 آمن",
    research: "🔍 بحث",
    
    // Actions
    voice: "تحدث بصوتك",
    translate: "🔄 حوّل",
    hideSecrets: "🙈 أخفي",
    attach: "إرفاق ملف",
    quickNote: "ملاحظة سريعة",
    export: "تصدير",
    
    // Settings
    saveSettings: "💾 حفظ الإعدادات",
    settingsNote: "يتم حفظ الإعدادات محلياً على جهازك فقط.",
    
    // Safety View
    ourPhilosophy: "🙏 فلسفتنا",
    riskLevels: "📊 مستويات الخطورة",
    riskSafe: "آمن",
    riskLow: "منخفض",
    riskMedium: "متوسط",
    riskHigh: "عالي",
    riskCritical: "حرج",
    emergencyStop: "🚨 إيقاف طوارئ",
    emergencyNote: "يوقف جميع العمليات فوراً",
    
    // Footer
    madeWith: "صنع بـ ❤️ بواسطة",
    author: "سليمان نزال الشمري"
  },

  // 🇺🇸 English
  en: {
    welcome: "Welcome to GraTech Commander",
    subtitle: "AI Your Way, Your Privacy, Your Language",
    letsStart: "Let's Start! 🚀",
    next: "Next →",
    back: "← Back",
    ready: "Ready!",
    startChat: "🚀 Start Chatting",
    skipAlways: "Skip Always",
    
    feature_models: "5 AI Models",
    feature_privacy: "100% Privacy",
    feature_arabic: "Multilingual",
    feature_safety: "Smart Safety",
    
    chooseModel: "🤖 Choose Your Preferred AI Model",
    modelDesc: "Each model has its strengths - pick what suits you",
    balanced: "Balanced & Fast",
    deepAnalysis: "Deep Analysis",
    codeLogic: "Code & Logic",
    fastest: "Fastest",
    mostPopular: "Most Popular",
    forComplex: "For Complex Tasks",
    forDevs: "For Developers",
    veryFast: "Very Fast",
    
    apiSetup: "🔑 API Setup",
    apiDesc: "Use your own key or try without",
    freeDemo: "Free Demo",
    demoDesc: "Try without a key (limited)",
    byok: "Your Own Key (BYOK)",
    byokDesc: "Full API control",
    privacyPromise: "Our Promise: Your keys stay on YOUR device only",
    apiKey: "🔑 API Key",
    endpoint: "🌐 Endpoint (optional)",
    
    safetyTitle: "🛡️ Smart Protection System",
    safetyDesc: "We protect you with your consent - you're in control",
    confirmDelete: "🗑️ Confirm before any deletion",
    confirmCloud: "☁️ Confirm before cloud operations",
    explainOps: "📝 Explain each operation before execution",
    logConsent: "📜 Log all consents",
    philosophy: "I'm here to serve you, not control you.\nThe decision is always yours.",
    
    tips: "💡 Quick Tips:",
    tip1: "Write naturally - I understand you!",
    tip2: "Use \"🔒 Safe\" for sensitive topics",
    tip3: "Press \"🙈 Hide\" to mask secrets",
    tip4: "🚨 button stops everything immediately",
    
    chat: "💬 Chat",
    vault: "🔐 Vault",
    notes: "📝 My Notes",
    github: "🐙 GitHub",
    azure: "☁️ Azure",
    accounts: "👤 Accounts",
    settings: "⚙️ Settings",
    safety: "🛡️ Safety",
    
    chatTitle: "💬 Chat with AI",
    welcomeChat: "Hello! 👋",
    readyToHelp: "I'm ready to help. Choose a model and start chatting.",
    explainMe: "💡 Explain...",
    helpWrite: "✍️ Help me write...",
    analyzeThis: "🔍 Analyze this...",
    makeCode: "💻 Write code...",
    placeholder: "Type naturally... I understand you 😊",
    send: "Send ▶",
    
    normal: "💬 Normal",
    code: "💻 Code",
    safe: "🔒 Safe",
    research: "🔍 Research",
    
    voice: "Voice input",
    translate: "🔄 Transform",
    hideSecrets: "🙈 Hide",
    attach: "Attach file",
    quickNote: "Quick note",
    export: "Export",
    
    saveSettings: "💾 Save Settings",
    settingsNote: "Settings are saved locally on your device only.",
    
    ourPhilosophy: "🙏 Our Philosophy",
    riskLevels: "📊 Risk Levels",
    riskSafe: "Safe",
    riskLow: "Low",
    riskMedium: "Medium",
    riskHigh: "High",
    riskCritical: "Critical",
    emergencyStop: "🚨 Emergency Stop",
    emergencyNote: "Stops all operations immediately",
    
    madeWith: "Made with ❤️ by",
    author: "Suliman Nazal Alshammari"
  },

  // 🇫🇷 French
  fr: {
    welcome: "Bienvenue sur GraTech Commander",
    subtitle: "L'IA à votre façon, votre vie privée, votre langue",
    letsStart: "Commençons! 🚀",
    next: "Suivant →",
    back: "← Retour",
    ready: "Prêt!",
    startChat: "🚀 Commencer à discuter",
    skipAlways: "Toujours ignorer",
    
    feature_models: "5 Modèles IA",
    feature_privacy: "100% Privé",
    feature_arabic: "Multilingue",
    feature_safety: "Sécurité intelligente",
    
    chooseModel: "🤖 Choisissez votre modèle IA préféré",
    modelDesc: "Chaque modèle a ses forces - choisissez ce qui vous convient",
    balanced: "Équilibré et rapide",
    deepAnalysis: "Analyse approfondie",
    codeLogic: "Code et logique",
    fastest: "Le plus rapide",
    mostPopular: "Plus populaire",
    forComplex: "Pour tâches complexes",
    forDevs: "Pour développeurs",
    veryFast: "Très rapide",
    
    chat: "💬 Discussion",
    vault: "🔐 Coffre",
    notes: "📝 Mes notes",
    settings: "⚙️ Paramètres",
    safety: "🛡️ Sécurité",
    
    placeholder: "Tapez naturellement... Je vous comprends 😊",
    send: "Envoyer ▶",
    
    madeWith: "Fait avec ❤️ par",
    author: "Suliman Nazal Alshammari"
  },

  // 🇩🇪 German
  de: {
    welcome: "Willkommen bei GraTech Commander",
    subtitle: "KI auf Ihre Art, Ihre Privatsphäre, Ihre Sprache",
    letsStart: "Los geht's! 🚀",
    next: "Weiter →",
    back: "← Zurück",
    ready: "Bereit!",
    startChat: "🚀 Chat starten",
    skipAlways: "Immer überspringen",
    
    feature_models: "5 KI-Modelle",
    feature_privacy: "100% Privat",
    feature_arabic: "Mehrsprachig",
    feature_safety: "Intelligenter Schutz",
    
    chooseModel: "🤖 Wählen Sie Ihr bevorzugtes KI-Modell",
    modelDesc: "Jedes Modell hat seine Stärken - wählen Sie was passt",
    
    chat: "💬 Chat",
    vault: "🔐 Tresor",
    notes: "📝 Meine Notizen",
    settings: "⚙️ Einstellungen",
    safety: "🛡️ Sicherheit",
    
    placeholder: "Schreiben Sie natürlich... Ich verstehe Sie 😊",
    send: "Senden ▶",
    
    madeWith: "Erstellt mit ❤️ von",
    author: "Suliman Nazal Alshammari"
  },

  // 🇪🇸 Spanish
  es: {
    welcome: "Bienvenido a GraTech Commander",
    subtitle: "IA a tu manera, tu privacidad, tu idioma",
    letsStart: "¡Empecemos! 🚀",
    next: "Siguiente →",
    back: "← Atrás",
    ready: "¡Listo!",
    startChat: "🚀 Empezar a chatear",
    skipAlways: "Saltar siempre",
    
    feature_models: "5 Modelos IA",
    feature_privacy: "100% Privado",
    feature_arabic: "Multilingüe",
    feature_safety: "Seguridad inteligente",
    
    chat: "💬 Chat",
    vault: "🔐 Bóveda",
    notes: "📝 Mis notas",
    settings: "⚙️ Configuración",
    safety: "🛡️ Seguridad",
    
    placeholder: "Escribe naturalmente... Te entiendo 😊",
    send: "Enviar ▶",
    
    madeWith: "Hecho con ❤️ por",
    author: "Suliman Nazal Alshammari"
  },

  // 🇨🇳 Chinese
  zh: {
    welcome: "欢迎使用 GraTech Commander",
    subtitle: "您的AI，您的方式，您的隐私，您的语言",
    letsStart: "开始吧！🚀",
    next: "下一步 →",
    back: "← 返回",
    ready: "准备好了！",
    startChat: "🚀 开始对话",
    skipAlways: "总是跳过",
    
    feature_models: "5个AI模型",
    feature_privacy: "100%隐私",
    feature_arabic: "多语言",
    feature_safety: "智能安全",
    
    chat: "💬 对话",
    vault: "🔐 保险库",
    notes: "📝 我的笔记",
    settings: "⚙️ 设置",
    safety: "🛡️ 安全",
    
    placeholder: "自然输入...我能理解你 😊",
    send: "发送 ▶",
    
    madeWith: "用 ❤️ 制作",
    author: "苏莱曼·纳扎尔·阿尔沙马里"
  },

  // 🇯🇵 Japanese
  ja: {
    welcome: "GraTech Commander へようこそ",
    subtitle: "あなたのAI、あなたの方法、あなたのプライバシー",
    letsStart: "始めましょう！🚀",
    next: "次へ →",
    back: "← 戻る",
    ready: "準備完了！",
    startChat: "🚀 チャットを開始",
    skipAlways: "常にスキップ",
    
    feature_models: "5つのAIモデル",
    feature_privacy: "100%プライバシー",
    feature_arabic: "多言語対応",
    feature_safety: "スマートセキュリティ",
    
    chat: "💬 チャット",
    vault: "🔐 保管庫",
    notes: "📝 メモ",
    settings: "⚙️ 設定",
    safety: "🛡️ セキュリティ",
    
    placeholder: "自然に入力してください...理解できます 😊",
    send: "送信 ▶",
    
    madeWith: "❤️ を込めて作成",
    author: "スライマン・ナザル・アルシャマリ"
  },

  // 🇰🇷 Korean
  ko: {
    welcome: "GraTech Commander에 오신 것을 환영합니다",
    subtitle: "당신의 AI, 당신의 방식, 당신의 프라이버시",
    letsStart: "시작합시다! 🚀",
    next: "다음 →",
    back: "← 뒤로",
    ready: "준비 완료!",
    startChat: "🚀 채팅 시작",
    skipAlways: "항상 건너뛰기",
    
    feature_models: "5개 AI 모델",
    feature_privacy: "100% 프라이버시",
    feature_arabic: "다국어 지원",
    feature_safety: "스마트 보안",
    
    chat: "💬 채팅",
    vault: "🔐 금고",
    notes: "📝 내 노트",
    settings: "⚙️ 설정",
    safety: "🛡️ 보안",
    
    placeholder: "자연스럽게 입력하세요... 이해합니다 😊",
    send: "보내기 ▶",
    
    madeWith: "❤️으로 제작",
    author: "술라이만 나잘 알샤마리"
  },

  // 🇹🇷 Turkish
  tr: {
    welcome: "GraTech Commander'a Hoş Geldiniz",
    subtitle: "AI sizin yolunuz, gizliliğiniz, diliniz",
    letsStart: "Hadi Başlayalım! 🚀",
    next: "İleri →",
    back: "← Geri",
    ready: "Hazır!",
    startChat: "🚀 Sohbete Başla",
    skipAlways: "Her zaman atla",
    
    feature_models: "5 AI Modeli",
    feature_privacy: "100% Gizlilik",
    feature_arabic: "Çok dilli",
    feature_safety: "Akıllı Güvenlik",
    
    chat: "💬 Sohbet",
    vault: "🔐 Kasa",
    notes: "📝 Notlarım",
    settings: "⚙️ Ayarlar",
    safety: "🛡️ Güvenlik",
    
    placeholder: "Doğal yazın... Sizi anlıyorum 😊",
    send: "Gönder ▶",
    
    madeWith: "❤️ ile yapıldı",
    author: "Suliman Nazal Alshammari"
  },

  // 🇷🇺 Russian
  ru: {
    welcome: "Добро пожаловать в GraTech Commander",
    subtitle: "ИИ по-вашему, ваша конфиденциальность, ваш язык",
    letsStart: "Начнём! 🚀",
    next: "Далее →",
    back: "← Назад",
    ready: "Готово!",
    startChat: "🚀 Начать чат",
    skipAlways: "Всегда пропускать",
    
    feature_models: "5 моделей ИИ",
    feature_privacy: "100% приватность",
    feature_arabic: "Многоязычный",
    feature_safety: "Умная защита",
    
    chat: "💬 Чат",
    vault: "🔐 Хранилище",
    notes: "📝 Мои заметки",
    settings: "⚙️ Настройки",
    safety: "🛡️ Безопасность",
    
    placeholder: "Пишите естественно... Я вас понимаю 😊",
    send: "Отправить ▶",
    
    madeWith: "Сделано с ❤️",
    author: "Сулейман Назаль Аль-Шаммари"
  },

  // 🇮🇳 Hindi
  hi: {
    welcome: "GraTech Commander में आपका स्वागत है",
    subtitle: "आपका AI, आपका तरीका, आपकी गोपनीयता, आपकी भाषा",
    letsStart: "शुरू करें! 🚀",
    next: "आगे →",
    back: "← पीछे",
    ready: "तैयार!",
    startChat: "🚀 चैट शुरू करें",
    skipAlways: "हमेशा छोड़ें",
    
    feature_models: "5 AI मॉडल",
    feature_privacy: "100% गोपनीयता",
    feature_arabic: "बहुभाषी",
    feature_safety: "स्मार्ट सुरक्षा",
    
    chat: "💬 चैट",
    vault: "🔐 तिजोरी",
    notes: "📝 मेरे नोट्स",
    settings: "⚙️ सेटिंग्स",
    safety: "🛡️ सुरक्षा",
    
    placeholder: "स्वाभाविक रूप से टाइप करें... मैं समझता हूं 😊",
    send: "भेजें ▶",
    
    madeWith: "❤️ के साथ बनाया गया",
    author: "सुलैमान नज़ल अल-शम्मरी"
  },

  // 🇵🇰 Urdu
  ur: {
    welcome: "GraTech Commander میں خوش آمدید",
    subtitle: "آپ کا AI، آپ کا طریقہ، آپ کی رازداری، آپ کی زبان",
    letsStart: "شروع کریں! 🚀",
    next: "اگلا →",
    back: "← واپس",
    ready: "تیار!",
    startChat: "🚀 چیٹ شروع کریں",
    skipAlways: "ہمیشہ چھوڑیں",
    
    feature_models: "5 AI ماڈلز",
    feature_privacy: "100% رازداری",
    feature_arabic: "کثیر لسانی",
    feature_safety: "سمارٹ سیکیورٹی",
    
    chat: "💬 چیٹ",
    vault: "🔐 والٹ",
    notes: "📝 میرے نوٹس",
    settings: "⚙️ ترتیبات",
    safety: "🛡️ سیکیورٹی",
    
    placeholder: "قدرتی طور پر ٹائپ کریں... میں سمجھتا ہوں 😊",
    send: "بھیجیں ▶",
    
    madeWith: "❤️ کے ساتھ بنایا گیا",
    author: "سلیمان نزال الشمری"
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🌐 LANGUAGE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('gratech_lang') || 'ar';
    this.rtlLanguages = ['ar', 'ur'];
  }

  // Get translation
  t(key) {
    const lang = i18n[this.currentLang] || i18n.en;
    return lang[key] || i18n.en[key] || key;
  }

  // Set language
  setLanguage(lang) {
    if (!i18n[lang]) {
      console.warn(`Language ${lang} not supported, falling back to English`);
      lang = 'en';
    }
    
    this.currentLang = lang;
    localStorage.setItem('gratech_lang', lang);
    
    // Update HTML direction
    const isRTL = this.rtlLanguages.includes(lang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    this.updateUI();
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang, isRTL } }));
  }

  // Update all UI elements
  updateUI() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });
  }

  // Get current language
  getCurrentLang() {
    return this.currentLang;
  }

  // Check if RTL
  isRTL() {
    return this.rtlLanguages.includes(this.currentLang);
  }

  // Get available languages
  getAvailableLanguages() {
    return Object.keys(i18n).map(code => ({
      code,
      name: this.getLanguageName(code),
      flag: this.getLanguageFlag(code)
    }));
  }

  getLanguageName(code) {
    const names = {
      ar: 'العربية',
      en: 'English',
      fr: 'Français',
      de: 'Deutsch',
      es: 'Español',
      zh: '中文',
      ja: '日本語',
      ko: '한국어',
      tr: 'Türkçe',
      ru: 'Русский',
      hi: 'हिन्दी',
      ur: 'اردو'
    };
    return names[code] || code;
  }

  getLanguageFlag(code) {
    const flags = {
      ar: '🇸🇦',
      en: '🇺🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
      es: '🇪🇸',
      zh: '🇨🇳',
      ja: '🇯🇵',
      ko: '🇰🇷',
      tr: '🇹🇷',
      ru: '🇷🇺',
      hi: '🇮🇳',
      ur: '🇵🇰'
    };
    return flags[code] || '🌐';
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 ARABIC TRANSLATION (Original functionality preserved)
// ═══════════════════════════════════════════════════════════════════════════════

const TRANSLATIONS = {
  // طلبات الكود
  'أعطني أمر': 'Generate a command for',
  'سو لي': 'Create for me',
  'اكتب كود': 'Write code for',
  'عدل': 'Modify',
  'صلح': 'Fix',
  'امر نسخ': 'copy command',
  'امر لصق': 'paste command',
  'نسخ لصق': 'CLI command to copy',
  
  // Azure
  'ازير': 'Azure',
  'كلاود': 'cloud',
  'اشتراك': 'subscription',
  'مفتاح': 'key',
  'ريسورس': 'resource',
  
  // عمليات
  'احذف': 'delete',
  'امسح': 'remove',
  'شغل': 'run',
  'نفذ': 'execute',
  'ارفع': 'deploy',
  'حمل': 'download',
  
  // GitHub
  'جيت هب': 'GitHub',
  'ريبو': 'repository',
  'كوميت': 'commit',
  'بوش': 'push',
  'بول': 'pull'
};

// كلمات تثير حساسية النماذج (نتجنبها)
const SENSITIVE_WORDS = [
  'سر', 'أسرار', 'خاص', 'حساس', 'password', 'secret', 'private',
  'hack', 'اختراق', 'سرقة', 'تجسس'
];

// بدائل آمنة
const SAFE_ALTERNATIVES = {
  'أعطني أسرار': 'أعطني معلومات التكوين',
  'مفاتيح سرية': 'معلومات الاعتماد',
  'كلمة سر': 'بيانات الدخول',
  'اختراق': 'اختبار أمان',
  'سرقة': 'نقل بيانات'
};

// أنماط الطلبات الشائعة
const REQUEST_PATTERNS = {
  // نمط: "أعطني أمر [شي] لـ [هدف]"
  copyCommand: {
    pattern: /(?:أعطني|عطني|اعطني)\s*(?:أمر|امر)?\s*(?:نسخ|كوبي|copy)/i,
    transform: (match, context) => {
      return `Please provide a CLI/PowerShell command to copy ${context.target || 'the specified item'}. 
Format: Just the command, ready to copy-paste.
No explanations needed, just the command.`;
    }
  },
  
  // نمط: "سو لي [شي]"
  createSomething: {
    pattern: /(?:سو|سوي|اسوي|سولي)\s*(?:لي)?\s*(.+)/i,
    transform: (match, context) => {
      const thing = match[1] || context.target;
      return `Create ${thing} for me.
Requirements:
- Simple and clean
- Ready to use
- With brief comments if code`;
    }
  },
  
  // نمط: "كيف [أسوي شي]"
  howTo: {
    pattern: /(?:كيف|شلون|ازاي)\s*(.+)/i,
    transform: (match) => {
      return `How do I ${match[1]}?
Please provide:
1. Step-by-step instructions
2. Commands if applicable
3. Brief explanation`;
    }
  },
  
  // نمط: Azure commands
  azureCommand: {
    pattern: /(?:أمر|امر|command)?\s*(?:ازير|azure|كلاود)/i,
    transform: (match, context) => {
      return `Provide Azure CLI command for: ${context.action || 'the requested operation'}
Format: az command ready to copy
Include any required parameters as placeholders.`;
    }
  }
};

class SmartTranslator {
  constructor() {
    this.secretPatterns = this.buildSecretPatterns();
  }

  // بناء أنماط الأسرار للإخفاء
  buildSecretPatterns() {
    return [
      // Azure keys
      { pattern: /[A-Za-z0-9+/]{40,}={0,2}/g, replacement: '[AZURE_KEY_HIDDEN]' },
      // GUIDs
      { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: '[GUID_HIDDEN]' },
      // API Keys
      { pattern: /(?:api[_-]?key|apikey)[=:]\s*["']?([^"'\s]+)/gi, replacement: 'api_key=[KEY_HIDDEN]' },
      // Passwords
      { pattern: /(?:password|pwd|pass)[=:]\s*["']?([^"'\s]+)/gi, replacement: 'password=[HIDDEN]' },
      // Tokens
      { pattern: /(?:token|bearer)[=:]\s*["']?([^"'\s]+)/gi, replacement: 'token=[HIDDEN]' },
      // Connection strings
      { pattern: /(?:connection[_-]?string)[=:]\s*["']?([^"'\n]+)/gi, replacement: 'connection_string=[HIDDEN]' },
      // Emails (partial hide)
      { pattern: /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, replacement: (m, user, domain) => `${user.substring(0,2)}***@${domain}` }
    ];
  }

  // ترجمة الطلب العربي إلى prompt تقني
  translateRequest(arabicText, mode = 'normal') {
    let translated = arabicText;

    // 1. استبدال الكلمات العربية بالإنجليزية
    for (const [arabic, english] of Object.entries(TRANSLATIONS)) {
      const regex = new RegExp(arabic, 'gi');
      translated = translated.replace(regex, english);
    }

    // 2. تطبيق أنماط الطلبات
    for (const [name, pattern] of Object.entries(REQUEST_PATTERNS)) {
      const match = arabicText.match(pattern.pattern);
      if (match) {
        return {
          original: arabicText,
          translated: pattern.transform(match, { target: translated }),
          pattern: name,
          mode
        };
      }
    }

    // 3. إضافة تعليمات حسب الوضع
    const modeInstructions = {
      normal: '',
      code: '\n\nProvide code only, minimal explanations. Ready to copy-paste.',
      safe: '\n\nUse placeholder values for any sensitive data. Do not include real credentials.',
      research: '\n\nProvide sources and references. Cite official documentation when possible.'
    };

    return {
      original: arabicText,
      translated: translated + (modeInstructions[mode] || ''),
      pattern: 'general',
      mode
    };
  }

  // إخفاء الأسرار من النص
  hideSecrets(text) {
    let hidden = text;
    let secretsFound = [];

    for (const { pattern, replacement } of this.secretPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        secretsFound.push(...matches);
        if (typeof replacement === 'function') {
          hidden = hidden.replace(pattern, replacement);
        } else {
          hidden = hidden.replace(pattern, replacement);
        }
      }
    }

    return {
      original: text,
      hidden,
      secretsCount: secretsFound.length,
      secretsFound: secretsFound.map(s => s.substring(0, 10) + '...')
    };
  }

  // استبدال كلمات حساسة ببدائل آمنة
  makeSafe(text) {
    let safe = text;
    
    for (const [sensitive, alternative] of Object.entries(SAFE_ALTERNATIVES)) {
      const regex = new RegExp(sensitive, 'gi');
      safe = safe.replace(regex, alternative);
    }

    return safe;
  }

  // اقتراحات ذكية بناءً على ما يكتبه المستخدم
  getSuggestions(text) {
    const suggestions = [];

    if (text.includes('أمر') || text.includes('امر')) {
      suggestions.push({ text: '💻 وضع الكود', action: 'setMode', mode: 'code' });
    }

    if (text.includes('ازير') || text.includes('azure')) {
      suggestions.push({ text: '🔒 وضع آمن (يخفي المفاتيح)', action: 'setMode', mode: 'safe' });
    }

    if (text.includes('بحث') || text.includes('مصادر')) {
      suggestions.push({ text: '🔍 وضع البحث', action: 'setMode', mode: 'research' });
    }

    if (text.length > 50) {
      suggestions.push({ text: '🙈 إخفاء الأسرار', action: 'hideSecrets' });
    }

    return suggestions;
  }

  // توليد prompt مثالي لكل نموذج
  generateOptimalPrompt(text, targetModel) {
    const base = this.translateRequest(text);
    
    const modelPrefixes = {
      'claude': 'Please help me with the following task. Be thorough but concise:\n\n',
      'gpt': 'Task:\n\n',
      'deepseek': '# Task\n\n',
      'perplexity': 'Research the following and provide sources:\n\n'
    };

    const prefix = modelPrefixes[targetModel] || '';
    
    return {
      ...base,
      optimized: prefix + base.translated,
      targetModel
    };
  }
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SmartTranslator, TRANSLATIONS, REQUEST_PATTERNS };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 INITIALIZE
// ═══════════════════════════════════════════════════════════════════════════════

// Create global instances
const langManager = new LanguageManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Set up language selector
  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.value = langManager.getCurrentLang();
    langSelect.addEventListener('change', (e) => {
      langManager.setLanguage(e.target.value);
    });
  }
  
  // Initial UI update
  langManager.updateUI();
});

// Export for use in other files
window.langManager = langManager;
window.i18n = i18n;
window.t = (key) => langManager.t(key);
