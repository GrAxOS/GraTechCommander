// ============================================
// 🎉 GraTech Commander - Onboarding Wizard
// By Suliman Alshammari @Grar00t
// "Your AI, Your Way, Your Language" 🌍
// ============================================

let currentStep = 1;
const totalSteps = 5;
let selectedModel = 'gpt-4.1';
let selectedApiOption = 'demo';

// Check if onboarding completed before
document.addEventListener('DOMContentLoaded', () => {
  const onboardingCompleted = localStorage.getItem('gratech_onboarding_completed');
  
  if (onboardingCompleted === 'true') {
    hideOnboarding();
  }
  
  // Initialize language-aware onboarding
  initOnboardingI18n();
});

// Initialize onboarding with i18n
function initOnboardingI18n() {
  // Listen for language changes
  window.addEventListener('languageChanged', (e) => {
    updateOnboardingLanguage(e.detail.lang);
  });
  
  // Set initial language
  const savedLang = localStorage.getItem('gratech_lang') || 'ar';
  updateOnboardingLanguage(savedLang);
}

// Update onboarding text based on language
function updateOnboardingLanguage(lang) {
  if (!window.i18n || !window.i18n[lang]) return;
  
  const t = window.i18n[lang];
  
  // Step 1: Welcome
  const welcomeTitle = document.querySelector('.onboarding-step[data-step="1"] .gradient-text');
  if (welcomeTitle) welcomeTitle.textContent = t.welcome || welcomeTitle.textContent;
  
  const subtitle = document.querySelector('.onboarding-step[data-step="1"] .subtitle');
  if (subtitle) subtitle.textContent = t.subtitle || subtitle.textContent;
  
  // Features
  const featureCards = document.querySelectorAll('.feature-card p');
  if (featureCards.length >= 4) {
    featureCards[0].textContent = t.feature_models || featureCards[0].textContent;
    featureCards[1].textContent = t.feature_privacy || featureCards[1].textContent;
    featureCards[2].textContent = t.feature_arabic || featureCards[2].textContent;
    featureCards[3].textContent = t.feature_safety || featureCards[3].textContent;
  }
  
  // Buttons
  document.querySelectorAll('.onboarding-btn.primary').forEach(btn => {
    if (btn.onclick?.toString().includes('nextStep')) {
      btn.innerHTML = t.next || btn.innerHTML;
    }
    if (btn.onclick?.toString().includes('finishOnboarding')) {
      btn.innerHTML = t.startChat || btn.innerHTML;
    }
  });
  
  document.querySelectorAll('.onboarding-btn.secondary').forEach(btn => {
    btn.innerHTML = t.back || btn.innerHTML;
  });
  
  // Step 2: Model Selection
  const modelTitle = document.querySelector('.onboarding-step[data-step="2"] h2');
  if (modelTitle) modelTitle.textContent = t.chooseModel || modelTitle.textContent;
  
  // Step 3: API Setup
  const apiTitle = document.querySelector('.onboarding-step[data-step="3"] h2');
  if (apiTitle) apiTitle.textContent = t.apiSetup || apiTitle.textContent;
  
  // Step 4: Safety
  const safetyTitle = document.querySelector('.onboarding-step[data-step="4"] h2');
  if (safetyTitle) safetyTitle.textContent = t.safetyTitle || safetyTitle.textContent;
  
  // Step 5: Ready
  const readyTitle = document.querySelector('.onboarding-step[data-step="5"] .gradient-text');
  if (readyTitle) readyTitle.textContent = t.ready || readyTitle.textContent;
}

// Navigate to next step
function nextStep() {
  if (currentStep < totalSteps) {
    const currentEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    currentEl.classList.remove('active');
    currentEl.style.animation = 'slideOut 0.3s ease forwards';
    
    currentStep++;
    
    setTimeout(() => {
      const nextEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
      nextEl.classList.add('active');
      nextEl.style.animation = 'slideIn 0.5s ease';
      updateProgressDots();
    }, 300);
  }
}

// Navigate to previous step
function prevStep() {
  if (currentStep > 1) {
    const currentEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    currentEl.classList.remove('active');
    
    currentStep--;
    
    const prevEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    prevEl.classList.add('active');
    updateProgressDots();
  }
}

// Update progress dots
function updateProgressDots() {
  document.querySelectorAll('.progress-dots .dot').forEach(dot => {
    const step = parseInt(dot.dataset.step);
    if (step === currentStep) {
      dot.classList.add('active');
    } else if (step < currentStep) {
      dot.classList.add('completed');
      dot.classList.remove('active');
    } else {
      dot.classList.remove('active', 'completed');
    }
  });
}

