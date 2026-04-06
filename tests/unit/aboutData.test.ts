import { describe, it, expect } from 'vitest';
import {
  TECH_STACK_CARDS,
  PROJECT_STATS,
  PRODUCT_HIGHLIGHTS,
  GITHUB_URL,
} from '../../src/lib/about/aboutData';

describe('TECH_STACK_CARDS', () => {
  it('has exactly 6 entries', () => {
    expect(TECH_STACK_CARDS).toHaveLength(6);
  });

  it('every entry has name, description, and icon', () => {
    TECH_STACK_CARDS.forEach((card) => {
      expect(typeof card.name).toBe('string');
      expect(card.name.length).toBeGreaterThan(0);
      expect(typeof card.description).toBe('string');
      expect(card.description.length).toBeGreaterThan(0);
      expect(typeof card.icon).toBe('string');
      expect(card.icon.length).toBeGreaterThan(0);
    });
  });
});

describe('PROJECT_STATS', () => {
  it('has exactly 8 entries', () => {
    expect(PROJECT_STATS).toHaveLength(8);
  });

  it('has exactly 4 codebase stats', () => {
    const codebase = PROJECT_STATS.filter((s) => s.category === 'codebase');
    expect(codebase).toHaveLength(4);
  });

  it('has exactly 4 product stats', () => {
    const product = PROJECT_STATS.filter((s) => s.category === 'product');
    expect(product).toHaveLength(4);
  });

  it('every entry has label, value, and a valid category', () => {
    PROJECT_STATS.forEach((stat) => {
      expect(typeof stat.label).toBe('string');
      expect(stat.label.length).toBeGreaterThan(0);
      expect(typeof stat.value).toBe('string');
      expect(stat.value.length).toBeGreaterThan(0);
      expect(['codebase', 'product']).toContain(stat.category);
    });
  });
});

describe('PRODUCT_HIGHLIGHTS', () => {
  it('has exactly 3 entries', () => {
    expect(PRODUCT_HIGHLIGHTS).toHaveLength(3);
  });

  it('every entry has a non-empty text field', () => {
    PRODUCT_HIGHLIGHTS.forEach((h) => {
      expect(typeof h.text).toBe('string');
      expect(h.text.length).toBeGreaterThan(0);
    });
  });
});

describe('GITHUB_URL', () => {
  it('is a valid URL string', () => {
    expect(typeof GITHUB_URL).toBe('string');
    expect(() => new URL(GITHUB_URL)).not.toThrow();
  });

  it('points to a github.com domain', () => {
    const url = new URL(GITHUB_URL);
    expect(url.hostname).toBe('github.com');
  });
});
