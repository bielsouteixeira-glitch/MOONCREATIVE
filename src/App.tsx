import { useEffect, useMemo, useRef, useState } from "react";
import {
  PROJECTS,
  VIDEO_MAP,
  driveThumbUrl,
  type Project,
  type MediaItem,
} from "./data/portfolio";
import { CyclingCover } from "./components/Experience";
import { Component, type ReactNode } from "react";
import { AIStudio, AssistantDemo, SiteDemos, SocialPresence, StrategyBand } from "./components/Sections";
import { ClientBrands } from "./components/ClientBrands";
import AdminPage from "./admin/AdminPage";
import OptionBPage from "./optionB/OptionBPage";
import { CinematicFinale } from "./optionB/CinematicFinale";
import { IncrementalExperience } from "./components/IncrementalExperience";
import { PortfolioCatalog } from "./components/PortfolioCatalog";
import { SpaceCursor } from "./components/SpaceCursor";
import { SpaceAtmosphere } from "./components/SpaceAtmosphere";

/* ============================================================
   CONFIG
============================================================ */
export const CONTACT_CONFIG = {
  whatsapp: null as string | null,
  email: null as string | null,
  instagram: null as string | null,
};

const LOGO_URL =
  "https://drive.google.com/thumbnail?id=1pK1X8fneWpTNBKYvaWxdiDNZx7J0NZLU&sz=w1600";

/* ============================================================
   INTRO
============================================================ */
// Once per loaded page, not once per browser session: reloads can show the intro again.
let introSeen = false;
function IntroOverlay() {
  const [done, setDone] = useState(() => introSeen || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [leaving, setLeaving] = useState(false);
  const finish = () => { introSeen = true; setLeaving(true); };
  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(finish, 2300);
    return () => window.clearTimeout(timer);
  }, [done]);
  useEffect(() => { if (!leaving) return; const timer = window.setTimeout(() => setDone(true), 380); return () => window.clearTimeout(timer); }, [leaving]);
  if (done) return null;
  return <div id="intro-overlay" className={`mc-intro ${leaving ? 'mc-intro-leave' : ''}`} role="region" aria-label="Introdução Moon Creative">
    <div className="mc-intro-nebula" aria-hidden="true"/><div className="mc-intro-stars" aria-hidden="true"/><div className="mc-intro-light" aria-hidden="true"/>
    <img className="mc-intro-logo" src="/images/moon-official.webp" alt="Moon Creative" />
    <button className="mc-intro-skip" onClick={() => { introSeen = true; setDone(true); }}>Pular introdução <span aria-hidden="true">→</span></button>
  </div>;
}

/* ============================================================
   STAR FIELD
============================================================ */
function StarField({ density = 60 }: { density?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        dur: `${2 + Math.random() * 4}s`,
        delay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.6 + 0.2,
      })),
    [density]
  );
  return (
    <div className="star-field">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{
          top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity,
          ["--dur" as any]: s.dur, ["--delay" as any]: s.delay,
        }} />
      ))}
    </div>
  );
}

/* ============================================================
   DRIFTING PARTICLES
============================================================ */
function DriftingParticles({ count = 10 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        dx: `${(Math.random() - 0.5) * 200}px`,
        dy: `${-80 - Math.random() * 180}px`,
        dur: `${18 + Math.random() * 22}s`,
        delay: `${Math.random() * 15}s`,
        size: Math.random() * 2.5 + 1.5,
        hue: Math.random() > 0.5 ? "#F04DE8" : "#A855F7",
      })),
    [count]
  );
  return (
    <>
      {particles.map((p) => (
        <span key={p.id} className="particle" style={{
          top: p.top, left: p.left, width: p.size, height: p.size,
          background: `radial-gradient(circle, ${p.hue}, transparent 70%)`,
          animationDuration: p.dur, animationDelay: p.delay,
          ["--dx" as any]: p.dx, ["--dy" as any]: p.dy,
          boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
        }} />
      ))}
    </>
  );
}

