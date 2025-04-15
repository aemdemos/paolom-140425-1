/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create rows for the accordion table
    const createAccordionRow = (title, content) => {
        return [title, content];
    };

    const cells = [];

    // Add the header row specifying the block name
    cells.push(['Accordion']);

    // Find all the sections with headings and content
    const sections = element.querySelectorAll('h2');

    sections.forEach((heading) => {
        const title = heading.textContent.trim();

        // Find content related to the heading
        let content = [];
        let sibling = heading.nextElementSibling;

        while (sibling && sibling.tagName !== 'H2') {
            if (sibling.tagName === 'P' || sibling.tagName === 'DIV') {
                content.push(sibling.cloneNode(true));
            }
            sibling = sibling.nextElementSibling;
        }

        // Ensure content is properly extracted and included
        if (content.length > 0) {
            cells.push(createAccordionRow(title, content));
        }
    });

    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}