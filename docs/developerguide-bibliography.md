---
title: Bibliography
sidebar_label: Bibliography
---

## Citation management

We manage our citations to related work using [Zotero](https://www.zotero.org/).  To help with citation management, please install the Zotero desktop client, then ask an OPQ developer to be added to the OPQ group. You will then be able to sync your local Zotero system to the shared Zotero files for OPQ.

When adding new citations, please observe the following conventions:

* Specify the "date" field whenever possible, and always specify dates as Month, Year (for example, "March, 2018"). This prevents formatting problems when producing the Bibliography chapter in this document.

* When entering citations to conference publications, please include the "Proceedings Title" field.

* If there is a publicly available PDF for the publication, then put that into the "URL" field. Otherwise, put the URL to the IEEE Explore page (or similar) with full citation details.  If you have obtained access to the PDF through the UH library, then you can upload the file to the opq@hawaii.edu drive file to make it easier for other UH students in the OPQ project to access the PDF.

## Bibliography chapter generation

To generate a new version of the [Bibliography Chapter](intro-bibliography.md), first install [BibTex2HTML](https://www.lri.fr/~filliatr/bibtex2html/doc/manual.html). You will need to add the "bibtex2html" command to your PATH environment variable.

The source files and scripts for generating the Bibliography chapter are maintained in the docusaurus/bibliography directory. 

After updating our citation library in Zotero with new citations, use the "Export" function in Zotero to write a file called "opq.bib" into the docusaurus/bibliography directory. You will need to overwrite the previous version of the file. 

Next, make sure that the opq-pubs.bib file in that directory is up to date.  Add any new publications by OPQ group members to that file.

Next, bring up a shell, cd into the docusaurus/bibliography directory, and invoke this shell script:

```
$ .make_related.sh
```

This will run Bibtex2Html over the opq.bib and opq-pubs.bib files, and write out a new version of docusaurus/docs/intro-bibliography.md.

Finally, run docusaurus locally by cd'ing into the docusaurus/website directory and invoking `npm start`.  Take a look at the generated Bibliography chapter and make sure the formatting and links are correct.  

Once you have verified that the bibliography is correct, then please commit the source files to master and run `npm run publish-gh-pages` to publish the new bibliography to the web.
