/**
 * Capturas reais de sites já entregues pela Moon Creative.
 * Quando os arquivos forem enviados, adicionar aqui — sem misturar projetos.
 * Cada item agrupa as telas de um único site, na ordem de navegação.
 * A capa deve ser a melhor captura (cover).
 */
export type RealSiteShot = { src: string; label: string };
export type RealSite = {
  id: string;
  nome: string;
  segmento: string;
  cover: string;
  shots: RealSiteShot[];
};

export const REAL_SITES: RealSite[] = [];
