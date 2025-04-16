/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Extracting all card elements
  const rows = [...element.querySelectorAll('[data-component="CardCTATextLinks"]')].map(card => {
    // Extracting image element
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const image = imageContainer ? imageContainer.cloneNode(true) : document.createElement('div');

    // Extracting title
    const titleElement = card.querySelector('[data-ref="heading"]');
    const title = titleElement ? document.createElement('strong') : null;
    if (title) {
      title.textContent = titleElement.textContent.trim();
    }

    // Extracting description
    const descriptionElement = card.querySelector('[data-testid="CardContent"] p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Extracting link
    const linkElement = card.querySelector('[data-ref="link"]');
    const link = linkElement ? linkElement.cloneNode(true) : null;

    // Combining content into a single cell
    const textContent = document.createElement('div');
    if (title) textContent.appendChild(title);
    if (description) textContent.appendChild(document.createTextNode(description));
    if (link) textContent.appendChild(link);

    // Creating a row with image and text content
    return [image, textContent];
  });

  // Creating the table structure
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the table
  element.replaceWith(table);
}