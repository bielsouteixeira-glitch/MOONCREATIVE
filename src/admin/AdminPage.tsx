export default function AdminPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-white" style={{ background: "#05040A", fontFamily: "Inter, sans-serif" }}>
      <p className="text-xs tracking-[0.2em]" style={{ color: "#C7A0FF" }}>MOON CREATIVE</p>
      <h1 className="font-display mt-3 text-3xl font-bold">Painel administrativo</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: "#B8B2C7" }}>
        O painel não está aberto. Não há banco de dados configurado neste projeto e nenhuma senha foi criada.
        Sem isso, um login seria falso: salvaria só neste navegador ou exigiria uma senha escrita no código.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: "#E5D7FF" }}>
        Para ligar um painel de verdade, é preciso um projeto Supabase com autenticação e uma tabela de conteúdos.
        As chaves não devem ser colocadas no relatório. Quando a URL e a chave pública existirem, o login pode ser ligado aqui.
      </p>
      <a href="#/" className="mt-8 inline-block text-sm underline">Voltar ao site</a>
    </main>
  );
}
