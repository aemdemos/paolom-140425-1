/* global WebImporter */
export default function parse(element, { document }) {
  const blocks = [];

  // Extract and structure the content dynamically
  const title = element.querySelector('h1')?.textContent.trim();
  if (title) {
    const headerRow = ['Title'];
    const contentRow = [title];
    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
    blocks.push(table);
  }

  const sections = element.querySelectorAll('h3');
  sections.forEach((section) => {
    const sectionTitle = section.textContent.trim();
    const nextTable = section.nextElementSibling?.querySelector('table');

    const headerRow = ['Table (striped, bordered)']; // Ensure this matches the example header exactly
    const contentRows = [];

    if (nextTable) {
      const rows = nextTable.querySelectorAll('tr');
      rows.forEach((row) => {
        const cells = Array.from(row.children).map((cell) => {
          if (cell.querySelector('a')) {
            return cell.querySelector('a');
          }
          return cell.textContent.trim();
        });
        contentRows.push(cells);
      });
    }

    const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);
    blocks.push(table);

    const hr = document.createElement('hr');
    blocks.push(hr);
  });

  // Replace the original element
  element.replaceChildren(...blocks);
}