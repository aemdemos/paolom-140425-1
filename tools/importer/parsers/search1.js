/* global WebImporter */
export default function parse(element, { document }) {
  // Try to extract the search form's action attribute dynamically
  const formElement = element.querySelector('form');
  let queryIndexURL = '';
  if (formElement) {
    queryIndexURL = formElement.getAttribute('action') || 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  } else {
    queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  }

  // Create the header row with the EXACT text required
  const headerRow = ['Search'];

  // Create the content row with the dynamically extracted URL
  const contentRow = [document.createElement('a')];
  contentRow[0].href = queryIndexURL;
  contentRow[0].textContent = queryIndexURL;
  contentRow[0].setAttribute('target', '_blank');

  // Construct the table structure
  const cells = [
    headerRow, // Header row
    contentRow // Content row with extracted URL
  ];

  // Create the block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);

  return blockTable;
}