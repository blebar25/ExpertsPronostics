"use strict";(()=>{var e={};e.id=9331,e.ids=[9331],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},45556:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>m,originalPathname:()=>b,patchFetch:()=>f,requestAsyncStorage:()=>l,routeModule:()=>p,serverHooks:()=>h,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>v});var s={};r.r(s),r.d(s,{GET:()=>c});var i=r(95419),n=r(69108),o=r(99678),a=r(78070),u=r(9108);async function c(){try{let e=await u.Z.user.findUnique({where:{email:"test@test.com"}});if(!e)return a.Z.json({error:"Utilisateur test non trouv\xe9"},{status:404});let t=await u.Z.subscription.findFirst({where:{userId:e.id,active:!0,endDate:{gt:new Date}}});return a.Z.json({hasActiveSubscription:!!t,subscription:t})}catch(e){return console.error("Erreur lors de la v\xe9rification de l'abonnement test:",e),a.Z.json({error:"Erreur lors de la v\xe9rification de l'abonnement test"},{status:500})}}let p=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/check-test-subscription/route",pathname:"/api/check-test-subscription",filename:"route",bundlePath:"app/api/check-test-subscription/route"},resolvedPagePath:"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/api/check-test-subscription/route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:d,serverHooks:h,headerHooks:m,staticGenerationBailout:v}=p,b="/api/check-test-subscription/route";function f(){return(0,o.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:d})}},9108:(e,t,r)=>{r.d(t,{Z:()=>i});let s=require("@prisma/client"),i=global.prisma||new s.PrismaClient({log:["query"]})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[1638,6206],()=>r(45556));module.exports=s})();