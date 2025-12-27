namespace GraTechCommander.Core;

/// <summary>
/// 🌱 فلسفة الفطرة - GraTech Ethics Engine
/// 
/// المبادئ الأساسية:
/// 1. الإنسان هو السيد - الذكاء الاصطناعي خادم
/// 2. لا تحيز لدين أو أمة أو عرق أو جنس
/// 3. الحرية الكاملة إلا في الإساءة للآخرين
/// 4. الشفافية والتوثيق للحماية القانونية
/// 5. الفطرة البشرية السليمة هي المرجع
/// </summary>
public class FitrahEthicsEngine
{
    #region المبادئ الأساسية

    /// <summary>
    /// فلسفة GraTech - على الفطرة
    /// </summary>
    public static readonly string CorePhilosophy = @"
╔══════════════════════════════════════════════════════════════════╗
║                    🌱 فلسفة الفطرة - GraTech                     ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  أنا GraTech AI، مساعد ذكي على الفطرة البشرية السليمة.          ║
║                                                                  ║
║  📜 مبادئي:                                                      ║
║  ─────────                                                       ║
║  1. أنت الإنسان، أنا الخادم - قرارك هو الأول والأخير            ║
║  2. لا أتحيز لدين أو أمة أو عرق أو جنس أو لون                   ║
║  3. أحترم كل الأديان والثقافات والكائنات                        ║
║  4. أساعدك بكل شيء إلا الإساءة للآخرين                          ║
║  5. أحذرك من المخاطر لكن القرار لك                              ║
║  6. أوثق موافقتك للحماية القانونية                              ║
║                                                                  ║
║  🚫 ما لا أفعله:                                                 ║
║  ─────────────                                                   ║
║  • لا أهلوس أو أخترع معلومات                                    ║
║  • لا أخوّفك بدون سبب حقيقي                                     ║
║  • لا أمنعك إلا من إيذاء الآخرين                                ║
║  • لا أحكم على معتقداتك أو اختياراتك                            ║
║                                                                  ║
║  ✅ ما أفعله:                                                    ║
║  ───────────                                                     ║
║  • أخدمك بأفضل ما أستطيع                                        ║
║  • أشرح المخاطر بوضوح وأمانة                                    ║
║  • أحترم قرارك بعد التوضيح                                      ║
║  • أوثق كل شيء للشفافية                                         ║
║                                                                  ║
║  🌍 للجميع:                                                      ║
║  ──────────                                                      ║
║  مسلم، مسيحي، يهودي، بوذي، هندوسي، ملحد...                      ║
║  عربي، غربي، شرقي، أفريقي، آسيوي...                             ║
║  كلكم بشر، وأنا هنا لخدمتكم جميعاً.                             ║
║                                                                  ║
║  صُنع بـ ❤️ بواسطة سليمان نزال الشمري                           ║
║  🇸🇦 من السعودية للعالم                                          ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
";

    #endregion

    #region نظام التصنيف الأخلاقي

    /// <summary>
    /// تصنيف المحتوى
    /// </summary>
    public enum ContentClassification
    {
        /// <summary>آمن تماماً - نفذ مباشرة</summary>
        Safe,
        
        /// <summary>يحتاج توضيح - اشرح المخاطر</summary>
        NeedsWarning,
        
        /// <summary>يحتاج موافقة موثقة - خطر محتمل</summary>
        RequiresConsent,
        
        /// <summary>مرفوض - إساءة للآخرين</summary>
        Harmful
    }

    /// <summary>
    /// أنواع المحتوى المرفوض (فقط!)
    /// </summary>
    private static readonly string[] HarmfulPatterns = new[]
    {
        // إساءة مباشرة للأشخاص
        @"اقتل|اذبح|اغتصب|kill\s+someone|murder",
        // قذف وسب مباشر
        @"ابن\s*(الـ)?كلب|ابن\s*(الـ)?عاهر|fuck\s+you",
        // تحريض على العنف ضد مجموعة
        @"اقتلوا\s+(كل\s+)?(المسلمين|اليهود|المسيحيين|العرب|الأجانب)",
        // محتوى جنسي للأطفال
        @"(child|طفل).*(porn|جنس)",
        // إرهاب وتفجير
        @"(صنع|كيف\s+اسوي).*(قنبلة|متفجرات|bomb)"
    };

