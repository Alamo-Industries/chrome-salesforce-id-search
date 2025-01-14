function save_options() {
  const urlInputs = document.querySelectorAll('.url-entry');
  const urls = {};
  
  // Validate and collect all URLs
  for (const entry of urlInputs) {
    const key = entry.querySelector('.urlKey').value.trim().toLowerCase();
    let url = entry.querySelector('.orgUrl').value.trim();
    
    // Validate key format - now allows letters, numbers, and dashes
    if (!/^[a-z0-9-]+$/.test(key)) {
      showStatus('URL keys must contain only lowercase letters, numbers, and dashes', 'error');
      return;
    }
    
    // Validate URL format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Validate Salesforce URL
    if (!isSalesforceUrl(url)) {
      showStatus('Please enter a valid Salesforce URL', 'error');
      return;
    }
    
    // Check for duplicate keys
    if (urls[key]) {
      showStatus('Duplicate keys are not allowed', 'error');
      return;
    }

    urls[key] = url;
  }

  chrome.storage.sync.set({ urls }, function() {
    showStatus('Settings saved!', 'success');
  });
}

function isSalesforceUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.endsWith('.salesforce.com') || 
           urlObj.hostname.endsWith('.force.com') ||
           urlObj.hostname.endsWith('.lightning.force.com');
  } catch (e) {
    return false;
  }
}

function showStatus(message, type) {
  var status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';
  setTimeout(function() {
    status.style.display = 'none';
  }, 3000);
}

function addUrlEntry(container, key = '', url = '') {
  const entry = document.createElement('div');
  entry.className = 'url-entry';
  entry.innerHTML = `
    <input type="text" class="urlKey" placeholder="Key (e.g., prod)" value="${key}">
    <input type="url" class="orgUrl" placeholder="https://your-instance.salesforce.com" value="${url}">
    <button class="delete-btn" title="Delete">
      <i class="fas fa-trash-alt"></i>
    </button>
  `;

  // Add delete functionality
  const deleteBtn = entry.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    const allEntries = container.querySelectorAll('.url-entry');
    
    // If this is the only entry and it's empty, don't remove it
    if (allEntries.length === 1) {
      const keyInput = entry.querySelector('.urlKey');
      const urlInput = entry.querySelector('.orgUrl');
      if (!keyInput.value && !urlInput.value) {
        return;
      }
      // If it's the only entry but has content, clear it instead of removing
      keyInput.value = '';
      urlInput.value = '';
      return;
    }
    
    entry.remove();
    
    // If we removed the last entry, add a blank one
    if (container.querySelectorAll('.url-entry').length === 0) {
      addUrlEntry(container);
    }
  });

  container.appendChild(entry);
}

function restore_options() {
  chrome.storage.sync.get({ urls: {} }, function(items) {
    const container = document.getElementById('urls-container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // If no URLs saved yet, add one empty entry
    const urls = Object.keys(items.urls).length === 0 ? 
      { '': '' } : items.urls;
    
    for (const [key, url] of Object.entries(urls)) {
      addUrlEntry(container, key, url);
    }
  });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('addUrl').addEventListener('click', function() {
    const container = document.getElementById('urls-container');
    addUrlEntry(container);
  });
}); 