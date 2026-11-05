import { useEffect, useRef, useState } from 'react';

const conversation = [
 { who:'CLIENTE', text:'Olá! Gostaria de conhecer os serviços de vocês.', time:'09:41' },
 { who:'ASSISTENTE', text:'Olá! Seja bem-vindo. Posso te apresentar nossas soluções e ajudar a encontrar a melhor opção.', time:'09:41' },
 { who:'CLIENTE', text:'Vocês conseguem me passar mais informações?', time:'09:42' },
 { who:'ASSISTENTE', text:'Claro! Vou te mostrar as opções disponíveis e, se preferir, também posso encaminhar seu atendimento para nossa equipe.', time:'09:42' },
 { who:'CLIENTE', text:'Perfeito, obrigado!', time:'09:43' },
 { who:'ASSISTENTE', text:'Por nada! Estou aqui para ajudar.', time:'09:43' },
];
const steps = ['Buscando oportunidades...','Empresa identificada.','Analisando informações públicas...','Preparando mensagem personalizada...','Envio simulado.','Contato registrado.'];
const exampleMessage='Olá! Tudo bem? Conheci o trabalho de vocês e gostaria de apresentar algumas soluções digitais que podem ajudar a fortalecer a presença online da empresa.';

/** Only advances while in view, with an explicit pause and a static reduced-motion version. */
function useSimulation(total:number) {
 const ref=useRef<HTMLElement>(null); const [visible,setVisible]=useState(false); const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches); const [step,setStep]=useState(0); const [pageVisible,setPageVisible]=useState(!document.hidden);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});observer.observe(node);return()=>observer.disconnect()},[]);
 useEffect(()=>{const change=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change)},[]);
 useEffect(()=>{if(!visible||paused||reduced||!pageVisible)return;const timer=window.setTimeout(()=>setStep(value=>(value+1)%total), step===total-1?4200:1800);return()=>window.clearTimeout(timer)},[step,visible,paused,reduced,total,pageVisible]);
 return {ref,step,reduced,paused,setPaused};
}
function SimulationHeader({label,paused,reduced,onPause}:{label:string;paused:boolean;reduced:boolean;onPause:()=>void}) {
 return <div className="mc-simulation-header"><div><span className="mc-simulation-avatar" aria-hidden="true">✳</span><div><strong>{label}</strong><small><i/> Simulação ilustrativa</small></div></div>{!reduced && <button type="button" onClick={onPause} aria-label={paused?'Retomar animação da demonstração':'Pausar animação da demonstração'}>{paused?'▶':'Ⅱ'}</button>}</div>;
}
export function AIChatDemo() {
 const sim=useSimulation(13);const count=sim.reduced?conversation.length:Math.min(conversation.length,Math.floor(sim.step/2)+1);const start=sim.reduced?0:Math.max(0,count-3);const typing=!sim.reduced && sim.step%2===1 && count<conversation.length && conversation[count].who==='ASSISTENTE';
 return <section ref={sim.ref} className="mc-simulation mc-chat-demo" aria-label="Demonstração ilustrativa de atendimento automatizado">
  <SimulationHeader label="Assistente inteligente" paused={sim.paused} reduced={sim.reduced} onPause={()=>sim.setPaused(!sim.paused)}/>
  <div className="mc-chat-body" aria-hidden="true">{conversation.slice(start,count).map((message,i)=><div className={`mc-message ${message.who==='CLIENTE'?'is-client':'is-bot'}`} key={`${message.time}-${i}`}><span>{message.who}</span><p>{message.text}</p><time>{message.time}</time></div>)}{typing && <div className="mc-typing"><span/><span/><span/><small>Assistente digitando</small></div>}</div>
  <ol className="sr-only">{conversation.map((m,i)=><li key={i}>{m.who}: {m.text}</li>)}</ol>
  <div className="mc-chat-input" aria-hidden="true">Mensagem de exemplo <span>↗</span></div>
  <p className="mc-simulation-note">Demonstração visual. Nenhuma conversa está conectada.</p>
 </section>;
}
export function AIProspectingDemo() {
 const sim=useSimulation(10);const phase=sim.reduced?5:sim.step<4?sim.step:sim.step<7?3:sim.step===7?4:5;
 const messageLength=sim.reduced||sim.step>=7?exampleMessage.length:sim.step<4?0:Math.ceil(exampleMessage.length*(sim.step-3)/3);
 return <section ref={sim.ref} className="mc-prospect" aria-labelledby="mc-prospect-title"><div className="mc-prospect-copy"><span className="mc-ai-kicker">AUTOMAÇÃO COM PROPÓSITO</span><h3 id="mc-prospect-title">Tenha um robô fazendo prospecção para você.</h3><p>Encontre oportunidades, organize contatos e automatize etapas da sua prospecção comercial.</p><span className="mc-prospect-disclaimer">Simulação conceitual · Nenhuma mensagem é enviada</span></div>
  <div className="mc-simulation mc-prospect-window"><SimulationHeader label="Agente de prospecção" paused={sim.paused} reduced={sim.reduced} onPause={()=>sim.setPaused(!sim.paused)}/><div className="mc-prospect-body"><div className="mc-prospect-company"><span className="mc-prospect-company-icon" aria-hidden="true">⌁</span><div><strong>Empresa exemplo 01</strong><small>Empresas fictícias · Demonstração</small></div><span className="mc-prospect-badge">EXEMPLO</span></div><div className="mc-prospect-secondary">Empresa exemplo 02 <span>Na fila de análise</span></div><ol>{steps.map((text,i)=><li className={i<phase?'is-done':i===phase?'is-current':''} key={text}><span>{i<phase?'✓':String(i+1).padStart(2,'0')}</span><p>{text}</p></li>)}</ol><div className="mc-prospect-message"><span>PRÉVIA DA MENSAGEM</span><p>{messageLength?exampleMessage.slice(0,messageLength):'A mensagem personalizada aparecerá aqui.'}{messageLength>0&&messageLength<exampleMessage.length&&<i className="mc-prospect-caret" aria-hidden="true"/>}</p></div><div className="mc-prospect-footer"><span>LISTA DE PROSPECÇÃO</span><strong>{phase===5?'01 contato simulado':'Aguardando registro'}</strong></div></div></div>
 </section>;
}
