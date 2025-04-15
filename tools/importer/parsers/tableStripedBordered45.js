/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row based on example
  const headerRow = ['Table (striped, bordered)'];

  // Initialize an array to hold the rows of the table
  const rows = [];

  // Select all tables within the provided element
  const tables = element.querySelectorAll('table');
  tables.forEach((table) => {
    // Extract and include the table caption as a row
    const tableCaption = table.querySelector('caption small');
    if (tableCaption) {
      rows.push([document.createTextNode(tableCaption.textContent.trim())]);
    }

    // Process each table row's cells
    const tableRows = table.querySelectorAll('tbody tr');
    tableRows.forEach((tr) => {
      const cells = [];
      tr.querySelectorAll('td, th').forEach((cell) => {
        // Check if the cell contains a link and handle it dynamically
        const link = cell.querySelector('a');
        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.target = '_blank';
          anchor.textContent = link.textContent.trim();
          cells.push(anchor);
        } else {
          // Handle normal text content
          cells.push(cell.textContent.trim());
        }
      });
      rows.push(cells);
    });

    // Add a standalone row with a separator after each table
    const separator = document.createElement('hr');
    rows.push([separator]);
  });

  // Create the block table using the extracted data
  const block = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}