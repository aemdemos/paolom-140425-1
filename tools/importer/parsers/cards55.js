/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0'));

  const rows = [
    ['Cards'], // Header row
  ];

  cards.forEach((card) => {
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const image = document.createElement('img');
    image.src = imageContainer ? imageContainer.style.backgroundImage.replace(/url\("(.*?)"\)/, '$1') : '';

    const titleElement = card.querySelector('h2[data-ref="heading"]');
    const title = titleElement ? document.createElement('strong') : null;
    if (title) {
      title.textContent = titleElement.textContent;
    }

    const descriptionElement = card.querySelector('.Content-sc-mh9bui-0 p');
    const description = descriptionElement ? document.createTextNode(descriptionElement.textContent) : null;

    const linkElement = card.querySelector('a[data-ref="link"]');
    const link = linkElement ? document.createElement('a') : null;
    if (link) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent;
    }

    const contentCell = document.createElement('div');
    if (title) contentCell.appendChild(title);
    if (description) contentCell.appendChild(document.createElement('br')); // Line break between title and description
    if (description) contentCell.appendChild(description);
    if (link) {
      contentCell.appendChild(document.createElement('br')); // Line break before link
      contentCell.appendChild(link);
    }

    rows.push([image, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}