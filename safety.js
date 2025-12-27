// GraTech Commander - Safety System
// نظام الحماية الذكي - By Suliman Alshammari
// "أنا هنا لخدمتك، مو أداة عليك"

const fs = require('fs');
const path = require('path');

// مستويات الخطورة
const RISK_LEVELS = {
  SAFE: { level: 0, color: '🟢', name: 'آمن', nameEn: 'Safe' },
  LOW: { level: 1, color: '🟡', name: 'منخفض', nameEn: 'Low' },
  MEDIUM: { level: 2, color: '🟠', name: 'متوسط', nameEn: 'Medium' },
  HIGH: { level: 3, color: '🔴', name: 'عالي', nameEn: 'High' },
  CRITICAL: { level: 4, color: '⛔', name: 'حرج جداً', nameEn: 'Critical' }
};

// أنواع العمليات
const ACTION_TYPES = {
  READ: { risk: RISK_LEVELS.SAFE, icon: '👁️', name: 'قراءة' },
  CREATE: { risk: RISK_LEVELS.LOW, icon: '✨', name: 'إنشاء' },
  MODIFY: { risk: RISK_LEVELS.MEDIUM, icon: '✏️', name: 'تعديل' },
  DELETE: { risk: RISK_LEVELS.HIGH, icon: '🗑️', name: 'حذف' },
  EXECUTE: { risk: RISK_LEVELS.MEDIUM, icon: '⚡', name: 'تنفيذ' },
  DEPLOY: { risk: RISK_LEVELS.HIGH, icon: '🚀', name: 'نشر' },
  DESTROY: { risk: RISK_LEVELS.CRITICAL, icon: '💥', name: 'تدمير' }
};

// سجل الموافقات
const CONSENT_LOG_PATH = path.join(__dirname, 'consent_log.json');

class SafetySystem {
  constructor() {
    this.consentLog = this.loadConsentLog();
    this.pendingActions = new Map();
  }

  // تحميل سجل الموافقات
  loadConsentLog() {
    try {
      if (fs.existsSync(CONSENT_LOG_PATH)) {
        return JSON.parse(fs.readFileSync(CONSENT_LOG_PATH, 'utf8'));
      }
    } catch (e) {
      console.error('Error loading consent log:', e);
    }
    return { consents: [], denials: [] };
  }

  // حفظ سجل الموافقات
  saveConsentLog() {
    try {
      fs.writeFileSync(CONSENT_LOG_PATH, JSON.stringify(this.consentLog, null, 2));
    } catch (e) {
      console.error('Error saving consent log:', e);
    }
  }

