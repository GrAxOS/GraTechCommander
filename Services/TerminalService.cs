using System.Diagnostics;
using System.Text;
using GraTechCommander.Models;

namespace GraTechCommander.Services;

public class TerminalService
{
    private Process? _currentProcess;
    
    public event Action<string>? OnOutput;
    public event Action<string>? OnError;
    public event Action<int>? OnProcessExit;

    public bool IsRunning => _currentProcess != null && !_currentProcess.HasExited;

    public async Task<TerminalCommand> ExecuteCommandAsync(string command, CancellationToken cancellationToken = default)
    {
        var result = new TerminalCommand
        {
            Command = command,
            IsRunning = true
        };

        var output = new StringBuilder();
        var error = new StringBuilder();

        try
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = $"-NoProfile -NonInteractive -Command \"{command.Replace("\"", "\\\"")}\"",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                StandardOutputEncoding = Encoding.UTF8,
                StandardErrorEncoding = Encoding.UTF8,
                WorkingDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)
            };

            _currentProcess = new Process { StartInfo = startInfo };

            _currentProcess.OutputDataReceived += (s, e) =>
            {
                if (e.Data != null)
                {
                    output.AppendLine(e.Data);
                    OnOutput?.Invoke(e.Data);
                }
            };

            _currentProcess.ErrorDataReceived += (s, e) =>
            {
                if (e.Data != null)
                {
                    error.AppendLine(e.Data);
                    OnError?.Invoke(e.Data);
                }
            };

            _currentProcess.Start();
            _currentProcess.BeginOutputReadLine();
            _currentProcess.BeginErrorReadLine();

            await _currentProcess.WaitForExitAsync(cancellationToken);

            result.ExitCode = _currentProcess.ExitCode;
            result.Output = output.ToString();
            
            if (error.Length > 0)
            {
                result.Output += "\n[ERROR]\n" + error.ToString();
            }

            OnProcessExit?.Invoke(result.ExitCode);
        }
        catch (OperationCanceledException)
        {
            _currentProcess?.Kill(true);
            result.Output = "[CANCELLED] العملية تم إلغاؤها";
            result.ExitCode = -1;
        }
        catch (Exception ex)
        {
            result.Output = $"[ERROR] {ex.Message}";
            result.ExitCode = -1;
        }
        finally
        {
            result.IsRunning = false;
            _currentProcess?.Dispose();
            _currentProcess = null;
        }

        return result;
    }

    public async Task<TerminalCommand> ExecuteAzureCliAsync(string azCommand, CancellationToken cancellationToken = default)
    {
        return await ExecuteCommandAsync($"az {azCommand}", cancellationToken);
    }

    public async Task<TerminalCommand> ExecuteGitAsync(string gitCommand, CancellationToken cancellationToken = default)
    {
        return await ExecuteCommandAsync($"git {gitCommand}", cancellationToken);
    }

    public void CancelCurrentProcess()
    {
        if (_currentProcess != null && !_currentProcess.HasExited)
        {
            _currentProcess.Kill(true);
        }
    }
}
