import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import ArcadeExpression from "@arcgis/core/support/arcadeOnDemand";
import callExpressionWithFeature from "@arcgis/core/views/2d/arcade/callExpressionWithFeature";
import { CIMSymbolRasterizer } from "@arcgis/core/symbols/cim/CIMSymbolRasterizer";

import { CIMSymbol } from "@arcgis/core/symbols";

import Domain from "@arcgis/core/layers/support/Domain";
import CodedValueDomain from "@arcgis/core/layers/support/CodedValueDomain";

import Graphic from "@arcgis/core/Graphic";

type Feature = {
  geometry?: any;
  attributes: Object;
  centroid?: {
    x: number;
    y: number;
  };
}

type Field = {
  name: string;
  type: any;
  alias: string;
  defaultValue?: string | number | null;
  description?: string;
  domain?: Domain;
  editable?: boolean;
  length?: number;
  nullable?: boolean;
  sqlType?: any;
}

type ConfigDomain = {
  name: string;
  value: string;
  domain: string[];
  info: string;
};

type SubdomainsMap = {
  [key: string]: UIField[];
}

type UIFieldJSON = {
  key: string;
  name: string;
  type: "text" | "coded-value-domain" | "expression" | "group";
  default?: string | number;
  domain?: string;
  expression?: string;
  subdomains?: SubdomainsMap;
  uiFields?: UIField[];
}

type UIField = {
  key: string;
  name: string;
  type: "text" | "coded-value-domain" | "expression" | "group";
};

export type SearchResultItem = {
  fieldKey: string | number,
  fieldValue: string,
  uiFieldKey: string,
  uiFieldName: string,
  score: number,
  parent: SearchResultItem | null
};

export interface UITextField extends UIField {
  type: "text",
  value?: string | number,
  domain: any
}

export interface UICodedValueDomainField extends UIField {
  type: "coded-value-domain",
  domain: CodedValueDomain | NestedCodedValueDomain,
  domainTree?: DomainTree,
  value: string | number
}

interface UIArcadeExpressionField extends UIField {
  type: "expression",
  expression: string,
  value: string
}

export interface UIGroupField extends UIField {
  type: "group",
  uiFields: UIFieldUnion[]
}

export type NestedCodedValueDomain = {
  type: "nested-coded-value",
  name: string,
  codedValues: { name: string, code: string }[]
}

export type DomainTree = {
  name?: string,
  code?: string,
  peer: DomainTree,
  children: DomainTree
}

export type UIFieldUnion = UITextField | UICodedValueDomainField | UIArcadeExpressionField | UIGroupField;

class DictionarySymbologyBrowserViewModel {
  //from ui JSON
  private _symbolValueFromUIFields: Object;
  private _uiFields: UIFieldJSON[];
  private _domains: Object;
  private _uiFieldDefaultValueMap: Map<string, string | number>;

  //from style JSON
  private _configDomains: ConfigDomain[];
  private _texts: string[];
  private _symbols: string[];

  private _dynamicSymbolFieldMap: Map<string, any>; //dynamic symbol fields
  private _dynamicUIFieldMap: Map<string, any>; // dynamic ui fields

  private _uiFieldCurrentDomain: Map<string, UIField>; //keep track of current domain
  private _uiFieldCurrentValue: Map<string, string | number>; // keep track of current values

  private _uiFieldSubdomainsMap: Map<string, Set<string>>;
  private _groupExpandStatus: Map<string, string>;

  //renderer:
  private _renderer: DictionaryRenderer;
  private _fieldMap: Record<string, string>;
  private _reverseFieldMap: Record<string, string>;
  private _uiFieldsFromSymbolValues: any; //used for editing

  private _cimSymbolRasterizer: CIMSymbolRasterizer;

