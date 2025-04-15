/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extracting content for the first column dynamically
  const firstColumnContent = document.createElement('div');
  const columnBlockTitle = element.querySelector('h1');
  if (columnBlockTitle) {
    firstColumnContent.appendChild(document.createTextNode(columnBlockTitle.textContent));
  }

  const list = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  firstColumnContent.appendChild(list);

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  firstColumnContent.appendChild(liveLink);

  // Extracting content for the second column dynamically
  const secondColumnContent = document.createElement('div');

  const imageElement = element.querySelector('img[src*="sidekick-library--sta-boilerplate"]');
  if (imageElement) {
    const imageClone = document.createElement('img');
    imageClone.src = imageElement.src;
    imageClone.alt = imageElement.alt || 'Image';
    secondColumnContent.appendChild(imageClone);
  }

  const previewTextDiv = document.createElement('div');
  const previewText = document.createTextNode('Or you can just view the preview');
  previewTextDiv.appendChild(previewText);

  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  previewTextDiv.appendChild(previewLink);
  secondColumnContent.appendChild(previewTextDiv);

  const cells = [
    headerRow,
    [firstColumnContent, secondColumnContent]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}