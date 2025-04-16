/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0'));

  const rows = cards.map(card => {
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const heading = card.querySelector('h2[data-ref="heading"]');
    const description = card.querySelector('p');
    const link = card.querySelector('a[data-ref="link"]');

    const image = imageContainer ? imageContainer.cloneNode(true) : document.createTextNode('');
    const title = heading ? heading.textContent : '';
    const descriptionText = description ? document.createTextNode(description.textContent) : '';
    const linkElement = link ? link.cloneNode(true) : '';

    const textContent = [
      title && (() => {
        const strong = document.createElement('strong');
        strong.textContent = title;
        return strong;
      })(),
      descriptionText,
      linkElement
    ].filter(Boolean);

    return [image, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    ['Cards'], // Header row
    ...rows   // Content rows
  ], document);

  element.replaceWith(table);
}