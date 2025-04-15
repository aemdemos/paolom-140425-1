/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Extract all cards from the given element
  const cards = element.querySelectorAll('[data-component="CardContactSimple"]');

  // Map each card to a table row
  const rows = Array.from(cards).map((card) => {
    // Extract heading
    const heading = card.querySelector('[data-ref="heading"]');
    const title = heading ? heading.textContent.trim() : '';

    // Extract description
    const descriptionEl = card.querySelector('[data-testid="CardAvailability"]');
    const description = descriptionEl ? descriptionEl.textContent.trim() : '';

    // Extract call-to-action
    const actionEl = card.querySelector('[data-testid="CardActionText"]');
    const action = actionEl ? actionEl.innerHTML.trim() : '';

    // Combine content into a single table cell
    const content = document.createElement('div');
    if (title) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = title;
      content.appendChild(titleEl);
    }
    if (description) {
      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = description;
      content.appendChild(descriptionEl);
    }
    if (action) {
      const actionWrapper = document.createElement('div');
      actionWrapper.innerHTML = action;
      content.appendChild(actionWrapper);
    }

    return [content];
  });

  // Create the block table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}