/* ============================================================
   ROCKET CROSSING
============================================================ */
function RocketCrossing() {
  return (
    <div className="absolute z-[13] pointer-events-none overflow-hidden"
      style={{ top: "18%", left: 0, right: 0, height: 60 }}>
      <div style={{
        position: "absolute", top: 0, left: "-60px",
        animation: "rocket-fly 28s linear 8s infinite",
      }}>
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none" style={{ transform: "rotate(35deg)" }}>
          <defs>
            <linearGradient id="rgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F7F3FC" />
              <stop offset="0.7" stopColor="#A855F7" />
              <stop offset="1" stopColor="#F04DE8" />
            </linearGradient>
          </defs>
          <path d="M24 4 C 30 14 32 22 32 30 L 16 30 C 16 22 18 14 24 4 Z" fill="url(#rgrad)" />
          <circle cx="24" cy="18" r="2.5" fill="#F7F3FC" opacity="0.9" />
          <path d="M16 30 L 10 38 L 18 34 Z" fill="#792BDB" />
          <path d="M32 30 L 38 38 L 30 34 Z" fill="#792BDB" />
          <path d="M20 30 L 24 44 L 28 30 Z" fill="#F04DE8" />
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   HEADER
============================================================ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { rotulo: "Início", destino: "#inicio" },
    { rotulo: "Redes", destino: "#redes" },
    { rotulo: "Sites", destino: "#sites" },
    { rotulo: "Portfólio", destino: "#portfolio" },
    { rotulo: "Contato", destino: "#contato" },
  ];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#08060D]/85 backdrop-blur-xl border-b border-violet-brand/15 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-brand via-purple-bright to-magenta-neon p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full rounded-full bg-space-black flex items-center justify-center overflow-hidden">
              <img src={LOGO_URL} alt="Moon Creative" className="w-7 h-7 object-contain"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  el.parentElement!.innerHTML = '<span class="text-[10px] font-display font-bold text-gradient">MOON</span>';
                }} />
            </div>
          </div>
          <span className="font-display font-bold tracking-[0.2em] text-sm hidden sm:block">
            MOON <span className="text-purple-bright">CREATIVE</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => <a key={l.destino} href={l.destino} className="nav-link">{l.rotulo}</a>)}
        </nav>
        <a href="#contato" className="hidden lg:inline-flex btn-primary !py-2.5 !px-5 !text-[0.72rem]">
          Orçamento
        </a>
        <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)} aria-label="Abrir menu">
          <span className={`block w-6 h-0.5 bg-lunar-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-lunar-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-lunar-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-space-black/98 backdrop-blur-xl border-b border-violet-brand/20 py-6 px-6">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.destino} href={l.destino} onClick={() => setOpen(false)}
                className="nav-link !text-sm !tracking-widest py-2">{l.rotulo}</a>
            ))}
            <a href="#contato" onClick={() => setOpen(false)} className="btn-primary mt-4 !text-xs">
              SOLICITAR ORÇAMENTO
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      if (document.hidden || !video.paused || video.readyState < 2) return;
      void video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
    };
    video.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", play);
    play();
    return () => { video.removeEventListener("canplay", play); document.removeEventListener("visibilitychange", play); };
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          onPlay={() => setBlocked(false)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center center" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-first-frame.jpg"
          aria-hidden="true"
          src="/videos/astronauta-lua-saturno.mp4"
        />
      </div>

      {blocked && <button className="mc-hero-play" onClick={() => { void videoRef.current?.play().then(() => setBlocked(false)).catch(() => setBlocked(true)); }}>Reproduzir vídeo do banner</button>}

      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,6,13,0.3) 0%, rgba(23,10,41,0.4) 50%, rgba(8,6,13,0.85) 100%), radial-gradient(ellipse at 70% 40%, rgba(240,77,232,0.12), transparent 55%), radial-gradient(ellipse at 20% 75%, rgba(121,43,219,0.18), transparent 60%)",
        }} />

      <div className="absolute inset-0 z-[12] pointer-events-none">
        <StarField density={35} />
        <DriftingParticles count={12} />
        <div className="orbit-ring hidden md:block"
          style={{ width: 700, height: 700, right: "-200px", top: "-100px", animation: "orbit-spin 60s linear infinite" }} />
        <div className="orbit-ring hidden md:block"
          style={{ width: 900, height: 900, right: "-300px", top: "-200px",
            borderColor: "rgba(240,77,232,0.07)", animation: "orbit-spin-reverse 90s linear infinite" }} />
        {/* Saturno pequeno */}
        <div className="hidden lg:block absolute"
          style={{
            right: "7%", top: "20%",
            animation: "float-slow 12s ease-in-out infinite",
            zIndex: 12,
          }}>
          <div className="relative" style={{ filter: "drop-shadow(0 0 25px rgba(168,85,247,0.4))" }}>
            <div className="saturn-planet" style={{ width: 78, height: 78 }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 180, height: 28, border: "2px solid rgba(215,180,255,0.45)",
                boxShadow: "0 0 18px rgba(240,77,232,0.25)",
                transform: "translate(-50%,-50%) rotate(-20deg)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 220, height: 42, border: "1px solid rgba(168,85,247,0.3)",
                transform: "translate(-50%,-50%) rotate(-20deg)" }} />
          </div>
        </div>
      </div>

      <RocketCrossing />

      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center pt-28 pb-20">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-7 px-4 py-1.5 rounded-full border border-purple-bright/40 bg-space-black/40 backdrop-blur-md">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta-neon opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta-neon" />
          </span>
          <span className="text-[10px] sm:text-xs font-display tracking-[0.16em] text-lunar-gray uppercase">
            Redes sociais · Sites e sistemas · Audiovisual · Inteligência artificial
          </span>
        </div>

        <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-6 text-lunar-white"
          style={{ fontSize: "clamp(2.2rem, 5.8vw, 4.6rem)" }}>
          <span className="block">CRIATIVIDADE</span>
          <span className="block text-gradient">QUE VAI ALÉM.</span>
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-lunar-gray leading-relaxed mb-10">
          Sites, sistemas, identidade visual, design, marketing digital, conteúdo, audiovisual e soluções com inteligência artificial. Criatividade e tecnologia em cada projeto.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#redes" className="btn-primary">
            CONHEÇA NOSSAS SOLUÇÕES
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#portfolio" className="btn-secondary">
            VER NOSSOS TRABALHOS
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-lunar-gray/60 z-20">
        <span className="text-[10px] font-display tracking-[0.3em]">EXPLORAR</span>
        <div className="w-px h-10 bg-gradient-to-b from-purple-bright to-transparent animate-pulse" />
      </div>
    </section>
  );
}

/* ============================================================
   ESPECIALIDADES
============================================================ */
function SitesSistemas() {
  const services = [
    "Sites profissionais e institucionais.",
    "Landing pages.",
    "Sites para restaurantes, hamburguerias, docerias.",
    "Cardápios digitais.",
    "Sistemas de pedidos para restaurantes.",
    "Catálogos digitais de produtos e serviços.",
    "Fluxos de pedidos via WhatsApp.",
    "Painéis administrativos conforme o projeto.",
    "Integrações e automações.",
  ];
  return (
    <section id="sites" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(160deg, #170a29cc, #08060de0)",
        backgroundSize: "cover", backgroundPosition: "center right",
      }} />
      <StarField density={20} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-display tracking-[0.25em] bg-purple-bright/15 text-purple-bright border border-purple-bright/30 mb-5">
            02 · SITES E SISTEMAS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
            Criamos sites e sistemas que <span className="text-gradient">ajudam seu negócio a funcionar melhor.</span>
          </h2>
          <p className="text-lunar-gray leading-relaxed mb-8">
            Soluções digitais personalizadas para apresentar produtos, organizar
            informações e facilitar o contato com os clientes.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
            {services.map((s) => (
              <li key={s} className="flex items-start text-sm text-lunar-white/90">
                <span className="relative mr-4 mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-purple-bright shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                {s}
              </li>
            ))}
          </ul>
          <a href="#contato" className="btn-primary mt-8">
            QUERO CRIAR MEU SITE OU SISTEMA
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <SiteDemos />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EVENTOS
============================================================ */
function EventosStands() {
  const services = [
    "Planejamento e organização de eventos.",
    "Criação e produção de stands profissionais.",
    "Conceito visual e ambientação.",
    "Pesquisa de espaços e fornecedores.",
    "Cotação e contratação conforme aprovação.",
    "Coordenação de fornecedores.",
    "Apoio na montagem e execução.",
    "Cobertura foto e vídeo conforme escopo.",
    "Conteúdo de divulgação.",
  ];
  const process = [
    "Entendemos o objetivo.",
    "Pesquisamos espaços e fornecedores.",
    "Organizamos cotações.",
    "Planejamos estrutura e comunicação.",
    "Coordenamos a produção.",
    "Realizamos a cobertura quando contratada.",
  ];
  return (
    <section id="eventos" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(160deg, #08060dca, #170a29cf)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <StarField density={25} />
      <div className="orbit-ring hidden lg:block" style={{
        width: 600, height: 600, right: "-180px", top: "-100px", borderColor: "rgba(240,77,232,0.08)",
      }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14 reveal">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-display tracking-[0.25em] bg-magenta-neon/15 text-magenta-neon border border-magenta-neon/30 mb-5">
            03 · EVENTOS E STANDS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
            Seu evento merece acontecer. <span className="text-gradient">Nós cuidamos dos detalhes.</span>
          </h2>
          <p className="text-lunar-gray leading-relaxed mb-6">
            A Moon Creative coordena diferentes etapas da produção, ajudando sua
            empresa a encontrar os recursos certos.
          </p>
          <blockquote className="border-l-2 border-magenta-neon pl-5 py-1 my-6 font-display text-lg md:text-xl text-lunar-white italic">
            "Você traz a ideia. Nós ajudamos a planejar, organizar e fazer acontecer."
          </blockquote>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="glass-card p-7 md:p-9 reveal">
            <h3 className="font-display text-xl font-semibold mb-6">Serviços</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="flex items-start text-sm text-lunar-white/90">
                  <span className="relative mr-3 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-bright" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-lunar-gray/80 mt-6 leading-relaxed italic">
              Disponibilidade, valores e execução dependem de confirmação e aprovação.
            </p>
          </div>
          <div className="glass-card p-7 md:p-9 reveal">
            <h3 className="font-display text-xl font-semibold mb-6">Nosso processo</h3>
            <ul className="space-y-4">
              {process.map((p, i) => (
                <li key={p} className="flex items-start text-sm text-lunar-white/90">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-violet-brand to-magenta-neon text-[11px] font-display font-bold flex items-center justify-center mr-3 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1">{p}</span>
                </li>
              ))}
            </ul>
            <a href="#contato" className="btn-primary mt-8">
              VAMOS TIRAR MEU EVENTO DO PAPEL
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SATURN SHOWCASE
============================================================ */
export function Portfolio() {
  const categories = [
    "Todos",
    "Redes Sociais",
    "Campanhas Institucionais",
    "Design Gráfico",
    "Identidade Visual",
    "E-mail Marketing",
    "Materiais Promocionais e PDV",
    "Comunicação Visual",
    "Vídeos e Produções",
  ];
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [showCount, setShowCount] = useState(8);

  const catalog = useMemo(
    () => PROJECTS.filter((p) => !["videos-hero", "moon-logo", "lua-foto", "astronauta-png"].includes(p.id)),
    []
  );
  const filtered = useMemo(() => {
    if (active === "Todos") return catalog;
    return catalog.filter((p) => p.category === active);
  }, [active, catalog]);

  const visible = useMemo(() => filtered.slice(0, showCount), [filtered, showCount]);

  useEffect(() => { setShowCount(8); }, [active]);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight")
          setLightbox((l) => l && { ...l, index: (l.index + 1) % l.project.items.length });
        if (e.key === "ArrowLeft")
          setLightbox((l) => l && { ...l, index: (l.index - 1 + l.project.items.length) % l.project.items.length });
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [lightbox]);

  const totalPieces = useMemo(
    () => catalog.reduce((acc, p) => acc + p.items.length, 0),
    [catalog]
  );

  function pieceMedia(p: MediaItem): { isVideo: boolean; src: string; poster?: string } {
    if (p.type === "video") {
      const local = VIDEO_MAP[p.driveId];
      if (local) return { isVideo: true, src: local, poster: driveThumbUrl(p.driveId, 800) };
      return { isVideo: true, src: "" }; // não disponível
    }
    return { isVideo: false, src: driveThumbUrl(p.driveId, 1600) };
  }

  return (
    <section id="portfolio" className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-purple-deep/15 to-space-black" />
      <StarField density={20} />
      <DriftingParticles count={6} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 reveal">
          <span className="text-xs font-display tracking-[0.3em] text-magenta-neon mb-4 block">
            PORTFÓLIO · {PROJECTS.length} PROJETOS · {totalPieces} PEÇAS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-4">
            Ideias que ganham <span className="text-gradient">forma.</span>
          </h2>
          <p className="text-lunar-gray max-w-2xl mx-auto">
            Uma seleção de trabalhos criativos, campanhas, identidades visuais e materiais de comunicação.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 reveal">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`filter-chip ${active === c ? "active" : ""}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visible.map((p, idx) => {
            const coverItem = p.items.find((i) => i.driveId === p.coverId) || p.items[0];
            const media = pieceMedia(coverItem);
            const isVideo = media.isVideo && media.src;
            return (
              <div
                key={p.id}
                className="portfolio-card reveal"
                style={{
                  transitionDelay: `${(idx % 8) * 50}ms`,
                  aspectRatio: "4/5",
                }}
                onClick={() => {
                  const coverIdx = p.items.findIndex((pc) => pc.driveId === p.coverId);
                  setLightbox({ project: p, index: coverIdx >= 0 ? coverIdx : 0 });
                }}
                role="button" tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const coverIdx = p.items.findIndex((pc) => pc.driveId === p.coverId);
                    setLightbox({ project: p, index: coverIdx >= 0 ? coverIdx : 0 });
                  }
                }}
              >
                {!loaded[p.id] && (
                  <div className="absolute inset-0 bg-purple-deep/40 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-purple-bright/40 border-t-magenta-neon rounded-full animate-spin" />
                  </div>
                )}
                <CyclingCover
                  ids={(p.items.some((it) => it.type === "image")
                    ? p.items.filter((it) => it.type === "image").map((it) => it.driveId)
                    : [p.coverId]
                  ).slice(0, 8)}
                  alt={`${p.title} — ${p.category}`}
                  onReady={() => setLoaded((s) => ({ ...s, [p.id]: true }))}
                />
                {isVideo && (
                  <div className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-magenta-neon/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(240,77,232,0.6)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                )}
                <div className="overlay" style={{
                  opacity: 1,
                  background: "linear-gradient(to top, rgba(8,6,13,0.95) 0%, rgba(23,10,41,0.5) 55%, transparent 100%)",
                }}>
                  <div className="w-full">
                    <div className="text-[9px] md:text-[10px] font-display tracking-[0.2em] text-magenta-neon mb-1.5">
                      {p.category.toUpperCase()} · {p.items.length} {p.items.length === 1 ? "PEÇA" : "PEÇAS"}
                    </div>
                    <div className="text-sm md:text-base font-display font-semibold text-lunar-white leading-tight">
                      {p.title}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-display tracking-widest text-purple-bright">
                      VER PROJETO
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length > showCount && (
          <div className="text-center mt-12 reveal">
            <button onClick={() => setShowCount(showCount + 12)} className="btn-secondary">
              VER MAIS PROJETOS ({filtered.length - showCount} restantes)
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <PortfolioLightbox
          project={lightbox.project}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.project.items.length) % lightbox.project.items.length })}
          onNext={() => setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.project.items.length })}
          pieceMedia={pieceMedia}
        />
      )}
    </section>
  );
}

