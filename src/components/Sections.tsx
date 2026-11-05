import { useState } from "react";
import { NoizCase } from "./NoizCase";
import { AIChatDemo, AIProspectingDemo } from "./AIDemonstrations";
import "./visualRefinement.css";
import { driveThumbUrl } from "../data/portfolio";

const ANTONIO = "https://antoniocucinaitaliana.netlify.app/";
const KRODEC = "https://www.krodec.com.br/";

const SOCIAL_STRIP = [
  "1S93lN_dWRScKKxcYEnWILbGcjx5lU03u",
  "1QkyUopBQYa03l9xo4E90y6anGkpf270C",
  "165dhPYUf1sM_bvmbMrca6rJkg4hFg6xU",
  "1z1AGE6iQ9jHx1P84sfGKyPawK0ILVh11",
  "1ADl070mYUEOd0iuRRzBqz0EZ0Ez_EutS",
  "1N6cZwGT1T8S9xERjgAui7iMgy7rHD4Wa",
  "1ytJCFfigl5pUj23s7sfGdbc5jnPdjRTV",
  "10WfbMqDswvF92BbdaeLAUtf5yKf8Wgau",
];

export function SocialPresence() {
  const loop = [...SOCIAL_STRIP, ...SOCIAL_STRIP];
  return (
    <section id="redes" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-[#0c0718] to-space-black" />
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center reveal mb-8">
          <span className="text-xs font-display tracking-[0.28em] text-magenta-neon">GESTÃO DE REDES</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mt-3 mb-4">
            Uma presença digital que mantém sua marca em movimento.
          </h2>
          <p className="text-lunar-gray">
            Planejamento, posts, carrosséis, Stories e Reels. A frequência depende do pacote. As artes abaixo são do acervo real.
          </p>
        </div>
        <div className="marquee" aria-label="Artes reais de redes sociais">
          <div className="marquee-track">
            {loop.map((id, n) => (
              <img key={`${id}-${n}`} src={driveThumbUrl(id, 700)} alt="" className="marquee-card" />
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="#contato" className="btn-primary">Quero organizar minhas redes</a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   IA — composição com o vídeo real da Lua
============================================================ */
const AI_BLOCKS = [
  {
    k: "01",
    t: "Automação inteligente",
    d: "Fluxos de atendimento, tarefas repetitivas e organização de processos. O desenho depende do que o negócio realmente precisa.",
  },
  {
    k: "02",
    t: "Atendimento no WhatsApp",
    d: "Respostas iniciais, perguntas frequentes e encaminhamento. A integração só entra no escopo quando for viável.",
  },
  {
    k: "03",
    t: "Pedidos inteligentes",
    d: "Cardápios, catálogos e uma compra mais simples para restaurantes e lojas.",
  },
  {
    k: "04",
    t: "Personagens e avatares",
    d: "Mascotes, apresentadores virtuais e personagens de campanha, com direção de arte da marca.",
  },
  {
    k: "05",
    t: "Foto de produto com IA",
    d: "Cenas, luz e composição para anúncio, catálogo e redes — sem substituir uma sessão quando ela for necessária.",
  },
  {
    k: "06",
    t: "Vídeo com IA",
    d: "Peças conceituais, produtos em cenário e movimentos que a câmera sozinha não faria.",
  },
  {
    k: "07",
    t: "Assistentes da operação",
    d: "Agentes para consultar informação e apoiar o time. Não é um robô genérico para qualquer empresa.",
  },
  {
    k: "08",
    t: "Conteúdo e campanha",
    d: "Ideias visuais, peças para redes e conceitos de campanha com apoio de IA.",
  },
  {
    k: "09",
    t: "Sob medida",
    d: "Quando o pedido não cabe numa lista. Avaliamos ferramenta, prazo e o que dá para integrar.",
  },
];

export function AIStudio() {
  const [open, setOpen] = useState(AI_BLOCKS[0].k);
  const current = AI_BLOCKS.find((b) => b.k === open) || AI_BLOCKS[0];
  return (
    <section id="ia" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 80% 40%, rgba(121,43,219,.28), transparent 55%), linear-gradient(180deg, #08060D, #0a0614 40%, #08060D)",
      }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 reveal">
            <span className="text-xs font-display tracking-[0.28em] text-magenta-neon">INTELIGÊNCIA ARTIFICIAL</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-[1.05] mt-4 mb-5">
              Inteligência artificial aplicada às suas ideias.
            </h2>
            <p className="text-lunar-gray leading-relaxed mb-6">
              Usamos IA para atendimento, pedidos, imagem e vídeo — sempre dentro do que dá para entregar de verdade.
              Nada aqui é uma promessa de integração pronta sem olhar o projeto.
            </p>
            <figure className="mc-ai-hero"><img src="/images/ai-business-assistant.webp" alt="Ilustração conceitual de uma assistente de inteligência artificial e conexões digitais" loading="lazy"/><figcaption>INTELIGÊNCIA ARTIFICIAL APLICADA · ILUSTRAÇÃO CONCEITUAL</figcaption></figure>
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="grid sm:grid-cols-2 gap-3">
              {AI_BLOCKS.map((b) => (
                <button
                  key={b.k}
                  onClick={() => setOpen(b.k)}
                  className="text-left rounded-2xl p-4 border transition"
                  style={{
                    borderColor: open === b.k ? "rgba(240,77,232,.7)" : "rgba(168,85,247,.2)",
                    background: open === b.k ? "rgba(23,10,41,.85)" : "rgba(8,6,13,.55)",
                  }}
                >
                  <span className="text-[10px] font-display tracking-[0.2em] text-purple-bright">{b.k}</span>
                  <h3 className="font-display text-lg mt-1">{b.t}</h3>
                  {open === b.k && <p className="text-sm text-lunar-gray mt-2 leading-relaxed">{current.d}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mc-ai-demos">
          <section className="mc-chat-module" aria-labelledby="mc-chat-title"><div className="mc-ai-chat-intro"><span className="mc-ai-kicker">ATENDIMENTO AUTOMATIZADO</span><h3 id="mc-chat-title">Tenha um robô respondendo seus clientes por você.</h3><p>Automatize conversas, agilize o atendimento e mantenha sua empresa disponível para novas oportunidades.</p><span className="mc-prospect-disclaimer">Simulação ilustrativa · Nenhuma conversa conectada</span></div><AIChatDemo /></section>
          <AIProspectingDemo />
        </div>
        <NoizCase />
      </div>
    </section>
  );
}

/* ============================================================
   ANTONIO CUCINA — site real em iframe
============================================================ */
export function AntonioFrame() {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  return (
    <div className="reveal">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] font-display tracking-[0.25em] text-magenta-neon">PROJETO REAL</p>
          <h3 className="font-display text-xl md:text-2xl">Antonio Cucina Italiana</h3>
          <p className="text-sm text-lunar-gray">O site publicado já aparece no mockup. Role dentro da tela.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary !py-2 !px-3 !text-[0.68rem]" onClick={() => setOpen(true)}>Tela ampla</button>
          <a className="btn-primary !py-2 !px-3 !text-[0.68rem]" href={ANTONIO} target="_blank" rel="noopener noreferrer">Nova aba</a>
        </div>
      </div>
      <div className="monitor">
        <div className="monitor-screen">
          <div className="relative bg-black" style={{ height: 320 }}>
            <iframe
              title="Antonio Cucina Italiana"
              src={ANTONIO}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="monitor-stand" />
        <div className="monitor-base" />
      </div>
      <p className="text-xs text-lunar-gray/70 mt-2">
        Se o navegador bloquear a incorporação, use “Abrir em nova aba”. A rolagem dentro do mockup só acontece quando o site de destino permite iframe.
      </p>
      {open && (
        <div className="fixed inset-0 z-[230] flex flex-col bg-[#050308]/96" role="dialog" aria-modal="true">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-white/10">
            <p className="font-display">Antonio Cucina Italiana</p>
            <div className="flex gap-2">
              <button className={`filter-chip ${device === "desktop" ? "active" : ""}`} onClick={() => setDevice("desktop")}>Desktop</button>
              <button className={`filter-chip ${device === "mobile" ? "active" : ""}`} onClick={() => setDevice("mobile")}>Celular</button>
              <a className="filter-chip" href={ANTONIO} target="_blank" rel="noopener noreferrer">Nova aba</a>
              <button className="btn-secondary !py-2 !px-4 !text-[0.68rem]" onClick={() => setOpen(false)}>Fechar</button>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex justify-center p-3">
            <iframe
              title="Antonio Cucina Italiana em tela ampla"
              src={ANTONIO}
              className="h-full border-0 bg-white rounded-xl"
              style={{ width: device === "mobile" ? 390 : "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteDemos() {
  const [which, setWhich] = useState<"antonio" | "krodec">("antonio");
  const [wide, setWide] = useState(false);
  const src = which === "antonio" ? ANTONIO : KRODEC;
  const nome = which === "antonio" ? "Antonio Cucina" : "Krodec";
  return (
    <div className="reveal">
      <div className="mb-3 flex flex-wrap gap-2">
        <button type="button" className={`filter-chip ${which === "antonio" ? "active" : ""}`} onClick={() => setWhich("antonio")}>Antonio Cucina</button>
        <button type="button" className={`filter-chip ${which === "krodec" ? "active" : ""}`} onClick={() => setWhich("krodec")}>Krodec</button>
      </div>
      <div className="monitor">
        <div className="monitor-screen">
          <div className="site-stage">
            <iframe key={src} title={nome} src={src} className="site-frame" />
          </div>
        </div>
        <div className="monitor-stand" />
        <div className="monitor-base" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary !py-2 !px-3 !text-[0.68rem]" onClick={() => setWide(true)}>Tela ampla</button>
        <a className="btn-primary !py-2 !px-3 !text-[0.68rem]" href={src} target="_blank" rel="noopener noreferrer">Abrir site</a>
      </div>
      <p className="mt-2 text-xs text-lunar-gray">A tela interna usa largura de computador, reduzida para caber no monitor. Se o site bloquear a incorporação, use Abrir site.</p>
      {wide && (
        <div className="fixed inset-0 z-[230] flex flex-col bg-[#050308]/96">
          <div className="flex justify-between px-4 py-3">
            <span className="text-sm">{nome}</span>
            <button type="button" className="btn-secondary !py-2 !px-4 !text-[0.68rem]" onClick={() => setWide(false)}>Fechar</button>
          </div>
          <iframe title={nome} src={src} className="min-h-0 w-full flex-1 border-0 bg-white" />
        </div>
      )}
    </div>
  );
}

export function KrodecFrame() {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] font-display tracking-[0.25em] text-magenta-neon">PROJETO REAL</p>
          <h3 className="font-display text-xl md:text-2xl">Krodec</h3>
          <p className="text-sm text-lunar-gray">Site oficial dentro do monitor. Se o site bloquear a incorporação, a imagem real da página permanece e o botão abre o endereço.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary !py-2 !px-3 !text-[0.68rem]" onClick={() => setOpen(true)} type="button">Tela ampla</button>
          <a className="btn-primary !py-2 !px-3 !text-[0.68rem]" href={KRODEC} target="_blank" rel="noopener noreferrer">Visitar site</a>
        </div>
      </div>
      <div className="monitor">
        <div className="monitor-screen">
          <div className="relative bg-white" style={{ height: 320 }}>
            <img src="/portfolio/krodec/site-home.jpg" alt="Página real da Krodec" className="absolute inset-0 h-full w-full object-cover object-top" />
            <iframe title="Krodec" src={KRODEC} className="absolute inset-0 h-full w-full border-0 bg-white" loading="lazy" />
          </div>
        </div>
        <div className="monitor-stand" />
        <div className="monitor-base" />
      </div>
      {open && (
        <div className="fixed inset-0 z-[230] flex flex-col bg-[#050308]/96">
          <div className="flex justify-between px-4 py-3">
            <a className="text-sm text-lunar-white" href={KRODEC} target="_blank" rel="noopener noreferrer">Abrir krodec.com.br</a>
            <button className="btn-secondary !py-2 !px-4 !text-[0.68rem]" type="button" onClick={() => setOpen(false)}>Fechar</button>
          </div>
          <iframe title="Krodec em tela ampla" src={KRODEC} className="min-h-0 flex-1 border-0 bg-white" />
        </div>
      )}
    </div>
  );
}

export function StrategyBand() {
  return (
    <section id="sobre" className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-space-black to-[#0c0718]" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div>
          <span className="text-xs font-display tracking-[0.28em] text-purple-bright">A AGÊNCIA</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mt-3">
            Criatividade com estratégia. Ideias com direção.
          </h2>
          <p className="text-lunar-gray mt-4 leading-relaxed">
            A direção muda conforme o negócio. O cuidado com a marca, não.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRODUÇÃO DE VÍDEO — sem fingir peças que não existem
============================================================ */
export function VideoOffer() {
  const modes = [
    { t: "Institucionais", d: "Apresentação da empresa, bastidores e vídeo de marca para site ou reunião. Filmagem e edição reais." },
    { t: "Reels de produto", d: "Peça curta, desejo e destaque do produto. Ritmo de rede, não de comercial de TV." },
    { t: "Reels e TikTok", d: "Captação no local, câmera em movimento, roteiro curto e edição vertical." },
    { t: "Vídeo com IA", d: "Cenário, transformação e peça conceitual. É outra modalidade — não substitui a filmagem." },
  ];
  return (
    <section id="videos" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#08060D]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10 reveal">
          <span className="text-xs font-display tracking-[0.28em] text-magenta-neon">AUDIOVISUAL</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mt-3">
            Produção audiovisual para marcas que querem se destacar.
          </h2>
          <p className="text-lunar-gray mt-4">
            Filmagem profissional e produção com IA são serviços diferentes. Os dois podem existir no mesmo projeto, mas não são a mesma entrega.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {modes.map((m, i) => (
            <article key={m.t} className="glass-card p-6 reveal" style={{ transitionDelay: `${i * 40}ms` }}>
              <p className="text-[10px] font-display tracking-[0.2em] text-purple-bright">0{i + 1}</p>
              <h3 className="font-display text-2xl mt-2">{m.t}</h3>
              <p className="text-sm text-lunar-gray mt-2 leading-relaxed">{m.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-amber-200/20 bg-amber-200/5 p-5 reveal">
          <p className="font-display text-lunar-white">Demonstrações conceituais ainda não foram geradas.</p>
          <p className="text-sm text-lunar-gray mt-2 leading-relaxed">
            Este ambiente não tem ferramenta de geração de vídeo. Por isso não há quatro arquivos novos
            (institucional, reels de produto, reels/TikTok e peça com IA). Também não coloquei imagem parada
            nem vídeo de banco no lugar deles. Quando os arquivos existirem, entram nesta seção com play de verdade.
          </p>
          <p className="text-sm text-lunar-gray mt-3">
            O que já reproduz de verdade: o banner do astronauta na Lua e o vídeo da Lua nesta página, ambos do acervo enviado.
          </p>
        </div>
      </div>
    </section>
  );
}

const NICHOS = ["Restaurante", "Barbearia", "Clínica", "Estética", "Loja", "Pet shop", "Confeitaria", "Imobiliária"];

function replyFor(nicho: string, nome: string, pergunta: string) {
  const q = pergunta.toLowerCase();
  const empresa = nome || "a empresa";
  const n = nicho.toLowerCase();
  if (q.includes("ideia") || q.includes("o que você faz") || q.includes("o que voce faz") || q.length < 12) {
    if (n.includes("barbearia")) return `Na ${empresa}, eu marco corte, barba ou combo, pergunto o profissional e confirmo dia e hora. Quer ver um exemplo de agendamento?`;
    if (n.includes("restaurante") || n.includes("hambur")) return `Na ${empresa}, eu mostro o cardápio de demonstração, pergunto adicionais e fecho um resumo do pedido. Quer montar um combo?`;
    if (n.includes("estética") || n.includes("estetica") || n.includes("clínica")) return `Na ${empresa}, eu explico os procedimentos cadastrados e anoto um pedido de avaliação. Não faço diagnóstico.`;
    if (n.includes("pet")) return `Na ${empresa}, eu separo banho, hospedagem ou daycare e pergunto porte e datas. Quer simular uma reserva?`;
    if (n.includes("doceria") || n.includes("confeitaria")) return `Na ${empresa}, eu anoto sabor, tamanho e data da encomenda. Quer um exemplo de bolo para festa?`;
    if (n.includes("imobili")) return `Na ${empresa}, eu pergunto se é compra ou aluguel, região e faixa de valor. Quer filtrar um exemplo?`;
    if (n.includes("advocacia") || n.includes("juríd")) return `Na ${empresa}, eu identifico a área e encaminho para a equipe. Não emito parecer.`;
  }
  if (q.includes("horário") || q.includes("horario") || q.includes("abre")) {
    return `Neste exemplo, ${empresa} atende de terça a sábado, das 9h às 19h. Posso anotar um período. Nada é gravado de verdade.`;
  }
  if (q.includes("preço") || q.includes("preco") || q.includes("valor")) {
    return `Os preços de ${empresa} neste teste são ilustrativos. Um corte simples, por exemplo, apareceria como R$ 45. A equipe confirma o valor real.`;
  }
  if (q.includes("agend") || q.includes("reserv") || q.includes("marcar")) {
    return `Simulação para ${empresa}: terça, 15h, serviço principal. Confirmo os dados e encaminho. Nenhum horário real foi reservado.`;
  }
  return `Para ${empresa} (${nicho}), eu posso organizar o primeiro contato, sugerir o próximo passo e passar para uma pessoa. Esta conversa é só demonstração, sem IA externa.`;
}

export function AssistantDemo() {
  const [step, setStep] = useState(0);
  const [nicho, setNicho] = useState("Restaurante");
  const [livre, setLivre] = useState("");
  const [nome, setNome] = useState("");
  const [tarefa, setTarefa] = useState("Atendimento");
  const [duvida, setDuvida] = useState("");
  const [chat, setChat] = useState<{ who: "bot" | "voce"; text: string }[]>([]);
  const [draft, setDraft] = useState("");
  const segmento = livre.trim() || nicho;

  return (
    <section id="assistente" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#08060D]" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="mb-6">
          <span className="text-xs font-display tracking-[0.28em] text-magenta-neon">DEMONSTRAÇÃO</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mt-3">Seu negócio merece um assistente inteligente.</h2>
          <p className="text-lunar-gray mt-3">Criamos assistentes para atender, responder dúvidas e organizar o primeiro contato. O teste abaixo é local, sem API.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          {step === 0 && (
            <div>
              <p className="font-display mb-3">Qual é o segmento da sua empresa?</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {NICHOS.map((n) => (
                  <button key={n} type="button" className={`filter-chip ${nicho === n && !livre ? "active" : ""}`} onClick={() => { setNicho(n); setLivre(""); }}>{n}</button>
                ))}
              </div>
              <input className="form-input mb-3" placeholder="Ou escreva outro segmento" value={livre} onChange={(e) => setLivre(e.target.value)} />
              <button type="button" className="btn-primary" onClick={() => setStep(1)}>Continuar</button>
            </div>
          )}
          {step === 1 && (
            <div>
              <p className="font-display mb-3">Qual é o nome da empresa?</p>
              <input className="form-input mb-3" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome para o teste" />
              <button type="button" className="btn-primary" onClick={() => nome.trim() && setStep(2)}>Continuar</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="font-display mb-3">O que o assistente deverá fazer?</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {["Atendimento", "Vendas", "Agendamentos", "Tudo isso"].map((t) => (
                  <button key={t} type="button" className={`filter-chip ${tarefa === t ? "active" : ""}`} onClick={() => setTarefa(t)}>{t}</button>
                ))}
              </div>
              <button type="button" className="btn-primary" onClick={() => setStep(3)}>Continuar</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="font-display mb-3">Qual dúvida os clientes mais fazem?</p>
              <input className="form-input mb-3" value={duvida} onChange={(e) => setDuvida(e.target.value)} placeholder="Ex.: horário, preço, como agendar" />
              <button type="button" className="btn-primary" onClick={() => {
                setChat([{ who: "bot", text: `Olá, eu sou o assistente de ${nome}. Posso ajudar com ${tarefa.toLowerCase()}. ${duvida ? `Vi que perguntam sobre: ${duvida}.` : ""}` }]);
                setStep(4);
              }}>Gerar demonstração</button>
            </div>
          )}
          {step === 4 && (
            <div>
              <p className="text-[10px] font-display tracking-[0.18em] text-purple-bright mb-2">SIMULAÇÃO · {nome.toUpperCase()} · {segmento.toUpperCase()}</p>
              <div className="space-y-2 min-h-32 mb-3">
                {chat.map((m, i) => (
                  <p key={i} className={`rounded-xl px-3 py-2 text-sm max-w-[90%] ${m.who === "bot" ? "bg-white/10" : "bg-magenta-neon/20 ml-auto"}`}>{m.text}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {["Quero agendar", "Qual o horário?", "Quanto custa?", "Me dá uma ideia"].map((s) => (
                  <button key={s} type="button" className="filter-chip" onClick={() => setChat((c) => [...c, { who: "voce", text: s }, { who: "bot", text: replyFor(segmento, nome, s) }])}>{s}</button>
                ))}
              </div>
              <form className="flex gap-2" onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                const text = draft.trim();
                setDraft("");
                setChat((c) => [...c, { who: "voce", text }, { who: "bot", text: replyFor(segmento, nome, text) }]);
              }}>
                <input className="form-input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Escreva uma pergunta" />
                <button className="btn-primary !px-4" type="submit">Enviar</button>
              </form>
              <div className="mt-5">
                <p className="font-display mb-2">Gostou de conhecer seu futuro assistente virtual?</p>
                <a href="#contato" className="btn-primary">QUERO CRIAR MEU ASSISTENTE</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
