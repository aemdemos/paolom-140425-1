/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to extract content from a column
    const extractColumnContent = (columnElement) => {
        const header = columnElement.querySelector('h3');
        const paragraphs = columnElement.querySelectorAll('div[data-component="RichText"] p');
        const link = columnElement.querySelector('a[data-ref="link"]');

        // Extract text and link content
        const headerText = header ? header.textContent.trim() : '';
        const paragraphTexts = Array.from(paragraphs).map(p => p.textContent.trim());
        const linkElement = link ? document.createElement('a') : null;
        if (linkElement) {
            linkElement.href = link.href;
            linkElement.textContent = link.textContent.trim();
        }

        return {
            headerText,
            paragraphTexts,
            linkElement,
        };
    };

    // Extract columns
    const columns = element.querySelectorAll('div[data-ref="gridColumn"]');
    const columnContent = Array.from(columns).map(extractColumnContent);

    // Create table cells
    const headerRow = ['Columns'];
    const contentRow = columnContent.map(({ headerText, paragraphTexts, linkElement }) => {
        const container = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = headerText;
        container.appendChild(header);

        paragraphTexts.forEach(text => {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            container.appendChild(paragraph);
        });

        if (linkElement) {
            container.appendChild(linkElement);
        }

        return container;
    });

    // Create table block
    const tableData = [headerRow, contentRow];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element with the block table
    element.replaceWith(blockTable);
}