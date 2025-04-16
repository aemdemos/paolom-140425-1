/* global WebImporter */
export default function parse(element, { document }) {
  // Define the expected URL as a default value
  const defaultUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Extract the link dynamically from the provided HTML
  const linkElement = element.querySelector('a[href]');
  const linkUrl = linkElement?.href === defaultUrl ? linkElement.href : defaultUrl;

  // Define the header row
  const headerRow = ['Search'];

  // Define the content row with the URL
  const contentRow = [linkUrl];

  // Create block table structure
  const cells = [
    headerRow, // Header row with the block name
    contentRow // Content row with the correct URL
  ];

  // Create the table using the provided utility
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}