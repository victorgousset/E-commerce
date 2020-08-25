import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './RecapCommande.css';
import { Button, Card, Image } from 'react-bootstrap';
import Photo from './photo.jpg';

class RecapCommande extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    axios.post("http://127.0.0.1:8000/cart/deletePanier/" + localStorage.token).then((res) => {
      setInterval(() => { window.location.assign("/") }, 3000)
    })
  }

  render() {
    return (
      <main>
        <h2 className="recap-main_title">Merci pour votre Commande !</h2>
        <Image src={Photo} className="photo-main" fluid />
        <p className="recap-p"> Elle vous sera livrée au plus vite, merci de nous accorder votre confiance.</p>
      </main>
    );
  }
}

export default RecapCommande;
