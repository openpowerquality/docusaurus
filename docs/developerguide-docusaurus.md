---
title: Documentation
sidebar_label: Documentation
---

This site is implemented using [Docusaurus](http://docusaurus.io). Here is an abbreviated guide to writing documentation for this site.

## Installation and invocation

You will want to create a local installation of this site in order to develop your documentation. 

First, download the [OPQ docusaurus repository](https://github.com/openpowerquality/docusaurus).

Next, cd into the docusaurus/website directory and invoke `npm install`.

To bring up the site locally, invoke `npm start`.

You should see the site appear at http://localhost:3000.

## Writing documentation

To write documentation, you should create or modify the files in the docs/ directory.  The docs/ directory has the following structure:

  * A bunch of *.md files.  These files contain the documentation in markdown format.
  * The assets/ directory.  This directory contains a number of subdirectories which hold images referenced by the documentation markdown files. 
  
The easiest way to get started is to copy an existing markdown file that seems to contain the kind of markdown you need to use, and then edit it to provide the needed documentation.

Here are some issues to be aware of:
 
  * The docs/ directory cannot contain subdirectories.  So, all of the documentation must exist as a set of top-level files. 
  * AFAIK, the sidebar takes only a list of file names. So, each entry in the sidebar corresponds to a single file name. If you want your documentation to appear as multiple entries in the sidebar, then you must create multiple documentation markdown files.
  * On a happier note, docusaurus creates a "secondary sidebar" on the right side of the page that essentially provides a table of contents for that page.  This enable rather lengthy top-level documentation files (see [Mauka documentation](mauka.md) as an example) because its internal structure is presented once you navigate to the page. 
  * The docusaurus runtime environment regenerates the documentation each time it notices a file change. So, you can save out your file, then refresh the page in your browser to see the changes immediately.

## Adding your new documentation to the sidebar

As soon as you start writing your documentation, you'll want to add an entry to the sidebar so that you can easily navigate to it. To do this, edit the website/sidebars.json file. Just add the name of your file to the appropriate array of file name strings in the appropriate place. 

## Adding images

If you want to add images, you should first add the image file to the appropriate docs/assets subdirectory.  Feel free to create a new subdirectory to hold your images if you feel that is appropriate. Then, you can insert your image using something like:

```
<img src="/docs/assets/view/opqview-landing-page.png" >
```

### Adding math

This site has installed the [remarkable-katex](https://github.com/bradhowes/remarkable-katex) plugin, so it should be possible to insert mathematical equations using LaTeX syntax and surrounded by \$'s.  

Unfortunately, the rendered equations are quite janky; see the [OPQ Box Design Overview](box-overview.md) chapter for examples. Hopefully we'll figure out a way to fix this in future.

## Publishing the site

Once your documentation is just exactly perfect, you'll want to publish your changes. 

First, commit your source modifications and push to GitHub.

Next, set up the GIT_USER environment variable.  This must be set to your GitHub username. For example:

```
export GIT_USER=philipmjohnson
```

Next, invoke the docusaurus publication script:


 

 