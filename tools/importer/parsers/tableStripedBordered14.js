/* global WebImporter */
export default function parse(element, { document }) {
    const tables = element.querySelectorAll('table');
    const blocks = [];

    tables.forEach((table) => {
        const rows = [];

        // Add the header row exactly as specified
        const headerRow = ['Table (striped, bordered)'];
        rows.push(headerRow);

        // Extract caption and add it as a separate row
        const caption = table.querySelector('caption');
        if (caption) {
            rows.push([caption.textContent.trim()]);
        }

        // Extract table content
        const tbody = table.querySelector('tbody');
        if (tbody) {
            tbody.querySelectorAll('tr').forEach((row) => {
                const cells = Array.from(row.children).map((cell) => {
                    if (cell.tagName.toLowerCase() === 'td' || cell.tagName.toLowerCase() === 'th') {
                        const links = cell.querySelectorAll('a');
                        if (links.length > 0) {
                            return [...links].map((link) => {
                                const anchor = document.createElement('a');
                                anchor.href = link.href;
                                anchor.textContent = link.textContent.trim();
                                return anchor;
                            });
                        }
                        return cell.textContent.trim();
                    }
                    return null;
                });
                rows.push(cells);
            });
        }

        const block = WebImporter.DOMUtils.createTable(rows, document);
        blocks.push(block);
    });

    // Replace the element with the blocks
    const wrapper = document.createElement('div');
    blocks.forEach((block) => wrapper.appendChild(block));
    element.replaceWith(wrapper);
}