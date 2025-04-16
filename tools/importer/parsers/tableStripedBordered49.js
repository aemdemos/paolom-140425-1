/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Helper functions
  const createHR = () => document.createElement('hr');

  const getTextContent = (selector) => {
    const el = element.querySelector(selector);
    return el ? el.textContent.trim() : ''; // Safely handle missing elements
  };

  const getTableData = (tableElement) => {
    const rows = [];

    // Extract header row
    const exactHeaderRow = ['Table (striped, bordered)'];
    rows.push(exactHeaderRow);

    const headerRows = tableElement.querySelectorAll('thead tr');
    headerRows.forEach((header) => {
      const cells = Array.from(header.children).map((cell) => cell?.textContent?.trim() || '');
      rows.push(cells);
    });

    // Extract body rows
    const bodyRows = tableElement.querySelectorAll('tbody tr');
    bodyRows.forEach((bodyRow) => {
      const cells = Array.from(bodyRow.children).map((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent;
          return [cell?.textContent?.trim().replace(link.textContent, '').trim() || '', a];
        }
        return cell?.textContent?.trim() || ''; 
      });
      rows.push(cells);
    });

    return rows;
  };

  // Extracting content
  const title = getTextContent('h1');
  const tables = element.querySelectorAll('table');

  // Create blocks
  const blocks = [];

  // Add title as a separate block
  blocks.push(createTable([['Gold Credit Card rates and details'], [title]], document));

  // Process all tables
  tables.forEach((table) => {
    const tableData = getTableData(table);
    if (tableData.length > 0) {
      blocks.push(createTable(tableData, document));
    }
    blocks.push(createHR());
  });

  // Replace original element
  const wrapper = document.createElement('div');
  blocks.forEach((block) => wrapper.appendChild(block));
  element.replaceWith(wrapper);
}