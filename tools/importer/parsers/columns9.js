/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Collect the two column elements
  const columns = element.querySelectorAll('[data-ref="gridColumn"]');

  // Parse the content within each column
  const columnContent = Array.from(columns).map((col) => {
    const contentItems = [];

    // Add horizontal rule for section separation
    const hrElement = document.createElement('hr');
    contentItems.push(hrElement);

    // Extract heading
    const heading = col.querySelector('[data-ref="heading"]');
    if (heading && heading.textContent.trim()) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent.trim();
      contentItems.push(headingElement);
    }

    // Extract rich text
    const richText = col.querySelector('[data-component="RichText"]');
    if (richText) {
      const paragraph = richText.querySelector('p');
      if (paragraph && paragraph.textContent.trim()) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent.trim();
        contentItems.push(paragraphElement);
      }
    }

    // Extract link
    const link = col.querySelector('[data-ref="link"]');
    if (link && link.textContent.trim()) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      contentItems.push(anchor);
    }

    return contentItems;
  });

  // Create the table structure
  const cells = [
    headerRow,
    columnContent // Each column's content is correctly formatted as an array of elements
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}