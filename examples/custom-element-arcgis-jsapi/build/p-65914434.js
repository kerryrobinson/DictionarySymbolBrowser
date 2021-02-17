import{t,b as s,M as r,Z as e,db as o,i,a1 as a}from"./p-dc4230e0.js";import n from"./p-540c739d.js";import p from"./p-cbbd4609.js";const u={attachment:{supportsContentType:!1,supportsExifInfo:!1,supportsKeywords:!1,supportsName:!1,supportsSize:!1},data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:!1},editing:{supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsGeometryUpdate:!1,supportsGlobalId:!1,supportsRollbackOnFailure:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!1,supportsDelete:!1,supportsEditing:!1,supportsChangeTracking:!1,supportsQuery:!1,supportsQueryAttachments:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:!1,supportsExceedsLimitStatistics:!1},queryRelated:{supportsCount:!1,supportsOrderBy:!1,supportsPagination:!1},query:{maxRecordCount:0,maxRecordCountFactor:0,standardMaxRecordCount:0,supportsCacheHint:!1,supportsCentroid:!1,supportsDisjointSpatialRelationship:!1,supportsDistance:!1,supportsDistinct:!1,supportsExtent:!1,supportsFormatPBF:!1,supportsGeometryProperties:!1,supportsHavingClause:!1,supportsHistoricMoment:!1,supportsMaxRecordCountFactor:!1,supportsOrderBy:!1,supportsPagination:!1,supportsPercentileStatistics:!1,supportsQuantization:!1,supportsQuantizationEditMode:!1,supportsQueryByOthers:!1,supportsQueryGeometry:!1,supportsResultType:!1,supportsSqlExpression:!1,supportsStandardizedQueriesOnly:!1,supportsStatistics:!1,tileMaxRecordCount:0}};class l{constructor(t,s,r){this.parsedUrl=t,this.portalItem=s,this.signal=r,this.rootDocument=null;const e=this.parsedUrl.path.match(/^(.*)\/SceneServer\/layers\/([\d]*)\/?$/i);e&&(this.urlParts={root:e[1],layerId:parseInt(e[2],10)})}async fetch(){var s;if(!this.urlParts)return null;const r=null!=(s=this.portalItem)?s:await this.portalItemFromServiceItemId();if(t(r))return this.loadFromUrl();const e=await this.findAndLoadRelatedPortalItem(r);return t(e)?null:this.loadFeatureLayerFromPortalItem(e)}async fetchPortalItem(){var s;if(!this.urlParts)return null;const r=null!=(s=this.portalItem)?s:await this.portalItemFromServiceItemId();return t(r)?null:this.findAndLoadRelatedPortalItem(r)}async fetchRootDocument(){if(s(this.rootDocument))return this.rootDocument;if(t(this.urlParts))return this.rootDocument={},{};const e={query:{f:"json"},responseType:"json",authMode:"no-prompt",signal:this.signal},o=`${this.urlParts.root}/SceneServer`;try{const t=await r(o,e);this.rootDocument=t.data}catch{this.rootDocument={}}return this.rootDocument}async fetchServiceOwningPortalUrl(){var t;const s=null==(t=e)?void 0:t.findServerInfo(this.parsedUrl.path);if(null!=s&&s.owningSystemUrl)return s.owningSystemUrl;const i=this.parsedUrl.path.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const t=(await r(i,{query:{f:"json"},responseType:"json",signal:this.signal})).data.owningSystemUrl;if(t)return t}catch(t){o(t)}return null}async findAndLoadRelatedPortalItem(t){try{return(await t.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:this.signal})).find((t=>"Feature Service"===t.type))||null}catch(t){return o(t),null}}async loadFeatureLayerFromPortalItem(t){await t.load({signal:this.signal});const s=await this.findMatchingAssociatedSublayerUrl(t.url);return new p({url:s,portalItem:t}).load({signal:this.signal})}async loadFromUrl(){const t=await this.findMatchingAssociatedSublayerUrl(`${this.urlParts.root}/FeatureServer`);return new p({url:t}).load({signal:this.signal})}async findMatchingAssociatedSublayerUrl(t){const s=t.replace(/^(.*FeatureServer)(\/[\d]*\/?)?$/i,"$1"),e={query:{f:"json"},responseType:"json",authMode:"no-prompt",signal:this.signal},o=this.urlParts.layerId,a=this.fetchRootDocument(),n=r(s,e),[p,u]=await i([n,a]),l=u&&u.layers,c=p.data&&p.data.layers;if(!Array.isArray(c))throw new Error("expected layers array");if(Array.isArray(l)){for(let t=0;t<Math.min(l.length,c.length);t++)if(l[t].id===o)return`${s}/${c[t].id}`}else if(o<c.length)return`${s}/${c[o].id}`;throw new Error("could not find matching associated sublayer")}async portalItemFromServiceItemId(){const t=(await this.fetchRootDocument()).serviceItemId;if(!t)return null;const r=new n({id:t}),e=await this.fetchServiceOwningPortalUrl();s(e)&&(r.portal=new a({url:e}));try{return r.load({signal:this.signal})}catch(t){return o(t),null}}}export{l as c,u as s}