/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];
  const rows = [];

  const navItems = element.querySelectorAll('button');

  navItems.forEach((navItem) => {
    const tabLabel = navItem.querySelector('span:last-of-type')?.textContent?.trim() || 'Untitled Tab';

    const associatedContent = document.createElement('div');
    associatedContent.textContent = `Dynamic content for ${tabLabel} goes here`; // Placeholder for real extracted content

    rows.push([tabLabel, associatedContent]);
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  element.replaceWith(table);
}