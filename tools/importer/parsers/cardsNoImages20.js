/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];
  const rows = [];

  // Iterate through content sections to dynamically extract data
  const sections = element.querySelectorAll('article > h2, article > div.Content-sc-mh9bui-0, article > div.RichText__StyledRichTextContent-sc-1j7koit-0, article > div.LinkGroup-sc-xemnca-0 a');

  sections.forEach((section) => {
    const content = [];

    // Extract heading if present
    const heading = section.tagName === 'H2' ? section.textContent.trim() : null;
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading;
      content.push(headingElement);
    }

    // Extract description paragraphs
    const paragraphs = section.tagName === 'DIV' && section.querySelectorAll('p');
    if (paragraphs && paragraphs.length > 0) {
      paragraphs.forEach((paragraph) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent.trim();
        content.push(paragraphElement);
      });
    }

    // Extract link if present
    const link = section.tagName === 'A' ? section : null;
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      content.push(linkElement);
    }

    if (content.length > 0) {
      rows.push([content]);
    }
  });

  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}