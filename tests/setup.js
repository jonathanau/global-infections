const { readFileSync } = require('fs');
const { resolve } = require('path');

// Load the HTML file and properly parse it so <html> attributes are preserved
const html = readFileSync(resolve(__dirname, '..', 'index.html'), 'utf8');
const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');

// Replace the current document with the parsed one
document.replaceChild(doc.documentElement, document.documentElement);

// Mock browser APIs not available in jsdom
global.IntersectionObserver = class {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.requestAnimationFrame = (cb) => {
  return setTimeout(() => cb(performance.now()), 0);
};

global.cancelAnimationFrame = (id) => clearTimeout(id);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'pageYOffset', { writable: true, value: 0 });
Object.defineProperty(window, 'innerHeight', { writable: true, value: 900 });
