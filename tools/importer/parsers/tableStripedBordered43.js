/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  const tables = Array.from(element.querySelectorAll('table'));

  const structuredTables = tables.map((table) => {
    const headerRow = ['Table (striped, bordered)']; // Using the exact header row from example

    const rows = Array.from(table.rows).map((row) => {
      return Array.from(row.cells).map((cell) => {
        const clonedCell = cell.cloneNode(true);
        clonedCell.innerHTML = cell.innerHTML.trim(); // Ensure we get dynamic content and clean whitespace
        return clonedCell;
      });
    });

    return createTable([headerRow, ...rows], document);
  });

  structuredTables.forEach((blockTable) => {
    element.append(blockTable); // Append the new structured table to the element
  });

  element.querySelectorAll('table').forEach((table) => table.remove()); // Remove original tables
}