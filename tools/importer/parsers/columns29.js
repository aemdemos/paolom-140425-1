/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns']; // Ensure the header matches the example exactly.

    // Collect all sections from the provided HTML element.
    const sections = Array.from(element.querySelectorAll('section'));

    // Map each section to create a content row dynamically.
    const contentRows = sections.map((section) => {
        // Extract the heading from the section or default to an empty string if missing.
        const heading = section.querySelector('h2')?.textContent.trim() || '';

        // Extract all list items within the section.
        const listItems = Array.from(section.querySelectorAll('li')).map((item) => {
            const anchor = item.querySelector('a');
            const linkContent = anchor?.querySelector('span')?.textContent.trim() || ''; // Handle empty or missing span text.
            const href = anchor?.href || ''; // Default to an empty string if href is missing.

            // Create an anchor element dynamically.
            const linkElement = document.createElement('a');
            linkElement.href = href;
            linkElement.textContent = linkContent;
            linkElement.target = anchor?.target || '_self'; // Default to '_self' if target is missing.
            linkElement.rel = anchor?.rel || ''; // Default to an empty string if rel is missing.

            return linkElement; // Return the constructed anchor element.
        });

        // Combine heading and list items into a single content cell.
        const contentCell = document.createElement('div');
        if (heading) { // Only add heading if it's non-empty.
            const headingElement = document.createElement('strong');
            headingElement.textContent = heading;
            contentCell.appendChild(headingElement);
        }
        listItems.forEach((link) => contentCell.appendChild(link));

        return contentCell; // Return the constructed content cell.
    });

    // Prepare the final table structure with the header and content rows.
    const cells = [
        headerRow,
        contentRows
    ];

    // Create the block table using the helper function.
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table.
    element.replaceWith(block);
}