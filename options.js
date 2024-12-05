function save_options() {
  var url = document.getElementById('orgUrl').value;
  chrome.storage.sync.set({
    orgUrl: url
  }, function() {
    // Update status to indicate options were saved
    var status = document.getElementById('status');
    status.textContent = 'Settings saved!';
    status.className = 'status success';
    status.style.display = 'block';
    setTimeout(function() {
      status.style.display = 'none';
    }, 3000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    orgUrl: ''
  }, function(items) {
    document.getElementById('orgUrl').value = items.orgUrl;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options); 