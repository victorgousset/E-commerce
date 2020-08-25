// Modules //
import React from 'react';

// Style //
import './Slide.css';
import One from './image/one.jpg';
import Two from './image/two.jpg';
import Three from './image/three.jpg';
import { Carousel } from 'react-bootstrap';

class Slide extends React.Component {

  render() {
    return (
      <div>
          <Carousel className="accueil-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ One }
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="slide-title">Nos Produits</h3>
                <p className="slide-desc">Découvrez notre gamme de produits.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ Two }
                alt="Second slide"
              />
              <Carousel.Caption>
              <h3 className="slide-title">Le Konjac</h3>
                <p className="slide-desc">Decouvrez les bienfaits de cette plante encore méconnue.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ Three }
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 className="slide-title">Les Manuels</h3>
                <p className="slide-desc">Apprendre à faire soi-meme n'aura jamais été aussi simple.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      );
  }
}

export default Slide;