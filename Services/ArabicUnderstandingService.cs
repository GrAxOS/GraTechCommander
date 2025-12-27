using System.Text.RegularExpressions;
using GraTechCommander.Models;

namespace GraTechCommander.Services;

/// <summary>
/// خدمة فهم اللغة العربية والنيات
/// "الخوارزمي الجديد" - يفهم العربي الحقيقي!
/// </summary>
public class ArabicUnderstandingService
{
    // قاموس اللهجة السعودية/الخليجية
    private readonly Dictionary<string, string[]> _dialectMapping = new()
    {
        // أفعال الإرادة
        ["أريد"] = new[] { "ابي", "أبي", "ابغى", "أبغى", "ودي", "حابب", "يبي", "نبي", "نبغى" },
        ["لا أريد"] = new[] { "ما ابي", "ما أبي", "مابي", "مابغى", "ما ودي", "ماودي" },
        
        // أفعال الطلب
        ["افعل"] = new[] { "سوي", "سو", "اسوي", "أسوي", "خل", "خلي", "اعمل", "أعمل" },
        ["أعطني"] = new[] { "عطني", "عطيني", "اعطني", "هات", "هاتي", "جيب", "جيبلي" },
        
        // الموافقة
        ["نعم"] = new[] { "اي", "ايه", "أي", "أيه", "اوكي", "طيب", "تمام", "زين", "اوك", "يب", "يس" },
        ["لا"] = new[] { "لأ", "لا", "نو", "مب", "مو", "مهوب", "لالا" },
        
        // التأكيد
        ["صحيح"] = new[] { "صح", "اكيد", "أكيد", "بالضبط", "مضبوط", "عدل", "ايوا", "هيه" },
        
        // الاستفهام
        ["ماذا"] = new[] { "وش", "ايش", "شو", "ويش", "شنو", "شني", "ليش", "شلون", "كيف" },
        ["لماذا"] = new[] { "ليش", "ليه", "عشان ايش", "ليشو" },
        ["أين"] = new[] { "وين", "فين", "منو" },
        ["متى"] = new[] { "متى", "ايمتى", "امتى", "وقتاش" },
        ["كم"] = new[] { "كم", "قديش", "قداش", "شقد", "شحال" },
        
        // الضمائر والإشارة
        ["هذا"] = new[] { "ذا", "هذي", "هاذي", "هالـ", "هذاك", "ذيك", "هاي" },
        ["أنت"] = new[] { "انت", "انتي", "انته", "نت", "نتي" },
        
        // التعبيرات
        ["جيد"] = new[] { "حلو", "كويس", "زين", "تمام", "ممتاز", "روعه", "رهيب", "خرافي", "جنان" },
        ["سيء"] = new[] { "خايس", "سيء", "مب زين", "مو حلو", "زفت", "خربان" },
        ["كثير"] = new[] { "واجد", "مره", "كتير", "بزاف", "هواي" },
        ["قليل"] = new[] { "شوي", "شويه", "شوية", "قليل" },
        
        // التحية
        ["مرحبا"] = new[] { "هلا", "هلا والله", "اهلين", "مرحبا", "السلام", "هاي", "الو" },
        ["شكرا"] = new[] { "مشكور", "تسلم", "يعطيك العافيه", "الله يعافيك", "ثانكس", "ثانكيو" },
        
        // الأوامر التقنية
        ["نفذ"] = new[] { "نفذ", "شغل", "رن", "اشتغل", "ابدأ", "خلص" },
        ["احذف"] = new[] { "امسح", "شيل", "احذف", "ازل", "فكنا من" },
        ["أنشئ"] = new[] { "سوي", "انشئ", "اعمل", "ابني", "بلش" },
        
        // السياق التقني
        ["الملف"] = new[] { "الفايل", "الملف", "فايل" },
        ["المجلد"] = new[] { "الفولدر", "المجلد", "فولدر" },
        ["الكود"] = new[] { "الكود", "البرمجه", "السورس" },
    };

