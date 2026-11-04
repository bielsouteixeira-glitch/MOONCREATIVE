import { useMemo, useState } from "react";

/* Fotos reais de banco (Pexels) — uso demonstrativo, não são trabalhos de clientes. */
const IMG = {
  burger1: "https://images.pexels.com/photos/18713424/pexels-photo-18713424.jpeg?auto=compress&cs=tinysrgb&w=1400",
  burger2: "https://images.pexels.com/photos/28902882/pexels-photo-28902882.jpeg?auto=compress&cs=tinysrgb&w=1400",
  burger3: "https://images.pexels.com/photos/19247575/pexels-photo-19247575.jpeg?auto=compress&cs=tinysrgb&w=1400",
  burger4: "https://images.pexels.com/photos/6896381/pexels-photo-6896381.jpeg?auto=compress&cs=tinysrgb&w=1400",
  law: "https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&w=1400",
  clinic: "https://images.pexels.com/photos/11024139/pexels-photo-11024139.jpeg?auto=compress&cs=tinysrgb&w=1400",
  facial: "https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&w=1400",
  fish: "https://images.pexels.com/photos/27381531/pexels-photo-27381531.jpeg?auto=compress&cs=tinysrgb&w=1400",
  appetizer: "https://images.pexels.com/photos/23644633/pexels-photo-23644633.jpeg?auto=compress&cs=tinysrgb&w=1400",
  steak: "https://images.pexels.com/photos/5491046/pexels-photo-5491046.jpeg?auto=compress&cs=tinysrgb&w=1400",
  dogs: "https://images.pexels.com/photos/17186345/pexels-photo-17186345.jpeg?auto=compress&cs=tinysrgb&w=1400",
  dogHappy: "https://images.pexels.com/photos/4589698/pexels-photo-4589698.jpeg?auto=compress&cs=tinysrgb&w=1400",
  groom: "https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg?auto=compress&cs=tinysrgb&w=1400",
  sneaker: "https://images.pexels.com/photos/27008322/pexels-photo-27008322.jpeg?auto=compress&cs=tinysrgb&w=1200",
  shoe: "https://images.pexels.com/photos/19869753/pexels-photo-19869753.jpeg?auto=compress&cs=tinysrgb&w=1200",
  vase: "https://images.pexels.com/photos/15028227/pexels-photo-15028227.jpeg?auto=compress&cs=tinysrgb&w=1200",
  vase2: "https://images.pexels.com/photos/29904622/pexels-photo-29904622.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export type DemoId = "burger" | "advocacia" | "estetica" | "restaurante" | "pet" | "loja";

export type DemoMeta = {
  id: DemoId;
  nome: string;
  segmento: string;
  resumo: string;
  cover: string;
  accent: string;
};

export const DEMO_PROJECTS: DemoMeta[] = [
  { id: "burger", nome: "Brasa & Pão", segmento: "Delivery e pedidos", resumo: "Cardápio, adicionais e carrinho interativo.", cover: IMG.burger1, accent: "#E85D04" },
  { id: "advocacia", nome: "Vértice Advocacia", segmento: "Institucional", resumo: "Áreas de atuação, equipe e contato.", cover: IMG.law, accent: "#C4A574" },
  { id: "estetica", nome: "Clínica Lúmen", segmento: "Estética", resumo: "Procedimentos, galeria e agendamento.", cover: IMG.clinic, accent: "#C4A484" },
  { id: "restaurante", nome: "Casa Brasa", segmento: "Restaurante", resumo: "Cardápio, reservas e apresentação.", cover: IMG.steak, accent: "#C45C26" },
  { id: "pet", nome: "Aurora Pet Hotel", segmento: "Pet shop e hotel", resumo: "Hospedagem, banho, tosa e daycare.", cover: IMG.dogs, accent: "#3D7A5A" },
  { id: "loja", nome: "Ateliê Norte", segmento: "Loja virtual", resumo: "Vitrine, filtros, produto e checkout.", cover: IMG.vase2, accent: "#1D4ED8" },
];

function DemoNote() {
  return (
    <p style={{ fontSize: 11, opacity: 0.65, margin: "18px 0 0", lineHeight: 1.5 }}>
      Demonstração experimental da Moon Creative. Marcas, preços e depoimentos são fictícios e não representam clientes reais.
    </p>
  );
}

function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div role="status" style={{
      position: "sticky", bottom: 16, margin: "16px auto", maxWidth: 520,
      background: "#111", color: "#fff", borderRadius: 14, padding: "14px 16px",
      boxShadow: "0 16px 40px rgba(0,0,0,.35)", zIndex: 5,
    }}>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45 }}>{text}</p>
      <button onClick={onClose} style={{ marginTop: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.3)", borderRadius: 999, padding: "4px 12px", cursor: "pointer" }}>
        Fechar
      </button>
    </div>
  );
}

