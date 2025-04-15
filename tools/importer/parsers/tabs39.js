/* global WebImporter */
export default function parse(element, { document }) {
    // Extract content sections
    const sections = [];
    const headings = element.querySelectorAll('h2');
    headings.forEach((heading) => {
        const content = [];
        let sibling = heading.nextElementSibling;
        while (sibling && sibling.tagName !== 'H2' && sibling.tagName !== 'HR') {
            content.push(sibling);
            sibling = sibling.nextElementSibling;
        }
        sections.push({
            heading: heading.textContent.trim(),
            content,
        });
    });

    // Create table
    const headerRow = ['Tabs'];
    const rows = sections.map((section) => [
        section.heading,
        section.content,
    ]);
    const tableArray = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableArray, document);

    // Replace the original element
    element.replaceWith(block);
}