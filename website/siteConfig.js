/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Open Power Quality' /* title for your website */,
  tagline: 'Open source hardware and software for low-cost distributed power quality data collection, analysis, and visualization.',
  url: 'https://openpowerquality.org' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'docusaurus',
  organizationName: 'openpowerquality',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'intro-opq', label: 'Documentation'},
    {doc: 'opportunities', label: 'Opportunities'},
    {blog: true, label: 'News'},
  ],

  algolia: { apiKey: '9bf16cc78135dbeeb3826894ebbbb2ee', indexName: 'openpowerquality' },

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/opqlogo_white.png',
  footerIcon: 'img/opqlogo_white.png',
  favicon: 'img/opq.ico',

  /* colors for website */
  colors: {
    primaryColor: "#0587b3",
    secondaryColor: "#6fc1f0",
    tintColor: "#005068",
    backgroundColor: "#e9faff"
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Your Name or Your Company Name',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  markdownPlugins: [function (md) {
    md.use(require('remarkable-katex'));
  }],

  scripts: ['https://buttons.github.io/buttons.js', 'https://cdn.jsdelivr.net/npm/katex@0.9.0/dist/katex.min.js'],

  stylesheets: ['https://cdn.jsdelivr.net/npm/katex@0.9.0/dist/katex.min.css',
    'https://fonts.googleapis.com/css?family=Gugi'],

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
  blogSidebarCount: 'ALL',
};

module.exports = siteConfig;
