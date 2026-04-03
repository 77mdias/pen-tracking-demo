export function rafThrottle<T extends unknown[]>(
  callback: (...args: T) => void,
): (...args: T) => void {
  let frameId: number | null = null;
  let lastArgs: T | null = null;

  const run = () => {
    frameId = null;
    if (!lastArgs) return;
    callback(...lastArgs);
    lastArgs = null;
  };

  return (...args: T) => {
    lastArgs = args;

    if (frameId !== null) {
      return;
    }

    frameId = requestAnimationFrame(run);
  };
}
