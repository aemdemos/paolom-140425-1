/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Table (striped, bordered)'];

    const cells = [
        headerRow,
    ];

    const tableBlocks = element.querySelectorAll('table');

    tableBlocks.forEach((table) => {
        const caption = table.querySelector('caption');
        const tableHeader = table.querySelector('thead');
        const tableBody = table.querySelector('tbody');

        const sectionContent = [];

        if (caption) {
            sectionContent.push(document.createElement('hr'));
            const captionText = document.createElement('p');
            captionText.textContent = caption.textContent.trim();
            sectionContent.push(captionText);
        }

        if (tableHeader) {
            const rows = tableHeader.querySelectorAll('tr');
            rows.forEach((row) => {
                const rowContent = [];
                row.querySelectorAll('td, th').forEach((cell) => {
                    rowContent.push(cell.textContent.trim());
                });
                sectionContent.push(rowContent);
            });
        }

        if (tableBody) {
            const rows = tableBody.querySelectorAll('tr');
            rows.forEach((row) => {
                const rowContent = [];
                row.querySelectorAll('td, th').forEach((cell) => {
                    rowContent.push(cell.textContent.trim());
                });
                sectionContent.push(rowContent);
            });
        }

        cells.push(sectionContent);
    });

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}