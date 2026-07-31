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
    ["python", "Python"], 
    ["javascript", "JavaScript"], 
    ["typescript", "TypeScript"],
    ["fastapi", "FastAPI"], 
    ["flask", "Flask"], 
    ["nodedotjs", "Node.js"], 
    ["react", "React"],
    ["tailwindcss", "Tailwind CSS"], 
    ["huggingface", "Hugging Face"], 
    ["openai", "OpenAI"],
    ["postgresql", "PostgreSQL"], 
    ["firebase", "Firebase"], 
    ["supabase", "Supabase"],
    ["docker", "Docker"], 
    ["googlecloud", "Google Cloud"], 
    ["vercel", "Vercel"],
    ["git", "Git"], 
    ["github", "GitHub"], 
    ["n8n", "n8n"], 
    ["zapier", "Zapier"]
  ];

  const marquee = document.getElementById('techMarquee');
  if (marquee) {
    const buildRow = () => techs.map(([slug, label]) =>
      `<span class="tech-tile" title="${label}"><img src="https://cdn.simpleicons.org/${slug}" alt="${label}" loading="lazy" onerror="this.parentElement.style.display='none'"></span>`
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
});
