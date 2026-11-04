import { Children, cloneElement, isValidElement, useEffect, type ReactNode } from 'react';

/** Keep semantic headings and their original emphasis; only split their presentation. */
export function OrbitalWords({ children }: { children: ReactNode }) {
 let index = 0;
 const split = (nodes: ReactNode): ReactNode => Children.map(nodes, node => {
  if (typeof node === 'string') return node.split(/(\s+)/).map((word, i) => /^\s+$/.test(word) ? word : <span className="moon-word" key={i}><span style={{ animationDelay: `${Math.min(index++, 10) * 65}ms` }}>{word}</span></span>);
  if (isValidElement<{ children?: ReactNode }>(node)) return cloneElement(node, {}, split(node.props.children));
  return node;
 });
 return <>{split(children)}</>;
}

export function useMoonMotion() {
 useEffect(() => {
  const root = document.querySelector('.moon-b');
  if (!root) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const cleanups: (() => void)[] = [];
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) if (entry.isIntersecting) {
    entry.target.classList.add('moon-arrived');
    observer.unobserve(entry.target);
   }
  }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  const register = (node: Element) => {
   if (node.hasAttribute('data-moon-motion')) return;
   node.setAttribute('data-moon-motion', '');
   node.classList.add('moon-enter');
   observer.observe(node);
  };
  root.querySelectorAll('.b-hero-content h1, .b-section-heading, .b-services article, .b-ai-card, .b-reel-case, .b-work, .b-contact h2').forEach(register);
  // Cards added by filtering or "load more" inherit the same stagger; no per-frame layout reads.
  const mutation = new MutationObserver(records => {
   for (const record of records) for (const added of record.addedNodes) if (added instanceof Element) {
    if (added.matches('.b-work')) register(added);
    added.querySelectorAll('.b-work').forEach(register);
   }
  });
  mutation.observe(root, { childList: true, subtree: true });
  const move = (event: Event) => {
   if (reduced.matches || !fine.matches) return;
   const e = event as PointerEvent;
   const el = (e.target as HTMLElement).closest<HTMLElement>('.b-services article, .b-work-preview, .b-reel-case, .b-primary');
   if (!el) return;
   const bounds = el.getBoundingClientRect();
   const x = (e.clientX - bounds.left) / bounds.width;
   const y = (e.clientY - bounds.top) / bounds.height;
   el.style.setProperty('--light-x', `${x * 100}%`);
   el.style.setProperty('--light-y', `${y * 100}%`);
   el.style.setProperty('--tilt-x', `${(y - .5) * -4}deg`);
   el.style.setProperty('--tilt-y', `${(x - .5) * 4}deg`);
   el.classList.add('moon-hover');
  };
  const leave = (event: Event) => {
   const node = (event.target as HTMLElement).closest<HTMLElement>('.moon-hover');
   if (node && !node.contains((event as PointerEvent).relatedTarget as Node)) {
    node.classList.remove('moon-hover'); node.style.setProperty('--tilt-x', '0deg'); node.style.setProperty('--tilt-y', '0deg');
   }
  };
  root.addEventListener('pointermove', move, { passive: true });
  root.addEventListener('pointerout', leave, { passive: true });
  cleanups.push(() => root.removeEventListener('pointermove', move), () => root.removeEventListener('pointerout', leave));
  return () => {
   observer.disconnect(); mutation.disconnect(); cleanups.forEach(fn => fn());
   root.querySelectorAll('[data-moon-motion]').forEach(node => { node.classList.remove('moon-enter', 'moon-arrived'); node.removeAttribute('data-moon-motion'); });
  };
 }, []);
}
