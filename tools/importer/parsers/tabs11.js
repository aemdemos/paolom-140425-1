/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row for the block
  const headerRow = ['Tabs'];

  // Extract tabs dynamically from the element
  const tabs = [];

  const sections = element.querySelectorAll('h2'); // Extract sections representing tab labels
  sections.forEach((section) => {
    const tabLabel = section.textContent.trim();
    let tabContent = [];

    // Gather all sibling nodes until the next section
    let currentNode = section.nextElementSibling;
    while (currentNode && currentNode.tagName !== 'H2') {
      tabContent.push(currentNode.cloneNode(true));
      currentNode = currentNode.nextElementSibling;
    }

    if (tabLabel && tabContent.length > 0) {
      tabs.push([tabLabel, tabContent]);
    }
  });

  // Create the table structure dynamically
  const table = WebImporter.DOMUtils.createTable([headerRow, ...tabs], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}