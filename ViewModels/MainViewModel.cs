using System.Collections.ObjectModel;
using System.Windows;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using GraTechCommander.Models;
using GraTechCommander.Services;

namespace GraTechCommander.ViewModels;

public partial class MainViewModel : ObservableObject
{
    private readonly AzureAIService _aiService;
    private readonly TerminalService _terminalService;
    private readonly MemoryService _memoryService;
    private readonly IntegrationService _integrationService;
    private readonly ArabicUnderstandingService _arabicService;
    private CancellationTokenSource? _cts;

    [ObservableProperty] private ObservableCollection<Conversation> _conversations = new();
    [ObservableProperty] private Conversation? _currentConversation;
    [ObservableProperty] private ObservableCollection<ChatMessage> _messages = new();
    [ObservableProperty] private string _userInput = "";
    [ObservableProperty] private string _terminalOutput = "⚡ GraTech Terminal Ready\n🔥 مرحباً سليمان!\n";
    [ObservableProperty] private bool _isLoading;
    [ObservableProperty] private bool _isTerminalVisible;
    [ObservableProperty] private string _selectedModel = "gpt-4.1";
    [ObservableProperty] private bool _useSmartRouting = true;
    [ObservableProperty] private bool _useLlamaLocal = false;
    [ObservableProperty] private string _statusMessage = "جاهز";
    [ObservableProperty] private AppSettings _settings = new();

    public List<AIModel> AvailableModels => AzureAIService.AvailableModels;
    
    public Visibility LoadingVisibility => IsLoading ? Visibility.Visible : Visibility.Collapsed;
    public Visibility TerminalVisibility => IsTerminalVisible ? Visibility.Visible : Visibility.Collapsed;
    public bool CanSend => !IsLoading && !string.IsNullOrWhiteSpace(UserInput);

    public MainViewModel()
    {
        _settings = new AppSettings();
        _aiService = new AzureAIService(_settings);
        _terminalService = new TerminalService();
        _memoryService = new MemoryService();
        _integrationService = new IntegrationService(_settings);
        _arabicService = new ArabicUnderstandingService();

        _terminalService.OnOutput += s => Application.Current.Dispatcher.Invoke(() => TerminalOutput += s + "\n");
        _terminalService.OnError += s => Application.Current.Dispatcher.Invoke(() => TerminalOutput += $"❌ {s}\n");

        _ = InitAsync();
    }

    partial void OnIsLoadingChanged(bool value)
    {
        OnPropertyChanged(nameof(LoadingVisibility));
        OnPropertyChanged(nameof(CanSend));
    }

    partial void OnUserInputChanged(string value) => OnPropertyChanged(nameof(CanSend));
    partial void OnIsTerminalVisibleChanged(bool value) => OnPropertyChanged(nameof(TerminalVisibility));
    
    partial void OnUseLlamaLocalChanged(bool value)
    {
        Settings.UseLlamaLocal = value;
        if (value)
        {
            SelectedModel = "llama-405b";
            StatusMessage = "🦙 وضع الخصوصية - Llama محلي";
        }
        else
        {
            SelectedModel = "gpt-4.1";
            StatusMessage = "جاهز";
        }
    }

    private async Task InitAsync()
    {
        Settings = await _memoryService.LoadSettingsAsync();
        UseLlamaLocal = Settings.UseLlamaLocal;
        
        var convs = await _memoryService.LoadConversationsAsync();
        foreach (var c in convs.OrderByDescending(x => x.UpdatedAt))
            Conversations.Add(c);

        if (Conversations.Count == 0)
            await NewConversationAsync();
        else
            SelectConversation(Conversations.First());
    }

    [RelayCommand]
    private void ToggleTerminal() => IsTerminalVisible = !IsTerminalVisible;

    [RelayCommand]
    private async Task SendMessageAsync()
    {
        if (string.IsNullOrWhiteSpace(UserInput) || IsLoading) return;

        var userMsg = new ChatMessage { Role = "user", Content = UserInput.Trim() };
        Messages.Add(userMsg);
        CurrentConversation?.Messages.Add(userMsg);

        var input = UserInput;
        UserInput = "";
        IsLoading = true;

        // 🧠 تحليل النية العربية أولاً
        var intentAnalysis = _arabicService.AnalyzeIntent(input);
        
        // إذا كان أمر تنفيذي، نفذه مباشرة
        if (IsExecutableIntent(intentAnalysis))
        {
            await ExecuteIntentAsync(intentAnalysis);
        }
        else
        {
            // محادثة عادية مع AI
            await ProcessChatAsync(input, intentAnalysis);
        }
    }

    private bool IsExecutableIntent(IntentAnalysis analysis)
    {
        var executableIntents = new[] { "RUN", "DELETE", "CREATE_FILE", "DEPLOY", "LIST" };
        return executableIntents.Contains(analysis.PrimaryIntent) && analysis.Confidence >= 0.8;
    }

