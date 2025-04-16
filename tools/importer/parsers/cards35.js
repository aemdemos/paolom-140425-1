/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const rows = Array.from(element.querySelectorAll('.SideBySideLayout__ContainerWrapper-sc-nb03j7-1'));

  const cards = rows.map((row) => {
    // Extract image element
    const imageElement = row.querySelector('svg, img');
    const image = imageElement ? imageElement.cloneNode(true) : ''; // Clone the image or SVG element

    // Extract title element
    const titleElement = row.querySelector('h2');
    const title = titleElement ? document.createElement('strong') : '';
    if (titleElement && title) {
      title.textContent = titleElement.textContent;
    }

    // Extract description element
    const descriptionElement = row.querySelector('p');
    const description = descriptionElement ? document.createElement('p') : '';
    if (descriptionElement && description) {
      description.textContent = descriptionElement.textContent;
    }

    // Extract list items and structure them within a <ul>
    const listElements = row.querySelectorAll('ul li');
    const listItems = Array.from(listElements).map((li) => {
      const item = document.createElement('li');
      item.textContent = li.textContent.trim();
      return item;
    });
    const list = listItems.length > 0 ? document.createElement('ul') : '';
    if (listItems.length > 0 && list) {
      list.append(...listItems);
    }

    // Extract button element
    const buttonElement = row.querySelector('a[data-testid="PrimaryButton"]');
    const button = buttonElement ? buttonElement.cloneNode(true) : ''; // Clone the button element

    // Combine content into a single cell
    const content = [];
    if (title) content.push(title);
    if (description) content.push(description);
    if (list) content.push(list);
    if (button) content.push(button);

    // Return row as [image, content]
    return [image, content];
  });

  // Combine header row with card rows
  const tableData = [headerRow, ...cards];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new structure
  element.replaceWith(block);
}