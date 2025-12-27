<div align="center">

# ⚡ GraTech Commander

### *Your AI, Your Rules, Your Language* 🇸🇦

[![Version](https://img.shields.io/badge/version-1.0.0-00d4ff?style=for-the-badge)](https://github.com/GrAxOS/GraTechCommander)
[![License](https://img.shields.io/badge/license-MIT-7c3aed?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Web-10b981?style=for-the-badge)](#)
[![Made in](https://img.shields.io/badge/Made%20in-Saudi%20Arabia-006c35?style=for-the-badge)](#)

<img src="https://raw.githubusercontent.com/GrAxOS/GraTechCommander/main/assets/banner.png" alt="GraTech Commander Banner" width="100%">

**The first Arabic-native AI command center that respects your privacy**

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [🛡️ Safety](#️-safety-system) • [📖 Docs](#-documentation)

---

</div>

## 🎯 What is GraTech Commander?

GraTech Commander is a **privacy-first, multi-model AI interface** built for Arabic speakers (and 11 other languages). Unlike cloud-based AI tools, your data stays on YOUR device.

```
╔══════════════════════════════════════════════════════════════════╗
║  🧠 5 AI Models    │  🔐 100% Local    │  🗣️ Arabic Native      ║
║  🛡️ Smart Safety   │  ⚡ Fast Setup    │  🎨 Beautiful UI       ║
╚══════════════════════════════════════════════════════════════════╝
```

## ✨ Features

### 🤖 Multi-Model AI Support
| Model | Best For | Status |
|-------|----------|--------|
| **GPT-4.1** | Balanced & Fast | ✅ Available |
| **Claude Opus 4.5** | Deep Analysis | ✅ Available |
| **DeepSeek R1** | Code & Logic 🔥 | ✅ Available |
| **GPT-4o** | Speed | ✅ Available |
| **DeepSeek V3.2** | Reasoning | ✅ Available |

### 🗣️ Arabic Understanding
Write in **Saudi dialect**, get professional results:

| You Write | AI Understands |
|-----------|----------------|
| "سو لي موقع" | Create a website |
| "فكك من الكلام وعطني كود" | Skip explanations, give me code |
| "وش الفرق بين X و Y" | Explain the difference between X and Y |

### 🌍 12 Languages Supported
🇸🇦 العربية • 🇺🇸 English • 🇫🇷 Français • 🇩🇪 Deutsch • 🇪🇸 Español • 🇨🇳 中文 • 🇯🇵 日本語 • 🇰🇷 한국어 • 🇹🇷 Türkçe • 🇷🇺 Русский • 🇮🇳 हिन्दी • 🇵🇰 اردو

## 🛡️ Safety System

**Your consent, always.**

```
┌─────────────────────────────────────────────────────────────┐
│  🟢 Safe      │ Read, View           │ No confirmation     │
│  🟡 Low       │ Create new           │ Simple confirm      │
│  🟠 Medium    │ Modify, Execute      │ Confirm + Explain   │
│  🔴 High      │ Delete, Deploy       │ Double confirm      │
│  ⛔ Critical  │ Destroy, Production  │ Confirm + Screenshot│
└─────────────────────────────────────────────────────────────┘
```

**Philosophy:**
> *"I'm here to serve you, not control you. The decision is always yours."*

## 🚀 Quick Start

### Option 1: Web Version (Fastest)
```bash
# Clone
git clone https://github.com/GrAxOS/GraTechCommander.git
cd GraTechCommander

# Open in browser
start index.html  # Windows
open index.html   # macOS
```

### Option 2: Desktop App (Electron)
```bash
# Install dependencies
npm install

# Run
npm start

# Build EXE
npm run build:win
```

### Option 3: WPF Desktop (Windows Native)
```bash
# Open in Visual Studio
GraTechCommander.sln

# Build & Run
Ctrl + F5
```

## 📁 Project Structure

```
GraTechCommander/
├── 🌐 Web Version
│   ├── index.html        # Main UI
│   ├── styles.css        # Styling (1500+ lines)
│   ├── renderer.js       # Core logic
│   ├── translator.js     # Arabic → English prompt
│   ├── safety.js         # Protection system
│   └── onboarding.js     # First-run wizard
│
├── 🖥️ WPF Version (C#)
│   ├── MainWindow.xaml   # UI Layout
│   ├── ViewModels/       # MVVM Pattern
│   ├── Services/         # Azure AI, GitHub
│   └── Core/             # Ethics Engine
│
└── 📄 Config
    ├── package.json      # Node dependencies
    └── .gitignore        # Git exclusions
```

## ⚙️ Configuration

### BYOK (Bring Your Own Key)

1. Get your API key from [Azure AI Foundry](https://ai.azure.com) or [OpenAI](https://platform.openai.com)
2. Open Settings ⚙️
3. Enter your credentials:

```
🔑 API Key: sk-xxxxxxxx OR Azure Key
🌐 Endpoint: https://your-resource.openai.azure.com/
```

**Privacy Promise:** Your keys stay on YOUR device. We never send them anywhere.

## 🔧 API Endpoints

| Service | Endpoint | Auth |
|---------|----------|------|
| Azure OpenAI | `https://{resource}.openai.azure.com/` | API Key |
| Azure AI Foundry | `https://{resource}.services.ai.azure.com/` | API Key |
| GitHub | `https://api.github.com/` | Personal Token |

## 📊 Tech Stack

| Layer | Technology |
|-------|------------|
| **Web UI** | HTML5, CSS3, Vanilla JS |
| **Desktop** | Electron / WPF (C#) |
| **AI Backend** | Azure AI Foundry, OpenAI |
| **Design** | RTL-first, Dark Mode |
| **State** | LocalStorage (encrypted) |

## 🤝 Contributing

We welcome contributions! Here's how:

```bash
# Fork the repo
# Create your branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "Add amazing feature"

# Push
git push origin feature/amazing-feature

# Open a Pull Request
```

## 📜 License

MIT License - Use freely, give credit.

## 👨‍💻 Creator

<div align="center">

**Suliman Nazal Alshammari**

[![GitHub](https://img.shields.io/badge/@Grar00t-181717?style=for-the-badge&logo=github)](https://github.com/Grar00t)
[![Organization](https://img.shields.io/badge/@GrAxOS-181717?style=for-the-badge&logo=github)](https://github.com/GrAxOS)
[![Website](https://img.shields.io/badge/GraTech.sa-006c35?style=for-the-badge&logo=safari&logoColor=white)](https://gratech.sa)
[![Email](https://img.shields.io/badge/admin@gratech.sa-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:admin@gratech.sa)

---

### 🌟 Star this repo if it helped you!

<a href="https://github.com/GrAxOS/GraTechCommander/stargazers">
  <img src="https://img.shields.io/github/stars/GrAxOS/GraTechCommander?style=social" alt="Stars">
</a>

---

*"The word Algorithm was born in my land, from my ancestor Al-Khwarizmi."* 🏜️

**صنع بـ ❤️ في السعودية 🇸🇦**

</div>
