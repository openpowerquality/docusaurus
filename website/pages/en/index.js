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
          content: 'Our custom hardware samples the power quality waveform over 15,000 times a second, computing frequency, voltage, and total harmonic distortion, and uploads low fidelity data to our cloud-based middleware using WiFi.',
          image: imgUrl('opqbox_photo.jpg'),
          imageAlign: 'top',
          title: 'Power Quality Monitoring',
        },
        {
          content: 'OPQ Middleware processes the low fidelity PQ data stream. When it detects anomalies, it requests high fidelity waveform data from one or more OPQ Boxes to aid in analysis and interpretation.',
          image: imgUrl('middleware.png'),
          imageAlign: 'top',
          title: 'Dynamic Middleware',
        },
        {
          content: 'OPQ View provides visualization and configuration controls to enable users to understand and interpret power quality locally and across the grid.',
          image: imgUrl('opqview-landing.png'),
          imageAlign: 'top',
          title: 'Visualization and Notification',
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
          content: 'Just plug in an OPQ Box to any wall outlet within reach of a WiFi network, then login to OPQ View to indicate where your box is located. Your power quality data will be uploaded to the cloud and available for analysis immediately.',
        },
        {
          title: 'Low and high fidelity data',
          content: 'Each OPQ Box sends a summary of the maximum and minimum frequency, voltage, and total harmonic distortion observed each second. If the OPQ middleware needs higher fidelity data, the OPQ Box can send it.',
        },
        {
          title: 'Local and Grid-level Anomalies',
          content: 'When the same anomaly is reported by multiple OPQ Boxes at the same time, our middleware classifies it as grid-level. If there aren\'t multiple reports, then it\'s presumed to be local.',
        },
        {
          title: 'Configurable alerts',
          content: 'OPQ gathers data on even minor power quality perturbations, but not all of them are actionable or meaningful to users. We are implementing a configurable alert mechanism to inform users when important anomalies occur.',
        },
        {
          title: 'Annotations',
          content: 'Making power quality data useful often involves understanding the context surrounding an anomaly. We will support these associative analyses through an annotation facility',
        },
        {
          title: 'Extensible and Interoperable',
          content: 'Our middleware provides a plug-in architecture to simplify the addition of new analyses. In addition, we provide a data model specification so that other services can build off OPQ data.',
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
