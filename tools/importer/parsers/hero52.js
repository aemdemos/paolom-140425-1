/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the title
  const titleElement = element.querySelector('h2[data-ref="heading"]');
  const title = titleElement ? titleElement.innerHTML : '';

  // Extract the subheading
  const subheadingElement = element.querySelector('div[data-ref="heading"] + div p');
  const subheading = subheadingElement ? subheadingElement.textContent : '';

  // Extract the call-to-action
  const ctaElement = element.querySelector('a[data-ref="link"]');
  const cta = ctaElement ? document.createElement('a') : null;
  if (cta) {
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent;
  }

  const mergedContent = document.createElement('div');

  if (title) {
    const heading = document.createElement('h1');
    heading.innerHTML = title;
    mergedContent.appendChild(heading);
  }
  if (subheading) {
    const paragraph = document.createElement('p');
    paragraph.textContent = subheading;
    mergedContent.appendChild(paragraph);
  }
  if (cta) {
    mergedContent.appendChild(cta);
  }

  const tableData = [
    headerRow,
    [mergedContent]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}