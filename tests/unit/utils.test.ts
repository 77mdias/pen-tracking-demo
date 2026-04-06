import { describe, it, expect } from 'vitest';
import { lerp } from '../../src/lib/utils/lerp';
import { clamp } from '../../src/lib/utils/clamp';

describe('lerp', () => {
  it('interpolates at factor 0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });

  it('interpolates at factor 1', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });

  it('interpolates at factor 0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  it('handles negative values', () => {
    expect(lerp(-100, 0, 0.5)).toBe(-50);
  });

  it('handles factor > 1 (overshoot)', () => {
    expect(lerp(0, 100, 1.5)).toBe(150);
  });

  it('handles factor < 0 (undershoot)', () => {
    expect(lerp(0, 100, -0.5)).toBe(-50);
  });
});

describe('clamp', () => {
  it('returns value when within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value is below', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('returns max when value is above', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
