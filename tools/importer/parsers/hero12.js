/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Get the image (right column in .row)
  let imageEl = null;
  const rowDivs = element.querySelectorAll(':scope .row > div');
  for (const div of rowDivs) {
    const img = div.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Get the content (left column: eyebrow, h2, CTA)
  let contentDiv = null;
  for (const div of rowDivs) {
    if (div.querySelector('h2')) {
      contentDiv = div;
      break;
    }
  }
  const contentRow = [contentDiv ? contentDiv : ''];

  // Compose the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
