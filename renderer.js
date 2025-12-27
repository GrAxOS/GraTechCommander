// GraTech Commander - Renderer Process
// By Suliman Alshammari @Grar00t | @gratechx

const { ipcRenderer } = require('electron');

// State
let settings = {
  azureApiKey: '',
  azureEndpoint: '',
  githubToken: ''
};

let chatHistory = [];
let currentLanguage = 'ar';
let notes = [];
let vault = [];

// Translations
const translations = {
  ar: {
    chat: '💬 المحادثة',
    vault: '🔐 الخزنة',
    notes: '📝 ملاحظاتي',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 حساباتي',
    settings: '⚙️ الإعدادات',
    send: 'إرسال ▶',
    thinking: '⏳ جاري التفكير...',
    welcome: 'مرحباً يا سليمان! 👋',
    welcomeMsg: 'أنا جاهز للمساعدة. اختر النموذج وابدأ المحادثة.',
    saveSettings: '💾 حفظ الإعدادات',
    saved: '✅ تم حفظ الإعدادات بنجاح!'
  },
  en: {
    chat: '💬 Chat',
    vault: '🔐 Vault',
    notes: '📝 My Notes',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 Accounts',
    settings: '⚙️ Settings',
    send: 'Send ▶',
    thinking: '⏳ Thinking...',
    welcome: 'Hello! 👋',
    welcomeMsg: 'I\'m ready to help. Choose a model and start chatting.',
    saveSettings: '💾 Save Settings',
    saved: '✅ Settings saved successfully!'
  },
  fr: {
    chat: '💬 Discussion',
    vault: '🔐 Coffre',
    notes: '📝 Mes Notes',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 Comptes',
    settings: '⚙️ Paramètres',
    send: 'Envoyer ▶',
    thinking: '⏳ Réflexion...',
    welcome: 'Bonjour! 👋',
    welcomeMsg: 'Je suis prêt à aider. Choisissez un modèle et commencez.',
    saveSettings: '💾 Sauvegarder',
    saved: '✅ Paramètres sauvegardés!'
  },
  de: {
    chat: '💬 Chat',
    vault: '🔐 Tresor',
    notes: '📝 Notizen',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 Konten',
    settings: '⚙️ Einstellungen',
    send: 'Senden ▶',
    thinking: '⏳ Denke nach...',
    welcome: 'Hallo! 👋',
    welcomeMsg: 'Ich bin bereit zu helfen.',
    saveSettings: '💾 Speichern',
    saved: '✅ Einstellungen gespeichert!'
  },
  zh: {
    chat: '💬 聊天',
    vault: '🔐 保险库',
    notes: '📝 笔记',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 账户',
    settings: '⚙️ 设置',
    send: '发送 ▶',
    thinking: '⏳ 思考中...',
    welcome: '你好！👋',
    welcomeMsg: '我准备好帮助你了。选择一个模型开始聊天。',
    saveSettings: '💾 保存设置',
    saved: '✅ 设置已保存！'
  },
  ja: {
    chat: '💬 チャット',
    vault: '🔐 金庫',
    notes: '📝 メモ',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 アカウント',
    settings: '⚙️ 設定',
    send: '送信 ▶',
    thinking: '⏳ 考え中...',
    welcome: 'こんにちは！👋',
    welcomeMsg: 'お手伝いする準備ができました。',
    saveSettings: '💾 保存',
    saved: '✅ 設定が保存されました！'
  },
  ko: {
    chat: '💬 채팅',
    vault: '🔐 금고',
    notes: '📝 메모',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 계정',
    settings: '⚙️ 설정',
    send: '보내기 ▶',
    thinking: '⏳ 생각 중...',
    welcome: '안녕하세요! 👋',
    welcomeMsg: '도움을 드릴 준비가 되었습니다.',
    saveSettings: '💾 저장',
    saved: '✅ 설정이 저장되었습니다!'
  },
  tr: {
    chat: '💬 Sohbet',
    vault: '🔐 Kasa',
    notes: '📝 Notlarım',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 Hesaplar',
    settings: '⚙️ Ayarlar',
    send: 'Gönder ▶',
    thinking: '⏳ Düşünüyor...',
    welcome: 'Merhaba! 👋',
    welcomeMsg: 'Yardıma hazırım.',
    saveSettings: '💾 Kaydet',
    saved: '✅ Ayarlar kaydedildi!'
  },
  ru: {
    chat: '💬 Чат',
    vault: '🔐 Хранилище',
    notes: '📝 Заметки',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 Аккаунты',
    settings: '⚙️ Настройки',
    send: 'Отправить ▶',
    thinking: '⏳ Думаю...',
    welcome: 'Привет! 👋',
    welcomeMsg: 'Я готов помочь.',
    saveSettings: '💾 Сохранить',
    saved: '✅ Настройки сохранены!'
  },
  es: {
    chat: '💬 Chat',
    vault: '🔐 Bóveda',
    notes: '📝 Mis Notas',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 Cuentas',
    settings: '⚙️ Configuración',
    send: 'Enviar ▶',
    thinking: '⏳ Pensando...',
    welcome: '¡Hola! 👋',
    welcomeMsg: 'Estoy listo para ayudar.',
    saveSettings: '💾 Guardar',
    saved: '✅ ¡Configuración guardada!'
  },
  hi: {
    chat: '💬 चैट',
    vault: '🔐 तिजोरी',
    notes: '📝 मेरे नोट्स',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 खाते',
    settings: '⚙️ सेटिंग्स',
    send: 'भेजें ▶',
    thinking: '⏳ सोच रहा हूं...',
    welcome: 'नमस्ते! 👋',
    welcomeMsg: 'मैं मदद के लिए तैयार हूं।',
    saveSettings: '💾 सहेजें',
    saved: '✅ सेटिंग्स सहेजी गईं!'
  },
  ur: {
    chat: '💬 چیٹ',
    vault: '🔐 خزانہ',
    notes: '📝 میرے نوٹس',
    github: '🐙 GitHub',
    azure: '☁️ Azure',
    accounts: '👤 اکاؤنٹس',
    settings: '⚙️ ترتیبات',
    send: 'بھیجیں ▶',
    thinking: '⏳ سوچ رہا ہوں...',
    welcome: 'ہیلو! 👋',
    welcomeMsg: 'میں مدد کے لیے تیار ہوں۔',
    saveSettings: '💾 محفوظ کریں',
    saved: '✅ ترتیبات محفوظ!'
  }
};

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const modelSelect = document.getElementById('model-select');

