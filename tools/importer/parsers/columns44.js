/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Helper function to extract the relevant content for the column
  function extractContent(container) {
    const heading = container.querySelector('[data-component="Heading3"]');
    const image = container.querySelector('[data-component="Image"] img');
    const richText = container.querySelector('[data-component="RichText"]');
    const link = container.querySelector('[data-ref="link"]');

    const contentElements = [];

    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent;
      contentElements.push(headingElement);
    }

    if (image) {
      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt;
      contentElements.push(imageElement);
    }

    if (richText) {
      contentElements.push(...richText.children);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      contentElements.push(linkElement);
    }

    return contentElements;
  }

  // Extract content for each column
  const columns = Array.from(element.querySelectorAll('[data-ref="gridColumn"]'))
    .map((column) => extractContent(column));

  // Prepare the table data
  const tableData = [
    headerRow,
    columns
  ];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}