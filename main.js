const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// GraTech Commander - Main Process
// By Suliman Alshammari @Grar00t

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'GraTech Commander',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // TODO: For production, enable contextIsolation and use preload script
      // contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js')
    },
    frame: true,
    backgroundColor: '#0a0a0a'
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  
  // Dev tools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers for AI Services - Microsoft Foundry Support
ipcMain.handle('chat-request', async (event, { message, model, apiKey, endpoint }) => {
  try {
    const fetch = require('node-fetch');
    
    // Microsoft Foundry uses /models endpoint for inference
    const foundryEndpoint = `${endpoint}/models/chat/completions?api-version=2024-05-01-preview`;
    
    const response = await fetch(foundryEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        model: model,
        max_tokens: 4096,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return { success: false, error: data.error.message || JSON.stringify(data.error) };
    }
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// GitHub API Handler
ipcMain.handle('github-request', async (event, { endpoint, token }) => {
  try {
    const fetch = require('node-fetch');
    
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      }
    });

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ===== SYSTEM ACCESS HANDLERS =====

// Execute terminal commands
ipcMain.handle('run-command', async (event, command) => {
  const { exec } = require('child_process');
  return new Promise((resolve) => {
    exec(command, { shell: 'powershell.exe' }, (error, stdout, stderr) => {
      resolve({
        success: !error,
        output: stdout || stderr,
        error: error?.message
      });
    });
  });
});

// Read file
ipcMain.handle('read-file', async (event, filePath) => {
  const fs = require('fs');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Write file
ipcMain.handle('write-file', async (event, { filePath, content }) => {
  const fs = require('fs');
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// List directory
ipcMain.handle('list-dir', async (event, dirPath) => {
  const fs = require('fs');
  const path = require('path');
  try {
    const items = fs.readdirSync(dirPath).map(name => {
      const fullPath = path.join(dirPath, name);
      const stat = fs.statSync(fullPath);
      return {
        name,
        isDir: stat.isDirectory(),
        size: stat.size,
        modified: stat.mtime
      };
    });
    return { success: true, items };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Get system info
ipcMain.handle('system-info', async () => {
  const os = require('os');
  return {
    platform: os.platform(),
    hostname: os.hostname(),
    user: os.userInfo().username,
    home: os.homedir(),
    cpus: os.cpus().length,
    memory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
    freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB'
  };
});

console.log('🔧 System Access Handlers Loaded');

