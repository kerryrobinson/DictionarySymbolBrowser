import{D as t,E as s,K as r,aW as e,aS as i,aw as h}from"./p-dc4230e0.js";let n=class extends e{constructor(t){super(t),this._groups=new Map}destroy(){this.removeAll()}get size(){let t=0;return this._groups.forEach((s=>{t+=s.length})),t}add(t,s){if(!this._isHandle(t)&&!Array.isArray(t)&&!i.isCollection(t))return this;const r=this._getOrCreateGroup(s);return Array.isArray(t)||i.isCollection(t)?t.forEach((t=>this._isHandle(t)&&r.push(t))):r.push(t),this.notifyChange("size"),this}forEach(t,s){if("function"==typeof t)this._groups.forEach((s=>s.forEach(t)));else{const r=this._getGroup(t);r&&s&&r.forEach(s)}}has(t){return this._groups.has(this._ensureGroupKey(t))}remove(t){if(Array.isArray(t)||i.isCollection(t))return t.forEach(this.remove,this),this;if(!this.has(t))return this;const s=this._getGroup(t);for(let t=0;t<s.length;t++)s[t].remove();return this._deleteGroup(t),this.notifyChange("size"),this}removeAll(){return this._groups.forEach((t=>{for(let s=0;s<t.length;s++)t[s].remove()})),this._groups.clear(),this.notifyChange("size"),this}_isHandle(t){return t&&!!t.remove}_getOrCreateGroup(t){if(this.has(t))return this._getGroup(t);const s=[];return this._groups.set(this._ensureGroupKey(t),s),s}_getGroup(t){return h(this._groups.get(this._ensureGroupKey(t)))}_deleteGroup(t){return this._groups.delete(this._ensureGroupKey(t))}_ensureGroupKey(t){return t||"_default_"}};t([s({readOnly:!0})],n.prototype,"size",null),n=t([r("esri.core.Handles")],n);var u=n;export{u}