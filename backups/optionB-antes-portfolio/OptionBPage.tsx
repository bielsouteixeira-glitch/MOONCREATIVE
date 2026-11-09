import { useEffect, useState } from "react";

const SERVICES = [
  { t: "Redes sociais", d: "Planejamento, posts, Stories e Reels, no ritmo do pacote contratado." },
  { t: "Sites e sistemas", d: "Sites institucionais, cardápios e pedidos, sem prometer integração que não foi combinada." },
  { t: "Design", d: "Peças, identidade e materiais. As artes dos clientes não são recoloridas." },
  { t: "Eventos", d: "Organização, fornecedores e cobertura, conforme o escopo aprovado." },
];

export default function OptionBPage() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.title = "Moon Creative — Opção B";
  }, []);
  return (
    <div className="min-h-screen text-white" style={{ background: "#05040A", fontFamily: "Inter, sans-serif" }}>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4" style={{ background: "rgba(5,4,10,.8)" }}>
        <a href="#/" className="font-display tracking-[0.2em] text-sm">MOON</a>
        <nav className="hidden md:flex gap-6 text-xs tracking-[0.16em] uppercase" style={{ color: "#B8B2C7" }}>
          <a href="#servicos-b">Serviços</a>
          <a href="#portfolio-b">Portfólio</a>
          <a href="#contato-b">Contato</a>
          <a href="#/">Opção A</a>
        </nav>
        <button className="md:hidden text-sm" onClick={() => setMenu((v) => !v)} type="button">Menu</button>
      </header>
      {menu && (
        <div className="fixed inset-x-0 top-14 z-40 p-4 md:hidden" style={{ background: "#090611" }}>
          <a className="block py-2" href="#servicos-b" onClick={() => setMenu(false)}>Serviços</a>
          <a className="block py-2" href="#portfolio-b" onClick={() => setMenu(false)}>Portfólio</a>
          <a className="block py-2" href="#contato-b" onClick={() => setMenu(false)}>Contato</a>
          <a className="block py-2" href="#/">Opção A</a>
        </div>
      )}
      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-20 pt-28">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/images/hero-astronaut.jpg" src="/videos/astronauta-lua-saturno.mp4" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,4,10,.25), rgba(5,4,10,.82))" }} />
        <img src="/images/astronaut-premium.png" alt="Astronauta da Moon Creative" className="pointer-events-none absolute -right-6 bottom-0 hidden h-[78%] w-auto object-contain lg:block" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs tracking-[0.22em]" style={{ color: "#C7A0FF" }}>MOON CREATIVE · OPÇÃO B</p>
          <h1 className="font-display mt-3 text-4xl font-bold leading-tight md:text-6xl">Criatividade que sai da órbita do comum.</h1>
          <p className="mt-4 max-w-xl" style={{ color: "#E5D7FF" }}>Sites, redes, design e eventos. Esta é a segunda versão visual, com o mesmo vídeo original do astronauta no fundo.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contato-b" className="rounded-full px-5 py-3 text-sm font-semibold" style={{ background: "#782BFF" }}>Falar com a Moon</a>
            <a href="#portfolio-b" className="rounded-full border px-5 py-3 text-sm" style={{ borderColor: "#963DFF" }}>Ver trabalhos</a>
          </div>
        </div>
      </section>
      <section id="servicos-b" className="px-6 py-16" style={{ background: "#090611" }}>
        <h2 className="font-display text-3xl font-bold">O que a agência faz</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.t} className="rounded-2xl border p-5" style={{ borderColor: "rgba(199,160,255,.25)" }}>
              <h3 className="font-display text-xl">{s.t}</h3>
              <p className="mt-2 text-sm" style={{ color: "#B8B2C7" }}>{s.d}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="portfolio-b" className="px-6 py-16">
        <h2 className="font-display text-3xl font-bold">Trabalhos reais</h2>
        <p className="mt-3 max-w-2xl text-sm" style={{ color: "#B8B2C7" }}>Jah Burguer e La Barberia estão na Opção A, com os arquivos que puderam ser salvos. Krodec ainda não tem material.</p>
        <a href="#/marcas" className="mt-6 inline-block rounded-full px-5 py-3 text-sm" style={{ background: "#782BFF" }}>Abrir marcas na Opção A</a>
      </section>
      <section id="contato-b" className="px-6 py-16" style={{ background: "#090611" }}>
        <h2 className="font-display text-3xl font-bold">Contato</h2>
        <p className="mt-3 max-w-xl text-sm" style={{ color: "#B8B2C7" }}>WhatsApp, e-mail e Instagram oficiais ainda não foram informados. O formulário da Opção A continua sendo o canal disponível.</p>
        <a href="#/contato" className="mt-6 inline-block rounded-full border px-5 py-3 text-sm" style={{ borderColor: "#C7A0FF" }}>Ir para o formulário</a>
      </section>
      <footer className="px-6 py-8 text-xs" style={{ color: "#B8B2C7" }}>© {new Date().getFullYear()} Moon Creative. Opção B.</footer>
    </div>
  );
}
