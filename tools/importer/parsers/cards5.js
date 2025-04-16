/* global WebImporter */
export default function parse(element, { document }) {
  // Extract cards from the element dynamically
  const cardElements = Array.from(element.querySelectorAll('.card'));
  
  // Handle edge cases if no cards are present
  if (!cardElements.length) {
    console.error('No cards found in the element.');
    return;
  }

  const rows = [];

  // Add the header row, as specified exactly in the example
  rows.push(['Cards']);

  cardElements.forEach((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');

    // Handle missing data dynamically
    const imageElement = image ? image.cloneNode(true) : null;
    const titleText = title ? title.textContent.trim() : '';
    const descriptionText = description ? description.textContent.trim() : '';

    // Add card data to the rows
    rows.push([
      [imageElement], // Image or icon
      [document.createElement('strong').textContent = titleText, descriptionText] // Title and description
    ]);
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}