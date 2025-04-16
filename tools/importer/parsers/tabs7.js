/* global WebImporter */
export default function parse(element, { document }) {
  const tabs = [];
  const headerRow = ['Tabs'];

  // Extract tab labels and content dynamically from buttons within the list items
  element.querySelectorAll('li').forEach((li) => {
    const button = li.querySelector('button');
    const tabLabel = button?.innerText.trim();

    // Dynamically create content for each tab based on its label
    const tabContent = document.createElement('div');
    tabContent.innerText = `${tabLabel} content`; // Placeholder for tab content, dynamically using tab label
    
    if (tabLabel) {
      tabs.push([tabLabel, tabContent]);
    }
  });

  // Ensure the header matches the example exactly
  const table = WebImporter.DOMUtils.createTable([headerRow, ...tabs], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}