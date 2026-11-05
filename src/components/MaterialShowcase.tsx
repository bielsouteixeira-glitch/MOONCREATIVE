import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ImageB } from '../optionB/MediaB';
import type { Work } from '../optionB/portfolioBData';

type MaterialGroup = { label:string; kinds:string[] };
const groups:MaterialGroup[] = [
 {label:'Assinaturas de e-mail',kinds:['Assinaturas de e-mail']},
 {label:'E-mail marketing',kinds:['E-mail marketing']},
 {label:'Papelaria e cartões',kinds:['Papelaria','Cartões de visita']},
 {label:'Pastas e apresentações',kinds:['Pastas','Apresentações']},
 {label:'Banners e materiais impressos',kinds:['Banners','Convites','Calendários','Outros materiais gráficos']},
 {label:'Embalagens e catálogos',kinds:['Embalagens','Catálogos e guias']},
];
function Frame({work}:{work:Work}) {
 const email=work.kind==='E-mail marketing';const desktop=email||work.kind==='Assinaturas de e-mail';
 return <div className={`mc-material-scene ${desktop?'is-screen':'is-print'} ${email?'is-email':''}`}>
  <div className="mc-scene-halo"/><div className="mc-scene-platform"/>
  <span className="mc-scene-back mc-scene-back-one" aria-hidden="true"/><span className="mc-scene-back mc-scene-back-two" aria-hidden="true"/>
  {desktop ? <div className="mc-work-laptop"><div className="mc-work-screen"><div className="mc-work-screen-bar"><i/><i/><i/><span>MOON / PORTFÓLIO</span></div><div className="mc-work-screen-content"><ImageB work={work}/></div></div><div className="mc-work-laptop-base"/></div> : <div className="mc-print-frame"><ImageB work={work}/></div>}
  {email && <div className="mc-work-phone" aria-label="A mesma arte, apresentada proporcionalmente no celular"><span className="mc-work-phone-speaker"/><div className="mc-work-phone-content"><ImageB work={work}/></div></div>}
 </div>;
}
export function MaterialShowcase({works,onOpen}:{works:Work[];onOpen:(work:Work)=>void}) {
 const [group,setGroup]=useState('Todos');const [index,setIndex]=useState(0);const [entered,setEntered]=useState(false);const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=root.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setEntered(true);io.disconnect()}},{threshold:.12});io.observe(el);return()=>io.disconnect()},[]);
 const definition=groups.find(g=>g.label===group);const filtered=definition?works.filter(w=>definition.kinds.includes(w.kind||'Outros materiais gráficos')):works;
 const work=filtered[index]||filtered[0];const move=(step:number)=>setIndex(i=>(i+step+filtered.length)%filtered.length);
 const chooseGroup=(value:string)=>{setGroup(value);setIndex(0)};
 const tilt=(event:PointerEvent<HTMLDivElement>)=>{if(event.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--tilt-x',`${((event.clientY-r.top)/r.height-.5)*-3}deg`);event.currentTarget.style.setProperty('--tilt-y',`${((event.clientX-r.left)/r.width-.5)*3}deg`)};
 const resetTilt=(event:PointerEvent<HTMLDivElement>)=>{event.currentTarget.style.removeProperty('--tilt-x');event.currentTarget.style.removeProperty('--tilt-y')};
 if(!work)return null;
 return <div ref={root} className={`mc-material-showcase ${entered?'is-entered':''}`}>
  <div className="mc-material-filters" role="group" aria-label="Tipos de materiais gráficos">{['Todos',...groups.filter(g=>works.some(w=>g.kinds.includes(w.kind||''))).map(g=>g.label)].map(label=>{const g=groups.find(x=>x.label===label);const exists=!g || works.some(w=>g.kinds.includes(w.kind||''));return <button key={label} type="button" aria-pressed={label===group} disabled={!exists} title={!exists?'Ainda não há material autorizado nesta categoria':undefined} onClick={()=>chooseGroup(label)}>{label}</button>})}</div>
  <div className="mc-material-feature"><div className="mc-material-stage" onPointerMove={tilt} onPointerLeave={resetTilt}><Frame key={work.id} work={work}/><button className="mc-material-zoom" onClick={()=>onOpen(work)} aria-label={`Ampliar ${work.title}`}>↗ <span>AMPLIAR PEÇA</span></button></div>
   <div className="mc-material-description"><span className="mc-material-eyebrow">PORTFÓLIO · {work.client.toUpperCase()}</span><h3>{work.kind || 'Material gráfico'}</h3><p className="mc-material-name">{work.title.replace(/\.(jpg|jpeg|png|pdf)$/i,'')}</p><p className="mc-material-detail">{work.kind==='E-mail marketing'?'Arte original apresentada em escala nos dispositivos, sem criar uma versão responsiva.':'Uma apresentação editorial do material original, preservando sua identidade e conteúdo.'}</p><div className="mc-material-controls"><button type="button" onClick={()=>move(-1)} aria-label="Material anterior">←</button><span aria-live="polite">{String(index+1).padStart(2,'0')} <em>/</em> {String(filtered.length).padStart(2,'0')}</span><button type="button" onClick={()=>move(1)} aria-label="Próximo material">→</button></div><button className="mc-material-view" onClick={()=>onOpen(work)}>VER ORIGINAL <span>↗</span></button></div>
  </div>
  <div className="mc-material-sequence"><div className="mc-material-sequence-heading"><span>EXPLORE A SEQUÊNCIA</span><span>{filtered.length} {filtered.length===1?'PEÇA':'PEÇAS'}</span></div><div className="mc-material-thumbnails" role="group" aria-label="Selecionar material">{filtered.map((item,i)=><button key={item.id} type="button" onClick={()=>setIndex(i)} className={index===i?'is-active':''} aria-pressed={index===i} aria-label={`${item.client}: ${item.title}`}><ImageB work={item}/><span>{String(i+1).padStart(2,'0')}</span></button>)}</div></div>
 </div>;
}
