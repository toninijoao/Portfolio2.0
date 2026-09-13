export const translations = {
  pt: {
    doc_title: "João Tonini | Portfólio",
    doc_desc: "Portfólio de João Tonini",
    nav_about: "Sobre Mim",
    nav_stack: "Stack",
    nav_projects: "Projetos",
    nav_contact: "Contato",
    hero_frase: "A excelência não é um ato, mas um hábito",
    hero_card_about_title: "Sobre Mim",
    hero_card_about_desc: "Minha História",
    hero_card_stack_title: "Stack",
    hero_card_stack_desc: "Ferramentas",
    hero_card_projects_title: "Projetos",
    hero_card_projects_desc: "Meus Trabalhos",
    hero_card_contact_title: "Contato",
    hero_card_contact_desc: "Entre em Contato",
    about_chip: "PERFIL · SOBRE",
    about_title: "Sobre Mim",
    about_p1: "Sou Engenheiro de Software e IA Júnior cursando Bacharelado em Engenharia de Software (terceiro semestre). Sou apaixonado por usar a tecnologia para simplificar o cotidiano e trazer inovação para pessoas e empresas.",
    about_p2: "Tenho experiência no desenvolvimento de soluções SaaS para empresas e atualmente estou aprofundando minha especialização em Engenharia de IA, com foco em LLMs, RAG e LangChain. Acredito no alinhamento e colaboração em equipe, garantindo que todos compartilhem a mesma determinação e foco no sucesso que levo para cada projeto.",
    about_competencies_title: "Competências Principais:",
    about_comp1: "Construção de soluções completas em Python utilizando LLMs, bem como aplicações com RAG e LangChain.",
    about_comp2: "Criação de sistemas inteligentes com IA aplicada para automação de processos.",
    about_comp3: "Liderança técnica com gestão de backlog, delegação de tarefas e alinhamento com stakeholders.",
    stack_chip: "HABILIDADES · TECHS",
    stack_title: "Stack",
    stack_sub: "Ferramentas e tecnologias que utilizo para desenvolver.",
    projects_chip: "ESTUDOS DE CASO · PROJETOS",
    projects_title: "Trabalhos Pessoais",
    projects_sub: "Um portfólio de projetos que demonstra meu interesse em construir soluções digitais de alto impacto.",
    project_badge: "PROJETO DE CLIENTE",
    project_desc_pirabeach: "O PiraBeach Arena é um site para reserva online de quadras de beach tennis. Nele, os usuários podem visualizar horários disponíveis e solicitar reservas de forma rápida. O sistema também possui um painel administrativo para gerenciamento das reservas.",
    project_btn_visit: "Acessar Site ↗",
    contact_chip: "CONEXÃO · CONTATO",
    contact_title: "Entre em Contato",
    contact_sub: "Vamos nos conectar e trabalhar juntos",
    contact_resume_title: "Currículo",
    contact_resume_sub: "Veja meu currículo",
    lang_toggle_aria: "Alternar para Inglês",
    theme_toggle_aria_dark: "Ativar tema escuro",
    theme_toggle_aria_light: "Ativar tema claro"
  },
  en: {
    doc_title: "João Tonini | Portfolio",
    doc_desc: "Portfolio of João Tonini",
    nav_about: "About Me",
    nav_stack: "Stack",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_frase: "Excellence is not an act, but a habit",
    hero_card_about_title: "About Me",
    hero_card_about_desc: "My Story",
    hero_card_stack_title: "Stack",
    hero_card_stack_desc: "Tools",
    hero_card_projects_title: "Projects",
    hero_card_projects_desc: "My Work",
    hero_card_contact_title: "Contact",
    hero_card_contact_desc: "Get in Touch",
    about_chip: "PROFILE · ABOUT",
    about_title: "About Me",
    about_p1: "I’m a Junior Software and AI Engineer currently pursuing a Bachelor's degree in Software Engineering (third semester). I’m passionate about using technology to simplify everyday life and bring innovation to people and businesses.",
    about_p2: "I have experience developing SaaS solutions for companies and am currently deepening my expertise in AI Engineering, focusing on LLMs, RAG, and LangChain. I believe in team alignment and collaboration, ensuring everyone shares the same determination and drive for success that I bring to every project I’m part of.",
    about_competencies_title: "Core Competencies:",
    about_comp1: "Building end-to-end solutions in Python using LLMs, as well as RAG and LangChain applications.",
    about_comp2: "Creating intelligent systems with applied AI to automate processes.",
    about_comp3: "Providing technical leadership by managing the backlog, delegating tasks, and aligning with stakeholders.",
    stack_chip: "SKILLS · TECHS",
    stack_title: "Stack",
    stack_sub: "Tools and technologies I use to develop.",
    projects_chip: "CASE STUDIES · PROJECTS",
    projects_title: "Personal Work",
    projects_sub: "A portfolio of projects that showcases my interest in building impactful digital solutions.",
    project_badge: "CLIENT PROJECT",
    project_desc_pirabeach: "PiraBeach Arena is a website for online booking of beach tennis courts. Users can view available time slots and request bookings quickly. The system also features an administrative dashboard for managing reservations.",
    project_btn_visit: "Visit Site ↗",
    contact_chip: "CONNECT · CONTACT",
    contact_title: "Contact Me",
    contact_sub: "Let's connect and work together",
    contact_resume_title: "Resume",
    contact_resume_sub: "View my resume",
    lang_toggle_aria: "Switch to Portuguese",
    theme_toggle_aria_dark: "Switch to dark theme",
    theme_toggle_aria_light: "Switch to light theme"
  }
};