  constructor(params: any) {
    this.styleUrl = params.styleUrl;
    this.uiUrl = params.uiUrl;

    this._uiFieldCurrentValue = new Map<string, string | number>();
    this._uiFieldCurrentDomain = new Map<string, UIField>();
    this._dynamicSymbolFieldMap = new Map<string, any>(); //symbol fields
    this._dynamicUIFieldMap = new Map<string, any>(); //ui fields

    this._uiFieldSubdomainsMap = new Map<string, Set<string>>();
    this._uiFieldDefaultValueMap = new Map<string, string | number>();

    this._groupExpandStatus = new Map<string, string>();

    this._cimSymbolRasterizer = new CIMSymbolRasterizer(null, true);
  }

  styleUrl: string = null;

  uiUrl: string = null;

  async fetchResources(): Promise<void[]> {
    this.styleUrl = this.styleUrl;

    const [responseData, uiInfo] = await Promise.all([
      fetch(this.styleUrl + "/resources/styles/dictionary-info.json").then((response) => {
        return response.json()
      }),
      fetch(this.uiUrl).then(response => {
        return response.json()
      })
    ]);

    const authoringInfo = responseData["authoringInfo"];
    this._configDomains = authoringInfo.configuration;
    this._symbols = authoringInfo.symbol;
    this._texts = authoringInfo.text;
    this._domains = uiInfo.domains;
    this._symbolValueFromUIFields = uiInfo.symbolValueFromUIFields;
    this._uiFields = uiInfo.uiFields;

    if (!this._renderer) {
      this._fieldMap = this._getDefaultFieldMap(this._symbols, this._texts);
      this._renderer = new DictionaryRenderer({
        url: this.styleUrl,
        fieldMap: this._fieldMap,
        config: this._getDefaultConfig(this._configDomains)
      });
    } else {
      this._fieldMap = this._renderer.fieldMap;
    }

    this._reverseFieldMap = objectFlip(this._fieldMap);
    let uiFieldsFromSymbolValuesString = uiInfo.uiFieldsFromSymbolValues;
    const uiFeatureFields = this._getUIFeatureFields(this._uiFields);

    let promises: Promise<void>[] = [];
    Object.keys(this._symbolValueFromUIFields).forEach(key => {
      const symbolValue = this._symbolValueFromUIFields[key];
      promises.push(
        ArcadeExpression.create<string, ["$feature"]>(
          symbolValue,
          {
            wkid: 102100,
          },
          uiFeatureFields,
          null,
          ["$feature"]
        ).then(expr => {
          this._dynamicSymbolFieldMap.set(key, expr);
        })
      );
    });

    promises.push.apply(
      promises,
      this._processUIFields(
        this._uiFields,
        {
          wkid: 102100
        },
        uiFeatureFields
      )
    );

    if (uiFieldsFromSymbolValuesString) {
      let fields = [];
      Object.keys(this._fieldMap).forEach(key => {
        uiFieldsFromSymbolValuesString = uiFieldsFromSymbolValuesString
          .split("$feature." + key)
          .join("$feature." + this._fieldMap[key]);
        fields.push({
          alias: "HAS_NO_ALIAS",
          editable: true,
          length: -1,
          name: this._fieldMap[key],
          nullable: true,
          type: "esriFieldTypeString"
        })
      });

      promises.push(
        ArcadeExpression.create<string, ["$feature"]>(
          uiFieldsFromSymbolValuesString,
          { wkid: 102100 },
          fields,
          null,
          ["$feature"]
        ).then(expr => {
          this._uiFieldsFromSymbolValues = expr;
        })
      );
    }

    return Promise.all(promises);
  }

  //uiFeature -> realFeature
  getFeature(): Feature {
    const attributes = {};
    const uiFeature = this._getUIFeature();
    //ui feature -> symbol feature
    this._symbols.forEach(symbol => {
      const fieldName = this._fieldMap[symbol];
      if (this._symbolValueFromUIFields[symbol]) {
        attributes[fieldName] = callExpressionWithFeature(
          this._dynamicSymbolFieldMap.get(symbol),
          uiFeature,
          null,
          null,
          null
        );
      } else {
        attributes[fieldName] = uiFeature.attributes[
          symbol
        ];
      }
    });

    this._texts.forEach(text => {
      const fieldName = this._fieldMap[text];
      attributes[fieldName] = uiFeature.attributes[
        text
      ];
    });
    return { attributes };
  }

