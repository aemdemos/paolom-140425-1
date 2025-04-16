/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards']);

  // Extract card data
  const cards = element.querySelectorAll('.nel-Link-3'); // Modified selector to match the given structure

  cards.forEach(card => {
    const img = card.querySelector('svg'); // Extracting the SVG element as the image
    const titleElement = card.querySelector('span.nel-Link-5');
    const descriptionElement = card.querySelector('path');

    const image = img ? img.cloneNode(true) : document.createElement('div');
    const textContent = document.createElement('div');

    if (titleElement && titleElement.textContent.trim()) {
      const heading = document.createElement('h2');
      heading.textContent = titleElement.textContent.trim();
      textContent.appendChild(heading);
    }

    if (descriptionElement && descriptionElement.textContent.trim()) {
      const paragraph = document.createElement('p');
      paragraph.textContent = descriptionElement.textContent.trim();
      textContent.appendChild(paragraph);
    }

    rows.push([image, textContent]);
  });

  // Create table and replace element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}