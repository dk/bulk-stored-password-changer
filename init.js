browser.contextMenus.create({
  id: "bulk-password-changer-run-key",
  type: "normal",
  title: "Bulk password changer 2",
  contexts: ["all"]
});

browser.contextMenu.onClicked.addListener(function(info,tab) {
  console.log(info.menuItemId);
  alert(info.menuItemId);
  if (info.menuItemId != "bulk-password-changer-run-key") return;
  console.log("hello!");
  alert("hello!");
});
