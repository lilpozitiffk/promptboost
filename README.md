# 🚀 PromptBoost: Professional Prompt Engineering Layer

**PromptBoost** is a non-intrusive Chrome Extension that bridges the gap between vague user intent and high-fidelity AI output. It lives directly inside ChatGPT, Claude, and Gemini, offering one-click prompt enhancements based on professional engineering frameworks.

![Version](https://img.shields.io/badge/version-0.0.1--mvp-blue)
![Framework](https://img.shields.io/badge/framework-Plasmo--React-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Key Features

- **Non-Intrusive UX:** Automatically detects natural typing pauses and offers an enhancement via a floating "Magic Wand" icon.
- **6-Layer Framework:** Transforms short drafts into structured instructions using:
  1. **Role:** Expert personas (Senior Architect, Lead Editor, etc.)
  2. **Context:** Situational background.
  3. **Task:** Precise verbs and clear objectives.
  4. **Audience:** Targeted tone and style.
  5. **Format:** Structural constraints (JSON, Markdown, Tables).
  6. **Reasoning:** Optional Chain-of-Thought logic.
- **Multi-Engine Support:** Choose between **Google Gemini (Free Tier)**, **Anthropic Claude (Pro)**, or high-performance **Local Mock Templates**.
- **Universal Compatibility:** Pinned UI support for `chatgpt.com`, `claude.ai`, and `gemini.google.com`.

---

## 🛠️ Tech Stack

- **[Plasmo](https://docs.plasmo.com/):** The professional framework for browser extensions.
- **React & Tailwind CSS:** Modern, responsive UI components.
- **Shadow DOM:** Complete style isolation to prevent site-level CSS conflicts.
- **MutationObserver API:** Persistent input tracking that survives SPA navigation.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### 1. Installation
```bash
git clone https://github.com/YOUR_USERNAME/promptboost.git
cd promptboost/promptboost-ext
npm install
```

### 2. Development
```bash
npm run dev
```

### 3. Load into Chrome
1. Open Chrome and navigate to `chrome://extensions/`.
2. Toggle **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the `promptboost-ext/build/chrome-mv3-dev` folder.

---

## ⚙️ Configuration

1. Click the **PromptBoost icon** in your browser toolbar.
2. Select **Settings**.
3. Toggle your preferred engine (Gemini or Claude).
4. Paste your API Key (get a free Gemini key at [Google AI Studio](https://aistudio.google.com/app/apikey)).
5. Click **Save Key**.

---

## 🗺️ Roadmap

- [x] MVP: Core 6-Layer transformation engine.
- [x] Support for ChatGPT, Claude, and Gemini.
- [ ] v1.1: Custom user templates and persona saving.
- [ ] v1.2: Support for local LLMs via WebGPU (Privacy-First Mode).
- [ ] v1.3: Analytics dashboard for prompt acceptance rates.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ for better human-AI collaboration.*
