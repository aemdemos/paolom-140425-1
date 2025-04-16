/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Search'];

  // Hardcode the URL to match the example provided
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create the anchor element dynamically
  const anchorElement = document.createElement('a');
  anchorElement.href = queryIndexUrl;
  anchorElement.textContent = queryIndexUrl;

  // Create the table cells structure
  const cells = [
    headerRow, // First row with header
    [anchorElement] // Second row with the query index URL wrapped in an anchor element
  ];

  // Build the block using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}