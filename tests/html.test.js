// ---------------------------------------------------------------------------
// HTML content structure & accessibility tests
// ---------------------------------------------------------------------------

describe('HTML content structure', () => {
  test('page has the correct <title>', () => {
    expect(document.title).toBe(
      'Global Infectious Diseases: Interactive Infographic Hub'
    );
  });

  test('page has a <meta> description', () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toBeTruthy();
    expect(meta.getAttribute('content').length).toBeGreaterThan(10);
  });

  test('viewport meta tag is present', () => {
    const meta = document.querySelector('meta[name="viewport"]');
    expect(meta).toBeTruthy();
    expect(meta.getAttribute('content')).toContain('width=device-width');
  });

  // ---- Navigation ----
  describe('navigation', () => {
    test('main nav element exists', () => {
      const nav = document.getElementById('mainNav');
      expect(nav).toBeTruthy();
      expect(nav.classList.contains('main-nav')).toBe(true);
    });

    test('nav has exactly 7 links', () => {
      const links = document.querySelectorAll('.nav-links a');
      expect(links.length).toBe(7);
    });

    test('nav links have correct hrefs', () => {
      const hrefs = Array.from(
        document.querySelectorAll('.nav-links a')
      ).map((a) => a.getAttribute('href'));
      expect(hrefs).toEqual([
        '#hero',
        '#burden',
        '#diseases',
        '#enclosed-environments',
        '#comparison',
        '#co-infections',
        '#prevention',
      ]);
    });

    test('nav toggle button exists with aria-label', () => {
      const btn = document.getElementById('navToggle');
      expect(btn).toBeTruthy();
      expect(btn.getAttribute('aria-label')).toBe('Toggle navigation');
    });
  });

  // ---- Hero ----
  describe('hero section', () => {
    test('hero header exists', () => {
      const hero = document.getElementById('hero');
      expect(hero).toBeTruthy();
    });

    test('has two CTA buttons', () => {
      const btns = document.querySelectorAll('.hero-btns a');
      expect(btns.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ---- Stats bar ----
  describe('stats bar', () => {
    test('has 7 stat cards', () => {
      const cards = document.querySelectorAll('.stats-bar .stat-card');
      expect(cards.length).toBe(7);
    });

    test('each stat card has a .stat-number with data-count', () => {
      document.querySelectorAll('.stats-bar .stat-card').forEach((card) => {
        const num = card.querySelector('.stat-number');
        expect(num).toBeTruthy();
        expect(num.hasAttribute('data-count')).toBe(true);
      });
    });
  });

  // ---- Global Burden ----
  describe('global burden ranking', () => {
    test('has 6 rank bars', () => {
      const bars = document.querySelectorAll('.ranking-list .rank-bar');
      expect(bars.length).toBe(6);
    });
  });

  // ---- Disease cards ----
  describe('disease profiles', () => {
    test('has 10 disease cards in the infection-grid', () => {
      const cards = document.querySelectorAll('.infection-grid .infection-card');
      expect(cards.length).toBe(10);
    });

    test('each disease card has a header and body', () => {
      document.querySelectorAll('.infection-grid .infection-card').forEach((card) => {
        expect(card.querySelector('.infection-header')).toBeTruthy();
        expect(card.querySelector('.inf-body')).toBeTruthy();
      });
    });

    test('disease cards use section elements with aria-labels', () => {
      const sections = document.querySelectorAll(
        '.infection-grid section[aria-label]'
      );
      expect(sections.length).toBe(10);
      sections.forEach((s) => {
        expect(s.getAttribute('aria-label')).toContain('Disease Profile');
      });
    });

    test('each disease card has prevention tips', () => {
      document.querySelectorAll('.infection-grid .infection-card').forEach((card) => {
        expect(card.querySelector('.prevention-tips')).toBeTruthy();
      });
    });

    test('each disease card has a detail box', () => {
      document.querySelectorAll('.infection-grid .infection-card').forEach((card) => {
        expect(card.querySelector('.detail-box')).toBeTruthy();
      });
    });
  });

  // ---- Comparison table ----
  describe('comparison table', () => {
    test('table has 10 data rows', () => {
      const rows = document.querySelectorAll('#comparison tbody tr');
      expect(rows.length).toBe(10);
    });

    test('table has 5 columns', () => {
      const headers = document.querySelectorAll('#comparison thead th');
      expect(headers.length).toBe(5);
    });

    test('key insight box exists below table', () => {
      const insight = document.querySelector('#comparison .key-insight-box');
      expect(insight).toBeTruthy();
    });
  });

  // ---- Co-infections ----
  describe('co-infections section', () => {
    test('has 7 comorbidity cards', () => {
      const cards = document.querySelectorAll('.comorbidity-grid .comorbidity-card');
      expect(cards.length).toBe(7);
    });
  });

  // ---- Transmission ----
  describe('transmission section', () => {
    test('has 4 spread cards', () => {
      const cards = document.querySelectorAll('.infographic-row .spread-card');
      expect(cards.length).toBe(4);
    });
  });

  // ---- Enclosed environments ----
  describe('enclosed environments', () => {
    test('has 7 env principle cards', () => {
      const cards = document.querySelectorAll('.env-principle-grid .env-principle-card');
      expect(cards.length).toBe(7);
    });
  });

  // ---- Seasonal patterns ----
  describe('seasonal patterns', () => {
    test('has 3 season cards', () => {
      const cards = document.querySelectorAll('.season-grid .season-card');
      expect(cards.length).toBe(3);
    });
  });

  // ---- Prevention ----
  describe('prevention section', () => {
    test('has 6 prevention cards', () => {
      const cards = document.querySelectorAll('.prevention-grid .prevention-card');
      expect(cards.length).toBe(6);
    });

    test('has myth items in the myth-bust section', () => {
      const myths = document.querySelectorAll('.myth-bust .myth-item');
      expect(myths.length).toBe(7);
    });
  });

  // ---- Footer ----
  describe('footer', () => {
    test('footer element exists', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });
  });

  // ---- noscript ----
  test('noscript fallback is present', () => {
    const noscript = document.querySelector('noscript');
    expect(noscript).toBeTruthy();
    expect(noscript.innerHTML).toContain('JavaScript is disabled');
  });

  // ---- Robots meta ----
  test('robots meta tag allows index,follow', () => {
    const meta = document.querySelector('meta[name="robots"]');
    expect(meta).toBeTruthy();
    expect(meta.getAttribute('content')).toBe('index, follow');
  });
});

// ---------------------------------------------------------------------------
// Accessibility sanity checks
// ---------------------------------------------------------------------------
describe('accessibility', () => {
  test('all images have alt text', () => {
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img) => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });

  test('all sections have headings', () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
      expect(heading).toBeTruthy();
    });
  });

  test('lang attribute is set on <html>', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  test('CSP meta tag exists', () => {
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    expect(csp).toBeTruthy();
    expect(csp.getAttribute('content')).toContain("default-src 'self'");
  });

  test('canonical link is set', () => {
    const link = document.querySelector('link[rel="canonical"]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe(
      'https://infectious-diseases.onrender.com/'
    );
  });

  test('JSON-LD structured data is present', () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBe(1);
    const data = JSON.parse(scripts[0].textContent);
    expect(data['@graph']).toBeTruthy();
  });
});
