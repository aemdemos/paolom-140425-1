/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row - matches example exactly
  cells.push(['Embed']);

  // Extract URLs dynamically and ensure proper separation
  const links = Array.from(element.querySelectorAll('a')).map((link) => {
    const container = document.createElement('div'); // Separate links logically
    const url = document.createElement('a');
    url.href = link.href;
    url.textContent = link.href;
    container.appendChild(url);
    return container;
  });

  // Content row with separate link elements
  if (links.length > 0) {
    cells.push([links]);
  } else {
    console.warn('No links found in the provided element');
    cells.push(['No content available']);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}