/* global WebImporter */
export default function parse(element, { document }) {
  // Define the exact header row for the block table
  const blockHeaderRow = ['Table (striped)'];

  const tableData = [];

  const rows = element.querySelectorAll('tr');

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll(index === 0 ? 'th' : 'td');
    const rowData = [];

    cells.forEach((cell) => {
      const content = cell.textContent.trim();
      if (content) {
        rowData.push(content);
      }
    });

    // Add rows to the table data, ensuring headers are included
    if (rowData.length > 0) {
      tableData.push(rowData);
    }
  });

  // Ensure the final table structure adheres to the example format
  const finalTableStructure = [blockHeaderRow, ...tableData];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(finalTableStructure, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}