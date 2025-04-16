/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video URL dynamically
  const videoLink = element.querySelector('a[href]');
  const embedUrl = videoLink ? videoLink.href : '';

  // Extract the image dynamically (if available)
  const imageElement = element.querySelector('img');
  const posterImage = imageElement ? imageElement.cloneNode(true) : null;

  // Create the structured table array
  const headerRow = ['Embed']; // Header row matches the example
  const contentRow = posterImage ? [posterImage, embedUrl] : [embedUrl];

  const cells = [
    headerRow,
    contentRow
  ];

  // Create a block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}