import{a3 as r,bG as e,b as n,bH as t,bo as s,bI as u}from"./p-dc4230e0.js";const i=["MapServer","ImageServer","FeatureServer","SceneServer","StreamServer","VectorTileServer"],c=new RegExp(`^((?:https?:)?\\/\\/\\S+?\\/rest\\/services\\/(.+?)\\/(${i.join("|")}))(?:\\/(?:layers\\/)?(\\d+))?`,"i"),l=new RegExp(`^((?:https?:)?\\/\\/\\S+?\\/([^\\/\\n]+)\\/(${i.join("|")}))(?:\\/(?:layers\\/)?(\\d+))?`,"i");function o(r){return!!c.test(r)}function a(e){const n=r(e),t=n.path.match(c)||n.path.match(l);if(!t)return null;const[,s,u,i,o]=t,a=u.indexOf("/");return{title:f(-1!==a?u.slice(a+1):u),serverType:i,sublayer:null!=o&&""!==o?parseInt(o,10):null,url:{path:s}}}function f(r){return(r=r.replace(/\s*[/_]+\s*/g," "))[0].toUpperCase()+r.slice(1)}function v(r,e){const t=[];if(r){const e=a(r);n(e)&&e.title&&t.push(e.title)}if(e){const r=f(e);t.push(r)}if(2===t.length){if(-1!==t[0].toLowerCase().indexOf(t[1].toLowerCase()))return t[0];if(-1!==t[1].toLowerCase().indexOf(t[0].toLowerCase()))return t[1]}return t.join(" - ")}function p(r){if(!r)return!1;const e=-1!==(r=r.toLowerCase()).indexOf(".arcgis.com/"),n=-1!==r.indexOf("//services")||-1!==r.indexOf("//tiles")||-1!==r.indexOf("//features");return e&&n}function m(r,n){return r?t(e(r,n)):r}function S(s,u,i){if(!u)return{url:u};u=e(u,i);const c=a(r(u).path);let l;return n(c)&&(null!=c.sublayer&&null==s.layerId&&(l=c.sublayer),u=c.url.path),{url:t(u),layerId:l}}function b(r,e,n,t,i){s(e,t,"url",i),t.url&&null!=r.layerId&&(t.url=u(t.url,n,r.layerId.toString()))}function g(r){if(!r)return!1;const e=r.toLowerCase(),n=-1!==e.indexOf("/services/"),t=-1!==e.indexOf("/mapserver/wmsserver"),s=-1!==e.indexOf("/imageserver/wmsserver"),u=-1!==e.indexOf("/wmsserver");return n&&(t||s||u)}export{g as O,v as d,o as f,S as h,f as m,a as p,p as v,m as x,b as y}