(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{491:function(t,e,i){"use strict";i.r(e);var a=i(6),l=i(7),s=i(16),n=i(323);i(233),i(324);class o extends n.a{constructor(t,...e){let{defaultValue:i=null}=t,n=Object(l.a)(t,["defaultValue"]);super(Object(a.a)(Object(a.a)({},n),{},{defaultValue:i}),...e),Object(s.a)(this,"getFilterGraphQL",({value:{inverted:t,options:e}})=>{if(!e.length)return"";const i=e.length>1;let a=this.path;i&&t?a=this.path+"_not_in":i?a=this.path+"_in":t&&(a=this.path+"_not");return{[a]:i?e.map(t=>t.value):e[0].value}}),Object(s.a)(this,"getFilterLabel",()=>this.label),Object(s.a)(this,"formatFilter",({value:t})=>{if(!t.options.length)return t.inverted?this.label+" is set":this.label+" has no value";if(t.options.length>1){const e=t.options.map(t=>t.label).join(", ");return t.inverted?`${this.label} is not in [${e}]`:`${this.label} is in [${e}]`}const e=t.options[0].label;return t.inverted?`${this.label} is not ${e}`:`${this.label} is ${e}`}),Object(s.a)(this,"getFilterValue",t=>t&&t.options&&t.options.length?t:void 0),Object(s.a)(this,"getFilterTypes",()=>[{type:"is",label:"Matches",getInitialValue:()=>({inverted:!1,options:[]})}]),this.options=n.options,this.dataType=n.dataType}}e.default=o}}]);