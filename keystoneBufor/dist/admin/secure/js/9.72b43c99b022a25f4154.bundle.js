(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{464:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var s=a(5),i=a(6),n=a(8),l=a(1),r=a(91),c=a(310),o=a(121),u=a(13),d=(a(326),a(0));const b=Object(d.forwardRef)(({data:e,loading:t,value:a,refList:c,canRead:b,isMulti:f,search:j,autoFocus:m,serverErrors:g,onChange:h,htmlID:p,setSearch:O,selectProps:y,fetchMore:v,isDisabled:x},N)=>{const $=e&&e[c.gqlNames.listQueryName]?e[c.gqlNames.listQueryName].map(e=>({value:e,label:e._label_})):[],D=g&&g.find(e=>e instanceof Error&&"AccessDeniedError"===e.name);let k=null;const C=e=>"string"==typeof e?$.find(t=>t.value.id===e)||{label:e,value:e}:{label:e._label_,value:e};null!==a&&b&&(f?k=(Array.isArray(a)?a:[]).map(C):a&&(k=C(a)));const M=e&&e[c.gqlNames.listQueryMetaName]?e[c.gqlNames.listQueryMetaName].count:0,R=Object(d.useMemo)(()=>({MenuList:e=>{let{children:t}=e,a=Object(n.a)(e,["children"]);const s=Object(d.useRef)(null),o=r.d`
            query RelationshipSelectMore($search: String!, $first: Int!, $skip: Int!) {
              ${c.gqlNames.listQueryName}(search: $search, first: $first, skip: $skip) {
                _label_
                id
              }
            }
          `;return function(e,t){Object(d.useEffect)(()=>{let a=new IntersectionObserver(e,{}),s=t.current;if(null!==s)return a.observe(s),()=>a.unobserve(s)})}(([{isIntersecting:e}])=>{!a.isLoading&&e&&a.options.length<M&&v({query:o,variables:{search:j,first:50,skip:a.options.length},updateQuery:(e,{fetchMoreResult:t})=>t?Object(i.a)(Object(i.a)({},e),{},{[c.gqlNames.listQueryName]:[...e[c.gqlNames.listQueryName],...t[c.gqlNames.listQueryName]]}):e})},s),Object(l.jsx)(u.f.MenuList,a,t,Object(l.jsx)("div",{css:{textAlign:"center"},ref:s},a.options.length<M&&Object(l.jsx)("span",{css:{padding:8}},"Loading...")))}}),[M,c.gqlNames.listQueryName]);return Object(l.jsx)(o.a,Object(s.a)({onInputChange:e=>O(e),isLoading:t,autoFocus:m,isMulti:f,components:R,getOptionValue:e=>e.value.id,value:k,placeholder:b?void 0:D&&D.message,options:$,onChange:h,id:"react-select-"+p,isClearable:!0,instanceId:p,inputId:p,innerRef:N,menuPortalTarget:document.body,isDisabled:x},y))}),f=({innerRef:e,autoFocus:t,field:a,errors:s,renderContext:i,htmlID:n,onChange:o,isMulti:u,value:f,isDisabled:j})=>{const[m,g]=Object(d.useState)(""),h=a.getRefList(),p=r.d`
    query RelationshipSelect($search: String!, $first: Int!, $skip: Int!) {
      ${h.gqlNames.listQueryName}(search: $search, first: $first, skip: $skip) {
        _label_
        id
      }

      ${h.gqlNames.listQueryMetaName}(search: $search) {
        count
      }
    }
  `,O=!s||s.every(e=>!(e instanceof Error&&"AccessDeniedError"===e.name)),y="dialog"===i?{menuShouldBlockScroll:!0}:null,{data:v,error:x,loading:N,fetchMore:$}=Object(c.a)(p,{fetchPolicy:"network-only",variables:{search:m,first:10,skip:0}});return x?(console.log("ERROR!!!",x),"Error"):Object(l.jsx)(b,{data:v,loading:N,value:f,refList:h,canRead:O,isMulti:u,search:m,autoFocus:t,serverErrors:s,onChange:o,htmlID:n,setSearch:g,selectProps:y,fetchMore:$,ref:e,isDisabled:j})}},488:function(e,t,a){"use strict";a.r(t);var s=a(6),i=a(1),n=a(0),l=a(310),r=a(91),c=a(87),o=a(10),u=a(2),d=a(9),b=a(66),f=a(464),j=a(216);a(169),a(168),a(121),a(326);function m({listKey:e,value:t,onAddUser:a,many:s,isDisabled:n}){const c="authenticated"+e,{data:f}=Object(l.a)(r.d`
    query User {
      ${c} {
        _label_
        id
      }
    }
  `);if(f&&f[c]){const e=f[c].id;if(null!==t&&(s?t.some(t=>t.id===e):t.id===e))return null;const l=`${s?"Add":"Set as"} ${f[c]._label_}`;return Object(i.jsx)(b.a,{placement:"top",content:l},e=>Object(i.jsx)(d.b,{css:{marginLeft:u.d},variant:"ghost",ref:e,onClick:()=>{a(f[c])},icon:o.n,"aria-label":l,isDisabled:n}))}return null}function g({field:e,value:t}){const{many:a}=e.config,{fullPath:s}=e.getRefList();let n,l=!1,r=s;return a?(n="View List of Related Items",t.length||(l=!0),r=`${r}?!id_in="${t.slice(0,100).map(({id:e})=>e).join(",")}"`):(n="View Item Details",t?r=`${r}/${t.id}`:l=!0),Object(i.jsx)(b.a,{placement:"top",content:n},e=>Object(i.jsx)(d.b,{ref:e,icon:o.k,"aria-label":n,variant:"ghost",css:{marginLeft:u.d},target:"_blank",to:r,isDisabled:l}))}function h({field:e,item:t,onCreate:a,isDisabled:l}){const{list:r,openCreateItemModal:c}=Object(j.e)();let f,m=e.getRefList(),g="Create and add "+m.singular;return t&&t.id&&(f=m.fields.filter(t=>"Relationship"===t.type&&t.config.ref===r.key&&t.config.refFieldPath===e.path).reduce((e,a)=>{const i={_label_:t._label_||"<link to parent>",id:t.id};return Object(s.a)(Object(s.a)({},e),{},{[a.path]:a.config.many?[i]:i})},{})),Object(i.jsx)(n.Fragment,null,Object(i.jsx)(b.a,{placement:"top",content:g},e=>Object(i.jsx)(d.b,{ref:e,onClick:c,icon:o.o,"aria-label":g,variant:"ghost",css:{marginLeft:u.d},isDisabled:l})),Object(i.jsx)(j.a,{prefillData:f,onCreate:({data:e})=>{a(e[m.gqlNames.createMutationName])}}))}t.default=({autoFocus:e,field:t,value:a=[],renderContext:s,errors:n,onChange:l,item:r,list:o,isDisabled:u})=>{const{many:d,ref:b}=t.config,{authStrategy:p}=Object(j.d)(),O="ks-input-"+t.path,y=t.getRefList();return Object(i.jsx)(c.a,null,Object(i.jsx)(c.d,{htmlFor:O,field:t,errors:n}),Object(i.jsx)(c.b,{text:t.adminDoc}),Object(i.jsx)(c.c,null,Object(i.jsx)("div",{css:{flex:1}},Object(i.jsx)(f.a,{autoFocus:e,isMulti:d,field:t,value:a,errors:n,renderContext:s,htmlID:O,onChange:e=>{const{many:a}=t.config;l(a?e?e.map(e=>e.value):[]:e?e.value:null)},isDisabled:u})),Object(i.jsx)(j.b,{list:y},Object(i.jsx)(h,{onCreate:e=>{l(d?a.concat(e):e)},field:t,item:r,list:o,isDisabled:u})),p&&b===p.listKey&&Object(i.jsx)(m,{many:d,onAddUser:e=>{l(d?a.concat(e):e)},value:a,listKey:p.listKey,isDisabled:u}),Object(i.jsx)(g,{field:t,value:a})))}}}]);