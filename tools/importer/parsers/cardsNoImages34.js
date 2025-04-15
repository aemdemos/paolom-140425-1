/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (no images)'];

    const rows = Array.from(element.querySelectorAll('[data-component="CardCTATextLinks"]')).map(card => {
        const heading = card.querySelector('[data-ref="heading"]');
        const description = card.querySelector('[data-testid="CardContent"] p');
        const link = card.querySelector('a[data-ref="link"]');

        const cellContent = [];

        if (heading) {
            const headingElement = document.createElement('strong');
            headingElement.textContent = heading.textContent;
            cellContent.push(headingElement);
        }

        if (description) {
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description.textContent;
            cellContent.push(descriptionElement);
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            cellContent.push(linkElement);
        }

        return [cellContent];
    });

    const tableData = [headerRow, ...rows];
    
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
    
    element.replaceWith(blockTable);
}