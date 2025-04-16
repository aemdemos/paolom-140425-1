/* global WebImporter */
export default function parse(element, { document }) {
  const tabs = [];

  // Extract all tab labels and their content
  const listItems = element.querySelectorAll('li.ButtonAndDropdownContainer-sc-15zdlyk-0');
  listItems.forEach((item) => {
    const labelElement = item.querySelector('span:nth-child(2)');
    const label = labelElement ? labelElement.textContent.trim() : '';

    // Tab content placeholder (no detailed content available in provided HTML)
    const content = document.createElement('p');
    content.textContent = `Content for ${label}`;

    // Add to tabs array as [Tab Label, Tab Content]
    tabs.push([label, content]);
  });

  // Create the table structure
  const tableData = [
    ['Tabs'],
    ...tabs,
  ];

  // Create and replace the original element with the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}