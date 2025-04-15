/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title
  const title = element.querySelector('[data-ref="heading"]')?.textContent.trim();

  // Extract the paragraph under the title
  const paragraph = element.querySelector('[data-component="RichText"]')?.textContent.trim();

  // Extract the list items
  const listItems = element.querySelectorAll('[data-ref="list"] li');
  
  const cardsData = Array.from(listItems).map((item) => {
    const content = item.querySelector('.Content-sc-mh9bui-0')?.textContent.trim();
    return content;
  });

  // Prepare the table cells
  const cells = [
    ["Cards (no images)"],
    ...cardsData.map(card => card ? [card] : [])
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}