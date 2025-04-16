/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)']; // Header row as per example

  const rows = [];

  // Extract all card elements dynamically
  const cards = element.querySelectorAll('[data-component="CardContactSimple"]');

  cards.forEach((card) => {
    // Extract title
    const titleElement = card.querySelector('[data-ref="heading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract availability text
    const availabilityElement = card.querySelector('[data-testid="CardAvailability"]');
    const availability = availabilityElement ? availabilityElement.innerHTML.trim() : '';

    // Extract action text
    const actionElement = card.querySelector('[data-testid="CardActionText"]');
    const action = actionElement ? actionElement.innerHTML.trim() : '';

    // Create the content cell dynamically
    const contentCell = document.createElement('div');

    if (title) {
      const titleNode = document.createElement('strong');
      titleNode.textContent = title;
      contentCell.appendChild(titleNode);
      contentCell.appendChild(document.createElement('br'));
    }

    if (availability) {
      const availabilityNode = document.createElement('p');
      availabilityNode.innerHTML = availability; // Keeping the HTML structure intact
      contentCell.appendChild(availabilityNode);
    }

    if (action) {
      const actionNode = document.createElement('p');
      actionNode.innerHTML = action; // Keeping the HTML structure intact
      contentCell.appendChild(actionNode);
    }

    rows.push([contentCell]);
  });

  // Create table cells array
  const cells = [headerRow, ...rows];

  // Replace the original element with the new table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}