/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  // Extracting each accordion section
  const sections = element.querySelectorAll('[data-component="GuideSection"]');

  sections.forEach((section) => {
    const titleElement = section.querySelector('[data-ref="heading"]');
    const contentElement = section.querySelector('[data-component="RichText"]');

    if (titleElement && contentElement) {
      const title = titleElement.textContent.trim();
      const content = contentElement.innerHTML.trim();

      const contentCell = document.createElement('div');
      contentCell.innerHTML = content;

      rows.push([title, contentCell]);
    }
  });

  // Create the table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}