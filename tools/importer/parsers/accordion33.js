/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  // Get all accordion sections
  const sections = element.querySelectorAll('.VerticalRhythm-sc-16b971y-0.kgLxmR.vertical-rhythm--section');

  sections.forEach((section) => {
    const titleElement = section.querySelector('[data-ref="heading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    if (!title) {
      return; // Skip if title is missing
    }

    const contentElements = section.querySelectorAll('.RichText__StyledRichTextContent-sc-1j7koit-0, p, ul');

    const content = Array.from(contentElements).map((el) => {
      const clone = document.createElement(el.tagName);
      clone.innerHTML = el.innerHTML;
      return clone;
    });

    if (content.length > 0) {
      rows.push([title, content]);
    }
  });

  // If no rows extracted, do not process further
  if (rows.length === 0) {
    console.warn('No rows extracted from accordion content');
    return;
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}