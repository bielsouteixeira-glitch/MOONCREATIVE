import { useEffect, useRef, useState } from 'react';

/** Ambient films never participate in the client-reel exclusivity bus. */
export function BackgroundFilm({ src, mobileSrc, poster, className = '', eager = false, label }: {
 src: string; mobileSrc?: string; poster: string; className?: string; eager?: boolean; label: string;
}) {
 const ref = useRef<HTMLVideoElement>(null);
 const container = useRef<HTMLDivElement>(null);
 const [source, setSource] = useState<string>();
 const [paused, setPaused] = useState(false);
 const [failed, setFailed] = useState(false);
 const requestedPause = useRef(false);
 useEffect(() => {
  const video = ref.current;
  const host = container.current;
  if (!video || !host) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  requestedPause.current = reduced.matches;
  let visible = false;
  const sync = () => {
   if (!visible || document.hidden || requestedPause.current) { video.pause(); return; }
   void video.play().catch(() => setPaused(true));
  };
  const observer = new IntersectionObserver(([entry]) => {
   visible = entry.isIntersecting;
   if (visible) setSource(window.innerWidth <= 700 && mobileSrc ? mobileSrc : src);
   sync();
  }, { threshold: 0 });
  observer.observe(host);
  if (eager) setSource(window.innerWidth <= 700 && mobileSrc ? mobileSrc : src);
  const motionChange = () => { requestedPause.current = reduced.matches; sync(); };
  document.addEventListener('visibilitychange', sync);
  video.addEventListener('canplay', sync);
  reduced.addEventListener('change', motionChange);
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.removeEventListener('canplay', sync); reduced.removeEventListener('change', motionChange); video.pause(); };
 }, [src, mobileSrc, eager]);
 return <div ref={container} className={`moon-film ${className}`}>
  <video ref={ref} src={source} poster={poster} aria-hidden="true" muted loop playsInline preload={eager ? 'auto' : 'metadata'} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onError={() => setFailed(true)} />
  <button type="button" className="moon-film-toggle" aria-label={`${paused ? 'Reproduzir' : 'Pausar'} ${label}`} aria-pressed={!paused} onClick={() => {
   if (!ref.current) return;
   if (ref.current.paused) { requestedPause.current = false; void ref.current.play().catch(() => setPaused(true)); }
   else { requestedPause.current = true; ref.current.pause(); }
  }}>{paused ? '▶' : 'Ⅱ'}<span>{paused ? 'Reproduzir cena' : 'Pausar cena'}</span></button>
  {failed && <p className="moon-film-error" role="status">Não foi possível reproduzir a cena. <a href={src}>Abrir vídeo original</a></p>}
 </div>;
}
