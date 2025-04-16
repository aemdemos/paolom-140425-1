/* global WebImporter */
export default function parse(element, { document }) {
  const columnsHeader = ['Columns'];

  // Map through the columns and extract all content into a single cell per column
  const columnsContent = Array.from(element.querySelectorAll('[data-ref="gridColumn"]')).map((col) => {
    // Extract heading text
    const heading = col.querySelector('[data-component="Heading3"]')?.textContent.trim() || '';

    // Extract paragraph text
    const paragraph = col.querySelector('[data-component="RichText"] > p')?.textContent.trim() || '';

    // Extract link
    const linkElement = col.querySelector('[data-ref="link"]');
    const link = linkElement ? document.createElement('a') : null;
    if (link) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent.trim();
    }

    // Create an <hr> element
    const hr = document.createElement('hr');

    // Combine all content into a single cell for the column
    const cellContent = [
      hr,
      document.createTextNode(heading),
      document.createElement('br'),
      document.createTextNode(paragraph),
      document.createElement('br'),
      link,
    ].filter(Boolean);

    // Wrap all elements inside a div for the cell
    const div = document.createElement('div');
    div.append(...cellContent);

    return div;
  });

  // Create the table structure with header and content rows
  const cells = [columnsHeader, columnsContent];

  // Generate the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table block
  element.replaceWith(block);
}