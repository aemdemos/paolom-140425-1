/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [headerRow];

  // Select all columns in the provided element
  const columns = element.querySelectorAll('[data-ref="gridColumn"]');

  columns.forEach((col) => {
    const heading = col.querySelector('[data-ref="heading"] span');
    const description = col.querySelector('[data-component="RichText"] p');
    const cta = col.querySelector('[data-ref="link"]');

    // Create elements for the row
    const rowContent = [];

    if (heading) {
      const headingEl = document.createElement('strong');
      headingEl.textContent = heading.textContent.trim();
      rowContent.push(headingEl);
    }

    if (description) {
      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = description.textContent.trim();
      rowContent.push(descriptionEl);
    }

    if (cta) {
      const ctaEl = document.createElement('a');
      ctaEl.href = cta.href;
      ctaEl.textContent = cta.textContent.trim();
      rowContent.push(ctaEl);
    }

    rows.push([rowContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);

  return block;
}