function PortfolioLightbox({
  project, index, onClose, onPrev, onNext, pieceMedia,
}: {
  project: Project;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  pieceMedia: (i: MediaItem) => { isVideo: boolean; src: string; poster?: string };
}) {
  const current = project.items[index];
  const media = pieceMedia(current);
  const [paused, setPaused] = useState(false);
  const nextRef = useRef(onNext);
  nextRef.current = onNext;
  useEffect(() => {
    if (paused || project.items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => nextRef.current(), 3200);
    return () => window.clearTimeout(t);
  }, [paused, index, project.id, project.items.length]);
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full border border-purple-bright/40 bg-space-black/70 flex items-center justify-center text-lunar-white hover:border-magenta-neon hover:text-magenta-neon transition z-10"
        aria-label="Fechar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-purple-bright/40 bg-space-black/70 flex items-center justify-center text-lunar-white hover:border-magenta-neon hover:text-magenta-neon transition z-10"
        aria-label="Anterior">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-purple-bright/40 bg-space-black/70 flex items-center justify-center text-lunar-white hover:border-magenta-neon hover:text-magenta-neon transition z-10"
        aria-label="Próxima">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="max-w-[92vw] max-h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {media.isVideo && media.src ? (
          <video src={media.src} poster={media.poster} controls autoPlay muted loop playsInline
            className="max-w-[92vw] max-h-[75vh] rounded-lg shadow-[0_30px_80px_rgba(168,85,247,0.3)]" />
        ) : (
          <img
            src={driveThumbUrl(current.driveId, 2000)}
            alt={current.label}
            className="max-w-[92vw] max-h-[75vh] object-contain rounded-lg shadow-[0_30px_80px_rgba(168,85,247,0.3)]"
          />
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4 max-w-[90vw]">
        <div className="text-[10px] font-display tracking-[0.25em] text-magenta-neon mb-1">
          {project.category.toUpperCase()} · PEÇA {index + 1} DE {project.items.length}
        </div>
        <div className="font-display text-lunar-white text-base md:text-lg">{current.label}</div>
        <div className="text-xs text-lunar-gray/70 mt-0.5">{project.title}</div>
      </div>
    </div>
  );
}

