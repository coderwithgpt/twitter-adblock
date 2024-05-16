chrome.storage.sync.get(['adAction', 'highlightColor', 'adBlockCount'], function(data) {
    const adAction = data.adAction || 'hide';
    const highlightColor = data.highlightColor || '#ff0000';
    let adBlockCount = data.adBlockCount || 0;

    function handleAd(node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.dataset.testid === "cellInnerDiv") {
            const adSpan = Array.from(node.querySelectorAll('span')).find(span => span.textContent.trim() === "Ad");
            if (adSpan) {
                if (adAction === 'hide') {
                    node.style.display = 'none';
                } else if (adAction === 'highlight') {
                    node.style.border = `3px solid ${highlightColor}`;
                }
                adBlockCount++;
                chrome.storage.sync.set({ adBlockCount: adBlockCount });
            }
        }
    }

    Array.from(document.querySelectorAll('[data-testid="cellInnerDiv"]')).forEach(handleAd);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(handleAd);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});