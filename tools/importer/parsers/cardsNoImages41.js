/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Extract card content: title, description, and call-to-action if available
  element.querySelectorAll('div[data-component="CardCTAButton"]').forEach((cardElement) => {
    // Extract the heading
    const heading = cardElement.querySelector('h2');
    const headingRow = [];
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      headingRow.push(headingElement);
    }

    // Extract the description
    const description = cardElement.querySelector('p');
    const descriptionRow = [];
    if (description) {
      const descriptionText = document.createTextNode(description.textContent.trim());
      descriptionRow.push(descriptionText);
    }

    // Extract the call-to-action
    const cta = cardElement.querySelector('a');
    const ctaRow = [];
    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cta.href;
      ctaElement.textContent = cta.textContent.trim();
      ctaRow.push(ctaElement);
    }

    // Add structured rows to cards
    if (headingRow.length) cards.push(headingRow);
    if (descriptionRow.length) cards.push(descriptionRow);
    if (ctaRow.length) cards.push(ctaRow);
  });

  // Create the block table
  const headerRow = ['Cards (no images)'];
  const tableData = [headerRow, ...cards];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}