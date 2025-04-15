/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const cards = Array.from(element.querySelectorAll('li')).map((card) => {
    // Extract title and description dynamically
    const titleElement = card.querySelector('p > strong');
    const descriptionElement = card.querySelector('p');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const description = descriptionElement ? descriptionElement.textContent.replace(title, '').trim() : '';

    // Ensure only rows with valid content are included
    if (!title && !description) {
      return null; // Skip empty rows
    }

    // Combine extracted title and description with proper HTML formatting
    const cardContent = document.createElement('div');
    if (title) {
      const titleNode = document.createElement('strong');
      titleNode.textContent = title;
      cardContent.appendChild(titleNode);
    }
    if (description) {
      const descriptionNode = document.createElement('p');
      descriptionNode.textContent = description;
      cardContent.appendChild(descriptionNode);
    }

    return [cardContent];
  }).filter(Boolean); // Filter out null rows

  const tableData = [headerRow, ...cards];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}