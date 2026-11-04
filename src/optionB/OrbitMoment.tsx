import { lazy, Suspense, useEffect, useRef, useState } from 'react';
const OrbitScene = lazy(() => import('./OrbitScene'));
export function OrbitMoment() {
 const ref = useRef<HTMLDivElement>(null);
 const [ready, setReady] = useState(false);
 useEffect(() => {
  const node = ref.current;
  if (!node) return;
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: '200px' });
  observer.observe(node); return () => observer.disconnect();
 }, []);
 return <div className="moon-orbit-stage" aria-hidden="true" ref={ref}>
  <div className="moon-orbit-halo" />
  {ready && <Suspense fallback={null}><OrbitScene /></Suspense>}
  <span className="moon-orbit-label">MOON / ORBITAL EXPLORATION</span>
 </div>;
}