/* ===================== 1. BURGER ===================== */
type Extra = { id: string; nome: string; preco: number };
type ItemMenu = { id: string; nome: string; desc: string; preco: number; img: string; cat: string };
const EXTRAS: Extra[] = [
  { id: "bacon", nome: "Bacon crocante", preco: 6 },
  { id: "cheddar", nome: "Cheddar extra", preco: 5 },
  { id: "onion", nome: "Onion rings", preco: 8 },
];
const MENU: ItemMenu[] = [
  { id: "classico", nome: "Clássico da Casa", desc: "Blend 160g, queijo, picles e molho da casa.", preco: 32, img: IMG.burger1, cat: "Burgers" },
  { id: "bacon", nome: "Bacon Duplo", desc: "Dois blends, bacon e molho defumado.", preco: 42, img: IMG.burger4, cat: "Burgers" },
  { id: "verde", nome: "Jardim", desc: "Blend, alface, tomate e cebola roxa.", preco: 34, img: IMG.burger3, cat: "Burgers" },
  { id: "especial", nome: "Especial Brasa", desc: "Blend, queijo fundido e molho picante.", preco: 39, img: IMG.burger2, cat: "Burgers" },
  { id: "fritas", nome: "Batatas da casa", desc: "Porção crocante com sal defumado.", preco: 16, img: IMG.burger2, cat: "Acompanhamentos" },
  { id: "shake", nome: "Milk-shake de baunilha", desc: "Cremoso, 400 ml.", preco: 18, img: IMG.burger3, cat: "Bebidas" },
];

