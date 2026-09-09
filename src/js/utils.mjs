// =============================================================================
// FILE: src/js/utils.mjs
// ROLE: The shared utility belt for the entire application.
// WHY WE NEED IT: Instead of writing the same repetitive browser code across 
// dozens of files, we write helper functions here once, export them, and 
// reuse them everywhere.
// =============================================================================


// -----------------------------------------------------------------------------
// TOOL 1: qs (Query Selector Shortcut)
// -----------------------------------------------------------------------------
// WHAT IT DOES: Finds and grabs an HTML element from the web page.
// WHY WE DO IT: Writing "document.querySelector('.class-name')" dozens of times
// is verbose and clutters code. "qs" is just a quick, clean nickname for it.
// PARAMETERS:
//   - "selector": The CSS selector string we are hunting for (e.g., "#addToCart" or ".product-card").
//   - "parent = document": Where to search. Defaults to the entire web page ("document"),
//     but lets us restrict the search to inside a smaller container if needed.
export function qs(selector, parent = document) {
  // Finds the first matching tag inside that parent container and returns it.
  return parent.querySelector(selector);
}


// -----------------------------------------------------------------------------
// TOOL 2: getLocalStorage (Read Saved Data)
// -----------------------------------------------------------------------------
// WHAT IT DOES: Pulls saved text out of the browser's persistent storage box 
// and converts it back into real JavaScript data (objects or arrays).
// WHY WE DO IT: LocalStorage only stores raw plain text (strings). When we saved
// an item like an array `[{ id: "880RR" }]`, it was turned into flat text. 
// "JSON.parse" converts that flat text back into real objects our code can read.
// PARAMETERS:
//   - "key": The name tag on the storage cubby (e.g., "so-cart").
export function getLocalStorage(key) {
  // 1. "localStorage.getItem(key)" opens the cubby and pulls out the raw text string.
  // 2. "JSON.parse(...)" reconstructs that text into a usable JavaScript object/array.
  return JSON.parse(localStorage.getItem(key));
}


// -----------------------------------------------------------------------------
// TOOL 3: setLocalStorage (Save Data)
// -----------------------------------------------------------------------------
// WHAT IT DOES: Takes live JavaScript data and safely stores it in the browser.
// WHY WE DO IT: If a user refreshes the page or closes the tab, normal variables 
// vanish. LocalStorage keeps the data alive. But because LocalStorage only accepts
// plain text, we must freeze our objects into a string format first using "JSON.stringify".
// PARAMETERS:
//   - "key": The name tag for the storage cubby where this data will sit.
//   - "data": The live JavaScript data (like our cart array of products) to be saved.
export function setLocalStorage(key, data) {
  // 1. "JSON.stringify(data)" freezes the live object/array into a plain text string.
  // 2. "localStorage.setItem(...)" deposits that string into the named cubby.
  localStorage.setItem(key, JSON.stringify(data));
}


// -----------------------------------------------------------------------------
// TOOL 4: setClick (Universal Touch/Click Listener)
// -----------------------------------------------------------------------------
// WHAT IT DOES: Listens for a user interaction whether they are using a mouse 
// or tapping on a mobile phone screen.
// WHY WE DO IT: Mobile browsers sometimes introduce a 300ms delay or misfire 
// standard mouse "click" events. Listening to both "touchend" and "click" makes
// the app feel instant on phones while still functioning on laptops.
// PARAMETERS:
//   - "selector": The HTML element to watch for clicks/taps.
//   - "callback": The specific function to execute once the tap/click happens.
export function setClick(selector, callback) {
  // For mobile touchscreens:
  qs(selector).addEventListener("touchend", (event) => {
    // "preventDefault()" prevents the phone browser from firing a duplicate fake click right after.
    event.preventDefault();
    callback();
  });

  // For desktop mouse clicks:
  qs(selector).addEventListener("click", callback);
}


// -----------------------------------------------------------------------------
// TOOL 5: getParam (Read URL Query Parameters)
// -----------------------------------------------------------------------------
// WHAT IT DOES: Reads specific variables passed through the browser's address bar.
// WHY WE DO IT: We don't want to build 100 different HTML files for 100 products.
// Instead, we use one generic page: "product_pages/index.html?product=880RR".
// This helper inspects that web address, pulls out "880RR", and hands it to our
// JavaScript so the page knows which product's details to download and display.
// PARAMETERS:
//   - "param": The key name we are looking for in the web address (e.g., "product").
export function getParam(param) {
  // "window.location.search" extracts the question mark and everything after it (e.g., "?product=880RR").
  const queryString = window.location.search;

  // "URLSearchParams" is a built-in browser engine that splits query strings into key/value pairs.
  const urlParams = new URLSearchParams(queryString);

  // We ask the engine for the exact value paired with our key name, and return it.
  return urlParams.get(param);
}