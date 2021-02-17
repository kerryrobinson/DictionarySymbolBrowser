import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: "dictionarysymbolbrowser",
  taskQueue: 'async',
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: './',
    },
    {
      type: "docs-readme"
    }
  ],
};