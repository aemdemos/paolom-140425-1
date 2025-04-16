/* global WebImporter */
export default function parse(element, {document}) {
  const headerRow = ['Cards (no images)'];

  const cardsData = [];
  const columns = element.querySelectorAll('[data-ref="gridColumn"]');

  columns.forEach((col) => {
    const titleElement = col.querySelector('[data-ref="heading"] span');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const descriptionElement = col.querySelector('p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    const linkElement = col.querySelector('a[data-ref="link"]');
    const link = linkElement ? linkElement.outerHTML : '';

    const cellContent = [];

    if (title) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = title;
      cellContent.push(titleEl);
    }

    if (description) {
      const descEl = document.createElement('p');
      descEl.textContent = description;
      cellContent.push(descEl);
    }

    if (link) {
      const linkEl = document.createElement('div');
      linkEl.innerHTML = link;
      cellContent.push(linkEl);
    }

    cardsData.push([cellContent]);
  });

  const cells = [headerRow, ...cardsData];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}