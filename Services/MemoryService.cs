using System.IO;
using Newtonsoft.Json;
using GraTechCommander.Models;

namespace GraTechCommander.Services;

public class MemoryService
{
    private readonly string _dataPath;
    private readonly string _conversationsFile;
    private readonly string _settingsFile;

    public MemoryService()
    {
        _dataPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "GraTechCommander"
        );
        
        Directory.CreateDirectory(_dataPath);
        
        _conversationsFile = Path.Combine(_dataPath, "conversations.json");
        _settingsFile = Path.Combine(_dataPath, "settings.json");
    }

    public async Task<List<Conversation>> LoadConversationsAsync()
    {
        try
        {
            if (File.Exists(_conversationsFile))
            {
                var json = await File.ReadAllTextAsync(_conversationsFile);
                return JsonConvert.DeserializeObject<List<Conversation>>(json) ?? new List<Conversation>();
            }
        }
        catch { }
        
        return new List<Conversation>();
    }

    public async Task SaveConversationsAsync(List<Conversation> conversations)
    {
        var json = JsonConvert.SerializeObject(conversations, Formatting.Indented);
        await File.WriteAllTextAsync(_conversationsFile, json);
    }

    public async Task<AppSettings> LoadSettingsAsync()
    {
        try
        {
            if (File.Exists(_settingsFile))
            {
                var json = await File.ReadAllTextAsync(_settingsFile);
                return JsonConvert.DeserializeObject<AppSettings>(json) ?? new AppSettings();
            }
        }
        catch { }
        
        return new AppSettings();
    }

    public async Task SaveSettingsAsync(AppSettings settings)
    {
        var json = JsonConvert.SerializeObject(settings, Formatting.Indented);
        await File.WriteAllTextAsync(_settingsFile, json);
    }

    public async Task<string> ExportConversationAsMarkdownAsync(Conversation conversation)
    {
        var md = $"# {conversation.Title}\n\n";
        md += $"**التاريخ:** {conversation.CreatedAt:yyyy-MM-dd HH:mm}\n";
        md += $"**النموذج:** {conversation.Model}\n\n---\n\n";

        foreach (var msg in conversation.Messages)
        {
            var role = msg.Role == "user" ? "👤 أنت" : "🤖 GraTech AI";
            md += $"### {role}\n\n{msg.Content}\n\n---\n\n";
        }

        var exportPath = Path.Combine(_dataPath, "exports");
        Directory.CreateDirectory(exportPath);
        
        var fileName = $"{conversation.Title}_{DateTime.Now:yyyyMMdd_HHmmss}.md";
        var filePath = Path.Combine(exportPath, fileName);
        
        await File.WriteAllTextAsync(filePath, md);
        
        return filePath;
    }
}
