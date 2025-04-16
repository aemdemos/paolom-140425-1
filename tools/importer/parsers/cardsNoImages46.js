/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const sections = Array.from(element.querySelectorAll('section'));

  const rows = sections.map((section) => {
    const heading = section.querySelector('[data-ref="heading"]')?.innerText || '';
    const listItems = Array.from(section.querySelectorAll('[data-ref="link"]')).map((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.getAttribute('href');
      linkElement.innerText = link.querySelector('[data-ref="linkContent"]')?.innerText || '';
      return linkElement;
    });

    const container = document.createElement('div');

    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.innerText = heading;
      container.appendChild(headingElement);
    }

    listItems.forEach((item) => container.appendChild(item));

    return [container];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
  return block;
}