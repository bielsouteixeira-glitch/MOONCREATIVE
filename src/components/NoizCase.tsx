import { NOIZ } from '../optionB/portfolioBData';
import { VideoB } from '../optionB/MediaB';
export function NoizCase() {
 return <div className="mc-noiz-case">
  <div className="mc-noiz-copy"><span className="text-xs font-display tracking-[0.2em] text-purple-bright">INTELIGÊNCIA ARTIFICIAL APLICADA · NOIZ</span><h3>Uma camiseta, novas possibilidades.</h3><p>Fotografia e vídeo fornecidos para o case NOIZ, com inteligência artificial aplicada. Os mesmos arquivos estão disponíveis na área NOIZ.</p></div>
  <div className="mc-noiz-visual">
   <figure className="mc-noiz-photo"><img src={NOIZ[0].src} alt="Camiseta NOIZ na loja, ambiente desenvolvido com inteligência artificial" loading="lazy"/><figcaption>PRODUTO DESENVOLVIDO COM IA · FOTOGRAFIA</figcaption></figure>
   <figure className="mc-noiz-film"><div className="mc-noiz-video"><VideoB work={NOIZ[1]} respectReducedMotion/></div><figcaption>VÍDEO DA CAMPANHA</figcaption></figure>
  </div>
 </div>;
}
