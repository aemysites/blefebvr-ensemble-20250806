/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Search'];

  // Get the search index/query URL from known attributes in the element
  let url = '';
  const suggestDiv = element.querySelector('.lucid-suggest-url');
  if (suggestDiv && suggestDiv.getAttribute('data-url')) {
    url = suggestDiv.getAttribute('data-url').trim();
  } else {
    // fallback: a form with data-careerurl
    const form = element.querySelector('form[data-careerurl]');
    if (form && form.getAttribute('data-careerurl')) {
      url = form.getAttribute('data-careerurl').trim();
    }
  }
  // Force absolute URL if not already
  if (url && !/^https?:\/\//i.test(url)) {
    try {
      const base = document.location ? document.location.origin : '';
      url = base + (url.startsWith('/') ? '' : '/') + url;
    } catch(e){}
  }

  // Collect ALL visible text content from the search area, including labels and placeholders
  // We want to cover all visible instructions that a user might see
  // We'll aggregate all <label> and input[placeholder] and visible text nodes
  const textNodes = [];
  // All labels
  element.querySelectorAll('label').forEach(label => {
    const txt = label.textContent.trim();
    if (txt) textNodes.push(txt);
  });
  // Placeholders
  element.querySelectorAll('input[placeholder]').forEach(input => {
    const txt = input.getAttribute('placeholder').trim();
    if (txt) textNodes.push(txt);
  });
  // Standalone text nodes under the wrapper (not inside labels/inputs)
  const wrapper = element.querySelector('.content_wrapper');
  if (wrapper) {
    Array.from(wrapper.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.textContent.trim();
        if (txt) textNodes.push(txt);
      }
    });
  }

  // Create a div to hold all the visible instructions/text
  let textDiv = null;
  if (textNodes.length) {
    textDiv = document.createElement('div');
    textNodes.forEach(txt => {
      const p = document.createElement('p');
      p.textContent = txt;
      textDiv.appendChild(p);
    });
  }

  // Compose the cell: url and the collected instructions (if present)
  let cellContent = [];
  if (url) cellContent.push(url);
  if (textDiv) cellContent.push(textDiv);
  if (cellContent.length === 0) cellContent = [''];

  // Build the block table: 1 column, 2 rows
  const cells = [
    headerRow,
    [cellContent]
  ];

  // Replace the element with the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
