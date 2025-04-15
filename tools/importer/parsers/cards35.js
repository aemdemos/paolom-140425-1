/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cardsData = Array.from(element.querySelectorAll('.NelComponents__Col-sc-vsly48-38')).map((card) => {
    const title = card.querySelector('h2')?.textContent.trim();
    const description = card.querySelector('div[data-component="RichText"] p')?.textContent.trim();
    const listItems = Array.from(card.querySelectorAll('ul > li')).map((li) => li.textContent.trim()).join('<br>');
    const button = card.querySelector('a[data-testid="PrimaryButton"]')?.textContent.trim();

    const content = document.createElement('div');
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title;
      content.appendChild(heading);
    }

    if (description) {
      const descElement = document.createElement('p');
      descElement.textContent = description;
      content.appendChild(descElement);
    }

    if (listItems) {
      const listElement = document.createElement('div');
      listElement.innerHTML = listItems;
      content.appendChild(listElement);
    }

    if (button) {
      const buttonElement = document.createElement('a');
      buttonElement.textContent = button;
      content.appendChild(buttonElement);
    }

    return [content];
  });

  const tableData = [headerRow, ...cardsData];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}