/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract content
  const heading = element.querySelector('[data-ref="heading"] span')?.textContent.trim();
  const listItems = element.querySelectorAll('.Content-sc-mh9bui-0 li');
  const paragraph = element.querySelector('.Content-sc-mh9bui-0 p');
  const imageContainer = element.querySelector('[data-testid="ImageContainer"]');

  // Create content array
  const contentElements = [];

  // Add image (optional)
  if (imageContainer) {
    const imgBackground = imageContainer.style.backgroundImage;
    const imgUrl = imgBackground.match(/url\("(.*?)"\)/)?.[1];
    if (imgUrl) {
      const imgElement = document.createElement('img');
      imgElement.src = imgUrl;
      contentElements.push(imgElement);
    }
  }

  // Add heading (mandatory)
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading;
    contentElements.push(headingElement);
  }

  // Add list items (if any)
  if (listItems.length > 0) {
    const ulElement = document.createElement('ul');
    listItems.forEach((li) => {
      const liElement = document.createElement('li');
      liElement.innerHTML = li.innerHTML;
      ulElement.appendChild(liElement);
    });
    contentElements.push(ulElement);
  }

  // Add paragraph (optional)
  if (paragraph) {
    const paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = paragraph.innerHTML;
    contentElements.push(paragraphElement);
  }

  // Verify extracted content elements
  if (contentElements.length === 0) {
    console.error('No content elements were extracted from the given HTML.');
  }

  // Create the block table
  const cells = [
    headerRow,
    [contentElements],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the element
  element.replaceWith(block);
  return undefined;
}