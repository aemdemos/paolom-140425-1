/* global WebImporter */
export default function parse(element, { document }) {
  // Extract cards
  const cards = Array.from(element.querySelectorAll('[data-component="CardContactSimple"]'));

  // Create rows for the table
  const rows = cards.map((card) => {
    const titleElement = card.querySelector('[data-ref="heading"]');
    const contentElement = card.querySelector('[data-testid="CardAvailability"]');
    const actionElement = card.querySelector('[data-testid="CardActionText"]');

    // Extract title text
    const title = titleElement ? titleElement.textContent.trim() : '';
    
    // Extract content text
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    // Extract action text
    const actions = actionElement ? actionElement.innerHTML.trim() : '';

    // Combine all parts together
    const combinedContent = document.createElement('div');
    if (title) {
      const titleNode = document.createElement('h3');
      titleNode.textContent = title;
      combinedContent.appendChild(titleNode);
    }
    if (content) {
      const contentNode = document.createElement('div');
      contentNode.innerHTML = content;
      combinedContent.appendChild(contentNode);
    }
    if (actions) {
      const actionsNode = document.createElement('div');
      actionsNode.innerHTML = actions;
      combinedContent.appendChild(actionsNode);
    }

    return [combinedContent];
  });

  // Add block header
  const headerRow = ['Cards (no images)'];
  rows.unshift([headerRow]);

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the table block
  element.replaceWith(table);
}