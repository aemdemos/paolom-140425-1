/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row according to the example provided
  const headerRow = ['Accordion'];

  // Extract rows by iterating over h2 elements and their contents
  const rows = Array.from(element.querySelectorAll('h2')).map((heading) => {
    const title = heading.textContent.trim();

    // Collect all sibling elements until the next h2 or end
    const content = [];
    let nextSibling = heading.nextElementSibling;
    while (nextSibling && nextSibling.tagName !== 'H2') {
      content.push(nextSibling);
      nextSibling = nextSibling.nextElementSibling;
    }

    return [title, content];
  });

  // Combine header row and content rows
  const cells = [headerRow, ...rows];

  // Create the table using the provided helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}