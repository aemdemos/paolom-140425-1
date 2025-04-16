/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];
  const cards = [];

  const cardSections = element.querySelectorAll('.SideBySideLayout__ContainerWrapper-sc-nb03j7-1');

  cardSections.forEach((section) => {
    const titleElement = section.querySelector('h2');
    const descriptionElement = section.querySelector('p');
    const listElement = section.querySelector('ul');
    const buttonElement = section.querySelector('a');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    const listItems = [];
    if (listElement) {
      listElement.querySelectorAll('li').forEach((li) => {
        listItems.push(li.textContent.trim());
      });
    }

    const button = buttonElement ? document.createElement('a') : null;
    if (buttonElement) {
      button.href = buttonElement.href;
      button.textContent = buttonElement.textContent.trim();
    }

    const textContent = document.createElement('div');
    if (title) {
      const titleNode = document.createElement('h3');
      titleNode.textContent = title;
      textContent.appendChild(titleNode);
    }
    if (description) {
      const descriptionNode = document.createElement('p');
      descriptionNode.textContent = description;
      textContent.appendChild(descriptionNode);
    }
    if (listItems.length > 0) {
      const listNode = document.createElement('ul');
      listItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listNode.appendChild(listItem);
      });
      textContent.appendChild(listNode);
    }
    if (button) {
      textContent.appendChild(button);
    }

    cards.push([textContent]);
  });

  const tableData = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}