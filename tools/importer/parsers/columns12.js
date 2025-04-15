/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const items = Array.from(element.querySelectorAll('li')).map((item) => {
    const heading = item.querySelector('h3')?.textContent.trim();
    const paragraph = item.querySelector('p')?.textContent.trim();
    const image = item.querySelector('img');

    const imageElement = image ? document.createElement('img') : null;
    if (image && imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    }

    return [
      [
        heading ? document.createTextNode(heading) : '',
        paragraph ? document.createTextNode(paragraph) : '',
      ].filter(Boolean),
      imageElement,
    ];
  });

  // Create block table
  const headerRow = ['Columns'];
  const cells = [
    headerRow,
    ...items,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}