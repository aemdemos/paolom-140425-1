/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with the block name
  const headerRow = ['Accordion'];

  const rows = [];

  // Select all accordion sections within the element
  const sections = element.querySelectorAll('.VerticalRhythm-sc-16b971y-0.kgLxmR[data-component="GuideSection"]');

  // Iterate through each section to extract title and content
  sections.forEach(section => {
    const title = section.querySelector('h2')?.textContent.trim();

    // Combine all relevant content elements (paragraphs, lists, headings, links)
    const contentElements = Array.from(section.querySelectorAll('p, ul, h3, a')).map(el => {
      if (el.tagName === 'A') {
        const link = document.createElement('a');
        link.href = el.href;
        link.textContent = el.textContent.trim();
        return link;
      }
      return el.cloneNode(true);
    });

    // Create a content cell to store all extracted elements
    const contentCell = document.createElement('div');
    contentElements.forEach(el => contentCell.appendChild(el));

    // Add the title and content cell as a row in the table
    rows.push([title, contentCell]);
  });

  // Combine header row and all rows into the final cells array
  const cells = [headerRow, ...rows];

  // Create the structured table block using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}