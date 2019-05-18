/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src}/>
  </div>
);

const ProjectTitle = props => (
  <div>
    <h2 style={{fontFamily: 'Gugi'}} className="projectTitle">{siteConfig.title}</h2>
    <h2> {siteConfig.tagline}</h2>
  </div>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle/>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout}/>
  </Container>
);

const BlockNoPadding = props => (
  <Container
    padding={[]}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout}/>
  </Container>
);

const Features = props => (
  <div>
    <Block background="light" layout="threeColumn">
      {[
        {
          content: 'Our custom hardware, OPQ Box, samples the power quality waveform 12,000 times a second, computing frequency, voltage, and total harmonic distortion. Once a second, OPQ Box uploads low fidelity summaries of this data to OPQ Cloud, our cloud-based software system.',
          image: imgUrl('opqbox-feb-2019-square-closed.jpg'),
          imageAlign: 'top',
          title: 'OPQ Box: Power Quality Monitoring',
        },
        {
          content: 'Our cloud-based software services include "middleware" called Mauka and Makai that process the PQ data sent from OPQ Box. When anomalies are detected, high fidelity waveform data can be requested from one or more OPQ Boxes to improve analysis and interpretation.',
          image: imgUrl('middleware.png'),
          imageAlign: 'top',
          title: 'OPQ Cloud: Dynamic Middleware',
        },
        {
          content: 'Our cloud-based software services also include OPQ View, a user interface providing configuration, visualization, and other analytics that enable users to better understand and control power quality both locally and across the grid.',
          image: imgUrl('opqview-landing.png'),
          imageAlign: 'top',
          title: 'OPQ Cloud: User Interface Services',
        },
      ]}
    </Block>
  </div>
);

const OPQFeatures = props => (
  <div className="productShowcaseSection paddingBottom">
    <h2 style={{ fontWeight: "bold" }}>Features</h2>
    <BlockNoPadding layout="threeColumn">
      {[
        {
          title: 'Easy installation',
          content: 'Just plug in an OPQ Box to any wall outlet within reach of a WiFi network, then use your browser to configure your box and tell it where to send the data. Your power quality data will be uploaded to OPQ Cloud and available for analysis immediately.',
        },
        {
          title: 'Low and high fidelity data',
          content: 'Once a second, each OPQ Box sends a summary of the maximum and minimum frequency, voltage, and total harmonic distortion to OPQ Cloud. If the OPQ Cloud middleware needs higher fidelity data, it can request high fidelity data for any interval during the last ten minutes from any OPQ Box.',
        },
        {
          title: 'Local and Grid-level Anomalies',
          content: 'When the same anomaly is reported by multiple OPQ Boxes at the same time, OPQ Cloud classifies it as grid-level. If there aren\'t multiple reports, then it\'s presumed to be local.',
        },
        {
          title: 'Configurable alerts',
          content: 'OPQ gathers data on even minor power quality perturbations, but not all of them are actionable or meaningful to users. We are designing a configurable alert mechanism so that users are notified only when events of interest to them occur.',
        },
        {
          title: 'Contextual data',
          content: 'Making power quality data useful often involves understanding the context surrounding an anomaly. Our design enables OPQ analyses to make use of weather and other contextual data to improve understanding and prediction.',
        },
        {
          title: 'Extensible and Interoperable',
          content: 'Our services include a plug-in architecture to simplify the addition of new analyses. In addition, we provide a data model specification so that other services can manipulate an OPQ MongoDB database directly if desired.',
        },
      ]}
    </BlockNoPadding>
  </div>
);

const Testimonials = props => (
  <div className="productShowcaseSection paddingBottom lightBackground">
    <h2 style={{ fontWeight: "bold", paddingTop: "25px", paddingBottom: "25px" }}>User Communities</h2>
    <div className="testimonials">
      <Container padding={[]}>
        <GridBlock align="center"
                   contents={[
                     {
                       content:
                         "*OPQ provides useful infrastructure to support research on the impact of renewable energy on the smart grid.*",
                       image: `${siteConfig.baseUrl}docs/assets/people/kuh.jpg`,
                       imageAlign: "top",
                       title: '<div style="line-height: 20px">Anthony Kuh <br/><font size="2">Professor, UH</font><br/><font size="2">Renewable Energy Researcher</font></div>'
                     },
                     {
                       content:
                         "*The OPQ Agile Power Monitoring project will help us better understand the UH microgrid.*",
                       image: `${siteConfig.baseUrl}docs/assets/people/topping.png`,
                       imageAlign: "top",
                       title: '<div style="line-height: 20px">Miles Topping <br/><font size="2">Director of Energy Management, UH</font><br/><font size="2">Microgrid Manager</font></div>'
                     },
                     {
                       content:
                         "*Working on OPQ enables me to learn about hardware, software, data science, software engineering, and sustainability.*",
                       image: `${siteConfig.baseUrl}docs/assets/people/foltz.jpg`,
                       imageAlign: "top",
                       title: '<div style="line-height: 20px">Kaila Foltz<br/><font size="2">Student, UH</font><br/><font size="2">Undergraduate CS Major</font></div>'
                     }
                   ]}
                   layout="threeColumn"
        />
      </Container>
    </div>
  </div>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <div>
        <HomeSplash language={language}/>
        <div className="mainContainer">
          <Features/>
          <OPQFeatures/>
          <Testimonials/>
        </div>
      </div>
    );
  }
}

module.exports = Index;
