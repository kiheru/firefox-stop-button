'use strict';

function handleClick() {
	let tab = browser.tabs.query({active: true});
        browser.tabs.executeScript(tab.id, {
                code: "window.stop();",
		allFrames: true,
		runAt: "document_start"
        });
}

function updateState(info) {
	if ("loading" === info.status) {
		browser.browserAction.enable();
	} else {
		browser.browserAction.disable();
	}
}

function tabChanged(activeInfo) {
	let id = activeInfo.tabId;
	browser.tabs.get(id).then(updateState);
}

function tabUpdated(tabId, changeInfo, tab) {
	if (changeInfo.status) {
		updateState(changeInfo);
	}
}

browser.browserAction.onClicked.addListener(handleClick);
browser.tabs.onActivated.addListener(tabChanged);
browser.tabs.onUpdated.addListener(tabUpdated);
