"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[499],{1499:function(e,a,t){t.r(a);var l=t(3827),n=t(4090),s=t(197);a.default=e=>{let{data:a}=e,t=(0,n.useRef)(null);return(0,n.useEffect)(()=>{if(!t.current)return;let e=new s.ZP(t.current,{type:"line",data:{labels:a.months,datasets:[{label:"Capital de mise",data:a.investmentBalances,borderColor:"rgb(75, 192, 192)",backgroundColor:"rgba(75, 192, 192, 0.1)",tension:.3,fill:!0},{label:"Gains cumul\xe9s",data:a.profitBalances,borderColor:"rgb(153, 102, 255)",backgroundColor:"rgba(153, 102, 255, 0.1)",tension:.3,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{position:"top",labels:{font:{size:14}}},tooltip:{callbacks:{label:e=>"".concat(e.dataset.label,": ").concat(e.parsed.y,"€")}}},scales:{y:{beginAtZero:!0,ticks:{callback:e=>"".concat(e,"€")}}}}});return()=>{e.destroy()}},[a]),(0,l.jsx)("div",{className:"w-full h-[400px]",children:(0,l.jsx)("canvas",{ref:t,style:{placeSelf:"center"}})})}}}]);