/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to parse tables
  const parseTable = (table, captionText) => {
    const rows = Array.from(table.querySelectorAll('tr'));
    const parsedRows = rows.map((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll(rowIndex === 0 ? 'th' : 'td'));
      return cells.map((cell) => {
        const link = cell.querySelector('a');
        return link ? link : cell.textContent.trim();
      });
    }).filter(row => row.length > 0); // Remove empty rows

    return [[captionText], ...parsedRows];
  };

  // Extract tables with correct captions
  const tables = Array.from(element.querySelectorAll('table'));
  const blocks = tables.map((table) => {
    const caption = table.querySelector('caption');
    const captionText = caption ? caption.textContent.trim() : 'Unnamed Table';
    const tableData = parseTable(table, captionText);
    return WebImporter.DOMUtils.createTable(tableData, document);
  });

  // Replace element with new blocks
  blocks.forEach((block) => {
    element.parentNode.insertBefore(block, element);
  });
  element.parentNode.removeChild(element);
}