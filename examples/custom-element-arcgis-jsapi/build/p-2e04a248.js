import{p as n}from"./p-ab028778.js";import{w as t}from"./p-f3cc8f75.js";function r(n){var t;return Array.isArray(n)?null==(t=n[0])?void 0:t.spatialReference:null==n?void 0:n.spatialReference}function e(n){return n?Array.isArray(n)?n.map(e):n.toJSON?n.toJSON():n:n}function i(t){return Array.isArray(t)?t.map((t=>n(t))):n(t)}let u;async function c(n,r){return(await async function(){return u||(u=t("geometryEngineWorker",{strategy:"distributed"})),u}()).invoke("executeGEOperation",{operation:n,parameters:e(r)})}async function a(n,t){return i(await c("clip",[r(n),n,t]))}async function o(n,t){return i(await c("cut",[r(n),n,t]))}function f(n,t){return c("contains",[r(n),n,t])}function s(n,t){return c("crosses",[r(n),n,t])}function l(n,t,e){return c("distance",[r(n),n,t,e])}function y(n,t){return c("equals",[r(n),n,t])}function w(n,t){return c("intersects",[r(n),n,t])}function p(n,t){return c("touches",[r(n),n,t])}function d(n,t){return c("within",[r(n),n,t])}function g(n,t){return c("disjoint",[r(n),n,t])}function m(n,t){return c("overlaps",[r(n),n,t])}function A(n,t,e){return c("relate",[r(n),n,t,e])}function h(n){return c("isSimple",[r(n),n])}async function v(n){return i(await c("simplify",[r(n),n]))}async function x(n,t){return i(await c("difference",[r(n),n,t]))}async function E(n,t){return i(await c("symmetricDifference",[r(n),n,t]))}async function b(n,t){return i(await c("intersect",[r(n),n,t]))}async function j(n,t=null){const e=function(n,t){let r;return Array.isArray(n)?r=n:(r=[],r.push(n),null!=t&&r.push(t)),r}(n,t);return i(await c("union",[r(e),e]))}async function D(n,t,e,u,a,o){return i(await c("offset",[r(n),n,t,e,u,a,o]))}async function L(n,t,e,u=!1){const a=[r(n),n,t,e,u];return i(await c("buffer",a))}async function k(n,t,e,u,a,o){const f=[r(n),n,t,e,u,a,o];return i(await c("geodesicBuffer",f))}async function q(n,t,r){var e;if(null==n)throw new Error("Illegal Argument Exception");const i=n.spatialReference;r=null!=(e=r)?e:function(n){return"xmin"in n?n.center:"x"in n?n:n.extent.center}(n);const u=n.constructor.fromJSON(await c("rotate",[i,n,t,r]));return u.spatialReference=i,u}async function z(n,t,e,u){return i(await c("generalize",[r(n),n,t,e,u]))}async function B(n,t,e){return i(await c("densify",[r(n),n,t,e]))}async function G(n,t,e,u=0){return i(await c("geodesicDensify",[r(n),n,t,e,u]))}function I(n,t){return c("planarArea",[r(n),n,t])}function O(n,t){return c("planarLength",[r(n),n,t])}function S(n,t,e){return c("geodesicArea",[r(n),n,t,e])}function W(n,t,e){return c("geodesicLength",[r(n),n,t,e])}export{g as A,z as B,B as C,j as E,W as F,G,q as H,k as I,x as J,E as N,h as O,I as P,b as R,A as S,O as U,S as W,p as d,o as f,d as g,v as h,D as j,L as k,f as l,w as m,l as p,a as s,y as w,m as x,s as y}