/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the fluid container and row
  const container = element.querySelector('.container-fluid');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Find all direct child column divs in the row
  const columns = Array.from(row.children).filter((col) => col.nodeType === 1);
  // For each column, reference the main inner content container (usually a div)
  const columnContents = columns.map((col) => {
    // Try to find the first inner div that holds the real content, fallback to col itself
    const mainContent = col.querySelector(':scope > div') || col;
    return mainContent;
  });

  // Build the table: header row is single cell, then a row with each column as a cell
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns9)'], // Single header cell for the whole table
    columnContents // This will be spread as columns in the second row
  ], document);

  element.replaceWith(table);
}
