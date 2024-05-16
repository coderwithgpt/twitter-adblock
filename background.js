chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ adAction: 'hide', highlightColor: '#ff0000', adBlockCount: 0 }, function() {
        console.log("Default settings set.");
    });
});