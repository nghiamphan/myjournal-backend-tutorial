(this.webpackJsonpmyjournal=this.webpackJsonpmyjournal||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=n(14),i=n(2),l=function(t){var e=t.entry,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"journalEntry"},e.date,": ",e.content,r.a.createElement("button",{onClick:n},a))},m=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},f=n(3),s=n.n(f),p="http://localhost:3001/api/journalEntries",E=function(){return s.a.get(p).then((function(t){return t.data}))},d=function(t){return s.a.post(p,t).then((function(t){return t.data}))},b=function(t,e){return s.a.put("".concat(p,"/").concat(t),e).then((function(t){return t.data}))},v=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2020"))},h=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)("new entry..."),f=Object(i.a)(c,2),s=f[0],p=f[1],h=Object(a.useState)(!0),j=Object(i.a)(h,2),y=j[0],g=j[1],O=Object(a.useState)(""),S=Object(i.a)(O,2),k=S[0],w=S[1];Object(a.useEffect)((function(){E().then((function(t){o(t)}))}),[]);var C=y?n:n.filter((function(t){return!0===t.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Journal"),r.a.createElement(m,{message:k}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return g(!y)}},"show ",y?"important":"all")),r.a.createElement("ul",null,C.map((function(t){return r.a.createElement(l,{key:t.id,entry:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)({},e,{important:!e.important});b(t,a).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){w("Journal entry '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString(),important:Math.random()>.5};d(e).then((function(t){o(n.concat(t)),p("")}))}},r.a.createElement("input",{value:s,onChange:function(t){p(t.target.value)}}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement(v,null))};n(37);c.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.c4c2af80.chunk.js.map