/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Extract the header and description
  const header = element.querySelector('[data-ref="heading"]');
  const description = element.querySelector('[data-component="RichText"] > p');

  // Extract list items
  const listItems = element.querySelectorAll('[data-component="ListTicksCrosses"] li');

  // Safely handle missing header or description
  const headerContent = header ? header.textContent.trim() : '';
  const descriptionContent = description ? description.textContent.trim() : '';

  // Create rows for each list item
  const rows = Array.from(listItems).map((item) => {
    const content = item.querySelector('p');
    return [content ? content.textContent.trim() : ''];
  });

  // Combine rows with the header row
  const cells = [headerRow, [headerContent, descriptionContent], ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}