/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search'];

  // Locate the search area
  const searchForm = element.querySelector('form');
  if (!searchForm) {
    console.warn('Search form not found, returning empty table.');
    const cells = [headerRow, ['No Search Form Available']];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  const queryUrlElement = searchForm.querySelector('input[name="query"]');
  const actionUrl = searchForm.getAttribute('action');

  // Validate URLs and set a fallback if missing
  const queryIndexUrl = actionUrl && actionUrl !== '#' ? actionUrl : 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create content row dynamically
  const linkElement = document.createElement('a');
  linkElement.href = queryIndexUrl;
  linkElement.textContent = queryIndexUrl;

  const contentRow = [linkElement];

  const cells = [
    headerRow,
    contentRow,
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured table
  element.replaceWith(block);
}