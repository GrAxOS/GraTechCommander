using System.Net.Http;
using System.Text;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GraTechCommander.Models;

namespace GraTechCommander.Services;

/// <summary>
/// خدمة التكامل الشامل - تربط كل شيء معاً
/// Azure AI + GitHub + Terminal + الكل
/// </summary>
public class IntegrationService
{
    private readonly HttpClient _httpClient;
    private readonly AppSettings _settings;
    
    // Azure Resources
    private readonly Dictionary<string, AzureResource> _azureResources = new()
    {
        // حساب الجامعة - النماذج الأساسية
        ["university"] = new AzureResource
        {
            Name = "alshammaris-2770-resource",
            Endpoint = "https://alshammaris-2770-resource.cognitiveservices.azure.com",
            SubscriptionId = "376e945d-1f65-4f42-885e-ed9efda6716f",
            ResourceGroup = "rg-alshammaris-2770",
            Models = new[] { "gpt-4.1", "claude-opus-4-5", "DeepSeek-R1-0528", "text-embedding-3-small" }
        },
        // حساب Omni Admin - موارد إضافية
        ["omni"] = new AzureResource
        {
            Name = "gratech-aoai",
            Endpoint = "https://gratech-aoai.openai.azure.com",
            SubscriptionId = "9c0f7def-dc37-4ec3-a979-27f674177fec",
            ResourceGroup = "gratech-cometx_group",
            Models = new[] { "gpt-4o", "o3-mini" }
        }
    };

    // GitHub Accounts
    private readonly Dictionary<string, GitHubAccount> _githubAccounts = new()
    {
        ["gratechx"] = new GitHubAccount { Username = "gratechx", Type = "Organization", IsActive = true },
        ["Grar00t"] = new GitHubAccount { Username = "Grar00t", Type = "Personal", IsActive = false },
        ["GrAxOS"] = new GitHubAccount { Username = "GrAxOS", Type = "OS Project", IsActive = true }
    };

    // Container Apps
    private readonly Dictionary<string, ContainerApp> _containerApps = new()
    {
        ["backend"] = new ContainerApp { Name = "backend", Url = "https://backend.lemonpebble-5a1052c0.eastus.azurecontainerapps.io" },
        ["frontend"] = new ContainerApp { Name = "frontend", Url = "https://frontend.lemonpebble-5a1052c0.eastus.azurecontainerapps.io" },
        ["cometx-backend"] = new ContainerApp { Name = "cometx-backend", Url = "https://cometx-backend.nicepebble-32ae89d3.uaenorth.azurecontainerapps.io" },
        ["gratech-api"] = new ContainerApp { Name = "gratech-api", Url = "https://gratech-api.lemondune-e5f760db.uaenorth.azurecontainerapps.io" }
    };

    public IntegrationService(AppSettings settings)
    {
        _settings = settings;
        _httpClient = new HttpClient { Timeout = TimeSpan.FromMinutes(2) };
    }

    #region Azure Integration

