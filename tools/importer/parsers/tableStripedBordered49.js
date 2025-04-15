/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered)'];

  const tables = element.querySelectorAll('table');
  const result = [];

  tables.forEach((table) => {
    const rows = Array.from(table.querySelectorAll('tr')).map((row) => {
      return Array.from(row.children).map((cell) => {
        return cell.textContent.trim();
      });
    });

    const tableBlock = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
    result.push(tableBlock);
  });

  const container = document.createElement('div');
  result.forEach((block) => container.appendChild(block));

  element.replaceWith(container);
}