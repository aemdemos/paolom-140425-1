/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed']; // Exact header as per example

  // Extract dynamic content from the element
  const links = Array.from(element.querySelectorAll('a')).map(link => link.href).join('\n'); // Combine URLs into plain text separated by newlines

  // Create table rows dynamically based on extracted data
  const cells = [
    headerRow,
    [links] // Pass the combined URLs as a single cell
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}