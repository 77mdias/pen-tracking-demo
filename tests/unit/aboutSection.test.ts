import { describe, it, expect } from 'vitest';

describe('AboutSection module', () => {
  it('can be imported without errors', async () => {
    // Dynamic import verifies the module resolves and has no top-level errors.
    // We do NOT render it (requires a React environment) — this is a smoke test.
    const mod = await import('../../src/components/about/AboutSection');
    expect(mod).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });
});
