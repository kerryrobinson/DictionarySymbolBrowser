import"./p-476cf7c4.js";import{a_ as e,a$ as r,U as n,b as t,O as o,m as s,M as c}from"./p-dc4230e0.js";import{a as i,p as a,i as u}from"./p-78ce4926.js";const l=i(-.5,-.5,-.5,.5,.5,.5),f=i(-.5,-.5,0,.5,.5,1),y=i(-.5,-.5,0,.5,.5,.5);function m(e){switch(e){case"sphere":case"cube":case"diamond":return l;case"cylinder":case"cone":case"inverted-cone":return f;case"tetrahedron":return y;default:return}}let p=d();function d(){return new r(50)}function b(){p=d()}function h(e,r){if("icon"===e.type)return v(e,r);if("object"===e.type)return j(e,r);throw new s("symbol3d:unsupported-symbol-layer","computeLayerSize only works with symbol layers of type Icon and Object")}async function w(r,n){if("icon"===r.type)return function(e,r){return v(e,r).then((r=>{if(null==e.size)return r;const n=r[0]/r[1];return n>1?[e.size,e.size/n]:[e.size*n,e.size]}))}(r,n);if("object"===r.type)return async function(r,n){return function(r,{isPrimitive:n,width:t,depth:o,height:s}){const c=n?10:1;if(null==t&&null==s&&null==o)return[c*r[0],c*r[1],c*r[2]];const i=e(t,o,s);let a;for(let e=0;e<3;e++){const n=i[e];if(null!=n){a=n/r[e];break}}for(let e=0;e<3;e++)null==i[e]&&(i[e]=r[e]*a);return i}(await j(r,n),r)}(r,n);throw new s("symbol3d:unsupported-symbol-layer","computeLayerSize only works with symbol layers of type Icon and Object")}async function v(e,r){if(e.resource.href)return(n=e.resource.href,c(n,{responseType:"image"}).then((e=>e.data))).then((e=>[e.width,e.height]));var n;if(e.resource.primitive)return t(r)?[r,r]:[256,256];throw new s("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function j(e,r){return async function(e,r){if(!e.isPrimitive){const r=e.resource.href,t=p.get(r);if(void 0!==t)return n(t);const o=await import("./p-f565a0c9.js").then((function(e){return e.o})),s=await o.fetch(r,{disableTextures:!0});return p.put(r,s.referenceBoundingBox),s.referenceBoundingBox}let c=null;if(e.resource&&e.resource.primitive&&(c=u(m(e.resource.primitive)),t(r)))for(let e=0;e<c.length;e++)c[e]*=r;return c?n(c):o(new s("symbol:invalid-resource","The symbol does not have a valid resource"))}(e,r).then((e=>a(e)))}export{b as clearBoundingBoxCache,v as computeIconLayerResourceSize,h as computeLayerResourceSize,w as computeLayerSize,j as computeObjectLayerResourceSize}