  async createPreviewImage(): Promise<HTMLImageElement> {
    const realFeature = this.getFeature();
    const scalingFactor = 1.5;
    return this._renderer
      .getSymbolAsync(realFeature as Graphic)
      .then((cimSymbol: CIMSymbol) => {
        return this._cimSymbolRasterizer.rasterizeCIMSymbolAsync(cimSymbol, realFeature, this._fieldMap, "esriGeometryPoint", {
          scaleFactor: scalingFactor
        });
      }).then((res) => {
        const canvas = document.createElement("canvas");
        canvas.width = res.imageData.width;
        canvas.height = res.imageData.height;
        const ctx = canvas.getContext("2d");
        ctx.putImageData(res.imageData, 0, 0);

        let width = canvas.width;
        let height = canvas.height;

        const image = new Image(width, height);
        image.src = canvas.toDataURL();

        return image;
      })
      .then((image) => {
        return image as HTMLImageElement;
      });
  }

  updateCurrentValue(fieldKey: string, value: string | number) {
    this._uiFieldCurrentValue.set(fieldKey, value);
    this._resetSubdomainFields(fieldKey);
  }

  getUIFields(): UIFieldUnion[] {
    const uiFields = this._uiFields;
    const flattenedFields = this.getUIFieldsInternal(uiFields);
    return flattenedFields;
  }

  //post first traversal
  getTreeNodeNamesByValue(tree: DomainTree, value: string): string[] {
    let currentNode = tree;
    while (currentNode) {
      const trace = [];
      trace.push(currentNode.name);
      if (currentNode.code === value) {
        return trace;
      }
      const result = this.getTreeNodeNamesByValue(currentNode.children, value);
      if (result.length > 0) {
        return trace.concat(result);
      }
      currentNode = currentNode.peer
    }
    return [];
  }

  //TODO: test
  featureToUIFields(feature: Feature): void {
    this._resetFields();
    const attributes = feature.attributes;
    Object.keys(attributes).forEach((key: string) => {
      this._uiFieldCurrentValue.set(
        this._reverseFieldMap[key],
        attributes[key]
      );
    });
    if (this._uiFieldsFromSymbolValues) {
      const result = callExpressionWithFeature(
        this._uiFieldsFromSymbolValues,
        feature,
        null,
        null,
        null
      );
      const convertedAttrs = result ? (result as Feature).attributes : {};
      Object.keys(convertedAttrs).forEach(key => {
        this._uiFieldCurrentValue.set(key, convertedAttrs[key]);
      });
    }
  }

  search(query: string): SearchResultItem[] | null {
    let uiFields = [...this._uiFields];

    let result = this._searchUIFields(query, uiFields, null);

    return result;
  }

  private _processUIFields(
    uiFields: UIFieldJSON[],
    sr: any,
    fields: Field[]
  ): Promise<void>[] {
    const promises: Promise<void>[] = [];
    uiFields.forEach(uiField => {
      if (uiField.type === "group") {
        this._groupExpandStatus.set(uiField.key, "true");
        promises.push.apply(
          promises,
          this._processUIFields(uiField.uiFields, sr, fields)
        );
      }
      if (uiField.type === "expression") {
        promises.push(
          ArcadeExpression.create<string, ["$feature"]>(
            uiField.expression,
            sr,
            fields,
            null,
            ["$feature"]
          ).then(expr => {
            this._dynamicUIFieldMap.set(uiField.key, expr);
          })
        );
      }
      if (uiField.default) {
        this._uiFieldDefaultValueMap.set(uiField.key, uiField.default);
      }
    });
    return promises;
  }

  private _getUIFeatureFields(uiFields: UIFieldJSON[]): Field[] {
    let fields: Field[] = [];
    uiFields.forEach(uiField => {
      if (uiField.type === "group") {
        fields.push.apply(fields, this._getUIFeatureFields(uiField.uiFields));
      } else {
        fields.push({
          alias: "HAS_NO_ALIAS",
          editable: true,
          length: -1,
          name: uiField.key,
          nullable: true,
          type: "esriFieldTypeString"
        });
      }
    });
    return fields;
  }

