// ===== ANIMATED COUNTER =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        animateValue(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * eased;

    if (end >= 10) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===== SCROLL-BASED FADE IN =====
function setupScrollAnimations() {
  const animElements = document.querySelectorAll(
    '.infection-card, .comorbidity-card, .rank-bar, ' +
    '.prevention-card, .season-card, .spread-card, ' +
    '.context-box, .comparison-section, .cta-banner, ' +
    '.myth-item, .timeline-item, ' +
    '.perspective-card, .env-bar, .key-insight-box'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ===== TIMER FILL ANIMATION =====
function setupTimerFill() {
  const fill = document.getElementById('timerFill');
  if (!fill) return;
  setInterval(() => {
    fill.style.animation = 'none';
    fill.offsetHeight;
    fill.style.animation = '';
  }, 22000);
}

// ===== NAVIGATION TOGGLE (MOBILE) =====
function setupNavToggle() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== NAVBAR SHOW/HIDE ON SCROLL =====
function setupNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > window.innerHeight * 0.4) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }
  }, { passive: true });
}

// ===== SCROLL SPY =====
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => spyObserver.observe(section));
}

// ===== RANK BAR ANIMATION ON SCROLL =====
function setupRankBarAnimations() {
  const rankBars = document.querySelectorAll('.rank-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.rank-bar-fill');
        if (fill) {
          const width = fill.style.width;
          fill.style.width = '0%';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              fill.style.width = width;
            });
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  rankBars.forEach(bar => observer.observe(bar));
}

// ===== SEASONAL BAR ANIMATION =====
function setupSeasonBars() {
  const bars = document.querySelectorAll('.bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            entry.target.style.width = targetWidth;
          });
        });
        observer.unobserve(entry.target.parentElement);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  setupScrollAnimations();
  setupTimerFill();
  setupNavToggle();
  setupNavScroll();
  setupScrollSpy();
  setupRankBarAnimations();
  setupSeasonBars();
});