/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const cells = [];
  // Add header row
  cells.push(headerRow);

  const columns = Array.from(element.querySelectorAll('[data-ref="gridColumn"]'));

  const contentRows = columns.map((column) => {
    const titleElement = column.querySelector('[data-ref="heading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const descriptionElement = column.querySelector('[data-component="RichText"] p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    const linkElement = column.querySelector('[data-ref="link"]');
    const link = document.createElement('a');
    if (linkElement) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent.trim();
    }

    // Group all content into a single cell for each column
    const contentCell = [
      document.createElement('hr'),
      title,
      description,
      link,
    ];

    return [contentCell];
  });

  // Ensure each row is correctly formatted as an array
  cells.push(...contentRows);

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}