    // أنماط النيات
    private readonly List<IntentPattern> _intentPatterns = new()
    {
        // إنشاء ملف/مشروع
        new IntentPattern
        {
            Patterns = new[] { @"سوي.*ملف", @"انشئ.*ملف", @"اعمل.*فايل", @"create.*file" },
            Intent = "CREATE_FILE",
            Confidence = 0.9
        },
        // حذف
        new IntentPattern
        {
            Patterns = new[] { @"امسح", @"احذف", @"شيل", @"delete", @"remove" },
            Intent = "DELETE",
            Confidence = 0.9
        },
        // نشر
        new IntentPattern
        {
            Patterns = new[] { @"انشر", @"رفع.*سيرفر", @"deploy", @"publish" },
            Intent = "DEPLOY",
            Confidence = 0.9
        },
        // عرض/قائمة
        new IntentPattern
        {
            Patterns = new[] { @"وريني", @"عرض", @"شوف", @"list", @"اعرض" },
            Intent = "LIST",
            Confidence = 0.8
        },
        // مساعدة/شرح
        new IntentPattern
        {
            Patterns = new[] { @"اشرح", @"وضح", @"كيف", @"شلون", @"explain", @"help" },
            Intent = "EXPLAIN",
            Confidence = 0.8
        },
        // تعديل
        new IntentPattern
        {
            Patterns = new[] { @"عدل", @"غير", @"بدل", @"edit", @"modify", @"change" },
            Intent = "MODIFY",
            Confidence = 0.8
        },
        // بحث
        new IntentPattern
        {
            Patterns = new[] { @"دور", @"ابحث", @"لقى", @"search", @"find" },
            Intent = "SEARCH",
            Confidence = 0.8
        },
        // تشغيل
        new IntentPattern
        {
            Patterns = new[] { @"شغل", @"نفذ", @"run", @"execute", @"start" },
            Intent = "RUN",
            Confidence = 0.9
        }
    };

    /// <summary>
    /// تحويل اللهجة العربية إلى فصحى
    /// </summary>
    public string NormalizeArabicDialect(string text)
    {
        var normalized = text.ToLower();
        
        foreach (var mapping in _dialectMapping)
        {
            foreach (var dialectWord in mapping.Value)
            {
                // استبدال مع الحفاظ على السياق
                normalized = Regex.Replace(
                    normalized, 
                    $@"\b{Regex.Escape(dialectWord)}\b", 
                    mapping.Key,
                    RegexOptions.IgnoreCase
                );
            }
        }
        
        return normalized;
    }

    /// <summary>
    /// تحليل النية من النص
    /// </summary>
    public IntentAnalysis AnalyzeIntent(string text)
    {
        var analysis = new IntentAnalysis
        {
            OriginalText = text,
            NormalizedText = NormalizeArabicDialect(text),
            Timestamp = DateTime.Now
        };

        // تحليل النية
        foreach (var pattern in _intentPatterns)
        {
            foreach (var regex in pattern.Patterns)
            {
                if (Regex.IsMatch(analysis.NormalizedText, regex, RegexOptions.IgnoreCase))
                {
                    analysis.PrimaryIntent = pattern.Intent;
                    analysis.Confidence = pattern.Confidence;
                    analysis.MatchedPattern = regex;
                    break;
                }
            }
            if (!string.IsNullOrEmpty(analysis.PrimaryIntent)) break;
        }

        // استخراج الكيانات
        analysis.Entities = ExtractEntities(analysis.NormalizedText);
        
        // تحليل المشاعر
        analysis.Sentiment = AnalyzeSentiment(text);
        
        // تحديد الأولوية
        analysis.Priority = DeterminePriority(text);

        return analysis;
    }

    /// <summary>
    /// استخراج الكيانات من النص
    /// </summary>
    private Dictionary<string, string> ExtractEntities(string text)
    {
        var entities = new Dictionary<string, string>();

        // استخراج المسارات
        var pathMatch = Regex.Match(text, @"([A-Za-z]:\\[^\s]+|/[^\s]+)");
        if (pathMatch.Success)
            entities["path"] = pathMatch.Value;

        // استخراج أسماء الملفات
        var fileMatch = Regex.Match(text, @"(\w+\.\w{2,4})");
        if (fileMatch.Success)
            entities["filename"] = fileMatch.Value;

        // استخراج URLs
        var urlMatch = Regex.Match(text, @"(https?://[^\s]+)");
        if (urlMatch.Success)
            entities["url"] = urlMatch.Value;

        // استخراج الأسماء بين علامات الاقتباس
        var quotedMatch = Regex.Match(text, @"[""']([^""']+)[""']");
        if (quotedMatch.Success)
            entities["quoted"] = quotedMatch.Groups[1].Value;

        // استخراج الأرقام
        var numberMatch = Regex.Match(text, @"\b(\d+)\b");
        if (numberMatch.Success)
            entities["number"] = numberMatch.Value;

        return entities;
    }

