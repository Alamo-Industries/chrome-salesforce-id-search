// background.js

// Get the org URL from storage
function getOrgUrl() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['orgUrl'], (items) => {
      if (!items.orgUrl) {
        throw new Error('Organization URL not configured');
      }
      resolve(items.orgUrl);
    });
  });
}

// Update the listener to use the org URL
chrome.omnibox.onInputEntered.addListener(async (text) => {
  try {
    const orgUrl = await getOrgUrl();
    const query = text.trim();
    // Remove trailing slash from orgUrl and leading slash from query
    const baseUrl = orgUrl.replace(/\/+$/, '');
    const cleanQuery = query.replace(/^\/+/, '');
    const url = `${baseUrl}/${cleanQuery}`;
    chrome.tabs.update({ url: url });
  } catch (error) {
    chrome.runtime.openOptionsPage();
  }
});
