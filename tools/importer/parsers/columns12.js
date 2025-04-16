/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Columns'];

  const cells = [headerRow];

  // Extract all `li` items within the given element
  const items = Array.from(element.querySelectorAll('li'));

  // Map over `li` items to create structured content for each column
  const columns = items.map((item) => {
    const title = item.querySelector('h3');
    const paragraph = item.querySelector('p');
    const image = item.querySelector('img');

    // Create and populate title element
    const titleElement = document.createElement('h3');
    titleElement.textContent = title ? title.textContent.trim() : '';

    // Create and populate paragraph element
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph ? paragraph.textContent.trim() : '';

    // Create and populate image element
    const imageElement = document.createElement('img');
    if (image && image.src) {
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    }

    return [titleElement, paragraphElement, imageElement];
  });

  // Add extracted columns to the table rows
  cells.push(columns);

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}