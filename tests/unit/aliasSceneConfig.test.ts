import { describe, it, expect } from 'vitest';
import { aliasSceneConfig } from '../../src/lib/three/aliasSceneConfig';

describe('aliasSceneConfig', () => {
  it('camera.position is a 3-element number tuple', () => {
    expect(aliasSceneConfig.camera.position).toHaveLength(3);
    aliasSceneConfig.camera.position.forEach((v) => expect(typeof v).toBe('number'));
  });

  it('camera.fov is a positive number', () => {
    expect(aliasSceneConfig.camera.fov).toBeGreaterThan(0);
  });

  it('pen.position is a 3-element number tuple', () => {
    expect(aliasSceneConfig.pen.position).toHaveLength(3);
    aliasSceneConfig.pen.position.forEach((v) => expect(typeof v).toBe('number'));
  });

  it('pen.rotation is a 3-element number tuple', () => {
    expect(aliasSceneConfig.pen.rotation).toHaveLength(3);
    aliasSceneConfig.pen.rotation.forEach((v) => expect(typeof v).toBe('number'));
  });

  it('pen.idle values are positive numbers', () => {
    expect(aliasSceneConfig.pen.idle.yAmplitude).toBeGreaterThan(0);
    expect(aliasSceneConfig.pen.idle.yFrequency).toBeGreaterThan(0);
    expect(aliasSceneConfig.pen.idle.rotationYSpeed).toBeGreaterThan(0);
  });
});
