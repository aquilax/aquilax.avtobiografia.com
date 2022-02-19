.PHONY: clean

all: clean
	node src/index.js
	cp -r static/* public

clean:
	rm -rf public