/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Fixing the header row with <strong> element
  const headerElement = document.createElement('strong');
  headerElement.textContent = 'Cards (no images)';
  cells.push([headerElement]);

  // Extract cards based on heading (h2) and description (p)
  const cards = element.querySelectorAll('h2, div[data-component="RichText"]');

  cards.forEach(card => {
    const headingText = card.querySelector('h2')?.textContent.trim();
    const paragraphElements = Array.from(card.querySelectorAll('p')).map(p => {
      const paragraphClone = document.createElement('p');
      paragraphClone.textContent = p.textContent.trim();
      return paragraphClone;
    });
    const linkElements = Array.from(card.querySelectorAll('a')).map(link => {
      const linkClone = document.createElement('a');
      linkClone.href = link.href;
      linkClone.textContent = link.textContent.trim();
      return linkClone;
    });

    const content = [];
    if (headingText) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = headingText;
      content.push(headingElement);
    }

    content.push(...paragraphElements);
    content.push(...linkElements);

    if (content.length > 0) {
      cells.push([content]);
    }
  });

  // Replace the existing element with the newly created table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}