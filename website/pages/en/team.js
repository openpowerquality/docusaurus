const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function imgUrl(img) {
  return siteConfig.baseUrl + 'docs/assets/people/' + img;
}

const TeamCard = props => (
  <Container className='smallPadding'>
    <div style={{ width: '25%', float: 'top' }}>
      <img className="roundedImageCorner" src={props.person.img_src} width="100px"/>
    </div>
    <div style={{ width: '75%', float: 'right' }}>
      <h4 style={{ padding: 0 }}>{props.person.name}</h4>
      <p>{props.person.description}</p>
      <em>{props.person.time}</em>
    </div>
  </Container>
);

class Team extends React.Component {
  render() {
    const advisoryBoard = [
      {
        title: 'Justin Carland',
        image: imgUrl('carland.jpg'),
        content: 'Graduate Student, Department of Mechanical Engineering, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Joseph Dane',
        image: imgUrl('dane.jpg'),
        content: 'Attorney, Clay Chapman Iwamura Pulice and Nervell',
        imageAlign: 'left'
      },
      {
        title: 'David Garmire',
        image: imgUrl('garmire.png'),
        content: 'Associate Professor, Department of Electrical Engineering, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Anthony Kuh',
        image: imgUrl('kuh.jpg'),
        content: 'Professor, Department of Electrical Engineering, University of Hawaii',
        imageAlign: 'left'
      },

    ];
    const developmentTeam = [
      {
        title: 'David Aghalarpour',
        image: imgUrl('aghalarpour.jpg'),
        content: 'Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Anthony Christe',
        image: imgUrl('christe.jpg'),
        content: 'Graduate Student, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Charles Dickens',
        image: imgUrl('dickens.png'),
        content: 'Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Kaila Foltz',
        image: imgUrl('foltz.jpg'),
        content: 'Undergraduate, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Il Ung Jeong',
        image: imgUrl('jeong.png'),
        content: 'Undergraduate, Department of Information and Information and Computer Sciences',
        imageAlign: 'left'
      },
      {
        title: 'Philip Johnson',
        image: imgUrl('johnson.jpg'),
        content: 'Professor, Information and Computer Sciences',
        imageAlign: 'left'
      },
      {
        title: 'Camelia Lai',
        image: imgUrl('lai.png'),
        content: 'Student, Department of Information and Computer Sciences',
        imageAlign: 'left'
      },
      {
        title: 'Sergey Negrashov',
        image: imgUrl('negrashov.jpg'),
        content: 'Graduate Student, Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },

    ];
    const alumni = [
      {
        title: 'David Badke',
        image: imgUrl('badke.jpg'),
        content: 'Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Evan Hataishi',
        image: imgUrl('hataishi.jpg'),
        content: 'Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Kea Uehara',
        image: imgUrl('uehara.jpg'),
        content: 'Department of Information and Computer Sciences, University of Hawaii',
        imageAlign: 'left'
      },
      {
        title: 'Gabriel Vega',
        image: imgUrl('vega.png'),
        content: 'Graduate Student, Department of Electrical Engineering, Stanford University',
        imageAlign: 'left'
      },
    ];
    return (
      <Container>
        <h2 style={{fontWeight: "500"}}>Development Team</h2>
        <div className="roundedImageCorner team">
          <GridBlock align="left" contents={developmentTeam} layout="twoColumn"/>
        </div>
        <h2 style={{fontWeight: "500"}}>Advisory Board</h2>
        <div className="roundedImageCorner team">
          <GridBlock align="left" contents={advisoryBoard} layout="twoColumn"/>
        </div>
        <h2 style={{fontWeight: "500"}}>Alumni</h2>
        <div className="roundedImageCorner team">
          <GridBlock align="left" contents={alumni} layout="twoColumn"/>
        </div>
      </Container>
    )
  }
}

module.exports = Team;
