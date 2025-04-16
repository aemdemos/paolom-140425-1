/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const gridColumns = [...element.querySelectorAll('[data-ref="gridColumn"]')];

  const contentCells = gridColumns.map((gridColumn) => {
    const content = [];

    // Extract heading
    const heading = gridColumn.querySelector('[data-ref="heading"]');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      content.push(h2);
    }

    // Extract paragraph text
    const richText = gridColumn.querySelector('[data-component="RichText"]');
    if (richText) {
      const paragraphs = [...richText.querySelectorAll('p')];
      paragraphs.forEach((paragraph) => {
        content.push(paragraph.cloneNode(true));
      });
    }

    // Extract links
    const links = [...gridColumn.querySelectorAll('[data-ref="link"]')];
    links.forEach((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      content.push(anchor);
    });

    // Handle popular searches list if present
    const list = gridColumn.querySelector('[data-ref="list"]');
    if (list) {
      const items = [...list.querySelectorAll('li')];
      const ul = document.createElement('ul');
      items.forEach((item) => {
        const li = document.createElement('li');
        const anchor = item.querySelector('a');
        if (anchor) {
          const linkElement = document.createElement('a');
          linkElement.href = anchor.href;
          linkElement.textContent = anchor.textContent;
          li.appendChild(linkElement);
        }
        ul.appendChild(li);
      });
      content.push(ul);
    }

    return content;
  });

  const rows = [headerRow, contentCells];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}