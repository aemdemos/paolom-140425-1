/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matching the example exactly
  const headerRow = ['Cards (no images)'];

  // Initialize the table cells with the header row
  const cells = [headerRow];

  // Select all sections (cards) in the element
  const sections = element.querySelectorAll('[data-component="CardLinkList"]');

  // Loop through each section (card)
  sections.forEach((section) => {
    // Extract the heading
    const heading = section.querySelector('[data-ref="heading"]');
    const listItems = section.querySelectorAll('[data-ref="link"]');

    // Create content array for the card
    const content = [];

    // Add heading as a strong element, if it exists
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent;
      content.push(headingElement);
    }

    // Add links from the list, each with a <br> for spacing
    if (listItems.length > 0) {
      listItems.forEach((link, index) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.getAttribute('href');
        linkElement.textContent = link.textContent;
        content.push(linkElement);
        // Ensure spacing using <br>, except after the last link
        if (index < listItems.length - 1) {
          content.push(document.createElement('br'));
        }
      });
    }

    // Add the content array as a row to the table
    cells.push([content]);
  });

  // Create the block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}