// Custom cursor (desktop only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');
  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  });
}

// Hero slideshow
const roles = [
    {
        title: 'title-0', badgeIdx: 0,
        sub: 'Building scalable pipelines and analytics-ready data platforms on GCP.',
        focus: 'GCP · BigQuery · Airflow'
    },
    {
        title: 'title-1', badgeIdx: 1,
        sub: 'Building end-to-end products: Angular UI + Spring Boot APIs + SQL data models, shipped with Docker & CI-ready workflows.',
        focus: 'Angular · Spring Boot · REST · SQL · Docker'
    },
    {
        title: 'title-2', badgeIdx: 2,
        sub: 'Building enterprise SAP solutions on S/4HANA and ECC with WRICEF, OData, and CDS views.',
        focus: 'S/4HANA · OData · CDS'
    }
];

let current = 2;

function switchRole(idx) {
    // titles
    document.querySelectorAll('.hero-title').forEach(t => t.classList.remove('active'));
    document.getElementById(roles[idx].title).classList.add('active');
    // badges
    document.querySelectorAll('.badge').forEach((b, i) => {
        b.classList.remove('active', 'filled');
        b.classList.add('outline');
        if (i === idx) { b.classList.add('active', 'filled'); b.classList.remove('outline'); }
    });
    // sub
    document.getElementById('hero-sub').textContent = roles[idx].sub;
    document.getElementById('focus-text').textContent = roles[idx].focus;
    current = idx;
}

// badge click
document.querySelectorAll('.badge').forEach(b => {
    b.addEventListener('click', () => switchRole(+b.dataset.role));
});

// auto slideshow
setInterval(() => switchRole((current + 1) % 3), 3500);

// Skills Track Tabs
document.querySelectorAll('.track-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.track-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById('skill-' + tab.dataset.skill).classList.add('active');
    });
});

// Experience tabs
document.querySelectorAll('.role-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
    });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
reveals.forEach(r => observer.observe(r));

// Certification Slider
(function () {
    const slider = document.querySelector('.cert-slider');
    if (!slider) return;

    const track = slider.querySelector('.cert-track');
    const slides = slider.querySelectorAll('.cert-slide');
    const nextBtn = slider.querySelector('.cert-btn.next');
    const prevBtn = slider.querySelector('.cert-btn.prev');

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

    function startAuto() {
        stopAuto();
        timer = setInterval(next, AUTO_MS);
    }

    function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    nextBtn.addEventListener('click', () => { next(); startAuto(); });
    prevBtn.addEventListener('click', () => { prev(); startAuto(); });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // Mobile swipe
    let startX = 0, deltaX = 0, touching = false;

    slider.addEventListener('touchstart', e => {
        touching = true;
        startX = e.touches[0].clientX;
        stopAuto();
    }, { passive: true });

    slider.addEventListener('touchmove', e => {
        if (!touching) return;
        deltaX = e.touches[0].clientX - startX;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        touching = false;
        if (Math.abs(deltaX) > 50) (deltaX < 0 ? next() : prev());
        startAuto();
    });

    startAuto();
})();

// Mobile navbar toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
