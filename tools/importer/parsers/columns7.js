/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as required
  const headerRow = ['Columns (columns7)'];

  // Get the two main columns from the outermost row
  const rootCols = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: add empty divs if fewer than 2 columns
  while (rootCols.length < 2) rootCols.push(document.createElement('div'));

  // LEFT SIDE: .col-12.col-md-8, contains a .row > .col-4 and .col-8,
  // but those are NOT guaranteed, so collect all uls in document order for maximum resilience
  let leftUls = [];
  if (rootCols[0]) {
    leftUls = Array.from(rootCols[0].querySelectorAll('ul'));
  }
  // If fewer than 2 lists, ensure we have two cells
  while (leftUls.length < 2) leftUls.push(document.createElement('div'));
  
  // RIGHT SIDE: connect content, preserve all children
  let rightContent;
  if (rootCols[1]) {
    const frag = document.createDocumentFragment();
    Array.from(rootCols[1].childNodes).forEach(node => {
      frag.appendChild(node);
    });
    rightContent = frag;
  } else {
    rightContent = document.createElement('div');
  }

  // Build block table: header, then one row with 3 columns
  const cells = [
    headerRow,
    [leftUls[0], leftUls[1], rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
