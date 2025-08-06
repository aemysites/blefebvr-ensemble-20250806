/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card grid (should be the .row.three-tiles)
  let cardsRow = element.querySelector('.row.three-tiles');
  let cardEls = [];
  if (cardsRow) {
    cardEls = Array.from(cardsRow.children);
  } else {
    // fallback: treat all direct children as cards if layout changes
    cardEls = Array.from(element.children).filter(child => child.querySelector('img') && child.querySelector('h1,h2,h3,h4,h5,h6'));
  }
  
  const table = [];
  // Add header row as per block requirements
  table.push(['Cards']);

  cardEls.forEach(card => {
    // Find first <img> and heading
    const img = card.querySelector('img');
    let heading = card.querySelector('h1, h2, h3, h4, h5, h6');

    // Defensive: If no image or heading, skip this card
    if (!img || !heading) return;

    // Retain heading element as-is to preserve semantics/formatting
    // There is no description or extra text in this example, so only heading
    table.push([
      img,
      heading
    ]);
  });

  // Build and replace
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
