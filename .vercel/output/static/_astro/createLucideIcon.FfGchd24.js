import{r as e}from"./index.Dt5TeE8z.js";var r,t,o={exports:{}},a={};var i=(t||(t=1,o.exports=function(){if(r)return a;r=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function o(r,t,o){var a=null;if(void 0!==o&&(a=""+o),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in o={},t)"key"!==i&&(o[i]=t[i]);else o=t;return t=o.ref,{$$typeof:e,type:r,key:a,ref:void 0!==t?t:null,props:o}}return a.Fragment=t,a.jsx=o,a.jsxs=o,a}()),o.exports);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=e=>{const r=(e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,t)=>t?t.toUpperCase():r.toLowerCase()))(e);return r.charAt(0).toUpperCase()+r.slice(1)},n=(...e)=>e.filter((e,r,t)=>Boolean(e)&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim(),l=e=>{for(const r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=e.forwardRef(({color:r="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:i="",children:s,iconNode:d,...f},u)=>e.createElement("svg",{ref:u,...c,width:t,height:t,stroke:r,strokeWidth:a?24*Number(o)/Number(t):o,className:n("lucide",i),...!s&&!l(f)&&{"aria-hidden":"true"},...f},[...d.map(([r,t])=>e.createElement(r,t)),...Array.isArray(s)?s:[s]])),f=(r,t)=>{const o=e.forwardRef(({className:o,...a},i)=>{return e.createElement(d,{ref:i,iconNode:t,className:n(`lucide-${l=s(r),l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${r}`,o),...a});var l});return o.displayName=s(r),o};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */export{f as c,i as j};
