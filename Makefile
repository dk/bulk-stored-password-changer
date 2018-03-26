all: opt.js
	zip -r bulk-stored-password-changer2.xpi manifest.json init.js index.html opt.js 

opt.js: opt.mk.js inject.js
	perl inject.pl < inject.js > opt.js
	cat opt.mk.js >> opt.js

old:
	zip -r bulk-stored-password-changer.xpi chrome chrome.manifest install.rdf

clean:
	rm -f opt.js bulk-stored-password-changer2.xpi
