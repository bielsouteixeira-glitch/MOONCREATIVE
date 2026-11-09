import { useState } from "react";

type Media = { src: string; label: string; kind: "image" | "video" };

const thumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
const preview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

const PROJECTS = [
  {
    id: "jah",
    nome: "Jah Burguer",
    categoria: "Social media e direção de arte",
    texto: "Peças e vídeos reais enviados para o projeto. As cores da marca foram preservadas.",
    site: null as string | null,
    instagram: "https://www.instagram.com/jahburguer/",
    capa: "",
    itens: [
      { src: preview("1oIAWsWGkPcOi42bsl6BnRXFEwizBYGLX"), label: "Vídeo Jah Burguer", kind: "video" },
      { src: preview("1ca2pcwfuKWNYuYFisRXE3Q4h8-p27Xc1"), label: "Vídeo Jah Burguer 2", kind: "video" },
      { src: preview("1rkUwYMkQL_Idubhx9uBx6tmqdBvU-WaL"), label: "Vídeo Jah Burguer 3", kind: "video" },
      { src: preview("1gtt16PWIT4sp0QxLZmHlXMdAespMip2q"), label: "Vídeo Jah Burguer 4", kind: "video" },
    ] as Media[],
  },
  {
    id: "barberia",
    nome: "La Barberia",
    categoria: "Social media e direção de arte",
    texto: "Vídeos reais do Drive. A identidade azul e preta da barbearia não foi alterada.",
    site: null as string | null,
    instagram: "https://www.instagram.com/labarbeariabarber/",
    capa: "",
    itens: [
      { src: preview("1Sza3f6CDl1cVs84Eh2CT_rreUFmFoLGe"), label: "Vídeo La Barberia", kind: "video" },
      { src: preview("1lKBipj_Z08QC04BF9LtoZtz-V6kxMqC5"), label: "Vídeo 2", kind: "video" },
      { src: preview("1LW0pLvLmBMZi1LCB7Z66l61cq2he_lcY"), label: "Vídeo 3", kind: "video" },
      { src: preview("1c-qTU0EapdOKcop5UoT5beet0LYAACk1"), label: "Vídeo 4", kind: "video" },
      { src: preview("1sxEgyiN3POnpvhj6Z-vh2ZA9QrlECOkk"), label: "Vídeo 5", kind: "video" },
    ] as Media[],
  },
  {
    id: "krodec",
    nome: "Krodec",
    categoria: "Site, campanhas e vídeos",
    texto: "Site desenvolvido pela Moon Creative, com logo, campanhas e vídeos do material enviado.",
    site: "https://www.krodec.com.br/",
    instagram: null as string | null,
    capa: "https://www.krodec.com.br/wp-content/uploads/2026/03/foto-slider.jpg",
    itens: [
      { src: "https://www.krodec.com.br/wp-content/uploads/2026/03/foto-slider.jpg", label: "Página do site", kind: "image" },
      { src: "https://www.krodec.com.br/wp-content/uploads/2025/09/logo-3d.png", label: "Logo do site", kind: "image" },
      { src: thumb("1dYM6Vv8tjZ3ssAAn2GXXR3Z_bmxy4oee"), label: "Logo enviada", kind: "image" },
      { src: thumb("14bkiCMy6s-asmSAgTjP1Wh-D5i5VEUXJ"), label: "Campanha de produtos", kind: "image" },
      { src: thumb("1R4tkHj6v1bCepE5A11FZuI1NOec3Lfxv"), label: "Multi Inseticida", kind: "image" },
      { src: thumb("1toktlYPudon-YSP_gpYficpEdaW63P4E"), label: "Roedores", kind: "image" },
      { src: thumb("1KKCvOveN57jahCov_Xnp_ftTUmOBHfsb"), label: "Kromax", kind: "image" },
      { src: thumb("1lOp-j_fvXjSN_nA_xtY0ZSH6DsvjSvV2"), label: "Folder", kind: "image" },
      { src: thumb("18sq4c52OQLgTGWUAch2BkYMzr4aZYYq4"), label: "Banner", kind: "image" },
      { src: thumb("1ZzCs2Vq0B4hmBUZWRmPOt-QkZc_ghLpy"), label: "Ratoeiras", kind: "image" },
      { src: preview("1E_VTYFMUb9cYBqEVXUVTZ4UvMtKoOzLm"), label: "Vídeo de produtos", kind: "video" },
      { src: preview("1Macw5WU71t8m1-omI4CLw_qdD39aPVJU"), label: "Ácaros", kind: "video" },
      { src: preview("1mW2bAQoZs31RSEyzo3TTujTX9V7zIyjx"), label: "Pulgas", kind: "video" },
    ] as Media[],
  },
  {
    id: "assinaturas",
    nome: "Assinaturas de e-mail",
    categoria: "Materiais corporativos",
    texto: "Cinco assinaturas importadas do Drive. O cliente de cada peça não foi inventado além do arquivo.",
    site: null as string | null,
    instagram: null as string | null,
    capa: thumb("1pfsSRPG-S-Hu7auDUSHYtjPJOLX0XV7q"),
    itens: [
      ["8", "1pfsSRPG-S-Hu7auDUSHYtjPJOLX0XV7q"],
      ["7", "1uogy3iwbFYiFep4qxb584KybQ7AFjdWG"],
      ["6", "13QGoD82J4Ijycnu_rfGVFci-mk5hxBWx"],
      ["5", "1fWrhuZMAydZapiieCFyoYrdGnKlbZHgp"],
      ["4", "1PXnPASNHO78u3cWkWqE1SH9JGDVgERPB"],
    ].map(([n, id]) => ({ src: thumb(id), label: `Assinatura ${n}`, kind: "image" as const })),
  },
  {
    id: "cst",
    nome: "CST Global",
    categoria: "Posts",
    texto: "Posts 14 a 17 importados do Drive.",
    site: null as string | null,
    instagram: null as string | null,
    capa: thumb("1iSuQfM0kXfOQykcT6s7FB9As8BwEQPkQ"),
    itens: [
      ["17", "1iSuQfM0kXfOQykcT6s7FB9As8BwEQPkQ"],
      ["16", "1hm2FsWfSASSket7m2GfraGikijAD1oz_"],
      ["15", "1mrzsgwWfDZQ4XwNz1rOaKXFxq-TP7STZ"],
      ["14", "1-oqgtGlzsFPKNf8Eh6dUh3C2F0kBu5PZ"],
    ].map(([n, id]) => ({ src: thumb(id), label: `Post ${n}`, kind: "image" as const })),
  },
  {
    id: "noiz",
    nome: "NOIZ",
    categoria: "Campanha de cliente com IA",
    texto: "Campanha visual de streetwear para cliente. Não é marca da Moon Creative.",
    site: null as string | null,
    instagram: null as string | null,
    capa: thumb("1wcnnk71Tx0jVzl93ApHmUD8vG3w-YARI"),
    itens: [
      { src: thumb("1JYDuM_UD2eieVye31wrn-W8Ur3gFqMXa"), label: "Logo", kind: "image" as const },
      { src: thumb("1wcnnk71Tx0jVzl93ApHmUD8vG3w-YARI"), label: "Camiseta 1", kind: "image" as const },
      { src: thumb("1WznwBjXtCVG0E3DgnxA90beOGfRc84jX"), label: "Camiseta 2", kind: "image" as const },
      { src: preview("1kpxdLJwrzd93a-J4c9g3G1oR9U_fc7dW"), label: "Vídeo da campanha", kind: "video" as const },
    ],
  },
  {
    id: "suprimed",
    nome: "Suprimed",
    categoria: "Campanhas",
    texto: "Capas reais enviadas no Drive.",
    site: null as string | null,
    instagram: null as string | null,
    capa: thumb("1ADl070mYUEOd0iuRRzBqz0EZ0Ez_EutS"),
    itens: [
      { src: thumb("1ADl070mYUEOd0iuRRzBqz0EZ0Ez_EutS"), label: "Setembro Amarelo", kind: "image" as const },
      { src: thumb("1yiugYbI92ooB_V74-QIKyV8kWYCxUIVW"), label: "Setembro Vermelho", kind: "image" as const },
      { src: thumb("1cAVrrpyRZb-y4trjCxPTVphnJBAtHJ6m"), label: "Zoonoses", kind: "image" as const },
      { src: thumb("1S93lN_dWRScKKxcYEnWILbGcjx5lU03u"), label: "Post", kind: "image" as const },
    ],
  },
  {
    id: "simparic",
    nome: "Simparic e Revolution",
    categoria: "Campanhas e PDV",
    texto: "Artes originais. As cores das peças não foram alteradas.",
    site: null as string | null,
    instagram: null as string | null,
    capa: thumb("1ynA5iStd21b5xQMn8HvcHpnR-HLFJogP"),
    itens: [
      { src: thumb("1ynA5iStd21b5xQMn8HvcHpnR-HLFJogP"), label: "Simparic PDV", kind: "image" as const },
      { src: thumb("1ipYeWNXyuqCgvOfu4q4W7q7_M0r2QwIu"), label: "Simparic modelo 2", kind: "image" as const },
      { src: thumb("1RQCiegLthQPgRZqUUHANPnUh4CMHgjnY"), label: "Revolution A4", kind: "image" as const },
      { src: thumb("18n7W_fWz90GFtPHASctpIrosQGAp-a2M"), label: "Inverno Biovet", kind: "image" as const },
    ],
  },
  {
    id: "antonio",
    nome: "Antonio Cucina Italiana",
    categoria: "Site",
    texto: "Site publicado. A demonstração no computador continua na seção de sites.",
    site: "https://antoniocucinaitaliana.netlify.app/",
    instagram: null as string | null,
    capa: "",
    itens: [] as Media[],
  },
];

