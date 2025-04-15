/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract accordion content
  const extractAccordionContent = (accordion) => {
    const title = accordion.querySelector('[data-ref="accordionHeading"]');
    const content = accordion.querySelector('[data-ref="accordionContent"]');

    if (!title || !content) return null;

    const titleText = title.textContent.trim();
    const contentElements = Array.from(content.querySelectorAll('p')).map((p) => {
      const clonedP = document.createElement('p');
      clonedP.innerHTML = p.innerHTML;
      return clonedP;
    });

    return [titleText, contentElements];
  };

  // Extract all accordion items
  const accordionItems = Array.from(element.querySelectorAll('[data-ref="accordion"]'));

  const rows = accordionItems.map((accordion) => extractAccordionContent(accordion)).filter(Boolean);

  if (rows.length === 0) {
    console.warn('No accordion items found in the element.');
    return; // Return early if no valid content is found
  }

  // Define the block header row
  const headerRow = ['Accordion'];

  // Combine header row and content rows
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}