/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to parse tables
  const parseTable = (table, document) => {
    // Ensure the header row matches the example exactly
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Table (striped, bordered)';

    const rows = Array.from(table.rows).map((row) => {
      return Array.from(row.cells).map((cell) => {
        // Extract cell content dynamically
        return cell.innerHTML.trim() || ''; // Handle missing or empty data
      });
    });

    // Create table block using WebImporter helper
    return WebImporter.DOMUtils.createTable(
      [headerRow, ...rows],
      document
    );
  };

  // Locate all tables within the element
  const tables = Array.from(element.querySelectorAll('table'));

  // Extract tables and replace original element
  tables.forEach((table) => {
    const structuredTable = parseTable(table, document);
    table.parentElement.replaceChild(structuredTable, table);
  });
}