/* global WebImporter */
export default function parse(element, { document }) {

  const headerRow = ['Table (striped, bordered)'];

  const extractTableData = (tableElement) => {
    const rows = [];
    const tableHeader = tableElement.querySelector('thead')?.querySelectorAll('tr') || [];
    const tableBody = tableElement.querySelector('tbody')?.querySelectorAll('tr') || [];

    tableHeader.forEach((headerRow) => {
      const cols = Array.from(headerRow.children).map((col) => col.textContent.trim());
      rows.push(cols);
    });

    tableBody.forEach((bodyRow) => {
      const cols = Array.from(bodyRow.children).map((col) => {
        const links = col.querySelectorAll('a');
        if (links.length > 0) {
          return Array.from(links).map((link) => {
            const span = document.createElement('span');
            span.textContent = link.textContent.trim();
            span.setAttribute('href', link.href);
            return span;
          });
        }
        return col.textContent.trim();
      });
      rows.push(cols);
    });

    return rows;
  };

  const tables = element.querySelectorAll('table');
  const tableBlocks = [];

  tables.forEach((table) => {
    const extractedTableData = extractTableData(table);
    const tableStructure = [headerRow, ...extractedTableData];
    const block = WebImporter.DOMUtils.createTable(tableStructure, document);
    tableBlocks.push(block);
  });

  const wrapper = document.createElement('div');
  tableBlocks.forEach((block) => {
    wrapper.appendChild(block);
    wrapper.appendChild(document.createElement('hr'));
  });

  element.replaceWith(wrapper);
}