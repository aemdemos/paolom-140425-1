/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = Array.from(element.querySelectorAll('[data-component="CardCTATextLinks"]')).map((card) => {
    const heading = card.querySelector('[data-ref="heading"]');
    const description = card.querySelector('.Content-sc-mh9bui-0 p');
    const link = card.querySelector('[data-ref="link"]');

    const content = [];

    if (heading) {
      const headingEl = document.createElement('strong');
      headingEl.textContent = heading.textContent.trim();
      content.push(headingEl);
      content.push(document.createElement('br'));
    }

    if (description) {
      content.push(description.textContent.trim());
      content.push(document.createElement('br'));
    }

    if (link) {
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.textContent = link.textContent.trim();
      content.push(linkEl);
    }

    return content.length > 0 ? [content] : null;
  }).filter(row => row !== null);

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}