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
});
