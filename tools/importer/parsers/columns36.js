/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row to match the example exactly
  const headerRow = ['Columns'];

  // First column content extraction
  const firstColumnContent = document.createElement('div');
  const firstHeading = element.querySelector('h2');
  if (firstHeading) {
    const headingClone = document.createElement('p');
    headingClone.innerHTML = `<strong>${firstHeading.textContent}</strong>`; // Apply bold formatting
    firstColumnContent.appendChild(headingClone);
  }

  const firstRichText = element.querySelector('div[data-component="RichText"]');
  if (firstRichText) {
    const richTextClone = firstRichText.cloneNode(true);
    firstColumnContent.appendChild(richTextClone);
  }

  const buttonBlock = document.createElement('div');
  buttonBlock.setAttribute('class', 'button-block'); // Structured container for buttons
  const firstButtonGroup = element.querySelectorAll('div[data-component="ButtonGroup"] a');
  firstButtonGroup.forEach((button) => {
    const buttonClone = button.cloneNode(true);
    buttonBlock.appendChild(buttonClone);
  });
  firstColumnContent.appendChild(buttonBlock);

  // Second column content extraction
  const secondColumnContent = document.createElement('div');
  const searchHeading = element.querySelector('label[for]');
  if (searchHeading) {
    const headingClone = document.createElement('p');
    headingClone.innerHTML = `<strong>${searchHeading.textContent}</strong>`; // Apply bold formatting
    secondColumnContent.appendChild(headingClone);
  }

  const searchForm = element.querySelector('form.SearchForm__OuterForm-sc-mctg6q-0');
  if (searchForm) {
    const formClone = searchForm.cloneNode(true);
    secondColumnContent.appendChild(formClone);
  }

  const popularLinks = element.querySelectorAll('ul[data-component="LinkList"] li a');
  if (popularLinks.length > 0) {
    const linkList = document.createElement('ul');
    popularLinks.forEach((link) => {
      const listItem = document.createElement('li');
      const linkClone = link.cloneNode(true);
      listItem.appendChild(linkClone);
      linkList.appendChild(listItem);
    });
    secondColumnContent.appendChild(linkList);
  }

  // Create table structure
  const cells = [
    headerRow,
    [firstColumnContent, secondColumnContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}