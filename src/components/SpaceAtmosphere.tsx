import { useEffect, useRef } from 'react';
/** Procedural background only; no portfolio imagery, video downloads or pointer interception. */
export function SpaceAtmosphere() {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  const update = () => {
   raf = 0;
   const portfolio = document.getElementById('portfolio')?.getBoundingClientRect();
   el.style.setProperty('--mc-drift', `${Math.min(70, window.scrollY * .012).toFixed(1)}px`);
   el.classList.toggle('is-gallery', !!portfolio && portfolio.top < innerHeight * .6 && portfolio.bottom > innerHeight * .4);
  };
  const scroll = () => { if (!raf && !reduce.matches) raf = requestAnimationFrame(update); };
  const visibility = () => el.classList.toggle('is-paused', document.hidden);
  const motion = () => { if (reduce.matches) el.style.setProperty('--mc-drift','0px'); else update(); };
  window.addEventListener('scroll', scroll, { passive:true });
  document.addEventListener('visibilitychange',visibility);
  reduce.addEventListener('change',motion); motion(); visibility();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll',scroll); document.removeEventListener('visibilitychange',visibility); reduce.removeEventListener('change',motion); };
 }, []);
 return <div className="mc-atmosphere" ref={ref} aria-hidden="true"><div className="mc-atmosphere-cloud"/><div className="mc-atmosphere-dust"/><div className="mc-atmosphere-orbit"/></div>;
}
