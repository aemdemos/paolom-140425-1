/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements dynamically
  const headingElement = element.querySelector('[data-ref="heading"]');
  const subheadingElement = element.querySelector('.Content-sc-mh9bui-0');

  // Create cells for the table
  const headerRow = ['Hero']; // Header row must match example exactly

  const contentRow = [];

  // Handle edge cases for missing or empty elements
  if (headingElement && headingElement.innerHTML.trim() !== '') {
    const heading = document.createElement('h1');
    heading.innerHTML = headingElement.innerHTML; // Dynamically extract heading content
    contentRow.push(heading);
  }

  // Avoid duplicate <p> tags by ensuring proper wrapping
  if (subheadingElement && subheadingElement.innerHTML.trim() !== '') {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingElement.textContent; // Use textContent instead of innerHTML
    contentRow.push(subheading);
  }

  const cells = [
    headerRow,
    contentRow.length > 0 ? [contentRow] : []
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}