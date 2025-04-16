/* global WebImporter */
export default function parse(element, { document }) {
  // Fixing the header row and ensuring it exactly matches the example header
  const headerRow = ['Cards (no images)'];

  const cards = Array.from(element.querySelectorAll('h2')).map((heading) => {
    const content = [];

    // Add heading properly formatted
    if (heading) {
      const h = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      h.appendChild(strong);
      content.push(h);
    }

    // Add description
    const description = heading.nextElementSibling;
    if (description && description.querySelectorAll('p').length > 0) {
      const descriptionText = Array.from(description.querySelectorAll('p'));
      descriptionText.forEach((desc) => {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        content.push(p);
      });
    }

    // Add links in context
    const links = heading.nextElementSibling.querySelectorAll('a');
    if (links.length > 0) {
      links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        content.push(a);
      });
    }

    return [content];
  });

  const tableData = [headerRow, ...cards];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
  return blockTable;
}