/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the title
  const titleElement = element.querySelector('[data-ref="heading"]');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the content list
  const contentList = element.querySelector('.Content-sc-mh9bui-0');
  const contentItems = Array.from(contentList?.querySelectorAll('li') || []).map((li) => {
    return li.textContent.trim();
  });

  // Extract the paragraph content
  const paragraphElement = contentList?.querySelector('p');
  const paragraph = paragraphElement ? paragraphElement.textContent.trim() : '';

  // Combine extracted elements into a structured cell
  const secondRowContent = document.createElement('div');

  if (title) {
    const titleNode = document.createElement('h1');
    titleNode.textContent = title;
    secondRowContent.appendChild(titleNode);
  }

  if (contentItems.length > 0) {
    const listNode = document.createElement('ul');
    contentItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      listNode.appendChild(listItem);
    });
    secondRowContent.appendChild(listNode);
  }

  if (paragraph) {
    const paragraphNode = document.createElement('p');
    paragraphNode.textContent = paragraph;
    secondRowContent.appendChild(paragraphNode);
  }

  // Define the table structure
  const cells = [
    headerRow,
    [secondRowContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}