/* global WebImporter */
export default function parse(element, { document }) {
  // Fallback to predefined URL as specified in the example
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Define the header row, exactly as shown in the example
  const headerRow = ['Search'];

  // Define the cells for the table
  const cells = [
    headerRow, // The header row
    [url] // The second row with the correct URL
  ];

  // Create the table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}