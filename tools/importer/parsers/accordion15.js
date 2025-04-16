/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract accordion items
  const extractAccordionItems = (accordion) => {
    const items = [];
    const headers = accordion.querySelectorAll('[data-ref="accordionHeader"]');
    const contents = accordion.querySelectorAll('[data-ref="accordionContent"]');

    headers.forEach((header, index) => {
      const title = header.querySelector('span')?.textContent.trim();
      const contentContainer = contents[index];
      const content = contentContainer ? [...contentContainer.childNodes].filter(node => node instanceof Element || (node instanceof Text && node.textContent.trim())) : [];
      items.push([title, content]);
    });

    return items;
  };

  const headerRow = ['Accordion'];
  const blockTable = [headerRow];

  const accordions = element.querySelectorAll('[data-component="AccordionSimple"]');
  if (accordions.length === 0) {
    console.warn('No accordions found in the provided element');
  }

  accordions.forEach((accordion) => {
    const items = extractAccordionItems(accordion);
    items.forEach(([title, content]) => {
      if (!title || (Array.isArray(content) && content.length === 0)) {
        console.warn(`Skipping empty or invalid accordion item: title=${title}, content=${content}`);
        return;
      }
      blockTable.push([title, content]);
    });
  });

  const table = WebImporter.DOMUtils.createTable(blockTable, document);

  element.replaceWith(table);
}