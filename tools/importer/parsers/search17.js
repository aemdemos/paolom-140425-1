/* global WebImporter */
export default function parse(element, { document }) {
  // Use the correct URL from the example
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create the header row (matches the example exactly)
  const headerRow = ['Search'];

  // Create the data row with the correct URL from the example
  const dataRow = [url];

  // Create the table structure
  const tableData = [
    headerRow,
    dataRow
  ];

  // Generate the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);

  return blockTable;
}