function BurgerDemo() {
  const [page, setPage] = useState<"inicio" | "cardapio" | "pedido" | "sobre">("inicio");
  const [cat, setCat] = useState("Todos");
  const [cart, setCart] = useState<Record<string, { item: ItemMenu; qtd: number; extras: string[] }>>({});
  const [selExtras, setSelExtras] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const cats = ["Todos", "Burgers", "Acompanhamentos", "Bebidas"];
  const list = MENU.filter((m) => cat === "Todos" || m.cat === cat);
  const total = Object.values(cart).reduce((s, c) => {
    const ex = c.extras.reduce((a, id) => a + (EXTRAS.find((e) => e.id === id)?.preco || 0), 0);
    return s + (c.item.preco + ex) * c.qtd;
  }, 0);
  const add = (item: ItemMenu) => {
    setCart((c) => {
      const prev = c[item.id];
      return { ...c, [item.id]: { item, qtd: (prev?.qtd || 0) + 1, extras: selExtras } };
    });
    setToast(`${item.nome} entrou no pedido.`);
  };
  const br = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const nav = (id: typeof page, label: string) => (
    <button key={id} onClick={() => setPage(id)} style={{
      background: "transparent", border: 0, cursor: "pointer",
      color: page === id ? "#E85D04" : "#F4EDE4", fontWeight: 700, letterSpacing: ".08em", fontSize: 12,
    }}>{label}</button>
  );
  return (
    <div style={{ background: "#14110E", color: "#F4EDE4", fontFamily: "Outfit, Inter, sans-serif", minHeight: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,.08)", position: "sticky", top: 0, background: "rgba(20,17,14,.92)", backdropFilter: "blur(8px)", zIndex: 4 }}>
        <strong style={{ letterSpacing: ".18em", fontSize: 13 }}>BRASA & PÃO</strong>
        <nav className="demo-nav" style={{ display: "flex", gap: 16 }}>
          {nav("inicio", "INÍCIO")}{nav("cardapio", "CARDÁPIO")}{nav("pedido", `PEDIDO (${Object.values(cart).reduce((s, c) => s + c.qtd, 0)})`)}{nav("sobre", "A CASA")}
        </nav>
      </header>
      {page === "inicio" && (
        <section>
          <div style={{ minHeight: 360, background: `linear-gradient(180deg, rgba(20,17,14,.2), rgba(20,17,14,.85)), url(${IMG.burger1}) center/cover`, display: "flex", alignItems: "flex-end", padding: 28 }}>
            <div>
              <p style={{ letterSpacing: ".22em", fontSize: 11, color: "#E85D04", margin: 0 }}>HAMBURGUERIA · DEMONSTRAÇÃO</p>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", margin: "8px 0", lineHeight: 1 }}>O burger que chega quente.</h2>
              <p style={{ maxWidth: 460, opacity: .85 }}>Monte o pedido, escolha adicionais e simule o envio. Valores ilustrativos.</p>
              <button onClick={() => setPage("cardapio")} style={{ background: "#E85D04", color: "#fff", border: 0, borderRadius: 999, padding: "12px 20px", fontWeight: 700, cursor: "pointer" }}>Ver cardápio</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, padding: 22 }}>
            {MENU.slice(0, 3).map((m) => (
              <article key={m.id} style={{ background: "#1C1814", borderRadius: 16, overflow: "hidden" }}>
                <img src={m.img} alt={m.nome} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                <div style={{ padding: 14 }}>
                  <strong>{m.nome}</strong>
                  <p style={{ fontSize: 13, opacity: .7 }}>{br(m.preco)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {page === "cardapio" && (
        <section style={{ padding: 22 }}>
          <h2 style={{ marginTop: 0 }}>Cardápio</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                borderRadius: 999, border: "1px solid #E85D04", cursor: "pointer",
                background: cat === c ? "#E85D04" : "transparent", color: "#fff", padding: "6px 12px",
              }}>{c}</button>
            ))}
          </div>
          <p style={{ fontSize: 13, opacity: .75 }}>Adicionais neste pedido:</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {EXTRAS.map((e) => {
              const on = selExtras.includes(e.id);
              return (
                <button key={e.id} onClick={() => setSelExtras((s) => on ? s.filter((x) => x !== e.id) : [...s, e.id])}
                  style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,.2)", background: on ? "#3a2416" : "transparent", color: "#fff", padding: "6px 12px", cursor: "pointer" }}>
                  {e.nome} +{br(e.preco)}
                </button>
              );
            })}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {list.map((m) => (
              <article key={m.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 12, alignItems: "center", background: "#1C1814", borderRadius: 14, padding: 10 }}>
                <img src={m.img} alt="" style={{ width: 120, height: 84, objectFit: "cover", borderRadius: 10 }} />
                <div>
                  <strong>{m.nome}</strong>
                  <p style={{ margin: "4px 0", fontSize: 13, opacity: .75 }}>{m.desc}</p>
                  <span>{br(m.preco)}</span>
                </div>
                <button onClick={() => add(m)} style={{ background: "#E85D04", color: "#fff", border: 0, borderRadius: 10, padding: "10px 12px", cursor: "pointer", fontWeight: 700 }}>Adicionar</button>
              </article>
            ))}
          </div>
        </section>
      )}
      {page === "pedido" && (
        <section style={{ padding: 22, maxWidth: 640 }}>
          <h2 style={{ marginTop: 0 }}>Seu pedido</h2>
          {Object.keys(cart).length === 0 && <p>O carrinho está vazio. Volte ao cardápio para montar o pedido.</p>}
          {Object.values(cart).map((c) => (
            <div key={c.item.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <div>
                <strong>{c.item.nome}</strong>
                <p style={{ margin: "4px 0", fontSize: 13, opacity: .7 }}>{c.extras.map((id) => EXTRAS.find((e) => e.id === id)?.nome).filter(Boolean).join(", ") || "Sem adicionais"}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => setCart((cart) => ({ ...cart, [c.item.id]: { ...c, qtd: Math.max(1, c.qtd - 1) } }))} style={qtyBtn}>−</button>
                  <span>{c.qtd}</span>
                  <button onClick={() => setCart((cart) => ({ ...cart, [c.item.id]: { ...c, qtd: c.qtd + 1 } }))} style={qtyBtn}>+</button>
                </div>
              </div>
              <span>{br((c.item.preco + c.extras.reduce((a, id) => a + (EXTRAS.find((e) => e.id === id)?.preco || 0), 0)) * c.qtd)}</span>
            </div>
          ))}
          <p style={{ fontSize: 18, fontWeight: 700 }}>Total ilustrativo: {br(total)}</p>
          <button disabled={!Object.keys(cart).length} onClick={() => setToast("Demonstração: o pedido não foi enviado. Quando o WhatsApp oficial do estabelecimento estiver configurado, esta ação abriria a conversa com o resumo do pedido. Nenhum número foi inventado.")}
            style={{ background: Object.keys(cart).length ? "#25D366" : "#333", color: "#fff", border: 0, borderRadius: 12, padding: "12px 16px", fontWeight: 700, cursor: "pointer" }}>
            Simular envio pelo WhatsApp
          </button>
          <DemoNote />
        </section>
      )}
      {page === "sobre" && (
        <section style={{ padding: 22, maxWidth: 680 }}>
          <h2>A casa</h2>
          <p>A Brasa & Pão é uma hamburgueria fictícia criada para demonstrar um fluxo de pedidos: categorias, adicionais, quantidades e resumo. Não é um estabelecimento real.</p>
          <DemoNote />
        </section>
      )}
      {toast && <Toast text={toast} onClose={() => setToast(null)} />}
      <footer style={{ padding: 22, opacity: .6, fontSize: 12 }}>Brasa & Pão · demonstração Moon Creative · valores ilustrativos</footer>
    </div>
  );
}
const qtyBtn: React.CSSProperties = { width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,.2)", background: "transparent", color: "#fff", cursor: "pointer" };

