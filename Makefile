.PHONY: clean

all: clean
	node src/index.js
	cp static/* public

clean:
	rm -rf public