    /// <summary>
    /// تحليل المشاعر
    /// </summary>
    private string AnalyzeSentiment(string text)
    {
        var positiveWords = new[] { "حلو", "ممتاز", "رائع", "شكرا", "تمام", "زين", "جيد", "يعطيك العافيه" };
        var negativeWords = new[] { "سيء", "خايس", "مشكله", "خطأ", "فشل", "ما يشتغل", "خربان" };
        var urgentWords = new[] { "ضروري", "بسرعه", "الحين", "فوري", "عاجل", "مستعجل" };

        var lowerText = text.ToLower();

        if (urgentWords.Any(w => lowerText.Contains(w)))
            return "Urgent";
        if (negativeWords.Any(w => lowerText.Contains(w)))
            return "Negative";
        if (positiveWords.Any(w => lowerText.Contains(w)))
            return "Positive";

        return "Neutral";
    }

    /// <summary>
    /// تحديد الأولوية
    /// </summary>
    private string DeterminePriority(string text)
    {
        var lowerText = text.ToLower();
        
        if (lowerText.Contains("حرج") || lowerText.Contains("خطير") || lowerText.Contains("طوارئ"))
            return "Critical";
        if (lowerText.Contains("ضروري") || lowerText.Contains("مهم") || lowerText.Contains("بسرعه"))
            return "High";
        if (lowerText.Contains("لما تفضى") || lowerText.Contains("عادي") || lowerText.Contains("مو مستعجل"))
            return "Low";
            
        return "Normal";
    }

    /// <summary>
    /// توليد رد مناسب باللهجة
    /// </summary>
    public string GenerateDialectResponse(string intent, bool success, string? details = null)
    {
        var responses = new Dictionary<string, (string success, string failure)>
        {
            ["CREATE_FILE"] = ("تم يالغالي! سويت لك الملف ✅", "ما قدرت أسوي الملف 😅 شيك المسار"),
            ["DELETE"] = ("تم المسح! راح في داهية 🗑️", "ما قدرت أمسحه، يمكن مو موجود أو محمي"),
            ["DEPLOY"] = ("تم النشر! الموقع شغال الحين 🚀", "فشل النشر، شيك الإعدادات"),
            ["LIST"] = ("هذي القائمة يالغالي 📋", "ما لقيت شي 🤷"),
            ["EXPLAIN"] = ("خلني أشرح لك 📚", "مو متأكد، بس خلني أحاول"),
            ["MODIFY"] = ("تم التعديل! ✏️", "ما قدرت أعدل، شيك الصلاحيات"),
            ["SEARCH"] = ("لقيت! 🔍", "ما لقيت شي بهالاسم"),
            ["RUN"] = ("شغال! ⚡", "ما اشتغل، فيه خطأ"),
        };

        if (responses.TryGetValue(intent, out var msgs))
        {
            var response = success ? msgs.success : msgs.failure;
            if (!string.IsNullOrEmpty(details))
                response += $"\n\n{details}";
            return response;
        }

        return success ? "تم! ✅" : "ما قدرت 😅";
    }
}

#region Models

public class IntentPattern
{
    public string[] Patterns { get; set; } = Array.Empty<string>();
    public string Intent { get; set; } = "";
    public double Confidence { get; set; }
}

public class IntentAnalysis
{
    public string OriginalText { get; set; } = "";
    public string NormalizedText { get; set; } = "";
    public string PrimaryIntent { get; set; } = "UNKNOWN";
    public double Confidence { get; set; }
    public string? MatchedPattern { get; set; }
    public Dictionary<string, string> Entities { get; set; } = new();
    public string Sentiment { get; set; } = "Neutral";
    public string Priority { get; set; } = "Normal";
    public DateTime Timestamp { get; set; }
}

#endregion