/* ===================== 2. ADVOCACIA ===================== */
function AdvocaciaDemo() {
  const [page, setPage] = useState<"inicio" | "areas" | "equipe" | "contato">("inicio");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const areas = [
    { t: "Direito civil", d: "Contratos, responsabilidade e conflitos do dia a dia." },
    { t: "Direito de família", d: "Acordos, guarda e planejamento familiar." },
    { t: "Direito empresarial", d: "Societário, contratos comerciais e governança." },
    { t: "Direito trabalhista", d: "Relações de trabalho para empresas e pessoas." },
  ];
  const team = [
    { n: "Helena Vértice", r: "Sócia · Civil e Família" },
    { n: "Marcos Almeida", r: "Sócio · Empresarial" },
    { n: "Lívia Costa", r: "Advogada · Trabalhista" },
  ];
  return (
    <div style={{ background: "#F6F1E8", color: "#1C2430", fontFamily: "Cormorant Garamond, Georgia, serif", minHeight: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", borderBottom: "1px solid #E4D8C8" }}>
        <div>
          <div style={{ letterSpacing: ".28em", fontSize: 12, fontFamily: "Outfit, sans-serif" }}>VÉRTICE</div>
          <div style={{ fontSize: 13, opacity: .7, fontFamily: "Outfit, sans-serif" }}>Advocacia</div>
        </div>
        <nav style={{ display: "flex", gap: 18, fontFamily: "Outfit, sans-serif", fontSize: 12, letterSpacing: ".08em" }}>
          {(["inicio", "areas", "equipe", "contato"] as const).map((p) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: 0, cursor: "pointer", color: page === p ? "#8A6A3B" : "#1C2430", fontWeight: 600 }}>
              {p === "inicio" ? "INÍCIO" : p === "areas" ? "ATUAÇÃO" : p === "equipe" ? "EQUIPE" : "CONTATO"}
            </button>
          ))}
        </nav>
      </header>
      {page === "inicio" && (
        <section>
          <div className="split" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24, padding: 28, alignItems: "center" }}>
            <div>
              <p style={{ letterSpacing: ".2em", fontSize: 12, fontFamily: "Outfit, sans-serif", color: "#8A6A3B" }}>ESCRITÓRIO FICTÍCIO</p>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1, margin: "8px 0", fontWeight: 500 }}>Clareza jurídica, sem promessas vazias.</h2>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>Um site institucional demonstrativo: apresentação, áreas, equipe e um formulário que confirma o envio apenas na tela.</p>
              <button onClick={() => setPage("contato")} style={{ background: "#1C2430", color: "#F6F1E8", border: 0, padding: "12px 18px", borderRadius: 4, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Falar com o escritório</button>
            </div>
            <img src={IMG.law} alt="Ambiente de estudo jurídico" style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 4 }} />
          </div>
        </section>
      )}
      {page === "areas" && (
        <section className="split" style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {areas.map((a) => (
            <article key={a.t} style={{ borderTop: "2px solid #C4A574", paddingTop: 12 }}>
              <h3 style={{ margin: "0 0 6px", fontWeight: 500 }}>{a.t}</h3>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, margin: 0 }}>{a.d}</p>
            </article>
          ))}
          <p style={{ gridColumn: "1 / -1", fontFamily: "Outfit, sans-serif", fontSize: 12, opacity: .7 }}>Não há registros, números de OAB ou resultados processuais — este conteúdo é ilustrativo.</p>
        </section>
      )}
      {page === "equipe" && (
        <section style={{ padding: 28, display: "grid", gap: 12 }}>
          {team.map((p) => (
            <article key={p.n} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E4D8C8", padding: "12px 0" }}>
              <strong style={{ fontWeight: 500, fontSize: 22 }}>{p.n}</strong>
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 13 }}>{p.r}</span>
            </article>
          ))}
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, opacity: .7 }}>Profissionais fictícios. Nenhuma credencial real é declarada.</p>
        </section>
      )}
      {page === "contato" && (
        <section style={{ padding: 28, maxWidth: 560 }}>
          <h2 style={{ fontWeight: 500 }}>Contato demonstrativo</h2>
          {sent ? <p>Mensagem registrada apenas nesta demonstração. Nenhum e-mail foi enviado.</p> : (
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              if (!String(fd.get("nome") || "").trim() || !String(fd.get("msg") || "").trim()) { setErr("Preencha nome e mensagem."); return; }
              setErr(""); setSent(true);
            }} style={{ display: "grid", gap: 10, fontFamily: "Outfit, sans-serif" }}>
              <input name="nome" placeholder="Nome" style={fieldLight} />
              <input name="email" placeholder="E-mail" style={fieldLight} />
              <textarea name="msg" placeholder="Como podemos ajudar?" rows={4} style={fieldLight} />
              {err && <p style={{ color: "#9B2C2C", margin: 0 }}>{err}</p>}
              <button style={{ background: "#1C2430", color: "#fff", border: 0, padding: "12px 16px", cursor: "pointer" }}>Enviar demonstração</button>
            </form>
          )}
          <DemoNote />
        </section>
      )}
    </div>
  );
}
const fieldLight: React.CSSProperties = { border: "1px solid #E4D8C8", padding: "10px 12px", borderRadius: 6, font: "inherit", background: "#fff" };

