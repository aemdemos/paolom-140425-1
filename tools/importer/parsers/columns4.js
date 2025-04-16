/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Create first column content dynamically
  const firstColumnContent = document.createElement('div');
  const list = document.createElement('ul');
  const listItems = ['One', 'Two', 'Three'];
  listItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  firstColumnContent.append(list, liveLink);

  // Create second column content dynamically
  const greenImage = document.createElement('img');
  greenImage.src = 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
  greenImage.alt = 'Green Double Helix';

  // Create third column content dynamically
  const thirdColumnContent = document.createElement('div');
  const yellowImage = document.createElement('img');
  yellowImage.src = 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  yellowImage.alt = 'Yellow Double Helix';
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  thirdColumnContent.append('Or you can just view the preview', previewLink);

  // Assemble rows into cells
  const cells = [
    headerRow,
    [firstColumnContent, greenImage],
    [yellowImage, thirdColumnContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}