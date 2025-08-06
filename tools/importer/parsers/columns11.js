/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: must find .container-fluid > .row.three-tiles
  const container = element.querySelector('.container-fluid');
  if (!container) return;
  const row = container.querySelector('.row.three-tiles');
  if (!row) return;

  // Get all direct column children (should be 3 for this layout, but flexible)
  const colNodes = Array.from(row.children).filter(
    (col) => col.nodeType === 1 && /col-/.test(col.className)
  );
  if (colNodes.length === 0) return;

  // Table header must match exact block name
  const headerRow = ['Columns (columns11)'];

  // The second row: each cell is the content of a column (image + text)
  const contentRow = colNodes.map(col => {
    // We'll use a fragment to combine all child elements (image and inner div)
    const frag = document.createDocumentFragment();
    Array.from(col.children).forEach(child => {
      // Only append if not an empty text node
      if (child.nodeType === 1) frag.appendChild(child);
    });
    return frag;
  });

  // Build and replace
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(block);
}