// Smart Translator
let currentMode = 'normal';
let translator = null;

function initTranslator() {
  if (typeof SmartTranslator !== 'undefined') {
    translator = new SmartTranslator();
    console.log('✅ SmartTranslator loaded');
  } else {
    console.warn('⚠️ SmartTranslator fallback');
    translator = {
      translateRequest: (t) => ({translated:t, original:t, mode:'normal'}),
      hideSecrets: (t) => ({hidden:t, secretsCount:0}),
      getSuggestions: () => []
    };
  }
}

// Mode buttons
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    updatePlaceholder();
  });
});

function updatePlaceholder() {
  const placeholders = {
    normal: 'اكتب بالعربي براحتك... أنا أفهمك 😊',
    code: '💻 وضع الكود - أكتب "سو لي كذا" وأعطيك كود جاهز',
    safe: '🔒 وضع آمن - الأسرار تتخفى تلقائياً',
    research: '🔍 وضع البحث - أعطيك مصادر موثوقة'
  };
  messageInput.placeholder = placeholders[currentMode] || placeholders.normal;
}

// Translate button
document.getElementById('translate-btn')?.addEventListener('click', () => {
  const text = messageInput.value;
  if (!text) return;
  
  const result = translator.translateRequest(text, currentMode);
  showTranslationPreview(result);
});

// Hide secrets button
document.getElementById('hide-secrets-btn')?.addEventListener('click', () => {
  const text = messageInput.value;
  if (!text) return;
  
  const result = translator.hideSecrets(text);
  if (result.secretsCount > 0) {
    messageInput.value = result.hidden;
    showSecretsWarning(result.secretsCount);
  } else {
    alert('✅ لم يتم العثور على أسرار للإخفاء');
  }
});

function showTranslationPreview(result) {
  // Remove existing preview
  document.querySelector('.translation-preview')?.remove();
  
  const preview = document.createElement('div');
  preview.className = 'translation-preview';
  preview.innerHTML = `
    <h5>🔄 البرومبت المترجم (${result.mode}):</h5>
    <pre>${result.translated}</pre>
    <div style="margin-top: 10px; display: flex; gap: 10px;">
      <button onclick="useTranslation()" style="background: var(--accent-primary); color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">✅ استخدم</button>
      <button onclick="this.parentElement.parentElement.remove()" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-color); padding: 8px 15px; border-radius: 6px; cursor: pointer;">❌ إلغاء</button>
    </div>
  `;
  
  document.querySelector('.chat-input-area').appendChild(preview);
  
  // Store for use
  window.pendingTranslation = result.translated;
}

