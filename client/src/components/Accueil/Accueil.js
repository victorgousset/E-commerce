// Modules //
import React from 'react';
import axios from 'axios';
//import { Slide } from 'react-slideshow-image'
import CategoriesPopulaire from '../CategoriesPopulaire/CategoriesPopulaire'
import ArticlesPopulaire from '../ArticlesPopulaire/ArticlesPopulaire'
import ArticleEnAvant from '../ArticleEnAvant/ArticleEnAvant'
import Slide from '../Slide/Slide'

// Style //
import './Accueil.css';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import Engagement from './image/engagement.jpg';
import Engag from './image/engagement-1.jpg';


class Accueil extends React.Component {

  render() {
    return (
      <div>
        <div className="carousel-main">
          <Slide />
        </div>
        <Fade bottom cascade>
        <div className="accueil">
          <div className="accueil-article">
            <ArticlesPopulaire />
          </div>
          <div className="accueil-avant">
            <ArticleEnAvant />
          </div>
          <div className="accueil-categorie">
            <CategoriesPopulaire />
          </div>
        </div>
        <div className="acceuil-bienvenue">
          <h2 className="bienvenue-title">Bienvenue chez D.Y.Med</h2>
          <div className="bienvenue-texte">Notre objectif ? Vous faire découvrir des médecines venues d'ailleurs et encore méconnues en France. Nous sélectionnons pour vous les meilleures plantes médicinales, aux bienfaits avérés. Prendre soin de soi n'a jamais été aussi simple !</div>
        </div>
        <div className="video">
              {/* <iframe width="1280" height="500" src="https://www.youtube.com/embed/3nILCoLbyXg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              <iframe src="https://www.youtube.com/embed/3nILCoLbyXg?vq=hd1080&rel=0&fs=0"  width="1280" height="720" frameborder="0"></iframe>
        </div>
        <div className="accueil-engagements">
          <img className="photo-engag" src={Engag}></img>
          <img className="photo-engagements" src={Engagement}></img>
        </div>
        
        </Fade>
      </div>
    );
  }
}

export default Accueil;
