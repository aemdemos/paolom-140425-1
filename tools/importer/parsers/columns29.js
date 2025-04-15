/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !(element instanceof document.defaultView.HTMLElement)) {
    console.error('Invalid or undefined element provided.');
    return;
  }

  const sections = Array.from(element.querySelectorAll('section'));
  if (sections.length === 0) {
    console.error('No section elements found in the provided element.');
    return;
  }

  const headerRow = ['Columns'];
  const columns = [];

  sections.forEach((section) => {
    const title = section.querySelector('h2')?.textContent.trim() || '';
    const listItems = Array.from(section.querySelectorAll('li')).map((item) => {
      const link = item.querySelector('a');
      if (link) {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        const anchor = document.createElement('a');
        anchor.textContent = text;
        anchor.href = href;
        return anchor;
      } else {
        const fallbackText = document.createTextNode(item.textContent.trim());
        return fallbackText;
      }
    });

    const columnContent = document.createElement('div');
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title;
      columnContent.appendChild(heading);
    }

    const list = document.createElement('ul');
    listItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.appendChild(item);
      list.appendChild(listItem);
    });
    columnContent.appendChild(list);

    columns.push(columnContent);
  });

  const tableData = [headerRow, columns];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}