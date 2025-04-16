/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract the content from list items
  const extractCardData = (list) => {
    return Array.from(list.querySelectorAll('li')).map((item) => {
      const heading = item.querySelector('p strong');
      const description = item.querySelector('p');

      const cardContent = [];

      if (heading) {
        const strongElement = document.createElement('strong');
        strongElement.textContent = heading.textContent;
        cardContent.push(strongElement);
      }

      if (description) {
        const descriptionClone = description.cloneNode(true);
        descriptionClone.querySelector('strong')?.remove(); // Remove strong tag from description if it exists
        cardContent.push(descriptionClone);
      }

      return cardContent;
    });
  };

  const extractSidebarContent = (sidebar) => {
    const sidebarContent = [];

    // Extract "You can apply if you:" content
    const applyHeading = sidebar.querySelector('h3');
    const applyList = sidebar.querySelector('ul');

    if (applyHeading && applyList) {
      const applyHeadingElement = document.createElement('strong');
      applyHeadingElement.textContent = applyHeading.textContent;
      sidebarContent.push(applyHeadingElement);

      const listItems = Array.from(applyList.querySelectorAll('li')).map((li) => li.cloneNode(true));
      const ulElement = document.createElement('ul');
      ulElement.append(...listItems);
      sidebarContent.push(ulElement);
    }

    // Extract "Note:" content
    const noteMessage = sidebar.querySelector('[data-ref="message"]');
    if (noteMessage) {
      const noteHeading = noteMessage.querySelector('[data-ref="messageHeader"]');
      const noteDescription = noteMessage.querySelector('.Content-sc-mh9bui-0');

      if (noteHeading) {
        const noteHeadingElement = document.createElement('strong');
        noteHeadingElement.textContent = noteHeading.textContent;
        sidebarContent.push(noteHeadingElement);
      }

      if (noteDescription) {
        const noteDescriptionClone = noteDescription.cloneNode(true);
        sidebarContent.push(noteDescriptionClone);
      }
    }

    return sidebarContent;
  };

  // Extract relevant content from the input element
  const heading = element.querySelector('h2');
  const list = element.querySelector('ul');
  const sidebar = element.querySelector('.ContentWithSidebar__StyledSidebarWrapper-sc-jz7j6b-2');

  if (!heading || !list || !sidebar) {
    console.error('Required elements not found in the provided HTML structure');
    return;
  }

  // Create table cells
  const headerRow = ['Cards (no images)'];
  const cardRows = extractCardData(list).map((cardContent) => [cardContent]);
  const sidebarContent = extractSidebarContent(sidebar);

  // Combine rows into table structure
  const tableData = [headerRow, ...cardRows];

  if (sidebarContent.length > 0) {
    tableData.push([sidebarContent]);
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}