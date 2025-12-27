// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 GraTech Commander - COMPLETE WORKING VERSION
// By Suliman Nazal Alshammari | @Grar00t | @GrAxOS
// "بذمة وصدق - This ACTUALLY works!"
// ═══════════════════════════════════════════════════════════════════════════════

// 🌍 TRANSLATIONS
const TRANSLATIONS = {
  ar: { chat:'💬 المحادثة', vault:'🔐 الخزنة', notes:'📝 ملاحظاتي', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 حساباتي', settings:'⚙️ الإعدادات', safety:'🛡️ الحماية', send:'إرسال ▶', thinking:'⏳ جاري التفكير...', placeholder:'اكتب بالعربي براحتك... 😊', saved:'✅ تم الحفظ!' },
  en: { chat:'💬 Chat', vault:'🔐 Vault', notes:'📝 Notes', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 Accounts', settings:'⚙️ Settings', safety:'🛡️ Safety', send:'Send ▶', thinking:'⏳ Thinking...', placeholder:'Type your message...', saved:'✅ Saved!' },
  fr: { chat:'💬 Discussion', vault:'🔐 Coffre', notes:'📝 Notes', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 Comptes', settings:'⚙️ Paramètres', safety:'🛡️ Sécurité', send:'Envoyer ▶', thinking:'⏳ Réflexion...', placeholder:'Tapez votre message...', saved:'✅ Sauvegardé!' },
  de: { chat:'💬 Chat', vault:'🔐 Tresor', notes:'📝 Notizen', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 Konten', settings:'⚙️ Einstellungen', safety:'🛡️ Sicherheit', send:'Senden ▶', thinking:'⏳ Denke...', placeholder:'Nachricht eingeben...', saved:'✅ Gespeichert!' },
  es: { chat:'💬 Chat', vault:'🔐 Bóveda', notes:'📝 Notas', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 Cuentas', settings:'⚙️ Configuración', safety:'🛡️ Seguridad', send:'Enviar ▶', thinking:'⏳ Pensando...', placeholder:'Escribe tu mensaje...', saved:'✅ ¡Guardado!' },
  zh: { chat:'💬 聊天', vault:'🔐 保险库', notes:'📝 笔记', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 账户', settings:'⚙️ 设置', safety:'🛡️ 安全', send:'发送 ▶', thinking:'⏳ 思考中...', placeholder:'输入消息...', saved:'✅ 已保存!' },
  ja: { chat:'💬 チャット', vault:'🔐 金庫', notes:'📝 メモ', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 アカウント', settings:'⚙️ 設定', safety:'🛡️ セキュリティ', send:'送信 ▶', thinking:'⏳ 考え中...', placeholder:'メッセージを入力...', saved:'✅ 保存しました!' },
  ko: { chat:'💬 채팅', vault:'🔐 금고', notes:'📝 메모', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 계정', settings:'⚙️ 설정', safety:'🛡️ 보안', send:'보내기 ▶', thinking:'⏳ 생각 중...', placeholder:'메시지 입력...', saved:'✅ 저장됨!' },
  tr: { chat:'💬 Sohbet', vault:'🔐 Kasa', notes:'📝 Notlar', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 Hesaplar', settings:'⚙️ Ayarlar', safety:'🛡️ Güvenlik', send:'Gönder ▶', thinking:'⏳ Düşünüyor...', placeholder:'Mesajınızı yazın...', saved:'✅ Kaydedildi!' },
  ru: { chat:'💬 Чат', vault:'🔐 Хранилище', notes:'📝 Заметки', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 Аккаунты', settings:'⚙️ Настройки', safety:'🛡️ Безопасность', send:'Отправить ▶', thinking:'⏳ Думаю...', placeholder:'Введите сообщение...', saved:'✅ Сохранено!' },
  hi: { chat:'💬 चैट', vault:'🔐 तिजोरी', notes:'📝 नोट्स', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 खाते', settings:'⚙️ सेटिंग्स', safety:'🛡️ सुरक्षा', send:'भेजें ▶', thinking:'⏳ सोच रहा...', placeholder:'संदेश लिखें...', saved:'✅ सहेजा गया!' },
  ur: { chat:'💬 چیٹ', vault:'🔐 خزانہ', notes:'📝 نوٹس', github:'🐙 GitHub', azure:'☁️ Azure', accounts:'👤 اکاؤنٹس', settings:'⚙️ ترتیبات', safety:'🛡️ سیکورٹی', send:'بھیجیں ▶', thinking:'⏳ سوچ رہا...', placeholder:'پیغام لکھیں...', saved:'✅ محفوظ!' }
};

let currentLang = 'ar';
let isLoading = false;

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 INIT
// ═══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ GraTech Commander Starting...');
  currentLang = localStorage.getItem('gratech_lang') || 'ar';
  
  initLanguage();
  initNavigation();
  initChat();
  initSettings();
  initModals();
  updateUI();
  
  console.log('✅ Ready!');
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 LANGUAGE - WORKING!
// ═══════════════════════════════════════════════════════════════════════════════
function t(key) { return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key; }

function initLanguage() {
  const sel = document.getElementById('language-select');
  if (!sel) return;
  sel.value = currentLang;
  sel.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('gratech_lang', currentLang);
    updateUI();
    showNotification(t('saved'));
  });
}

function updateUI() {
  // Direction
  const rtl = ['ar','ur'].includes(currentLang);
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  
  // Nav buttons
  const keys = ['chat','vault','notes','github','azure','accounts','settings','safety'];
  document.querySelectorAll('.nav-btn').forEach((btn,i) => {
    if (keys[i]) btn.textContent = t(keys[i]);
  });
  
  // Other elements
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.textContent = t('send');
  
  const input = document.getElementById('message-input');
  if (input) input.placeholder = t('placeholder');
  
  console.log('🌍 Lang:', currentLang, rtl ? 'RTL' : 'LTR');
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📍 NAVIGATION - WORKING!
// ═══════════════════════════════════════════════════════════════════════════════
function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const viewId = this.dataset.view;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById(viewId + '-view')?.classList.add('active');
      console.log('📍', viewId);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💬 CHAT - REAL AI!
// ═══════════════════════════════════════════════════════════════════════════════
function initChat() {
  document.getElementById('send-btn')?.addEventListener('click', sendMessage);
  document.getElementById('message-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  document.querySelectorAll('.quick-prompt').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = document.getElementById('message-input');
      if (input) { input.value = this.textContent.replace(/^[^\s]+\s/,''); input.focus(); }
    });
  });
}

async function sendMessage() {
  const input = document.getElementById('message-input');
  const container = document.getElementById('chat-container');
  const model = document.getElementById('model-select')?.value || 'gpt-4o';
  
  const msg = input?.value?.trim();
  if (!msg || isLoading) return;
  
  // Remove welcome
  container.querySelector('.welcome-message')?.remove();
  
  // Add user msg
  addMessage(msg, 'user');
  input.value = '';
  isLoading = true;
  
  // Loading
  const loadId = 'load-' + Date.now();
  const loadDiv = document.createElement('div');
  loadDiv.className = 'message assistant';
  loadDiv.id = loadId;
  loadDiv.textContent = t('thinking');
  container.appendChild(loadDiv);
  container.scrollTop = container.scrollHeight;
  
  try {
    const result = await window.GraTechAI.send(msg, model);
    document.getElementById(loadId)?.remove();
    
    if (result.success) {
      addMessage(result.message, 'assistant');
      if (result.remaining !== undefined) {
        showNotification(`✅ ${result.model} | ${result.remaining} left`);
      }
    } else {
      addMessage(result.error, 'assistant');
    }
  } catch (err) {
    document.getElementById(loadId)?.remove();
    addMessage('❌ ' + err.message, 'assistant');
  }
  
  isLoading = false;
}

function addMessage(content, role) {
  const container = document.getElementById('chat-container');
  const div = document.createElement('div');
  div.className = 'message ' + role;
  div.innerHTML = content.replace(/```(\w*)\n?([\s\S]*?)```/g,'<pre><code>$2</code></pre>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\n/g,'<br>');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

window.insertPrompt = (text) => {
  const input = document.getElementById('message-input');
  if (input) { input.value = text + ' '; input.focus(); }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ⚙️ SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════
function initSettings() {
  document.getElementById('azure-api-key').value = localStorage.getItem('gratech_api_key') || '';
  document.getElementById('azure-endpoint').value = localStorage.getItem('gratech_endpoint') || '';
  document.getElementById('github-token').value = localStorage.getItem('gratech_github') || '';
  
  document.getElementById('save-settings')?.addEventListener('click', () => {
    const k = document.getElementById('azure-api-key').value;
    const e = document.getElementById('azure-endpoint').value;
    const g = document.getElementById('github-token').value;
    if (k) localStorage.setItem('gratech_api_key', k); else localStorage.removeItem('gratech_api_key');
    if (e) localStorage.setItem('gratech_endpoint', e); else localStorage.removeItem('gratech_endpoint');
    if (g) localStorage.setItem('gratech_github', g); else localStorage.removeItem('gratech_github');
    showNotification(t('saved'));
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 MODALS
// ═══════════════════════════════════════════════════════════════════════════════
function initModals() {
  document.getElementById('quick-note-btn')?.addEventListener('click', () => document.getElementById('quick-note-modal')?.classList.remove('hidden'));
  document.getElementById('attach-file-btn')?.addEventListener('click', () => document.getElementById('attach-modal')?.classList.remove('hidden'));
  document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', () => document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'))));
  
  document.getElementById('save-quick-note')?.addEventListener('click', () => {
    const txt = document.getElementById('quick-note-text').value;
    if (txt) {
      const notes = JSON.parse(localStorage.getItem('gratech_notes')||'[]');
      notes.push({text:txt, date:new Date().toISOString()});
      localStorage.setItem('gratech_notes', JSON.stringify(notes));
      document.getElementById('quick-note-text').value = '';
      document.getElementById('quick-note-modal').classList.add('hidden');
      showNotification('✅');
    }
  });
  
  document.getElementById('emergency-stop')?.addEventListener('click', () => {
    isLoading = false;
    document.querySelectorAll('[id^="load-"]').forEach(el => el.remove());
    showNotification('🚨 Stopped!');
  });
  
  document.querySelectorAll('.vault-cat').forEach(b => b.addEventListener('click', function() {
    document.querySelectorAll('.vault-cat').forEach(x => x.classList.remove('active'));
    this.classList.add('active');
  }));
  
  document.querySelectorAll('.copy-btn').forEach(b => b.addEventListener('click', function() {
    const k = this.closest('.vault-item')?.querySelector('.hidden-key')?.textContent;
    if (k) { navigator.clipboard.writeText(k); this.textContent = '✅'; setTimeout(() => this.textContent = '📋', 1500); }
  }));
  
  document.getElementById('browse-files')?.addEventListener('click', () => document.getElementById('file-input')?.click());
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔔 NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════
function showNotification(msg) {
  let n = document.getElementById('gratech-notif');
  if (!n) {
    n = document.createElement('div');
    n.id = 'gratech-notif';
    n.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#00d4ff,#7c3aed);color:white;padding:15px 30px;border-radius:30px;z-index:10000;font-family:Cairo,sans-serif;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.3);';
    document.body.appendChild(n);
  }
  n.textContent = msg;
  n.style.display = 'block';
  setTimeout(() => n.style.display = 'none', 3000);
}
window.showNotification = showNotification;

console.log('✨ GraTech Ready - ALL WORKING!');
