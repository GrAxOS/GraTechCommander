// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 GraTech Commander - Web Renderer (WORKING VERSION)
// By Suliman Nazal Alshammari | @Grar00t | @GrAxOS
// "REAL functionality, not decoration!"
// ═══════════════════════════════════════════════════════════════════════════════

// State
let chatHistory = [];
let currentMode = 'normal';
let isLoading = false;

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ GraTech Commander Initializing...');
  
  initNavigation();
  initChat();
  initSettings();
  initModals();
  initLanguage();
  updateUsageDisplay();
  
  console.log('✅ GraTech Commander Ready!');
});

// ═══════════════════════════════════════════════════════════════════════════════
// 📍 NAVIGATION - WORKING!
// ═══════════════════════════════════════════════════════════════════════════════

function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const views = document.querySelectorAll('.view');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const viewId = this.dataset.view;
      console.log('📍 Navigate to:', viewId);
      
      // Update buttons
      navButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Update views
      views.forEach(v => v.classList.remove('active'));
      const targetView = document.getElementById(viewId + '-view');
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💬 CHAT - REAL AI INTEGRATION!
// ═══════════════════════════════════════════════════════════════════════════════

function initChat() {
  const sendBtn = document.getElementById('send-btn');
  const messageInput = document.getElementById('message-input');
  const modelSelect = document.getElementById('model-select');
  
  // Send button
  sendBtn?.addEventListener('click', sendMessage);
  
  // Enter key
  messageInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentMode = this.dataset.mode;
      updatePlaceholder();
    });
  });
  
  // Quick prompts
  document.querySelectorAll('.quick-prompt').forEach(btn => {
    btn.addEventListener('click', function() {
      const text = this.textContent.replace(/^[^\s]+\s/, ''); // Remove emoji
      messageInput.value = text;
      messageInput.focus();
    });
  });
}

async function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const chatContainer = document.getElementById('chat-container');
  const modelSelect = document.getElementById('model-select');
  
  const message = messageInput.value.trim();
  if (!message || isLoading) return;
  
  // Clear welcome message
  const welcome = chatContainer.querySelector('.welcome-message');
  if (welcome) welcome.remove();
  
  // Add user message
  addMessage(message, 'user');
  messageInput.value = '';
  isLoading = true;
  
  // Show loading
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message assistant loading';
  loadingDiv.id = 'loading-msg';
  loadingDiv.innerHTML = '⏳ جاري التفكير...';
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  // Get model
  const model = modelSelect?.value || 'gpt-4o';
  
  try {
    // Check if user has custom key
    const customKey = localStorage.getItem('gratech_api_key');
    const customEndpoint = localStorage.getItem('gratech_endpoint');
    
    let result;
    if (customKey && customEndpoint) {
      // Use custom key
      result = await window.GraTechAI.sendCustom(message, customKey, customEndpoint, model);
    } else {
      // Use demo key
      result = await window.GraTechAI.send(message, model);
    }
    
    // Remove loading
    document.getElementById('loading-msg')?.remove();
    
    if (result.success) {
      addMessage(result.message, 'assistant');
      updateUsageDisplay();
      
      // Show model used
      if (result.remaining !== undefined) {
        showNotification(`✅ ${result.model} | متبقي: ${result.remaining} رسالة`);
      }
    } else {
      addMessage(result.error, 'assistant');
    }
  } catch (error) {
    document.getElementById('loading-msg')?.remove();
    addMessage(`❌ خطأ: ${error.message}`, 'assistant');
  }
  
  isLoading = false;
}

function addMessage(content, role) {
  const chatContainer = document.getElementById('chat-container');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  
  // Format code blocks
  let formatted = content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
  
  div.innerHTML = formatted;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  chatHistory.push({ role, content });
}

