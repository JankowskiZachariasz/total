(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{495:function(t,e,l){"use strict";l.r(e);var a=l(16),i=l(500),s=l(502),r=l(323);l(168),l(233),l(324);class b extends r.a{constructor(...t){super(...t),Object(a.a)(this,"getFilterGraphQL",({type:t,value:e})=>({["is"===t?""+this.path:`${this.path}_${t}`]:e})),Object(a.a)(this,"getFilterLabel",({label:t})=>`${this.label} ${t.toLowerCase()}`),Object(a.a)(this,"formatFilter",({label:t,value:e})=>{const l=this.config.format;let a=e;return l&&(a=Object(i.a)(Object(s.a)(e),l)),`${this.getFilterLabel({label:t})}: "${a}"`}),Object(a.a)(this,"serialize",t=>{let e=t[this.path];return"string"!=typeof e?null:e.trim()||null}),Object(a.a)(this,"getFilterTypes",()=>[{type:"is",label:"Is exactly",getInitialValue:()=>""},{type:"not",label:"Is not exactly",getInitialValue:()=>""},{type:"gt",label:"Is after",getInitialValue:()=>""},{type:"lt",label:"Is before",getInitialValue:()=>""},{type:"gte",label:"Is after or equal to",getInitialValue:()=>""},{type:"lte",label:"Is before or equal to",getInitialValue:()=>""}])}}e.default=b}}]);