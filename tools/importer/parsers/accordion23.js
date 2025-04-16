export default function parse(element, { document }) {
  /* global WebImporter */

  // Define the exact header for the block table
  const headerRow = ['Accordion'];

  // Initialize an array to collect rows for the table
  const rows = [];

  // Find all H2 headers in the element (indicating sections)
  const headers = element.querySelectorAll('h2');

  headers.forEach((header) => {
    // Extract the content following each header
    let contentElement = header.nextElementSibling;
    const content = []; // Collect all content for this section

    while (contentElement && !contentElement.matches('h2') && !contentElement.matches('hr')) {
      if (contentElement.textContent.trim() !== '') {
        content.push(contentElement.cloneNode(true));
      }
      contentElement = contentElement.nextElementSibling; // Move to the next sibling
    }

    // If content is empty, skip the row entirely
    if (content.length > 0) {
      rows.push([header.textContent.trim(), content]);
    }
  });

  // Create a table using WebImporter.DOMUtils.createTable
  const tableContent = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);
}