  private _getDefaultFieldMap(
    symbols: string[],
    texts: string[]
  ): Record<string, string> {
    const fieldMap = {};
    if (symbols) {
      symbols.forEach(symbol => {
        fieldMap[symbol] = symbol;
      });
    }

    if (texts) {
      texts.forEach(text => {
        fieldMap[text] = text;
      });
    }
    return fieldMap;
  }

  private _getDefaultConfig(
    configDomains: ConfigDomain[]
  ): Record<string, string> {
    const config = {};
    if (configDomains) {
      configDomains.forEach(configDomain => {
        config[configDomain.name] = configDomain.value;
      });
    }
    return config;
  }

  private _initializeField(
    uiField: UIFieldJSON,
    fieldDomain: CodedValueDomain | NestedCodedValueDomain,
    currentValue: string | number
  ): void {
    if (currentValue != null) {
      return;
    }
    const defaultValue =
      uiField.default != null
        ? uiField.default
        : this._uiFieldDefaultValueMap.get(uiField.key);
    this._uiFieldCurrentValue.set(
      uiField.key,
      defaultValue != null ? defaultValue : fieldDomain.codedValues[0].code //set to default value
    );
  }

  private _resetFields(): void {
    this._uiFieldCurrentValue.clear();
    this._uiFieldCurrentDomain.clear();
    this._uiFieldSubdomainsMap.clear();
  }

  private _resetSubdomainFields(fieldKey: string): void {
    if (!this._uiFieldSubdomainsMap.has(fieldKey)) {
      return;
    }
    this._uiFieldSubdomainsMap.get(fieldKey).forEach(subdomain => {
      this._uiFieldCurrentValue.set(subdomain, null);
      this._resetSubdomainFields(subdomain);
    });
  }

  private _getUIFeature(): Feature {
    const attributes = {};
    this._uiFieldCurrentValue.forEach((val, key) => {
      attributes[key] = val;
    });
    return { attributes };
  }

  private _searchUIFields(query: string, uiFields: UIFieldJSON[], parentScore: SearchResultItem): SearchResultItem[] | null {
    if (!uiFields || uiFields.length === 0) {
      return null;
    }

    //TODO: break up functionid, search separated by `,`

    let uiFieldsLocal = [...uiFields];

    let fakeMinHeap = new Array(5);
    let minAmongMaxes = -Infinity;

    while (uiFieldsLocal.length) {
      let uiField = uiFieldsLocal.pop();
      if (uiField.type === "group") {
        uiFieldsLocal = [...uiField.uiFields, ...uiFieldsLocal]
        continue;
      }

      if (uiField.type === "text" || uiField.type === "expression" || uiField.domain === "inherit") {
        continue;
      }

      let uiFieldDomain = this.getDomain(uiField.domain);
      let codedValues = uiFieldDomain.codedValues;

      for (let cv of codedValues) {
        let key = cv.code;
        let value = cv.name;


        let currentScore = this._getQueryScore(query, value)

        const currentScoreItem = {
          fieldKey: key,
          fieldValue: value,
          uiFieldName: uiField.name,
          uiFieldKey: uiField.key,
          score: currentScore,
          parent: parentScore
        }
        if (currentScore > minAmongMaxes) {
          minAmongMaxes = this._updateMaxScorer(currentScoreItem, fakeMinHeap)
        }

        if (uiField.subdomains) {
          const subdomainScores = this._searchUIFields(query, uiField.subdomains[key], currentScoreItem);
          if (!subdomainScores) {
            continue;
          }
          for (let i = 0; i < subdomainScores.length; i++) {
            if (!subdomainScores[i]) {
              continue;
            }
            if (subdomainScores[i].score > minAmongMaxes) {
              minAmongMaxes = this._updateMaxScorer(subdomainScores[i]
                , fakeMinHeap)
            }
          }
        }
      }
    }

    return fakeMinHeap;
  }