function useTranslation() {
  if (window.pendingTranslation) {
    messageInput.value = window.pendingTranslation;
    document.querySelector('.translation-preview')?.remove();
  }
}

function showSecretsWarning(count) {
  // Remove existing warning
  document.querySelector('.secrets-warning')?.remove();
  
  const warning = document.createElement('div');
  warning.className = 'secrets-warning';
  warning.innerHTML = `
    <span>🙈</span>
    <span>تم إخفاء ${count} من الأسرار/المفاتيح</span>
    <button onclick="this.parentElement.remove()" style="margin-right: auto; background: none; border: none; color: var(--text-secondary); cursor: pointer;">✕</button>
  `;
  
  document.querySelector('.chat-input-area').appendChild(warning);
  
  setTimeout(() => warning.remove(), 5000);
}

// Smart suggestions on input
messageInput?.addEventListener('input', () => {
  const text = messageInput.value;
  const suggestions = translator.getSuggestions(text);
  const container = document.getElementById('smart-suggestions');
  
  if (container && suggestions.length > 0) {
    container.innerHTML = suggestions.map(s => 
      `<button class="suggestion-chip" onclick="handleSuggestion('${s.action}', '${s.mode || ''}')">${s.text}</button>`
    ).join('');
  } else if (container) {
    container.innerHTML = '';
  }
});

function handleSuggestion(action, mode) {
  if (action === 'setMode' && mode) {
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    currentMode = mode;
    updatePlaceholder();
  } else if (action === 'hideSecrets') {
    document.getElementById('hide-secrets-btn')?.click();
  }
  
  document.getElementById('smart-suggestions').innerHTML = '';
}

// Navigation
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const viewId = btn.dataset.view;
    
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    views.forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    
    // Load data for specific views
    if (viewId === 'github' && settings.githubToken) {
      loadGitHubData();
    }
  });
});

// Chat Functions
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  // Clear welcome message
  const welcome = chatContainer.querySelector('.welcome-message');
  if (welcome) welcome.remove();
  
  // Add user message
  addMessage(message, 'user');
  messageInput.value = '';
  
  // Show loading
  const loadingId = addLoadingMessage();
  
  // Get selected model
  const model = modelSelect.value;
  
  // Determine endpoint based on model
  let endpoint = settings.azureEndpoint;
  if (!endpoint) {
    removeLoadingMessage(loadingId);
    addMessage('⚠️ يرجى إدخال Azure Endpoint في الإعدادات', 'assistant');
    return;
  }
  
  try {
    // Microsoft Foundry endpoint - direct to /models
    const result = await ipcRenderer.invoke('chat-request', {
      message,
      model,
      apiKey: settings.azureApiKey,
      endpoint: settings.azureEndpoint
    });
    
    removeLoadingMessage(loadingId);
    
    if (result.success && result.data.choices) {
      const response = result.data.choices[0].message.content;
      addMessage(response, 'assistant');
    } else {
      addMessage(`❌ خطأ: ${result.error || 'فشل في الاتصال'}`, 'assistant');
    }
  } catch (error) {
    removeLoadingMessage(loadingId);
    addMessage(`❌ خطأ: ${error.message}`, 'assistant');
  }
}

function addMessage(content, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  
  // Format code blocks
  const formatted = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || ''}">${escapeHtml(code)}</code></pre>`;
  });
  
  div.innerHTML = formatted;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  chatHistory.push({ role, content });
}

function addLoadingMessage() {
  const id = Date.now();
  const div = document.createElement('div');
  div.className = 'message assistant';
  div.id = `loading-${id}`;
  div.innerHTML = '⏳ جاري التفكير...';
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return id;
}

