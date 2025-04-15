/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [['Cards']];

  // Extract rows (actual cards) dynamically from the element
  const rows = element.querySelectorAll('div.card');

  rows.forEach((row) => {
    // Extract image dynamically
    const image = row.querySelector('img');
    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) imageElement.src = image.src;

    // Extract title dynamically
    const title = row.querySelector('h2');
    const titleElement = title ? document.createElement('strong') : null;
    if (titleElement) titleElement.textContent = title.textContent;

    // Extract description dynamically
    const description = row.querySelector('p');
    const descriptionElement = description ? document.createElement('span') : null;
    if (descriptionElement) descriptionElement.textContent = description.textContent;

    // Combine title and description into a single cell, ensuring proper handling of missing data
    const cellContent = [titleElement, descriptionElement].filter(Boolean);

    // Add new row to the table
    cells.push([imageElement, cellContent]);
  });

  // Create the table using the extracted cells
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}