(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[439],{1339:function(e,s,r){Promise.resolve().then(r.bind(r,2370))},2370:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return o}});var t=r(3827),a=r(4090),n=r(7907);function o(e){let{params:s}=e,[r,o]=(0,a.useState)(""),[u,d]=(0,a.useState)(""),[l,i]=(0,a.useState)(""),[c,m]=(0,a.useState)(""),[p,h]=(0,a.useState)(!1),f=(0,n.useRouter)(),x=async e=>{if(e.preventDefault(),r!==u){m("Les mots de passe ne correspondent pas");return}h(!0),m(""),i("");try{let e=await fetch("/api/auth/new-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:s.token,password:r})}),t=await e.json();if(!e.ok)throw Error(t.error||"Une erreur est survenue");i("Votre mot de passe a \xe9t\xe9 mis \xe0 jour avec succ\xe8s."),setTimeout(()=>{f.push("/login")},2e3)}catch(e){m("Une erreur est survenue. Veuillez r\xe9essayer plus tard.")}finally{h(!1)}};return(0,t.jsx)("div",{className:"min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"max-w-md mx-auto bg-white p-8 rounded-lg shadow-md",children:[(0,t.jsxs)("div",{className:"text-center mb-8",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900",children:"Nouveau mot de passe"}),(0,t.jsx)("p",{className:"mt-2 text-sm text-gray-600",children:"Entrez votre nouveau mot de passe"})]}),(0,t.jsxs)("form",{onSubmit:x,className:"space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Nouveau mot de passe"}),(0,t.jsx)("div",{className:"mt-1",children:(0,t.jsx)("input",{id:"password",name:"password",type:"password",required:!0,value:r,onChange:e=>o(e.target.value),className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700",children:"Confirmer le mot de passe"}),(0,t.jsx)("div",{className:"mt-1",children:(0,t.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:"password",required:!0,value:u,onChange:e=>d(e.target.value),className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"})})]}),c&&(0,t.jsx)("div",{className:"rounded-md bg-red-50 p-4",children:(0,t.jsx)("div",{className:"text-sm text-red-700",children:c})}),l&&(0,t.jsx)("div",{className:"rounded-md bg-green-50 p-4",children:(0,t.jsx)("div",{className:"text-sm text-green-700",children:l})}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",disabled:p,className:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50",children:p?"Mise \xe0 jour...":"Mettre \xe0 jour le mot de passe"})})]})]})})}},7907:function(e,s,r){"use strict";var t=r(5313);r.o(t,"usePathname")&&r.d(s,{usePathname:function(){return t.usePathname}}),r.o(t,"useRouter")&&r.d(s,{useRouter:function(){return t.useRouter}}),r.o(t,"useSearchParams")&&r.d(s,{useSearchParams:function(){return t.useSearchParams}})}},function(e){e.O(0,[971,69,744],function(){return e(e.s=1339)}),_N_E=e.O()}]);