using System.Text;
using System.Text.RegularExpressions;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GraTechCommander.Models;
using GraTechCommander.Core;

namespace GraTechCommander.Services;

public class AzureAIService
{
    private readonly HttpClient _httpClient;
    private readonly AppSettings _settings;
    private readonly FitrahEthicsEngine _ethicsEngine;

    public static readonly List<AIModel> AvailableModels = new()
    {
        // Azure Models (حساب الجامعة)
        new AIModel { Id = "gpt-4.1", Name = "GPT-4.1", Description = "الأفضل للبرمجة", Icon = "💻", BestFor = "Code", Provider = "Azure" },
        new AIModel { Id = "claude-opus-4-5", Name = "Claude Opus", Description = "الأفضل للعربي", Icon = "🎨", BestFor = "Arabic", Provider = "Azure" },
        new AIModel { Id = "DeepSeek-R1-0528", Name = "DeepSeek R1", Description = "الأفضل للتحليل", Icon = "🔬", BestFor = "Analysis", Provider = "Azure" },
        
        // Llama Local (للخصوصية)
        new AIModel { Id = "llama-405b", Name = "Llama 405B", Description = "محلي 100% - خصوصية كاملة", Icon = "🦙", BestFor = "Privacy", Provider = "Llama" }
    };

    public AzureAIService(AppSettings settings)
    {
        _settings = settings;
        _ethicsEngine = new FitrahEthicsEngine();
        _httpClient = new HttpClient { Timeout = TimeSpan.FromMinutes(3) };
        
        // Load API Key from Environment Variable (أفضل للأمان)
        var apiKey = Environment.GetEnvironmentVariable("AZURE_AI_KEY") ?? _settings.AzureApiKey;
        if (!string.IsNullOrEmpty(apiKey))
            _httpClient.DefaultRequestHeaders.Add("api-key", apiKey);
    }

    public string SmartSelectModel(string text)
    {
        // إذا المستخدم يبي خصوصية
        if (_settings.UseLlamaLocal)
            return "llama-405b";
            
        bool hasArabic = Regex.IsMatch(text, @"[\u0600-\u06FF]");
        bool hasCode = Regex.IsMatch(text, @"```|function|class\s|def\s|const\s|import\s|async\s|await\s");
        bool isAnalysis = Regex.IsMatch(text.ToLower(), @"حلل|قارن|اشرح|لماذا|كيف|analyze|explain|why|how");
        bool wantsPrivacy = Regex.IsMatch(text.ToLower(), @"خاص|سري|محلي|private|local|secret");

        // الخصوصية أولاً
        if (wantsPrivacy) return "llama-405b";
        
        // ثم حسب المحتوى
        if (isAnalysis) return "DeepSeek-R1-0528";
        if (hasCode) return "gpt-4.1";
        if (hasArabic) return "claude-opus-4-5";
        
        return "gpt-4.1";
    }

    public async Task<string> ChatAsync(List<ChatMessage> messages, string? modelOverride = null, CancellationToken ct = default)
    {
        var lastMessage = messages.LastOrDefault()?.Content ?? "";
        
        // 🌱 فحص أخلاقي قبل الإرسال
        var ethicsAnalysis = _ethicsEngine.AnalyzeContent(lastMessage);
        
        // إذا محتوى ضار - ارفض مباشرة
        if (ethicsAnalysis.Classification == FitrahEthicsEngine.ContentClassification.Harmful)
        {
            return _ethicsEngine.GenerateEthicalResponse(ethicsAnalysis);
        }
        
        // إذا يحتاج موافقة - اطلبها
        if (ethicsAnalysis.Classification == FitrahEthicsEngine.ContentClassification.RequiresConsent)
        {
            return _ethicsEngine.GenerateEthicalResponse(ethicsAnalysis);
        }

        string model = modelOverride ?? SmartSelectModel(lastMessage);
        var selectedModel = AvailableModels.FirstOrDefault(m => m.Id == model);
        
        string response;
        if (selectedModel?.Provider == "Llama")
            response = await ChatWithLlamaAsync(messages, ct);
        else
            response = await ChatWithAzureAsync(messages, model, ct);

        // 🌱 تنظيف الرد من الهلوسة
        response = _ethicsEngine.ApplyAntiHallucination(response, lastMessage);

        // إضافة تحذير إذا لزم
        if (ethicsAnalysis.Classification == FitrahEthicsEngine.ContentClassification.NeedsWarning)
        {
            var warning = _ethicsEngine.GenerateEthicalResponse(ethicsAnalysis);
            if (!string.IsNullOrEmpty(warning))
                response = warning + "\n\n" + response;
        }

        return response;
    }

    private async Task<string> ChatWithAzureAsync(List<ChatMessage> messages, string model, CancellationToken ct)
    {
        // Endpoints متعددة للـ fallback
        string[] endpoints = new[]
        {
            $"{_settings.AzureEndpoint}/openai/deployments/{model}/chat/completions?api-version=2024-08-01-preview",
            $"{_settings.AzureEndpoint}/models/chat/completions?api-version=2024-05-01-preview",
        };

        var requestMessages = new List<object> { new { role = "system", content = _settings.SystemPrompt } };
        foreach (var msg in messages)
            requestMessages.Add(new { role = msg.Role, content = msg.Content });

        var body = new { model = model, messages = requestMessages, max_tokens = 4000, temperature = 0.7 };
        var json = JsonConvert.SerializeObject(body);

        foreach (var endpoint in endpoints)
        {
            try
            {
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(endpoint, content, ct);
                var responseText = await response.Content.ReadAsStringAsync(ct);

                if (response.IsSuccessStatusCode)
                {
                    var result = JObject.Parse(responseText);
                    var answer = result["choices"]?[0]?["message"]?["content"]?.ToString();
                    if (!string.IsNullOrEmpty(answer))
                        return answer;
                }
                
                System.Diagnostics.Debug.WriteLine($"Endpoint {endpoint} failed: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Endpoint {endpoint} error: {ex.Message}");
            }
        }

        return "❌ فشل الاتصال بـ Azure AI\n\n💡 جرب:\n1. تأكد من وجود AZURE_AI_KEY في Environment Variables\n2. أو فعّل Llama المحلي من الإعدادات للخصوصية الكاملة";
    }

    private async Task<string> ChatWithLlamaAsync(List<ChatMessage> messages, CancellationToken ct)
    {
        try
        {
            var requestMessages = new List<object> { new { role = "system", content = _settings.SystemPrompt } };
            foreach (var msg in messages)
                requestMessages.Add(new { role = msg.Role, content = msg.Content });

            var body = new { 
                model = "llama-405b", 
                messages = requestMessages, 
                max_tokens = 4000, 
                temperature = 0.7,
                stream = false
            };
            
            var json = JsonConvert.SerializeObject(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync($"{_settings.LlamaEndpoint}/v1/chat/completions", content, ct);
            var responseText = await response.Content.ReadAsStringAsync(ct);

            if (response.IsSuccessStatusCode)
            {
                var result = JObject.Parse(responseText);
                var answer = result["choices"]?[0]?["message"]?["content"]?.ToString();
                if (!string.IsNullOrEmpty(answer))
                    return $"🦙 {answer}";
            }
            
            return $"❌ فشل الاتصال بـ Llama المحلي على {_settings.LlamaEndpoint}";
        }
        catch (Exception ex)
        {
            return $"❌ خطأ Llama: {ex.Message}";
        }
    }
}
