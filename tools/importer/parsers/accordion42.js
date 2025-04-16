/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row for Accordion block
  rows.push(['Accordion']);

  // Extract accordion items
  const sections = element.querySelectorAll('[data-component="GuideSection"]');

  sections.forEach((section) => {
    // Extract title of the section
    const titleElement = section.querySelector('[data-ref="heading"]');
    const contentElement = section.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0');

    if (titleElement && contentElement) {
      const title = titleElement.textContent.trim();

      // Normalize content: Remove unnecessary duplicates and normalize <h3> tags
      const contentClone = contentElement.cloneNode(true);
      const headers = contentClone.querySelectorAll('h3');
      headers.forEach(header => {
        const plainText = document.createTextNode(header.textContent);
        header.replaceWith(plainText);
      });

      // Remove duplicate links
      const links = contentClone.querySelectorAll('a');
      const seenLinks = new Set();
      links.forEach(link => {
        if (seenLinks.has(link.href)) {
          link.remove();
        } else {
          seenLinks.add(link.href);
        }
      });

      rows.push([title, contentClone]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);

  return table;
}