#!/bin/bash
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter case-studies.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter classification.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter economics.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter general.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter hawaii.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter monitoring.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter opq.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter renewables.bib
openout_any=a bibtex2html -dl -nodoc -nobibsource -nokeys -nokeywords -nofooter standards.bib
cat header.txt opq-header.txt opq.html related-work-header.txt general-header.txt general.html standards-header.txt standards.html case-studies-header.txt case-studies.html classification-header.txt classification.html economics-header.txt economics.html hawaii-header.txt hawaii.html monitoring-header.txt monitoring.html renewables-header.txt renewables.html > ../docs/intro-bibliography.md
