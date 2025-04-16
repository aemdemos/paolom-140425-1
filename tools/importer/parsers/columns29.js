/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Ensure the input element is a valid HTMLElement
  if (!(element instanceof document.defaultView.HTMLElement)) {
    console.error('Invalid element provided');
    return;
  }

  // Check if sections exist before querying
  const sections = element.querySelectorAll('section');

  const contentRows = Array.from(sections).map((section) => {
    const headerElement = section.querySelector('h2');
    const header = headerElement ? headerElement.textContent.trim() : '';

    const listItems = Array.from(section.querySelectorAll('li')).map((item) => {
      const link = item.querySelector('a');
      if (link) {
        const linkContent = document.createElement('a');
        linkContent.href = link.href;
        linkContent.textContent = link.querySelector('span')?.textContent.trim() || '';
        return linkContent;
      }
      return document.createTextNode('');
    });

    const contentCell = document.createElement('div');
    if (header) {
      const sectionHeader = document.createElement('h3');
      sectionHeader.textContent = header;
      contentCell.appendChild(sectionHeader);
    }
    listItems.forEach((link) => contentCell.appendChild(link));

    return contentCell;
  });

  // Combine header and content into table
  const cells = [
    headerRow,
    contentRows
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the block
  if (block) {
    element.replaceWith(block);
  }
}