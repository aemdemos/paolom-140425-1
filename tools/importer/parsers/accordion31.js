/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const rows = [];

  // Extract accordion sections dynamically
  const accordionSections = element.querySelectorAll('[data-ref="accordion"]');

  accordionSections.forEach((section) => {
    const titleElement = section.querySelector('[data-ref="accordionHeading"]');
    const contentElement = section.querySelector('[data-ref="accordionContent"]');

    if (titleElement && contentElement) {
      const title = titleElement.textContent.trim();

      // Clone content to preserve structure, extracting links if available
      const contentClone = contentElement.cloneNode(true);
      const links = contentClone.querySelectorAll('a');
      const content = Array.from(links).map(link => {
        const clonedLink = link.cloneNode(true);
        return clonedLink;
      });

      rows.push([title, content]);
    }
  });

  // Create the block table dynamically
  const block = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the block table
  element.replaceWith(block);
}