(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[14],{258:function(e,s,t){"use strict";s.a=t.p+"static/media/logo.c94fb522.jpeg"},410:function(e,s,t){"use strict";t.r(s);var r=t(13),a=t(0),c=t.n(a),n=t(3),i=t(16),o=t(116),l=t(1),u=t(416),j=t(402),b=t(400),d=t(407),h=t(408),m=t(398),O=t(246),x=t(258),p=(t(259),t(76)),w=t(99),f=t(56),v=t(120),g=t(91),y=(u.a.Item,j.a.Option);s.default=function(){var e=Object(p.f)(w.a),s=Object(g.b)(w.a),t=Object(v.a)(),a=Object(l.useContext)(o.a).user;console.log("Hours  -  user",a);var k=u.a.useForm(),E=Object(i.a)(k,1)[0],F=(f.a.user.uid,[{required:!0,message:"Field is required"}]),I=(Object(v.b)(t,"sendEmail"),function(){var t=Object(n.a)(c.a.mark((function t(r){var a,n,i,o,l;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.email,n=r.password,i=r.rol,t.prev=1,t.next=4,Object(g.a)(s,a,n).then((function(e){return e}));case 4:o=t.sent,console.log("infoUsuario  -  infoUsuario",o),l=Object(p.c)(e,"users/".concat(o.user.uid)),Object(p.g)(l,{email:a,role:i}),E.resetFields(),b.b.success("Saved successfully"),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(1),b.b.error(T(t.t0)),console.error("Error adding document: ",t.t0);case 16:case"end":return t.stop()}}),t,null,[[1,12]])})));return function(e){return t.apply(this,arguments)}}()),T=function(e){switch(e.code){case"auth/email-already-in-use":return"The email is already in use";case"auth/invalid-email":return"The email is invalid";case"auth/operation-not-allowed":return"The operation is not allowed";case"auth/weak-password":return"The password is too weak";default:return"Unknown error"}};return Object(r.jsx)("div",{className:"books-page",children:Object(r.jsxs)(d.a,{children:[Object(r.jsx)(h.a,{xs:1,sm:2,md:6,lg:7}),Object(r.jsx)(h.a,{xs:22,sm:20,md:12,lg:10,children:Object(r.jsxs)(u.a,{form:E,onFinish:I,children:[Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:Object(r.jsx)("img",{style:{objectFit:"cover",objectPosition:"50% 50%",width:"100%",height:"auto"},src:x.a})}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(u.a.Item,{label:"Email",name:"email",rules:F,children:Object(r.jsx)(m.a,{})}),Object(r.jsx)(u.a.Item,{label:"Password",name:"password",rules:F,children:Object(r.jsx)(m.a.Password,{})}),Object(r.jsx)(u.a.Item,{label:"Role",name:"rol",rules:F,children:Object(r.jsxs)(j.a,{showSearch:!0,placeholder:"ROLE",children:[Object(r.jsx)(y,{value:"admin",children:"ADMIN"}),Object(r.jsx)(y,{value:"user",children:"USER"})]})}),Object(r.jsx)(O.a,{type:"primary",block:!0,htmlType:"submit",children:"Submit"})]})}),Object(r.jsx)(h.a,{xs:1,sm:2,md:6,lg:7})]})})}}}]);
//# sourceMappingURL=14.a242301f.chunk.js.map