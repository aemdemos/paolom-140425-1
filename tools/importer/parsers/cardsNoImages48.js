/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const cards = [];

  // Extract title and description
  const heading = element.querySelector('[data-ref="heading"]');
  const headingText = heading ? heading.textContent.trim() : '';

  const description = element.querySelector('[data-component="RichText"] p');
  const descriptionText = description ? description.textContent.trim() : '';

  if (headingText || descriptionText) {
    cards.push([`${headingText}\n${descriptionText}`]);
  }

  // Extract list items
  const listItems = element.querySelectorAll('ul[data-ref="list"] li');

  listItems.forEach((item) => {
    const text = item.querySelector('p');
    const textContent = text ? text.textContent.trim() : '';
    if (textContent) {
      cards.push([textContent]);
    }
  });

  const tableData = [headerRow, ...cards];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}