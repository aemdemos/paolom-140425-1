/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the block name provided in the example
  const headerRow = ['Cards (no images)'];

  // Initialize rows for the table.
  const rows = [];

  // Select all cards within the element
  const cards = element.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0');

  // Loop through each card to extract its content
  cards.forEach((card) => {
    // Extract the heading, description, and link from the card
    const heading = card.querySelector('[data-ref="heading"]');
    const description = card.querySelector('[data-testid="CardContent"] p');
    const link = card.querySelector('[data-ref="link"]');

    // Initialize an array to hold the content for this cell
    const cellContent = [];

    // Add the heading if it exists
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      cellContent.push(headingElement);
    }

    // Add the description if it exists
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      cellContent.push(descriptionElement);
    }

    // Add the link if it exists (directly without wrapping it in unnecessary elements)
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      cellContent.push(linkElement);
    }

    // Add this row's cell content to the table rows
    rows.push([cellContent]);
  });

  // Combine the header row and content rows into the final table data
  const tableData = [headerRow, ...rows];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}