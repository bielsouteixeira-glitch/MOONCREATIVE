import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, CLIENT_ORDER, CLIENT_REELS, NOIZ, WORKS, matchesCategory, type Category, type Work } from './portfolioBData';
import { ImageB, VideoB } from './MediaB';
import './optionB.css';
import { CinematicFinale } from './CinematicFinale';

const SERVICES = [
 ['01', 'Presença digital', 'Redes sociais com estratégia, design e conteúdo que traduzem a personalidade da sua marca.'],
 ['02', 'Sites & sistemas', 'Experiências digitais que conectam o seu negócio às pessoas. Do institucional ao projeto sob medida.'],
 ['03', 'Design & identidade', 'Ideias que ganham forma. Identidade visual, campanhas e materiais para o digital e o mundo físico.'],
 ['04', 'Eventos & experiências', 'Da comunicação à cobertura: criatividade para marcas que querem estar presentes.'],
];
function jump(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

function ReelCarousel({ client, onOpen, suspended }: { client: string; onOpen: (work: Work) => void; suspended: boolean }) {
 const [index, setIndex] = useState(0);
 const works = CLIENT_REELS[client];
 const work = works[index];
 const touch = useRef<number | null>(null);
 const move = (step: number) => setIndex(i => (i + step + works.length) % works.length);
 return <article className="b-reel-case">
  <div className="b-reel-copy"><span className="b-eyebrow">CONTEÚDO QUE CONECTA</span><h3>{client}</h3><p>{client === 'Krodec' ? 'Produtos em destaque. Vídeos verticais que apresentam o portfólio da Krodec com clareza e movimento.' : client === 'Jah Burguer' ? 'Sabor que dá vontade de compartilhar. Conteúdo em movimento para uma marca cheia de personalidade.' : 'Estilo em cada detalhe. A experiência da barbearia traduzida em vídeos para as redes sociais.'}</p><span className="b-tag">REELS · VÍDEO VERTICAL · 9:16</span><div className="b-carousel-nav"><button aria-label={`Vídeo anterior de ${client}`} onClick={() => move(-1)}>←</button><span>{String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}</span><button aria-label={`Próximo vídeo de ${client}`} onClick={() => move(1)}>→</button></div></div>
  <div className="b-phone-wrap"><div className="b-phone" onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current !== null) { const distance = e.changedTouches[0].clientX - touch.current; if (Math.abs(distance) > 40) move(distance > 0 ? -1 : 1); touch.current = null; } }}><div className="b-phone-island" /><VideoB key={work.id} work={work} active={!suspended} /><div className="b-phone-caption"><strong>{client}</strong><span>Conteúdo original · Moon Creative</span></div></div><button className="b-text-link" onClick={() => onOpen(work)}>Expandir vídeo ↗</button><div className="b-dots" aria-label={`Selecionar vídeo de ${client}`}>{works.map((item, i) => <button key={item.id} className={i === index ? 'active' : ''} aria-label={`Ver vídeo ${i + 1}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />)}</div></div>
 </article>;
}

function Lightbox({ items, index, onIndex, close }: { items: Work[]; index: number; onIndex: (i: number) => void; close: () => void }) {
 const dialog = useRef<HTMLDialogElement>(null);
 const work = items[index];
 useEffect(() => {
  const node = dialog.current;
  const previous = document.activeElement as HTMLElement | null;
  node?.showModal();
  const old = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => { node?.close(); document.body.style.overflow = old; previous?.focus(); };
 }, []);
 return <dialog ref={dialog} className="b-lightbox" aria-label={work.title} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowRight') onIndex((index + 1) % items.length); if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length); }}><div className="b-lightbox-top"><div><span className="b-eyebrow">{work.client}</span><h2>{work.title}</h2></div><button aria-label="Fechar visualização" onClick={close} autoFocus>✕</button></div><div className={`b-lightbox-media ${work.type === 'video' ? 'b-lightbox-vertical' : ''}`} key={work.id}>{work.type === 'image' ? <ImageB work={work} /> : <div className="b-phone"><div className="b-phone-island" /><VideoB work={work} controls /></div>}</div><div className="b-lightbox-bottom"><button onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Trabalho anterior">← Anterior</button><span>{index + 1} / {items.length}{work.driveId && <a className="b-original" href={`https://drive.google.com/file/d/${work.driveId}/view`} target="_blank" rel="noreferrer">Arquivo original ↗</a>}</span><button onClick={() => onIndex((index + 1) % items.length)} aria-label="Próximo trabalho">Próximo →</button></div></dialog>;
}

export default function OptionBPage() {
 const hero = useRef<HTMLVideoElement>(null);
 const [menu, setMenu] = useState(false);
 const [category, setCategory] = useState<Category | 'all'>('all');
 const [client, setClient] = useState('all');
 const [limit, setLimit] = useState(12);
 const [modal, setModal] = useState<{ items: Work[]; index: number } | null>(null);
 useEffect(() => { const title = document.title; document.title = 'Moon Creative — Criatividade fora de órbita'; return () => { document.title = title; }; }, []);
 useEffect(() => {
  const video = hero.current;
  if (!video) return;
  let visible = false;
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !document.hidden) void video.play().catch(() => {}); else video.pause(); }, { threshold: .1 });
  observer.observe(video);
  const exclusive = (e: Event) => { if ((e as CustomEvent).detail !== 'hero-b') video.pause(); };
  const visibility = () => { if (document.hidden) video.pause(); else if (visible) void video.play().catch(() => {}); };
  window.addEventListener('moon-b-play', exclusive); document.addEventListener('visibilitychange', visibility);
  return () => { observer.disconnect(); video.pause(); window.removeEventListener('moon-b-play', exclusive); document.removeEventListener('visibilitychange', visibility); };
 }, []);
 const filtered = WORKS.filter(work => matchesCategory(work, category) && (client === 'all' || work.client === client)).sort((a, b) => { const rank = (name: string) => { const i = CLIENT_ORDER.findIndex(client => client === name); return i < 0 ? 99 : i; }; const local = Number(!!b.src) - Number(!!a.src); return category === 'all' || category.startsWith('client:') ? rank(a.client) - rank(b.client) || local : local || rank(a.client) - rank(b.client); });
 const clients = [...new Set(WORKS.filter(work => matchesCategory(work, category)).map(work => work.client))].sort((a, b) => { const rank = (name: string) => { const i = CLIENT_ORDER.findIndex(client => client === name); return i < 0 ? 99 : i; }; return rank(a) - rank(b) || a.localeCompare(b, 'pt-BR'); });
 const open = (work: Work, items: Work[] = WORKS) => setModal({ items, index: Math.max(0, items.findIndex(item => item.id === work.id)) });
 const nav = (id: string) => { setMenu(false); jump(id); };
 return <div className="moon-b">
  <a className="b-skip" href="#portfolio-b" onClick={e => { e.preventDefault(); jump('portfolio-b'); }}>Pular para o portfólio</a>
  <header className="b-header"><a href="#/b" className="b-logo" aria-label="Moon Creative início" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="b-logo-orbit">◒</span><span>MOON<small>CREATIVE</small></span></a><nav aria-label="Navegação principal" className={menu ? 'is-open' : ''}><button onClick={() => nav('servicos-b')}>O que fazemos</button><button onClick={() => nav('ia-b')}>IA aplicada</button><button onClick={() => nav('portfolio-b')}>Portfólio</button><a href="#/">Opção A ↗</a><button className="b-nav-cta" onClick={() => nav('contato-b')}>Vamos conversar ↗</button></nav><button className="b-menu" aria-expanded={menu} aria-label="Abrir menu" onClick={() => setMenu(!menu)}>{menu ? 'Fechar ✕' : 'Menu ☰'}</button></header>
  <main>
   <section className="b-hero"><video ref={hero} onPlay={() => window.dispatchEvent(new CustomEvent('moon-b-play', { detail: 'hero-b' }))} className="b-hero-video" src="/videos/astronauta-lua-saturno.mp4" poster="/images/hero-astronaut.jpg" autoPlay muted loop playsInline preload="metadata" /><div className="b-hero-shade" /><div className="b-hero-content"><span className="b-eyebrow"><i /> ESTÚDIO CRIATIVO · UNIVERSO DE POSSIBILIDADES</span><h1>Sua marca.<br />Em outra <em>órbita.</em></h1><p>Estratégia, design e tecnologia para transformar boas ideias em marcas impossíveis de ignorar.</p><div className="b-actions"><button className="b-primary" onClick={() => nav('portfolio-b')}>Explore nossos trabalhos <span>↗</span></button><button className="b-secondary" onClick={() => nav('contato-b')}>Vamos criar juntos</button></div></div><div className="b-hero-bottom"><span>CRIATIVIDADE SEM GRAVIDADE</span><button onClick={() => nav('servicos-b')}>Explore o universo Moon ↓</button><span>ESTRATÉGIA + DESIGN + CONEXÃO</span></div></section>
   <div className="b-marquee" aria-hidden="true">ESTRATÉGIA <span>✳</span> DESIGN <span>✳</span> CONTEÚDO <span>✳</span> TECNOLOGIA <span>✳</span> EXPERIÊNCIAS <span>✳</span> CRIATIVIDADE</div>
   <section id="servicos-b" className="b-section"><div className="b-section-heading"><div><span className="b-eyebrow">01 / O QUE FAZEMOS</span><h2>Ideias grandes.<br /><span>Conexões de verdade.</span></h2></div><p>Cada marca tem seu universo.<br />A gente encontra o melhor caminho para expandi-lo.</p></div><div className="b-services">{SERVICES.map(([n, title, description]) => <article key={n}><span className="b-service-number">{n} <span>↗</span></span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
   <section id="ia-b" className="b-section b-ai"><div className="b-section-heading"><div><span className="b-eyebrow">02 / INTELIGÊNCIA ARTIFICIAL APLICADA</span><h2>O futuro já veste<br /><span>novas ideias.</span></h2></div><div><p>NOIZ · Moda, direção criativa e IA.<br />Imagens e movimento em uma nova linguagem visual.</p></div></div><div className="b-ai-grid">{NOIZ.map((work, i) => <article className={`b-ai-card b-ai-${i}`} key={work.id}>{work.type === 'video' ? <VideoB work={work} active={!modal} /> : <button className="b-image-button" onClick={() => open(work, NOIZ)} aria-label={`Ampliar ${work.title}`}><ImageB work={work} /></button>}<div className="b-ai-caption"><span>NOIZ / {work.type === 'video' ? 'AI FILM' : 'AI IMAGE'}</span><button onClick={() => open(work, NOIZ)}>{work.title} ↗</button></div></article>)}</div><p className="b-ai-note">Case NOIZ: camiseta desenvolvida com inteligência artificial. Fotografia e filme do mesmo produto, também disponíveis na categoria NOIZ, sem duplicar os arquivos.</p></section>
   <section className="b-section b-reels"><div className="b-section-heading"><div><span className="b-eyebrow">03 / MARCAS EM MOVIMENTO</span><h2>Não é só aparecer.<br /><span>É despertar interesse.</span></h2></div><p>Conteúdo real. Personalidades únicas.<br />Deslize, explore e dê o play.</p></div><div className="b-reel-grid">{Object.keys(CLIENT_REELS).map(name => <ReelCarousel client={name} key={name} onOpen={work => open(work, CLIENT_REELS[name])} suspended={!!modal} />)}</div></section>
   <section id="portfolio-b" className="b-section"><div className="b-section-heading"><div><span className="b-eyebrow">04 / NOSSO PORTFÓLIO</span><h2>Criatividade que<br /><span>acontece de verdade.</span></h2></div><p>Do primeiro conceito ao último detalhe.<br />Explore projetos, formatos e marcas.</p></div><div className="b-filters" role="group" aria-label="Filtrar por categoria"><button className={category === 'all' ? 'active' : ''} aria-pressed={category === 'all'} onClick={() => { setCategory('all'); setClient('all'); setLimit(12); }}>Todos os trabalhos</button>{CATEGORIES.map(([id, label]) => <button key={id} className={category === id ? 'active' : ''} aria-pressed={category === id} onClick={() => { setCategory(id); setClient('all'); setLimit(12); }}>{label}</button>)}</div><div className="b-filter-bar"><span aria-live="polite">{filtered.length} trabalhos <span> / {category === 'all' ? 'Todos os formatos' : CATEGORIES.find(([id]) => id === category)?.[1]}</span></span><label>Cliente <select value={client} onChange={e => { setClient(e.target.value); setLimit(12); }}><option value="all">Todas as marcas</option>{clients.map(name => <option key={name}>{name}</option>)}</select></label></div><div className="b-work-grid">{filtered.slice(0, limit).map(work => <article className="b-work" key={work.id}>
    {work.type === 'video' ? <button className="b-work-preview" onClick={() => open(work, filtered)} aria-label={`Abrir ${work.title}`}><div className="b-work-image">{work.poster && <img src={work.poster} alt="" loading="lazy" />}</div><span className="b-expand">▶</span></button> : <button className={`b-work-preview b-format-${work.category} ${work.kind === 'Assinaturas de e-mail' ? 'b-format-assinaturas-email' : work.kind === 'E-mail marketing' ? 'b-format-email-marketing' : ''}`} onClick={() => open(work, filtered)} aria-label={`Abrir ${work.title}`}><div className="b-mockup-top"><i /><i /><i /><span>{work.kind === 'Assinaturas de e-mail' || work.kind === 'E-mail marketing' ? 'Caixa de entrada · Nova mensagem' : 'Moon Creative · Projeto'}</span></div><div className="b-work-image"><ImageB work={work} /></div><span className="b-expand">↗</span></button>}
    <div className="b-work-info"><span>{work.client} <small>{work.type === 'video' ? 'VÍDEO' : work.kind || 'DESIGN'}</small></span><h3><button onClick={() => open(work, filtered)}>{work.title}</button></h3></div></article>)}</div>{!filtered.length && <p className="b-empty">Nenhum trabalho encontrado para estes filtros.</p>}{limit < filtered.length && <div className="b-load"><button className="b-secondary" onClick={() => setLimit(n => n + 12)}>Explorar mais trabalhos <span>↓</span></button><span>{Math.min(limit, filtered.length)} de {filtered.length}</span></div>}</section>
   <CinematicFinale />
  </main><footer className="b-footer"><a href="#/b" className="b-logo">◒ MOON<small>CREATIVE</small></a><p>© Moon Creative — Todos os direitos reservados.</p><a href="#/">Conhecer a Opção A ↗</a></footer>
  {modal && <Lightbox items={modal.items} index={modal.index} onIndex={index => setModal({ ...modal, index })} close={() => setModal(null)} />}
 </div>;
}
