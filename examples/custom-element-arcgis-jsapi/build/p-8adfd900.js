import{D as e,E as i,F as r,z as t,y as s,K as l,Z as a,a2 as n,aF as o,l as u,aY as d,aC as p,m as y,dK as c,as as h,bq as b,ae as f,bJ as m,a6 as v,aS as g,s as w,i as S,I,aG as x,bL as j,az as D,ag as L,b0 as F,a$ as M}from"./p-ab028778.js";import{y as O}from"./p-7575e94f.js";import{l as P}from"./p-1ff061ae.js";import{b as T}from"./p-1cce98ff.js";import{b as E,R as V,D as C}from"./p-e2c62b7c.js";import{s as N}from"./p-a1a69fdc.js";import"./p-754df0ae.js";import{m as $,b as q}from"./p-4a36891c.js";import{u as k}from"./p-a747e129.js";import{g as B}from"./p-2500de92.js";import{a as _}from"./p-0913eaf8.js";import{a as G}from"./p-65bdc41d.js";import{l as J}from"./p-279240d1.js";const Q=u=>{let d=class extends u{constructor(){super(...arguments),this.capabilities=void 0,this.copyright=null,this.fullExtent=null,this.legendEnabled=!0,this.spatialReference=null,this.version=null}readCapabilities(e,i){const r=i.capabilities&&i.capabilities.split(",").map((e=>e.toLowerCase().trim()));if(!r)return{operations:{supportsQuery:!1,supportsExportMap:!1,supportsExportTiles:!1,supportsTileMap:!1},exportMap:null,exportTiles:null};const t=this.type,s=-1!==r.indexOf("query"),l=-1!==r.indexOf("map"),a=!!i.exportTilesAllowed,n=-1!==r.indexOf("tilemap"),o="tile"!==t&&!!i.supportsDynamicLayers;return{operations:{supportsQuery:s,supportsExportMap:l,supportsExportTiles:a,supportsTileMap:n},exportMap:l?{supportsSublayersChanges:"tile"!==t,supportsDynamicLayers:o,supportsSublayerVisibility:"tile"!==t&&(!i.tileInfo||o),supportsSublayerDefinitionExpression:"tile"!==t&&(!i.tileInfo||o)}:null,exportTiles:a?{maxExportTilesCount:+i.maxExportTilesCount}:null}}readVersion(e,i){let r=i.currentVersion;return r||(r=i.hasOwnProperty("capabilities")||i.hasOwnProperty("tables")?10:i.hasOwnProperty("supportedImageFormatTypes")?9.31:9.3),r}async fetchSublayerInfo(e,i){return await this.fetchAllLayersAndTables(i),this._allLayersAndTablesMap.get(e)}async fetchAllLayersAndTables(e){await this.load(e),this._allLayersAndTablesPromise||(this._allLayersAndTablesPromise=a(n(this.url).path+"/layers",{responseType:"json",query:{f:"json",...this.customParameters}}).then((e=>{this._allLayersAndTablesMap=new Map;for(const i of e.data.layers)this._allLayersAndTablesMap.set(i.id,i);return{result:e.data}}),(e=>({error:e}))));const i=await this._allLayersAndTablesPromise;if(o(e),"result"in i)return i.result;throw i.error}};return e([i({readOnly:!0})],d.prototype,"capabilities",void 0),e([r("service","capabilities",["capabilities","exportTilesAllowed","maxExportTilesCount","supportsDynamicLayers","tileInfo"])],d.prototype,"readCapabilities",null),e([i({json:{read:{source:"copyrightText"}}})],d.prototype,"copyright",void 0),e([i({type:t})],d.prototype,"fullExtent",void 0),e([i({json:{origins:{service:{read:!1},"portal-item":{read:!1}}}})],d.prototype,"id",void 0),e([i({type:Boolean,json:{origins:{service:{read:{enabled:!1}}},read:{source:"showLegend"},write:{target:"showLegend"}}})],d.prototype,"legendEnabled",void 0),e([i(T)],d.prototype,"popupEnabled",void 0),e([i({type:s})],d.prototype,"spatialReference",void 0),e([i()],d.prototype,"version",void 0),e([r("version",["currentVersion","capabilities","tables","supportedImageFormatTypes"])],d.prototype,"readVersion",null),d=e([l("esri.layers.mixins.ArcGISMapService")],d),d};var A;function K(e){return e&&"esriSMS"===e.type}function R(e,i,r){var t;return{ignoreOrigin:!0,enabled:!!r&&"map-image"===(null==(t=r.layer)?void 0:t.type)&&(r.writeSublayerStructure||this.originIdOf(i)>=F(r.origin))}}function U(e,i,r){var t;return{enabled:!!r&&"tile"===(null==(t=r.layer)?void 0:t.type)&&this._isOverridden(i)}}function z(e,i,r){return{ignoreOrigin:!0,enabled:r&&r.writeSublayerStructure||!1}}function W(e,i,r){return{ignoreOrigin:!0,enabled:!!r&&(r.writeSublayerStructure||this.originIdOf(i)>=F(r.origin))}}const X=u.getLogger("esri.layers.support.Sublayer");let Y=0;const Z=new Set;Z.add("layer"),Z.add("parent"),Z.add("loaded"),Z.add("loadStatus"),Z.add("loadError"),Z.add("loadWarnings");let H=A=class extends(G(P(d(p)))){constructor(e){super(e),this.capabilities=void 0,this.fields=null,this.fullExtent=null,this.globalIdField=null,this.legendEnabled=!0,this.objectIdField=null,this.popupEnabled=!0,this.popupTemplate=null,this.sourceJSON=null,this.title=null,this.typeIdField=null,this.types=null}async load(e){return this.addResolvingPromise((async()=>{var i;if(!this.layer&&!this.url)throw new y("sublayer:missing-layer","Sublayer can't be loaded without being part of a layer",{sublayer:this});let r=null;if(!this.layer||this.originIdOf("url")>2||"data-layer"===(null==(i=this.source)?void 0:i.type))r=(await a(this.url,{responseType:"json",query:{f:"json"},...e})).data;else{var t;let i=this.id;"map-layer"===(null==(t=this.source)?void 0:t.type)&&(i=this.source.mapLayerId),r=await this.layer.fetchSublayerInfo(i,e)}r&&(this.sourceJSON=r,this.read({layerDefinition:r},{origin:"service"}))})()),this}readCapabilities(e,i){const r=(e=(i=i.layerDefinition||i).capabilities||e)?e.toLowerCase().split(",").map((e=>e.trim())):[];return{exportMap:{supportsModification:!!i.canModifyLayer},operations:{supportsQuery:-1!==r.indexOf("query")}}}set definitionExpression(e){this._setAndNotifyLayer("definitionExpression",e)}get fieldsIndex(){return new N(this.fields||[])}readGlobalIdFieldFromService(e,i){if((i=i.layerDefinition||i).globalIdField)return i.globalIdField;if(i.fields)for(const e of i.fields)if("esriFieldTypeGlobalID"===e.type)return e.name}get id(){const e=this._get("id");return null==e?Y++:e}set id(e){this._get("id")!==e&&(!1!==this.get("layer.capabilities.exportMap.supportsDynamicLayers")?this._set("id",e):this._logLockedError("id","capability not available 'layer.capabilities.exportMap.supportsDynamicLayers'"))}set labelingInfo(e){this._setAndNotifyLayer("labelingInfo",e)}writeLabelingInfo(e,i,r,t){e&&e.length&&(i.layerDefinition={drawingInfo:{labelingInfo:e.map((e=>e.write({},t)))}})}set labelsVisible(e){this._setAndNotifyLayer("labelsVisible",e)}set layer(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach((i=>i.layer=e))}set listMode(e){this._set("listMode",e)}set minScale(e){this._setAndNotifyLayer("minScale",e)}readMinScale(e,i){return i.minScale||i.layerDefinition&&i.layerDefinition.minScale||0}set maxScale(e){this._setAndNotifyLayer("maxScale",e)}readMaxScale(e,i){return i.maxScale||i.layerDefinition&&i.layerDefinition.maxScale||0}readObjectIdFieldFromService(e,i){if((i=i.layerDefinition||i).objectIdField)return i.objectIdField;if(i.fields)for(const e of i.fields)if("esriFieldTypeOID"===e.type)return e.name}set opacity(e){this._setAndNotifyLayer("opacity",e)}readOpacity(e,i){const r=i.layerDefinition;return 1-.01*(null!=r.transparency?r.transparency:r.drawingInfo.transparency)}writeOpacity(e,i,r,t){i.layerDefinition={drawingInfo:{transparency:100-100*e}}}writeParent(e,i){i.parentLayerId=this.parent&&this.parent!==this.layer?c(this.parent.id):-1}get defaultPopupTemplate(){return this.createPopupTemplate()}set renderer(e){if(e)for(const i of e.getSymbols())if(h(i)){X.warn("Sublayer renderer should use 2D symbols");break}this._setAndNotifyLayer("renderer",e)}get source(){return this._get("source")||new E({mapLayerId:this.id})}set source(e){this._setAndNotifyLayer("source",e)}set sublayers(e){this._handleSublayersChange(e,this._get("sublayers")),this._set("sublayers",e)}castSublayers(e){return b(f.ofType(A),e)}writeSublayers(e,i,r){this.get("sublayers.length")&&(i[r]=this.sublayers.map((e=>e.id)).toArray().reverse())}readTypeIdField(e,i){const r=(i=i.layerDefinition||i).typeIdField;if(r){const e=m(i.fields,r);if(e)return e.name}return null}get url(){var e,i;const r=null!=(e=null==(i=this.layer)?void 0:i.parsedUrl)?e:this._lastParsedUrl,t=this.source;if(!r)return null;if(this._lastParsedUrl=r,"map-layer"===(null==t?void 0:t.type))return`${r.path}/${t.mapLayerId}`;const s={layer:JSON.stringify({source:this.source})};return`${r.path}/dynamicLayer?${v(s)}`}set url(e){e?this._override("url",e):this._clearOverride("url")}set visible(e){this._setAndNotifyLayer("visible",e)}writeVisible(e,i,r,t){i[r]=this.getAtOrigin("defaultVisibility","service")||e}clone(){const{store:e}=g(this),i=new A;return g(i).store=e.clone(Z),i._lastParsedUrl=this._lastParsedUrl,i}createPopupTemplate(e){return _(this,e)}createQuery(){return new V({returnGeometry:!0,where:this.definitionExpression||"1=1"})}async createFeatureLayer(){var e,i;if(this.hasOwnProperty("sublayers"))return null;const r=null==(e=this.layer)?void 0:e.parsedUrl,t=new((await import("./p-11ca1b07.js")).default)({url:r.path});return r&&this.source&&("map-layer"===this.source.type?t.layerId=this.source.mapLayerId:t.dynamicDataSource=this.source),null!=this.layer.refreshInterval&&(t.refreshInterval=this.layer.refreshInterval),this.definitionExpression&&(t.definitionExpression=this.definitionExpression),this.originIdOf("labelingInfo")>2&&(t.labelingInfo=w(this.labelingInfo)),this.originIdOf("labelsVisible")>0&&(t.labelsVisible=this.labelsVisible),this.originIdOf("legendEnabled")>0&&(t.legendEnabled=this.legendEnabled),this.originIdOf("visible")>0&&(t.visible=this.visible),this.originIdOf("minScale")>0&&(t.minScale=this.minScale),this.originIdOf("maxScale")>0&&(t.maxScale=this.maxScale),this.originIdOf("opacity")>0&&(t.opacity=this.opacity),this.originIdOf("popupTemplate")>0&&(t.popupTemplate=w(this.popupTemplate)),this.originIdOf("renderer")>2&&(t.renderer=w(this.renderer)),"data-layer"===(null==(i=this.source)?void 0:i.type)&&(t.dynamicDataSource=this.source.clone()),this.originIdOf("title")>0&&(t.title=this.title),"map-image"===this.layer.type&&this.layer.originIdOf("customParameters")>0&&(t.customParameters=this.layer.customParameters),"tile"===this.layer.type&&this.layer.originIdOf("customParameters")>0&&(t.customParameters=this.layer.customParameters),t}getFeatureType(e){const{typeIdField:i,types:r}=this;if(!i||!e)return null;const t=e.attributes?e.attributes[i]:void 0;if(null==t)return null;let s=null;return r.some((e=>{const{id:i}=e;return null!=i&&(i.toString()===t.toString()&&(s=e),!!s)})),s}getFieldDomain(e,i){const r=this.getFeatureType(i&&i.feature);if(r){const i=r.domains&&r.domains[e];if(i&&"inherited"!==i.type)return i}return this._getLayerDomain(e)}queryFeatures(e=this.createQuery(),i){return this.load().then((()=>{if(!this.get("capabilities.operations.supportsQuery"))throw new y("Sublayer.queryFeatures","this layer doesn't support queries.");return S([import("./p-05d2fbdb.js").then((function(e){return e.q})),import("./p-f16fbea1.js")])})).then((([{executeQuery:r},{default:t}])=>r(this.url,V.from(e),this.layer?this.layer.spatialReference:null,{...i,query:{...this.layer.customParameters}}).then((e=>t.fromJSON(e.data))))).then((e=>(e&&e.features&&e.features.forEach((e=>{e.sourceLayer=this})),e)))}toExportImageJSON(){var e;const i={id:this.id,source:(null==(e=this.source)?void 0:e.toJSON())||{mapLayerId:this.id,type:"mapLayer"}};this.definitionExpression&&(i.definitionExpression=this.definitionExpression);const r=["renderer","labelingInfo","opacity","labelsVisible"].reduce(((e,i)=>(e[i]=this.originIdOf(i),e)),{});if(Object.keys(r).some((e=>r[e]>2))){const e=i.drawingInfo={};r.renderer>2&&(e.renderer=this.renderer?this.renderer.toJSON():null),r.labelsVisible>2&&(e.showLabels=this.labelsVisible),this.labelsVisible&&r.labelingInfo>2&&(e.labelingInfo=this.labelingInfo?this.labelingInfo.map((e=>e.write({},{origin:"service"}))):null,e.showLabels=!0),r.opacity>2&&(e.transparency=100-100*this.opacity),this._assignDefaultSymbolColors(e.renderer)}return i}_assignDefaultSymbolColors(e){this._forEachSimpleMarkerSymbols(e,(e=>{e.color||"esriSMSX"!==e.style&&"esriSMSCross"!==e.style||(e.color=e.outline&&e.outline.color?e.outline.color:[0,0,0,0])}))}_forEachSimpleMarkerSymbols(e,i){if(e){const r="uniqueValueInfos"in e?e.uniqueValueInfos:"classBreakInfos"in e?e.classBreakInfos:[];for(const e of r)K(e.symbol)&&i(e.symbol);"symbol"in e&&K(e.symbol)&&i(e.symbol),"defaultSymbol"in e&&K(e.defaultSymbol)&&i(e.defaultSymbol)}}_setAndNotifyLayer(e,i){const r=this.layer,t=this._get(e);let s,l;switch(e){case"definitionExpression":s="supportsSublayerDefinitionExpression";case"minScale":case"maxScale":case"visible":s="supportsSublayerVisibility";break;case"labelingInfo":case"labelsVisible":case"opacity":case"renderer":case"source":s="supportsDynamicLayers",l="supportsModification"}const a=g(this).getDefaultOrigin();if("service"!==a){if(s&&!1===this.get(`layer.capabilities.exportMap.${s}`))return void this._logLockedError(e,`capability not available 'layer.capabilities.exportMap.${s}'`);if(l&&!1===this.get(`capabilities.exportMap.${l}`))return void this._logLockedError(e,`capability not available 'capabilities.exportMap.${l}'`)}"source"!==e||"not-loaded"===this.loadStatus?(this._set(e,i),"service"!==a&&t!==i&&r&&r.emit&&r.emit("sublayer-update",{propertyName:e,target:this})):this._logLockedError(e,"'source' can't be changed after calling sublayer.load()")}_handleSublayersChange(e,i){i&&(i.forEach((e=>{e.parent=null,e.layer=null})),this.handles.removeAll()),e&&(e.forEach((e=>{e.parent=this,e.layer=this.layer})),this.handles.add([e.on("after-add",(({item:e})=>{e.parent=this,e.layer=this.layer})),e.on("after-remove",(({item:e})=>{e.parent=null,e.layer=null})),e.on("before-changes",(e=>{const i=this.get("layer.capabilities.exportMap.supportsSublayersChanges");null==i||i||(X.error(new y("sublayer:sublayers-non-modifiable","Sublayer can't be added, moved, or removed from the layer's sublayers",{sublayer:this,layer:this.layer})),e.preventDefault())}))]))}_logLockedError(e,i){X.error(new y("sublayer:locked",`Property '${e}' can't be changed on Sublayer from the layer '${this.layer.id}'`,{reason:i,sublayer:this,layer:this.layer}))}_getLayerDomain(e){const i=this.fieldsIndex.get(e);return i?i.domain:null}};H.test={isMapImageLayerOverridePolicy:e=>e===z||e===R,isTileImageLayerOverridePolicy:e=>e===U},e([i({readOnly:!0})],H.prototype,"capabilities",void 0),e([r("service","capabilities",["layerDefinition.canModifyLayer","layerDefinition.capabilities"])],H.prototype,"readCapabilities",null),e([i({type:String,value:null,json:{read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression",overridePolicy:R}}})],H.prototype,"definitionExpression",null),e([i({type:[O],json:{origins:{service:{read:{source:"layerDefinition.fields"}}}}})],H.prototype,"fields",void 0),e([i({readOnly:!0,dependsOn:["fields"]})],H.prototype,"fieldsIndex",null),e([i({type:t,json:{read:{source:"layerDefinition.extent"}}})],H.prototype,"fullExtent",void 0),e([i({type:String})],H.prototype,"globalIdField",void 0),e([r("service","globalIdField",["layerDefinition.globalIdField","layerDefinition.fields"])],H.prototype,"readGlobalIdFieldFromService",null),e([i({type:I,json:{write:{ignoreOrigin:!0}}})],H.prototype,"id",null),e([i({value:null,type:[B],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo"},write:{target:"layerDefinition.drawingInfo.labelingInfo",overridePolicy:z}}})],H.prototype,"labelingInfo",null),e([x("labelingInfo")],H.prototype,"writeLabelingInfo",null),e([i({type:Boolean,value:!0,json:{read:{source:"layerDefinition.drawingInfo.showLabels"},write:{target:"layerDefinition.drawingInfo.showLabels",overridePolicy:z}}})],H.prototype,"labelsVisible",null),e([i({value:null})],H.prototype,"layer",null),e([i({type:Boolean,value:!0,json:{origins:{service:{read:{enabled:!1}}},read:{source:"showLegend"},write:{target:"showLegend",overridePolicy:W}}})],H.prototype,"legendEnabled",void 0),e([i({type:["show","hide","hide-children"],value:"show",json:{read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],H.prototype,"listMode",null),e([i({type:Number,value:0,json:{write:{overridePolicy:z}}})],H.prototype,"minScale",null),e([r("minScale",["minScale","layerDefinition.minScale"])],H.prototype,"readMinScale",null),e([i({type:Number,value:0,json:{write:{overridePolicy:z}}})],H.prototype,"maxScale",null),e([r("maxScale",["maxScale","layerDefinition.maxScale"])],H.prototype,"readMaxScale",null),e([i({type:String})],H.prototype,"objectIdField",void 0),e([r("service","objectIdField",["layerDefinition.objectIdField","layerDefinition.fields"])],H.prototype,"readObjectIdFieldFromService",null),e([i({type:Number,value:1,json:{write:{target:"layerDefinition.drawingInfo.transparency",overridePolicy:z}}})],H.prototype,"opacity",null),e([r("opacity",["layerDefinition.drawingInfo.transparency","layerDefinition.transparency"])],H.prototype,"readOpacity",null),e([x("opacity")],H.prototype,"writeOpacity",null),e([i({json:{type:I,write:{target:"parentLayerId",allowNull:!0,overridePolicy:z}}})],H.prototype,"parent",void 0),e([x("parent")],H.prototype,"writeParent",null),e([i({type:Boolean,value:!0,json:{read:{source:"disablePopup",reader:(e,i)=>!i.disablePopup},write:{target:"disablePopup",overridePolicy:W,writer(e,i,r){i[r]=!e}}}})],H.prototype,"popupEnabled",void 0),e([i({type:j,json:{read:{source:"popupInfo"},write:{target:"popupInfo",overridePolicy:W}}})],H.prototype,"popupTemplate",void 0),e([i({readOnly:!0,dependsOn:["fields","title"]})],H.prototype,"defaultPopupTemplate",null),e([i({types:$,value:null,json:{name:"layerDefinition.drawingInfo.renderer",write:{overridePolicy:z},origins:{"web-scene":{types:q,name:"layerDefinition.drawingInfo.renderer",write:{overridePolicy:z}}}}})],H.prototype,"renderer",null),e([i({types:{key:"type",base:null,typeMap:{"data-layer":C,"map-layer":E}},cast(e){if(e){if("mapLayerId"in e)return D(E,e);if("dataSource"in e)return D(C,e)}return e},json:{name:"layerDefinition.source",write:{overridePolicy:z}}})],H.prototype,"source",null),e([i()],H.prototype,"sourceJSON",void 0),e([i({value:null,json:{type:[I],write:{target:"subLayerIds",allowNull:!0,overridePolicy:z}}})],H.prototype,"sublayers",null),e([L("sublayers")],H.prototype,"castSublayers",null),e([x("sublayers")],H.prototype,"writeSublayers",null),e([i({type:String,json:{read:{source:"name"},write:{target:"name",allowNull:!0,overridePolicy:W}}})],H.prototype,"title",void 0),e([i({type:String})],H.prototype,"typeIdField",void 0),e([r("typeIdField",["layerDefinition.typeIdField"])],H.prototype,"readTypeIdField",null),e([i({type:[k],json:{origins:{service:{read:{source:"layerDefinition.types"}}}}})],H.prototype,"types",void 0),e([i({type:String,dependsOn:["layer","source"],json:{read:{source:"layerUrl"},write:{target:"layerUrl",overridePolicy:U}}})],H.prototype,"url",null),e([i({type:Boolean,value:!0,json:{read:{source:"defaultVisibility"},write:{target:"defaultVisibility",overridePolicy:z}}})],H.prototype,"visible",null),e([x("visible")],H.prototype,"writeVisible",null),H=A=e([l("esri.layers.support.Sublayer")],H);var ee=H;function ie(e,i,r){return i.flatten((({sublayers:e})=>e)).length!==e.length||!!e.some((e=>e.originIdOf("minScale")>r||e.originIdOf("maxScale")>r||e.originIdOf("renderer")>r||e.originIdOf("labelingInfo")>r||e.originIdOf("opacity")>r||e.originIdOf("labelsVisible")>r||e.originIdOf("source")>r))||!te(e,i)}function re(e,i,r){return!!e.some((e=>{const i=e.source;return!(!i||"map-layer"===i.type&&i.mapLayerId===e.id&&(!i.gdbVersion||i.gdbVersion===r.gdbVersion))||e.originIdOf("renderer")>2||e.originIdOf("labelingInfo")>2||e.originIdOf("opacity")>2||e.originIdOf("labelsVisible")>2}))||!te(e,i)}function te(e,i){if(!e||!e.length)return!0;const r=i.slice().reverse().flatten((({sublayers:e})=>e&&e.toArray().reverse())).map((e=>e.id)).toArray();if(e.length>r.length)return!1;let t=0;const s=r.length;for(const{id:i}of e){for(;t<s&&r[t]!==i;)t++;if(t>=s)return!1}return!0}function se(e){return!!e&&e.some((e=>null!=e.minScale||e.layerDefinition&&null!=e.layerDefinition.minScale))}const le=u.getLogger("esri.layers.TileLayer"),ae=f.ofType(ee);function ne(e,i){e&&e.forEach((e=>{i(e),e.sublayers&&e.sublayers.length&&ne(e.sublayers,i)}))}const oe=r=>{let t=class extends r{constructor(...e){super(...e),this.allSublayers=new J({root:this,rootCollectionNames:["sublayers"],getChildrenFunction:e=>e.sublayers}),this.sublayersSourceJSON={2:{},3:{},4:{},5:{}},this.watch("sublayers",((e,i)=>this._handleSublayersChange(e,i)),!0)}readSublayers(e,i){if(!i||!e)return;const{sublayersSourceJSON:r}=this,t=F(i.origin);if(t<2)return;if(r[t]={context:i,visibleLayers:e.visibleLayers||r[t].visibleLayers,layers:e.layers||r[t].layers},t>2)return;this._set("serviceSublayers",this.createSublayersForOrigin("service").sublayers);const{sublayers:s,origin:l}=this.createSublayersForOrigin("web-document"),a=g(this);a.setDefaultOrigin(l),this._set("sublayers",new ae(s)),a.setDefaultOrigin("user")}findSublayerById(e){return this.allSublayers.find((i=>i.id===e))}createServiceSublayers(){return this.createSublayersForOrigin("service").sublayers}createSublayersForOrigin(e){const i=F("web-document"===e?"web-map":e);let r=2,t=this.sublayersSourceJSON[2].layers,s=this.sublayersSourceJSON[2].context,l=null;const a=[3,4,5].filter((e=>e<=i));for(const e of a){const i=this.sublayersSourceJSON[e];se(i.layers)&&(r=e,t=i.layers,s=i.context,i.visibleLayers&&(l={visibleLayers:i.visibleLayers,context:i.context}))}const n=[3,4,5].filter((e=>e>r&&e<=i));let o=null;for(const e of n){const{layers:i,visibleLayers:r,context:t}=this.sublayersSourceJSON[e];i&&(o={layers:i,context:t}),r&&(l={visibleLayers:r,context:t})}const u=function(e,i){const r=[],t={};return e?(e.forEach((e=>{const s=new ee;if(s.read(e,i),t[s.id]=s,null!=e.parentLayerId&&-1!==e.parentLayerId){const i=t[e.parentLayerId];i.sublayers||(i.sublayers=[]),i.sublayers.unshift(s)}else r.unshift(s)})),r):r}(t,s),d=new Map,p=new Set;if(o)for(const e of o.layers)d.set(e.id,e);if(l)for(const e of l.visibleLayers)p.add(e);return ne(u,(e=>{o&&e.read(d.get(e.id),o.context),l&&e.read({defaultVisibility:p.has(e.id)},l.context)})),{origin:M(r),sublayers:new ae({items:u})}}read(e,i){super.read(e,i),this.readSublayers(e,i)}_handleSublayersChange(e,i){i&&(i.forEach((e=>{e.parent=null,e.layer=null})),this.handles.remove("sublayers-owner")),e&&(e.forEach((e=>{e.parent=this,e.layer=this})),this.handles.add([e.on("after-add",(({item:e})=>{e.parent=this,e.layer=this})),e.on("after-remove",(({item:e})=>{e.parent=null,e.layer=null}))],"sublayers-owner"),"tile"===this.type&&this.handles.add(e.on("before-changes",(e=>{le.error(new y("tilelayer:sublayers-non-modifiable","Sublayer can't be added, moved, or removed from the layer's sublayers",{layer:this})),e.preventDefault()})),"sublayers-owner"))}};return e([i({readOnly:!0})],t.prototype,"allSublayers",void 0),e([i({readOnly:!0,type:f.ofType(ee)})],t.prototype,"serviceSublayers",void 0),e([i({value:null,type:ae,json:{read:!1,write:{allowNull:!0,ignoreOrigin:!0}}})],t.prototype,"sublayers",void 0),e([i({readOnly:!0})],t.prototype,"sublayersSourceJSON",void 0),t=e([l("esri.layers.mixins.SublayersOwner")],t),t};export{ee as H,ie as e,oe as f,re as n,Q as u}