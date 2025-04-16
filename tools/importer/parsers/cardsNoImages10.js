/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Extract the main title
  const titleElement = element.querySelector('[data-component="Heading2"]');

  // Extract the list items
  const listItems = Array.from(
    element.querySelectorAll('[data-component="ListTicksCrosses"] li')
  );

  const rows = listItems.map((item) => {
    const contentElement = item.querySelector('p');
    // Handle edge case for missing content
    if (!contentElement) {
      return undefined; // Exclude entirely
    }
    return [contentElement.cloneNode(true)];
  }).filter(Boolean); // Remove undefined rows

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}