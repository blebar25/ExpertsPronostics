"use strict";(()=>{var e={};e.id=5850,e.ids=[5850],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},30229:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>m,originalPathname:()=>k,patchFetch:()=>v,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>h,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>f});var i={};t.r(i),t.d(i,{GET:()=>c});var s=t(95419),a=t(69108),o=t(99678),n=t(78070),u=t(9108);async function c(){try{let e=await u.Z.user.findUnique({where:{email:"test@test.com"}});if(!e)return n.Z.json({exists:!1});let r=await u.Z.subscription.findFirst({where:{userId:e.id}});return n.Z.json({exists:!0,user:{...e,subscription:r}})}catch(e){return console.error("Erreur lors de la v\xe9rification de l'utilisateur:",e),n.Z.json({error:"Erreur lors de la v\xe9rification de l'utilisateur"},{status:500})}}let l=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/check-user/route",pathname:"/api/check-user",filename:"route",bundlePath:"app/api/check-user/route"},resolvedPagePath:"/home/runner/work/ExpertsPronostics/ExpertsPronostics/app/api/check-user/route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:p,staticGenerationAsyncStorage:d,serverHooks:h,headerHooks:m,staticGenerationBailout:f}=l,k="/api/check-user/route";function v(){return(0,o.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:d})}},9108:(e,r,t)=>{t.d(r,{Z:()=>s});let i=require("@prisma/client"),s=global.prisma||new i.PrismaClient({log:["query"]})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),i=r.X(0,[1638,6206],()=>t(30229));module.exports=i})();