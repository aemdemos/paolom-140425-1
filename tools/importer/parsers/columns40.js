/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract text content of elements
  const getText = (el) => el?.textContent.trim() || '';

  // Extract main heading
  const mainHeading = element.querySelector('h1[data-ref="heading"]');
  const mainHeadingText = getText(mainHeading);

  // Extract sections under the main heading
  const sectionHeaders = element.querySelectorAll('article > h2[data-ref="heading"]');

  const sections = Array.from(sectionHeaders).map((header) => {
    const title = getText(header);
    const contentContainer = header.nextElementSibling;

    // Extract paragraph and list items dynamically
    const contentElements = Array.from(contentContainer.querySelectorAll('p, ul, li')).map((el) => {
      const clonedElement = el.cloneNode(true); // Clone element to preserve structure
      return clonedElement;
    });

    return [title, contentElements];
  });

  // Create table rows dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const contentRows = sections.map(([title, content]) => {
    const titleElement = document.createElement('h2');
    titleElement.textContent = title; // Create title dynamically as an HTML element

    return [titleElement, content];
  });

  const cells = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}