/* ===================== 3. ESTÉTICA ===================== */
function EsteticaDemo() {
  const [page, setPage] = useState<"inicio" | "procedimentos" | "galeria" | "agenda">("inicio");
  const [ok, setOk] = useState(false);
  const procs = [
    { t: "Limpeza de pele", d: "Protocolo suave para renovar a luminosidade." },
    { t: "Hidratação profunda", d: "Cuidado para pele ressecada ou sensibilizada." },
    { t: "Design de sobrancelhas", d: "Harmonização com o formato do rosto." },
  ];
  return (
    <div style={{ background: "#FBF7F4", color: "#3A2E2A", fontFamily: "Outfit, sans-serif", minHeight: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", alignItems: "center" }}>
        <strong style={{ letterSpacing: ".22em", fontWeight: 500 }}>LÚMEN</strong>
        <nav style={{ display: "flex", gap: 14, fontSize: 13 }}>
          {(["inicio", "procedimentos", "galeria", "agenda"] as const).map((p) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: 0, cursor: "pointer", color: page === p ? "#A67C62" : "#3A2E2A" }}>
              {p === "inicio" ? "Início" : p === "procedimentos" ? "Procedimentos" : p === "galeria" ? "Galeria" : "Agendar"}
            </button>
          ))}
        </nav>
      </header>
      {page === "inicio" && (
        <section className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 380 }}>
          <div style={{ padding: 32 }}>
            <p style={{ letterSpacing: ".18em", fontSize: 11, color: "#A67C62" }}>CLÍNICA DE ESTÉTICA · DEMO</p>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 400, fontSize: "clamp(34px,5vw,52px)", lineHeight: 1.05, margin: "8px 0" }}>Cuidado calmo, resultado visível.</h2>
            <p>Uma clínica fictícia para mostrar apresentação, procedimentos e um pedido de horário.</p>
            <button onClick={() => setPage("agenda")} style={{ background: "#3A2E2A", color: "#fff", border: 0, borderRadius: 999, padding: "12px 18px", cursor: "pointer" }}>Pedir horário</button>
          </div>
          <img src={IMG.clinic} alt="Sala de clínica estética" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 280 }} />
        </section>
      )}
      {page === "procedimentos" && (
        <section style={{ padding: 28, display: "grid", gap: 12 }}>
          {procs.map((p) => (
            <article key={p.t} style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 8px 24px rgba(58,46,42,.06)" }}>
              <h3 style={{ margin: "0 0 6px", fontFamily: "Fraunces, serif", fontWeight: 500 }}>{p.t}</h3>
              <p style={{ margin: 0 }}>{p.d}</p>
            </article>
          ))}
        </section>
      )}
      {page === "galeria" && (
        <section className="split" style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <img src={IMG.clinic} alt="Ambiente da clínica" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }} />
          <img src={IMG.facial} alt="Atendimento facial ilustrativo" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }} />
        </section>
      )}
      {page === "agenda" && (
        <section style={{ padding: 28, maxWidth: 520 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}>Agendamento</h2>
          <p style={{ fontSize: 13, background: "#F3E7DC", padding: 10, borderRadius: 10 }}>Depoimento ilustrativo, não é de uma cliente real: “Saí da sessão me sentindo cuidada.” — Ana, personagem fictícia.</p>
          {ok ? <p>Pedido de horário registrado só nesta tela. Nenhum contato real foi feito.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} style={{ display: "grid", gap: 8 }}>
              <input required placeholder="Seu nome" style={fieldLight} />
              <select style={fieldLight} defaultValue="Limpeza de pele">
                {procs.map((p) => <option key={p.t}>{p.t}</option>)}
              </select>
              <input type="date" required style={fieldLight} />
              <button style={{ background: "#A67C62", color: "#fff", border: 0, borderRadius: 999, padding: "12px 16px", cursor: "pointer" }}>Confirmar demonstração</button>
            </form>
          )}
          <DemoNote />
        </section>
      )}
    </div>
  );
}

