/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the provided HTML element
  const videoImage = element.querySelector('div img'); // Get the video poster image
  const videoLink = element.querySelector('a[href]'); // Extract video URL

  // Ensure we handle cases where elements might not exist
  const imageElement = videoImage ? videoImage.cloneNode(true) : null; // Clone the image element if available
  const videoURL = videoLink ? videoLink.href : ''; // Get the href attribute of the link if present

  // Construct the table structure dynamically
  const cells = [
    ['Embed'], // First row is the header row matching the block name
    [
      imageElement, // Add video image (if exists) to the cell
      videoURL // Add video URL below the image
    ].filter(Boolean) // Ensure no null values are added to the table rows
  ];

  // Create the block table using WebImporter helper
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);
}