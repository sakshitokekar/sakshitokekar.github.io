function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (typeof text === "string") node.textContent = text;
  return node;
}

function initCustomCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX - 6}px`;
    cursor.style.top = `${e.clientY - 6}px`;
  });
}

function initTabs({ tabSelector, panelSelector, dataAttr, panelPrefix }) {
  const tabs = document.querySelectorAll(tabSelector);
  const panels = document.querySelectorAll(panelSelector);
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(panelPrefix + tab.dataset[dataAttr]);
      if (panel) panel.classList.add("active");
    });
  });
}

function initHero() {
  const roles = window.SITE_DATA?.heroRoles;
  const badgesWrap = document.getElementById("roleBadges");
  const titlesWrap = document.getElementById("heroTitles");
  const subEl = document.getElementById("hero-sub");
  const focusEl = document.getElementById("focus-text");
  if (!Array.isArray(roles) || !roles.length || !badgesWrap || !titlesWrap || !subEl || !focusEl) return;

  badgesWrap.textContent = "";
  titlesWrap.textContent = "";

  roles.forEach((role, idx) => {
    const badge = el("span", `badge ${idx === 0 ? "filled active" : "outline"}`, role.label || "Role");
    badge.dataset.role = String(idx);
    badgesWrap.appendChild(badge);

    const title = el("div", `hero-title${idx === 0 ? " active" : ""}`, role.title || "Role.");
    title.id = `title-${idx}`;
    titlesWrap.appendChild(title);
  });

  let current = 0;

  function switchRole(idx) {
    const validIdx = (idx + roles.length) % roles.length;
    const role = roles[validIdx];

    titlesWrap.querySelectorAll(".hero-title").forEach((title, i) => {
      title.classList.toggle("active", i === validIdx);
    });

    badgesWrap.querySelectorAll(".badge").forEach((badge, i) => {
      badge.classList.remove("active", "filled", "outline");
      badge.classList.add(i === validIdx ? "filled" : "outline");
      if (i === validIdx) badge.classList.add("active");
    });

    subEl.textContent = role.sub || "";
    focusEl.textContent = role.focus || "";
    current = validIdx;
  }

  badgesWrap.querySelectorAll(".badge").forEach(badge => {
    badge.addEventListener("click", () => switchRole(Number(badge.dataset.role || 0)));
  });

  switchRole(0);
  setInterval(() => switchRole(current + 1), 3500);
}

function initAboutSkills() {
  const skills = window.SITE_DATA?.aboutSkillBlocks;
  const grid = document.getElementById("aboutSkillsGrid");
  if (!Array.isArray(skills) || !grid) return;

  grid.textContent = "";
  skills.forEach(item => {
    const block = el("div", "skill-block");
    block.append(el("h4", "", item.title || "Skill"));
    block.append(el("p", "", item.details || ""));
    grid.appendChild(block);
  });
}

function initSkills() {
  const skillsByTrack = window.SKILLS_DATA;
  if (!skillsByTrack) return;

  ["backend", "data", "sap"].forEach(track => {
    const grid = document.getElementById(`skill-cards-${track}`);
    const cards = skillsByTrack[track];
    if (!grid || !Array.isArray(cards)) return;

    grid.textContent = "";
    cards.forEach(cardData => {
      const card = el("div", "skill-card");
      const title = el("div", "skill-card-title", cardData.title || "Skill");
      const chipsWrap = el("div", "skill-chips");

      (cardData.chips || []).forEach(chipText => {
        chipsWrap.appendChild(el("span", "chip", chipText));
      });

      card.append(title, chipsWrap);
      grid.appendChild(card);
    });
  });
}

function initExperience() {
  const experienceByTrack = window.EXPERIENCE_DATA;
  if (!experienceByTrack) return;

  ["fullstack", "data", "sap"].forEach(track => {
    const timeline = document.getElementById(`exp-timeline-${track}`);
    const entries = experienceByTrack[track];
    if (!timeline || !Array.isArray(entries)) return;

    timeline.textContent = "";

    entries.forEach(entry => {
      const item = el("div", "timeline-item");
      const date = el("div", "timeline-date", entry.date || "");
      const role = el("div", "timeline-role", entry.role || "Role");
      const company = el("div", "timeline-company", entry.company || "");
      const points = el("ul");

      (entry.points || []).forEach(pointText => points.appendChild(el("li", "", pointText)));
      item.append(date, role, company, points);
      timeline.appendChild(item);
    });
  });
}

function initProjects() {
  const projectsByTrack = window.PROJECTS_DATA;
  if (!projectsByTrack) return;

  ["backend", "data", "sap"].forEach(track => {
    const grid = document.getElementById(`projects-grid-${track}`);
    const projects = projectsByTrack[track];
    if (!grid || !Array.isArray(projects)) return;

    grid.textContent = "";

    projects.forEach((project, idx) => {
      const category = project.category || "Project";
      const titleText = project.title || "Untitled Project";
      const descText = project.description || "";

      const card = el("div", `project-card proj-card-${track}`);
      const number = el("div", "project-number", `${String(idx + 1).padStart(2, "0")} — ${category}`);
      const title = el("div", "project-title", titleText);
      const desc = el("div", "project-desc", descText);
      const tags = el("div", "project-tags");

      (project.tags || []).forEach(tagText => {
        tags.appendChild(el("span", `tag tag-${track}`, tagText));
      });

      card.append(number, title);

      if (project.demoGif) {
        const actions = el("div", "project-card-actions");
        const demoBtn = el("button", "project-demo-btn", "View Demo GIF");
        demoBtn.type = "button";
        demoBtn.dataset.demoTitle = titleText;
        demoBtn.dataset.demoGif = project.demoGif;
        actions.appendChild(demoBtn);
        card.append(actions);
      }

      card.append(desc, tags);
      grid.appendChild(card);
    });
  });
}

function initProjectTabs() {
  const tabs = document.querySelectorAll(".proj-track-tab");
  const pill = document.getElementById("projPill");
  const outer = document.getElementById("projPanelsOuter");
  const tabsBar = document.getElementById("projTabs");
  if (!tabs.length || !pill || !outer || !tabsBar) return;

  function movePill(tab) {
    const barRect = tabsBar.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    pill.style.width = `${tabRect.width}px`;
    pill.style.transform = `translateX(${tabRect.left - barRect.left}px)`;
  }

  function setOuterHeight(panel) {
    outer.style.height = `${panel.offsetHeight}px`;
  }

  const activeTab = tabsBar.querySelector(".proj-track-tab.active");
  if (activeTab) {
    pill.style.transition = "none";
    movePill(activeTab);
    requestAnimationFrame(() => {
      pill.style.transition = "";
    });
  }

  const activePanel = document.querySelector(".proj-panel.active");
  if (activePanel) {
    setOuterHeight(activePanel);
    requestAnimationFrame(() => {
      outer.style.height = "auto";
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) return;

      const incoming = document.getElementById("proj-" + tab.dataset.proj);
      const outgoing = document.querySelector(".proj-panel.active");
      if (!incoming || incoming === outgoing) return;

      movePill(tab);
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      if (outgoing) {
        setOuterHeight(outgoing);
        outgoing.classList.remove("active");
        outgoing.classList.add("exiting");
        outgoing.addEventListener(
          "transitionend",
          () => {
            outgoing.classList.remove("exiting");
          },
          { once: true }
        );
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.classList.add("active");
          setOuterHeight(incoming);

          const unlockHeight = () => {
            outer.style.height = "auto";
          };

          outer.addEventListener("transitionend", function onEnd(e) {
            if (e.propertyName !== "height") return;
            outer.removeEventListener("transitionend", onEnd);
            unlockHeight();
          });

          // Fallback when transitionend doesn't fire (e.g., same computed height).
          setTimeout(unlockHeight, 500);
        });
      });
    });
  });

  window.addEventListener("resize", () => {
    const currentTab = tabsBar.querySelector(".proj-track-tab.active");
    if (currentTab) {
      pill.style.transition = "none";
      movePill(currentTab);
      requestAnimationFrame(() => {
        pill.style.transition = "";
      });
    }
    outer.style.height = "auto";
  });
}

function initCertifications() {
  const certifications = window.CERTIFICATIONS_DATA;
  const certTrack = document.getElementById("cert-track");
  if (!certTrack || !Array.isArray(certifications)) return;

  certTrack.textContent = "";

  certifications.forEach(cert => {
    const slide = el("div", "cert-slide");
    const title = el("div", "cert-title", cert.title || "Certification");
    const image = el("img");
    image.src = cert.image || "";
    image.alt = cert.alt || cert.title || "Certification";

    const link = el("a", "cert-link", "View Credentials ↗");
    link.href = cert.credentialUrl || "#";
    link.target = "_blank";
    link.rel = "noopener";

    slide.append(title, image, link);
    certTrack.appendChild(slide);
  });
}

function initCertSlider() {
  const slider = document.querySelector(".cert-slider");
  if (!slider) return;

  const track = slider.querySelector(".cert-track");
  const slides = slider.querySelectorAll(".cert-slide");
  const nextBtn = slider.querySelector(".cert-btn.next");
  const prevBtn = slider.querySelector(".cert-btn.prev");
  if (!track || !slides.length || !nextBtn || !prevBtn) return;

  let index = 0;
  let timer = null;
  const AUTO_MS = 4000;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() {
    index = (index + 1) % slides.length;
    update();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  function stopAuto() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, AUTO_MS);
  }

  nextBtn.addEventListener("click", () => {
    next();
    startAuto();
  });

  prevBtn.addEventListener("click", () => {
    prev();
    startAuto();
  });

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  let startX = 0;
  let deltaX = 0;
  let touching = false;

  slider.addEventListener(
    "touchstart",
    e => {
      touching = true;
      startX = e.touches[0].clientX;
      stopAuto();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    e => {
      if (!touching) return;
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true }
  );

  slider.addEventListener("touchend", () => {
    touching = false;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) next();
      else prev();
    }
    startAuto();
  });

  startAuto();
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(node => observer.observe(node));
}

function initMobileNav() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initDemoModal() {
  const modal = document.getElementById("demoModal");
  const titleEl = document.getElementById("demoModalTitle");
  const gifEl = document.getElementById("demoModalGif");
  const errorEl = document.getElementById("demoModalError");
  if (!modal || !titleEl || !gifEl || !errorEl) return;

  function openModal(title, gifPath) {
    titleEl.textContent = title || "Project Demo";
    errorEl.style.display = "none";
    gifEl.style.display = "block";
    gifEl.src = gifPath || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("demo-modal-open");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("demo-modal-open");
    gifEl.removeAttribute("src");
  }

  document.addEventListener("click", e => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".project-demo-btn");
    if (!button) return;
    openModal(button.dataset.demoTitle || "Project Demo", button.dataset.demoGif || "");
  });

  modal.addEventListener("click", e => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest("[data-demo-close]")) closeModal();
  });

  gifEl.addEventListener("error", () => {
    gifEl.style.display = "none";
    errorEl.style.display = "block";
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

(function bootstrap() {
  initCustomCursor();
  initHero();
  initAboutSkills();
  initSkills();
  initExperience();
  initProjects();
  initCertifications();

  initTabs({
    tabSelector: ".track-tab",
    panelSelector: ".skill-panel",
    dataAttr: "skill",
    panelPrefix: "skill-"
  });

  initTabs({
    tabSelector: ".role-tab",
    panelSelector: ".exp-panel",
    dataAttr: "panel",
    panelPrefix: "panel-"
  });

  initProjectTabs();
  initCertSlider();
  initScrollReveal();
  initMobileNav();
  initDemoModal();
})();