function removeLoadingMessage(id) {
  const el = document.getElementById(`loading-${id}`);
  if (el) el.remove();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// GitHub Functions
async function loadGitHubData() {
  if (!settings.githubToken) {
    document.getElementById('repos-list').innerHTML = '<p class="loading">⚠️ يرجى إدخال GitHub Token في الإعدادات</p>';
    return;
  }
  
  try {
    // Get user info
    const userResult = await ipcRenderer.invoke('github-request', {
      endpoint: '/user',
      token: settings.githubToken
    });
    
    if (userResult.success) {
      document.getElementById('repos-count').textContent = userResult.data.public_repos || 0;
      document.getElementById('followers-count').textContent = userResult.data.followers || 0;
    }
    
    // Get repos
    const reposResult = await ipcRenderer.invoke('github-request', {
      endpoint: '/user/repos?sort=updated&per_page=10',
      token: settings.githubToken
    });
    
    if (reposResult.success) {
      let totalStars = 0;
      let reposHtml = '';
      
      reposResult.data.forEach(repo => {
        totalStars += repo.stargazers_count;
        reposHtml += `
          <div class="repo-item">
            <div>
              <span class="repo-name">${repo.name}</span>
              <p style="color: var(--text-secondary); font-size: 12px; margin-top: 5px;">
                ${repo.description || 'بدون وصف'}
              </p>
            </div>
            <span>⭐ ${repo.stargazers_count}</span>
          </div>
        `;
      });
      
      document.getElementById('stars-count').textContent = totalStars;
      document.getElementById('repos-list').innerHTML = reposHtml;
    }
  } catch (error) {
    document.getElementById('repos-list').innerHTML = `<p class="loading">❌ خطأ: ${error.message}</p>`;
  }
}

// Settings Functions
document.getElementById('save-settings').addEventListener('click', saveSettings);

function saveSettings() {
  settings.azureApiKey = document.getElementById('azure-api-key').value;
  settings.azureEndpoint = document.getElementById('azure-endpoint').value;
  settings.githubToken = document.getElementById('github-token').value;
  
  // Save to localStorage
  localStorage.setItem('gratech-settings', JSON.stringify(settings));
  
  alert('✅ تم حفظ الإعدادات بنجاح!');
}

function loadSettings() {
  const saved = localStorage.getItem('gratech-settings');
  if (saved) {
    settings = JSON.parse(saved);
  } else {
    // Default empty - user must enter their own credentials
    settings = {
      azureApiKey: '',
      azureEndpoint: '',
      githubToken: ''
    };
  }
  document.getElementById('azure-api-key').value = settings.azureApiKey || '';
  document.getElementById('azure-endpoint').value = settings.azureEndpoint || '';
  document.getElementById('github-token').value = settings.githubToken || '';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTranslator();
  loadSettings();
  initLanguageSelector();
  initModals();
  initVault();
  console.log('⚡ GraTech Commander initialized');
});

// Language Selector
function initLanguageSelector() {
  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      updateUILanguage();
      
      // Update direction for RTL languages
      if (['ar', 'ur'].includes(currentLanguage)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', currentLanguage);
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', currentLanguage);
      }
      
      localStorage.setItem('gratech-language', currentLanguage);
    });
    
    // Load saved language
    const savedLang = localStorage.getItem('gratech-language');
    if (savedLang) {
      currentLanguage = savedLang;
      langSelect.value = savedLang;
      updateUILanguage();
    }
  }
}

function updateUILanguage() {
  const t = translations[currentLanguage] || translations.en;
  
  // Update nav buttons
  const navTexts = ['chat', 'vault', 'notes', 'github', 'azure', 'accounts', 'settings'];
  navButtons.forEach((btn, i) => {
    if (navTexts[i] && t[navTexts[i]]) {
      btn.textContent = t[navTexts[i]];
    }
  });
  
  // Update send button
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.textContent = t.send;
  
  // Update save settings button
  const saveBtn = document.getElementById('save-settings');
  if (saveBtn) saveBtn.textContent = t.saveSettings;
}