    /// <summary>
    /// تنفيذ أمر Azure CLI
    /// </summary>
    public async Task<IntegrationResult> ExecuteAzureCommandAsync(string command)
    {
        try
        {
            var process = new System.Diagnostics.Process
            {
                StartInfo = new System.Diagnostics.ProcessStartInfo
                {
                    FileName = "az",
                    Arguments = command,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            var output = await process.StandardOutput.ReadToEndAsync();
            var error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            return new IntegrationResult
            {
                Success = process.ExitCode == 0,
                Output = output,
                Error = error,
                Source = "Azure CLI"
            };
        }
        catch (Exception ex)
        {
            return new IntegrationResult { Success = false, Error = ex.Message, Source = "Azure CLI" };
        }
    }

    /// <summary>
    /// الحصول على قائمة الموارد من Azure
    /// </summary>
    public async Task<List<AzureResource>> GetAzureResourcesAsync()
    {
        var result = await ExecuteAzureCommandAsync("resource list --query \"[].{Name:name, Type:type, Location:location}\" -o json");
        if (result.Success && !string.IsNullOrEmpty(result.Output))
        {
            try
            {
                return JsonConvert.DeserializeObject<List<AzureResource>>(result.Output) ?? new();
            }
            catch { }
        }
        return _azureResources.Values.ToList();
    }

    /// <summary>
    /// نشر Container App جديد
    /// </summary>
    public async Task<IntegrationResult> DeployContainerAppAsync(string name, string image, string resourceGroup = "gratech-cometx_group")
    {
        var command = $"containerapp create --name {name} --resource-group {resourceGroup} --image {image} --target-port 80 --ingress external";
        return await ExecuteAzureCommandAsync(command);
    }

    #endregion

    #region GitHub Integration

    /// <summary>
    /// تنفيذ أمر GitHub CLI
    /// </summary>
    public async Task<IntegrationResult> ExecuteGitHubCommandAsync(string command)
    {
        try
        {
            var process = new System.Diagnostics.Process
            {
                StartInfo = new System.Diagnostics.ProcessStartInfo
                {
                    FileName = "gh",
                    Arguments = command,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            var output = await process.StandardOutput.ReadToEndAsync();
            var error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            return new IntegrationResult
            {
                Success = process.ExitCode == 0,
                Output = output,
                Error = error,
                Source = "GitHub CLI"
            };
        }
        catch (Exception ex)
        {
            return new IntegrationResult { Success = false, Error = ex.Message, Source = "GitHub CLI" };
        }
    }

    /// <summary>
    /// الحصول على قائمة الـ Repos
    /// </summary>
    public async Task<List<GitHubRepo>> GetRepositoriesAsync(string org = "gratechx")
    {
        var result = await ExecuteGitHubCommandAsync($"repo list {org} --json name,description,isPrivate,url");
        if (result.Success && !string.IsNullOrEmpty(result.Output))
        {
            try
            {
                return JsonConvert.DeserializeObject<List<GitHubRepo>>(result.Output) ?? new();
            }
            catch { }
        }
        return new();
    }

    /// <summary>
    /// إنشاء Issue جديد
    /// </summary>
    public async Task<IntegrationResult> CreateIssueAsync(string repo, string title, string body)
    {
        var command = $"issue create --repo {repo} --title \"{title}\" --body \"{body}\"";
        return await ExecuteGitHubCommandAsync(command);
    }

    /// <summary>
    /// رفع كود جديد
    /// </summary>
    public async Task<IntegrationResult> PushCodeAsync(string path, string message)
    {
        var commands = new[]
        {
            $"cd \"{path}\" && git add .",
            $"cd \"{path}\" && git commit -m \"{message}\"",
            $"cd \"{path}\" && git push"
        };

        foreach (var cmd in commands)
        {
            var result = await ExecuteTerminalCommandAsync(cmd);
            if (!result.Success) return result;
        }

        return new IntegrationResult { Success = true, Output = "تم رفع الكود بنجاح", Source = "Git" };
    }

    #endregion

    #region Terminal Integration

    /// <summary>
    /// تنفيذ أمر في Terminal
    /// </summary>
    public async Task<IntegrationResult> ExecuteTerminalCommandAsync(string command)
    {
        try
        {
            var process = new System.Diagnostics.Process
            {
                StartInfo = new System.Diagnostics.ProcessStartInfo
                {
                    FileName = "powershell",
                    Arguments = $"-NoProfile -Command \"{command.Replace("\"", "\\\"")}\"",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    StandardOutputEncoding = Encoding.UTF8,
                    StandardErrorEncoding = Encoding.UTF8
                }
            };

            process.Start();
            var output = await process.StandardOutput.ReadToEndAsync();
            var error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            return new IntegrationResult
            {
                Success = process.ExitCode == 0,
                Output = output,
                Error = error,
                Source = "Terminal",
                ExitCode = process.ExitCode
            };
        }
        catch (Exception ex)
        {
            return new IntegrationResult { Success = false, Error = ex.Message, Source = "Terminal" };
        }
    }

    #endregion

    #region AI Agent - التنفيذ الذكي

    /// <summary>
    /// تحليل النية من النص العربي وتنفيذ الأمر المناسب
    /// </summary>
    public async Task<IntegrationResult> ProcessArabicIntentAsync(string arabicText)
    {
        // تحليل النية
        var intent = AnalyzeArabicIntent(arabicText);

        return intent.Action switch
        {
            IntentAction.CreateFile => await CreateFileFromIntentAsync(intent),
            IntentAction.DeployApp => await DeployAppFromIntentAsync(intent),
            IntentAction.GitPush => await GitPushFromIntentAsync(intent),
            IntentAction.AzureResource => await ManageAzureResourceAsync(intent),
            IntentAction.RunCommand => await ExecuteTerminalCommandAsync(intent.Command ?? ""),
            IntentAction.ListResources => await ListResourcesAsync(intent),
            _ => new IntegrationResult { Success = false, Error = "لم أفهم المطلوب، جرب تكون أوضح", Source = "Intent Analysis" }
        };
    }

    /// <summary>
    /// تحليل النية من النص العربي
    /// </summary>
    private UserIntent AnalyzeArabicIntent(string text)
    {
        var lowerText = text.ToLower();
        var intent = new UserIntent { OriginalText = text };

        // أنماط الأوامر العربية
        var patterns = new Dictionary<string, IntentAction>
        {
            // إنشاء
            { "سوي|أسوي|اسوي|انشئ|أنشئ|اعمل|أعمل|بناء|ابني", IntentAction.CreateFile },
            // نشر
            { "نشر|انشر|ارفع|deploy|رفع", IntentAction.DeployApp },
            // Git
            { "push|رفع كود|ادفع|commit|سلم", IntentAction.GitPush },
            // Azure
            { "azure|ازير|سحاب|container|حاوية", IntentAction.AzureResource },
            // تنفيذ
            { "نفذ|شغل|run|execute|تشغيل", IntentAction.RunCommand },
            // عرض
            { "عرض|اعرض|list|قائمة|شوف|وريني", IntentAction.ListResources }
        };

        foreach (var pattern in patterns)
        {
            if (System.Text.RegularExpressions.Regex.IsMatch(lowerText, pattern.Key))
            {
                intent.Action = pattern.Value;
                break;
            }
        }

        // استخراج المعلومات الإضافية
        intent.Target = ExtractTarget(text);
        intent.Command = ExtractCommand(text);

        return intent;
    }

    private string? ExtractTarget(string text)
    {
        // البحث عن اسم ملف أو مشروع
        var match = System.Text.RegularExpressions.Regex.Match(text, @"[""']([^""']+)[""']");
        if (match.Success) return match.Groups[1].Value;

        // البحث عن مسار
        match = System.Text.RegularExpressions.Regex.Match(text, @"([A-Za-z]:\\[^\s]+)");
        if (match.Success) return match.Groups[1].Value;

        return null;
    }

    private string? ExtractCommand(string text)
    {
        // البحث عن أمر في code block
        var match = System.Text.RegularExpressions.Regex.Match(text, @"```(?:\w+)?\s*([\s\S]*?)```");
        if (match.Success) return match.Groups[1].Value.Trim();

        return null;
    }

    private async Task<IntegrationResult> CreateFileFromIntentAsync(UserIntent intent)
    {
        if (string.IsNullOrEmpty(intent.Target))
            return new IntegrationResult { Success = false, Error = "حدد اسم الملف أو المسار" };

        // إنشاء الملف
        var path = intent.Target;
        if (!Path.IsPathRooted(path))
            path = Path.Combine("C:\\GraTech\\GraTechCommander", intent.Target);

        try
        {
            Directory.CreateDirectory(Path.GetDirectoryName(path)!);
            await File.WriteAllTextAsync(path, intent.Command ?? "// ملف جديد");
            return new IntegrationResult { Success = true, Output = $"تم إنشاء: {path}", Source = "File System" };
        }
        catch (Exception ex)
        {
            return new IntegrationResult { Success = false, Error = ex.Message, Source = "File System" };
        }
    }

    private async Task<IntegrationResult> DeployAppFromIntentAsync(UserIntent intent)
    {
        var appName = intent.Target ?? "gratech-app";
        return await DeployContainerAppAsync(appName, "gratechacr.azurecr.io/gratech:latest");
    }

    private async Task<IntegrationResult> GitPushFromIntentAsync(UserIntent intent)
    {
        var path = intent.Target ?? "C:\\GraTech\\GraTechCommander";
        var message = intent.Command ?? $"Update {DateTime.Now:yyyy-MM-dd HH:mm}";
        return await PushCodeAsync(path, message);
    }

    private async Task<IntegrationResult> ManageAzureResourceAsync(UserIntent intent)
    {
        if (intent.OriginalText.Contains("قائمة") || intent.OriginalText.Contains("عرض"))
        {
            var resources = await GetAzureResourcesAsync();
            return new IntegrationResult
            {
                Success = true,
                Output = JsonConvert.SerializeObject(resources, Formatting.Indented),
                Source = "Azure"
            };
        }

        return new IntegrationResult { Success = false, Error = "حدد العملية المطلوبة على Azure", Source = "Azure" };
    }

    private async Task<IntegrationResult> ListResourcesAsync(UserIntent intent)
    {
        var text = intent.OriginalText.ToLower();

        if (text.Contains("azure") || text.Contains("ازير") || text.Contains("سحاب"))
        {
            return await ExecuteAzureCommandAsync("resource list -o table");
        }
        if (text.Contains("github") || text.Contains("repo") || text.Contains("مستودع"))
        {
            return await ExecuteGitHubCommandAsync("repo list gratechx");
        }
        if (text.Contains("container") || text.Contains("حاوية") || text.Contains("app"))
        {
            return await ExecuteAzureCommandAsync("containerapp list -o table");
        }
        if (text.Contains("ملف") || text.Contains("file") || text.Contains("مجلد"))
        {
            return await ExecuteTerminalCommandAsync("Get-ChildItem 'C:\\GraTech' -Recurse -Directory | Select-Object FullName");
        }

        return new IntegrationResult
        {
            Success = true,
            Output = $"الموارد المتاحة:\n- Azure Resources: {_azureResources.Count}\n- GitHub Accounts: {_githubAccounts.Count}\n- Container Apps: {_containerApps.Count}",
            Source = "Integration Service"
        };
    }

    #endregion
}

#region Models

public class AzureResource
{
    public string Name { get; set; } = "";
    public string Endpoint { get; set; } = "";
    public string SubscriptionId { get; set; } = "";
    public string ResourceGroup { get; set; } = "";
    public string[]? Models { get; set; }
    public string? Type { get; set; }
    public string? Location { get; set; }
}

public class GitHubAccount
{
    public string Username { get; set; } = "";
    public string Type { get; set; } = "";
    public bool IsActive { get; set; }
}

public class GitHubRepo
{
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public bool IsPrivate { get; set; }
    public string? Url { get; set; }
}

public class ContainerApp
{
    public string Name { get; set; } = "";
    public string Url { get; set; } = "";
    public string Status { get; set; } = "Unknown";
}

public class IntegrationResult
{
    public bool Success { get; set; }
    public string Output { get; set; } = "";
    public string Error { get; set; } = "";
    public string Source { get; set; } = "";
    public int ExitCode { get; set; }
}

public class UserIntent
{
    public string OriginalText { get; set; } = "";
    public IntentAction Action { get; set; } = IntentAction.Unknown;
    public string? Target { get; set; }
    public string? Command { get; set; }
}

public enum IntentAction
{
    Unknown,
    CreateFile,
    DeployApp,
    GitPush,
    AzureResource,
    RunCommand,
    ListResources,
    Chat
}

#endregion
