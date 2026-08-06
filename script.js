document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile Nav Toggle ----
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ---- Role Rotator ----
  const roleText = document.getElementById('roleText');
  const roles = ["FULL STACK AI DEVELOPER", "AI AUTOMATION ENGINEER", "RAG & AGENT SPECIALIST", "COGNITIVE SYSTEMS BUILDER"];
  let roleIndex = 0;
  
  if (roleText) {
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex];
    }, 3200);
  }

  // ---- Tech Marquee Content ----
  const techs = [
    { slug: "html5", label: "HTML5" },
    { slug: "css3", label: "CSS3" },
    { slug: "javascript", label: "JavaScript" },
    { slug: "react", label: "React" },
    { slug: "angular", label: "Angular" },
    { slug: "bootstrap", label: "Bootstrap" },
    { slug: "nodedotjs", label: "Node.js" },
    { slug: "php", label: "PHP" },
    { slug: "postgresql", label: "PostgreSQL" },
    { slug: "wordpress", label: "WordPress" },
    { slug: "shopify", label: "Shopify" },
    { slug: "gatsby", label: "Gatsby" },
    { slug: "vite", label: "Vite" },
    { slug: "github", label: "GitHub", invert: true },
    { slug: "figma", label: "Figma" },
    { slug: "python", label: "Python" },
    { slug: "npm", label: "npm" },
    { slug: "fastapi", label: "FastAPI" },
    { slug: "docker", label: "Docker" },
    { slug: "n8n", label: "n8n" }
  ];

  const marquee = document.getElementById('techMarquee');
  if (marquee) {
    const buildRow = () => techs.map(t =>
      `<span class="tech-tile" title="${t.label}"><img src="https://cdn.simpleicons.org/${t.slug}" alt="${t.label}" class="${t.invert ? 'icon-white' : ''}" loading="lazy" onerror="this.parentElement.style.display='none'"></span>`
    ).join('');
    marquee.innerHTML = buildRow() + buildRow();
  }

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-rule');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // ---- Hero AI Grid Box Canvas Animation Engine ----
  const initHeroGrid = () => {
    const canvas = document.getElementById('heroGridCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const CELL_SIZE = 85; // Size of grid box in pixels

    let mouseX = -1000;
    let mouseY = -1000;
    let startTime = null;

    // Active AI Node cells
    let nodeCells = [];

    const resize = () => {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / CELL_SIZE) + 1;
      rows = Math.ceil(height / CELL_SIZE) + 1;

      // Pick random nodes across grid
      nodeCells = [];
      const labels = ["NODE_01", "AI_CORE", "SYS.88", "AGENT_RAG", "0x3F", "[+] GRID", "NEURAL_V2"];
      for (let i = 0; i < 7; i++) {
        const c = Math.floor(Math.random() * (cols - 2)) + 1;
        const r = Math.floor(Math.random() * (rows - 2)) + 1;
        const label = labels[i % labels.length];
        nodeCells.push({ col: c, row: r, label: label, pulse: Math.random() * Math.PI * 2 });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });

      heroSection.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
      });
    }

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // in seconds

      ctx.clearRect(0, 0, width, height);

      const baseLineColor = 'rgba(17, 17, 15, 0.08)';
      const accentOrange = 'rgba(238, 90, 42, 1)';
      const maxDist = Math.max(1, (cols - 1) + (rows - 1));

      // Continuous wave pulse from top-right every 4.5 seconds after initial load
      const waveCycle = elapsed > 2.8 ? ((elapsed - 2.8) % 4.5) / 4.5 : -1;

      // Draw all grid boxes from Top-Right (cols - 1, 0) towards Bottom-Left (0, rows - 1)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * CELL_SIZE;
          const y = r * CELL_SIZE;

          // Distance metric from Top-Right corner (cols - 1, 0)
          const distIndex = (cols - 1 - c) + r;
          const cellNormDist = distIndex / maxDist; // 0 at top-right, 1 at bottom-left

          // Initial reveal progress for this cell
          // Cell starts appearing gradually based on top-right origin
          const buildStart = cellNormDist * 1.8;
          const cellProgress = Math.max(0, Math.min(1, (elapsed - buildStart) / 0.5));

          if (cellProgress > 0) {
            // Draw grid box border
            ctx.beginPath();
            ctx.rect(x, y, CELL_SIZE, CELL_SIZE);

            if (cellProgress < 1) {
              // Box is currently forming smoothly: bright orange border & soft inner glow!
              ctx.strokeStyle = `rgba(238, 90, 42, ${0.8 * (1 - cellProgress * 0.5)})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();

              ctx.fillStyle = `rgba(238, 90, 42, ${0.15 * (1 - cellProgress)})`;
              ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            } else {
              // Fully formed box: standard crisp blueprint line
              ctx.strokeStyle = baseLineColor;
              ctx.lineWidth = 1;
              ctx.stroke();
            }

            // Periodic subtle wave pulse passing from top-right to bottom-left
            if (waveCycle >= 0) {
              const waveDist = Math.abs(cellNormDist - waveCycle);
              if (waveDist < 0.12) {
                const waveIntensity = 1 - (waveDist / 0.12);
                ctx.strokeStyle = `rgba(238, 90, 42, ${0.4 * waveIntensity})`;
                ctx.lineWidth = 1.2;
                ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);

                ctx.fillStyle = `rgba(238, 90, 42, ${0.06 * waveIntensity})`;
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
              }
            }

            // Corner crosshair "+" at intersection
            ctx.strokeStyle = 'rgba(17, 17, 15, 0.16)';
            ctx.lineWidth = 1;
            const cs = 3;
            ctx.beginPath();
            ctx.moveTo(x - cs, y); ctx.lineTo(x + cs, y);
            ctx.moveTo(x, y - cs); ctx.lineTo(x, y + cs);
            ctx.stroke();
          }
        }
      }

      // Render Active AI Nodes (Tech data in grid boxes)
      nodeCells.forEach(node => {
        if (node.col < cols && node.row < rows) {
          const nx = node.col * CELL_SIZE;
          const ny = node.row * CELL_SIZE;

          // Check if top-right build progress has reached this node
          const distIndex = (cols - 1 - node.col) + node.row;
          const cellNormDist = distIndex / maxDist;
          if (elapsed > cellNormDist * 1.8) {
            node.pulse += 0.03;
            const alpha = 0.35 + Math.sin(node.pulse) * 0.25;

            // Box outline
            ctx.strokeStyle = `rgba(238, 90, 42, ${alpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(nx + 3, ny + 3, CELL_SIZE - 6, CELL_SIZE - 6);

            // Subtle orange fill
            ctx.fillStyle = `rgba(238, 90, 42, ${alpha * 0.08})`;
            ctx.fillRect(nx + 3, ny + 3, CELL_SIZE - 6, CELL_SIZE - 6);

            // Text label inside box
            ctx.font = '600 9px "JetBrains Mono", monospace';
            ctx.fillStyle = `rgba(238, 90, 42, ${alpha + 0.2})`;
            ctx.fillText(node.label, nx + 7, ny + 17);

            // Corner accent dot
            ctx.fillStyle = accentOrange;
            ctx.fillRect(nx + CELL_SIZE - 8, ny + 5, 3, 3);
          }
        }
      });

      // 6. Interactive Mouse Hover (Highlighting hovered grid box & adjacent matrix)
      if (mouseX > 0 && mouseY > 0) {
        const hoverCol = Math.floor(mouseX / CELL_SIZE);
        const hoverRow = Math.floor(mouseY / CELL_SIZE);

        if (hoverCol >= 0 && hoverCol < cols && hoverRow >= 0 && hoverRow < rows) {
          const hx = hoverCol * CELL_SIZE;
          const hy = hoverRow * CELL_SIZE;

          // Primary hovered box
          ctx.fillStyle = 'rgba(238, 90, 42, 0.12)';
          ctx.fillRect(hx, hy, CELL_SIZE, CELL_SIZE);

          ctx.strokeStyle = accentOrange;
          ctx.lineWidth = 2;
          ctx.strokeRect(hx + 1, hy + 1, CELL_SIZE - 2, CELL_SIZE - 2);

          // Hover tag
          ctx.font = '700 9px "JetBrains Mono", monospace';
          ctx.fillStyle = '#11110F';
          ctx.fillText(`[${hoverCol}:${hoverRow}]`, hx + 6, hy + CELL_SIZE - 8);
        }
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  };

  initHeroGrid();

  // ==========================================================================
  // CUTE ROBOT AI CHATBOT ASSISTANT ENGINE
  // ==========================================================================
  const initChatbot = () => {
    const chatbotWidget = document.getElementById('aiChatbotWidget');
    const chatbotTrigger = document.getElementById('chatbotTrigger');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbotBtn = document.getElementById('closeChatbotBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const ttsToggleBtn = document.getElementById('ttsToggleBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const micBtn = document.getElementById('micBtn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    if (!chatbotWidget || !chatbotTrigger || !chatbotWindow || !chatForm || !chatInput) return;

    let isTTSEnabled = false;
    let recognition = null;
    let isListening = false;

    // --- Knowledge Base Repository ---
    const KNOWLEDGE = {
      profile: {
        name: "Hamayoon Ali",
        title: "Full Stack AI Developer & Automation Engineer",
        education: "BS in Data Science from KFUEIT (Rahim Yar Khan) with CGPA 3.47 / 4.0",
        currentJob: "AI Automation / Full Stack Developer at Codagentic (June 2025 — Present)",
        location: "Daharki, Sindh, Pakistan",
        bio: "Hamayoon is a Full Stack AI Developer passionate about grounded RAG applications, voice AI agents, backend APIs, and LLM automation systems that deliver real business impact.",
        stats: "3+ Production AI Systems Shipped, 15+ GitHub Repositories, 35% Workflow Efficiency Boost engineered."
      },
      skills: [
        "Python, PyTorch, PEFT/LoRA, Unsloth, HuggingFace",
        "RAG (Retrieval-Augmented Generation), Vector Search, LangChain, LangGraph",
        "FastAPI, Node.js, TypeScript, React, SQL, PostgreSQL",
        "Voice AI (Retell AI, Twilio Webhooks, Speech Synthesis)",
        "Docker, n8n Workflow Automation, Git, GCP"
      ],
      projects: [
        {
          name: "Boardmate",
          type: "RAG & Vector Search",
          desc: "AI study assistant for Pakistani students in grades 9–12 (Punjab, Sindh, KPK, Balochistan & Federal boards) retrieving answers straight from textbooks using RAG and vector search.",
          link: "#projects",
          repo: "https://github.com/Yasir019/boardmate"
        },
        {
          name: "AI SDR Agent",
          type: "AI Agents & Sales Automation",
          desc: "Autonomous sales rep agent qualifying inbound leads, composing personalized emails, and booking meetings automatically via LangChain & TypeScript.",
          link: "#projects",
          repo: "https://github.com/Hamayoon-Bhutto/AISDR"
        },
        {
          name: "AI Dental Receptionist",
          type: "Voice AI & Appointment Automation",
          desc: "Conversational voice agent placing outbound calls, checking dentist availability, booking appointments, and logging calls on a live dashboard via Retell AI, n8n & Twilio.",
          link: "#projects",
          repo: "https://github.com/Hamayoon-Bhutto/ai-dental-receptionist-automation"
        },
        {
          name: "LLaMA 3.2 Fine-Tuning",
          type: "Parameter-Efficient LLMs",
          desc: "LoRA and QLoRA fine-tuning pipeline for LLaMA 3.2 models using Unsloth, 4-bit quantization, and GGUF export for edge inference.",
          link: "#intelligence",
          repo: "https://github.com/Hamayoon-Bhutto/Fine-Tuning-llma-3.2"
        },
        {
          name: "Code Archaeologist",
          type: "Dev Tooling & Git Analysis",
          desc: "LLM tool analyzing git blame graphs and commit history to explain legacy code rationale prior to refactoring.",
          link: "#intelligence",
          repo: "https://github.com/Hamayoon-Bhutto/Code-Archaeologist"
        },
        {
          name: "ETH Price Forecasting (ARIMA)",
          type: "Time Series & Econometrics",
          desc: "Statistical price forecasting pipeline using stationarity differencing and ARIMA models for Ethereum.",
          link: "#intelligence",
          repo: "https://github.com/Hamayoon-Bhutto/Ethereum-Price-Forecasting-with-ARIMA"
        }
      ],
      services: [
        "🤖 **Production AI Systems & LLM Integration**: Custom RAG pipelines, fine-tuned models, and intelligent workflows.",
        "🎙️ **Voice AI Assistants**: Autonomous voice agents for phone calls, customer intake, and appointment booking.",
        "⚡ **Workflow & Process Automation**: Enterprise n8n, FastAPI backends, and CRM/webhook integrations.",
        "💻 **Full Stack Web & API Development**: High-performance backends and interactive web interfaces."
      ],
      contact: {
        email: "hamayoonaliai@gmail.com",
        phone: "+92 301 8249617",
        location: "Daharki, Sindh, Pakistan",
        github: "https://github.com/Hamayoon-Bhutto",
        linkedin: "https://www.linkedin.com/in/hamayoon-ali",
        resume: "assets/Hamayoon-Resume.pdf"
      }
    };

    // --- Fuzzy Text & Typo Matcher Helper ---
    const levenshtein = (a, b) => {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      const matrix = [];
      for (let i = 0; i <= b.length; i++) matrix[i] = [i];
      for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
          }
        }
      }
      return matrix[b.length][a.length];
    };

    const hasMatch = (query, targetKeywords) => {
      const q = query.toLowerCase();
      const words = q.split(/[\s,?.!_/-]+/);

      for (const target of targetKeywords) {
        const t = target.toLowerCase();
        // Exact substring match
        if (q.includes(t)) return true;

        // Token-level fuzzy match for typos (e.g. boardmte -> boardmate, archeogist -> archaeologist)
        for (const w of words) {
          if (w.length >= 3 && t.length >= 3) {
            if (w === t) return true;
            // Allow 1 typo for short words, 2 typos for medium words, 3 for long words
            const maxDistance = t.length > 8 ? 3 : t.length > 5 ? 2 : 1;
            if (Math.abs(w.length - t.length) <= 2 && levenshtein(w, t) <= maxDistance) {
              return true;
            }
          }
        }
      }
      return false;
    };

    // --- Intent Matching Engine ---
    const generateBotResponse = (userQuery) => {
      const q = userQuery.toLowerCase().trim();

      // 1. SPECIFIC PROJECT INQUIRIES (Highest Priority to avoid generic 'about' false matches)
      
      // Boardmate Project
      if (hasMatch(q, ["boardmate", "boardmte", "board mate", "board-mate", "textbook rag", "punjab board", "sindh board", "9th grade", "12th grade"])) {
        return `📚 <strong>Boardmate — AI Study Assistant:</strong><br><br>` +
               `• <strong>Description:</strong> An AI-powered learning platform designed for Pakistani students in grades 9–12 (covering Punjab, Sindh, KPK, Balochistan & Federal boards).<br>` +
               `• <strong>Architecture:</strong> Grounded Retrieval-Augmented Generation (RAG) and vector search that retrieves precise explanations straight from board-specific textbooks.<br>` +
               `• <strong>Tech Stack:</strong> Python, RAG, NLP, Vector Search, FastAPI, LLMs.<br><br>` +
               `🔗 <a href="https://github.com/Yasir019/boardmate" target="_blank" rel="noopener">View Boardmate GitHub Repository ↗</a><br>` +
               `📍 <a href="#projects">View in Featured Projects section</a>`;
      }

      // Code Archaeologist Project
      if (hasMatch(q, ["code archaeologist", "code archeogist", "archeogist", "archaeologist", "code-archaeologist", "archaeology", "git blame", "git history", "legacy code"])) {
        return `🏛️ <strong>Code Archaeologist — AI Dev Tooling:</strong><br><br>` +
               `• <strong>Description:</strong> An intelligent developer CLI tool that digs through git commit graph history and blame logs to explain <em>why</em> legacy code was originally written before developers refactor it.<br>` +
               `• <strong>Capabilities:</strong> Automated git graph traversal, natural language commit reasoning, and pre-refactor risk extraction.<br>` +
               `• <strong>Tech Stack:</strong> Python, Git API, OpenAI, LangChain, CLI.<br><br>` +
               `🔗 <a href="https://github.com/Hamayoon-Bhutto/Code-Archaeologist" target="_blank" rel="noopener">View Code Archaeologist Repo ↗</a><br>` +
               `📍 <a href="#intelligence">View in Intelligence section</a>`;
      }

      // AI SDR Agent
      if (hasMatch(q, ["ai sdr", "sdr agent", "sdr", "sales agent", "sales development", "outreach agent", "lead qualification"])) {
        return `⚡ <strong>AI SDR — Autonomous Sales Development Agent:</strong><br><br>` +
               `• <strong>Description:</strong> An autonomous sales agent that qualifies inbound leads, writes personalized outreach emails, and schedules meetings automatically.<br>` +
               `• <strong>Impact:</strong> Eliminates manual lead triage and ensures no lead drops through the cracks.<br>` +
               `• <strong>Tech Stack:</strong> LangChain, TypeScript, LLMs, Automation APIs.<br><br>` +
               `🔗 <a href="https://github.com/Hamayoon-Bhutto/AISDR" target="_blank" rel="noopener">View AI SDR GitHub Repo ↗</a><br>` +
               `📍 <a href="#projects">View in Featured Projects section</a>`;
      }

      // AI Dental Receptionist
      if (hasMatch(q, ["dental", "dental receptionist", "voice receptionist", "receptionist", "retell", "retell ai", "appointment booking"])) {
        return `🦷 <strong>AI Dental Receptionist — Voice AI Automation:</strong><br><br>` +
               `• <strong>Description:</strong> A conversational voice AI agent that handles patient phone calls, qualifies leads, checks calendar availability, and books dental appointments live.<br>` +
               `• <strong>Features:</strong> Automated outbound calls, real-time audio transcripts, SMS alerts, and live dashboard tracking.<br>` +
               `• <strong>Tech Stack:</strong> Retell AI, n8n, Twilio, React, Webhooks.<br><br>` +
               `🔗 <a href="https://github.com/Hamayoon-Bhutto/ai-dental-receptionist-automation" target="_blank" rel="noopener">View AI Dental Receptionist Repo ↗</a><br>` +
               `📍 <a href="#projects">View in Featured Projects section</a>`;
      }

      // LLaMA 3.2 Fine-Tuning
      if (hasMatch(q, ["llama", "llma", "llama 3.2", "fine-tuning", "finetuning", "lora", "qlora", "unsloth", "peft", "quantization"])) {
        return `🦙 <strong>LLaMA 3.2 Fine-Tuning Pipeline:</strong><br><br>` +
               `• <strong>Description:</strong> Parameter-efficient fine-tuning framework optimizing LLaMA 3.2 models for specialized domain tasks and custom datasets.<br>` +
               `• <strong>Highlights:</strong> 4-bit QLoRA quantization for reduced VRAM, evaluation scripts, and GGUF export for local edge inference.<br>` +
               `• <strong>Tech Stack:</strong> Python, PEFT / LoRA, Unsloth, PyTorch, HuggingFace.<br><br>` +
               `🔗 <a href="https://github.com/Hamayoon-Bhutto/Fine-Tuning-llma-3.2" target="_blank" rel="noopener">View Fine-Tuning Repo ↗</a>`;
      }

      // ETH Price Forecasting
      if (hasMatch(q, ["eth", "ethereum", "arima", "price forecasting", "forecasting", "time series", "statsmodels"])) {
        return `📈 <strong>ETH Price Forecasting (ARIMA):</strong><br><br>` +
               `• <strong>Description:</strong> Econometric price prediction pipeline utilizing ARIMA time series models, stationarity differencing, and trend forecasting for Ethereum.<br>` +
               `• <strong>Tech Stack:</strong> Python, Statsmodels, ARIMA, Pandas, Matplotlib.<br><br>` +
               `🔗 <a href="https://github.com/Hamayoon-Bhutto/Ethereum-Price-Forecasting-with-ARIMA" target="_blank" rel="noopener">View Ethereum ARIMA Repo ↗</a>`;
      }

      // 2. GENERAL PROJECTS / WORK INQUIRIES
      if (hasMatch(q, ["projects", "project", "what did he build", "portfolio", "built", "work", "systems", "show work"])) {
        let pList = KNOWLEDGE.projects.map(p => `• <strong>${p.name}</strong> (${p.type}): ${p.desc} <a href="${p.repo}" target="_blank">[Repo ↗]</a>`).join('<br><br>');
        return `<strong>Hamayoon's Featured AI Systems:</strong><br><br>${pList}<br><br>📍 You can explore all details in the <a href="#projects">Projects</a> section!`;
      }

      // 3. SKILLS & TECH STACK INQUIRIES
      if (hasMatch(q, ["skill", "skills", "stack", "tech", "technology", "languages", "python", "fastapi", "react", "rag", "langchain", "docker", "n8n", "ai", "tools"])) {
        let sList = KNOWLEDGE.skills.map(s => `• ${s}`).join('<br>');
        return `<strong>Hamayoon's Tech Stack & Capabilities:</strong><br><br>${sList}<br><br>He focuses on building robust, production-ready AI agents and grounded systems!`;
      }

      // 4. SERVICES & FREELANCE / CONSULTING INQUIRIES
      if (hasMatch(q, ["service", "services", "offer", "provide", "hire", "hiring", "freelance", "consult", "cost", "rate", "what can he do"])) {
        let srvList = KNOWLEDGE.services.join('<br><br>');
        return `<strong>Services Hamayoon Offers:</strong><br><br>${srvList}<br><br>Interested in working together? <a href="#contact">Get in touch with Hamayoon!</a>`;
      }

      // 5. CONTACT & RESUME / CV INQUIRIES
      if (hasMatch(q, ["contact", "email", "mail", "phone", "call", "reach", "number", "linkedin", "github", "cv", "resume", "pdf", "download"])) {
        return `<strong>Contact & Credentials:</strong><br>
• <strong>Email:</strong> <a href="mailto:${KNOWLEDGE.contact.email}">${KNOWLEDGE.contact.email}</a><br>
• <strong>Phone:</strong> <a href="tel:${KNOWLEDGE.contact.phone}">${KNOWLEDGE.contact.phone}</a><br>
• <strong>GitHub:</strong> <a href="${KNOWLEDGE.contact.github}" target="_blank" rel="noopener">github.com/Hamayoon-Bhutto ↗</a><br>
• <strong>LinkedIn:</strong> <a href="${KNOWLEDGE.contact.linkedin}" target="_blank" rel="noopener">linkedin.com/in/hamayoon-ali ↗</a><br>
• <strong>Resume:</strong> <a href="${KNOWLEDGE.contact.resume}" download>Download Full Resume (PDF) 📄</a>`;
      }

      // 6. EDUCATION & DEGREE INQUIRIES
      if (hasMatch(q, ["education", "degree", "university", "kfueit", "data science", "gpa", "cgpa", "bachelor", "graduated", "bs"])) {
        return `🎓 <strong>Education Background:</strong><br><br>` +
               `• <strong>Degree:</strong> Bachelor of Science in Data Science (Completed)<br>` +
               `• <strong>University:</strong> KFUEIT (Khwaja Fareed University of Engineering & Information Technology), Rahim Yar Khan<br>` +
               `• <strong>CGPA:</strong> <strong>3.47 / 4.0</strong><br>` +
               `• <strong>Coursework:</strong> Machine Learning, Neural Networks, Database Management Systems, Data Structures & Software Engineering.`;
      }

      // 7. WORK EXPERIENCE / JOB INQUIRIES
      if (hasMatch(q, ["job", "work experience", "codagentic", "company", "journey", "role", "experience"])) {
        return `💼 <strong>Work Experience:</strong><br><br>` +
               `• <strong>Company:</strong> Codagentic (Rahim Yar Khan)<br>` +
               `• <strong>Role:</strong> AI Automation / Full Stack Developer (June 2025 — Present)<br>` +
               `• <strong>Highlights:</strong> Engineering production AI systems, FastAPI backends, and LLM automation workflows. Improved team workflow efficiency by approximately 35%.`;
      }

      // 8. GREETINGS
      if (hasMatch(q, ["hi", "hello", "hey", "greetings", "hola", "assalam", "sup", "who are you"])) {
        return `Beep boop! 🤖 Hello! I'm <strong>HY-BOT</strong>, Hamayoon's AI Assistant.<br><br>Ask me anything about Hamayoon's projects (like <em>Boardmate</em> or <em>Code Archaeologist</em>), skills, services, or resume!`;
      }

      // 9. GENERAL BIO / ABOUT HAMAYOON (Only triggered if no specific entity above matched)
      if (hasMatch(q, ["who is", "who is hamayoon", "about hamayoon", "bio", "background", "profile", "tell me about yourself"])) {
        return `<strong>About Hamayoon Ali:</strong><br>
• <strong>Role:</strong> ${KNOWLEDGE.profile.title}<br>
• <strong>Current Job:</strong> Working at <strong>Codagentic</strong> in Rahim Yar Khan building AI automation & full-stack applications (boosted workflow efficiency by ~35%).<br>
• <strong>Education:</strong> Completed <strong>BS in Data Science</strong> from KFUEIT with CGPA <strong>3.47 / 4.0</strong>.<br>
• <strong>Location:</strong> ${KNOWLEDGE.profile.location}.<br><br>
You can view his complete journey in the <a href="#about">About</a> and <a href="#experience">Experience</a> sections!`;
      }

      // 10. INTELLIGENT SEARCH FALLBACK
      // If user types a general query, search terms across all project titles and knowledge items
      let matchedItems = [];
      KNOWLEDGE.projects.forEach(p => {
        if (hasMatch(q, [p.name, p.type, p.desc])) {
          matchedItems.push(`• <strong>${p.name}</strong> (${p.type}): ${p.desc} <a href="${p.repo}" target="_blank">[Repo ↗]</a>`);
        }
      });

      if (matchedItems.length > 0) {
        return `Here is what I found related to your search:<br><br>${matchedItems.join('<br><br>')}`;
      }

      return `I understand you're asking about "<em>${escapeHTML(userQuery)}</em>".<br><br>` +
             `I am trained on everything in Hamayoon's portfolio! Try asking me about:<br>` +
             `• <strong>Boardmate</strong> or <strong>Code Archaeologist</strong><br>` +
             `• <strong>AI SDR</strong> or <strong>AI Dental Receptionist</strong><br>` +
             `• <strong>Skills, FastAPI, RAG & Tech Stack</strong><br>` +
             `• <strong>Services offered or Resume Download</strong>`;
    };

    const escapeHTML = (str) => {
      return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
      );
    };

    // --- Message UI Rendering ---
    const appendUserMessage = (text) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg user';
      msgDiv.innerHTML = `
        <div class="chat-msg-avatar">YOU</div>
        <div class="chat-msg-bubble">${escapeHTML(text)}</div>
      `;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const appendBotMessage = (htmlContent) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg bot';
      msgDiv.innerHTML = `
        <div class="chat-msg-avatar">
          <svg viewBox="0 0 100 100" fill="none" width="18" height="18">
            <rect x="20" y="20" width="60" height="54" rx="14" fill="#EE5A2A"/>
            <circle cx="39" cy="42" r="6" fill="#F4EFE6"/>
            <circle cx="61" cy="42" r="6" fill="#F4EFE6"/>
            <path d="M 42 54 Q 50 58 58 54" stroke="#F4EFE6" stroke-width="4" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <div class="chat-msg-bubble">${htmlContent}</div>
      `;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Text-to-Speech playback if enabled
      if (isTTSEnabled && 'speechSynthesis' in window) {
        speakText(htmlContent);
      }
    };

    const showTypingIndicator = () => {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg bot typing-msg';
      typingDiv.id = 'typingIndicator';
      typingDiv.innerHTML = `
        <div class="chat-msg-avatar">
          <svg viewBox="0 0 100 100" fill="none" width="18" height="18">
            <rect x="20" y="20" width="60" height="54" rx="14" fill="#EE5A2A"/>
          </svg>
        </div>
        <div class="chat-msg-bubble typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      `;
      chatMessages.appendChild(typingDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
      const indicator = document.getElementById('typingIndicator');
      if (indicator) indicator.remove();
    };

    const handleUserSubmit = (queryText) => {
      const text = queryText || chatInput.value.trim();
      if (!text) return;

      appendUserMessage(text);
      chatInput.value = '';

      showTypingIndicator();

      // Simulate live AI reasoning delay
      setTimeout(() => {
        removeTypingIndicator();
        const botReply = generateBotResponse(text);
        appendBotMessage(botReply);
      }, 450);
    };

    // --- Voice Assistant TTS (Text to Speech) ---
    const speakText = (htmlText) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel(); // stop current speech
      
      // Strip HTML tags for Speech Synthesis
      const plainText = htmlText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    };

    if (ttsToggleBtn) {
      ttsToggleBtn.addEventListener('click', () => {
        isTTSEnabled = !isTTSEnabled;
        ttsToggleBtn.classList.toggle('active', isTTSEnabled);
        ttsToggleBtn.title = isTTSEnabled ? "Voice Response: ON" : "Voice Response: OFF";
        if (!isTTSEnabled && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      });
    }

    // --- Voice Input Speech Recognition ---
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('listening');
        chatInput.placeholder = "Listening to your voice...";
      };

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        chatInput.value = transcript;
        handleUserSubmit(transcript);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e.error);
        stopListening();
      };

      recognition.onend = () => {
        stopListening();
      };
    } else {
      if (micBtn) micBtn.style.display = 'none';
    }

    const stopListening = () => {
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
      chatInput.placeholder = "Ask anything about Hamayoon...";
    };

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (!recognition) return;
        if (isListening) {
          recognition.stop();
        } else {
          try {
            recognition.start();
          } catch (err) {
            console.error('Speech recognition error:', err);
          }
        }
      });
    }

    // --- Event Listeners ---
    chatbotTrigger.addEventListener('click', () => {
      chatbotWidget.classList.add('open');
      chatbotWindow.setAttribute('aria-hidden', 'false');
      chatInput.focus();
      
      // Initial Welcome Message if empty
      if (chatMessages.children.length === 0) {
        appendBotMessage(`Beep boop! 🤖 Welcome to Hamayoon's Portfolio!<br><br>I am <strong>HY-BOT</strong>, an AI Assistant trained on Hamayoon's skills, projects, BS Data Science education, and service offerings.<br><br>Feel free to click any prompt below or type your question!`);
      }
    });

    closeChatbotBtn.addEventListener('click', () => {
      chatbotWidget.classList.remove('open');
      chatbotWindow.setAttribute('aria-hidden', 'true');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });

    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        appendBotMessage(`Chat reset cleanly! 🤖 How can I help you next?`);
      });
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });

    promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        handleUserSubmit(prompt);
      });
    });
  };

  initChatbot();
});

