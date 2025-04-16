/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row.
  cells.push(['Cards']);

  // Select all individual cards within the element.
  const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');

  cards.forEach((card) => {
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const heading = card.querySelector('[data-ref="heading"]');
    const descriptionWrapper = card.querySelector('[data-testid="CardContent"]');
    const link = card.querySelector('[data-ref="link"]');

    const image = document.createElement('div');
    image.style.backgroundImage = imageContainer ? imageContainer.style.backgroundImage : '';

    const content = document.createElement('div');

    if (heading) {
      const title = document.createElement('h2');
      title.textContent = heading.textContent;
      content.appendChild(title);
    }

    if (descriptionWrapper) {
      const paragraphs = descriptionWrapper.querySelectorAll('p');
      paragraphs.forEach((p) => {
        content.appendChild(p.cloneNode(true));
      });
    }

    if (link) {
      const linkElement = document.createElement('p');
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      linkElement.appendChild(anchor);
      content.appendChild(linkElement);
    }

    cells.push([image, content]);
  });

  // Create the table.
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table.
  element.replaceWith(table);
}