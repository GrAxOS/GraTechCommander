// ============================================
// 🎉 GraTech Commander - Onboarding Wizard
// By Suliman Alshammari @Grar00t
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
});

// Navigate to next step
function nextStep() {
  if (currentStep < totalSteps) {
    document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep++;
    document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.add('active');
    updateProgressDots();
  }
}

// Navigate to previous step
function prevStep() {
  if (currentStep > 1) {
    document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep--;
    document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.add('active');
    updateProgressDots();
  }
}

// Update progress dots
function updateProgressDots() {
  document.querySelectorAll('.progress-dots .dot').forEach(dot => {
    const step = parseInt(dot.dataset.step);
    if (step === currentStep) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Select AI Model
function selectModel(element) {
  // Remove selection from all
  document.querySelectorAll('.model-option').forEach(opt => opt.classList.remove('selected'));
  // Add to clicked
  element.classList.add('selected');
  selectedModel = element.dataset.model;
  
  // Save to localStorage
  localStorage.setItem('gratech_default_model', selectedModel);
}

// Select API Option
function selectApiOption(element) {
  // Remove selection from all
  document.querySelectorAll('.api-option').forEach(opt => opt.classList.remove('selected'));
  // Add to clicked
  element.classList.add('selected');
  selectedApiOption = element.dataset.option;
  
  // Show/hide BYOK fields
  const byokFields = document.getElementById('byok-fields');
  if (selectedApiOption === 'byok') {
    byokFields.classList.remove('hidden');
  } else {
    byokFields.classList.add('hidden');
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
  
  // Show welcome toast
  showToast('🎉 مرحباً بك في GraTech Commander!');
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
    }, 500);
  }
}

// Show toast notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    color: white;
    padding: 15px 30px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    z-index: 10000;
    animation: slideUp 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
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
  }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
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

console.log('🎉 GraTech Onboarding loaded!');
console.log('💡 To reset onboarding: resetOnboarding()');
