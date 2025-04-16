/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the given element
  const cards = Array.from(element.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0'));

  // Define header row for the block
  const headerRow = ['Cards (no images)'];

  // Collect rows for each card
  const rows = cards.map((card) => {
    const heading = card.querySelector('[data-ref="heading"]');
    const description = card.querySelector('.vertical-rhythm--richText > p');
    const link = card.querySelector('[data-ref="link"]');

    const content = [];

    // Add heading if present
    if (heading) {
      content.push(document.createTextNode(heading.textContent.trim()));
      content.push(document.createElement('br')); // Line break
    }

    // Add description if present
    if (description) {
      content.push(document.createTextNode(description.textContent.trim()));
      content.push(document.createElement('br')); // Line break
    }

    // Add link if present
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      content.push(linkElement);
    }

    return [content];
  });

  // Create block table with header and rows
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}