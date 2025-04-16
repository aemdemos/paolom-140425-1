/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  rows.push(["Accordion"]);

  // Collect title-content pairs from the element
  const sections = element.querySelectorAll('h2[data-ref="heading"], h3[data-ref="heading"]');

  sections.forEach((section) => {
    const title = section.textContent.trim();

    // Find content after the title
    const content = document.createElement('div');
    let nextSibling = section.nextElementSibling;
    while (nextSibling && nextSibling.tagName !== 'HR') {
      content.appendChild(nextSibling.cloneNode(true));
      nextSibling = nextSibling.nextElementSibling;
    }

    // Ensure both title and content are added to rows
    rows.push([title, content]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}