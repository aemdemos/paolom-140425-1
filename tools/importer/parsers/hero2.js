/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the title
  const titleElement = element.querySelector('.SectionHero__StyledHeading-sc-fol9tk-5');
  const title = document.createElement('h1');
  title.innerHTML = titleElement?.textContent || '';

  // Extract the subheading
  const subheadingElement = element.querySelector('.Content-sc-mh9bui-0');
  const subheading = document.createElement('p');
  subheading.innerHTML = subheadingElement?.textContent || '';

  // Combine title and subheading
  const content = document.createElement('div');
  if (title.innerHTML) {
    content.appendChild(title);
  }
  if (subheading.innerHTML) {
    content.appendChild(subheading);
  }

  const rows = [
    headerRow,
    content.children.length > 0 ? [content] : [],
  ];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}