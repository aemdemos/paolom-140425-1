/* global WebImporter */
export default function parse(element, { document }) {
    // Extract accordion title and contents
    const accordionItems = [];
    const sections = element.querySelectorAll('div[data-component="GuideSection"]');

    sections.forEach((section) => {
        const titleElement = section.querySelector('h2[data-ref="heading"]');
        const contentElement = section.querySelector('div[data-component="RichText"]');

        const title = titleElement ? titleElement.textContent.trim() : '';
        const content = contentElement ? contentElement.cloneNode(true) : document.createTextNode('');

        if (title && content) {
            accordionItems.push([title, content]);
        }
    });

    // Build table data
    const tableData = [
        ['Accordion'], // Header row
        ...accordionItems.map(([title, content]) => [title, content]),
    ];

    // Create the table
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}