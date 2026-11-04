import { useEffect, useRef } from 'react';
/** Keep keyboard focus within the open preview and restore it on close. */
export function useModalFocus(open:boolean) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open) return;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const root=ref.current;
  const focusables=()=>Array.from(root?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],video[controls],[tabindex]:not([tabindex="-1"])')||[]);
  focusables()[0]?.focus();
  const trap=(event:KeyboardEvent)=>{
   if(event.key!=='Tab') return;
   const list=focusables(); if(!list.length){event.preventDefault();return;}
   if(event.shiftKey && document.activeElement===list[0]) {event.preventDefault();list[list.length-1].focus();}
   else if(!event.shiftKey && document.activeElement===list[list.length-1]) {event.preventDefault();list[0].focus();}
  };
  document.addEventListener('keydown',trap);
  return()=>{document.removeEventListener('keydown',trap);previous?.focus();};
 },[open]);
 return ref;
}
