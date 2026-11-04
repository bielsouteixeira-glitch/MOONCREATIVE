import { VideoB } from '../optionB/MediaB';
import './incrementalExperience.css';

const LOCAL: Record<string, string> = {
 '1oIAWsWGkPcOi42bsl6BnRXFEwizBYGLX':'jah-burguer-1',
 '1ca2pcwfuKWNYuYFisRXE3Q4h8-p27Xc1':'jah-burguer-2',
 '1rkUwYMkQL_Idubhx9uBx6tmqdBvU-WaL':'jah-burguer-3',
 '1gtt16PWIT4sp0QxLZmHlXMdAespMip2q':'jah-burguer-4',
 '1Sza3f6CDl1cVs84Eh2CT_rreUFmFoLGe':'la-barberia-1',
 '1lKBipj_Z08QC04BF9LtoZtz-V6kxMqC5':'la-barberia-2',
 '1LW0pLvLmBMZi1LCB7Z66l61cq2he_lcY':'la-barberia-3',
 '1c-qTU0EapdOKcop5UoT5beet0LYAACk1':'la-barberia-4',
 '1sxEgyiN3POnpvhj6Z-vh2ZA9QrlECOkk':'la-barberia-5',
 '1E_VTYFMUb9cYBqEVXUVTZ4UvMtKoOzLm':'krodec-produtos',
 // Drive metadata confirms these are byte-identical copies (same MD5).
 '1Macw5WU71t8m1-omI4CLw_qdD39aPVJU':'krodec-acaros',
 '1mW2bAQoZs31RSEyzo3TTujTX9V7zIyjx':'krodec-pulgas-2',
 '1kpxdLJwrzd93a-J4c9g3G1oR9U_fc7dW':'noiz-ia',
};
export function ClientPhone({ source, title, client }: { source: string; title: string; client: string }) {
 const driveId=source.match(/\/d\/([^/]+)/)?.[1];
 const filename=driveId ? LOCAL[driveId] : undefined;
 return <div className="mc-phone-stage"><div className="mc-client-phone"><span className="mc-phone-camera" aria-hidden="true" />
  <VideoB respectReducedMotion work={{id:source,title,client,driveId,category:'videos-clientes',type:'video',src:filename ? `/videos/${filename}.mp4` : undefined}} />
 </div></div>;
}
