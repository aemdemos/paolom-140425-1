/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Gather all card elements
  const cardElements = element.querySelectorAll('[data-component="CardCTATextLinks"]');

  // Parse cards to extract their content
  const rows = Array.from(cardElements).map((card) => {
    const heading = card.querySelector('[data-ref="heading"]');
    const description = card.querySelector('p');
    const link = card.querySelector('[data-ref="link"][data-testid="TextLink"]');

    const cellContent = [];

    // Add heading if exists
    if (heading) {
      const hElement = document.createElement('h2');
      hElement.textContent = heading.textContent.trim();
      cellContent.push(hElement);
    }

    // Add description if exists
    if (description) {
      const pElement = document.createElement('p');
      pElement.textContent = description.textContent.trim();
      cellContent.push(pElement);
    }

    // Add link if exists
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      cellContent.push(linkElement);
    }

    return [cellContent];
  });

  // Add header to block table
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}