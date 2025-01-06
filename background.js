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
    const [urlKey, recordId] = text.trim().split(/\s+/);
    if (!urlKey || !recordId) {
      throw new Error('Both URL key and record ID are required');
    }
    
    // Get all URLs from storage
    const urls = await new Promise((resolve) => {
      chrome.storage.sync.get(['urls'], (items) => {
        if (!items.urls) {
          throw new Error('No URLs configured');
        }
        resolve(items.urls);
      });
    });

    if (!urls[urlKey]) {
      throw new Error(`URL key "${urlKey}" not found`);
    }

    // Remove trailing slash from orgUrl and leading slash from record ID
    const baseUrl = urls[urlKey].replace(/\/+$/, '');
    const strippedRecordId = recordId.replace(/^\/+/, '');
    const url = `${baseUrl}/${strippedRecordId}`;
    chrome.tabs.update({ url: url });
  } catch (error) {
    chrome.runtime.openOptionsPage();
  }
});
