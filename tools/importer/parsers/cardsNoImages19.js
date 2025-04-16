/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];

  const heading = element.querySelector('h2[data-ref="heading"]');
  if (heading) {
    rows.push([heading.textContent.trim()]);
  }

  const listItems = element.querySelectorAll('ul[data-ref="list"] li');
  listItems.forEach((item) => {
    const link = item.querySelector('a[data-ref="link"]');
    if (link) {
      const linkText = link.querySelector('span[data-ref="linkContent"]');
      if (linkText) {
        rows.push([linkText.textContent.trim()]);
      }
    }
  });

  const footerLink = element.querySelector('footer a[data-ref="link"]');
  if (footerLink) {
    const footerText = footerLink.querySelector('span[data-ref="linkContent"]');
    if (footerText) {
      rows.push([footerText.textContent.trim()]);
    }
  }

  const tableData = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}