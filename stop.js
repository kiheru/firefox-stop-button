'use strict';

function handleClick(tab) {
	browser.tabs.executeScript(tab.id, {
		code: "window.stop();",
		allFrames: true,
		runAt: "document_start"
	});
}

function updateState(tab) {
	if ("loading" === tab.status) {
		browser.browserAction.enable(tab.id);
	} else {
		browser.browserAction.disable(tab.id);
	}
}

function tabUpdated(tabId, changeInfo, tab) {
	updateState(tab);
}

browser.browserAction.onClicked.addListener(handleClick);
browser.tabs.onUpdated.addListener(tabUpdated);

browser.browserAction.disable();
