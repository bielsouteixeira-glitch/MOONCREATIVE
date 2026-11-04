import { useEffect, useState } from "react";
import { DEMO_PROJECTS, DemoSite, type DemoId } from "../demos/DemoSites";
import { REAL_SITES } from "../data/realSites";
import { driveThumbUrl } from "../data/portfolio";

/* ============================================================
   CURSOR FOGUETE — só desktop, não cobre foco de teclado
============================================================ */
export function RocketCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = document.getElementById("rocket-cursor");
    if (!el || !fine || reduce || window.innerWidth < 900) return;
    el.style.display = "block";
    document.documentElement.classList.add("rocket-cursor");
    let x = -80;
    let y = -80;
    let angle = 0;
    let raf = 0;
    let active = true;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      if (dx * dx + dy * dy > 16) angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      x = e.clientX;
      y = e.clientY;
      const hot = !!(e.target as HTMLElement | null)?.closest("a, button, input, textarea, select, [role='button']");
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!active) return;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg) scale(${hot ? 1.12 : 1})`;
      });
    };
    const onVis = () => { active = document.visibilityState === "visible"; };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("rocket-cursor");
    };
  }, []);

  return (
    <div id="rocket-cursor" aria-hidden="true" className="rocket-cursor" style={{ display: "none" }}>
      <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
        <path d="M11 1c3 5 5 9 5 14a5 5 0 11-10 0C6 10 8 6 11 1z" fill="#F7F3FC" />
        <path d="M11 8c1.2 2.4 2 4.4 2 7a2 2 0 11-4 0c0-2.6.8-4.6 2-7z" fill="#792BDB" />
        <path d="M6 16l-4 6 5-2zM16 16l4 6-5-2z" fill="#A855F7" />
        <path d="M9 20l2 7 2-7" fill="#F04DE8" />
      </svg>
      <span className="rocket-flame" />
    </div>
  );
}

/* ============================================================
   CENA DA LUA — vídeo real do acervo
============================================================ */
export function MoonScene() {
  const [failed, setFailed] = useState(false);
  return (
    <section className="relative h-[70vh] min-h-[420px] overflow-hidden" aria-label="Cena da Lua">
      {!failed ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-astronaut.jpg"
          aria-hidden="true"
          onError={() => setFailed(true)}
        >
          <source src="/videos/lua.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/images/hero-astronaut.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(90deg, rgba(8,6,13,.88) 0%, rgba(8,6,13,.35) 45%, rgba(8,6,13,.2) 100%), linear-gradient(180deg, #08060D, transparent 18%, transparent 78%, #08060D)",
      }} />
      <div className="meteor" style={{ top: "22%", animationDelay: "1s" }} />
      <div className="meteor" style={{ top: "58%", animationDelay: "7s", animationDuration: "9s" }} />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-lg reveal">
          <span className="text-xs font-display tracking-[0.3em] text-magenta-neon">A LUA EM MOVIMENTO</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 mb-4 leading-tight">
            Um símbolo. <span className="text-gradient">Uma órbita própria.</span>
          </h2>
          <p className="text-lunar-gray">
            Cena real do acervo da Moon Creative: a Lua em movimento, sem áudio, em loop.
            O vídeo é o arquivo original, não uma imagem estática.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CAPA COM CARROSSEL AUTOMÁTICO
============================================================ */
export function CyclingCover({
  ids,
  alt,
  onReady,
}: {
  ids: string[];
  alt: string;
  onReady: () => void;
}) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause || ids.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % ids.length), 3000);
    return () => window.clearInterval(t);
  }, [pause, ids.length]);
  return (
    <div className="absolute inset-0" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <img
        key={ids[i]}
        src={driveThumbUrl(ids[i], 1000)}
        alt={alt}
        loading="lazy"
        onLoad={onReady}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; onReady(); }}
        className="cover-fade"
        style={{ width: "100%", height: "100%", objectFit: "contain", background: "#0a0614" }}
      />
      {ids.length > 1 && (
        <div className="absolute top-3 left-3 z-20 flex gap-1">
          {ids.slice(0, 6).map((_, n) => (
            <span key={n} style={{
              width: n === i % Math.min(ids.length, 6) ? 14 : 5,
              height: 4,
              borderRadius: 99,
              background: n === i % Math.min(ids.length, 6) ? "#F04DE8" : "rgba(247,243,252,.45)",
              transition: "width .3s",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SITES DEMONSTRATIVOS
============================================================ */
export function SitesShowcase() {
  const [open, setOpen] = useState<DemoId | null>(null);
  return (
    <section id="sites-demo" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-[#100818] to-space-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-10 reveal">
          <span className="text-xs font-display tracking-[0.3em] text-magenta-neon">MOON CREATIVE / PORTFÓLIO</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 leading-tight">
            Sites que vão além da tela.
          </h2>
          <p className="text-lunar-gray max-w-2xl mt-3">
            Experimente projetos digitais desenvolvidos como demonstração da capacidade da equipe.
            Cada um tem identidade, páginas e funções próprias. Não são clientes reais.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {DEMO_PROJECTS.map((p) => (
            <article key={p.id} className="reveal">
              <button
                onClick={() => setOpen(p.id)}
                className="w-full text-left group"
                aria-label={`Experimentar o site ${p.nome}`}
              >
                <div className="device-frame">
                  <div className="device-bar"><span /><span /><span /></div>
                  <img src={p.cover} alt={`Prévia de ${p.nome}`} className="w-full h-56 md:h-72 object-cover group-hover:scale-[1.03] transition duration-700" />
                </div>
              </button>
              <h3 className="font-display text-2xl mt-4">{p.nome}</h3>
              <p className="text-sm text-lunar-gray">{p.segmento}. {p.resumo}</p>
              <button onClick={() => setOpen(p.id)} className="mt-2 text-sm font-display tracking-wide" style={{ color: "#7DFFB3" }}>
                Demonstração interativa
              </button>
            </article>
          ))}
        </div>
        {REAL_SITES.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl mb-6">Sites entregues</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {REAL_SITES.map((s) => (
                <article key={s.id}>
                  <div className="device-frame">
                    <div className="device-bar"><span /><span /><span /></div>
                    <img src={s.cover} alt={s.nome} className="w-full h-56 object-cover" />
                  </div>
                  <h4 className="font-display text-xl mt-3">{s.nome}</h4>
                  <p className="text-sm text-lunar-gray">{s.segmento} · {s.shots.length} telas</p>
                </article>
              ))}
            </div>
          </div>
        )}
        <p className="text-center text-xs text-lunar-gray/70 mt-10">
          Referências visuais de direção — não são capturas de sites finais de clientes.
          A estrutura também está pronta para receber, depois, capturas reais enviadas pela agência.
        </p>
      </div>
      {open && <DemoViewer id={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function DemoViewer({ id, onClose }: { id: DemoId; onClose: () => void }) {
  const meta = DEMO_PROJECTS.find((p) => p.id === id)!;
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [full, setFull] = useState(true);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[240] flex flex-col" style={{ background: "rgba(5,3,8,.96)" }} role="dialog" aria-modal="true" aria-label={`Demonstração ${meta.nome}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
        <div>
          <p className="text-[10px] font-display tracking-[0.22em] text-magenta-neon">DEMONSTRAÇÃO · NÃO É CLIENTE REAL</p>
          <p className="font-display text-lunar-white">{meta.nome} · {meta.segmento}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`filter-chip ${device === "desktop" ? "active" : ""}`} onClick={() => { setDevice("desktop"); setFull(true); }}>Desktop</button>
          <button className={`filter-chip ${device === "mobile" ? "active" : ""}`} onClick={() => { setDevice("mobile"); setFull(false); }}>Celular</button>
          <button className="filter-chip" onClick={() => setFull((f) => !f)}>{full ? "Moldura" : "Tela ampla"}</button>
          <button className="btn-secondary !py-2 !px-4 !text-[0.68rem]" onClick={onClose}>Voltar ao portfólio</button>
        </div>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-3 md:p-6">
        <div
          className="bg-white overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.45)]"
          style={{
            width: device === "mobile" ? 390 : "100%",
            height: device === "mobile" ? "min(820px, 100%)" : "100%",
            maxWidth: full || device === "desktop" ? "100%" : 1100,
            borderRadius: device === "mobile" ? 28 : 12,
            border: device === "mobile" ? "10px solid #1a1a1a" : "1px solid rgba(255,255,255,.12)",
          }}
        >
          <div className="h-full overflow-auto demo-scroll" style={{ background: "#fff" }}>
            <DemoSite id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
