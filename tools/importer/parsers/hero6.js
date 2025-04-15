/* global WebImporter */
export default function parse(element, { document }) {
  // Extract heading
  const headingElement = element.querySelector('[data-ref="heading"] span');
  const heading = headingElement ? headingElement.textContent.trim() : '';

  // Extract content (subheading, list items, paragraph)
  const contentElement = element.querySelector('.Content-sc-mh9bui-0');
  let content = '';
  if (contentElement) {
    content = contentElement.innerHTML.trim();
  }

  // Extract background image
  const imageContainer = element.querySelector('[data-testid="ImageContainer"]');
  let backgroundImage = '';
  if (imageContainer) {
    backgroundImage = imageContainer.style.backgroundImage.replace(/url\("(.*?)"\)/, '$1');
  }

  // Prepare cells for the block table
  const cells = [
    ['Hero'],
    [
      document.createElement('div'), // Temporary div
    ],
  ];

  // Add heading
  const headingDiv = document.createElement('div');
  if (heading) {
    const headingStyled = document.createElement('h1');
    headingStyled.textContent = heading;
    headingDiv.appendChild(headingStyled);
  }

  // Add content
  if (content) {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    headingDiv.appendChild(contentDiv);
  }

  // Add background image
  if (backgroundImage) {
    const imageElement = document.createElement('img');
    imageElement.src = backgroundImage;
    headingDiv.appendChild(imageElement);
  }

  // Replace placeholder div in cells with the constructed content
  cells[1][0] = headingDiv;

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}