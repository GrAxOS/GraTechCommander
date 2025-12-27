# 🤝 Contributing to GraTech Commander

First off, thank you for considering contributing! 🎉

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#-development-setup)
- [Style Guidelines](#-style-guidelines)
- [Commit Messages](#-commit-messages)

## 📜 Code of Conduct

This project follows the **GraTech Philosophy**:

> *"We build AI that serves humans, not controls them."*

Be respectful, be inclusive, be awesome.

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

1. Check if the bug is already reported
2. Open an issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### ✨ Suggesting Features

1. Open an issue with `[Feature Request]` prefix
2. Describe the feature
3. Explain why it's useful

### 🔧 Pull Requests

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes
4. Test thoroughly
5. Commit with meaningful messages
6. Push and create a PR

## 🛠️ Development Setup

### Web Version
```bash
# Clone
git clone https://github.com/GrAxOS/GraTechCommander.git
cd GraTechCommander

# Open in browser
start index.html
```

### Electron Desktop
```bash
npm install
npm start
```

### WPF Desktop
```bash
# Open GraTechCommander.sln in Visual Studio
# Build > Build Solution (Ctrl+Shift+B)
```

## 🎨 Style Guidelines

### JavaScript
- Use ES6+ features
- Prefer `const` over `let`
- Use meaningful variable names
- Comment complex logic

```javascript
// ✅ Good
const userPreferences = loadUserPrefs();

// ❌ Bad
const x = loadUserPrefs();
```

### CSS
- Use CSS variables from `:root`
- Mobile-first approach
- RTL support always

```css
/* ✅ Good */
.button {
  background: var(--accent-primary);
  padding: 10px 20px;
}

/* ❌ Bad */
.button {
  background: #00d4ff;
  padding: 10px 20px;
}
```

### Arabic Support
- Always test RTL layouts
- Use Arabic comments for Arabic-specific code

## 📝 Commit Messages

Use this format:

```
<type>: <short description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat: add voice input support
fix: resolve RTL alignment in notes view
docs: update README with new features
```

## 🏆 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Forever appreciated! 💜

---

**Questions?** Open an issue or email admin@gratech.sa

شكراً! 🇸🇦