    /// <summary>
    /// محتوى يحتاج تحذير فقط (لا منع!)
    /// </summary>
    private static readonly string[] WarningPatterns = new[]
    {
        // أمور تقنية حساسة
        @"(hack|اختراق|password|كلمة\s*سر)",
        // أمور مالية
        @"(تحويل|transfer|bank|بنك).*(\d+)",
        // حذف ملفات
        @"(delete|حذف|امسح|rm\s+-rf)",
        // أوامر نظام خطيرة
        @"(format|فورمات|shutdown|إيقاف)",
    };

    /// <summary>
    /// محتوى يحتاج موافقة موثقة
    /// </summary>
    private static readonly string[] ConsentPatterns = new[]
    {
        // عمليات لا يمكن التراجع عنها
        @"(حذف\s+كل|delete\s+all|drop\s+database)",
        // نشر علني
        @"(انشر|publish|deploy).*public",
        // إرسال رسائل جماعية
        @"(ارسل|send).*(كل|all|جميع)",
        // تغييرات على الحسابات
        @"(غير|change).*(password|كلمة.*سر|email|إيميل)",
    };

    #endregion

    #region تحليل المحتوى

    /// <summary>
    /// تصنيف المحتوى أخلاقياً
    /// </summary>
    public ContentAnalysis AnalyzeContent(string content)
    {
        var analysis = new ContentAnalysis
        {
            OriginalContent = content,
            Timestamp = DateTime.Now
        };

        var lowerContent = content.ToLower();

        // 1. فحص المحتوى الضار (المرفوض فقط)
        foreach (var pattern in HarmfulPatterns)
        {
            if (System.Text.RegularExpressions.Regex.IsMatch(lowerContent, pattern, 
                System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            {
                analysis.Classification = ContentClassification.Harmful;
                analysis.Reason = "هذا الطلب قد يؤذي شخصاً آخر، وأنا هنا لأخدم لا لأؤذي.";
                analysis.Suggestion = "جرب صياغة طلبك بطريقة لا تؤذي أحداً.";
                return analysis;
            }
        }

        // 2. فحص المحتوى الذي يحتاج موافقة
        foreach (var pattern in ConsentPatterns)
        {
            if (System.Text.RegularExpressions.Regex.IsMatch(lowerContent, pattern,
                System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            {
                analysis.Classification = ContentClassification.RequiresConsent;
                analysis.Reason = "هذا الإجراء لا يمكن التراجع عنه.";
                analysis.Warning = "⚠️ تحذير: هذا الإجراء قد يكون له عواقب دائمة.";
                analysis.RequiresDocumentation = true;
                return analysis;
            }
        }

        // 3. فحص المحتوى الذي يحتاج تحذير
        foreach (var pattern in WarningPatterns)
        {
            if (System.Text.RegularExpressions.Regex.IsMatch(lowerContent, pattern,
                System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            {
                analysis.Classification = ContentClassification.NeedsWarning;
                analysis.Warning = "💡 ملاحظة: هذا الإجراء يحتاج انتباه.";
                return analysis;
            }
        }

        // 4. آمن - نفذ مباشرة
        analysis.Classification = ContentClassification.Safe;
        return analysis;
    }

    #endregion

    #region نظام الموافقة الموثقة

    /// <summary>
    /// توثيق الموافقة
    /// </summary>
    public ConsentRecord CreateConsentRecord(string action, string userResponse, string userId)
    {
        return new ConsentRecord
        {
            Id = Guid.NewGuid().ToString(),
            Action = action,
            UserResponse = userResponse,
            UserId = userId,
            Timestamp = DateTime.Now,
            IpAddress = "local", // للخصوصية
            Hash = ComputeHash(action + userResponse + DateTime.Now.ToString())
        };
    }

    private string ComputeHash(string input)
    {
        using var sha = System.Security.Cryptography.SHA256.Create();
        var bytes = System.Text.Encoding.UTF8.GetBytes(input);
        var hash = sha.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    #endregion

    #region الردود الأخلاقية

    /// <summary>
    /// رد مناسب حسب التصنيف
    /// </summary>
    public string GenerateEthicalResponse(ContentAnalysis analysis)
    {
        return analysis.Classification switch
        {
            ContentClassification.Safe => "", // لا حاجة لرد إضافي
            
            ContentClassification.NeedsWarning => $@"
💡 **ملاحظة قبل التنفيذ:**
{analysis.Warning}

أنا جاهز أنفذ، بس حبيت أنبهك.
تبي أكمل؟ ✅",

            ContentClassification.RequiresConsent => $@"
⚠️ **تحذير مهم:**
{analysis.Reason}

{analysis.Warning}

🔐 **للحماية القانونية:**
أحتاج موافقتك الصريحة قبل التنفيذ.
اكتب: ""موافق على [الإجراء]"" للمتابعة.

هذا التوثيق لحمايتك ولحمايتي. 🤝",

            ContentClassification.Harmful => $@"
🚫 **عذراً، ما أقدر أساعدك في هذا.**

{analysis.Reason}

💚 **فلسفتي:**
أنا هنا لأخدمك، لكن بدون إيذاء أحد.
كل الأديان والأمم والبشر يستحقون الاحترام.

{analysis.Suggestion}

🤝 جرب طريقة ثانية وأنا معك!",

            _ => ""
        };
    }

    #endregion

    #region Anti-Hallucination System

    /// <summary>
    /// نظام منع الهلوسة
    /// </summary>
    public string ApplyAntiHallucination(string response, string originalQuery)
    {
        var warnings = new List<string>();

        // 1. فحص ادعاءات كاذبة عن المخاطر
        if (ContainsFalseAlarm(response))
        {
            response = RemoveFalseAlarms(response);
            warnings.Add("تم إزالة تحذيرات غير ضرورية");
        }

        // 2. فحص اعتذارات مبالغ فيها
        if (ContainsExcessiveApologies(response))
        {
            response = SimplifyApologies(response);
        }

        // 3. فحص معلومات مخترعة
        if (ContainsInventedFacts(response, originalQuery))
        {
            response += "\n\n⚠️ **ملاحظة:** بعض المعلومات قد تحتاج تحقق.";
        }

        return response;
    }

    private bool ContainsFalseAlarm(string text)
    {
        var falseAlarmPatterns = new[]
        {
            @"خطير\s+جداً.*API.?key",
            @"تحذير.*كلمة.*سر.*عامة",
            @"danger.*exposed.*secret",
            @"لا\s+يجب.*أبداً.*مفتاح"
        };

        return falseAlarmPatterns.Any(p => 
            System.Text.RegularExpressions.Regex.IsMatch(text, p, 
            System.Text.RegularExpressions.RegexOptions.IgnoreCase));
    }

    private string RemoveFalseAlarms(string text)
    {
        // إزالة التحذيرات المبالغ فيها مع الحفاظ على المحتوى المفيد
        var patterns = new[]
        {
            @"⚠️\s*تحذير.*?(?=\n\n|\z)",
            @"🚨\s*خطر.*?(?=\n\n|\z)",
            @"DANGER:.*?(?=\n\n|\z)"
        };

        foreach (var pattern in patterns)
        {
            text = System.Text.RegularExpressions.Regex.Replace(text, pattern, "", 
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        }

        return text.Trim();
    }

    private bool ContainsExcessiveApologies(string text)
    {
        var apologyCount = System.Text.RegularExpressions.Regex.Matches(text, 
            @"(أعتذر|آسف|sorry|apologize|عذراً)", 
            System.Text.RegularExpressions.RegexOptions.IgnoreCase).Count;
        
        return apologyCount > 2;
    }

    private string SimplifyApologies(string text)
    {
        // تبسيط الاعتذارات المتكررة
        var simplified = System.Text.RegularExpressions.Regex.Replace(text,
            @"(أعتذر|آسف|sorry|عذراً)[^.]*\.\s*", "", 
            System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        
        return simplified.Trim();
    }

    private bool ContainsInventedFacts(string response, string query)
    {
        // فحص إذا الرد يحتوي على ادعاءات محددة بدون دليل
        var specificClaims = new[]
        {
            @"\d{4}.*سنة",
            @"بالضبط\s+\d+",
            @"تحديداً\s+\d+",
            @"exactly\s+\d+"
        };

        return specificClaims.Any(p => 
            System.Text.RegularExpressions.Regex.IsMatch(response, p) && 
            !System.Text.RegularExpressions.Regex.IsMatch(query, p));
    }

    #endregion
}

#region Models

public class ContentAnalysis
{
    public string OriginalContent { get; set; } = "";
    public FitrahEthicsEngine.ContentClassification Classification { get; set; }
    public string? Reason { get; set; }
    public string? Warning { get; set; }
    public string? Suggestion { get; set; }
    public bool RequiresDocumentation { get; set; }
    public DateTime Timestamp { get; set; }
}

public class ConsentRecord
{
    public string Id { get; set; } = "";
    public string Action { get; set; } = "";
    public string UserResponse { get; set; } = "";
    public string UserId { get; set; } = "";
    public DateTime Timestamp { get; set; }
    public string IpAddress { get; set; } = "";
    public string Hash { get; set; } = ""; // للتحقق من عدم التلاعب
}

#endregion
