/* global WebImporter */
export default function parse(element, { document }) {
    // Extract relevant content
    const cards = [];

    // Header row
    const headerRow = ['Cards (no images)'];
    cards.push(headerRow);

    // Process each card
    const columns = element.querySelectorAll('[data-ref="gridColumn"]');
    columns.forEach((column) => {
        const headingSpan = column.querySelector('[data-ref="heading"] span');
        const heading = headingSpan ? headingSpan.textContent.trim() : '';

        const descriptionElem = column.querySelector('[data-component="RichText"] p');
        const description = descriptionElem ? descriptionElem.textContent.trim() : '';

        const linkElem = column.querySelector('[data-ref="link"]');
        const link = linkElem ? document.createElement('a') : null;
        if (link) {
            link.href = linkElem.getAttribute('href');
            const span = linkElem.querySelector('span');
            link.textContent = span ? span.textContent.trim() : '';
        }

        // Create the card content
        const cardContent = [];

        if (heading) {
            const headingElem = document.createElement('h2');
            headingElem.textContent = heading;
            cardContent.push(headingElem);
        }

        if (description) {
            const descriptionElem = document.createElement('p');
            descriptionElem.textContent = description;
            cardContent.push(descriptionElem);
        }

        if (link) {
            cardContent.push(link);
        }

        cards.push([cardContent]);
    });

    // Create table and replace element
    const table = WebImporter.DOMUtils.createTable(cards, document);
    element.replaceWith(table);
}