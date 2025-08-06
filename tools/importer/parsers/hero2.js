/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as in the example
  const headerRow = ['Hero (hero2)'];

  // Find the image used as the background/image of the hero block
  const img = element.querySelector('img');
  // If image not found, use null so that the row still exists
  const imgCell = img ? [img] : [''];

  // Find the textual content: headline (h1), subhead (paragraph), cta (if any)
  // The text content is in the first .col-12.col-md-6
  const textCol = element.querySelector('.row > .col-12.col-md-6');
  let contentCell = [];
  if (textCol) {
    // Collect all children that are heading or paragraph elements
    const nodes = [];
    // Headings (any level)
    textCol.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => nodes.push(el));
    // Paragraphs
    textCol.querySelectorAll('p').forEach(el => nodes.push(el));
    // CTA: Check for any <a> inside text
    // (not present in example, but included for generality)
    textCol.querySelectorAll('a').forEach(a => {
      // Only include if not already inside nodes
      if (!nodes.includes(a)) nodes.push(a);
    });
    if (nodes.length > 0) {
      contentCell = nodes;
    } else {
      // If nothing found, add empty string for cell
      contentCell = [''];
    }
  } else {
    contentCell = [''];
  }

  // Build the table as in the example: 1 column, 3 rows
  const cells = [
    headerRow,
    imgCell,
    [contentCell]
  ];

  // Create the table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