  private _getQueryScore(query: string, target: string): number {
    let currentScore = 0;

    let matchCount = 0;
    //let matchedLower, matchedHigher;


    let queryLower = query.toLowerCase();
    let targetLower = target.toLowerCase();
    for (let i = 0; i < queryLower.length; i++) {
      let queryIndex = i;
      let localMatch = 0;
      for (let j = 0; j < targetLower.length; j++) {
        if (queryLower[queryIndex] === targetLower[j]) {
          queryIndex++;
          localMatch++;
        }
      }
      if (localMatch > matchCount) {
        matchCount = localMatch;
        //matchedLower = i;
        //matchedHigher = queryIndex - 1;
      }

      if (matchCount === targetLower.length) {
        break;
      }
    }

    currentScore = matchCount * matchCount / (target.length > query.length ? target.length : query.length);
    return currentScore;
  }

  private _updateMaxScorer(currentScorer: SearchResultItem, allScorer: SearchResultItem[]): number {
    let currentMin = Infinity;
    let index;
    for (let i = 0; i < allScorer.length; i++) {
      if (allScorer[i] && allScorer[i].score < currentMin) {
        currentMin = allScorer[i].score;
        index = i;
      }
      else if (!allScorer[i]) {
        currentMin = -Infinity;
        index = i;
        break;
      }
    }

    if (index != null && currentScorer.score > currentMin) {
      allScorer[index] = currentScorer;
    }

    return currentMin;
  }

  private getUIFieldsInternal(uiFields: UIFieldJSON[]): UIFieldUnion[] {
    let flattenedFields: UIFieldUnion[] = [];
    let expressionFieldsIndex: number[] = [];
    uiFields.forEach((uiField, index) => {
      if (uiField.type === "group") {
        const groupField: UIFieldUnion = {
          type: "group",
          key: uiField.key,
          name: uiField.name,
          uiFields: [] as UIFieldUnion[]
        }
        groupField.uiFields = this.getUIFieldsInternal(uiField.uiFields);
        flattenedFields.push(groupField);
      }
      else if (uiField.type === "expression") { // evaluate at last before preview
        flattenedFields.push({
          type: "expression",
          key: uiField.key,
          name: uiField.name,
          expression: uiField.expression,
          value: ""
        });
        expressionFieldsIndex.push(index);
      }
      else if (uiField.type === "text" && uiField.domain !== "inherit") {
        flattenedFields.push({
          type: uiField.type,
          name: uiField.name,
          key: uiField.key,
          domain: uiField.domain,
          value: this._uiFieldCurrentValue.get(uiField.key)
        });
      }
      else if (uiField.type === "coded-value-domain" || uiField.domain.indexOf("$domains.") > -1) {
        const fieldInfoDomain = uiField.domain;
        const fieldInfoSubdomains = uiField.subdomains;
        const fieldDomain = this.getDomain(fieldInfoDomain);
        if (fieldDomain && !fieldInfoSubdomains) {
          if (this._uiFieldCurrentValue.get(uiField.key) == null) {
            this._initializeField(uiField, fieldDomain, null);
          }
          if (this._uiFieldCurrentDomain.get(uiField.key)) {
            this._uiFieldCurrentDomain.delete(uiField.key);
          }

          //create root node
          let domainTree: DomainTree = null
          if (fieldDomain.type === "nested-coded-value") {
            domainTree = {
              peer: null,
              children: null
            };
            for (let i = 0; i < fieldDomain.codedValues.length; i++) {
              const currentCodedValue = fieldDomain.codedValues[i];
              const parts = currentCodedValue.name.split(":");
              //start from the root for every codedValue
              let currentNode = domainTree;
              for (let j = 0; j < parts.length; j++) {
                const trimmed = parts[j].trim();
                if (!currentNode.children) {
                  //if leaf node and has children, move the leaf to children nodes
                  if (currentNode.code) {
                    currentNode.children = {
                      name: "Default",
                      code: currentNode.code,
                      peer: {
                        name: trimmed,
                        peer: null,
                        children: null
                      },
                      children: null
                    }
                    currentNode.code = null;
                    currentNode = currentNode.children.peer;
                  }
                  else {
                    currentNode.children = {
                      name: trimmed,
                      peer: null,
                      children: null
                    }
                    currentNode = currentNode.children;
                  }
                }
                else {
                  const nodeFound = this.findOrCreateTreeNode(currentNode.children, trimmed);
                  currentNode = nodeFound;
                }
              }
              //add code on the leaf
              currentNode.code = currentCodedValue.code;
            }
          }

          flattenedFields.push({
            type: "coded-value-domain",
            key: uiField.key,
            name: uiField.name,
            domain: fieldDomain,
            domainTree: domainTree,
            value: this._uiFieldCurrentValue.get(uiField.key)
          })
        }
        if (fieldDomain && fieldInfoSubdomains) {
          flattenedFields.push.apply(flattenedFields, this.getUIFieldsFromDomainGroup(uiField));
        }
      }
      else {
        throw new Error("UIField type" + uiField.type + "is not supported.");
      }
    });

    for (const i of expressionFieldsIndex) {
      const field = flattenedFields[i];
      if (field.type !== "expression") {
        continue;
      }
      const key = field.key;
      const expr = this._dynamicUIFieldMap.get(key);
      const uiFeature = this._getUIFeature();
      const result: any = callExpressionWithFeature(
        expr,
        uiFeature,
        null,
        null,
        null
      );
      field.value = result;
      this._uiFieldCurrentValue.set(key, result);
    }
    return flattenedFields;
  }

