import"./p-476cf7c4.js";import{h as e,i as r,O as n,y as t,U as o,c as a,w as c,x as i,f as s,u,z as l}from"./p-dc4230e0.js";import{h as f,f as E,L as d,N as w,D as N,o as h,J as I,I as m,B as v,S as y,a as p,g as T,_ as O,j as R,b as U,u as b,c as A,m as M,p as g,A as D,d as S,v as x,F,e as C,X as P,K as L,q as k,y as j,i as _,Z as V,w as B,E as Y,O as G,k as z,T as H,l as q,n as W,r as K,t as X,P as J,s as Q,x as Z,z as $}from"./p-aa6688d1.js";import"./p-7edcde15.js";import"./p-643e1e47.js";import"./p-66f366a9.js";import"./p-ebb65ba7.js";import"./p-78c83631.js";import"./p-43d5e67f.js";import"./p-7b4a37d3.js";import"./p-76e49c46.js";import"./p-5f01bb6f.js";import"./p-c953f9af.js";import{registerFunctions as ee}from"./p-60710d30.js";function re(e){return e instanceof Error?n(e):n(new Error(e))}function ne(e){return o(e)}function te(e,n){const t=[];for(let r=0;r<n.arguments.length;r++)t.push(ce(e,n.arguments[r]));return r(t)}function oe(r,n,t){return e(((e,o)=>{te(r,n).then((a=>{try{e(t(r,n,a))}catch(e){o(e)}}),o)}))}function ae(e,r,n){try{return te(e,r).then((t=>{try{const c=n(e,r,t);return(a=c)&&"function"==typeof a.then?c:o(c)}catch(e){return re(e)}var a}))}catch(e){return re(e)}}function ce(t,c){try{switch(c.type){case"VariableDeclarator":return function(r,n){try{let t=null;return t=null===n.init?o(null):ce(r,n.init),t.then(null!==r.localScope?t=>e((e=>{if(t===C&&(t=null),"Identifier"!==n.id.type)throw new Error("Can only assign a regular variable");const o=n.id.name.toLowerCase();r.localScope[o]={value:t,valueset:!0,node:n.init},e(C)})):t=>e((e=>{if("Identifier"!==n.id.type)throw new Error("Can only assign a regular variable");const o=n.id.name.toLowerCase();t===C&&(t=null),r.globalScope[o]={value:t,valueset:!0,node:n.init},e(C)})))}catch(e){return re(e)}}(t,c);case"VariableDeclaration":return Ne(t,c,0);case"BlockStatement":return function(e,r){try{return we(e,r,0)}catch(e){return re(e)}}(t,c);case"FunctionDeclaration":return function(e,r){try{const n=r.id.name.toLowerCase();return e.globalScope[n]={valueset:!0,node:null,value:new U(r,e)},o(C)}catch(e){return re(e)}}(t,c);case"ReturnStatement":return i=t,s=c,e(((e,r)=>{null===s.argument?e(new q(C)):ce(i,s.argument).then((n=>{try{e(new q(n))}catch(e){r(e)}}),r)}));case"IfStatement":return function(r,n){return e(((e,t)=>{"AssignmentExpression"!==n.test.type&&"UpdateExpression"!==n.test.type?ce(r,n.test).then((o=>{try{!0===o?ce(r,n.consequent).then(e,t):!1===o?null!==n.alternate?ce(r,n.alternate).then(e,t):e(C):t(new Error(S(n.test,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION")))}catch(e){t(e)}}),t):t(new Error(S(n.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION")))}))}(t,c);case"ExpressionStatement":return function(r,t){try{return"AssignmentExpression"===t.expression.type?ce(r,t.expression):ce(r,t.expression).then((r=>e((e=>{e(r===C?C:new H(r))}))))}catch(e){return n(e)}}(t,c);case"UpdateExpression":return function(r,t){try{const n=t.argument;if("MemberExpression"===n.type){const a={t:null};return ce(r,n.object).then((e=>{let t=null;return a.t=e,!0===n.computed?t=ce(r,n.property):"Identifier"===n.property.type&&(t=o(n.property.name)),t})).then((r=>e((e=>{const n=a.t;let o;if(V(n)){if(!B(r))throw new Error("Invalid Parameter");if(r<0&&(r=n.length+r),r<0||r>=n.length)throw new Error("Assignment outside of array bounds");o=P(n[r]),n[r]="++"===t.operator?o+1:o-1}else if(n instanceof _){if(!1===F(r))throw new Error("Dictionary accessor must be a string");if(!0!==n.hasField(r))throw new Error("Invalid Parameter");o=P(n.field(r)),n.setField(r,"++"===t.operator?o+1:o-1)}else{if(!(n instanceof T))throw Y(n)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===F(r))throw new Error("Feature accessor must be a string");if(!0!==n.hasField(r))throw new Error("Invalid Parameter");o=P(n.field(r)),n.setField(r,"++"===t.operator?o+1:o-1)}e(!1===t.prefix?o:"++"===t.operator?o+1:o-1)}))))}return e(((e,n)=>{const o="Identifier"===t.argument.type?t.argument.name.toLowerCase():"";if(!o)throw new Error("Invalid identifier");let a;return null!==r.localScope&&void 0!==r.localScope[o]?(a=P(r.localScope[o].value),r.localScope[o]={value:"++"===t.operator?a+1:a-1,valueset:!0,node:t},void e(!1===t.prefix?a:"++"===t.operator?a+1:a-1)):void 0!==r.globalScope[o]?(a=P(r.globalScope[o].value),r.globalScope[o]={value:"++"===t.operator?a+1:a-1,valueset:!0,node:t},void e(!1===t.prefix?a:"++"===t.operator?a+1:a-1)):void n(new Error("Variable not recognised"))}))}catch(e){return n(e)}}(t,c);case"AssignmentExpression":return function(r,n){return e(((e,t)=>{const a=n.left;if("MemberExpression"===a.type)ce(r,n.right).then((c=>{try{ce(r,a.object).then((i=>{try{let s=null;if(!0===a.computed)s=ce(r,a.property);else{if("Identifier"!==a.property.type)throw new Error("Expected computed or identifier for assignemnt target");s=o(a.property.name)}s.then((r=>{try{if(V(i)){if(!B(r))throw new Error("Invalid Parameter");if(r<0&&(r=i.length+r),r<0||r>i.length)throw new Error("Assignment outside of array bounds");if(r===i.length){if("="!==n.operator)throw new Error("Invalid Parameter");i[r]=de(c,n.operator,i[r],n)}else i[r]=de(c,n.operator,i[r],n)}else if(i instanceof _){if(!1===F(r))throw new Error("Dictionary accessor must be a string");if(!0===i.hasField(r))i.setField(r,de(c,n.operator,i.field(r),n));else{if("="!==n.operator)throw new Error("Invalid Parameter");i.setField(r,de(c,n.operator,null,n))}}else{if(!(i instanceof T))throw Y(i)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===F(r))throw new Error("Feature accessor must be a string");if(!0===i.hasField(r))i.setField(r,de(c,n.operator,i.field(r),n));else{if("="!==n.operator)throw new Error("Invalid Parameter");i.setField(r,de(c,n.operator,null,n))}}e(C)}catch(e){t(e)}}),t)}catch(e){t(e)}}),t)}catch(e){t(e)}}),t);else{const o=a.name.toLowerCase();if(null!==r.localScope&&void 0!==r.localScope[o])return void ce(r,n.right).then((a=>{try{r.localScope[o]={value:de(a,n.operator,r.localScope[o].value,n),valueset:!0,node:n.right},e(C)}catch(e){t(e)}}),t);void 0!==r.globalScope[o]?ce(r,n.right).then((a=>{try{r.globalScope[o]={value:de(a,n.operator,r.globalScope[o].value,n),valueset:!0,node:n.right},e(C)}catch(e){t(e)}}),t):t(new Error("Cannot assign undeclared variable"))}}))}(t,c);case"ForStatement":return function(r,t){try{return null!==t.init?ce(r,t.init).then((()=>e(((e,n)=>{se(r,t,{testResult:!0,lastAction:C},(r=>{e(r)}),(e=>{n(e)}),0)})))):e(((e,n)=>{se(r,t,{testResult:!0,lastAction:C},(r=>{e(r)}),(e=>{n(e)}),0)}))}catch(e){return n(e)}}(t,c);case"ForInStatement":return function(r,n){return e(((e,t)=>{ce(r,n.right).then((a=>{try{let c=null;c="VariableDeclaration"===n.left.type?ce(r,n.left):o(),c.then((()=>{try{let o="";if("VariableDeclaration"===n.left.type){const e=n.left.declarations[0].id;"Identifier"===e.type&&(o=e.name)}else"Identifier"===n.left.type&&(o=n.left.name);if(!o)throw new Error(S(n,"RUNTIME","INVALIDVARIABLE"));o=o.toLowerCase();let c=null;if(null!==r.localScope&&void 0!==r.localScope[o]&&(c=r.localScope[o]),null===c&&void 0!==r.globalScope[o]&&(c=r.globalScope[o]),null===c)return void t(new Error(S(n,"RUNTIME","VARIABLENOTDECLARED")));V(a)||F(a)?fe(r,n,a,{reject:t,resolve:e},c):Y(a)?function(e,r,n,t,o,a){try{if(void 0===a&&(a="i"),0===n.length)return void t.resolve(C);le(e,r,n,o,0,a,(e=>{t.resolve(e)}),(e=>{t.reject(e)}),0)}catch(e){t.reject(e)}}(r,n,a,{reject:t,resolve:e},c):a instanceof _||a instanceof T?function(e,r,n,t,o){try{fe(e,r,n.keys(),t,o,"k")}catch(e){t.reject(e)}}(r,n,a,{reject:t,resolve:e},c):z(a)?Ee(a.iterator(r.abortSignal),r,n,a,c,(r=>{e(r)}),(e=>{t(e)}),0):fe(r,n,[],{reject:t,resolve:e},c)}catch(e){t(e)}}),t)}catch(e){t(e)}}),t)}))}(t,c);case"BreakStatement":return o(O);case"EmptyStatement":return o(C);case"ContinueStatement":return o(R);case"TemplateElement":return function(e,r){return o(r.value?r.value.cooked:"")}(0,c);case"TemplateLiteral":return function(r,n){return e((e=>{const t=[];G(n.expressions,((e,n,o)=>ce(r,n).then((e=>{t[o]=L(e)})))).then((()=>{let r="",o=0;for(const e of n.quasis)r+=e.value?e.value.cooked:"",!1===e.tail&&(r+=t[o]?t[o]:"",o++);e(r)}))}))}(t,c);case"Identifier":return me(t,c);case"MemberExpression":return function(r,t){try{return ce(r,t.object).then((c=>{try{return null===c?n(new Error(S(t,"RUNTIME","NOTFOUND"))):!1===t.computed?"Identifier"===t.property.type?c instanceof _||c instanceof T?o(c.field(t.property.name)):c instanceof a?o(Ie(c,t.property.name,0,t)):n(new Error(S(t,"RUNTIME","INVALIDTYPE"))):n(new Error(S(t,"RUNTIME","INVALIDTYPE"))):ce(r,t.property).then((r=>e(((e,n)=>{if(c instanceof _||c instanceof T)F(r)?e(c.field(r)):n(new Error(S(t,"RUNTIME","INVALIDTYPE")));else if(c instanceof a)F(r)?e(Ie(c,r,0,t)):n(new Error(S(t,"RUNTIME","INVALIDTYPE")));else if(V(c))if(B(r)&&isFinite(r)&&Math.floor(r)===r){if(r<0&&(r=c.length+r),r>=c.length||r<0)throw new Error(S(t,"RUNTIME","OUTOFBOUNDS"));e(c[r])}else n(new Error(S(t,"RUNTIME","INVALIDTYPE")));else if(Y(c))if(B(r)&&isFinite(r)&&Math.floor(r)===r){if(r<0&&(r=c.length()+r),r>=c.length()||r<0)throw new Error(S(t,"RUNTIME","OUTOFBOUNDS"));e(c.get(r))}else n(new Error(S(t,"RUNTIME","INVALIDTYPE")));else if(F(c))if(B(r)&&isFinite(r)&&Math.floor(r)===r){if(r<0&&(r=c.length+r),r>=c.length||r<0)throw new Error(S(t,"RUNTIME","OUTOFBOUNDS"));e(c[r])}else n(new Error(S(t,"RUNTIME","INVALIDTYPE")));else n(new Error(S(t,"RUNTIME","INVALIDTYPE")))}))))}catch(e){return re(e)}}))}catch(e){return re(e)}}(t,c);case"Literal":return ne(c.value);case"CallExpression":return function(e,r){try{if("Identifier"!==r.callee.type)return re(S(r,"RUNTIME","ONLYNODESSUPPORTED"));if(null!==e.localScope&&void 0!==e.localScope[r.callee.name.toLowerCase()]){const n=e.localScope[r.callee.name.toLowerCase()];return n.value instanceof y?n.value.fn(e,r):n.value instanceof U?Ae(e,r,n.value.definition):re(S(r,"RUNTIME","NOTAFUNCTION"))}if(void 0!==e.globalScope[r.callee.name.toLowerCase()]){const n=e.globalScope[r.callee.name.toLowerCase()];return n.value instanceof y?n.value.fn(e,r):n.value instanceof U?Ae(e,r,n.value.definition):re(S(r,"RUNTIME","NOTAFUNCTION"))}return re(S(r,"RUNTIME","NOTFOUND"))}catch(e){return re(e)}}(t,c);case"UnaryExpression":return function(r,n){try{return ce(r,n.argument).then((r=>e(((e,t)=>{m(r)&&"!"===n.operator?e(!r):"-"===n.operator?e(-1*P(r)):"+"===n.operator?e(1*P(r)):"~"===n.operator?e(~P(r)):t(new Error(S(n,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR")))}))))}catch(e){return re(e)}}(t,c);case"BinaryExpression":return function(n,t){try{return r([ce(n,t.left),ce(n,t.right)]).then((r=>e(((e,n)=>{const o=r[0],a=r[1];switch(t.operator){case"|":case"<<":case">>":case">>>":case"^":case"&":e(j(P(o),P(a),t.operator));case"==":e(v(o,a));break;case"!=":e(!v(o,a));break;case"<":case">":case"<=":case">=":e(k(o,a,t.operator));break;case"+":F(o)||F(a)?e(L(o)+L(a)):e(P(o)+P(a));break;case"-":e(P(o)-P(a));break;case"*":e(P(o)*P(a));break;case"/":e(P(o)/P(a));break;case"%":e(P(o)%P(a));break;default:n(new Error(S(t,"RUNTIME","OPERATORNOTRECOGNISED")))}}))))}catch(e){return re(e)}}(t,c);case"LogicalExpression":return function(r,n){return e(((e,t)=>{"AssignmentExpression"!==n.left.type&&"UpdateExpression"!==n.left.type?"AssignmentExpression"!==n.right.type&&"UpdateExpression"!==n.right.type?ce(r,n.left).then((o=>{try{if(!m(o))throw new Error(S(n,"RUNTIME","ONLYBOOLEAN"));switch(n.operator){case"||":!0===o?e(o):ce(r,n.right).then((r=>{try{if(!m(r))throw new Error(S(n,"RUNTIME","ONLYORORAND"));e(r)}catch(e){t(e)}}),t);break;case"&&":!1===o?e(o):ce(r,n.right).then((r=>{try{if(!m(r))throw new Error(S(n,"RUNTIME","ONLYORORAND"));e(r)}catch(e){t(e)}}),t);break;default:throw new Error(S(n,"RUNTIME","ONLYORORAND"))}}catch(e){t(e)}}),t):t(new Error(S(n.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"))):t(new Error(S(n.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION")))}))}(t,c);case"ConditionalExpression":return re(S(c,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return function(n,t){try{const o=[];for(let e=0;e<t.elements.length;e++)o.push(ce(n,t.elements[e]));return r(o).then((r=>e(((e,n)=>{for(let e=0;e<r.length;e++){if(x(r[e]))return void n(new Error(S(t,"RUNTIME","FUNCTIONCONTEXTILLEGAL")));r[e]===C&&(r[e]=null)}e(r)}))))}catch(e){return re(e)}}(t,c);case"ObjectExpression":return function(n,t){try{const o=[];for(let e=0;e<t.properties.length;e++)o.push(ce(n,t.properties[e]));return r(o).then((r=>e((e=>{const n={};for(let e=0;e<r.length;e++){const t=r[e];if(x(t.value))throw new Error("Illegal Argument");if(!1===F(t.key))throw new Error("Illegal Argument");n[t.key.toString()]=t.value===C?null:t.value}const t=new _(n);t.immutable=!1,e(t)}))))}catch(e){return re(e)}}(t,c);case"Property":return function(r,t){try{return ce(r,t.value).then((n=>e((e=>{"Identifier"===t.key.type?e({key:t.key.name,value:n}):ce(r,t.key).then((r=>{e({key:r,value:n})}))}))))}catch(e){return n(e)}}(t,c);default:return re(S(c,"RUNTIME","UNREOGNISED"))}}catch(e){return re(e)}var i,s}function ie(e,r,t){try{return ce(e,r.body).then((a=>{try{return t.lastAction=a,t.lastAction===O||t.lastAction instanceof q?(t.testResult=!1,o(t)):null!==r.update?ce(e,r.update).then((()=>o(t))):o(t)}catch(e){return n(e)}}))}catch(e){return n(e)}}function se(e,r,t,a,c,i){try{(function(e,r,t){try{return null!==r.test?ce(e,r.test).then((a=>{try{return!0===e.abortSignal.aborted?n(new Error("Cancelled")):(t.testResult=a,!1===t.testResult?o(t):!0!==t.testResult?n(new Error(S(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))):ie(e,r,t))}catch(e){return n(e)}})):ie(e,r,t)}catch(e){return n(e)}})(e,r,t).then((()=>{try{!0===t.testResult?++i>100?(i=0,setTimeout((()=>{se(e,r,t,a,c,i)}),0)):se(e,r,t,a,c,i):a(t.lastAction instanceof q?t.lastAction:C)}catch(e){c(e)}}),(e=>{c(e)}))}catch(e){c(e)}}function ue(e,r,n,t,o,a,c,i,s,u){try{if(t<=a)return void i(C);o.value="k"===c?n[a]:a,ce(e,r.body).then((l=>{try{l instanceof q?i(l):l===O?i(C):++u>100?(u=0,setTimeout((()=>{ue(e,r,n,t,o,a+1,c,i,s,u)}),0)):ue(e,r,n,t,o,a+1,c,i,s,u)}catch(e){s(e)}}),(e=>{s(e)}))}catch(e){s(e)}}function le(e,r,n,t,o,a,c,i,s){try{if(n.length()<=o)return void c(C);t.value="k"===a?n.get(o):o,ce(e,r.body).then((u=>{u instanceof q?c(u):u===O?c(C):++s>100?(s=0,setTimeout((()=>{le(e,r,n,t,o+1,a,c,i,s)}),0)):le(e,r,n,t,o+1,a,c,i,s)}),(e=>{i(e)}))}catch(e){i(e)}}function fe(e,r,n,t,o,a){try{if(void 0===a&&(a="i"),0===n.length)return void t.resolve(C);ue(e,r,n,n.length,o,0,a,(e=>{t.resolve(e)}),(e=>{t.reject(e)}),0)}catch(e){t.reject(e)}}function Ee(e,r,n,t,o,a,c,i){try{e.next().then((s=>{try{if(null===s)a(C);else{const u=T.createFromGraphicLikeObject(s.geometry,s.attributes,t);u._underlyingGraphic=s,o.value=u,ce(r,n.body).then((s=>{try{s===O?a(C):s instanceof q?a(s):++i>100?(i=0,setTimeout((()=>{Ee(e,r,n,t,o,a,c,i)}),0)):Ee(e,r,n,t,o,a,c,i)}catch(e){c(e)}}),(e=>{c(e)}))}}catch(e){c(e)}}),(e=>{c(e)}))}catch(e){c(e)}}function de(e,r,n,t){switch(r){case"=":return e===C?null:e;case"/=":return P(n)/P(e);case"*=":return P(n)*P(e);case"-=":return P(n)-P(e);case"+=":return F(n)||F(e)?L(n)+L(e):P(n)+P(e);case"%=":return P(n)%P(e);default:throw new Error(S(t,"RUNTIME","OPERATORNOTRECOGNISED"))}}function we(r,n,t){try{return t>=n.body.length?o(C):e(((e,o)=>{ce(r,n.body[t]).then((a=>{try{a instanceof q||a===O||a===R||t===n.body.length-1?e(a):we(r,n,t+1).then(e,o)}catch(e){o(e)}}),o)}))}catch(e){return re(e)}}function Ne(r,n,t){return e(((e,o)=>{t>=n.declarations.length?e(C):ce(r,n.declarations[t]).then((()=>{t===n.declarations.length-1?e(C):Ne(r,n,t+1).then((()=>{e(C)}),o)}),o)}))}let he=0;function Ie(e,r,n,t){let o;switch(r=r.toLowerCase()){case"hasz":{const r=e.hasZ;return void 0!==r&&r}case"hasm":{const r=e.hasM;return void 0!==r&&r}case"spatialreference":{let r=e.spatialReference._arcadeCacheId;if(void 0===r){let n=!0;Object.freeze&&Object.isFrozen(e.spatialReference)&&(n=!1),n&&(he++,e.spatialReference._arcadeCacheId=he,r=he)}const n=new _({wkt:e.spatialReference.wkt,wkid:e.spatialReference.wkid});return void 0!==r&&(n._arcadeCacheId="SPREF"+r.toString()),n}}switch(e.type){case"extent":switch(r){case"xmin":case"xmax":case"ymin":case"ymax":case"zmin":case"zmax":case"mmin":case"mmax":{const n=e[r];return void 0!==n?n:null}case"type":return"Extent"}break;case"polygon":switch(r){case"rings":return o=e.cache._arcadeCacheId,void 0===o&&(he++,o=he,e.cache._arcadeCacheId=o),new K(e.rings,e.spatialReference,!0===e.hasZ,!0===e.hasM,o);case"type":return"Polygon"}break;case"point":switch(r){case"x":case"y":case"z":case"m":return void 0!==e[r]?e[r]:null;case"type":return"Point"}break;case"polyline":switch(r){case"paths":return o=e.cache._arcadeCacheId,void 0===o&&(he++,o=he,e.cache._arcadeCacheId=o),new K(e.paths,e.spatialReference,!0===e.hasZ,!0===e.hasM,o);case"type":return"Polyline"}break;case"multipoint":switch(r){case"points":return o=e.cache._arcadeCacheId,void 0===o&&(he++,o=he,e.cache._arcadeCacheId=o),new W(e.points,e.spatialReference,!0===e.hasZ,!0===e.hasM,o,1);case"type":return"Multipoint"}}throw new Error(S(t,"RUNTIME","PROPERTYNOTFOUND"))}function me(r,n){return e(((e,t)=>{const o=n.name.toLowerCase();if(null===r.localScope||void 0===r.localScope[o])if(void 0===r.globalScope[o])t(new Error(S(n,"RUNTIME","VARIABLENOTFOUND")));else{const n=r.globalScope[o];!0===n.valueset?e(n.value):null!==n.d?n.d.then(e,t):(n.d=ce(r,n.node),n.d.then((r=>{try{n.value=r,n.valueset=!0,e(r)}catch(e){t(e)}}),t))}else{const n=r.localScope[o];!0===n.valueset?e(n.value):null!==n.d?n.d.then(e,t):(n.d=ce(r,n.node),n.d.then((r=>{try{n.value=r,n.valueset=!0,e(r)}catch(e){t(e)}}),t))}}))}const ve={};function ye(e){return null===e?"":V(e)||Y(e)?"Array":J(e)?"Date":F(e)?"String":m(e)?"Boolean":B(e)?"Number":e instanceof Q?"Attachment":e instanceof Z?"Portal":e instanceof _?"Dictionary":e instanceof T?"Feature":e instanceof c?"Point":e instanceof i?"Polygon":e instanceof s?"Polyline":e instanceof u?"Multipoint":e instanceof l?"Extent":x(e)?"Function":z(e)?"FeatureSet":$(e)?"FeatureSetCollection":e===C?"":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function pe(r,n,t,o){return e(((e,a)=>{ce(r,n.arguments[t]).then((c=>{try{if(v(c,o))return void ce(r,n.arguments[t+1]).then(e,a);{const c=n.arguments.length-t;return 1===c?void ce(r,n.arguments[t]).then(e,a):(2===c&&e(null),3===c?void ce(r,n.arguments[t+2]).then(e,a):void pe(r,n,t+2,o).then(e,a))}}catch(e){a(e)}}),a)}))}function Te(r,n,t,o){return e(((e,a)=>{!0===o?ce(r,n.arguments[t+1]).then(e,a):3==n.arguments.length-t?ce(r,n.arguments[t+2]).then(e,a):ce(r,n.arguments[t+2]).then((o=>{try{if(!1===m(o))return void a(new Error("WHEN needs boolean test conditions"));Te(r,n,t+2,o).then(e,a)}catch(e){a(e)}}))}))}function Oe(n,t){try{const a=n.length,c=Math.floor(a/2);return 0===a?o([]):1===a?o([n[0]]):e(((e,o)=>{const i=[Oe(n.slice(0,c),t),Oe(n.slice(c,a),t)];r(i).then((r=>{try{Re(r[0],r[1],t,[]).then(e,o)}catch(e){o(e)}}),o)}))}catch(e){return re(e)}}function Re(r,n,t,o){return e(((e,a)=>{const c=o;r.length>0||n.length>0?r.length>0&&n.length>0?t(r[0],n[0]).then((i=>{try{isNaN(i)&&(i=1),i<=0?(c.push(r[0]),r=r.slice(1)):(c.push(n[0]),n=n.slice(1)),Re(r,n,t,o).then(e,a)}catch(e){a(e)}}),a):r.length>0?(c.push(r[0]),Re(r=r.slice(1),n,t,o).then(e,a)):n.length>0&&(c.push(n[0]),n=n.slice(1),Re(r,n,t,o).then(e,a)):e(o)}))}function Ue(e,r){const n=e.length,t=Math.floor(n/2);return r||(r=function(e,r){return e<r?-1:e===r?0:1}),0===n?[]:1===n?[e[0]]:function(e,r,n){const t=[];for(;e.length>0||r.length>0;)if(e.length>0&&r.length>0){let o=n(e[0],r[0]);isNaN(o)&&(o=1),o<=0?(t.push(e[0]),e=e.slice(1)):(t.push(r[0]),r=r.slice(1))}else e.length>0?(t.push(e[0]),e=e.slice(1)):r.length>0&&(t.push(r[0]),r=r.slice(1));return t}(Ue(e.slice(0,t),r),Ue(e.slice(t,n),r),r)}function be(r,t,o){try{const n=r.body;if(o.length!==r.params.length)return re(new Error("Invalid Parameter calls to function."));for(let e=0;e<o.length;e++){const n=r.params[e];"Identifier"===n.type&&(t.localScope[n.name.toLowerCase()]={d:null,value:o[e],valueset:!0,node:null})}return ce(t,n).then((r=>e(((e,n)=>{r instanceof q?e(r.value):r!==O?r!==R?e(r instanceof H?r.value:r):n(new Error("Cannot Continue from a Function")):n(new Error("Cannot Break from a Function"))}))))}catch(e){return n(e)}}function Ae(e,r,n){return ae(e,r,(function(r,t,o){const a={spatialReference:e.spatialReference,services:e.services,console:e.console,lrucache:e.lrucache,localScope:{},abortSignal:e.abortSignal,globalScope:e.globalScope,depthCounter:e.depthCounter+1};if(a.depthCounter>64)throw new Error("Exceeded maximum function depth");return be(n,a,o)}))}function Me(e){return function(){const r={abortSignal:e.context.abortSignal,spatialReference:e.context.spatialReference,console:e.context.console,lrucache:e.context.lrucache,services:e.context.services,localScope:{},globalScope:e.context.globalScope,depthCounter:e.context.depthCounter+1};if(r.depthCounter>64)throw new Error("Exceeded maximum function depth");return be(e.definition,r,arguments)}}f(ve,oe),E(ve,oe),d(ve,oe),w(ve,oe),N(ve,oe),h(ve,oe),ee({functions:ve,compiled:!1,signatures:null,failDefferred:null,evaluateIdentifier:null,arcadeCustomFunctionHandler:null,mode:"async",standardFunction:oe,standardFunctionAsync:ae}),ve.typeof=function(e,r){return oe(e,r,(function(e,r,n){I(n,1,1);const t=ye(n[0]);if("Unrecognised Type"===t)throw new Error("Unrecognised Type");return t}))},ve.iif=function(n,t){return e(((e,o)=>{I(null===t.arguments?[]:t.arguments,3,3),ce(n,t.arguments[0]).then((a=>{try{if(!1===m(a))return void o(new Error("IF Function must have a boolean test condition"));r([ce(n,t.arguments[1]),ce(n,t.arguments[2])]).then((r=>{e(a?r[0]:r[1])}),o)}catch(e){o(e)}}),o)}))},ve.decode=function(r,n){return e(((e,t)=>{n.arguments.length<2?t(new Error("Missing Parameters")):2!==n.arguments.length?(n.arguments.length-1)%2!=0?ce(r,n.arguments[0]).then((o=>{try{pe(r,n,1,o).then(e,t)}catch(e){t(e)}}),t):t(new Error("Must have a default value result.")):ce(r,n.arguments[1]).then(e,t)}))},ve.when=function(r,n){try{return n.arguments.length<3?re("Missing Parameters"):n.arguments.length%2==0?re("Must have a default value result."):ce(r,n.arguments[0]).then((t=>e(((e,o)=>{!1!==m(t)?Te(r,n,0,t).then(e,o):o(new Error("WHEN needs boolean test conditions"))}))))}catch(e){return re(e)}},ve.sort=function(e,r){return ae(e,r,(function(e,r,n){I(n,1,2);let t=n[0];if(Y(t)&&(t=t.toArray()),!1===V(t))return re(Error("Illegal Argument"));if(n.length>1)return!1===x(n[1])?re(Error("Illegal Argument")):Oe(t,Me(n[1]));{let e=t;if(0===e.length)return o([]);const r={};for(let n=0;n<e.length;n++){const t=ye(e[n]);""!==t&&(r[t]=!0)}if(!0===r.Array||!0===r.Dictionary||!0===r.Feature||!0===r.Point||!0===r.Polygon||!0===r.Polyline||!0===r.Multipoint||!0===r.Extent||!0===r.Function)return o(e.slice(0));let n=0,a="";for(const e in r)n++,a=e;return n>1||"String"===a?e=Ue(e,(function(e,r){if(null==e||e===C)return null==r||r===C?0:1;if(null==r||r===C)return-1;const n=L(e),t=L(r);return n<t?-1:n===t?0:1})):"Number"===a?e=Ue(e,(function(e,r){return e-r})):"Boolean"===a?e=Ue(e,(function(e,r){return e===r?0:r?-1:1})):"Date"===a&&(e=Ue(e,(function(e,r){return r-e}))),o(e)}}))};const ge={failDefferred:re,resolveDeffered:ne,fixSpatialReference:X,parseArguments:te,standardFunction:oe,standardFunctionAsync:ae,evaluateIdentifier:me,arcadeCustomFunction:Me};for(const e in ve)ve[e]={value:new y(ve[e]),valueset:!0,node:null};const De=function(){};function Se(e){console.log(e)}(De.prototype=ve).infinity={value:Number.POSITIVE_INFINITY,valueset:!0,node:null},De.prototype.pi={value:Math.PI,valueset:!0,node:null};const xe=ge;function Fe(e){const r={mode:"async",compiled:!1,functions:{},signatures:[],standardFunction:oe,standardFunctionAsync:ae,failDefferred:re,evaluateIdentifier:me,arcadeCustomFunctionHandler:Me};for(let n=0;n<e.length;n++)e[n].registerFunctions(r);for(const e in r.functions)ve[e]={value:new y(r.functions[e]),valueset:!0,node:null},De.prototype[e]=ve[e];for(let e=0;e<r.signatures.length;e++)p(r.signatures[e],"async")}function Ce(r,n){let o=n.spatialReference;null==o&&(o=new t({wkid:102100}));const a=function(e,r){const n=new De;null==e&&(e={}),null==r&&(r={});const t=new _({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});t.immutable=!1,n.textformatting={value:t,valueset:!0,node:null};for(const e in r)n[e]={value:new y(r[e]),native:!0,valueset:!0,node:null};for(const r in e)n[r]=e[r]&&"esri.Graphic"===e[r].declaredClass?{value:T.createFromGraphic(e[r]),valueset:!0,node:null}:{value:e[r],valueset:!0,node:null};return n}(n.vars,n.customfunctions);return ce({spatialReference:o,services:n.services,abortSignal:null==n.abortSignal?{aborted:!1}:n.abortSignal,globalScope:a,console:n.console?n.console:Se,lrucache:n.lrucache,localScope:null,depthCounter:1},r.body[0].body).then((r=>e(((e,n)=>{r instanceof q&&(r=r.value),r instanceof H&&(r=r.value),r===C&&(r=null),r!==O?r!==R?r instanceof y||r instanceof U?n(new Error("Cannot return FUNCTION")):e(r):n(new Error("Cannot return CONTINUE")):n(new Error("Cannot return BREAK"))}))))}function Pe(e){return b(e)}function Le(e,r){return A(e,r,"full")}function ke(e,r){return M(e,r)}function je(e,r){return g(e,r)}function _e(e){return D(e)}export{Ce as executeScript,Fe as extend,Pe as extractFieldLiterals,_e as findFunctionCalls,xe as functionHelper,je as referencesFunction,ke as referencesMember,Le as validateScript}