// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './ArticlesPopulaire.css';
import { Button, Card } from 'react-bootstrap';
import { IoMdThumbsUp } from 'react-icons/io';

class ArticlesPopulaire extends React.Component {
  constructor() {
    super();

    this.state = {
      ArticlesPopulaire: [],
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/articles/search/popular").then((data) => {
      this.setState({
        ArticlesPopulaire: data.data,
      })
    })
  }

  render() {
    return (
      <main className="categories-main">
        <h2 className="categories-main_title">L'incontournable <IoMdThumbsUp className="action-icons" /></h2>
        <div className="categories-container">
          <div className="categorie_populaire">
            <Card>
              <div className="categorie">
                <Card.Img variant="top" alt="categorie" src={this.state.ArticlesPopulaire.photo} />
                <Card.Body>
                  <Card.Title className="article-title">
                    <Link to={{ pathname: "/articles/" + this.state.ArticlesPopulaire.id }} className="details-categorie">{this.state.ArticlesPopulaire.name}</Link>
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

export default ArticlesPopulaire;