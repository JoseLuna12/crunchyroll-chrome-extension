
// chrome.tabs.onUpdated.addListener
chrome.webNavigation.onHistoryStateUpdated.addListener(async function ({ tabId, transitionType }) {
    await chrome.tabs.sendMessage(tabId, `crunchy_completed:${transitionType}`)
})

