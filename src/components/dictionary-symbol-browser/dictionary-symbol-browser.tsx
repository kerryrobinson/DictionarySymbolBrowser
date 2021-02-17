import CodedValueDomain from '@arcgis/core/layers/support/CodedValueDomain';
import { Component, Prop, h, State, Event, EventEmitter, Watch } from '@stencil/core';
import DictionarySymbologyBrowserViewModel, {
  DomainTree,
  NestedCodedValueDomain,
  SearchResultItem,
  UICodedValueDomainField,
  UIFieldUnion,
  UIGroupField,
  UITextField,
} from './dictionary-symbol-browser-view-model';

export type SymbolObject = {
  uiFields: UIFieldUnion[] | null;
  attributes: Object | null;
  previewImg: HTMLImageElement | null;
};

const CSS = {
  form: 'dictionary-symbol-browser-form',
  preview: 'dictionary-symbol-browser-preview',
  group: 'dictionary-symbol-browser-group',
  previewForm: 'dictionary-symbol-browser-preview-form',
  groupTitle: 'dictionary-symbol-browser-group-title',
  groupFields: 'dictionary-symbol-browser-group-fields',

  pointRight: 'point-right',
  pointDown: 'point-down',

  suggestionList: 'dictionary-symbol-browser-search-result',
  searchContainer: 'dictionary-symbol-browser-search-container',
  menu: 'menu',
  menuList: 'menu-list',
  menuItem: 'menu-list-item',
  suggestionsMenu: 'search-suggestions-menu',
};

@Component({
  tag: 'dictionary-symbol-browser',
  styleUrl: 'dictionary-symbol-browser.css',
  shadow: true,
})
export class DictinoarySymbolBrowser {
  @State() _groupExpandStatus = {};
  @State() _suggestionList: SearchResultItem[] = null;
  @State() symbolObject: SymbolObject = {
    uiFields: null,
    previewImg: null,
    attributes: null,
  };

  @Prop() styleurl: string;
  @Prop() uiurl: string;
  @Prop() symbolAttributes: Object;

  @Watch('symbolAttributes')
  watchHandler(newValue: Object, oldValue: Object) {
    if (newValue !== oldValue) {
      this.viewModel.featureToUIFields({
        attributes: newValue,
      });
      this._updateSymbolObject();
    }
  }

  viewModel: DictionarySymbologyBrowserViewModel;

  @Event() symbolChanged: EventEmitter<SymbolObject>;

  connectedCallback() {
    this._initializeViewModel();
  }

  private _initializeViewModel() {
    this.viewModel = new DictionarySymbologyBrowserViewModel({ styleUrl: this.styleurl, uiUrl: this.uiurl });
    this.viewModel.fetchResources().then(() => {
      if (this.symbolAttributes) {
        this.viewModel.featureToUIFields({ attributes: this.symbolAttributes });
      }
      return this._updateSymbolObject();
    });
  }

  private _updateSymbolObject(): Promise<void> {
    const uiFields = this.viewModel.getUIFields();
    const featureAttributes = this.viewModel.getFeature().attributes;
    return this.viewModel.createPreviewImage().then(img => {
      this.symbolObject = {
        uiFields: uiFields,
        previewImg: img,
        attributes: featureAttributes,
      };
      this.symbolChanged.emit(this.symbolObject);
    });
  }
  private _handleSearchBlur(event: Event): void {
    const element = event.target as HTMLInputElement;
    element.value = '';
    this._suggestionList = null;
  }

