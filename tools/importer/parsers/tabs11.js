/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];
  const rows = [];

  // Collecting tab labels and content
  const sections = element.querySelectorAll('h2');
  sections.forEach((section) => {
    const label = section.textContent.trim();
    const content = section.nextElementSibling.cloneNode(true);
    rows.push([label, content]);
  });

  // Creating the table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(blockTable);
}