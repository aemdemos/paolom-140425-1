/* global WebImporter */
export default function parse(element, { document }) {
  const sections = [];

  // Extracting the title
  const pageTitle = element.querySelector('h1')?.textContent || '';
  if (pageTitle) {
    sections.push([pageTitle]);
  }

  // Extracting the note
  const noteElement = element.querySelector('.nel-Message-353 > div');
  if (noteElement) {
    const noteContent = noteElement.textContent.trim();
    sections.push([document.createElement('hr')]);
    sections.push([noteContent]);
  }

  // Extracting tables
  const tables = element.querySelectorAll('table');
  tables.forEach((table) => {
    const headerRow = ['Table (striped & bordered)'];
    const rows = [headerRow];

    const caption = table.querySelector('caption')?.textContent || '';
    if (caption) {
      rows.push([caption]);
    }

    const thead = table.querySelector('thead');
    if (thead) {
      const headers = Array.from(thead.querySelectorAll('th, td')).map((header) => header.textContent.trim());
      rows.push(headers);
    }

    const tbody = table.querySelector('tbody');
    if (tbody) {
      const bodyRows = Array.from(tbody.querySelectorAll('tr')).map((tr) => {
        return Array.from(tr.querySelectorAll('td, th')).map((cell) => {
          const cellContent = cell.textContent.trim();
          const anchor = cell.querySelector('a');
          if (anchor) {
            const link = document.createElement('a');
            link.href = anchor.href;
            link.textContent = cellContent;
            return link;
          }
          return cellContent;
        });
      });
      rows.push(...bodyRows);
    }

    sections.push([document.createElement('hr')]);
    sections.push([WebImporter.DOMUtils.createTable(rows, document)]);
  });

  // Extracting headings and content
  const headings = element.querySelectorAll('h2, h3');
  headings.forEach((heading) => {
    const headingText = heading.textContent.trim();
    const contentElement = heading.nextElementSibling;

    const contentNodes = [];
    if (contentElement) {
      if (contentElement.tagName === 'DIV') {
        const paragraphs = contentElement.querySelectorAll('p, li');
        paragraphs.forEach((paragraph) => {
          contentNodes.push(paragraph.cloneNode(true));
        });
      }
    }

    if (headingText || contentNodes.length > 0) {
      sections.push([document.createElement('hr')]);
      sections.push([headingText]);
      sections.push(contentNodes);
    }
  });

  // Replace the original element with structured content
  const block = WebImporter.DOMUtils.createTable(sections, document);
  element.replaceWith(block);
}