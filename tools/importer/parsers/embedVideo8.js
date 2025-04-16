/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Embed'];
  cells.push(headerRow);

  // Extract links dynamically and format as plain text wrapped in <span>
  const links = Array.from(element.querySelectorAll('a')).map(a => {
    const urlSpan = document.createElement('span');
    urlSpan.textContent = a.href; // Use plain text for URLs
    return urlSpan;
  });

  // Handle edge cases where links might be empty
  if (links.length === 0) {
    const emptySpan = document.createElement('span');
    emptySpan.textContent = 'No links available';
    links.push(emptySpan);
  }

  // Content row with formatted links
  const contentRow = [links];
  cells.push(contentRow);

  // Create the table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}