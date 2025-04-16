/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];

  // Extract the title content as plain text
  const title = element.querySelector('h2');
  if (title) {
    rows.push([title.textContent.trim()]);
  }

  // Extract the list items and their links as plain text
  const listItems = element.querySelectorAll('ul > li');
  listItems.forEach((li) => {
    const link = li.querySelector('a');
    const linkContent = link ? link.textContent.trim() : '';
    rows.push([linkContent]);
  });

  // Extract the footer link as plain text
  const footerLink = element.querySelector('footer a');
  if (footerLink) {
    rows.push([footerLink.textContent.trim()]);
  }

  // Create the block table using WebImporter.DOMUtils.createTable()
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}