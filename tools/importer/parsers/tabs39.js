/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Tabs'];

    // Array to hold rows for the table
    const rows = [headerRow];

    // Extracting content for tabs
    const sections = Array.from(element.querySelectorAll('h2[data-ref="heading"]'));

    sections.forEach((section) => {
        const tabLabel = section.textContent.trim(); // Tab label

        const tabContentElement = section.nextElementSibling; // Content after the heading (h2)

        // Include <hr> separator block if exists after the content
        const followingElement = tabContentElement ? tabContentElement.nextElementSibling : null;
        const separator = followingElement && followingElement.tagName === 'HR' 
            ? document.createElement('hr') 
            : null;

        const tabContent = [tabContentElement.cloneNode(true)];
        if (separator) {
            tabContent.push(separator);
        }

        // Add row with label and content
        rows.push([tabLabel, tabContent]);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the element with the table
    element.replaceWith(table);
}