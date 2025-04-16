/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  // Extract accordion items
  const accordionItems = element.querySelectorAll('[data-ref="accordion"]');
  
  const rows = Array.from(accordionItems).map((item) => {
    const titleButton = item.querySelector('[data-ref="accordionHeader"]');
    const title = titleButton ? titleButton.textContent.trim() : '';

    const contentWrapper = item.querySelector('[data-testid="AccordionContent"]');
    const contentCell = document.createElement('div');

    if (contentWrapper) {
      const links = contentWrapper.querySelectorAll('a');
      links.forEach((link) => {
        const linkElement = document.createElement('div');
        linkElement.appendChild(link.cloneNode(true));
        contentCell.appendChild(linkElement);
      });
    }

    return [title, contentCell];
  });

  // Create block table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}