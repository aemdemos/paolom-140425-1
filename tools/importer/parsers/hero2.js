/* global WebImporter */
export default function parse(element, { document }) {
  // Validate input
  if (!element || !document) return;

  // Extract the title (mandatory) and subheading (optional)
  const titleElement = element.querySelector('.SectionHero__StyledHeading-sc-fol9tk-5');
  const subheadingElement = element.querySelector('.Content-sc-mh9bui-0');

  // Handle edge cases (missing title or subheading)
  const titleText = titleElement ? titleElement.textContent.trim() : '';
  const subheadingText = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Create HTML elements for extracted content
  const heading = document.createElement('h1');
  heading.textContent = titleText; // Correctly populate the <h1> tag with the extracted title

  const subheading = document.createElement('p');
  subheading.textContent = subheadingText; // Correctly populate the <p> tag with the extracted subheading

  // Define table rows
  const headerRow = ['Hero']; // Match the header row exactly as per example
  const contentRow = [heading, subheading]; // Include both title and subheading in the content row without nesting

  // Create table structure
  const cells = [
    headerRow, // Header row
    contentRow // Content row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the newly created block
  element.replaceWith(block);
}