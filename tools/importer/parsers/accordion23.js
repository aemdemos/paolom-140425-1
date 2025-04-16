/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Add the header row dynamically
    const headerRow = ['Accordion'];
    rows.push(headerRow);

    // Extract the accordion items
    const accordionSections = element.querySelectorAll('h2, h3, div[data-component="RichText"]');

    let title = '';
    accordionSections.forEach((item) => {
        if (item.tagName === 'H2' || item.tagName === 'H3') {
            title = item.textContent.trim();
        } else if (item.tagName === 'DIV' && title) {
            const content = item.cloneNode(true); // Clone to retain HTML structure
            rows.push([title, content]);
            title = ''; // Reset title after associating it with content
        }
    });

    // Create the table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the table
    element.replaceWith(table);
}