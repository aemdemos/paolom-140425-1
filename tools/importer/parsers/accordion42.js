/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Process each accordion section
  const sections = element.querySelectorAll('[data-component="GuideSection"]');
  sections.forEach((section) => {
    const titleElement = section.querySelector('[data-ref="heading"]');
    const contentElement = section.querySelector('[data-component="RichText"]');

    if (titleElement && contentElement) {
      const title = titleElement.textContent.trim();
      
      // Clone content to preserve elements
      const contentClone = contentElement.cloneNode(true);

      cells.push([title, contentClone]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}