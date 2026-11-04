import { useEffect, useRef } from 'react';
export function SpaceCursor(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=ref.current; const mq=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  if(!el || !mq.matches)return;
  document.documentElement.classList.add('mc-cursor-active');
  let x=0,y=0,px=0,py=0,raf=0,visible=false;
  const draw=()=>{px+=(x-px)*.24;py+=(y-py)*.24;el.style.transform=`translate3d(${px}px,${py}px,0)`;raf=0;if(visible&&(Math.abs(x-px)>.1||Math.abs(y-py)>.1))raf=requestAnimationFrame(draw)};
  const move=(e:PointerEvent)=>{x=e.clientX;y=e.clientY;if(!visible){px=x;py=y;visible=true;el.classList.add('is-visible')} el.classList.toggle('is-interactive',!!(e.target as HTMLElement).closest('a,button,[role="button"]'));if(!raf)raf=requestAnimationFrame(draw)};
  const hide=()=>{visible=false;el.classList.remove('is-visible')};
  document.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',hide);
  return()=>{document.documentElement.classList.remove('mc-cursor-active');document.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',hide);cancelAnimationFrame(raf)};
 },[]);
 return <div ref={ref} className="mc-space-cursor" aria-hidden="true"><svg width="22" height="27" viewBox="0 0 22 27" fill="none"><defs><linearGradient id="mc-rocket" x1="0" y1="0" x2="22" y2="27"><stop stopColor="#fff"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs><path d="M10 1C14 4 16 9 16 15L11 19 6 15C6 9 7 4 10 1Z" fill="url(#mc-rocket)" stroke="#e5d7ff"/><circle cx="11" cy="9" r="2" fill="#3b176b"/><path d="M6 13 3 18 7 17M16 13l3 5-4-1" stroke="#c7a0ff" strokeWidth="1.4"/><path d="M9 19l2 5 2-5" fill="#963dff"/></svg></div>
}
