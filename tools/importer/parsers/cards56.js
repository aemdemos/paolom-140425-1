/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('[data-component="CardCTATextLinks"]'));

  const cells = [
    ['Cards'],
  ];

  cards.forEach((card) => {
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const image = imageContainer ? imageContainer.cloneNode(true) : null;

    const heading = card.querySelector('h2') ? card.querySelector('h2').textContent.trim() : '';
    const paragraphs = Array.from(card.querySelectorAll('p')).map(p => p.textContent.trim());
    const link = card.querySelector('a');
    const linkText = link ? link.textContent.trim() : '';
    const linkElement = link ? link.cloneNode(true) : null;

    const textContent = document.createElement('div');
    if (heading) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = heading;
      textContent.appendChild(headingElement);
    }
    paragraphs.forEach((paragraph) => {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph;
      textContent.appendChild(paragraphElement);
    });
    if (linkElement) {
      textContent.appendChild(linkElement);
    }

    cells.push([image, textContent]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}