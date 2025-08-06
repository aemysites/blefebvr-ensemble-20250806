/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if the container structure matches
  const container = element.querySelector('.container-fluid');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Right column: image (background asset)
  let image = columns[1].querySelector('img');
  // Left column: text content
  let textBlock = columns[0].querySelector('div'); // This div contains h2, p, a

  // Prepare text content cell: preserve order and formatting
  const contentCell = [];
  if (textBlock) {
    const heading = textBlock.querySelector('h2');
    const paragraph = textBlock.querySelector('p');
    const cta = textBlock.querySelector('a');
    if (heading) contentCell.push(heading);
    if (paragraph) contentCell.push(paragraph);
    if (cta) contentCell.push(cta);
  }

  // Build the table structure as per block specification
  const cells = [
    ['Hero (hero3)'], // header EXACTLY as required
    [image ? image : ''], // image cell: references image element if present
    [contentCell.length ? contentCell : ''] // text content in a single cell
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
