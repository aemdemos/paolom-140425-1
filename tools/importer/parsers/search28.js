/* global WebImporter */
export default function parse(element, { document }) {
  const formElement = element.querySelector('form');

  // Fix: Ensure action attribute is extracted correctly, even if empty
  const actionURL = formElement?.getAttribute('action');
  const validURL = actionURL && actionURL !== '#' ? actionURL : 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  const tableData = [
    ['Search'],
    [validURL],
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}