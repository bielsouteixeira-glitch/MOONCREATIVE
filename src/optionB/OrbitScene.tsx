import { useEffect, useRef } from 'react';

// One analytical ray/sphere scene, one draw call. No model downloads or animation library.
const VERTEX = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const FRAGMENT = `precision highp float;
uniform vec2 resolution, pointer;
uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float hit(vec3 ro,vec3 rd,vec3 center,float r){vec3 oc=ro-center;float b=dot(oc,rd),h=b*b-dot(oc,oc)+r*r;return h<0.?1000.:-b-sqrt(h);}
void main(){
 vec2 uv=(2.*gl_FragCoord.xy-resolution)/resolution.y;
 vec3 ro=vec3(pointer*.09,4.4),rd=normalize(vec3(uv,-3.1));
 vec3 c=vec3(.019,.014,.035);
 float fog=noise(uv*2.+vec2(time*.012,0.))*noise(uv*4.-time*.008);
 c+=vec3(.14,.036,.26)*fog*.5;
 vec2 stars=uv*85.;float s=hash(floor(stars));
 c+=smoothstep(.985,1.,s)*pow(max(0.,1.-length(fract(stars)-.5)*2.),8.)*vec3(.7,.58,1.);
 vec3 center=vec3(.02,0.,0.);float t=hit(ro,rd,center,.82);
 vec3 light=normalize(vec3(-2.,2.,3.));
 if(t<100.){
  vec3 n=normalize(ro+rd*t-center);
  float angle=atan(n.z,n.x)+time*.055;
  float detail=noise(vec2(angle*5.,n.y*18.));
  float bands=sin(n.y*40.+detail*2.)*.5+.5;
  vec3 albedo=mix(vec3(.18,.1,.29),vec3(.61,.46,.73),bands*.65+detail*.25);
  float diffuse=max(dot(n,light),0.);
  float rim=pow(1.-max(dot(n,-rd),0.),3.5);
  c=albedo*(.07+diffuse*.85)+vec3(.48,.25,.85)*rim*.6;
 }
 // Tilted ring plane with radial bands and shadows from the actual sphere.
 vec3 rn=normalize(vec3(.15,.8,.55));
 float plane=-dot(ro,rn)/dot(rd,rn);
 vec3 ring=ro+rd*plane;float radius=length(ring);
 if(plane>0.&&plane<t&&radius>1.05&&radius<1.6){
  float band=.3+.6*noise(vec2(radius*190.,1.));
  float shadow=hit(ring+light*.001,light,center,.82)<100.? .13:1.;
  float edge=smoothstep(1.05,1.09,radius)*(1.-smoothstep(1.54,1.6,radius));
  c=mix(c,vec3(.62,.48,.85)*band*shadow,edge*.78);
 }
 // A cratered satellite moves through a real 3D orbit, not a flat sprite.
 vec3 moon=vec3(cos(time*.11)*1.65,sin(time*.11)*.4+.65,sin(time*.11)*.9);
 float mt=hit(ro,rd,moon,.16);
 if(mt<t&&mt<100.){vec3 n=normalize(ro+rd*mt-moon);float cr=noise(n.xy*24.);c=vec3(.48,.43,.56)*(.1+max(dot(n,light),0.))*(.65+cr*.4);}
 float vignette=1.-smoothstep(.8,2.7,length(uv));
 gl_FragColor=vec4(c*vignette,1.);
}`;
export default function OrbitScene() {
 const ref = useRef<HTMLCanvasElement>(null);
 useEffect(() => {
  const canvas = ref.current;
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power', preserveDrawingBuffer: false });
  if (!gl) { canvas.dataset.state = 'unsupported'; return; }
  const compile = (type: number, source: string) => {
   const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader);
   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { canvas.dataset.shaderError = gl.getShaderInfoLog(shader) || 'Shader unavailable'; gl.deleteShader(shader); return null; }
   return shader;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX), fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) { canvas.dataset.state = 'shader-unavailable'; return; }
  const program = gl.createProgram()!; gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); return; }
  gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uniforms = { resolution: gl.getUniformLocation(program, 'resolution'), time: gl.getUniformLocation(program, 'time'), pointer: gl.getUniformLocation(program, 'pointer') };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, raf = 0, last = 0, elapsed = 0, frames = 0, x = 0, y = 0;
  const resize = () => {
   const rect = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio, 1);
   canvas.width = Math.max(1, Math.round(rect.width*dpr)); canvas.height = Math.max(1, Math.round(rect.height*dpr));
   gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);
  };
  const draw = (now: number) => {
   raf = 0;
   if (!visible || document.hidden || gl.isContextLost()) return;
   const delta = Math.min((now-last)/1000,.05);
   if (now-last>=32 || reduced.matches) {
    if (!reduced.matches) elapsed+=delta;
    last=now; gl.uniform1f(uniforms.time,elapsed); gl.uniform2f(uniforms.pointer,x,y); gl.drawArrays(gl.TRIANGLES,0,3);
    canvas.dataset.state='rendering'; canvas.dataset.frames=String(++frames);
   }
   if (!reduced.matches) raf=requestAnimationFrame(draw);
  };
  const resume = () => { cancelAnimationFrame(raf); raf=0; if (visible&&!document.hidden) { last=performance.now(); raf=requestAnimationFrame(draw); } };
  const io = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; resume(); }, { rootMargin:'80px' });
  const ro = new ResizeObserver(() => { resize(); resume(); });
  io.observe(canvas); ro.observe(canvas); resize();
  const move = (e: PointerEvent) => { if (!visible || reduced.matches) return; const r=canvas.getBoundingClientRect(); x=Math.max(-.5,Math.min(.5,(e.clientX-r.left)/r.width-.5)); y=Math.max(-.5,Math.min(.5,.5-(e.clientY-r.top)/r.height)); };
  const contextLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); canvas.dataset.state='context-lost'; };
  window.addEventListener('pointermove',move,{passive:true}); document.addEventListener('visibilitychange',resume); reduced.addEventListener('change',resume); canvas.addEventListener('webglcontextlost',contextLost);
  return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove',move); document.removeEventListener('visibilitychange',resume); reduced.removeEventListener('change',resume); canvas.removeEventListener('webglcontextlost',contextLost); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); };
 }, []);
 return <canvas ref={ref} className="moon-orbit-canvas" aria-hidden="true" />;
}
