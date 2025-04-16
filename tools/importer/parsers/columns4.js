/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Header row for block type
  
  // Extract bullet list items dynamically
  const bulletList = document.createElement('ul');
  const bulletPoints = element.querySelectorAll('li');
  bulletPoints.forEach((li) => {
    if (li.textContent.trim()) {
      const clonedLi = document.createElement('li');
      clonedLi.textContent = li.textContent.trim();
      bulletList.appendChild(clonedLi);
    }
  });

  // Extract the "Live" link dynamically
  const liveLinkElement = element.querySelector('a[href*="word-edit"]');
  const liveLink = document.createElement('a');
  if (liveLinkElement) {
    liveLink.href = liveLinkElement.href;
    liveLink.textContent = liveLinkElement.textContent.trim();
  }

  // Extract images dynamically
  const images = element.querySelectorAll('img');
  const image0 = document.createElement('img');
  if (images[0]) {
    image0.src = images[0].src;
    image0.alt = 'Green Double Helix'; // Add alt text based on context
  }

  const image1 = document.createElement('img');
  if (images[1]) {
    image1.src = images[1].src;
    image1.alt = 'Yellow Double Helix'; // Add alt text based on context
  }

  // Extract "Preview" section dynamically
  const previewTextElement = element.querySelector('p');
  const previewText = document.createElement('p');
  if (previewTextElement) {
    previewText.textContent = previewTextElement.textContent.trim();
  }

  const previewLinkElement = element.querySelector('a[href*=preview]');
  const previewLink = document.createElement('a');
  if (previewLinkElement) {
    previewLink.href = previewLinkElement.href;
    previewLink.textContent = previewLinkElement.textContent.trim();
  }

  const cells = [
    headerRow,
    [bulletList, liveLink, image0],
    [image1, [previewText, previewLink]],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  
  element.replaceWith(blockTable);
}