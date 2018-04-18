/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

class ContactUs extends React.Component {
  render() {
    let language = this.props.language || '';
    const supportLinks = [
      {
        content: `Learn more using the [documentation on this site.](${docUrl(
          'doc1.html',
          language
        )})`,
        title: 'Browse Docs',
      },
      {
        content: 'Ask questions about the documentation and project',
        title: 'Join the community',
      },
      {
        content: "Find out what's new with this project",
        title: 'Stay up to date',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Contact Us</h2>
            </header>
            <p>For more information and to get involved with Open Power Quality, please contact:</p>
            <p>Philip Johnson<br/>
               Professor, Department of Information and Computer Sciences<br/>
               University of Hawaii, Honolulu, HI, USA<br/>
               johnson@hawaii.edu</p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = ContactUs;
