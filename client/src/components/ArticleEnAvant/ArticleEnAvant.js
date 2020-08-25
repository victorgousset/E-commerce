// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './ArticleEnAvant.css';
import { Button, Card } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';

class ArticleEnAvant extends React.Component {
  constructor() {
    super();

    this.state = {
      ArticleEnAvant: [],
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/articles/devant").then((data) => {
        console.log(data.data.article[0].photo);
        console.log(data.data.article[0].titre);
        
      this.setState({
        ArticleEnAvant: data.data.article[0],
      })
    })
  }

  render() {
    return (
      <main className="categories-main">
        <h2 className="categories-main_title">Notre Coup de <AiFillHeart className="action-icons" /></h2>
        <div className="categories-container">
          <div className="categorie_populaire">
            <Card>
              <div className="categorie">
                <Card.Img variant="top" alt="categorie" src={this.state.ArticleEnAvant.photo} />
                <Card.Body>
                  <Card.Title className="article-title">
                    <Link to={{ pathname: "/articles/" + this.state.ArticleEnAvant.id }} className="details-categorie">{this.state.ArticleEnAvant.titre}</Link>
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

export default ArticleEnAvant;