  private _handleInputChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    const fieldKey = element.parentElement.dataset['id'];
    this.viewModel.updateCurrentValue(fieldKey, element.value);
    this._updateSymbolObject();
  }

  private _handleTreeInputChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    const value = element.value;
    let tree: DomainTree = element['data-tree'];
    let newValue = '';
    let useDefault = false;

    while (tree) {
      if (tree.name === value || useDefault) {
        if (tree.code != null) {
          newValue = tree.code;
          break;
        } else {
          tree = tree.children;
          useDefault = true;
        }
      } else {
        tree = tree.peer;
      }
    }

    const fieldKey = element.parentElement.dataset['id'];
    this.viewModel.updateCurrentValue(fieldKey, newValue);
    this._updateSymbolObject();
  }

  private _handleGroupClick(event: Event): void {
    const element = event.target as HTMLLabelElement;
    let fieldSetElement = element.parentElement;
    if (fieldSetElement.tagName !== 'FIELDSET') {
      fieldSetElement = fieldSetElement.parentElement;
    }
    const newStatus = {
      ...this._groupExpandStatus,
    };
    newStatus[fieldSetElement.dataset['id']] = fieldSetElement['ariaExpanded'] === 'false' ? true : false;
    this._groupExpandStatus = newStatus;
  }

  private _handleSearchInputChange(event: Event): void {
    const searchFilterInput: HTMLInputElement = event.target as HTMLInputElement;
    const searchFilters = searchFilterInput.value;
    this._suggestionList = this.viewModel.search(searchFilters);
  }

  private _handleClickSuggest(event: Event): void {
    const target = event.target as HTMLInputElement;
    const suggestItem = target['data-item'] as SearchResultItem;
    let toProcess = [suggestItem];
    let parent = suggestItem.parent;

    while (parent) {
      toProcess.push(parent);
      parent = parent.parent;
    }

    while (toProcess.length) {
      let item = toProcess.pop();
      this.viewModel.updateCurrentValue(item.uiFieldKey, item.fieldKey);
    }

    this._suggestionList = null;
    const searchFilterInput: HTMLInputElement = target.parentElement.parentElement.previousElementSibling.children[1] as HTMLInputElement;
    searchFilterInput.value = '';

    this._updateSymbolObject();
  }

  renderSearchBox(uiFields: UIFieldUnion[]) {
    return (
      <div class={CSS.searchContainer}>
        <div key="searchInput" class="searchInput" data-id={uiFields}>
          <div>Search</div>
          <input id="searchFilter" onInput={this._handleSearchInputChange.bind(this)} onBlur={this._handleSearchBlur.bind(this)}></input>
        </div>
        {this._suggestionList ? this.renderSuggestionList() : null}
      </div>
    );
  }

  renderSuggestionList() {
    let id = 0;
    return (
      <div key="suggestionList" class={CSS.suggestionList}>
        <ul>
          {this._suggestionList.map(suggestItem => (
            <li key={'listItem' + id++} data-item={suggestItem} onMouseDown={this._handleClickSuggest.bind(this)}>
              {suggestItem.uiFieldName + ':' + suggestItem.fieldValue}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderForm(uiFields: UIFieldUnion[]) {
    const className = CSS.form;
    return (
      <div class={className} key="form">
        <form>{this.renderUIFields(uiFields)}</form>
      </div>
    );
  }

  renderUIFields(uiFields: UIFieldUnion[]): any {
    return uiFields.map(uiField => {
      if (uiField.type === 'group') {
        return this.renderGroup(uiField);
      }
      if (uiField.type === 'expression') {
        const value: string | number = uiField.value;
        return this.renderLabel(uiField, null, value);
      }
      if (uiField.type === 'text') {
        return this.renderTextInput(uiField, uiField.value);
      }
      if (uiField.type === 'coded-value-domain') {
        return this.renderLabel(uiField, uiField.domain);
      }
    });
  }

  renderGroup(uiField: UIGroupField) {
    const ariaExpanded = this._groupExpandStatus[uiField.key] === false ? false : true;
    return (
      <fieldset class={CSS.group} key={uiField.key} data-id={uiField.key} aria-expanded={ariaExpanded === false ? 'false' : 'true'}>
        <div class={CSS.groupTitle} onClick={this._handleGroupClick.bind(this)}>
          <span class={ariaExpanded ? CSS.pointRight : CSS.pointDown}>&gt; </span>
          <span>{uiField.name}</span>
        </div>
        <div class={CSS.groupFields}>{ariaExpanded ? this.renderUIFields(uiField.uiFields) : null}</div>
      </fieldset>
    );
  }

  renderLabel(uiField: UIFieldUnion, symbolDomain?: CodedValueDomain | NestedCodedValueDomain, value?: string | number) {
    return (
      <label key={uiField.key} data-id={uiField.key}>
        {uiField.name}
        {value ? (
          <p>{value}</p>
        ) : symbolDomain.type !== 'nested-coded-value' ? (
          this.renderDropdown(symbolDomain, (uiField as UICodedValueDomainField).value)
        ) : (
          this.renderDomainTree((uiField as UICodedValueDomainField).domainTree, (uiField as UICodedValueDomainField).value)
        )}
      </label>
    );
  }

  renderDropdown(symbolDomain: CodedValueDomain | NestedCodedValueDomain, value: string | number) {
    if (!symbolDomain || !(symbolDomain && (symbolDomain as CodedValueDomain).codedValues)) {
      return <input />;
    }

    return (
      <select onChange={this._handleInputChange.bind(this)}>
        {(symbolDomain as CodedValueDomain).codedValues.map((codedValue, index) =>
          String(value) === '' + codedValue.code ? (
            <option value={'' + codedValue.code} key={index} selected>
              {codedValue.name}
            </option>
          ) : (
            <option value={'' + codedValue.code} key={index}>
              {codedValue.name}
            </option>
          ),
        )}
      </select>
    );
  }

  renderDomainTree(domainTree: DomainTree, value: string | number) {
    let tree = domainTree.children;
    let values = this.viewModel.getTreeNodeNamesByValue(tree, value as string);
    let inputs: DomainTree[][] = new Array(values.length);
    for (let depth = 0; depth < inputs.length; depth++) {
      let currentLevelvalue = values[depth];
      let nextLevelTree;
      while (tree) {
        if (tree.name == currentLevelvalue) {
          nextLevelTree = tree.children;
        }
        if (!inputs[depth]) {
          inputs[depth] = [];
        }
        inputs[depth].push(tree);
        tree = tree.peer;
      }
      tree = nextLevelTree;
    }

    return inputs.map((input, i) => {
      return (
        <select onChange={this._handleTreeInputChange.bind(this)} data-tree={input[0]} key={i}>
          {input.map((node, index) =>
            String(values[i]) === '' + node.name ? (
              <option value={'' + node.name} key={index} selected>
                {node.name}
              </option>
            ) : (
              <option value={'' + node.name} key={index}>
                {node.name}
              </option>
            ),
          )}
        </select>
      );
    });
  }

  renderTextInput(uiField: UITextField, value: string | number) {
    return (
      <label key={uiField.key} data-id={uiField.key}>
        {uiField.name}
        <input onKeyUp={this._handleInputChange.bind(this)} value={!value ? null : String(value)} />
      </label>
    );
  }

  renderPreview() {
    return (
      <div class={CSS.preview} key="preview">
        <label>Preview</label>
        <img id="previewImg" src={this.symbolObject.previewImg.src} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.symbolObject?.previewImg && this.renderPreview()}
        {this.symbolObject.uiFields && this.renderSearchBox(this.symbolObject.uiFields)}
        {this.symbolObject.uiFields && this.renderForm(this.symbolObject.uiFields)}
      </div>
    );
  }
}
