/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all sections as tabs dynamically
  const tabs = [];

  // Extract the main heading
  const mainHeading = element.querySelector('h1[data-ref="heading"]');
  if (mainHeading) {
    tabs.push(['Main Heading', mainHeading.cloneNode(true)]);
  }

  // Extract each section (h2 followed by content)
  const sections = element.querySelectorAll('h2[data-ref="heading"]');
  sections.forEach((section) => {
    const headingText = section.textContent.trim();
    const content = [];

    // Find the next sibling content div dynamically
    let sibling = section.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2' && sibling.tagName !== 'HR') {
      content.push(sibling.cloneNode(true));
      sibling = sibling.nextElementSibling;
    }

    tabs.push([headingText, content]);
  });

  // Ensure special information under 'Cash machine' is included
  const infoMessage = element.querySelector('.nel-Message-484');
  if (infoMessage) {
    tabs.push(['Information', infoMessage.cloneNode(true)]);
  }

  // Create the table structure with proper header and bold formatting
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Tabs';

  const cells = [headerRow, ...tabs];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}