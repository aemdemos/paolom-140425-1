/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered)'];

  // Extract all tables and their data
  const tables = element.querySelectorAll('table');
  const tableBlocks = Array.from(tables).map((table) => {
    const rows = Array.from(table.rows).map((row) => {
      return Array.from(row.cells).map((cell) => {
        return cell.innerHTML.trim(); // Extract cell content dynamically
      });
    });

    return rows; // Return rows only, no captions
  });

  // Map into the required format without captions or empty rows
  const cells = [headerRow, ...tableBlocks.map((rows) => {
    return [
      WebImporter.DOMUtils.createTable(rows, document),
    ];
  })];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(blockTable);
}