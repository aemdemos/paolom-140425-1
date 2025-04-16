/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row - Exact match from example
  rows.push(['Cards']);

  // Process each card
  const cards = element.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0');
  cards.forEach((card) => {
    // Extract image
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const image = document.createElement('img');
    if (imageContainer && imageContainer.style.backgroundImage) {
      const imageUrlMatch = imageContainer.style.backgroundImage.match(/url\("(.*?)"\)/);
      image.src = imageUrlMatch ? imageUrlMatch[1] : '';
    } else {
      image.alt = 'No image available';
    }

    // Extract title
    const titleElement = card.querySelector('h2');
    const title = document.createElement('strong');
    if (titleElement) {
      title.textContent = titleElement.textContent;
    }

    // Extract description
    const descriptionElement = card.querySelector('.Content-sc-mh9bui-0 p');
    const description = document.createElement('p');
    if (descriptionElement) {
      description.textContent = descriptionElement.textContent;
    }

    // Extract link
    const linkElement = card.querySelector('a[data-ref="link"]');
    const link = document.createElement('a');
    if (linkElement) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent;
    }

    // Handle edge cases where required data might be missing
    const firstCell = image.src || image.alt ? image : document.createTextNode('No image available');
    const secondCellContent = [title, description, link].filter((el) => el.textContent || el.href);

    // Create row for the card
    rows.push([firstCell, secondCellContent]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with the table
  element.replaceWith(table);
}