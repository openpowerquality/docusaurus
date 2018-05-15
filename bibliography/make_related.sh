#!/bin/bash
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords opq-pubs.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords opq.bib
cat intro-bibliography-header.txt opq-pubs.html intro-bibliography-section.txt opq.html > ../docs/intro-bibliography.md
