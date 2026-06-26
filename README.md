# Tanuj Rajput | AI Engineer Portfolio

A premium, modern, dark-themed portfolio website designed for **Tanuj Rajput**, an AI Engineer specializing in autonomous AI agents, LangGraph architectures, RAG systems, FastAPI backends, and intelligent workflow automation. 

The visual design combines the sleek aesthetics of **Apple** (typography), **Linear** (glowing accents and grid overlays), **Vercel** (clean performance), and **OpenAI** (interactive AI widgets).

---

## 🌌 Core Visual & Interactive Features

- **Interactive Node Canvas**: A custom HTML5 Canvas particle network that moves, links dynamically to form node clusters, and repels from the user's mouse cursor.
- **AI Twin Chat Assistant**: An interactive floating chat widget at the bottom-right that acts as Tanuj's "AI Twin." Users can ask about his skills, projects, and availability via pre-canned prompt pills or by typing custom questions.
- **3D Glassmorphism Card Tilt**: Cards in the Projects, Skills, and Why Work With Me sections tilt in 3D perspective and glow dynamically based on the exact coordinates of the user's mouse cursor.
- **Dual Themes**: Features a premium high-contrast dark theme (default `#090909`) and a clean minimalist light theme, with user preference persisting across visits using `localStorage`.
- **Vertical Progress Timeline**: Interactive journey tracker showing key milestones from learning Python to building LangGraph systems and integrating MCP servers.
- **Dynamic Stats Counter**: Triggered by an Intersection Observer, stats count up dynamically from `0` to their targets once the stats section scrolls into view.

---

## 📂 Project Directory Structure

```text
├── assets/
│   ├── hero-workspace.png             # Premium mockup of AI node graph workspace
│   ├── project-research-agent.png     # Multi-agent LangGraph flow screenshot
│   ├── project-whatsapp-lead.png      # WhatsApp lead qualifying UI screenshot
│   ├── project-rag-qa.png             # Embeddings & PDF RAG dashboard mockup
│   ├── project-product-recommend.png  # Semantic intent-matching catalog mockup
│   └── resume.pdf                     # PDF resume placeholder
├── index.html                         # Semantic HTML5 architecture & SEO setup
├── style.css                          # Modern design system, themes, & keyframes
└── app.js                             # Canvas particles, tilt, counter, & AI dialog twin
```

---

## 🚀 Running Locally

The portfolio is built purely with **Vanilla HTML, CSS, and ES6 JavaScript** to ensure lightning-fast load times, solid SEO compliance, and dependency-free maintenance.

You can launch a local development server using any of the following methods:

### Option A: Using Node.js (Recommended)
If you have Node.js installed, run:
```bash
npx http-server -p 8080
```
Then visit: **[http://localhost:8080](http://localhost:8080)**

### Option B: Using Python
If you have Python installed, serve the current directory:
```bash
python -m http.server 8080
```
Then visit: **[http://localhost:8080](http://localhost:8080)**

---

## 🤖 Future Enhancements
1. **Live LLM Integration**: Connect the "AI Twin" widget to a serverless FastAPI backend running a real LangGraph/LangChain agent (e.g. using Gemini or GPT-4o-mini) to talk live with recruiters.
2. **MCP Server Controls**: Add a panel displaying real-time integrations matching local files or external resources using the Model Context Protocol.
3. **CI/CD Deployments**: Host on Vercel or GitHub Pages with automatic build pipelines.

---

*Designed & Developed by Tanuj Rajput.*
