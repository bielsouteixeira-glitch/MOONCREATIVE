import { MaterialShowcase } from './MaterialShowcase';
import './visualRefinement.css';
import { useModalFocus } from './useModalFocus';
import { useEffect, useState } from 'react';
import { WORKS, matchesCategory, type Category, type Work } from '../optionB/portfolioBData';
import { ImageB, VideoB } from '../optionB/MediaB';
const filters: [Category,string][] = [['campanhas-promocionais','Campanhas Promocionais'],['eventos','Eventos'],['materiais-graficos','Materiais Gráficos'],['ia-aplicada','Inteligência Artificial Aplicada'],['outros-clientes','Outros projetos']];
export function PortfolioCatalog(){
 const [category,setCategory]=useState<Category>('campanhas-promocionais');
 const [limit,setLimit]=useState(12); const [selected,setSelected]=useState<Work|null>(null); const modalRef=useModalFocus(Boolean(selected));
 useEffect(() => { if (!selected) return; const esc=(event:KeyboardEvent)=>{if(event.key==='Escape')setSelected(null)}; window.addEventListener('keydown',esc); return()=>window.removeEventListener('keydown',esc); },[selected]);
 const allWorks=WORKS.filter(w=>matchesCategory(w,category));
 const works=allWorks;
 const card=(work:Work)=><article key={work.id} className={`mc-catalog-card ${work.kind==='E-mail marketing'?'mc-email-card':''}`}><button onClick={()=>setSelected(work)} aria-label={`Ver ${work.title}`}><div className="mc-catalog-media">{work.type==='image'?<ImageB work={work}/>:work.poster?<img src={work.poster} alt="" loading="lazy"/>:<span>▶</span>}{work.type==='video' && <span className="mc-catalog-play">▶</span>}</div><div className="mc-catalog-label"><span>{work.client} · {work.kind || (work.type==='video'?'Vídeo':'Material gráfico')}</span><h3>{work.title}</h3></div></button></article>;
 const visible=works.slice(0,limit);
 return <section id="portfolio" className="relative py-16 md:py-32 overflow-hidden"><div className="absolute inset-0 bg-gradient-to-b from-space-black via-purple-deep/15 to-space-black"/><div className="relative z-10 max-w-7xl mx-auto px-6"><div className="text-center mb-8"><span className="text-xs font-display tracking-[0.3em] text-magenta-neon mb-4 block">PORTFÓLIO · TRABALHOS REAIS</span><h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-4">Design em todas as <span className="text-gradient">formas.</span></h2><p className="text-lunar-gray max-w-2xl mx-auto">Do digital ao impresso, cada detalhe é pensado para transformar ideias em experiências visuais.</p></div>
  <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12" aria-label="Categorias do portfólio">{filters.map(([id,name])=><button key={id} className={`filter-chip ${category===id?'active':''}`} aria-pressed={category===id} onClick={()=>{setCategory(id);setLimit(12)}}>{name}</button>)}</div>
  {!works.length ? <p className="mc-catalog-empty">Materiais desta categoria aguardam confirmação de autorização para publicação.</p> : category==='materiais-graficos' ? <MaterialShowcase works={works} onOpen={setSelected}/> : <div className="mc-catalog-grid">{visible.map(card)}</div>}
  {category!=='materiais-graficos' && works.length>limit && <div className="text-center mt-12"><button className="btn-secondary" onClick={()=>setLimit(limit+12)}>VER MAIS PROJETOS ({works.length-limit} restantes)</button></div>}
 </div>{selected && <div ref={modalRef} className="fixed inset-0 z-[220] flex items-center justify-center bg-black/95 p-5" role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)}><button className="absolute right-5 top-5 text-white p-4" aria-label="Fechar" onClick={()=>setSelected(null)}>✕</button><div className="mc-catalog-dialog" onClick={e=>e.stopPropagation()}>{selected.type==='image'?<ImageB work={selected}/>:<VideoB work={selected} controls respectReducedMotion/>}<p>{selected.title}</p>{selected.documentUrl && <a href={selected.documentUrl} className="mc-doc-link" target="_blank" rel="noopener noreferrer">Abrir PDF completo ↗</a>}</div></div>}</section>;
}
