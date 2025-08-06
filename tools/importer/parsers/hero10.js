/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, as required
  const headerRow = ['Hero (hero10)'];

  // Find the background image - always the img in the right col
  const img = element.querySelector('img');
  const imageCell = img ? [img] : [''];

  // Find the content (heading and paragraph)
  // The first .row > div contains the content block with h2/p
  let textCell = [''];
  const contentCols = element.querySelectorAll(':scope .row > div');
  if (contentCols.length > 0) {
    const contentBlock = contentCols[0].querySelector('div');
    if (contentBlock) {
      textCell = [contentBlock];
    }
  }

  // Construct the rows as specified (header, image, then text)
  const rows = [
    headerRow,
    imageCell,
    textCell
  ];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