  //tree can't be null;
  private findOrCreateTreeNode(tree: DomainTree, value: string): DomainTree {
    let currentNode = tree;
    while (currentNode.name !== value) {
      if (!currentNode.peer) {
        currentNode.peer = {
          name: value,
          peer: null,
          children: null
        }
        currentNode = currentNode.peer;
        break;
      }
      else {
        currentNode = currentNode.peer;
      }
    }
    return currentNode;
  }

  private getUIFieldsFromDomainGroup(domainGroup: UIFieldJSON): UIFieldUnion[] {
    const flattenedFields: UIFieldUnion[] = [];
    const fieldKey = domainGroup.key;
    const currentDomain = this.getDomain(domainGroup.domain);
    let prevDomain = this._uiFieldCurrentDomain.get(fieldKey);
    const currentFieldValue = this._uiFieldCurrentValue.get(fieldKey);

    if (!currentFieldValue || prevDomain !== domainGroup) {
      this._initializeField(domainGroup, currentDomain, currentFieldValue);
      this._uiFieldCurrentDomain.set(fieldKey, domainGroup);
    }

    const uiFields =
      domainGroup.subdomains[this._uiFieldCurrentValue.get(fieldKey)];

    //update subdomain map
    if (!this._uiFieldSubdomainsMap.has(fieldKey)) {
      this._uiFieldSubdomainsMap.set(fieldKey, new Set());
    }

    flattenedFields.push({
      type: "coded-value-domain",
      key: domainGroup.key,
      name: domainGroup.name,
      domain: currentDomain,
      value: this._uiFieldCurrentValue.get(fieldKey)
    });

    if (uiFields) {
      uiFields.forEach(uiField => {
        this._uiFieldSubdomainsMap.get(fieldKey).add(uiField.key);
      });
      return flattenedFields.concat(this.getUIFieldsInternal(uiFields));
    }
    else {
      return flattenedFields;
    }
  }

  private getDomain(name: string): CodedValueDomain | NestedCodedValueDomain {
    const domainName = name.split("$domains.")[1];
    const fieldDomain = this._domains[domainName];
    return fieldDomain;
  }
}


function objectFlip(obj: Record<string, string>): Record<string, string> {
  return Object.keys(obj).reduce((ret, key: string) => {
    ret[obj[key]] = key;
    return ret;
  }, {});
}

export default DictionarySymbologyBrowserViewModel;
