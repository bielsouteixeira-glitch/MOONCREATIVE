import { useEffect, useId, useRef, useState } from 'react';
import { mediaUrl, type Work } from './portfolioBData';

export function ImageB({ work }: { work: Work }) {
 const [failed, setFailed] = useState(false);
 if (failed) return <div className="b-unavailable"><span>↗</span><p>Prévia indisponível</p><span>Não foi possível carregar este arquivo neste navegador</span></div>;
 return <img src={mediaUrl(work)} alt={work.title} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

export function VideoB({ work, active = true, controls = false, respectReducedMotion = false }: { work: Work; active?: boolean; controls?: boolean; respectReducedMotion?: boolean }) {
 const ref = useRef<HTMLVideoElement>(null);
 const id = useId();
 const [muted, setMuted] = useState(true);
 const [failed, setFailed] = useState(false);
 const [paused, setPaused] = useState(true);
 useEffect(() => {
  const video = ref.current;
  if (!video || !active) { video?.pause(); return; }
  let visible = false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const play = () => { if (visible && !document.hidden && !(respectReducedMotion && reduced.matches)) void video.play().catch(() => setPaused(true)); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) play(); else video.pause(); }, { threshold: .55 });
  observer.observe(video);
  const exclusive = (event: Event) => { if ((event as CustomEvent<string>).detail !== id) video.pause(); };
  const visibility = () => { if (document.hidden) video.pause(); else play(); };
  window.addEventListener('moon-b-play', exclusive);
  const motionChange = () => { if (respectReducedMotion && reduced.matches) video.pause(); };
  reduced.addEventListener('change', motionChange);
  document.addEventListener('visibilitychange', visibility);
  return () => { reduced.removeEventListener('change', motionChange); observer.disconnect(); video.pause(); window.removeEventListener('moon-b-play', exclusive); document.removeEventListener('visibilitychange', visibility); };
 }, [active, id, respectReducedMotion]);
 if (!work.src) return <iframe className="b-drive-video" title={work.title} src={`https://drive.google.com/file/d/${work.driveId}/preview`} allow="fullscreen" allowFullScreen />;
 return <div className="b-video">
  <video ref={ref} src={work.src} poster={work.poster || `/images/video-posters/${work.src.split('/').pop()?.replace(/\.[^.]+$/, '.jpg')}`} muted={muted} loop playsInline preload="metadata" controls={controls} onError={() => setFailed(true)} onPlay={() => { setPaused(false); window.dispatchEvent(new CustomEvent('moon-b-play', { detail: id })); }} onPause={() => setPaused(true)} />
  {failed ? <p className="b-video-error">Não foi possível carregar o vídeo. <a href={work.src}>Abrir arquivo</a></p> : !controls && <div className="b-video-tools"><button type="button" aria-label={paused ? 'Reproduzir vídeo' : 'Pausar vídeo'} onClick={() => { const video = ref.current; if (video?.paused) void video.play().catch(() => setPaused(true)); else video?.pause(); }}>{paused ? '▶' : 'Ⅱ'}</button><button type="button" aria-label={muted ? 'Ativar áudio' : 'Silenciar vídeo'} aria-pressed={!muted} onClick={() => { setMuted(!muted); if (ref.current?.paused) void ref.current.play().catch(() => setPaused(true)); }}>{muted ? 'Som desligado ↗' : 'Som ligado ♪'}</button></div>}
 </div>;
}
