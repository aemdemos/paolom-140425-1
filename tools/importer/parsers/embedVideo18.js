/* global WebImporter */
export default function parse(element, { document }) {
  const urlElement = element.querySelector('a[data-ref="link"]');
  const imageElement = element.querySelector('img');

  // Ensure the header row matches the example exactly
  const headerRow = ['Embed'];

  // Construct the content row dynamically
  const contentRow = [];

  // Add image if it exists
  if (imageElement) {
    contentRow.push(imageElement);
  }

  // Add URL if it exists
  if (urlElement) {
    const urlLink = document.createElement('a');
    urlLink.href = urlElement.href;
    urlLink.textContent = urlElement.href;
    contentRow.push(urlLink);
  } else {
    contentRow.push('No valid URL found'); // Handle edge case for missing URL
  }

  // Create the table with dynamically extracted content
  const tableCells = [
    headerRow,
    [contentRow],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the structured block table
  element.replaceWith(blockTable);
}