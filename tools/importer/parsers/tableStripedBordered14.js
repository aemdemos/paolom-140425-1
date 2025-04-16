/* global WebImporter */
export default function parse(element, { document }) {
  // Extract tables dynamically
  const tables = element.querySelectorAll('table');

  const cells = [];

  // Add table header row
  cells.push(['Table (striped, bordered)']);

  // Iterate through tables and add each one
  tables.forEach((table) => {
    cells.push([table]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block
  element.replaceWith(block);
}