(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[13],{282:function(e,t,n){"use strict";var a=n(13),c=n(21),r=(n(1),n(246)),s=n(259),o=n.n(s),i=n(301),u=n.n(i),j=n(418);t.a=function(e){var t=e.columns,n=e.infoBody,s=e.nombreArchivo;return n.length>0&&Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)("div",{className:"col-md-12 text-rigth",children:Object(a.jsx)(r.a,{style:{display:"flex",alignItems:"center"},type:"primary",onClick:function(){return function(){var e={},a=t.map((function(e){return e.title}));e.fileName=s?s+"_"+o()(new Date).format("DD-MM-YYYY"):o()(new Date).format("DD-MM-YYYY"),e.datas=[{sheetData:n,sheetHeader:Object(c.a)(a)}],new u.a(e).saveExcel()}()},icon:Object(a.jsx)(j.a,{}),children:"Download Excel"})}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{})]})}},409:function(e,t,n){"use strict";n.r(t);var a=n(13),c=n(5),r=n(21),s=n(0),o=n.n(s),i=n(54),u=n(3),j=n(16),b=n(1),f=n(415),l=n(407),d=n(408),O=n(412),m=n(99),x=n(76),h=n(282),p=["id","date","day_off","justification","name","number_of_hours","station","time_of_entry","time_of_exit"].map((function(e){return{title:e,dataIndex:e,key:e}}));t.default=function(){var e=Object(b.useState)([]),t=Object(j.a)(e,2),n=t[0],s=t[1],v=Object(x.f)(m.a);Object(b.useEffect)((function(){w()}),[]);var w=function(){var e=Object(u.a)(o.a.mark((function e(){var t,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(x.e)(Object(x.b)(v,"hours"));case 2:t=e.sent,n=(new Date).getFullYear(),a=t.docs.map((function(e,t){return Object(i.a)(Object(i.a)({},e.data()),{},{id:"".concat(n,"-00").concat(t+1)})})),s(a);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=p.reduce((function(e,t){return e.concat(t.dataIndex)}),[]);return Object(a.jsxs)("div",{className:"books-page",children:[Object(a.jsx)("br",{}),Object(a.jsx)(f.a.Title,{align:"center",children:"Hours Results"}),Object(a.jsx)(l.a,{gutter:16,children:Object(a.jsx)(d.a,{className:"gutter-row",span:6,offset:1,children:Object(a.jsx)(h.a,{columns:p,nombreArchivo:"Hours Results",infoBody:Object(r.a)(n.map((function(e){return Object(i.a)({},y.reduce((function(t,n){return Object(i.a)(Object(i.a)({},t),{},Object(c.a)({},n,e[n]))}),{}))})))})})}),Object(a.jsx)(l.a,{children:Object(a.jsx)(d.a,{className:"gutter-row",span:22,offset:1,children:Object(a.jsx)(O.a,{columns:p,dataSource:n})})})]})}}}]);
//# sourceMappingURL=13.b2cf1a82.chunk.js.map