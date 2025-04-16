/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Columns'];
  const columns = [];

  // Parse columns from the HTML element
  const columnElements = element.querySelectorAll('.FooterNavigation__ColumnedFooter-sc-e6atpx-0 .NelComponents__Col-sc-vsly48-38');

  columnElements.forEach(col => {
    const header = col.querySelector('h2')?.textContent || '';
    const listItems = Array.from(col.querySelectorAll('ul > li > small > a')).map(link => {
      const text = link.querySelector('span')?.textContent || '';
      const href = link.href;
      const item = document.createElement('div');
      item.textContent = text;
      if(href) {
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.textContent = text;
        return anchor;
      } 
      return text;
    });

    const column = document.createElement('div');
    column.innerHTML = `<h3>${header}</h3>`;
    const list = document.createElement('ul');
    listItems.forEach(item => {
      const listItem = document.createElement('li');
      if (typeof item === 'string') {
        listItem.textContent = item;
      } else {
        listItem.appendChild(item);
      }
      list.appendChild(listItem);
    });
    column.appendChild(list);
    columns.push(column);
  });

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, columns], document);

  // Replace the original element with the block
  element.replaceWith(blockTable);

  return blockTable;
}