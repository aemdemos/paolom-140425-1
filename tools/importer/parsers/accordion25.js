/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract heading and content pairs
  const sections = Array.from(element.querySelectorAll('h2, h3, p, a')).reduce((acc, el) => {
    const lastSection = acc[acc.length - 1];

    if (el.tagName === 'H2' || el.tagName === 'H3') {
      // Start a new section for headings
      const section = {
        title: el.innerText.trim(),
        content: [],
      };
      acc.push(section);
    } else if (el.tagName === 'P' || el.tagName === 'A') {
      // Append content to the last section
      if (lastSection) {
        lastSection.content.push(el.cloneNode(true));
      }
    }

    return acc;
  }, []);

  // Build table rows from sections
  const rows = sections.map((section) => [
    section.title,
    section.content.map(node => document.createElement('div').appendChild(node.cloneNode(true)).parentNode),
  ]);

  // Add header row
  const tableData = [['Accordion'], ...rows];

  // Create table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with table
  element.replaceWith(table);
}