export function ClientBrands() {
  const [open, setOpen] = useState<string>("jah");
  const [zoom, setZoom] = useState<string | null>(null);
  const current = PROJECTS.find((p) => p.id === open) || PROJECTS[0];
  return (
    <section id="marcas" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#08060D]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Marcas que confiam na Moon.</h2>
        <p className="mt-3 max-w-2xl text-sm text-lunar-gray">Vitrine com arquivos reais. Novos clientes entram nesta lista, sem reconstruir a seção.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {PROJECTS.map((p) => (
            <button key={p.id} type="button" className={`filter-chip ${open === p.id ? "active" : ""}`} onClick={() => setOpen(p.id)}>{p.nome}</button>
          ))}
        </div>
        <article className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6">
          <p className="text-[10px] font-display tracking-[0.18em] text-purple-bright">{current.categoria.toUpperCase()}</p>
          <h3 className="font-display mt-1 text-2xl">{current.nome}</h3>
          <p className="mt-2 max-w-2xl text-sm text-lunar-gray">{current.texto}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {current.site && <a className="btn-primary !py-2 !px-4 !text-[0.68rem]" href={current.site} target="_blank" rel="noopener noreferrer">Visitar site</a>}
            {current.instagram && <a className="btn-secondary !py-2 !px-4 !text-[0.68rem]" href={current.instagram} target="_blank" rel="noopener noreferrer">Visitar Instagram</a>}
            {current.id === "antonio" && <a className="btn-secondary !py-2 !px-4 !text-[0.68rem]" href="#sites">Ver no computador</a>}
          </div>
          {current.capa && current.id === "krodec" && (
            <img src={current.capa} alt="Imagem real da página da Krodec" className="mt-5 max-h-72 w-full rounded-xl object-contain bg-white" />
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {current.itens.map((item) => (
              <figure key={item.src} className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0614]">
                {item.kind === "image" ? (
                  <button type="button" className="block w-full" onClick={() => setZoom(item.src)}>
                    <img src={item.src} alt={`${current.nome} — ${item.label}`} className="h-48 w-full object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </button>
                ) : (
                  <iframe title={item.label} src={item.src} className="h-64 w-full bg-black" loading="lazy" allow="autoplay" />
                )}
                <figcaption className="px-3 py-2 text-xs text-lunar-gray">{item.label}</figcaption>
              </figure>
            ))}
          </div>
          {current.id === "krodec" && <p className="mt-4 text-xs text-lunar-gray">Instagram da Krodec ainda não foi informado. O campo fica vazio de propósito.</p>}
        </article>
      </div>
      {zoom && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/90 p-4" onClick={() => setZoom(null)}>
          <img src={zoom} alt="" className="max-h-[90vh] max-w-[92vw] object-contain" />
        </div>
      )}
    </section>
  );
}
