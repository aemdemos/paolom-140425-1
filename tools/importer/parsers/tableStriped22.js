/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the table data from the provided HTML structure
    const table = element.querySelector('table');
    if (!table) {
        console.warn('No table found in the provided element');
        return;
    }

    const rows = Array.from(table.rows);
    const tableData = rows.map(row => Array.from(row.cells).map(cell => {
        // Extract text content for each cell
        return cell.textContent.trim();
    }));

    // Add a header row for the block type
    const headerRow = ['Table (striped)'];
    const blockTableData = [headerRow, ...tableData];

    // Create the block table using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(blockTableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}