/* global WebImporter */

export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  const headerRow = ['Cards (no images)'];
  cells.push(headerRow);

  // Process each section within the element
  const sections = element.querySelectorAll('[data-component="CardLinkList"]');

  sections.forEach((section) => {
    const heading = section.querySelector('h3')?.textContent.trim();
    const listItems = Array.from(section.querySelectorAll('ul li a')).map((link) => {
      const linkText = link.querySelector('span')?.textContent.trim();
      const linkHref = link.getAttribute('href');

      // Create the link element
      const linkElement = document.createElement('a');
      linkElement.href = linkHref;
      linkElement.textContent = linkText;

      return linkElement;
    });

    const contentCell = document.createElement('div');

    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading;
      contentCell.appendChild(headingElement);
    }

    listItems.forEach(item => {
      contentCell.appendChild(item);
    });

    cells.push([contentCell]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}