import { lazy, Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './incrementalExperience.css';
const OrbitScene = lazy(() => import('../optionB/OrbitScene'));

/** Additive details on selected existing sections. Never selects #inicio or #redes. */
export function IncrementalExperience() {
 const [orbitHost, setOrbitHost] = useState<HTMLElement | null>(null);
 useEffect(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const events = document.getElementById('eventos');
  const io = new IntersectionObserver(entries => {
   for (const entry of entries) if (entry.isIntersecting) {
    if (entry.target === events) setOrbitHost(events);
    if (!reduced.matches) entry.target.classList.add('mc-arrival');
    io.unobserve(entry.target);
   }
  }, { threshold: .15 });
  document.querySelectorAll('#sites h2, #ia h2, #marcas h2, #eventos h2, #portfolio h2').forEach(node => io.observe(node));
  if (events) io.observe(events);
  const caseElement = document.querySelector('.mc-noiz-case');
  const caseObserver = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('mc-case-visible'); caseObserver.unobserve(entry.target); } }, { threshold: .12 });
  if (caseElement && !reduced.matches) caseObserver.observe(caseElement);
  // Preserve heading text and nested emphasis; add decorative spans only after mount.
  const textNodes: { parent: Node; original: Text; wrapper: HTMLElement }[] = [];
  if (!reduced.matches) document.querySelectorAll('#sites h2, #ia h2, #marcas h2, #eventos h2, #portfolio h2').forEach(heading => {
    heading.setAttribute('aria-label', heading.textContent?.trim() || '');
    let word = 0;
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach(original => {
      if (!original.textContent?.trim() || !original.parentNode) return;
      const wrapper = document.createElement('span'); wrapper.setAttribute('aria-hidden','true');
      original.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { wrapper.append(document.createTextNode(part)); return; }
        const span = document.createElement('span'); span.className='mc-title-word'; span.style.setProperty('--word',String(word++)); span.textContent=part; wrapper.append(span);
      });
      const parent=original.parentNode; parent.replaceChild(wrapper,original); textNodes.push({parent,original,wrapper});
    });
  });
  let raf = 0;
  let active: HTMLElement | null = null;
  let latest: PointerEvent | null = null;
  const reset = () => { active?.classList.remove('mc-tilt'); active?.style.removeProperty('--mc-x'); active?.style.removeProperty('--mc-y'); active = null; };
  const move = (event: PointerEvent) => {
   if (reduced.matches || !fine.matches) return;
   latest = event;
   if (raf) return;
   raf = requestAnimationFrame(() => {
    raf = 0;
    if (!latest) return;
    const el = (latest.target as HTMLElement).closest<HTMLElement>('#eventos .glass-card, #sites .device-frame');
    if (el !== active) reset();
    if (!el) return;
    active = el;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--mc-x', `${((latest.clientY-box.top)/box.height-.5)*-3}deg`);
    el.style.setProperty('--mc-y', `${((latest.clientX-box.left)/box.width-.5)*3}deg`);
    el.classList.add('mc-tilt');
   });
  };
  const leave = () => { latest=null; reset(); };
  document.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave',leave);
  return () => {
   io.disconnect(); caseObserver.disconnect(); caseElement?.classList.remove('mc-case-visible'); cancelAnimationFrame(raf); reset();
   document.removeEventListener('pointermove',move); document.documentElement.removeEventListener('pointerleave',leave);
   textNodes.forEach(({parent,original,wrapper}) => { if (wrapper.parentNode === parent) parent.replaceChild(original,wrapper); });
   document.querySelectorAll('#sites h2, #ia h2, #marcas h2, #eventos h2, #portfolio h2').forEach(el => el.removeAttribute('aria-label'));
   document.querySelectorAll('.mc-arrival').forEach(el => el.classList.remove('mc-arrival'));
  };
 }, []);
 return orbitHost ? createPortal(<div className="mc-orbit-detail" aria-hidden="true"><Suspense fallback={null}><OrbitScene /></Suspense></div>,orbitHost) : null;
}
