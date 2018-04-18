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

function imgUrl(img) {
  return siteConfig.baseUrl + 'docs/assets/people/' + img;
}

class Team extends React.Component {
  render() {
    let language = this.props.language || '';
    const team = [
      {
        title: 'Philip Johnson',
        image: imgUrl('johnson.jpg'),
        content: 'Professor, Information and Computer Sciences',
        imageAlign: 'top'
      },
      {
        title: 'Anthony Kuh',
        image: imgUrl('kuh.jpg'),
        content: 'Professor, Department of Electrical Engineering, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'Anthony Christe',
        image: imgUrl('christe.jpg'),
        content: 'Graduate Student, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'Sergey Negrashov',
        image: imgUrl('negrashov.jpg'),
        content: 'Graduate Student, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'Evan Hataishi',
        image: imgUrl('hataishi.jpg'),
        content: 'Undergraduate, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'Kaila Foltz',
        image: imgUrl('foltz.jpg'),
        content: 'Undergraduate, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'David Garmire',
        image: imgUrl('garmire.png'),
        content: 'Associate Professor, Department of Electrical Engineering, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'David Badke',
        image: imgUrl('badke.jpg'),
        content: 'Undergraduate, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'Joseph Dane',
        image: imgUrl('dane.jpg'),
        content: 'Attorney, Clay Chapman Iwamura Pulice and Nervell',
        imageAlign: 'top'
      },
      {
        title: 'Justin Carland',
        image: imgUrl('carland.jpg'),
        content: 'Graduate Student, Department of Mechanical Engineering, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'Kea Uehara',
        image: imgUrl('uehara.jpg'),
        content: 'Undergraduate, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      },
      {
        title: 'David Aghalarpour',
        image: imgUrl('aghalarpour.jpg'),
        content: '(Former) Undergraduate, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'top'
      }
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="productShowcaseSection">
            <h2 style={{ fontWeight: "bold", paddingTop: "25px", paddingBottom: "25px", textAlign: 'center' }}>OPQ
              Developer Team</h2>
          </div>
          <div className="roundedImageCorner team">
            <GridBlock align="center" contents={team} layout="fourColumn"/>
          </div>

        </Container>
      </div>
    );
  }
}

module.exports = Team;
