// Modules //
import React from 'react';

// Style //
import './Footer.css';
import Insta from './insta.png';
import { Navbar, Nav } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <div className="foot">
      <Navbar className="Nav-Footer">
        <div className="footer">
          <p className="footer-link">A Propos</p>
          <p className="footer-link">Commandes</p>
          <p className="footer-link">Nous Contacter</p>
        </div>
        <div className="footer-insta">
          <img className="footer_insta" src={Insta} alt="instagram" />
        </div>
      </Navbar>
      </div>
    );
  }
}

export default Footer;
