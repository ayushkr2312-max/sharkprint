// The preloader hands over to the hero headline at frame 04 (concept p.10).
// Pages without a preloader finish the intro straight away.

let done = false;
let queue: Array<() => void> = [];

export function onIntro(fn: () => void) {
  if (done) fn();
  else queue.push(fn);
  return () => { queue = queue.filter((f) => f !== fn); };
}

export function finishIntro() {
  if (done) return;
  done = true;
  const q = queue;
  queue = [];
  q.forEach((fn) => fn());
}

export function introDone() {
  return done;
}
