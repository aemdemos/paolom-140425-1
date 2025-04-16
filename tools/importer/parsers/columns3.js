/* global WebImporter */
export default function parse(element, { document }) {
    // Ensure header matches exactly
    const headerRow = ['Columns'];

    // Helper function to extract data from a column
    function extractColumnData(columnElement) {
        const heading = columnElement.querySelector('[data-ref="heading"]');
        const title = heading ? heading.textContent.trim() : '';

        const listItems = Array.from(columnElement.querySelectorAll('[data-ref="list"] li')).map(li => {
            const link = li.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                const text = link.textContent.trim();
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.textContent = text;
                return anchorElement;
            }
            return document.createTextNode(li.textContent.trim());
        });

        const listContainer = document.createElement('ul');
        listItems.forEach(item => {
            const listItemElement = document.createElement('li');
            if (item instanceof Node) {
                listItemElement.appendChild(item);
            } else {
                listItemElement.textContent = item;
            }
            listContainer.appendChild(listItemElement);
        });

        return [
            document.createElement('div').appendChild(document.createTextNode(title)),
            listContainer,
        ];
    }

    // Extract all columns data
    const columnsData = Array.from(element.querySelectorAll('[data-ref="gridColumn"]')).map(extractColumnData);

    // Create table structure
    const tableCells = [headerRow, ...columnsData];
    const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

    // Replace original element with new block table
    element.replaceWith(blockTable);
}