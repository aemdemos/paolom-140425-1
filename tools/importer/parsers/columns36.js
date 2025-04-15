/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const columnOne = document.createElement('div');
  const columnOneWrapper = element.querySelector('.SideBySideLayout__ContainerWrapper-sc-nb03j7-1');
  const columnOneTitle = columnOneWrapper.querySelector('h2')?.textContent || '';
  const columnOneContent = columnOneWrapper.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0')?.cloneNode(true) || document.createTextNode('');
  const columnOneButtonGroup = columnOneWrapper.querySelectorAll('.NelComponents__ButtonGroup-sc-vsly48-10');

  columnOne.append(columnOneContent);
  columnOneButtonGroup.forEach(button => {
    columnOne.append(button.cloneNode(true));
  });

  const columnTwo = document.createElement('div');
  const columnTwoWrapper = element.querySelectorAll('.SideBySideLayout__ContainerWrapper-sc-nb03j7-1')[1];
  const columnTwoTitle = columnTwoWrapper?.querySelector('h2')?.textContent || '';
  const columnTwoContent = columnTwoWrapper?.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0')?.cloneNode(true) || document.createTextNode('');
  const columnTwoList = columnTwoWrapper?.querySelector('.NelComponents__List-sc-vsly48-35')?.cloneNode(true) || document.createElement('ul');

  columnTwo.append(columnTwoContent);
  columnTwo.append(columnTwoList);

  const cells = [
    headerRow,
    [columnOneTitle, columnTwoTitle],
    [columnOne, columnTwo],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}