/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped & bordered)'];

  // Extract all tables dynamically from the provided HTML structure
  const tables = Array.from(element.querySelectorAll('table'));

  const tableData = tables.map((table) => {
    const rows = Array.from(table.querySelectorAll('tr'));
    const extractedTableRows = rows.map((row) => {
      const cells = Array.from(row.children).map((cell) => {
        return cell.querySelector('a') ? cell.querySelector('a') : cell.textContent.trim();
      });
      return cells;
    });
    return extractedTableRows;
  });

  // Combine multiple tables, but prepend headers as per example
  const combinedTables = tableData.flat();

  // Create the block's table
  const block = WebImporter.DOMUtils.createTable([headerRow, ...combinedTables], document);

  element.replaceWith(block);
}