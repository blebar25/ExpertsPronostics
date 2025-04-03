(()=>{var e={};e.id=4178,e.ids=[4178],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},22006:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var r=t(50482),a=t(69108),n=t(62563),o=t.n(n),i=t(68300),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);t.d(s,l);let d=["",{children:["profile",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,48654)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/profile/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,82884)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/layout.tsx"],error:[()=>Promise.resolve().then(t.bind(t,20429)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/error.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,87984)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,1429)),"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/not-found.tsx"]}],c=["/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/profile/page.tsx"],u="/profile/page",p={require:t,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/profile/page",pathname:"/profile",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},26365:(e,s,t)=>{Promise.resolve().then(t.bind(t,51115))},51115:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>i});var r=t(95344),a=t(47674),n=t(8428),o=t(3729);function i(){let{data:e,status:s}=(0,a.useSession)(),t=(0,n.useRouter)(),[i,l]=(0,o.useState)(""),[d,c]=(0,o.useState)(""),[u,p]=(0,o.useState)(""),[m,x]=(0,o.useState)(""),[h,g]=(0,o.useState)(""),[f,b]=(0,o.useState)(null),[j,y]=(0,o.useState)(!0);(0,o.useEffect)(()=>{let t=async()=>{if(e?.user?.id)try{let e=await fetch("/api/subscription-details"),s=await e.json();b(s.subscription)}catch(e){console.error("Erreur lors de la r\xe9cup\xe9ration des d\xe9tails de l'abonnement:",e)}finally{y(!1)}else y(!1)};"authenticated"===s&&t()},[e,s]);let w=async e=>{if(e.preventDefault(),d!==u){x("Les mots de passe ne correspondent pas");return}try{let e=await fetch("/api/change-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:i,newPassword:d})}),s=await e.json();e.ok?(g("Mot de passe modifi\xe9 avec succ\xe8s"),l(""),c(""),p(""),x("")):x(s.error||"Une erreur est survenue")}catch(e){x("Une erreur est survenue lors de la modification du mot de passe")}};return"loading"===s||j?r.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:r.jsx("div",{className:"animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"})}):"unauthenticated"===s?(t.push("/auth/login"),null):r.jsx("div",{className:"min-h-screen bg-gray-50 pt-24 pb-24 px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"max-w-3xl mx-auto space-y-8",children:[(0,r.jsxs)("div",{className:"bg-white shadow rounded-lg p-6",children:[r.jsx("h2",{className:"text-2xl font-semibold mb-6",children:"Profil Utilisateur"}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-gray-600",children:"Email"}),r.jsx("p",{className:"font-medium",children:e?.user?.email})]}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-gray-600",children:"Nom"}),r.jsx("p",{className:"font-medium",children:e?.user?.name||"Non d\xe9fini"})]}),f?(0,r.jsxs)("div",{className:"border-t pt-4 mt-4",children:[r.jsx("h3",{className:"text-lg font-semibold mb-3",children:"D\xe9tails de l'abonnement"}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("p",{children:[r.jsx("span",{className:"text-gray-600",children:"Type : "}),r.jsx("span",{className:"font-medium",children:f.type})]}),(0,r.jsxs)("p",{children:[r.jsx("span",{className:"text-gray-600",children:"Statut : "}),r.jsx("span",{className:`font-medium ${f.active?"text-green-600":"text-red-600"}`,children:f.active?"Actif":"Inactif"})]}),(0,r.jsxs)("p",{children:[r.jsx("span",{className:"text-gray-600",children:"Date de d\xe9but : "}),r.jsx("span",{className:"font-medium",children:new Date(f.startDate).toLocaleDateString()})]}),(0,r.jsxs)("p",{children:[r.jsx("span",{className:"text-gray-600",children:"Date de fin : "}),r.jsx("span",{className:"font-medium",children:new Date(f.endDate).toLocaleDateString()})]}),(0,r.jsxs)("p",{children:[r.jsx("span",{className:"text-gray-600",children:"Dernier paiement : "}),r.jsx("span",{className:"font-medium",children:new Date(f.lastPaymentDate).toLocaleDateString()})]})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between mt-6",children:["STANDARD"===f.type&&r.jsx("button",{onClick:()=>window.location.href="/api/upgrade-subscription",className:"bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors",children:"Passer Premium"}),(0,r.jsxs)("div",{className:"flex space-x-4 text-sm",children:["PREMIUM"===f.type&&r.jsx("button",{onClick:()=>window.location.href="/api/downgrade-subscription",className:"text-gray-500 hover:text-gray-600 transition-colors",children:"Passer Standard"}),r.jsx("button",{onClick:()=>window.location.href="/api/cancel-subscription",className:"text-red-500 hover:text-red-600 transition-colors",children:"Annuler"})]})]})]}):r.jsx("div",{className:"border-t pt-4 mt-4",children:r.jsx("p",{className:"text-gray-600",children:"Aucun abonnement actif"})})]})]}),(0,r.jsxs)("div",{className:"bg-white shadow rounded-lg p-6",children:[r.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Changer le mot de passe"}),(0,r.jsxs)("form",{onSubmit:w,className:"space-y-4",children:[m&&r.jsx("div",{className:"bg-red-50 text-red-700 p-3 rounded",children:m}),h&&r.jsx("div",{className:"bg-green-50 text-green-700 p-3 rounded",children:h}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"currentPassword",className:"block text-sm font-medium text-gray-700",children:"Mot de passe actuel"}),r.jsx("input",{type:"password",id:"currentPassword",value:i,onChange:e=>l(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",required:!0})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"newPassword",className:"block text-sm font-medium text-gray-700",children:"Nouveau mot de passe"}),r.jsx("input",{type:"password",id:"newPassword",value:d,onChange:e=>c(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",required:!0})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700",children:"Confirmer le nouveau mot de passe"}),r.jsx("input",{type:"password",id:"confirmPassword",value:u,onChange:e=>p(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",required:!0})]}),r.jsx("button",{type:"submit",className:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"Changer le mot de passe"})]})]})]})})}},48654:(e,s,t)=>{"use strict";t.r(s),t.d(s,{$$typeof:()=>n,__esModule:()=>a,default:()=>o});let r=(0,t(86843).createProxy)(String.raw`/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/profile/page.tsx`),{__esModule:a,$$typeof:n}=r,o=r.default}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[1638,7102,1830],()=>t(22006));module.exports=r})();