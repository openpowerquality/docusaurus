/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Documentation</h5>
            <a href={this.docUrl('doc1.html', this.props.language)}>Power Quality Overview</a>
            <a href={this.docUrl('doc2.html', this.props.language)}>OPQ Boxes</a>
            <a href={this.docUrl('doc3.html', this.props.language)}>OPQ View</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="http://slack.com/openpowerquality" target="_blank" rel="noreferrer noopener">Slack</a>
            <a href="https://twitter.com/opquality" target="_blank" rel="noreferrer noopener">Twitter</a>
          </div>
          <div>
            <h5>Development</h5>
            <a href={this.props.config.baseUrl + 'blog'}>News</a>
            <a href="https://github.com/openpowerquality">GitHub</a>
            <a href="https://github.com/openpowerquality/opq/projects/1">Project Board</a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
