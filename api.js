// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 GraTech Commander - AI API Integration (PRODUCTION)
// By Suliman Nazal Alshammari | @Grar00t | @GrAxOS
// "Building with HONESTY - Not Vaporware!" 
// ═══════════════════════════════════════════════════════════════════════════════

// 🔒 API Configuration - Uses Azure Functions Proxy
const API_CONFIG = {
  // REAL Azure Function Proxy (your academic key is safe on server)
  proxyUrl: 'https://gratech-ai-proxy.azurewebsites.net/api/chat',
  
  apiVersion: '2024-08-01-preview',
  
  // Available Models
  models: {
    'gpt-4o': { name: 'GPT-4o', icon: '🚀', description: 'الأسرع والأذكى' },
    'gpt-4': { name: 'GPT-4', icon: '💬', description: 'متوازن وقوي' },
    'gpt-35-turbo': { name: 'GPT-3.5', icon: '⚡', description: 'اقتصادي وسريع' }
  }
};

// 🎯 Rate Limiting for Free Demo
const RATE_LIMIT = {
  maxRequestsPerHour: 30,
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

// 🤖 AI Chat Function - REAL API CALL
async function sendToAI(message, model = 'gpt-4o') {
  // Check if user has custom key
  const customKey = localStorage.getItem('gratech_api_key');
  const customEndpoint = localStorage.getItem('gratech_endpoint');
  
  if (customKey && customEndpoint) {
    return await sendWithCustomKey(message, customKey, customEndpoint, model);
  }
  
  // Demo mode - rate limited
  if (!RATE_LIMIT.canMakeRequest()) {
    return {
      success: false,
      error: `⚠️ وصلت للحد الأقصى (${RATE_LIMIT.maxRequestsPerHour} رسالة/ساعة)\n\n💡 للاستخدام غير المحدود:\n• أدخل مفتاحك الخاص في الإعدادات\n• أو انتظر ساعة واحدة`
    };
  }
  
  try {
    console.log('🚀 Sending to GraTech AI Proxy:', model);
    
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
      console.error('API Error:', data);
      return {
        success: false,
        error: data.error || 'فشل في الاتصال بالذكاء الاصطناعي'
      };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return {
      success: false,
      error: `❌ خطأ في الشبكة: ${error.message}\n\n💡 تأكد من اتصالك بالإنترنت`
    };
  }
}

// 🔄 Use Custom API Key (BYOK) - Unlimited
async function sendWithCustomKey(message, apiKey, endpoint, model = 'gpt-4') {
  // Clean endpoint
  endpoint = endpoint.replace(/\/$/, '');
  
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
        error: `❌ ${data.error?.message || 'خطأ في API'}\n\n💡 تأكد من صحة المفتاح والـ Endpoint`
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: `❌ ${error.message}` 
    };
  }
}

// 🆔 Session ID
function getSessionId() {
  let sid = localStorage.getItem('gratech_session');
  if (!sid) {
    sid = 'gt_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
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

// Export
window.GraTechAI = {
  send: sendToAI,
  sendCustom: sendWithCustomKey,
  getStats: getUsageStats,
  models: API_CONFIG.models
};

console.log('🚀 GraTech AI Ready! | Proxy: gratech-ai-proxy.azurewebsites.net');
console.log('📊 Remaining:', RATE_LIMIT.getRemainingRequests(), '/', RATE_LIMIT.maxRequestsPerHour);
