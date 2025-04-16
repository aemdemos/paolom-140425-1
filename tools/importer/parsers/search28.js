/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search']; // Header remains fixed as per example

  // Extracting the URL from the form action attribute, defaulting to example URL if invalid or missing
  const formElement = element.querySelector('form');
  const url = formElement && formElement.action && formElement.action !== '#' && formElement.action !== 'about:blank#' ? formElement.action : 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  const cells = [
    headerRow,
    [url]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}