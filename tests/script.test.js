const { readFileSync } = require('fs');
const { resolve } = require('path');

const html = readFileSync(resolve(__dirname, '..', 'index.html'), 'utf8');
const scriptCode = readFileSync(resolve(__dirname, '..', 'script.js'), 'utf8');

// Strip the DOMContentLoaded handler (last block in the file) so the
// remaining function declarations can be eval'd without auto-running init.
const codeWithoutInit = scriptCode.replace(
  /\ndocument\.addEventListener\('DOMContentLoaded',[\s\S]*$/,
  ''
);

function resetDOM() {
  document.documentElement.innerHTML = html;
}

function evalFunctions() {
  (0, eval)(codeWithoutInit);
}

beforeAll(() => {
  // Evaluate the script functions once so they're globally available
  evalFunctions();
});

beforeEach(() => {
  resetDOM();
  jest.useFakeTimers();

  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  window.pageYOffset = 0;
  window.innerHeight = 900;
});

afterEach(() => {
  jest.useRealTimers();
});

// ---------------------------------------------------------------------------
// animateValue
// ---------------------------------------------------------------------------
describe('animateValue', () => {
  test('animates from 0 to an integer target', () => {
    const el = document.createElement('div');
    el.setAttribute('data-count', '100');
    animateValue(el, 0, 100, 1000);

    jest.advanceTimersByTime(500);
    expect(Number(el.textContent)).toBeGreaterThan(0);
    expect(Number(el.textContent)).toBeLessThanOrEqual(100);

    jest.advanceTimersByTime(600);
    expect(el.textContent).toBe('100');
  });

  test('animates a decimal target', () => {
    const el = document.createElement('div');
    el.setAttribute('data-count', '98.7');
    animateValue(el, 0, 98.7, 1000);

    jest.advanceTimersByTime(1100);
    expect(el.textContent).toBe('98.7');
  });

  test('ends at target when duration elapses', () => {
    const el = document.createElement('div');
    el.setAttribute('data-count', '42');
    animateValue(el, 0, 42, 500);

    jest.advanceTimersByTime(600);
    expect(el.textContent).toBe('42');
  });

  test('handles zero target', () => {
    const el = document.createElement('div');
    el.setAttribute('data-count', '0');
    animateValue(el, 0, 0, 1000);

    jest.advanceTimersByTime(1100);
    expect(el.textContent).toBe('0');
  });

  test('handles negative target', () => {
    const el = document.createElement('div');
    el.setAttribute('data-count', '-10');
    animateValue(el, 0, -10, 500);

    jest.advanceTimersByTime(600);
    expect(el.textContent).toBe('-10');
  });
});

// ---------------------------------------------------------------------------
// animateCounters
// ---------------------------------------------------------------------------
describe('animateCounters', () => {
  test('observes all .stat-number[data-count] elements', () => {
    const observeSpy = jest.spyOn(IntersectionObserver.prototype, 'observe');
    animateCounters();

    const counters = document.querySelectorAll('.stat-number[data-count]');
    expect(observeSpy).toHaveBeenCalledTimes(counters.length);
    observeSpy.mockRestore();
  });

  test('triggers animateValue when an element becomes intersecting', () => {
    let observedCallback;
    const origIO = global.IntersectionObserver;
    global.IntersectionObserver = class {
      constructor(cb) { observedCallback = cb; }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    const spy = jest.spyOn(window, 'animateValue').mockImplementation(() => {});
    animateCounters();

    const el = document.querySelector('.stat-number[data-count]');
    observedCallback([{ isIntersecting: true, target: el }]);

    expect(spy).toHaveBeenCalledWith(
      el,
      0,
      parseFloat(el.getAttribute('data-count')),
      1500
    );

    spy.mockRestore();
    global.IntersectionObserver = origIO;
  });
});

// ---------------------------------------------------------------------------
// setupScrollAnimations
// ---------------------------------------------------------------------------
describe('setupScrollAnimations', () => {
  test('sets initial opacity and transform on target elements', () => {
    setupScrollAnimations();

    const card = document.querySelector('.infection-card');
    expect(card.style.opacity).toBe('0');
    expect(card.style.transform).toBe('translateY(25px)');
  });

  test('fades in an element when it becomes intersecting', () => {
    let observedCallback;
    const origIO = global.IntersectionObserver;
    global.IntersectionObserver = class {
      constructor(cb) { observedCallback = cb; }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setupScrollAnimations();

    const card = document.querySelector('.infection-card');
    expect(card.style.opacity).toBe('0');

    observedCallback([{ isIntersecting: true, target: card }]);
    expect(card.style.opacity).toBe('1');
    expect(card.style.transform).toBe('translateY(0)');

    global.IntersectionObserver = origIO;
  });
});

// ---------------------------------------------------------------------------
// setupNavToggle
// ---------------------------------------------------------------------------
describe('setupNavToggle', () => {
  test('toggles .open class on navLinks when hamburger is clicked', () => {
    setupNavToggle();
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    expect(links.classList.contains('open')).toBe(false);
    toggle.click();
    expect(links.classList.contains('open')).toBe(true);
    toggle.click();
    expect(links.classList.contains('open')).toBe(false);
  });

  test('closes nav when a link inside it is clicked', () => {
    setupNavToggle();
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.click();
    const link = links.querySelector('a');
    link.click();
    expect(links.classList.contains('open')).toBe(false);
  });

  test('does nothing when navToggle or navLinks is missing', () => {
    document.getElementById('navToggle').remove();
    document.getElementById('navLinks').remove();
    expect(setupNavToggle()).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// setupNavScroll
// ---------------------------------------------------------------------------
describe('setupNavScroll', () => {
  test('shows nav when pageYOffset exceeds 40% of viewport height', () => {
    setupNavScroll();
    const nav = document.getElementById('mainNav');

    window.pageYOffset = 400;
    window.dispatchEvent(new Event('scroll'));
    expect(nav.classList.contains('visible')).toBe(true);

    window.pageYOffset = 100;
    window.dispatchEvent(new Event('scroll'));
    expect(nav.classList.contains('visible')).toBe(false);
  });

  test('does nothing if #mainNav does not exist', () => {
    document.getElementById('mainNav').remove();
    expect(setupNavScroll()).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// setupScrollSpy
// ---------------------------------------------------------------------------
describe('setupScrollSpy', () => {
  test('highlights the correct nav link', () => {
    let observedCallback;
    const origIO = global.IntersectionObserver;
    global.IntersectionObserver = class {
      constructor(cb) { observedCallback = cb; }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setupScrollSpy();

    const section = document.getElementById('burden');
    observedCallback([{ isIntersecting: true, target: section }]);

    const link = document.querySelector('.nav-links a[href="#burden"]');
    expect(link.classList.contains('active-link')).toBe(true);

    // Other links should not be active
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((l) => {
      if (l.getAttribute('href') !== '#burden') {
        expect(l.classList.contains('active-link')).toBe(false);
      }
    });

    global.IntersectionObserver = origIO;
  });

  test('does not throw when no sections or links exist', () => {
    document.querySelectorAll('section[id]').forEach((s) => s.remove());
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => a.remove());
    expect(setupScrollSpy()).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// setupRankBarAnimations
// ---------------------------------------------------------------------------
describe('setupRankBarAnimations', () => {
  test('resets then restores bar-fill width on intersection', () => {
    let observedCallback;
    const origIO = global.IntersectionObserver;
    global.IntersectionObserver = class {
      constructor(cb) { observedCallback = cb; }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setupRankBarAnimations();

    const bar = document.querySelector('.rank-bar');
    const fill = bar.querySelector('.rank-bar-fill');
    const origWidth = fill.style.width;

    observedCallback([{ isIntersecting: true, target: bar }]);
    expect(fill.style.width).toBe('0%');

    jest.advanceTimersByTime(50);
    expect(fill.style.width).toBe(origWidth);

    global.IntersectionObserver = origIO;
  });
});

// ---------------------------------------------------------------------------
// setupSeasonBars
// ---------------------------------------------------------------------------
describe('setupSeasonBars', () => {
  test('resets then restores bar-fill width on intersection', () => {
    let observedCallback;
    const origIO = global.IntersectionObserver;
    global.IntersectionObserver = class {
      constructor(cb) { observedCallback = cb; }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setupSeasonBars();

    const fill = document.querySelector('.bar-fill');
    fill.style.width = '80%';

    observedCallback([{ isIntersecting: true, target: fill }]);
    expect(fill.style.width).toBe('0%');

    jest.advanceTimersByTime(50);
    expect(fill.style.width).toBe('80%');

    global.IntersectionObserver = origIO;
  });
});

// ---------------------------------------------------------------------------
// Full init (DOMContentLoaded)
// ---------------------------------------------------------------------------
describe('DOMContentLoaded init', () => {
  // For these tests we eval the FULL script (with the init handler)
  // within each test so we can spy on the functions it calls.
  function evalFull() {
    (0, eval)(scriptCode);
  }

  test('calls all setup functions when motion is OK', () => {
    evalFull();

    const spies = [
      'animateCounters',
      'setupScrollAnimations',
      'setupNavToggle',
      'setupNavScroll',
      'setupScrollSpy',
      'setupRankBarAnimations',
      'setupSeasonBars',
    ].map((name) => jest.spyOn(window, name).mockImplementation(() => {}));

    document.dispatchEvent(new Event('DOMContentLoaded'));

    spies.forEach((s) => expect(s).toHaveBeenCalled());
    spies.forEach((s) => s.mockRestore());
  });

  test('skips motion-dependent functions when prefers-reduced-motion is set', () => {
    evalFull();

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const motionSensitive = [
      'animateCounters',
      'setupScrollAnimations',
      'setupRankBarAnimations',
      'setupSeasonBars',
    ];
    const alwaysCalled = ['setupNavToggle', 'setupNavScroll', 'setupScrollSpy'];

    const spies = [...motionSensitive, ...alwaysCalled].map((name) =>
      jest.spyOn(window, name).mockImplementation(() => {})
    );

    document.dispatchEvent(new Event('DOMContentLoaded'));

    motionSensitive.forEach((name) =>
      expect(window[name]).not.toHaveBeenCalled()
    );
    alwaysCalled.forEach((name) => expect(window[name]).toHaveBeenCalled());

    spies.forEach((s) => s.mockRestore());
  });
});
