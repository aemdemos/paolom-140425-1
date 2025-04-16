/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row to match the example format exactly
    const headerRow = ['Columns'];

    // Extract relevant content from the input element
    const columns = Array.from(element.querySelectorAll('div[data-ref="gridColumn"]')).map((column) => {
        const heading = column.querySelector('h3')?.textContent.trim();

        // Extract image element
        const image = column.querySelector('img');
        const imageElement = image ? (() => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            return img;
        })() : null;

        // Extract paragraphs
        const paragraphs = Array.from(column.querySelectorAll('div[data-component="RichText"] p')).map((p) => {
            const para = document.createElement('p');
            para.textContent = p.textContent.trim();
            return para;
        });

        // Extract link
        const link = column.querySelector('a[data-ref="link"]');
        const linkElement = link ? (() => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent.trim();
            return anchor;
        })() : null;

        // Combine all extracted elements into a single cell
        const contentContainer = document.createElement('div');
        if (heading) {
            const headingElement = document.createElement('h3');
            headingElement.textContent = heading;
            contentContainer.appendChild(headingElement);
        }
        if (imageElement) {
            contentContainer.appendChild(imageElement);
        }
        paragraphs.forEach((paragraph) => {
            contentContainer.appendChild(paragraph);
        });
        if (linkElement) {
            contentContainer.appendChild(linkElement);
        }

        return contentContainer;
    });

    // Structure the table array
    const cells = [
        headerRow,
        columns
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}