/* ===================== 4. RESTAURANTE ===================== */
function RestauranteDemo() {
  const [page, setPage] = useState<"inicio" | "cardapio" | "casa" | "reserva">("inicio");
  const [cat, setCat] = useState("Entradas");
  const [ok, setOk] = useState(false);
  const pratos = useMemo(() => ([
    { cat: "Entradas", nome: "Tartar de beterraba", preco: "R$ 42", img: IMG.appetizer },
    { cat: "Entradas", nome: "Pão de fermentação", preco: "R$ 22", img: IMG.appetizer },
    { cat: "Principais", nome: "Peixe do dia", preco: "R$ 89", img: IMG.fish },
    { cat: "Principais", nome: "Corte grelhado", preco: "R$ 96", img: IMG.steak },
    { cat: "Sobremesas", nome: "Creme de baunilha", preco: "R$ 32", img: IMG.appetizer },
  ]), []);
  return (
    <div style={{ background: "#1A120E", color: "#F3E6D8", fontFamily: "Fraunces, serif", minHeight: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 22px", alignItems: "center" }}>
        <strong style={{ letterSpacing: ".2em", fontWeight: 500 }}>CASA BRASA</strong>
        <nav style={{ display: "flex", gap: 14, fontFamily: "Outfit, sans-serif", fontSize: 12 }}>
          {(["inicio", "cardapio", "casa", "reserva"] as const).map((p) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: 0, color: page === p ? "#E07A3D" : "#F3E6D8", cursor: "pointer" }}>
              {p === "inicio" ? "Início" : p === "cardapio" ? "Cardápio" : p === "casa" ? "A casa" : "Reservas"}
            </button>
          ))}
        </nav>
      </header>
      {page === "inicio" && (
        <section style={{ minHeight: 380, background: `linear-gradient(to top, #1A120E, transparent 50%), url(${IMG.steak}) center/cover`, display: "flex", alignItems: "flex-end", padding: 28 }}>
          <div>
            <p style={{ fontFamily: "Outfit, sans-serif", letterSpacing: ".18em", fontSize: 11, color: "#E07A3D" }}>FOGO BAIXO · MESA LONGA</p>
            <h2 style={{ fontSize: "clamp(36px,5vw,60px)", margin: "6px 0", fontWeight: 500, lineHeight: 1 }}>Cozinha de brasa, serviço calmo.</h2>
            <button onClick={() => setPage("reserva")} style={{ background: "#E07A3D", color: "#1A120E", border: 0, padding: "12px 18px", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Reservar mesa</button>
          </div>
        </section>
      )}
      {page === "cardapio" && (
        <section style={{ padding: 22 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {["Entradas", "Principais", "Sobremesas"].map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{ background: cat === c ? "#E07A3D" : "transparent", color: cat === c ? "#1A120E" : "#F3E6D8", border: "1px solid #E07A3D", borderRadius: 999, padding: "6px 12px", cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {pratos.filter((p) => p.cat === cat).map((p) => (
              <article key={p.nome} style={{ display: "grid", gridTemplateColumns: "140px 1fr auto", gap: 12, alignItems: "center" }}>
                <img src={p.img} alt="" style={{ width: 140, height: 90, objectFit: "cover", borderRadius: 10 }} />
                <strong style={{ fontWeight: 500 }}>{p.nome}</strong>
                <span style={{ fontFamily: "Outfit, sans-serif" }}>{p.preco}</span>
              </article>
            ))}
          </div>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, opacity: .7 }}>Preços ilustrativos. O restaurante não existe.</p>
        </section>
      )}
      {page === "casa" && (
        <section style={{ padding: 28, maxWidth: 640, fontFamily: "Outfit, sans-serif" }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}>A casa</h2>
          <p>Endereço demonstrativo: Rua das Brasas, 120 — bairro fictício. Horário ilustrativo: terça a sábado, 19h às 23h.</p>
          <img src={IMG.fish} alt="Prato do menu" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12 }} />
        </section>
      )}
      {page === "reserva" && (
        <section style={{ padding: 28, maxWidth: 480, fontFamily: "Outfit, sans-serif" }}>
          <h2 style={{ fontFamily: "Fraunces, serif" }}>Reserva</h2>
          {ok ? <p>Reserva anotada apenas nesta demonstração.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} style={{ display: "grid", gap: 8 }}>
              <input required placeholder="Nome" style={{ ...fieldLight, background: "#2A211C", color: "#fff", borderColor: "#3d322b" }} />
              <input required type="number" min={1} max={12} placeholder="Pessoas" style={{ ...fieldLight, background: "#2A211C", color: "#fff", borderColor: "#3d322b" }} />
              <input required type="date" style={{ ...fieldLight, background: "#2A211C", color: "#fff", borderColor: "#3d322b" }} />
              <button style={{ background: "#E07A3D", border: 0, padding: "12px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>Confirmar demonstração</button>
            </form>
          )}
          <DemoNote />
        </section>
      )}
    </div>
  );
}

/* ===================== 5. PET ===================== */
function PetDemo() {
  const [page, setPage] = useState<"inicio" | "servicos" | "galeria" | "contato">("inicio");
  const [servico, setServico] = useState("Hotel");
  const [ok, setOk] = useState(false);
  const servicos = [
    { t: "Hotel", d: "Hospedagem com rotina, passeio e atualização para a família." },
    { t: "Daycare", d: "O dia inteiro com socialização e descanso supervisionado." },
    { t: "Banho e tosa", d: "Higiene cuidadosa, no tempo do animal." },
    { t: "Adestramento", d: "Encontros curtos para rotina e convivência." },
  ];
  return (
    <div style={{ background: "#F4F7F2", color: "#1E3A2F", fontFamily: "Outfit, sans-serif", minHeight: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 22px", alignItems: "center" }}>
        <strong style={{ letterSpacing: ".12em" }}>AURORA PET</strong>
        <nav style={{ display: "flex", gap: 12 }}>
          {(["inicio", "servicos", "galeria", "contato"] as const).map((p) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: 0, cursor: "pointer", color: page === p ? "#3D7A5A" : "#1E3A2F", fontWeight: 600 }}>
              {p === "inicio" ? "Início" : p === "servicos" ? "Serviços" : p === "galeria" ? "Galeria" : "Fale conosco"}
            </button>
          ))}
        </nav>
      </header>
      {page === "inicio" && (
        <section className="split" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 16, padding: 22, alignItems: "center" }}>
          <div>
            <p style={{ letterSpacing: ".16em", fontSize: 12, color: "#3D7A5A" }}>HOTEL E CUIDADOS</p>
            <h2 style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.05, margin: "8px 0" }}>Um lugar calmo para quando você precisa sair.</h2>
            <p>Hotel, daycare, banho e adestramento — tudo fictício, feito para mostrar a estrutura de um site pet.</p>
            <button onClick={() => setPage("contato")} style={{ background: "#3D7A5A", color: "#fff", border: 0, borderRadius: 12, padding: "12px 16px", cursor: "pointer", fontWeight: 700 }}>Pedir informações</button>
          </div>
          <img src={IMG.dogs} alt="Cães em estúdio" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 20 }} />
        </section>
      )}
      {page === "servicos" && (
        <section style={{ padding: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {servicos.map((s) => (
            <button key={s.t} onClick={() => setServico(s.t)} style={{ textAlign: "left", background: servico === s.t ? "#E5F0E8" : "#fff", border: servico === s.t ? "2px solid #3D7A5A" : "1px solid #d7e3da", borderRadius: 16, padding: 16, cursor: "pointer", color: "#1E3A2F" }}>
              <strong>{s.t}</strong>
              <p style={{ margin: "6px 0 0", fontSize: 14 }}>{s.d}</p>
            </button>
          ))}
          <p style={{ gridColumn: "1 / -1" }}>Selecionado: <strong>{servico}</strong>. Use o formulário para simular um pedido sobre este serviço.</p>
        </section>
      )}
      {page === "galeria" && (
        <section className="split" style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <img src={IMG.dogHappy} alt="Retrato de cão" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }} />
          <img src={IMG.groom} alt="Tosa ilustrativa" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }} />
        </section>
      )}
      {page === "contato" && (
        <section style={{ padding: 22, maxWidth: 520 }}>
          <h2>Solicitar informações</h2>
          {ok ? <p>Recebemos sua simulação sobre {servico}. Nada foi enviado para um contato real.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} style={{ display: "grid", gap: 8 }}>
              <input required placeholder="Seu nome" style={fieldLight} />
              <input required placeholder="Nome do animal" style={fieldLight} />
              <select value={servico} onChange={(e) => setServico(e.target.value)} style={fieldLight}>
                {servicos.map((s) => <option key={s.t}>{s.t}</option>)}
              </select>
              <textarea required placeholder="Conte a rotina do animal" rows={3} style={fieldLight} />
              <button style={{ background: "#3D7A5A", color: "#fff", border: 0, borderRadius: 12, padding: "12px", cursor: "pointer", fontWeight: 700 }}>Enviar demonstração</button>
            </form>
          )}
          <DemoNote />
        </section>
      )}
    </div>
  );
}

