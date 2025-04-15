/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  // Extract all accordion items
  const accordionItems = element.querySelectorAll('[data-ref="accordion"]');

  accordionItems.forEach((accordion) => {
    const titleButton = accordion.querySelector('[data-ref="accordionHeading"]');
    const content = accordion.querySelector('[data-ref="accordionContent"]');

    if (titleButton && content) {
      const title = titleButton.textContent.trim();
      const contentClone = content.cloneNode(true);
      rows.push([title, contentClone]);
    }
  });

  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}