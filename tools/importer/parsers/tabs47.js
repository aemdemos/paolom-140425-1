/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the tab labels and their corresponding content dynamically
  const tabs = [];
  const listItems = element.querySelectorAll('ul > li');

  listItems.forEach(li => {
    const button = li.querySelector('button');
    if (button) {
      const tabLabel = button.querySelector('span:nth-child(2)')?.textContent.trim();
      const tabContent = document.createElement('div');
      tabContent.textContent = `Content for ${tabLabel}`; // Placeholder for actual tab content if available
      tabs.push([tabLabel, tabContent]);
    }
  });

  // Create the table structure
  const cells = [['Tabs'], ...tabs];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table
  element.replaceWith(blockTable);
}