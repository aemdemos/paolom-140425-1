/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards'];

    const cards = Array.from(element.querySelectorAll('[data-component="CardCTATextLinks"]')).map((card) => {
        const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
        const image = document.createElement('div');
        image.innerHTML = imageContainer.outerHTML;

        const title = card.querySelector('h2[data-ref="heading"]');
        const descriptionContainer = card.querySelector('[data-testid="CardContent"]');
        const descriptionParagraphs = Array.from(descriptionContainer.querySelectorAll('p'));

        const linkContainer = card.querySelector('[data-testid="TextLink"]');
        const linkText = linkContainer.textContent;
        const linkHref = linkContainer.getAttribute('href');
        const link = document.createElement('a');
        link.href = linkHref;
        link.textContent = linkText;

        const textContent = [
            title,
            ...descriptionParagraphs,
            link,
        ];

        return [image, textContent];
    });

    const tableData = [
        headerRow,
        ...cards,
    ];

    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}