/* ============================================================
   CONTATO
============================================================ */
function Contact() {
  const [form, setForm] = useState({ nome: "", empresa: "", servico: "", descricao: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    "Inteligência Artificial",
    "Criação de Sites",
    "Sistemas de Pedidos",
    "Eventos e Stands",
    "Cobertura de Eventos",
    "Marketing e Redes Sociais",
    "Design Gráfico",
    "Outro projeto",
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    if (!form.descricao.trim() || form.descricao.trim().length < 10)
      e.descricao = "Descreva brevemente seu projeto (mínimo 10 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section id="contato" className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/contact-cta.jpg" alt="" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black via-[#0c071a]/90 to-space-black" />
      </div>
      <StarField density={30} />
      <DriftingParticles count={6} />
      <div className="orbit-ring hidden lg:block" style={{
        width: 600, height: 600, right: "-200px", bottom: "-200px", borderColor: "rgba(240,77,232,0.1)",
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <span className="text-xs font-display tracking-[0.3em] text-magenta-neon mb-4 block">CONTATO</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-[1.08] mb-6">
            Tem uma ideia? <span className="text-gradient">Vamos fazer acontecer.</span>
          </h2>
          <p className="text-lunar-gray text-lg max-w-2xl mx-auto">
            Conte o que você precisa: um site, um sistema, IA, materiais ou um evento completo.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 reveal">
            <div className="glass-card p-7">
              <h3 className="font-display text-xl font-semibold mb-4">Informações</h3>
              <p className="text-sm text-lunar-gray mb-5 leading-relaxed">
                Em breve disponibilizaremos WhatsApp, e-mail e Instagram oficiais. Por
                enquanto, envie sua mensagem pelo formulário.
              </p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-violet-brand/20 border border-violet-brand/40 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-lunar-white mb-0.5">WhatsApp</div>
                    {CONTACT_CONFIG.whatsapp ? (
                      <a href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer"
                        className="text-purple-bright hover:text-magenta-neon text-xs transition">Enviar mensagem</a>
                    ) : <div className="text-lunar-gray text-xs italic">A ser configurado</div>}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-violet-brand/20 border border-violet-brand/40 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-lunar-white mb-0.5">E-mail</div>
                    {CONTACT_CONFIG.email ? (
                      <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-purple-bright hover:text-magenta-neon text-xs break-all">
                        {CONTACT_CONFIG.email}
                      </a>
                    ) : <div className="text-lunar-gray text-xs italic">A ser configurado</div>}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-violet-brand/20 border border-violet-brand/40 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-lunar-white mb-0.5">Instagram</div>
                    {CONTACT_CONFIG.instagram ? (
                      <a href={`https://instagram.com/${CONTACT_CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"
                        className="text-purple-bright hover:text-magenta-neon text-xs">@{CONTACT_CONFIG.instagram}</a>
                    ) : <div className="text-lunar-gray text-xs italic">A ser configurado</div>}
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta-neon opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta-neon" />
                </span>
                <span className="text-xs font-display tracking-[0.25em] text-magenta-neon">ABERTO A NOVOS PROJETOS</span>
              </div>
              <p className="text-sm text-lunar-gray leading-relaxed">
                O atendimento é personalizado para entender o seu negócio antes de apresentar uma proposta.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 glass-card p-7 md:p-9 reveal">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-brand to-magenta-neon flex items-center justify-center shadow-[0_0_40px_rgba(240,77,232,0.5)]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Mensagem recebida!</h3>
                <p className="text-lunar-gray max-w-md mx-auto mb-6">
                  Obrigado, <strong className="text-lunar-white">{form.nome}</strong>.
                  Assim que os canais oficiais forem configurados, entraremos em contato.
                </p>
                <button type="button" className="btn-secondary" onClick={() => {
                  setSubmitted(false);
                  setForm({ nome: "", empresa: "", servico: "", descricao: "" });
                }}>
                  ENVIAR NOVA MENSAGEM
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" htmlFor="nome">Nome *</label>
                    <input id="nome" type="text" className="form-input" placeholder="Seu nome completo"
                      value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                    {errors.nome && <p className="text-magenta-neon text-xs mt-1.5">{errors.nome}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="empresa">Empresa</label>
                    <input id="empresa" type="text" className="form-input" placeholder="Nome da sua empresa"
                      value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="servico">O que você precisa?</label>
                  <select id="servico" className="form-input appearance-none cursor-pointer"
                    value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })}>
                    <option value="">Selecione um serviço...</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="descricao">Descrição do projeto *</label>
                  <textarea id="descricao" rows={5} className="form-input resize-none"
                    placeholder="Conte um pouco sobre o que você precisa..."
                    value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
                  {errors.descricao && <p className="text-magenta-neon text-xs mt-1.5">{errors.descricao}</p>}
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-lunar-gray/70 leading-relaxed max-w-sm">
                    * Campos obrigatórios.
                  </p>
                  <button type="submit" className="btn-primary">
                    VAMOS CONVERSAR
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer() {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden border-t border-violet-brand/15">
      <div className="absolute inset-0 bg-gradient-to-b from-space-black to-[#050308]" />
      <StarField density={15} />
      <div className="orbit-ring hidden lg:block" style={{
        width: 700, height: 700, left: "-250px", bottom: "-350px", borderColor: "rgba(168,85,247,0.06)",
      }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-brand via-purple-bright to-magenta-neon p-[2px]">
                <div className="w-full h-full rounded-full bg-space-black flex items-center justify-center overflow-hidden">
                  <img src={LOGO_URL} alt="Moon Creative" className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      el.parentElement!.innerHTML = '<span class="text-[9px] font-display font-bold text-gradient">MOON</span>';
                    }} />
                </div>
              </div>
              <span className="font-display font-bold tracking-[0.2em]">
                MOON <span className="text-purple-bright">CREATIVE</span>
              </span>
            </div>
            <p className="text-sm text-lunar-gray leading-relaxed max-w-md mb-4">
              Agência criativa e tecnológica que une inteligência artificial,
              desenvolvimento digital, marketing, design e produção de eventos.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs tracking-[0.25em] text-magenta-neon mb-4">NAVEGUE</h4>
            <ul className="space-y-2.5">
              {[
                { t: "Início", d: "#inicio" },
                { t: "Redes", d: "#redes" },
                { t: "Sites", d: "#sites" },
                { t: "Eventos", d: "#eventos" },
                { t: "Portfólio", d: "#portfolio" },
                { t: "Contato", d: "#contato" },
              ].map((l) => (
                <li key={l.d}><a href={l.d} className="text-sm text-lunar-gray hover:text-lunar-white transition">{l.t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs tracking-[0.25em] text-magenta-neon mb-4">ESPECIALIDADES</h4>
            <ul className="space-y-2.5">
              {["Inteligência Artificial", "Sites e Sistemas", "Eventos e Stands", "Marketing e Redes", "Design Gráfico"].map((x) => (
                <li key={x} className="text-sm text-lunar-gray">{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-lunar-gray/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-lunar-gray/70 text-center md:text-left">
            © Moon Creative — Todos os direitos reservados.
          </p>
          <p className="text-xs text-lunar-gray/50 text-center md:text-right font-light italic">
            Ideias que saem da órbita do comum.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
function useScrollReveal() {
  useEffect(() => {
    const mark = () => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    };
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(mark, 900);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);
}

/* ============================================================
   APP
============================================================ */
class SectionGuard extends Component<{ name: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <section className="px-6 py-10 text-center">
          <p className="text-lunar-gray">A seção {this.props.name} não carregou. O restante da página continua disponível.</p>
        </section>
      );
    }
    return this.props.children;
  }
}

function usePath() {
  const read = () => (window.location.hash.replace(/^#/, "") || "/");
  const [path, setPath] = useState(read);
  useEffect(() => {
    const sync = () => setPath(read());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return path;
}

export default function App() {
  useScrollReveal();
  const path = usePath();
  if (path === "/b" || path === "/opcao-b") return <OptionBPage />;
  if (path === "/admin") return <AdminPage />;
  return (
    <div className="bg-space-black text-lunar-white min-h-screen">
      <IntroOverlay />
      <div id="site-content">
        <SpaceAtmosphere />
        <IncrementalExperience />
        <SpaceCursor />
        <Header />
        <main>
          <SectionGuard name="início"><Hero /></SectionGuard>
          <SectionGuard name="redes"><SocialPresence /></SectionGuard>
          <SectionGuard name="sites"><SitesSistemas /></SectionGuard>
          <SectionGuard name="criatividade"><StrategyBand /></SectionGuard>
          <SectionGuard name="inteligência artificial"><AIStudio /></SectionGuard>
          <SectionGuard name="assistente"><AssistantDemo /></SectionGuard>
          <SectionGuard name="marcas"><ClientBrands /></SectionGuard>
          <SectionGuard name="portfólio"><PortfolioCatalog /></SectionGuard>
          <SectionGuard name="eventos"><EventosStands /></SectionGuard>
          <SectionGuard name="contato"><Contact /></SectionGuard>
        </main>
        <CinematicFinale id="moon-final-scene" contactHref="#contato" />
        <Footer />
      </div>
    </div>
  );
}