    private async Task ExecuteIntentAsync(IntentAnalysis analysis)
    {
        StatusMessage = $"⚡ تنفيذ: {analysis.PrimaryIntent}...";
        TerminalOutput += $"\n🎯 النية: {analysis.PrimaryIntent} (ثقة: {analysis.Confidence:P0})\n";
        
        try
        {
            var result = await _integrationService.ProcessArabicIntentAsync(analysis.OriginalText);
            
            var response = _arabicService.GenerateDialectResponse(
                analysis.PrimaryIntent, 
                result.Success, 
                result.Success ? result.Output : result.Error
            );

            var aiMsg = new ChatMessage 
            { 
                Role = "assistant", 
                Content = response,
                Model = "GraTech Agent"
            };
            Messages.Add(aiMsg);
            CurrentConversation?.Messages.Add(aiMsg);

            if (!string.IsNullOrEmpty(result.Output))
            {
                IsTerminalVisible = true;
                TerminalOutput += $"📤 {result.Source}:\n{result.Output}\n";
            }
            if (!result.Success && !string.IsNullOrEmpty(result.Error))
            {
                TerminalOutput += $"❌ خطأ: {result.Error}\n";
            }
        }
        catch (Exception ex)
        {
            var errorMsg = new ChatMessage 
            { 
                Role = "assistant", 
                Content = $"😅 صار خطأ: {ex.Message}",
                Model = "GraTech Agent"
            };
            Messages.Add(errorMsg);
        }
        finally
        {
            IsLoading = false;
            StatusMessage = "جاهز";
        }
    }

    private async Task ProcessChatAsync(string input, IntentAnalysis analysis)
    {
        // اختيار النموذج
        string model;
        if (UseLlamaLocal)
            model = "llama-405b";
        else if (UseSmartRouting)
            model = _aiService.SmartSelectModel(input);
        else
            model = SelectedModel;
            
        StatusMessage = UseLlamaLocal ? "🦙 Llama محلي..." : $"🔥 {model}...";

        // إضافة سياق النية للـ AI
        var enhancedInput = analysis.PrimaryIntent != "UNKNOWN" 
            ? $"[النية المكتشفة: {analysis.PrimaryIntent}]\n[الأولوية: {analysis.Priority}]\n\n{input}"
            : input;

        try
        {
            _cts = new CancellationTokenSource();
            
            // إضافة السياق المعزز
            var messagesWithContext = CurrentConversation?.Messages.ToList() ?? new();
            if (messagesWithContext.Count > 0 && messagesWithContext.Last().Content != enhancedInput)
            {
                messagesWithContext[^1] = new ChatMessage { Role = "user", Content = enhancedInput };
            }
            
            var response = await _aiService.ChatAsync(messagesWithContext, model, _cts.Token);

            var aiMsg = new ChatMessage { Role = "assistant", Content = response, Model = model };
            Messages.Add(aiMsg);
            CurrentConversation?.Messages.Add(aiMsg);

            // Update title
            if (CurrentConversation?.Messages.Count == 2)
                CurrentConversation.Title = input.Length > 25 ? input[..25] + "..." : input;

            if (CurrentConversation != null)
            {
                CurrentConversation.UpdatedAt = DateTime.Now;
                await _memoryService.SaveConversationsAsync(Conversations.ToList());
            }

            // Check for executable commands in response
            await ProcessCommands(response);
        }
        catch (Exception ex)
        {
            Messages.Add(new ChatMessage { Role = "assistant", Content = $"❌ {ex.Message}" });
        }
        finally
        {
            IsLoading = false;
            StatusMessage = UseLlamaLocal ? "🦙 وضع الخصوصية" : "جاهز";
        }
    }

    private async Task ProcessCommands(string response)
    {
        var lines = response.Split('\n');
        bool inBlock = false;
        var cmds = new List<string>();
        string? lang = null;

        foreach (var line in lines)
        {
            var t = line.Trim();
            if (t.StartsWith("```"))
            {
                if (!inBlock)
                {
                    lang = t.Length > 3 ? t[3..].Trim() : null;
                }
                inBlock = !inBlock;
                continue;
            }
            if (inBlock && !string.IsNullOrWhiteSpace(t) && !t.StartsWith("#"))
            {
                // تحديد نوع الأمر
                if (lang == "powershell" || lang == "bash" || lang == "cmd" || lang == "shell")
                    cmds.Add(t);
            }
        }

        if (cmds.Count > 0)
        {
            IsTerminalVisible = true;
            TerminalOutput += $"\n📋 {cmds.Count} أوامر مكتشفة:\n";
            foreach (var c in cmds)
                TerminalOutput += $"  ❯ {c}\n";
            TerminalOutput += "\n💡 تبي أنفذها؟ اكتب 'نفذ' أو 'شغل'\n";
        }
    }

    [RelayCommand]
    private void Cancel()
    {
        _cts?.Cancel();
        _terminalService.CancelCurrentProcess();
        StatusMessage = "⏹️ تم الإلغاء";
    }

    [RelayCommand]
    private async Task NewConversationAsync()
    {
        var conv = new Conversation { Title = "محادثة جديدة", Model = SelectedModel };
        Conversations.Insert(0, conv);
        SelectConversation(conv);
        await _memoryService.SaveConversationsAsync(Conversations.ToList());
    }

    [RelayCommand]
    public void SelectConversation(Conversation? conv)
    {
        if (conv == null) return;
        CurrentConversation = conv;
        Messages.Clear();
        foreach (var m in conv.Messages) Messages.Add(m);
    }

    [RelayCommand]
    private async Task DeleteConversationAsync(Conversation? conv)
    {
        if (conv == null) return;
        Conversations.Remove(conv);
        if (CurrentConversation == conv)
        {
            if (Conversations.Count > 0) SelectConversation(Conversations[0]);
            else await NewConversationAsync();
        }
        await _memoryService.SaveConversationsAsync(Conversations.ToList());
    }

    [RelayCommand]
    private void ClearTerminal() => TerminalOutput = "⚡ GraTech Terminal Ready\n🔥 تم المسح!\n";
}
