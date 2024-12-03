function saveOptions() {
  const orgUrl = document.getElementById('orgUrl').value;
  if (!orgUrl) {
    const status = document.getElementById('status');
    status.textContent = 'Organization URL is required';
    return;
  }
  
  // Remove trailing slash if present
  const cleanUrl = orgUrl.replace(/\/$/, '');
  
  chrome.storage.sync.set(
    { orgUrl: cleanUrl },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get(['orgUrl'], (items) => {
    if (items.orgUrl) {
      document.getElementById('orgUrl').value = items.orgUrl;
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions); 