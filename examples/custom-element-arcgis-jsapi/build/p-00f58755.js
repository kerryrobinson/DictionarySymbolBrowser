import{D as t,E as s,K as e,b as i,l as r}from"./p-ab028778.js";import{p as l,x as n}from"./p-e7501203.js";const u=u=>{let a=class extends u{get title(){if(this._get("title")&&"defaults"!==this.originOf("title"))return this._get("title");if(this.url){const t=l(this.url);if(i(t)&&t.title)return t.title}return this._get("title")||""}set title(t){this._set("title",t)}set url(t){this._set("url",n(t,r.getLogger(this.declaredClass)))}};return t([s({dependsOn:["url"]})],a.prototype,"title",null),t([s({type:String})],a.prototype,"url",null),a=t([e("esri.layers.mixins.ArcGISService")],a),a};export{u as p}