/* ===================== 6. LOJA ===================== */
type Produto = { id: string; nome: string; preco: number; cat: string; img: string; desc: string };
const PRODUTOS: Produto[] = [
  { id: "vaso-curva", nome: "Vaso Curva", preco: 189, cat: "Cerâmica", img: IMG.vase, desc: "Peça de cerâmica com silhueta assimétrica. Demonstração." },
  { id: "vaso-sol", nome: "Vaso Sol", preco: 240, cat: "Cerâmica", img: IMG.vase2, desc: "Acabamento fosco, luz quente. Peça ilustrativa." },
  { id: "tenis-branco", nome: "Tênis Linha Norte", preco: 429, cat: "Calçados", img: IMG.sneaker, desc: "Modelo de vitrine, sem estoque real." },
  { id: "tenis-azul", nome: "Tênis Azul Ateliê", preco: 459, cat: "Calçados", img: IMG.shoe, desc: "Cor de coleção demonstrativa." },
];

function LojaDemo() {
  const [page, setPage] = useState<"vitrine" | "produto" | "carrinho" | "checkout">("vitrine");
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const [atual, setAtual] = useState<Produto | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ok, setOk] = useState(false);
  const filtrados = PRODUTOS.filter((p) => (cat === "Todos" || p.cat === cat) && p.nome.toLowerCase().includes(q.toLowerCase()));
  const br = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const total = Object.entries(cart).reduce((s, [id, qtd]) => s + (PRODUTOS.find((p) => p.id === id)?.preco || 0) * qtd, 0);
  const qtdCart = Object.values(cart).reduce((a, b) => a + b, 0);
  return (
    <div style={{ background: "#FAFAF8", color: "#111", fontFamily: "Outfit, sans-serif", minHeight: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 3 }}>
        <button onClick={() => setPage("vitrine")} style={{ background: "none", border: 0, fontWeight: 800, letterSpacing: ".16em", cursor: "pointer" }}>ATELIÊ NORTE</button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage("vitrine"); }} placeholder="Buscar" style={{ border: "1px solid #ddd", borderRadius: 999, padding: "8px 12px" }} />
          <button onClick={() => setPage("carrinho")} style={{ border: "1px solid #111", background: "#111", color: "#fff", borderRadius: 999, padding: "8px 12px", cursor: "pointer" }}>Sacola ({qtdCart})</button>
        </div>
      </header>
      {page === "vitrine" && (
        <section style={{ padding: 18 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {["Todos", "Cerâmica", "Calçados"].map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{ borderRadius: 999, border: "1px solid #111", background: cat === c ? "#111" : "#fff", color: cat === c ? "#fff" : "#111", padding: "6px 12px", cursor: "pointer" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
            {filtrados.map((p) => (
              <article key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
                <img src={p.img} alt={p.nome} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <strong>{p.nome}</strong>
                  <p style={{ margin: "4px 0" }}>{br(p.preco)}</p>
                  <button onClick={() => { setAtual(p); setPage("produto"); }} style={{ background: "none", border: "1px solid #111", borderRadius: 999, padding: "6px 10px", cursor: "pointer" }}>Ver produto</button>
                </div>
              </article>
            ))}
            {filtrados.length === 0 && <p>Nenhum produto com esse filtro.</p>}
          </div>
        </section>
      )}
      {page === "produto" && atual && (
        <section className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, padding: 18 }}>
          <img src={atual.img} alt={atual.nome} style={{ width: "100%", height: 360, objectFit: "cover", borderRadius: 12 }} />
          <div>
            <p style={{ letterSpacing: ".14em", fontSize: 12 }}>{atual.cat.toUpperCase()}</p>
            <h2 style={{ margin: "6px 0" }}>{atual.nome}</h2>
            <p>{atual.desc}</p>
            <p style={{ fontSize: 22, fontWeight: 700 }}>{br(atual.preco)}</p>
            <button onClick={() => { setCart((c) => ({ ...c, [atual.id]: (c[atual.id] || 0) + 1 })); setPage("carrinho"); }} style={{ background: "#1D4ED8", color: "#fff", border: 0, borderRadius: 10, padding: "12px 16px", cursor: "pointer", fontWeight: 700 }}>Adicionar à sacola</button>
          </div>
        </section>
      )}
      {page === "carrinho" && (
        <section style={{ padding: 18, maxWidth: 560 }}>
          <h2>Sacola</h2>
          {qtdCart === 0 && <p>Sua sacola está vazia.</p>}
          {Object.entries(cart).map(([id, qtd]) => {
            const p = PRODUTOS.find((x) => x.id === id)!;
            return (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                <span>{p.nome} × {qtd}</span>
                <span>{br(p.preco * qtd)}</span>
              </div>
            );
          })}
          <p style={{ fontWeight: 700 }}>Total ilustrativo: {br(total)}</p>
          <button disabled={!qtdCart} onClick={() => setPage("checkout")} style={{ background: "#111", color: "#fff", border: 0, borderRadius: 10, padding: "12px 16px", cursor: "pointer" }}>Ir para o checkout</button>
        </section>
      )}
      {page === "checkout" && (
        <section style={{ padding: 18, maxWidth: 480 }}>
          <h2>Checkout demonstrativo</h2>
          {ok ? <p>Pedido simulado concluído. Nenhum pagamento foi processado.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} style={{ display: "grid", gap: 8 }}>
              <input required placeholder="Nome completo" style={fieldLight} />
              <input required placeholder="E-mail" type="email" style={fieldLight} />
              <input required placeholder="CEP ilustrativo" style={fieldLight} />
              <p>Total: {br(total)} · pagamento não é real.</p>
              <button style={{ background: "#1D4ED8", color: "#fff", border: 0, borderRadius: 10, padding: "12px", cursor: "pointer", fontWeight: 700 }}>Finalizar simulação</button>
            </form>
          )}
          <DemoNote />
        </section>
      )}
    </div>
  );
}

export function DemoSite({ id }: { id: DemoId }) {
  if (id === "burger") return <BurgerDemo />;
  if (id === "advocacia") return <AdvocaciaDemo />;
  if (id === "estetica") return <EsteticaDemo />;
  if (id === "restaurante") return <RestauranteDemo />;
  if (id === "pet") return <PetDemo />;
  return <LojaDemo />;
}
