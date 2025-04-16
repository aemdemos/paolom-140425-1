/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('[data-ref="heading"]');
  const title = titleElement ? titleElement.cloneNode(true) : null; // Clone the original structure

  // Extract the subheading
  const subheadingElement = element.querySelector('.HomepageHeroEdgeToEdge__StyledRichText-sc-rkxeoj-5');
  const subheading = subheadingElement ? subheadingElement.cloneNode(true) : null; // Clone the original structure

  // Extract the call-to-action
  const ctaElement = element.querySelector('[data-testid="PrimaryButton"]');
  let cta = null;
  if (ctaElement) {
    const linkText = ctaElement.textContent.trim();
    const linkHref = ctaElement.getAttribute('href');
    cta = document.createElement('a');
    cta.textContent = linkText;
    cta.setAttribute('href', linkHref);
  }

  // Combine all content into a single cell
  const combinedContent = document.createElement('div');
  if (title) combinedContent.appendChild(title);
  if (subheading) combinedContent.appendChild(subheading);
  if (cta) combinedContent.appendChild(cta);

  // Create the cells for the table
  const cells = [
    ['Hero'], // Correct plain text header row
    [combinedContent] // Single cell containing combined content
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}