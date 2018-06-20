
SLIDES  = bring-your-own-user-agent
BROWSER = google-chrome
DOT     = dot

dotfiles = $(shell find . -iname '*.dot')
svgfiles = $(patsubst %.dot,%.svg,$(dotfiles))

all: offline

clean:
	rm -f slides-offline.html remark.min.js $(SLIDES).pdf $(svgfiles)

offline: slides-offline.html remark.min.js $(svgfiles)

pdf: $(SLIDES).pdf

run: $(svgfiles)
	$(BROWSER) slides.html

run-offline: offline
	$(BROWSER) slides-offline.html

%.svg: %.dot
	$(DOT) -Tsvg -o$@ $<

$(SLIDES).pdf: slides.html $(wildcard css/*) $(wildcard img/*) $(svgfiles)
	docker run --network host --rm -t -v `pwd`:/slides astefanutti/decktape http://localhost:5000 /slides/$(SLIDES).pdf

slides-offline.html: slides.html
	sed -e '1 a <!-- This file is auto-generated - DO NOT EDIT!!! -->' \
	    -e 's!https://.*remark-latest\.min\.js!remark.min.js!' <$< >$@

remark.min.js:
	curl -Lo $@ https://gnab.github.io/remark/downloads/remark-latest.min.js

.PHONY: all clean offline pdf run run-offline

