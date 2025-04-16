/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  cells.push(['Cards']);

  // Process each card within the element
  const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');
  cards.forEach((card) => {
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const titleElement = card.querySelector('[data-ref="heading"]');
    const contentElement = card.querySelector('[data-testid="CardContent"] p');
    const linkElement = card.querySelector('[data-ref="link"]');

    const image = imageContainer ? imageContainer.cloneNode(true) : '';
    const title = titleElement ? `<strong>${titleElement.textContent}</strong>` : '';
    const description = contentElement ? contentElement.textContent : '';
    const link = linkElement ? linkElement.cloneNode(true) : '';

    const textContent = document.createElement('div');
    if (title) {
      const titleNode = document.createElement('div');
      titleNode.innerHTML = title;
      textContent.appendChild(titleNode);
    }
    if (description) {
      const descriptionNode = document.createElement('div');
      descriptionNode.textContent = description;
      textContent.appendChild(descriptionNode);
    }
    if (link) {
      textContent.appendChild(link);
    }

    cells.push([image, textContent]);
  });

  // Create table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}