// Select AI Model
function selectModel(element) {
  // Remove selection from all
  document.querySelectorAll('.model-option').forEach(opt => {
    opt.classList.remove('selected');
    opt.style.transform = '';
  });
  
  // Add to clicked with animation
  element.classList.add('selected');
  element.style.transform = 'scale(1.02)';
  selectedModel = element.dataset.model;
  
  // Save to localStorage
  localStorage.setItem('gratech_default_model', selectedModel);
  
  // Haptic feedback on mobile
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

// Select API Option
function selectApiOption(element) {
  // Remove selection from all
  document.querySelectorAll('.api-option').forEach(opt => opt.classList.remove('selected'));
  // Add to clicked
  element.classList.add('selected');
  selectedApiOption = element.dataset.option;
  
  // Show/hide BYOK fields with animation
  const byokFields = document.getElementById('byok-fields');
  if (selectedApiOption === 'byok') {
    byokFields.classList.remove('hidden');
    byokFields.style.animation = 'slideIn 0.3s ease';
  } else {
    byokFields.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      byokFields.classList.add('hidden');
    }, 300);
  }
}

// Finish onboarding
function finishOnboarding() {
  // Save settings
  localStorage.setItem('gratech_onboarding_completed', 'true');
  localStorage.setItem('gratech_default_model', selectedModel);
  
  // Save API key if provided
  const apiKey = document.getElementById('setup-api-key')?.value;
  const endpoint = document.getElementById('setup-endpoint')?.value;
  
  if (apiKey) {
    localStorage.setItem('gratech_api_key', apiKey);
  }
  if (endpoint) {
    localStorage.setItem('gratech_endpoint', endpoint);
  }
  
  // Save consent preferences
  const consents = {};
  document.querySelectorAll('.consent-item input').forEach((checkbox, index) => {
    consents[`consent_${index}`] = checkbox.checked;
  });
  localStorage.setItem('gratech_consents', JSON.stringify(consents));
  
  // Hide onboarding with animation
  hideOnboarding();
  
  // Update model selector in main app
  const modelSelect = document.getElementById('model-select');
  if (modelSelect) {
    modelSelect.value = selectedModel;
  }
  
  // Show welcome toast (language-aware)
  const lang = localStorage.getItem('gratech_lang') || 'ar';
  const welcomeMessages = {
    ar: '🎉 مرحباً بك في GraTech Commander!',
    en: '🎉 Welcome to GraTech Commander!',
    fr: '🎉 Bienvenue sur GraTech Commander!',
    de: '🎉 Willkommen bei GraTech Commander!',
    es: '🎉 ¡Bienvenido a GraTech Commander!',
    zh: '🎉 欢迎使用 GraTech Commander!',
    ja: '🎉 GraTech Commander へようこそ!',
    ko: '🎉 GraTech Commander에 오신 것을 환영합니다!',
    tr: '🎉 GraTech Commander\'a Hoş Geldiniz!',
    ru: '🎉 Добро пожаловать в GraTech Commander!',
    hi: '🎉 GraTech Commander में आपका स्वागत है!',
    ur: '🎉 GraTech Commander میں خوش آمدید!'
  };
  
  showToast(welcomeMessages[lang] || welcomeMessages.en);
}

// Skip onboarding permanently
function skipOnboarding() {
  localStorage.setItem('gratech_onboarding_completed', 'true');
  hideOnboarding();
}

// Hide onboarding overlay
function hideOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.5s ease forwards';
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.style.display = 'none';
    }, 500);
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = message;
  
  const bgColors = {
    success: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
    info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  };
  
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: ${bgColors[type] || bgColors.success};
    color: white;
    padding: 15px 30px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: toastSlideUp 0.5s ease, toastFadeOut 0.5s ease 2.5s forwards;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Insert prompt in chat input
function insertPrompt(text) {
  const input = document.getElementById('message-input');
  if (input) {
    input.value = text + ' ';
    input.focus();
    
    // Trigger input event for any listeners
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-30px); }
  }
  @keyframes toastSlideUp {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes toastFadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .progress-dots .dot.completed {
    background: #10b981;
  }
`;
document.head.appendChild(style);

// Reset onboarding (for testing)
function resetOnboarding() {
  localStorage.removeItem('gratech_onboarding_completed');
  localStorage.removeItem('gratech_default_model');
  localStorage.removeItem('gratech_api_key');
  localStorage.removeItem('gratech_endpoint');
  localStorage.removeItem('gratech_consents');
  location.reload();
}

// Expose functions globally
window.nextStep = nextStep;
window.prevStep = prevStep;
window.selectModel = selectModel;
window.selectApiOption = selectApiOption;
window.finishOnboarding = finishOnboarding;
window.skipOnboarding = skipOnboarding;
window.insertPrompt = insertPrompt;
window.resetOnboarding = resetOnboarding;
window.showToast = showToast;

console.log('🎉 GraTech Onboarding loaded!');
console.log('🌍 i18n support enabled for 12 languages');
console.log('💡 To reset onboarding: resetOnboarding()');
