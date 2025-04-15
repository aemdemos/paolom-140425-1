/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    const bulletDiv = element.querySelector('ul');
    const bulletPoints = document.createElement('div');
    if (bulletDiv) {
        bulletPoints.appendChild(bulletDiv.cloneNode(true));
    } else {
        const list = document.createElement('ul');
        ['One', 'Two', 'Three'].forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
        bulletPoints.appendChild(list);
    }

    const liveAnchor = element.querySelector('a[href$="word-edit.officeapps.live.com/"]');
    if (liveAnchor) {
        bulletPoints.appendChild(liveAnchor.cloneNode(true));
    } else {
        const liveButton = document.createElement('a');
        liveButton.href = 'https://word-edit.officeapps.live.com/';
        liveButton.textContent = 'Live';
        bulletPoints.appendChild(liveButton);
    }

    const greenImg = element.querySelector('img[src*="media_193050d52a802830d970fde49644ae9a504a61b7f.png"]');
    const greenDoubleHelixImg = document.createElement('img');
    greenDoubleHelixImg.src = greenImg ? greenImg.src : 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';

    const yellowImg = element.querySelector('img[src*="media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png"]');
    const yellowDoubleHelixImg = document.createElement('img');
    yellowDoubleHelixImg.src = yellowImg ? yellowImg.src : 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';

    const previewTextDiv = document.createElement('div');
    previewTextDiv.innerHTML = "Or you can just view the preview<br>";
    const previewButton = document.createElement('a');
    previewButton.href = 'https://word-edit.officeapps.live.com/';
    previewButton.textContent = 'Preview';
    previewTextDiv.appendChild(previewButton);

    const secondRow = [bulletPoints, greenDoubleHelixImg];
    const thirdRow = [yellowDoubleHelixImg, previewTextDiv];

    const cells = [headerRow, secondRow, thirdRow];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(blockTable);
}