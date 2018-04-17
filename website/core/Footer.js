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
              <img src={this.props.config.baseUrl + this.props.config.footerIcon} alt={this.props.config.title} width="66" height="58"/>
            )}
          </a>
          <div>
            <h5>Documentation Quick Links</h5>
            <a href={this.docUrl('intro-opq.html')}>Overview</a>
            <a href={this.docUrl('userguide-hardware.html')}>OPQ Box User Guide</a>
            <a href={this.docUrl('userguide-software.html')}>OPQ View User Guide</a>
            <a href={this.docUrl('agile-power-monitoring.html')}>Agile Power Monitoring for UH</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://openpowerquality.slack.com/" target="_blank" rel="noreferrer noopener">Slack</a>
            <a href="https://twitter.com/opquality" target="_blank" rel="noreferrer noopener">Twitter</a>
            <a href={this.props.config.baseUrl + 'blog'}>News</a>
            <a href="http://emilia.ics.hawaii.edu">Emilia (public OPQ View)</a>
          </div>
          <div>
            <h5>Development</h5>
            <a href="https://github.com/openpowerquality">GitHub</a>
            <a href="https://github.com/openpowerquality/opq/projects/1">Project Board</a>
            <a href={this.docUrl('opportunities.html')}>Opportunities</a>
            <a href="http://www.citeulike.org/group/3370/tag/powerquality">Publications</a>

          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
