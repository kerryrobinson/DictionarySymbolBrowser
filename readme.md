# Dictionary Symbol Browser

Dictionary Symbol Browser is a web component that provides a interactive way to browser dictionary symbols. It can be used as a custom element in html + vanilla JavaScript or with any JavaScript Framework, such as Vue, Angular or React. It has a dependency of the ArcGIS API for JavaScript for its dictionary symbol rasterizer and can be integrated with any web mapping API.

## Usage

```html
<dictionary-symbol-browser
      styleurl="https://www.arcgis.com/sharing/rest/content/items/7842f07fabbf48a4b768fc5aa66dc5b7"
      uiurl="./assets/data/mil2525bc2-ui-with-groups-texts.json"
    ></dictionary-symbol-browser>
```

`stylturl` defines the dictionary style. Here we are using a Military Symbol 2525BC-1 style as an example.

`uiurl` defines an UI JSON associated with the style. 

### Live Examples:
https://fangli88.github.io/DictionarySymbolBrowserExamples/custom-element-arcgis-jsapi/
https://fangli88.github.io/DictionarySymbolBrowserExamples/custom-element-leaflet/