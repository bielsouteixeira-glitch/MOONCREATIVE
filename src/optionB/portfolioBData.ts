import authorizedAssets from './authorizedAssets.json';
/** Explicit allowlist. A Drive search result or client folder is not authorization. */
export const CLIENT_ORDER = ['Jah Burguer', 'La Barberia', 'Krodec', 'Suprimed', 'Opus Medical', 'Priore', 'CST Global', 'NOIZ'] as const;
export const CATEGORIES = [
 ...CLIENT_ORDER.map(name => [`client:${name}`, name] as const),
 ['campanhas-promocionais', 'Campanhas Promocionais'], ['eventos', 'Eventos'],
 ['materiais-graficos', 'Materiais Gráficos'], ['ia-aplicada', 'Inteligência Artificial Aplicada'],
 ['outros-clientes', 'Outros projetos'],
] as const;
export type Category = typeof CATEGORIES[number][0] | 'assinaturas-email' | 'email-marketing' | 'convites' | 'posts-redes-sociais' | 'videos-clientes' | 'videos-eventos' | 'stands-eventos' | 'referencia-cliente';
export type Work = { id: string; title: string; client: string; category: Category; type: 'image' | 'video'; src?: string; documentUrl?: string; driveId?: string; kind?: string; event?: boolean; poster?: string };

