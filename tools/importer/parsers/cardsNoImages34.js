/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Cards (no images)']);

  // Process each card
  const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');
  cards.forEach((card) => {
    const content = document.createElement('div');

    // Extract the heading
    const heading = card.querySelector('[data-ref="heading"]');
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent.trim();
      content.appendChild(headingElement);
    }

    // Extract the description
    const description = card.querySelector('[data-testid="CardContent"] p');
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      content.appendChild(descriptionElement);
    }

    // Extract the link
    const link = card.querySelector('[data-ref="link"]');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      content.appendChild(linkElement);
    }

    // Add the row
    rows.push([content]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);

  return table;
}