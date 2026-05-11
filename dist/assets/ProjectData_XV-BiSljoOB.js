import{c as A,y as z,aq as h,ar as y,r as o,T as j,af as d,I as L,ah as O,V as w,C as q,j as r,X as R,z as E,as as I,Q as B,Y as p,Z as v}from"./index-TQTMTVlG.js";import{E as U,F as G}from"./Environment-tOPBcZXZ.js";import{H}from"./Html-CBG_dYmT.js";import{s as V}from"./shaderMaterial-BtC7s6MY.js";/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],re=A("external-link",W);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],oe=A("lock",Q),g=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!="function";function x(e,a){const i=z(s=>s.gl),t=h(y,g(e)?Object.values(e):e);return o.useLayoutEffect(()=>{a==null||a(t)},[a]),o.useEffect(()=>{if("initTexture"in i){let s=[];Array.isArray(t)?s=t:t instanceof j?s=[t]:g(t)&&(s=Object.values(t)),s.forEach(n=>{n instanceof j&&i.initTexture(n)})}},[i,t]),o.useMemo(()=>{if(g(e)){const s={};let n=0;for(const l in e)s[l]=t[n++];return s}else return t},[e,t])}x.preload=e=>h.preload(y,e);x.clear=e=>h.clear(y,e);const k=V({color:new q("white"),scale:new w(1,1),imageBounds:new w(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${O>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),M=o.forwardRef(({children:e,color:a,segments:i=1,scale:t=1,zoom:f=1,grayscale:s=0,opacity:n=1,radius:l=0,texture:u,toneMapped:C,transparent:D,side:_,...T},F)=>{L({ImageMaterial:k});const c=o.useRef(null),b=z(S=>S.size),m=Array.isArray(t)?[t[0],t[1]]:[t,t],N=[u.image.width,u.image.height],P=Math.max(b.width,b.height);return o.useImperativeHandle(F,()=>c.current,[]),o.useLayoutEffect(()=>{c.current.geometry.parameters&&c.current.material.scale.set(m[0]*c.current.geometry.parameters.width,m[1]*c.current.geometry.parameters.height)},[m[0],m[1]]),o.createElement("mesh",d({ref:c,scale:Array.isArray(t)?[...t,1]:t},T),o.createElement("planeGeometry",{args:[1,1,i,i]}),o.createElement("imageMaterial",{color:a,map:u,zoom:f,grayscale:s,opacity:n,scale:m,imageBounds:N,resolution:P,radius:l,toneMapped:C,transparent:D,side:_,key:k.key}),e)}),X=o.forwardRef(({url:e,...a},i)=>{const t=x(e);return o.createElement(M,d({},a,{texture:t,ref:i}))}),Y=o.forwardRef(({url:e,...a},i)=>o.createElement(M,d({},a,{ref:i}))),$=o.forwardRef((e,a)=>{if(e.url)return o.createElement(X,d({},e,{ref:a}));if(e.texture)return o.createElement(Y,d({},e,{ref:a}));throw new Error("<Image /> requires a url or texture")}),Z=({url:e})=>{const a=o.useRef(null),[i,t]=o.useState(!1);return E(f=>{if(!a.current)return;const{x:s,y:n}=f.mouse,l=-n*.2,u=s*.2;a.current.rotation.x=I.lerp(a.current.rotation.x,l,.1),a.current.rotation.y=I.lerp(a.current.rotation.y,u,.1)}),r.jsx("group",{ref:a,children:r.jsx(G,{speed:2,rotationIntensity:0,floatIntensity:.5,floatingRange:[-.05,.05],children:r.jsx($,{url:e,transparent:!0,opacity:i?1:.85,scale:[4,3,1],onPointerOver:()=>{document.body.style.cursor="pointer",t(!0)},onPointerOut:()=>{document.body.style.cursor="auto",t(!1)},toneMapped:!1})})})},se=({imageUrl:e})=>{const a=e||"https://picsum.photos/800/600";return r.jsxs("div",{className:"w-full h-full relative rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,150,255,0.15)] border border-blue-500/20 group hover:shadow-[0_0_40px_rgba(0,200,255,0.3)] transition-all duration-500",children:[r.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-[#0a0f1a] to-black z-0"}),r.jsxs(R,{camera:{position:[0,0,5],fov:50},gl:{antialias:!0,alpha:!0},children:[r.jsx("ambientLight",{intensity:.5,color:"#4444ff"}),r.jsx("pointLight",{position:[10,10,10],intensity:1.5,color:"#aaddff"}),r.jsx("pointLight",{position:[-10,-10,5],intensity:.5,color:"#ff00ff"}),r.jsx(U,{preset:"city"}),r.jsx(o.Suspense,{fallback:r.jsx(H,{center:!0,children:r.jsx("div",{className:"text-blue-500 font-mono text-xs animate-pulse",children:"LOADING_DATA..."})}),children:r.jsx(Z,{url:a})})]}),r.jsx("div",{className:"absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-white/0 to-white/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-overlay"})]})},J=()=>{const e=o.useRef(null);return E(({clock:a})=>{e.current&&(e.current.rotation.y=a.getElapsedTime()*.02,e.current.rotation.x=Math.sin(a.getElapsedTime()*.1)*.1)}),r.jsxs("group",{ref:e,children:[r.jsx(v,{count:p.particles.FinalFantasy.lightCyan,scale:20,size:3,speed:.2,opacity:.8,color:"#00aaff"}),r.jsx(v,{count:p.particles.FinalFantasy.lightCyan,scale:20,size:3,speed:.2,opacity:.8,color:"#e0ffff"}),r.jsx(v,{count:p.particles.FinalFantasy.blue,scale:12,size:1,speed:.5,opacity:.3,color:"#0055ff"})]})},ie=()=>r.jsx("div",{className:"absolute inset-0 z-0 pointer-events-none",children:r.jsx(B,{children:r.jsx(R,{camera:{position:[0,0,5],fov:60},dpr:p.dpr,gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},children:r.jsx(J,{})})})}),ne="/assets/InsomniaCityA-e6hDWbAQ.png",ce=[{id:1,title:"Magitek E-Commerce",category:"Fullstack Web",tech:["React","Node.js","Stripe","PostgreSQL"],image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",description:{challenge:"Criar uma plataforma de vendas B2C escalável para alta demanda de tráfego.",solution:"Desenvolvi uma arquitetura baseada em microsserviços com React e Node.js. Implementei gateway de pagamento Stripe reduzindo o tempo de checkout em 40%."},links:{github:"https://github.com/seu-usuario/repo",live:"https://seu-site.com"}},{id:3,title:"Crystal Dashboard",category:"SaaS / Admin",tech:["Next.js","Tailwind","Recharts"],image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",description:{challenge:"Visualizar grandes volumes de dados financeiros de forma intuitiva.",solution:"Dashboard administrativo com gráficos interativos e Dark Mode nativo. Melhorou a tomada de decisão dos gestores com relatórios gerados 10x mais rápido."},links:{github:"https://github.com/seu-usuario/repo",live:"https://seu-site.com"}},{id:999,title:"Project Magitek [CLASSIFIED]",category:"Corporate NDA",tech:["React","TypeScript","Node.js","Enterprise Arch","Security"],image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",description:{challenge:"[ DADOS CRIPTOGRAFADOS ] O desenvolvimento de um sistema corporativo de larga escala (Fullstack) para gerenciamento interno. Devido ao Nível de Autorização (NDA), os detalhes do escopo estão selados.",solution:"Implementação de arquitetura robusta focada em alta performance. Atuei na construção de fluxos de dados complexos, autenticação segura e interfaces dinâmicas sob alta demanda."},links:{github:"#",live:"#"}}];export{re as E,ne as I,ie as L,se as P,oe as a,ce as p};
