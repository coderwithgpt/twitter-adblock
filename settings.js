document.getElementById('save').addEventListener('click', function() {
    const action = document.querySelector('input[name="adAction"]:checked').value;
    const color = document.getElementById('highlightColor').value;
    chrome.storage.sync.set({ adAction: action, highlightColor: color }, function() {
        console.log('Settings saved:', action, color);
        const dialog = document.getElementById('successDialog');
        dialog.showModal();
    });
});

document.getElementById('highlight').addEventListener('change', function() {
    document.getElementById('highlightColor').style.display = 'block';
});

document.getElementById('hide').addEventListener('change', function() {
    document.getElementById('highlightColor').style.display = 'none';
});

document.getElementById('closeDialog').addEventListener('click', function() {
    const dialog = document.getElementById('successDialog');
    dialog.close();
});

window.onload = function() {
    chrome.storage.sync.get(['adAction', 'highlightColor', 'adBlockCount'], function(data) {
        if (data.adAction) {
            document.getElementById(data.adAction).checked = true;
        }
        if (data.highlightColor) {
            document.getElementById('highlightColor').value = data.highlightColor;
        }
        if (data.adAction === 'highlight') {
            document.getElementById('highlightColor').style.display = 'block';
        } else {
            document.getElementById('highlightColor').style.display = 'none';
        }
        document.getElementById('adBlockCount').textContent = data.adBlockCount || 0;
    });
};
