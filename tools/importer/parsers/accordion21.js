/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row with exact matching text from the example
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Extract accordion items dynamically
  const accordionItems = element.querySelectorAll('[data-ref="accordion"]');

  accordionItems.forEach((accordion) => {
    const titleElement = accordion.querySelector('[data-ref="accordionHeading"]');
    const title = titleElement ? titleElement.textContent.trim() : ''; // Handle missing title gracefully

    const contentElement = accordion.querySelector('[data-ref="accordionContent"]');
    const content = [];

    if (contentElement) {
      const paragraphs = contentElement.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        content.push(paragraph.cloneNode(true)); // Clone nodes to retain full structure
      });
    } else {
      content.push(document.createTextNode('No content available')); // Fallback for missing content
    }

    // Push the extracted title and content into the table structure
    cells.push([title, content]);
  });

  // Create the table block using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table block
  element.replaceWith(table);
}