import { BackgroundFilm } from './BackgroundFilm';
import './cinematicFinale.css';
export function CinematicFinale({ id = 'contato-b', contactHref = '#/contato' }: { id?: string; contactHref?: string }) {
 return <section id={id} className="b-contact moon-finale" aria-label="Universo Moon Creative">
  <BackgroundFilm src="/videos/moon-universe-finale.mp4" mobileSrc="/videos/moon-universe-finale-mobile.mp4" poster="/images/moon-universe-finale.jpg" label="vídeo do universo Moon" />
  <div className="moon-finale-shade" aria-hidden="true" />
  <div className="moon-finale-copy">
   <span className="b-eyebrow">IDEIAS QUE NÃO CONHECEM LIMITES.</span>
   <h2>Vamos criar algo<br /><em>fora de órbita?</em></h2>
   <div className="moon-finale-logo"><img src="/images/moon-official.webp" alt="Moon Creative" /></div>
   <p>Conte sua ideia. A gente ajuda a encontrar o caminho.</p>
   <a className="b-primary" href={contactHref}>Começar uma conversa <span>↗</span></a>
  </div>
 </section>;
}
