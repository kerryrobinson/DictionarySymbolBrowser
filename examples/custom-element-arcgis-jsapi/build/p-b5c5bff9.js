import{a3 as e}from"./p-dc4230e0.js";function t(e,t){let n={query:e};return t&&(n={...t,...n}),n}function n(t){return"string"==typeof t?e(t):t}function o(e,t,n){const r={};for(const f in e){if("declaredClass"===f)continue;const i=e[f];if(null!=i&&"function"!=typeof i)if(Array.isArray(i)){r[f]=[];for(let e=0;e<i.length;e++)r[f][e]=o(i[e])}else if("object"==typeof i)if(i.toJSON){const e=i.toJSON(n&&n[f]);r[f]=t?e:JSON.stringify(e)}else r[f]=t?i:JSON.stringify(i);else r[f]=i}return r}export{n as e,t as n,o as r}