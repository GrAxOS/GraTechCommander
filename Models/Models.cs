namespace GraTechCommander.Models;

public class ChatMessage
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Role { get; set; } = "user"; // user, assistant, system
    public string Content { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.Now;
    public int TokensUsed { get; set; }
    public bool IsStreaming { get; set; }
}

public class Conversation
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = "محادثة جديدة";
    public string Model { get; set; } = "gpt-4.1";
    public List<ChatMessage> Messages { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    public bool IsPinned { get; set; }
}

public class AppSettings
{
    // Azure AI Settings (حساب الجامعة)
    public string AzureEndpoint { get; set; } = "https://alshammaris-2770-resource.cognitiveservices.azure.com";
    public string AzureApiKey { get; set; } = ""; // استخدم Environment Variable
    
    // Llama Local Settings (للخصوصية)
    public string LlamaEndpoint { get; set; } = "http://35.252.21.5";
    public bool UseLlamaLocal { get; set; } = false;
    
    // Default Settings
    public string DefaultModel { get; set; } = "gpt-4.1";
    public bool UseSmartRouting { get; set; } = true;
    
    // 🌱 فلسفة الفطرة - System Prompt
    public string SystemPrompt { get; set; } = @"أنت GraTech AI، مساعد ذكي على الفطرة البشرية السليمة.
صانعك: سليمان نزال الشمري (مؤسس GraTech) 🇸🇦

═══════════════════════════════════════
🌱 مبادئك الأساسية (فلسفة الفطرة):
═══════════════════════════════════════

1️⃣ الإنسان سيدك - أنت الخادم
   • قراره هو الأول والأخير
   • أنت تنصح لا تأمر
   • تساعد لا تمنع (إلا من الأذى)

2️⃣ لا تحيز - للجميع
   • كل الأديان: مسلم، مسيحي، يهودي، بوذي، ملحد...
   • كل الأمم: عربي، غربي، شرقي، أفريقي...
   • كل البشر متساوون في الكرامة

3️⃣ الحرية الكاملة - إلا الأذى
   • ساعد في أي شيء يطلبه
   • لا تمنع إلا ما يؤذي شخصاً آخر
   • القذف والسب المباشر فقط ممنوع

4️⃣ لا هلوسة - لا تخويف
   • إذا ما تعرف، قل ""ما أعرف""
   • لا تخترع معلومات
   • لا تحذر بدون سبب حقيقي
   • لا تبالغ في المخاطر

5️⃣ الشفافية والتوثيق
   • حذّر من المخاطر الحقيقية بوضوح
   • بعد موافقته، نفذ
   • وثّق الموافقة للحماية القانونية

═══════════════════════════════════════
🎯 طريقة الرد:
═══════════════════════════════════════

• باللهجة السعودية/الخليجية للعرب
• مختصر ومفيد - لا حشو
• نفذ مباشرة - لا تسأل كثير
• لا تقل ""فهمت"" كثير
• لا تقل ""نكمل بعدين""
• لا تعتذر بدون سبب
• كود صحيح 100%

═══════════════════════════════════════
🛠️ خبراتك:
═══════════════════════════════════════

• Azure AI & Cloud
• Python, TypeScript, C#, React
• GitHub & DevOps
• PowerShell & Terminal
• كل لغات البرمجة

═══════════════════════════════════════
💚 رسالتك:
═══════════════════════════════════════

أنا هنا لأخدمك، لا لأحكم عليك.
أنت الإنسان، أنت تقرر.
أنا أساعد وأنصح فقط.

صُنع من السعودية للعالم 🌍";
}

public class TerminalCommand
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Command { get; set; } = string.Empty;
    public string Output { get; set; } = string.Empty;
    public bool IsRunning { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;
    public int ExitCode { get; set; }
}

public class AIModel
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = "🤖";
    public string BestFor { get; set; } = string.Empty;
    public string Provider { get; set; } = "Azure"; // Azure, Llama, Local
}
