browser.contextMenus.create({
	id: "bulk-password-changer-run-key",
	type: "normal",
	title: "Bulk password changer",
	contexts: ["all"]
});

browser.contextMenus.onClicked.addListener(function(info,tab) {
	if (info.menuItemId != "bulk-password-changer-run-key") return;
	var w = browser.tabs.create({
		url: "index.html"
	});
});