// Modals
function initModals() {
  // Quick Note Modal
  const quickNoteBtn = document.getElementById('quick-note-btn');
  const quickNoteModal = document.getElementById('quick-note-modal');
  
  if (quickNoteBtn && quickNoteModal) {
    quickNoteBtn.addEventListener('click', () => {
      quickNoteModal.classList.remove('hidden');
    });
  }
  
  // Attach File Modal
  const attachBtn = document.getElementById('attach-file-btn');
  const attachModal = document.getElementById('attach-modal');
  
  if (attachBtn && attachModal) {
    attachBtn.addEventListener('click', () => {
      attachModal.classList.remove('hidden');
    });
  }
  
  // Close modals
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    });
  });
  
  // Save quick note
  const saveQuickNote = document.getElementById('save-quick-note');
  if (saveQuickNote) {
    saveQuickNote.addEventListener('click', () => {
      const text = document.getElementById('quick-note-text').value;
      if (text) {
        notes.push({
          id: Date.now(),
          title: text.substring(0, 30) + '...',
          content: text,
          date: new Date().toLocaleDateString('ar-SA')
        });
        localStorage.setItem('gratech-notes', JSON.stringify(notes));
        document.getElementById('quick-note-text').value = '';
        quickNoteModal.classList.add('hidden');
        alert('✅ تم حفظ الملاحظة!');
      }
    });
  }
  
  // File drop zone
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-files');
  
  if (dropzone && fileInput) {
    browseBtn?.addEventListener('click', () => fileInput.click());
    
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
    
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('drag-over');
    });
    
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });
    
    fileInput.addEventListener('change', () => {
      handleFiles(fileInput.files);
    });
  }
}

function handleFiles(files) {
  const attachedFilesDiv = document.getElementById('attached-files');
  if (!attachedFilesDiv) return;
  
  Array.from(files).forEach(file => {
    const div = document.createElement('div');
    div.className = 'attached-file';
    div.innerHTML = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    attachedFilesDiv.appendChild(div);
  });
}

// Vault
function initVault() {
  // Load saved vault items
  const savedVault = localStorage.getItem('gratech-vault');
  if (savedVault) {
    vault = JSON.parse(savedVault);
  }
  
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.parentElement.querySelector('.hidden-key')?.textContent;
      if (key) {
        navigator.clipboard.writeText(key);
        btn.textContent = '✅';
        setTimeout(() => btn.textContent = '📋', 1500);
      }
    });
  });
  
  // Vault categories
  document.querySelectorAll('.vault-cat').forEach(cat => {
    cat.addEventListener('click', () => {
      document.querySelectorAll('.vault-cat').forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      // Filter vault items by category
      filterVault(cat.dataset.cat);
    });
  });
}

function filterVault(category) {
  // Future: filter vault items by category
  console.log('Filter vault by:', category);
}
// === ADD TO END OF renderer.js ===

// Vault Category Filter - WORKING
function filterVaultCategory(cat) {
  console.log('🔐 Filter vault:', cat);
  
  // Update active button
  document.querySelectorAll('.vault-cat').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.cat === cat) btn.classList.add('active');
  });
  
  // Show notification
  const catNames = {
    keys: '🔑 مفاتيح API',
    accounts: '👤 حسابات',
    files: '📁 ملفات مهمة',
    secrets: '🤫 أسرار'
  };
  
  showNotification('تم اختيار: ' + catNames[cat]);
}

// Make sure nav buttons work
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ GraTech Commander - Fixing buttons...');
  
  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = function() {
      const viewId = this.dataset.view;
      console.log('📍 Nav to:', viewId);
      
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      const target = document.getElementById(viewId + '-view');
      if (target) target.classList.add('active');
      
      if (viewId === 'github') loadGitHubData();
    };
  });
  
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = function() {
      const key = this.closest('.vault-item').querySelector('.hidden-key')?.textContent;
      if (key) {
        navigator.clipboard.writeText(key);
        this.textContent = '✅';
        setTimeout(() => this.textContent = '📋', 1500);
        showNotification('✅ تم النسخ!');
      }
    };
  });
  
  // Emergency stop
  const emergencyBtn = document.getElementById('emergency-stop');
  if (emergencyBtn) {
    emergencyBtn.onclick = () => {
      if (confirm('⚠️ هل أنت متأكد من إيقاف جميع العمليات؟')) {
        showNotification('�� تم إيقاف جميع العمليات!');
      }
    };
  }
  
  console.log('✅ All buttons fixed!');
});

// Notification function
function showNotification(msg) {
  let notif = document.getElementById('gratech-notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'gratech-notif';
    notif.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(26,188,156,0.95);color:white;padding:12px 24px;border-radius:8px;z-index:10000;font-family:Cairo,sans-serif;box-shadow:0 4px 15px rgba(0,0,0,0.3);';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.style.display = 'block';
  setTimeout(() => notif.style.display = 'none', 3000);
}

console.log('✨ GraTech Button Fixes Loaded');




