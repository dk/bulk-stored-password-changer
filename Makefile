all: opt.js
	zip -r bulk-stored-password-changer2.xpi manifest.json init.js index.html opt.js icon.png

test:
	web-ext lint

VERSION=1.6
TARGET = bulk-stored-password-changer2-$(VERSION)
dist:
	mkdir $(TARGET)
	cp README.md Makefile manifest.json init.js index.html opt.mk.js inject.js inject.pl icon.png $(TARGET)
	tar cf - $(TARGET) | gzip > $(TARGET).tar.gz
	rm -rf $(TARGET)

opt.js: opt.mk.js inject.js
	perl inject.pl < inject.js > opt.js
	cat opt.mk.js >> opt.js

old:
	zip -r bulk-stored-password-changer.xpi chrome chrome.manifest install.rdf

clean:
	rm -f opt.js bulk-stored-password-changer2.xpi
