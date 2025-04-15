/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the navigation items dynamically from the HTML element
  const items = Array.from(element.querySelectorAll('button')).map(button => {
    const label = button.querySelector('span:nth-child(2)')?.textContent.trim();
    const contentElement = document.createElement('div');
    contentElement.textContent = `Extracted content for ${label}`; // Replace with actual content extraction logic if available
    return [label, contentElement];
  }).filter(row => row[0]); // Filter out empty rows

  // Create the header row for the table
  const headerRow = ['Tabs'];

  // Combine the header row and extracted rows into the table structure
  const tableData = [headerRow, ...items];

  // Create the table block using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}