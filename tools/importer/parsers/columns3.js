/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];
  const columnsData = [];

  const columnElements = element.querySelectorAll('.FooterNavigation__ColumnedFooter-sc-e6atpx-0 > .NelComponents__Grid-sc-vsly48-37 > .NelComponents__Col-sc-vsly48-38');

  columnElements.forEach((col) => {
    const columnContent = [];

    // Extract heading
    const heading = col.querySelector('h2');
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent;
      columnContent.push(headingElement);
    }

    // Extract list items
    const list = col.querySelector('ul');
    if (list) {
      const listElement = document.createElement('ul');
      list.querySelectorAll('li').forEach((item) => {
        const listItem = document.createElement('li');
        const link = item.querySelector('a');
        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent.trim();
          listItem.appendChild(anchor);
        } else {
          listItem.textContent = item.textContent.trim();
        }
        listElement.appendChild(listItem);
      });
      columnContent.push(listElement);
    }

    columnsData.push(columnContent);
  });

  const tableData = [headerRow, columnsData];

  if (columnsData.length === 0) {
    console.warn('No columns extracted from the element. Please check the structure.');
  }

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}