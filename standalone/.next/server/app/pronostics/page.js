(()=>{var e={};e.id=4389,e.ids=[4389],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44166:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>x,routeModule:()=>m,tree:()=>l});var r=t(50482),n=t(69108),o=t(62563),i=t.n(o),a=t(68300),c={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>a[e]);t.d(s,c);let l=["",{children:["pronostics",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,63785)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/pronostics/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,82884)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/layout.tsx"],error:[()=>Promise.resolve().then(t.bind(t,20429)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/error.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,87984)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,1429)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/not-found.tsx"]}],x=["/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/pronostics/page.tsx"],d="/pronostics/page",p={require:t,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/pronostics/page",pathname:"/pronostics",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},57830:(e,s,t)=>{Promise.resolve().then(t.bind(t,55966))},55966:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>a});var r=t(95344),n=t(47674),o=t(3729),i=t(56506);function a(){let{data:e}=(0,n.useSession)(),[s,t]=(0,o.useState)([]),a=e?.user?.subscription?.type==="PREMIUM";return((0,o.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/pronostics"),s=await e.json();t(s)}catch(e){console.error("Erreur lors de la r\xe9cup\xe9ration des pronostics:",e)}})()},[]),e)?r.jsx("div",{className:"min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,r.jsxs)("div",{className:"text-center mb-12",children:[r.jsx("h1",{className:"text-3xl font-extrabold text-gray-900 sm:text-4xl",children:"Pronostics"}),!a&&r.jsx("p",{className:"mt-4 text-lg text-gray-600",children:"Passez \xe0 l'abonnement Premium pour acc\xe9der \xe0 tous les pronostics"})]}),r.jsx("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:s.map(e=>(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-lg overflow-hidden relative",children:[e.isPremium&&!a&&(0,r.jsxs)("div",{className:"absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4",children:[r.jsx("span",{className:"text-xl font-bold mb-2",children:"Contenu Premium"}),r.jsx(i.default,{href:"/subscription",className:"bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700",children:"Passer \xe0 Premium"})]}),(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[r.jsx("h2",{className:"text-xl font-semibold",children:e.title}),e.isPremium&&r.jsx("span",{className:"bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-0.5 rounded",children:"PREMIUM"})]}),r.jsx("p",{className:"text-gray-600",children:!e.isPremium||a?e.content:"Contenu r\xe9serv\xe9 aux membres Premium"}),r.jsx("div",{className:"mt-4 text-sm text-gray-500",children:new Date(e.createdAt).toLocaleDateString()})]})]},e.id))})]})}):(0,r.jsxs)("div",{className:"min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4",children:[r.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Acc\xe8s Restreint"}),r.jsx("p",{className:"text-gray-600 mb-4",children:"Vous devez \xeatre connect\xe9 pour voir les pronostics."}),r.jsx(i.default,{href:"/auth/login",className:"bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700",children:"Se connecter"})]})}},63785:(e,s,t)=>{"use strict";t.r(s),t.d(s,{$$typeof:()=>o,__esModule:()=>n,default:()=>i});let r=(0,t(86843).createProxy)(String.raw`/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/pronostics/page.tsx`),{__esModule:n,$$typeof:o}=r,i=r.default}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[1638,7102,1830],()=>t(44166));module.exports=r})();