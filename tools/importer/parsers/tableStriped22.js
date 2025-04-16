/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with exact text from the example
  const headerRow = ['Table (striped)'];

  const rows = [];

  const tableElement = element.querySelector('table');
  if (tableElement) {
    const tableRows = Array.from(tableElement.querySelectorAll('tr'));

    tableRows.forEach((row, index) => {
      const cells = Array.from(row.children).map((cell) => {
        return cell.textContent.trim();
      });
      rows.push(cells);
    });
  }

  // Ensure column headers are extracted and placed correctly
  const columnHeaders = rows[0]; // Extract first row as column headers

  const cells = [
    headerRow,
    columnHeaders, // Add column headers as the second row
    ...rows.slice(1), // Add remaining rows as table body
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}