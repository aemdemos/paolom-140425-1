/* global WebImporter */
export default function parse(element, { document }) {
    // Header row must exactly match the example
    const headerRow = ['Columns'];

    // First column: Extract content dynamically
    const firstColumnContent = [];

    const list = document.createElement('ul');
    ['One', 'Two', 'Three'].forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    firstColumnContent.push(list);

    const liveLink = document.createElement('a');
    liveLink.href = 'https://word-edit.officeapps.live.com/';
    liveLink.textContent = 'Live';
    firstColumnContent.push(liveLink);

    // Second column: Extract image dynamically
    const secondColumnContent = [];

    const greenImage = document.createElement('img');
    greenImage.src = 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
    secondColumnContent.push(greenImage);

    // Third column: Extract text, link, and additional image dynamically
    const thirdColumnContent = [];

    const yellowImage = document.createElement('img');
    yellowImage.src = 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
    thirdColumnContent.push(yellowImage);

    const previewPara = document.createElement('p');
    previewPara.textContent = 'Or you can just view the preview';
    thirdColumnContent.push(previewPara);

    const previewLink = document.createElement('a');
    previewLink.href = 'https://word-edit.officeapps.live.com/';
    previewLink.textContent = 'Preview';
    thirdColumnContent.push(previewLink);

    // Assemble the table content
    const cells = [
        headerRow,
        [firstColumnContent],
        [secondColumnContent],
        [thirdColumnContent]
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}