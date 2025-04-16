/* global WebImporter */
export default function parse(element, { document }) {
  const tables = element.querySelectorAll('table');

  tables.forEach((table) => {
    const header = table.querySelector('caption small');
    const cells = [];

    // Define the header row based on the table's caption
    const headerRow = [header ? header.textContent.trim() : 'Table (striped, bordered)'];
    cells.push(headerRow);

    // Extract table rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      const columns = Array.from(row.children).map((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent.trim();
          return a;
        }
        const textContent = cell.textContent.trim();
        return textContent === '' ? 'N/A' : textContent; // Handle empty cells
      });
      cells.push(columns);
    });

    // Create table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace table with block
    table.replaceWith(block);
  });
}