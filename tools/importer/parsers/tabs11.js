/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];

  const tabs = [];

  // Extract title and content pairs
  const sections = element.querySelectorAll('h2 + div.Content-sc-mh9bui-0');
  sections.forEach((section) => {
    const heading = section.previousElementSibling;
    const title = heading ? heading.textContent.trim() : '';

    const content = section.cloneNode(true); // Clone the content div

    // Remove unnecessary wrapper classes, if any
    content.classList.remove('Content-sc-mh9bui-0', 'RichText__StyledRichTextContent-sc-1j7koit-0', 'passthru');

    tabs.push([title, content]);
  });

  const cells = [headerRow, ...tabs];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}