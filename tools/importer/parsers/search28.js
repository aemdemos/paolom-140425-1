/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search'];

  // Extract URL dynamically from the <form> element and handle the '#' fallback case
  const searchForm = element.querySelector('form');
  let searchUrl = '';
  if (searchForm && searchForm.hasAttribute('action')) {
    const actionValue = searchForm.getAttribute('action');
    searchUrl = actionValue === '#' ? 'URL not found' : actionValue;
  } else {
    searchUrl = 'URL not found';
  }

  const dataRows = [
    [searchUrl],
  ];

  const tableData = [headerRow, ...dataRows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);

  return blockTable;
}