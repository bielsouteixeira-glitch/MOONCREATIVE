import { useModalFocus } from './useModalFocus';
import { useEffect, useState } from 'react';
import { CLIENT_ORDER, CLIENT_REELS, WORKS, type Work } from '../optionB/portfolioBData';
import { ImageB, VideoB } from '../optionB/MediaB';
import './incrementalExperience.css';

const descriptions: Record<string, string> = {
 'Jah Burguer': 'Conteúdo em movimento para redes sociais.', 'La Barberia': 'Vídeos originais para redes sociais.',
 'Krodec': 'Vídeos, artes e campanhas de e-mail marketing.', 'Suprimed': 'Peças e campanhas originais.',
 'Opus Medical': 'Materiais de comunicação e design.', 'Priore': 'Materiais institucionais originais.',
 'CST Global': 'Trabalhos de comunicação e apresentação.', 'NOIZ': 'Campanha de camiseta desenvolvida com inteligência artificial.',
};
function WorkGallery({ title, works, onOpen }: { title: string; works: Work[]; onOpen: (work: Work)=>void }) {
 const [limit,setLimit]=useState(8);
 if (!works.length) return null;
 return <section className="mc-client-section"><h4>{title}</h4><div className="mc-art-grid">{works.slice(0,limit).map(work=><figure key={work.id} className="mc-art-card"><button onClick={()=>onOpen(work)} aria-label={`Ampliar ${work.title}`}><ImageB work={work}/></button><figcaption><span>{work.kind}</span><br/>{work.title}</figcaption></figure>)}</div>{limit<works.length && <button className="btn-secondary mc-more" onClick={()=>setLimit(n=>n+8)}>Ver mais ({works.length-limit})</button>}</section>;
}
function PhoneCarousel({ works, client }: { works: Work[]; client: string }) {
 const [index,setIndex] = useState(0); const work=works[index];
 const move=(step:number)=>setIndex(i=>(i+step+works.length)%works.length);
 if (!work) return null;
 return <section className="mc-client-section mc-client-videos"><h4>Vídeos</h4><div className="mc-phone-stage"><div className="mc-client-phone"><span className="mc-phone-camera" aria-hidden="true"/><div className="mc-phone-transition" key={work.id}><VideoB respectReducedMotion work={work} /></div></div></div>{works.length > 1 && <div className="mc-video-navigation" role="group" aria-label={`Navegar pelos vídeos de ${client}`}><button aria-label={`Vídeo anterior de ${client}`} onClick={()=>move(-1)}>←</button><span aria-live="polite">{String(index+1).padStart(2,'0')} / {String(works.length).padStart(2,'0')}</span><button aria-label={`Próximo vídeo de ${client}`} onClick={()=>move(1)}>→</button></div>}<p className="mc-video-caption">{work.title}</p></section>;
}
export function ClientBrands() {
 const [client,setClient] = useState<string>('Jah Burguer'); const [zoom,setZoom] = useState<Work|null>(null); const modalRef=useModalFocus(Boolean(zoom));
 useEffect(() => { if (!zoom) return; const esc=(event:KeyboardEvent)=>{if(event.key==='Escape')setZoom(null)}; window.addEventListener('keydown',esc); return()=>window.removeEventListener('keydown',esc); },[zoom]);
 const works = WORKS.filter(w=>w.client===client && !['eventos','campanhas-promocionais'].includes(w.category));
 const videos = (CLIENT_REELS[client] || works.filter(w=>w.type==='video' && w.src)).filter(w=>w.src);
 const references = works.filter(w=>w.type==='image' && w.category==='referencia-cliente');
 const posts = works.filter(w=>w.type==='image' && w.category==='posts-redes-sociais');
 const art = works.filter(w=>w.type==='image' && w.category!=='referencia-cliente' && w.category!=='posts-redes-sociais' && w.kind!=='E-mail marketing');
 const emails = works.filter(w=>w.type==='image' && w.kind==='E-mail marketing');
 return <section id="marcas" className="relative py-16 overflow-hidden"><div className="absolute inset-0 bg-[#08060D]"/><div className="relative z-10 max-w-6xl mx-auto px-6">
  <h2 className="font-display text-3xl font-bold md:text-4xl">Marcas que confiam na Moon.</h2><p className="mt-3 max-w-2xl text-sm text-lunar-gray">Vitrine com arquivos reais. Novos clientes entram nesta lista, sem reconstruir a seção.</p>
  <div className="mt-6 flex flex-wrap gap-2" aria-label="Clientes">{CLIENT_ORDER.map(name=><button key={name} type="button" className={`filter-chip ${client===name?'active':''}`} aria-pressed={client===name} onClick={()=>setClient(name)}>{name}</button>)}</div>
  <article className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6" key={client}><p className="text-[10px] font-display tracking-[0.18em] text-purple-bright">CLIENTE · PORTFÓLIO</p><h3 className="font-display mt-1 text-2xl">{client}</h3><p className="mt-2 max-w-2xl text-sm text-lunar-gray">{descriptions[client]}</p>
   {videos.length>0 && <PhoneCarousel works={videos} client={client}/>}
   <WorkGallery title="Identificação e apresentação" works={references} onOpen={setZoom}/>
   <WorkGallery title="Posts" works={posts} onOpen={setZoom}/>
   <WorkGallery title={client==='NOIZ'?'Produto desenvolvido com IA':'Artes e materiais gráficos'} works={art} onOpen={setZoom}/>
   {client==='Jah Burguer' && !art.length && <p className="mc-pending">As artes estáticas originais serão adicionadas quando enviadas.</p>}
   {client==='La Barberia' && !art.length && <p className="mc-pending">As artes estáticas aguardam confirmação de autorização.</p>}
   <WorkGallery title="E-mail marketing" works={emails} onOpen={setZoom}/>
   {!videos.length && !art.length && !emails.length && !references.length && !posts.length && <p className="mc-pending">Materiais aguardando confirmação de autorização para publicação.</p>}
  </article>
 </div>{zoom && <div ref={modalRef} className="fixed inset-0 z-[220] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={zoom.title} onClick={()=>setZoom(null)}><button className="absolute top-5 right-5 text-white p-4" aria-label="Fechar" onClick={()=>setZoom(null)}>✕</button><div className="mc-zoom-content" onClick={e=>e.stopPropagation()}><ImageB work={zoom}/>{zoom.documentUrl && <p><a href={zoom.documentUrl} target="_blank" rel="noopener noreferrer">Abrir documento PDF completo ↗</a></p>}</div></div>}
 </section>;
}