  // إنشاء طلب تأكيد
  createConfirmationRequest(action) {
    const actionId = `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const request = {
      id: actionId,
      timestamp: new Date().toISOString(),
      action: action.type,
      target: action.target,
      risk: this.assessRisk(action),
      explanation: this.generateExplanation(action),
      consequences: this.predictConsequences(action),
      alternatives: this.suggestAlternatives(action),
      reversible: this.isReversible(action),
      status: 'pending'
    };

    this.pendingActions.set(actionId, request);
    return request;
  }

  // تقييم المخاطر
  assessRisk(action) {
    const baseRisk = ACTION_TYPES[action.type]?.risk || RISK_LEVELS.MEDIUM;
    
    // زيادة الخطورة حسب الهدف
    let riskLevel = baseRisk.level;
    
    if (action.target?.includes('azure') || action.target?.includes('cloud')) {
      riskLevel = Math.min(riskLevel + 1, 4);
    }
    
    if (action.target?.includes('delete') || action.target?.includes('remove')) {
      riskLevel = Math.min(riskLevel + 1, 4);
    }
    
    if (action.target?.includes('production') || action.target?.includes('prod')) {
      riskLevel = Math.min(riskLevel + 2, 4);
    }

    return Object.values(RISK_LEVELS).find(r => r.level === riskLevel) || RISK_LEVELS.MEDIUM;
  }

  // توليد الشرح
  generateExplanation(action) {
    const templates = {
      READ: `سأقرأ ${action.target} - هذا آمن ولن يغير شيء.`,
      CREATE: `سأنشئ ${action.target} - هذا سيضيف شيء جديد.`,
      MODIFY: `سأعدل ${action.target} - هذا سيغير المحتوى الموجود.`,
      DELETE: `⚠️ سأحذف ${action.target} - هذا قد يكون غير قابل للاسترجاع!`,
      EXECUTE: `سأنفذ الأمر: ${action.command || action.target}`,
      DEPLOY: `🚀 سأنشر ${action.target} - هذا سيؤثر على البيئة الحية!`,
      DESTROY: `💥 تحذير خطير! سأدمر ${action.target} - هذا لا يمكن التراجع عنه!`
    };

    return templates[action.type] || `سأنفذ: ${action.description || action.type}`;
  }

  // توقع العواقب
  predictConsequences(action) {
    const consequences = [];

    if (action.type === 'DELETE' || action.type === 'DESTROY') {
      consequences.push({
        type: 'warning',
        message: '⚠️ البيانات المحذوفة قد لا يمكن استرجاعها'
      });
    }

    if (action.target?.includes('azure')) {
      consequences.push({
        type: 'cost',
        message: '💰 قد يؤثر على تكاليف Azure'
      });
    }

    if (action.type === 'DEPLOY') {
      consequences.push({
        type: 'impact',
        message: '🌐 سيؤثر على المستخدمين الحاليين'
      });
    }

    if (action.type === 'EXECUTE') {
      consequences.push({
        type: 'system',
        message: '🖥️ سيتم تنفيذ أوامر على النظام'
      });
    }

    return consequences;
  }

  // اقتراح بدائل
  suggestAlternatives(action) {
    const alternatives = [];

    if (action.type === 'DELETE') {
      alternatives.push({
        action: 'ARCHIVE',
        description: '📦 أرشفة بدلاً من الحذف'
      });
      alternatives.push({
        action: 'BACKUP_THEN_DELETE',
        description: '💾 نسخ احتياطي ثم حذف'
      });
    }

    if (action.type === 'DEPLOY') {
      alternatives.push({
        action: 'DEPLOY_STAGING',
        description: '🧪 نشر في بيئة اختبار أولاً'
      });
    }

    return alternatives;
  }

  // هل العملية قابلة للتراجع؟
  isReversible(action) {
    const irreversible = ['DELETE', 'DESTROY'];
    return !irreversible.includes(action.type);
  }

  // معالجة الموافقة
  processConsent(actionId, approved, screenshot = null) {
    const action = this.pendingActions.get(actionId);
    if (!action) return null;

    const consentRecord = {
      actionId,
      timestamp: new Date().toISOString(),
      action: action.action,
      target: action.target,
      risk: action.risk.name,
      approved,
      screenshot: screenshot ? `consent_${actionId}.png` : null,
      userConfirmation: approved ? 'موافق ✅' : 'مرفوض ❌'
    };

    if (approved) {
      this.consentLog.consents.push(consentRecord);
    } else {
      this.consentLog.denials.push(consentRecord);
    }

    this.saveConsentLog();
    this.pendingActions.delete(actionId);

    return {
      success: true,
      approved,
      record: consentRecord
    };
  }

  // توليد رسالة التأكيد للمستخدم
  generateConfirmationMessage(request) {
    const risk = request.risk;
    
    let message = `
╔════════════════════════════════════════╗
║  ${risk.color} طلب تأكيد - GraTech Commander  ║
╚════════════════════════════════════════╝

🎯 العملية: ${request.action}
📍 الهدف: ${request.target}
${risk.color} مستوى الخطورة: ${risk.name}

📝 الشرح:
${request.explanation}
`;

    if (request.consequences.length > 0) {
      message += `
⚡ العواقب المحتملة:
${request.consequences.map(c => `  ${c.message}`).join('\n')}
`;
    }

    if (request.alternatives.length > 0) {
      message += `
💡 بدائل متاحة:
${request.alternatives.map(a => `  • ${a.description}`).join('\n')}
`;
    }

    message += `
${request.reversible ? '↩️ قابل للتراجع: نعم' : '⛔ قابل للتراجع: لا!'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
هل أنت موافق على تنفيذ هذه العملية؟
[موافق ✅] [مرفوض ❌] [حفظ سكرين شوت 📸]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🙏 "أنا هنا لخدمتك - القرار لك دائماً"
`;

    return message;
  }

  // الحصول على إحصائيات الموافقات
  getConsentStats() {
    return {
      totalConsents: this.consentLog.consents.length,
      totalDenials: this.consentLog.denials.length,
      recentConsents: this.consentLog.consents.slice(-5),
      recentDenials: this.consentLog.denials.slice(-5)
    };
  }
}

module.exports = { SafetySystem, RISK_LEVELS, ACTION_TYPES };
