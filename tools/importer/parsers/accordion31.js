/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Accordion'];

    const rows = [];
    const accordionItems = element.querySelectorAll('.nel-Accordion-501');

    accordionItems.forEach((item) => {
        const titleElement = item.querySelector('[data-ref="accordionHeading"]');
        const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

        const contentElement = item.querySelector('[data-testid="AccordionContent"]');
        const contentParagraphs = contentElement ? Array.from(contentElement.querySelectorAll('p')) : [];

        let content = [];
        if (contentParagraphs.length > 0) {
            content = contentParagraphs.map((p) => {
                const links = Array.from(p.querySelectorAll('a')).map(link => {
                    const clonedLink = document.createElement('a');
                    clonedLink.href = link.href;
                    clonedLink.target = link.target;
                    clonedLink.textContent = link.textContent;
                    return clonedLink;
                });
                return links.length > 0 ? links : p.textContent.trim();
            });
        } else {
            content = 'No content available';
        }

        rows.push([title, content.flat()]); // Flatten arrays of elements/strings for proper table structure
    });

    const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
    element.replaceWith(blockTable);
}