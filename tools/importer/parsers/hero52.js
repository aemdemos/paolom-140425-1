/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the headline
    const headingElement = element.querySelector('[data-ref="heading"]');
    const heading = headingElement ? headingElement.textContent.trim() : '';

    // Extract subheading
    const subheadingElement = element.querySelector('.HomepageHeroEdgeToEdge__StyledRichText-sc-rkxeoj-5');
    const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

    // Extract call-to-action link
    const linkElement = element.querySelector('[data-ref="link"]');
    const ctaText = linkElement ? linkElement.textContent.trim() : '';
    const ctaHref = linkElement ? linkElement.href : '';

    // Create the heading element
    const headingNode = document.createElement('h1');
    headingNode.textContent = heading;

    // Create the subheading element
    const subheadingNode = document.createElement('p');
    subheadingNode.textContent = subheading;

    // Create the call-to-action element
    const ctaNode = document.createElement('a');
    ctaNode.href = ctaHref;
    ctaNode.textContent = ctaText;

    // Combine all content into a single cell
    const combinedContent = document.createElement('div');
    combinedContent.appendChild(headingNode);
    combinedContent.appendChild(subheadingNode);
    combinedContent.appendChild(ctaNode);

    // Build the table cells
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';
    const cells = [
        [headerRow[0]],
        [combinedContent],
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}