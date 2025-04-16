/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import search1Parser from './parsers/search1.js';
import embedVideo8Parser from './parsers/embedVideo8.js';
import tabs7Parser from './parsers/tabs7.js';
import hero6Parser from './parsers/hero6.js';
import tabs11Parser from './parsers/tabs11.js';
import cardsNoImages10Parser from './parsers/cardsNoImages10.js';
import search17Parser from './parsers/search17.js';
import columns9Parser from './parsers/columns9.js';
import accordion15Parser from './parsers/accordion15.js';
import hero2Parser from './parsers/hero2.js';
import accordion21Parser from './parsers/accordion21.js';
import columns12Parser from './parsers/columns12.js';
import cardsNoImages19Parser from './parsers/cardsNoImages19.js';
import accordion25Parser from './parsers/accordion25.js';
import columns4Parser from './parsers/columns4.js';
import cardsNoImages26Parser from './parsers/cardsNoImages26.js';
import search28Parser from './parsers/search28.js';
import cardsNoImages20Parser from './parsers/cardsNoImages20.js';
import columns29Parser from './parsers/columns29.js';
import cards5Parser from './parsers/cards5.js';
import columns3Parser from './parsers/columns3.js';
import tableStriped22Parser from './parsers/tableStriped22.js';
import accordion31Parser from './parsers/accordion31.js';
import accordion33Parser from './parsers/accordion33.js';
import cardsNoImages34Parser from './parsers/cardsNoImages34.js';
import cards38Parser from './parsers/cards38.js';
import cardsNoImages37Parser from './parsers/cardsNoImages37.js';
import tableStripedBordered14Parser from './parsers/tableStripedBordered14.js';
import accordion23Parser from './parsers/accordion23.js';
import cards35Parser from './parsers/cards35.js';
import embedVideo18Parser from './parsers/embedVideo18.js';
import columns36Parser from './parsers/columns36.js';
import columns44Parser from './parsers/columns44.js';
import cardsNoImages41Parser from './parsers/cardsNoImages41.js';
import accordion42Parser from './parsers/accordion42.js';
import cardsNoImages46Parser from './parsers/cardsNoImages46.js';
import tableStripedBordered13Parser from './parsers/tableStripedBordered13.js';
import cardsNoImages48Parser from './parsers/cardsNoImages48.js';
import cardsNoImages53Parser from './parsers/cardsNoImages53.js';
import tabs47Parser from './parsers/tabs47.js';
import hero52Parser from './parsers/hero52.js';
import cardsNoImages54Parser from './parsers/cardsNoImages54.js';
import cards56Parser from './parsers/cards56.js';
import cards55Parser from './parsers/cards55.js';
import tabs39Parser from './parsers/tabs39.js';
import columns40Parser from './parsers/columns40.js';
import tableStripedBordered43Parser from './parsers/tableStripedBordered43.js';
import tableStripedBordered49Parser from './parsers/tableStripedBordered49.js';
import tableStripedBordered45Parser from './parsers/tableStripedBordered45.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  search1: search1Parser,
  embedVideo8: embedVideo8Parser,
  tabs7: tabs7Parser,
  hero6: hero6Parser,
  tabs11: tabs11Parser,
  cardsNoImages10: cardsNoImages10Parser,
  search17: search17Parser,
  columns9: columns9Parser,
  accordion15: accordion15Parser,
  hero2: hero2Parser,
  accordion21: accordion21Parser,
  columns12: columns12Parser,
  cardsNoImages19: cardsNoImages19Parser,
  accordion25: accordion25Parser,
  columns4: columns4Parser,
  cardsNoImages26: cardsNoImages26Parser,
  search28: search28Parser,
  cardsNoImages20: cardsNoImages20Parser,
  columns29: columns29Parser,
  cards5: cards5Parser,
  columns3: columns3Parser,
  tableStriped22: tableStriped22Parser,
  accordion31: accordion31Parser,
  accordion33: accordion33Parser,
  cardsNoImages34: cardsNoImages34Parser,
  cards38: cards38Parser,
  cardsNoImages37: cardsNoImages37Parser,
  tableStripedBordered14: tableStripedBordered14Parser,
  accordion23: accordion23Parser,
  cards35: cards35Parser,
  embedVideo18: embedVideo18Parser,
  columns36: columns36Parser,
  columns44: columns44Parser,
  cardsNoImages41: cardsNoImages41Parser,
  accordion42: accordion42Parser,
  cardsNoImages46: cardsNoImages46Parser,
  tableStripedBordered13: tableStripedBordered13Parser,
  cardsNoImages48: cardsNoImages48Parser,
  cardsNoImages53: cardsNoImages53Parser,
  tabs47: tabs47Parser,
  hero52: hero52Parser,
  cardsNoImages54: cardsNoImages54Parser,
  cards56: cards56Parser,
  cards55: cards55Parser,
  tabs39: tabs39Parser,
  columns40: columns40Parser,
  tableStripedBordered43: tableStripedBordered43Parser,
  tableStripedBordered49: tableStripedBordered49Parser,
  tableStripedBordered45: tableStripedBordered45Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
