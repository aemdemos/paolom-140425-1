/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract content from the list items in the provided element
  const listItems = element.querySelectorAll('li');

  const contentCells = Array.from(listItems).map((item) => {
    const heading = item.querySelector('h3');
    const paragraph = item.querySelector('p');
    const image = item.querySelector('img');

    const headingElement = heading ? document.createElement('h3') : null;
    if (headingElement) {
      headingElement.textContent = heading.textContent.trim();
    }

    const paragraphElement = paragraph ? document.createElement('p') : null;
    if (paragraphElement) {
      paragraphElement.textContent = paragraph.textContent.trim();
    }

    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    return [
      [headingElement, paragraphElement],
      imageElement,
    ].flat().filter(Boolean);
  });

  const cells = [
    headerRow,
    ...contentCells,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}