// The full NOIZ image matches the product in the campaign film, including its shop setting.
export const NOIZ: Work[] = [
 { id:'noiz-photo', title:'NOIZ · Produto desenvolvido com IA', client:'NOIZ', category:'ia-aplicada', type:'image', driveId:'1wcnnk71Tx0jVzl93ApHmUD8vG3w-YARI', src:'/images/noiz/noiz-ia-photo.jpg', kind:'Produto desenvolvido com IA' },
 { id:'noiz-film', title:'NOIZ · Vídeo da campanha', client:'NOIZ', category:'ia-aplicada', type:'video', driveId:'1kpxdLJwrzd93a-J4c9g3G1oR9U_fc7dW', src:'/videos/noiz-ia.mp4', poster:'/images/video-posters/noiz-ia.jpg', kind:'Produto desenvolvido com IA' },
];
// The request explicitly asks to retain the existing Jah video carousel.
const jahIds = ['1oIAWsWGkPcOi42bsl6BnRXFEwizBYGLX','1ca2pcwfuKWNYuYFisRXE3Q4h8-p27Xc1','1rkUwYMkQL_Idubhx9uBx6tmqdBvU-WaL','1gtt16PWIT4sp0QxLZmHlXMdAespMip2q'];
const makeReel = (client:string, slug:string, driveId:string, title:string):Work => ({id:slug, title, client, category:'videos-clientes', type:'video', driveId, src:`/videos/${slug}.mp4`, poster:`/images/video-posters/${slug}.jpg`});
export const CLIENT_REELS: Record<string, Work[]> = {
 'Jah Burguer': jahIds.map((id,i)=>makeReel('Jah Burguer',`jah-burguer-${i+1}`,id,`Jah Burguer · Vídeo ${i+1}`)),
 'La Barberia': [
  makeReel('La Barberia','la-barberia-1','1Sza3f6CDl1cVs84Eh2CT_rreUFmFoLGe','Video la barbearia.mp4'),
  makeReel('La Barberia','la-barberia-2','1lKBipj_Z08QC04BF9LtoZtz-V6kxMqC5','Video la barbearia2.mp4'),
  makeReel('La Barberia','la-barberia-3','1LW0pLvLmBMZi1LCB7Z66l61cq2he_lcY','Video la barbearia3.mp4'),
  makeReel('La Barberia','la-barberia-4','1c-qTU0EapdOKcop5UoT5beet0LYAACk1','Video la barbearia4.mp4'),
  makeReel('La Barberia','la-barberia-5','1sxEgyiN3POnpvhj6Z-vh2ZA9QrlECOkk','Video la barbearia5.mp4'),
 ],
 'Krodec': [
  makeReel('Krodec','krodec-produtos','1E_VTYFMUb9cYBqEVXUVTZ4UvMtKoOzLm','Video produtos krodec.mp4'),
  makeReel('Krodec','krodec-acaros','1Macw5WU71t8m1-omI4CLw_qdD39aPVJU','Video - Krodec - Ácaros.mp4'),
  makeReel('Krodec','krodec-pulgas-2','1mW2bAQoZs31RSEyzo3TTujTX9V7zIyjx','Video - Krodec - Pulgas.mp4'),
 ],
 'Suprimed': [makeReel('Suprimed','suprimed-cliente','1c6H7JUxnbBWHx0gM8YvpYAKs8GjZhPKn','suprimed_vet_1776352183_3876645220925881465_7857455361.mp4')],
};
const eventReels:Work[] = [
 ['suprimed-evento-1','1P6CnJs69jSfmRaSXoL6724adm_u9C5aE','VIDEO EVENTO SUPRIMED.mp4'],
 ['suprimed-evento-2','1qOVD_MBz-AF9dtoP4gpdWrw-aFZuy1g6','VIDEO EVENTO SUPRIMED2.mp4'],
 ['suprimed-evento-3','1cQ5MvE3fWkLyMHEKILyPVEbJ6lxQHyQf','VIDEO EVENTO SUPRIMEDD.mp4'],
 ['suprimed-evento-4','1yShUKGngqOW0wnvErHndXbPslxCvu6mJ','VIDEO EVENTO SUPRIMEDDDDD.mp4'],
].map(([slug,driveId,title])=>({ ...makeReel('Suprimed',slug,driveId,title), category:'eventos', event:true, kind:'Vídeo de evento' }));
const authorizedWorks:Work[] = authorizedAssets.map(asset=>({
 id:asset.id, driveId:asset.id, title:asset.name, client:asset.client, type:'image', src:asset.src, kind:asset.kind,
 category:asset.kind==='Posts'?'posts-redes-sociais':asset.kind==='Logo · referência'?'referencia-cliente':'materiais-graficos',
}));
const campaignWorks:Work[] = [
 ['1RQCiegLthQPgRZqUUHANPnUh4CMHgjnY','Arte Recolution A4.jpg','Revolution'],
 ['1kFpbcKml0WL1rj9F7RGa_peBqktcCGgF','Arte Revolution Modelo 1.jpg','Revolution'],
 ['1ynA5iStd21b5xQMn8HvcHpnR-HLFJogP','Arte Simparic Trio PDV.jpg','Simparic'],
 ['1ipYeWNXyuqCgvOfu4q4W7q7_M0r2QwIu','Arte Simparic Trio PDV modelo 2.jpg','Simparic'],
].map(([id,title,client])=>({id,driveId:id,title,client,type:'image',category:'campanhas-promocionais',kind:'Peça promocional',src:`/images/portfolio/${id}.webp`}));
const guide:Work = {id:'guia-kromax',driveId:'1r9pH51Okm5VIClkU7GfdDVUVdk3a0s4Z',title:'Guia de Proteção - Kromax - pdf - modelo 1.pdf',client:'Krodec',category:'materiais-graficos',type:'image',src:'/images/authorized/guia-kromax.webp',kind:'Catálogos e guias',documentUrl:'/documents/guia-kromax.pdf'};
const cst: Work[] = [
 { id:'cst-logo-reference', title:'CST Global · Logo da marca (referência)', client:'CST Global', category:'referencia-cliente', type:'image', driveId:'1fh8iQKty3s7ND6OT3kUQB9WrRlfGWLKH', src:'/images/portfolio/1fh8iQKty3s7ND6OT3kUQB9WrRlfGWLKH.webp', kind:'Logo da marca · referência' },
 { id:'cst-presentation', title:'CST Global · Apresentação institucional', client:'CST Global', category:'referencia-cliente', type:'image', driveId:'1LHfOWot-WwBlZrFGXJH4jIa5i6gA33xY', src:'/images/portfolio/cst-presentation.webp', kind:'Apresentação institucional · capa' },
];
export const WORKS: Work[] = [...NOIZ, ...Object.values(CLIENT_REELS).flat(), ...eventReels, ...campaignWorks, ...authorizedWorks, guide, ...cst];
export function matchesCategory(work: Work, category: Category | 'all') {
 if (category === 'all') return work.category !== 'referencia-cliente';
 if (category.startsWith('client:')) return work.client === category.slice(7);
 if (category === 'outros-clientes') return !CLIENT_ORDER.some(client => client === work.client) && !['eventos','campanhas-promocionais','materiais-graficos','referencia-cliente'].includes(work.category);
 return work.category === category;
}
export const mediaUrl = (work: Work) => work.src || '';
