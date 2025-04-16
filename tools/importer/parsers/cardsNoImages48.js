/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Extract content from the `h2` element
  const heading = element.querySelector('[data-component="Heading2"]');

  // Extract description paragraph
  const description = element.querySelector('[data-component="RichText"] p');

  // Extract list items
  const listItems = element.querySelectorAll('[data-ref="list"] li');

  // Create rows for each list item
  const rows = Array.from(listItems).map((item) => {
    const listDescription = item.querySelector('p');
    return [
      listDescription ? listDescription.textContent.trim() : '',
    ];
  });

  // Combine all rows into a table array
  const cells = [
    headerRow,
    [heading ? heading.textContent.trim() : ''],
    [description ? description.textContent.trim() : ''],
    ...rows,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}