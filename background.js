chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({text: ""})
    console.info('9779 reset text')
})