export function getInitialLanguage() {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "pt" || stored === "en") return stored;
  } catch (e) {}

  const navLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  if (navLang.startsWith("pt")) return "pt";
  if (navLang.startsWith("en")) return "en";

  return "pt";
}

function animateTextTransition(el, targetText, duration = 380) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = targetText;
    return;
  }

  const currentText = el.textContent || "";
  if (currentText === targetText) return;

  if (el._typingTimer) {
    clearInterval(el._typingTimer);
    el._typingTimer = null;
  }

  const maxSteps = 24;
  const delSteps = Math.min(Math.max(currentText.length, 1), maxSteps);
  const typeSteps = Math.min(Math.max(targetText.length, 1), maxSteps);
  const totalSteps = delSteps + typeSteps;
  const intervalMs = Math.max(8, Math.floor(duration / totalSteps));

  let step = 0;

  el._typingTimer = setInterval(() => {
    step++;
    if (step <= delSteps) {
      const progress = step / delSteps;
      const remainingLen = Math.round(currentText.length * (1 - progress));
      el.textContent = currentText.slice(0, remainingLen);
    } else if (step <= totalSteps) {
      const typeProgress = (step - delSteps) / typeSteps;
      const currentLen = Math.round(targetText.length * typeProgress);
      el.textContent = targetText.slice(0, currentLen);
    } else {
      el.textContent = targetText;
      clearInterval(el._typingTimer);
      el._typingTimer = null;
    }
  }, intervalMs);
}

export function applyLanguage(lang, animate = false) {
  const currentLang = lang === "en" ? "en" : "pt";
  document.documentElement.setAttribute("data-lang", currentLang);
  document.documentElement.setAttribute("lang", currentLang === "en" ? "en" : "pt-BR");

  try {
    localStorage.setItem("lang", currentLang);
  } catch (e) {}

  const t = translations[currentLang];
  if (!t) return;

  document.title = t.doc_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t.doc_desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      if (animate) {
        animateTextTransition(el, t[key]);
      } else {
        el.textContent = t[key];
      }
    }
  });

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.setAttribute("aria-label", t.lang_toggle_aria);
    langBtn.setAttribute("aria-pressed", String(currentLang === "en"));
  }

  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: currentLang } }));
}

export function initLanguage() {
  const current = getInitialLanguage();
  applyLanguage(current, false);

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const activeLang = document.documentElement.getAttribute("data-lang") === "en" ? "en" : "pt";
      const nextLang = activeLang === "pt" ? "en" : "pt";
      applyLanguage(nextLang, true);
    });
  }
}
