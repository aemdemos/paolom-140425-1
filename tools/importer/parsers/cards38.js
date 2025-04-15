/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('[data-component="CardCTATextLinks"]'));

  const cells = [
    ['Cards']
  ];

  cards.forEach((card) => {
    const image = card.querySelector('[data-testid="ImageContainer"]');
    const title = card.querySelector('[data-ref="heading"]')?.textContent;
    const description = card.querySelector('[data-testid="CardContent"] p')?.textContent;
    const link = card.querySelector('[data-ref="link"]');

    // Handle image extraction
    const imageElement = image ? document.createElement('div') : null;
    if (imageElement && image.style.backgroundImage) {
      const imageUrl = image.style.backgroundImage.match(/url\("(.*?)"\)/)?.[1];
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        imageElement.appendChild(img);
      }
    }

    // Handle text content extraction
    const content = [];
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      content.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      content.push(descriptionElement);
    }
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.querySelector('span')?.textContent;
      content.push(linkElement);
    }

    // Add card row to cells
    cells.push([imageElement, content]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}