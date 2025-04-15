/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');

  const rows = Array.from(cards).map((card) => {
    const heading = card.querySelector('[data-ref="heading"]');
    const description = card.querySelector('p');
    const link = card.querySelector('[data-ref="link"]');

    const cellContent = [];

    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent;
      cellContent.push(headingElement);
      cellContent.push(document.createElement('br'));
    }

    if (description) {
      const descriptionElement = document.createElement('span');
      descriptionElement.textContent = description.textContent;
      cellContent.push(descriptionElement);
      cellContent.push(document.createElement('br'));
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      cellContent.push(linkElement);
    }

    return [cellContent];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(table);
}