// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 GraTech Commander - AI API Integration (Secure Proxy Version)
// By Suliman Nazal Alshammari | @Grar00t | @GrAxOS
// "Building with HONESTY - Not Vaporware" 
// ═══════════════════════════════════════════════════════════════════════════════

// 🔒 API Configuration - Uses Azure Functions Proxy for security
const API_CONFIG = {
  // Free demo proxy (rate limited)
  proxyUrl: 'https://gratech-ai-proxy.azurewebsites.net/api/chat',
  
  // Direct Azure (if user has own key)
  directEndpoint: null,
  directKey: null,
  
  apiVersion: '2024-08-01-preview',
  
  // Available Models
  models: {
    'gpt-4o': { name: 'GPT-4o', icon: '🚀', description: 'الأسرع والأذكى' },
    'gpt-4.1': { name: 'GPT-4.1', icon: '💬', description: 'متوازن' },
    'gpt-35-turbo': { name: 'GPT-3.5', icon: '⚡', description: 'اقتصادي' }
  }
};

// 🎯 Rate Limiting for Free Demo
const RATE_LIMIT = {
  maxRequestsPerHour: 20,
  maxTokensPerRequest: 2000,
  requests: [],
  
  canMakeRequest() {
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000);
    this.requests = this.requests.filter(t => t > hourAgo);
    return this.requests.length < this.maxRequestsPerHour;
  },
  
  recordRequest() {
    this.requests.push(Date.now());
    localStorage.setItem('gratech_requests', JSON.stringify(this.requests));
  },
  
  getRemainingRequests() {
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000);
    this.requests = this.requests.filter(t => t > hourAgo);
    return this.maxRequestsPerHour - this.requests.length;
  },
  
  init() {
    const saved = localStorage.getItem('gratech_requests');
    if (saved) {
      try {
        this.requests = JSON.parse(saved);
      } catch(e) {
        this.requests = [];
      }
    }
  }
};

// 🤖 AI Chat Function
async function sendToAI(message, model = 'gpt-4o') {
  // Check if user has custom key
  const customKey = localStorage.getItem('gratech_api_key');
  const customEndpoint = localStorage.getItem('gratech_endpoint');
  
  if (customKey && customEndpoint) {
    // Use custom key - unlimited
    return await sendWithCustomKey(message, customKey, customEndpoint, model);
  }
  
  // Demo mode - rate limited
  if (!RATE_LIMIT.canMakeRequest()) {
    return {
      success: false,
      error: '⚠️ وصلت للحد الأقصى (20 رسالة/ساعة)\n\n💡 للاستخدام غير المحدود:\n1. أدخل مفتاحك الخاص في الإعدادات\n2. أو انتظر ساعة واحدة'
    };
  }
  
  // Call the proxy
  try {
    console.log('🚀 Sending to GraTech AI Proxy...');
    
    const response = await fetch(API_CONFIG.proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        model: model,
        sessionId: getSessionId()
      })
    });

    const data = await response.json();
    
    if (response.ok && data.message) {
      RATE_LIMIT.recordRequest();
      return {
        success: true,
        message: data.message,
        model: API_CONFIG.models[model]?.name || model,
        remaining: RATE_LIMIT.getRemainingRequests()
      };
    } else {
      return {
        success: false,
        error: data.error || 'فشل في الاتصال'
      };
    }
  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback - show demo response
    return getDemoResponse(message, model);
  }
}

// 🔄 Use Custom API Key (BYOK) - Unlimited
async function sendWithCustomKey(message, apiKey, endpoint, model = 'gpt-4') {
  const url = `${endpoint}/openai/deployments/${model}/chat/completions?api-version=2024-08-01-preview`;
  
  const body = {
    messages: [
      { role: 'system', content: 'أنت مساعد ذكي يتحدث العربية بطلاقة. صُنعت بواسطة GraTech 🇸🇦' },
      { role: 'user', content: message }
    ],
    max_tokens: 4000,
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (response.ok && data.choices) {
      return { 
        success: true, 
        message: data.choices[0].message.content,
        model: model,
        unlimited: true
      };
    } else {
      return { 
        success: false, 
        error: data.error?.message || 'API Error' 
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 🎮 Demo Response (fallback when proxy is unavailable)
function getDemoResponse(message, model) {
  const responses = {
    'شرح': '💡 **شرح:**\n\nهذا سؤال رائع! دعني أشرح لك...\n\n*للحصول على إجابات حقيقية من الذكاء الاصطناعي، يرجى إدخال مفتاح API الخاص بك في الإعدادات.*',
    'كود': '```javascript\n// مثال كود\nfunction greet() {\n  console.log("مرحباً من GraTech!");\n}\n```\n\n*للحصول على كود مخصص، أدخل مفتاح API الخاص بك.*',
    'default': `🤖 **وضع العرض التوضيحي**\n\nشكراً على تجربة GraTech Commander!\n\n📝 رسالتك: "${message.substring(0, 50)}..."\n\n⚙️ النموذج: ${model}\n\n💡 للحصول على ردود حقيقية من AI:\n1. اذهب للإعدادات ⚙️\n2. أدخل مفتاح Azure OpenAI الخاص بك\n3. استمتع بمحادثات غير محدودة!\n\n🔗 احصل على مفتاح مجاني من:\nhttps://azure.microsoft.com/free/`
  };
  
  const lowerMsg = message.toLowerCase();
  let response = responses.default;
  
  if (lowerMsg.includes('شرح') || lowerMsg.includes('explain')) {
    response = responses['شرح'];
  } else if (lowerMsg.includes('كود') || lowerMsg.includes('code')) {
    response = responses['كود'];
  }
  
  RATE_LIMIT.recordRequest();
  
  return {
    success: true,
    message: response,
    model: API_CONFIG.models[model]?.name || model,
    remaining: RATE_LIMIT.getRemainingRequests(),
    demo: true
  };
}

// 🆔 Session ID for rate limiting
function getSessionId() {
  let sid = localStorage.getItem('gratech_session');
  if (!sid) {
    sid = 'gt_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('gratech_session', sid);
  }
  return sid;
}

// 📊 Usage Stats
function getUsageStats() {
  return {
    remaining: RATE_LIMIT.getRemainingRequests(),
    max: RATE_LIMIT.maxRequestsPerHour,
    hasCustomKey: !!(localStorage.getItem('gratech_api_key'))
  };
}

// Initialize
RATE_LIMIT.init();

// Export for use
window.GraTechAI = {
  send: sendToAI,
  sendCustom: sendWithCustomKey,
  getStats: getUsageStats,
  models: API_CONFIG.models
};

console.log('🚀 GraTech AI Ready!');
console.log('📊 Demo mode - Remaining:', RATE_LIMIT.getRemainingRequests(), 'requests');
