// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './CategoriesPopulaire.css';
import { Button, Card } from 'react-bootstrap';
import { IoMdAirplane } from 'react-icons/io';

class CategoriesPopulaire extends React.Component {
  constructor() {
    super();

    this.state = {
      CategoriesPopulaire: [],
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/categories/search/popular").then(({data}) => {
        this.setState({
            CategoriesPopulaire: data,
        })
    })
  }

  render() {
    return (
      <main className="categories-main">
       <h2 className="categories-main_title">Nos Remèdes Indispensables <IoMdAirplane className="action-icons" /></h2>
       <div className="categories-container">
            <div className="categorie_populaire">
                <Card>
                    <div className="categorie categorie-bis">
                        <Card.Img variant="top" alt="categorie" src={this.state.CategoriesPopulaire.photo} />
                        <Card.Body>
                            <Card.Title className="categorie-title">
                                <Link to={{ pathname: "/articles/categorie/" + this.state.CategoriesPopulaire.id }} className="details-categorie">{this.state.CategoriesPopulaire.name}</Link>
                            </Card.Title>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>
      </main>
    );
  }
}

export default CategoriesPopulaire;
