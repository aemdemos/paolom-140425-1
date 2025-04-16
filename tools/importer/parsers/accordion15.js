/* global WebImporter */
export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Header row as described in the example
    const headerRow = ['Accordion'];

    // Collecting accordion rows dynamically
    const accordionRows = [...element.querySelectorAll('[data-ref="accordion"]')].map((accordion) => {
        const titleElement = accordion.querySelector('[data-ref="accordionHeading"]');
        const contentElement = accordion.querySelector('[data-ref="accordionContent"]');

        const title = titleElement ? titleElement.textContent.trim() : '';
        const content = contentElement ? contentElement.cloneNode(true) : document.createElement('div');

        return [title, content];
    });

    // Combining header and content rows into a table data array
    const tableData = [headerRow, ...accordionRows];

    // Creating the structured block table
    const blockTable = createTable(tableData, document);

    // Replacing the original element with the block table
    element.replaceWith(blockTable);
}