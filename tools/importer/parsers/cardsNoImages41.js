/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];
  const rows = [];

  const cardElements = element.querySelectorAll('div[data-component="CardsGrid"] div[data-component="CardCTAButton"]');

  cardElements.forEach((card) => {
    const cardTitle = card.querySelector('h2[data-ref="heading"]')?.textContent.trim();
    const cardDescription = card.querySelector('div[data-testid="CardContent"] div.Content-sc-mh9bui-0 p')?.textContent.trim();
    const cardCTA = card.querySelector('a[data-testid="PrimaryButton"]')?.textContent.trim();

    const cardContent = document.createElement('div');

    if (cardTitle) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = cardTitle;
      cardContent.appendChild(titleElement);
    }

    if (cardDescription) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = cardDescription;
      cardContent.appendChild(descriptionElement);
    }

    if (cardCTA) {
      const ctaElement = document.createElement('p');
      const linkElement = document.createElement('a');
      linkElement.textContent = cardCTA;
      const href = card.querySelector('a[data-testid="PrimaryButton"]')?.href;
      if (href) {
        linkElement.setAttribute('href', href);
      }
      ctaElement.appendChild(linkElement);
      cardContent.appendChild(ctaElement);
    }

    rows.push([cardContent]);
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}