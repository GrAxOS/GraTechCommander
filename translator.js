// GraTech Commander - Smart Request Translator
// مترجم الطلبات الذكي - By Suliman Alshammari
// "أكتب بالعربي براحتك... أنا أفهمك"

// قاموس الترجمة: عربي عامي ← prompt تقني
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