function updatePlaceholder() {
  const messageInput = document.getElementById('message-input');
  const placeholders = {
    normal: 'اكتب بالعربي براحتك... أنا أفهمك 😊',
    code: '💻 وضع الكود - اكتب وش تبي وأعطيك كود جاهز',
    safe: '🔒 وضع آمن - الأسرار تتخفى تلقائياً',
    research: '🔍 وضع البحث - أعطيك معلومات موثقة'
  };
  if (messageInput) {
    messageInput.placeholder = placeholders[currentMode] || placeholders.normal;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ⚙️ SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════

function initSettings() {
  // Load saved settings
  document.getElementById('azure-api-key').value = localStorage.getItem('gratech_api_key') || '';
  document.getElementById('azure-endpoint').value = localStorage.getItem('gratech_endpoint') || '';
  document.getElementById('github-token').value = localStorage.getItem('gratech_github') || '';
  
  // Save button
  document.getElementById('save-settings')?.addEventListener('click', () => {
    const apiKey = document.getElementById('azure-api-key').value;
    const endpoint = document.getElementById('azure-endpoint').value;
    const github = document.getElementById('github-token').value;
    
    if (apiKey) localStorage.setItem('gratech_api_key', apiKey);
    if (endpoint) localStorage.setItem('gratech_endpoint', endpoint);
    if (github) localStorage.setItem('gratech_github', github);
    
    showNotification('✅ تم حفظ الإعدادات!');
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 LANGUAGE
// ═══════════════════════════════════════════════════════════════════════════════

function initLanguage() {
  const langSelect = document.getElementById('language-select');
  
  // Load saved language
  const savedLang = localStorage.getItem('gratech_lang') || 'ar';
  if (langSelect) langSelect.value = savedLang;
  setLanguage(savedLang);
  
  langSelect?.addEventListener('change', (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem('gratech_lang', lang);
  });
}

function setLanguage(lang) {
  const isRTL = ['ar', 'ur'].includes(lang);
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  // Update UI if langManager exists
  if (window.langManager) {
    window.langManager.setLanguage(lang);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 USAGE DISPLAY
// ═══════════════════════════════════════════════════════════════════════════════

function updateUsageDisplay() {
  if (window.GraTechAI) {
    const stats = window.GraTechAI.getStats();
    console.log('📊 Usage:', stats);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 MODALS
// ═══════════════════════════════════════════════════════════════════════════════

function initModals() {
  // Quick Note
  document.getElementById('quick-note-btn')?.addEventListener('click', () => {
    document.getElementById('quick-note-modal')?.classList.remove('hidden');
  });
  
  // Attach File
  document.getElementById('attach-file-btn')?.addEventListener('click', () => {
    document.getElementById('attach-modal')?.classList.remove('hidden');
  });
  
  // Close buttons
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    });
  });
  
  // Save quick note
  document.getElementById('save-quick-note')?.addEventListener('click', () => {
    const text = document.getElementById('quick-note-text').value;
    if (text) {
      const notes = JSON.parse(localStorage.getItem('gratech_notes') || '[]');
      notes.push({ text, date: new Date().toISOString() });
      localStorage.setItem('gratech_notes', JSON.stringify(notes));
      document.getElementById('quick-note-text').value = '';
      document.getElementById('quick-note-modal').classList.add('hidden');
      showNotification('✅ تم حفظ الملاحظة!');
    }
  });
  
  // Emergency Stop
  document.getElementById('emergency-stop')?.addEventListener('click', () => {
    if (confirm('⚠️ هل أنت متأكد من إيقاف جميع العمليات؟')) {
      isLoading = false;
      document.getElementById('loading-msg')?.remove();
      showNotification('🚨 تم إيقاف جميع العمليات!');
    }
  });
  
  // Vault categories
  document.querySelectorAll('.vault-cat').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.vault-cat').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const key = this.closest('.vault-item')?.querySelector('.hidden-key')?.textContent;
      if (key) {
        navigator.clipboard.writeText(key);
        this.textContent = '✅';
        setTimeout(() => this.textContent = '📋', 1500);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔔 NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function showNotification(msg) {
  let notif = document.getElementById('gratech-notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'gratech-notif';
    notif.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #00d4ff, #7c3aed);
      color: white;
      padding: 15px 30px;
      border-radius: 30px;
      z-index: 10000;
      font-family: Cairo, sans-serif;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.style.display = 'block';
  setTimeout(() => notif.style.display = 'none', 3000);
}

// Make functions global
window.insertPrompt = (text) => {
  const input = document.getElementById('message-input');
  if (input) {
    input.value = text + ' ';
    input.focus();
  }
};

window.showNotification = showNotification;

console.log('✨ GraTech Web Renderer Loaded');
