all:

old:
	zip -r bulk-stored-password-changer.xpi chrome chrome.manifest install.rdf

new:
	zip -r bulk-stored-password-changer2.xpi manifest.json init.js 

