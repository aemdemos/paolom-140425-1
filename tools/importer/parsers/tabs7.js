/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];

  // Extract tab labels and content
  const tabs = Array.from(element.querySelectorAll('ul > li')).map((li) => {
    // Extract tab label
    const tabLabel = li.querySelector('button > span:last-child');
    const labelText = tabLabel ? tabLabel.textContent.trim() : '';

    // Placeholder for dynamic content extraction
    // Ideally, extract actual tab content from relevant child elements
    // Assuming content is not available directly, we use the label as content for now.
    const tabContent = document.createTextNode(labelText + ' Content');

    return [labelText, tabContent];
  });

  // Create the block table
  const cells = [headerRow, ...tabs];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);

  return table;
}