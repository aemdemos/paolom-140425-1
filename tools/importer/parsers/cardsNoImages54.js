/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];
  
  // Extract heading
  const heading = element.querySelector('h2')?.textContent?.trim();
  if (heading) {
    const headingElement = document.createElement('strong');
    headingElement.textContent = heading;
    rows.push([headingElement]);
  }

  // Extract paragraph
  const paragraph = element.querySelector('div[data-component="RichText"] p')?.textContent?.trim();
  if (paragraph) {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph;
    rows.push([paragraphElement]);
  }

  // Extract list items
  const listItems = element.querySelectorAll('ul li');
  listItems.forEach((item) => {
    const listItemContent = item.querySelector('div')?.textContent?.trim();
    if (listItemContent) {
      const listItemElement = document.createElement('p');
      listItemElement.textContent = listItemContent;
      rows.push([listItemElement]);
    }
  });

  // Create table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block table
  element.replaceWith(blockTable);
}