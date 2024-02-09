// background.js
// This script runs in the background

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'openNewTab') {
    // Create a new tab with the modified table content
    chrome.tabs.create({ url: 'popup.html' }, function (tab) {
      // Send a message to the newly created tab
    });
  }
});
