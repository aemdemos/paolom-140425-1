/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];

  // Extract the heading from the element
  const heading = element.querySelector('h2');

  if (heading) {
    rows.push([heading.cloneNode(true)]);
  }

  // Extract the list of links dynamically
  const list = element.querySelector('ul');

  if (list) {
    const items = Array.from(list.querySelectorAll('li'));
    items.forEach((item) => {
      const link = item.querySelector('a');
      if (link) {
        rows.push([link.cloneNode(true)]);
      }
    });
  }

  // Extract footer link dynamically
  const footer = element.querySelector('footer');
  if (footer) {
    const footerLink = footer.querySelector('a');
    if (footerLink) {
      rows.push([footerLink.cloneNode(true)]);
    }
  }

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}