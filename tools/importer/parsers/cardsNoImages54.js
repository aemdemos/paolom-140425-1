/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const cards = [];

  // Extract the section title
  const title = element.querySelector('h2[data-ref="heading"]');
  if (title) {
    const strongTitle = document.createElement('strong');
    strongTitle.textContent = title.textContent;
    cards.push([strongTitle]);
  }

  // Extract the description paragraph
  const description = element.querySelector('div[data-component="RichText"] p');
  if (description) {
    cards.push([description.cloneNode(true)]);
  }

  // Extract list items and their descriptions
  const lists = element.querySelectorAll('ul[data-ref="list"]');
  lists.forEach((list) => {
    const items = list.querySelectorAll('li');
    items.forEach((item) => {
      const content = item.querySelector('div.vertical-rhythm--richText');
      if (content) {
        cards.push([content.cloneNode(true)]);
      }
    });
  });

  // Create table for the block
  const cells = [headerRow, ...cards];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}