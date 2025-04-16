/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Add the header row
    rows.push(['Accordion']);

    // Get all accordion items
    const accordionItems = element.querySelectorAll('[data-ref="accordion"]');

    accordionItems.forEach((item) => {
        const titleButton = item.querySelector('[data-ref="accordionHeader"]');
        const titleText = titleButton ? titleButton.textContent.trim() : '';

        const contentContainer = item.querySelector('[data-ref="accordionContent"]');
        const contentElements = contentContainer ? Array.from(contentContainer.children) : [];

        rows.push([titleText, [contentElements.length ? contentElements : '']]);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}