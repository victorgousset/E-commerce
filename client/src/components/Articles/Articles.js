// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import $ from "jquery";

// Style //
import './Articles.css';
import Photo from './articles.jpg';
import { Button, Card, Image, Row, Carousel } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

class Articles extends React.Component {
  constructor() {
    super();

    this.state = {
      sortedBy: "vues",
      allArticles: [],
      categorie: "",
    }
    this.sortArticlesDescending = this.sortArticlesDescending.bind(this);
    this.sortArticlesAscending = this.sortArticlesAscending.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    const all = "http://127.0.0.1:8000/articles";
    const byCate = "http://127.0.0.1:8000/articles/categorie/" + window.location.href.split("/")[5];
    const url = (window.location.href.split("/")[4] !== "categorie") ? all : byCate

    axios.get(url).then((data) => {
      const copy = this.state.allArticles.slice()

      data.data.articles.map((item, i) => {
        const getLowest = [];

        item.caracteristiques_produits.map((item) => {
          getLowest.push(parseInt(item.prix))
        })

        item["hasMany"] = (getLowest.length > 1) ? true : false;
        item["basePrice"] = Math.min(...getLowest);
        copy.push(item)
      })

      this.setState({ allArticles: copy })
    })

    if (url === byCate) {
      axios.get("http://127.0.0.1:8000/categories/" + window.location.href.split("/")[5]).then((data) => {
        this.setState({ categorie: data.data.categorie.nom })

      })
    }
  }

  sortArticlesDescending(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  sortArticlesAscending(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  handleSelectChange(e) {
    this.setState({ sortedBy: e.target.value })
  }

  render() {
    let paginatedItems = [];
    const finalItem = [];
    for (const [i, item] of this.state.allArticles.entries()) {
      paginatedItems.push(
        <div className="articles">
          <Card>
            <div className="article">
              <Card.Img variant="top" className="produit-img" alt="produit" src={item.photo} />
              <Card.Body>
                <Card.Title className="articles-title">{item.titre}</Card.Title>
                <Card.Text className="articles-price">{(item.hasMany === true) ? "A partir de " + item.basePrice + " €" : item.basePrice + " €" }</Card.Text>
                <Link to={{ pathname: "/articles/" + item.id }} className="details">{"Details >>"}</Link>
              </Card.Body>
            </div>
          </Card>
        </div>
        )
        
        if (paginatedItems.length === 5)
        {
          finalItem.push(paginatedItems);
          paginatedItems = [];
        }
      };
      finalItem.push(paginatedItems);
      paginatedItems = [];
    
    if (this.state.sortedBy === "vues") {
      this.sortArticlesDescending(this.state.allArticles, "vues");
    } else if (this.state.sortedBy === "decroissant") {
      this.sortArticlesDescending(this.state.allArticles, "basePrice");
    } else if (this.state.sortedBy === "croissant") {
      this.sortArticlesAscending(this.state.allArticles, "basePrice");
    }
    return (
      <main className="articles-main">
        <div className="articles-main_photo">
          <h2 className="article-main_title">{(window.location.href.split("/")[4] !== "categorie") ? "Tous nos produits" : this.state.categorie}</h2>
          <Image src={ Photo } className="photo-main" fluid />
        </div>
        <ul className="breadcrumb">
          <li><Link to={{ pathname: "/" }}>Accueil</Link></li>
          <li>{">"}</li>
          <li><Link to={{ pathname: "/catalogue" }}>Catalogue</Link></li>
          <li>{(window.location.href.split("/")[4] !== "categorie") ? null : ">"}</li>
          <li>{(window.location.href.split("/")[4] !== "categorie") ? null : this.state.categorie}</li>
        </ul>
        <Fade bottom cascade>
        <div className="produits-contenu">
          <div className="sortby-container">
            <label className="sortby-label">Trier par </label>
            <br />
            <select className="sortby-select" value={this.state.sortedBy} onChange={this.handleSelectChange}>
              <option value="vues">Popularite</option>
              <option value="decroissant">Prix croissant</option>
              <option value="croissant">Prix decroissant</option>
            </select>
          </div>
          <div className="articles-container">
          <Carousel className="produits-carousel">
          {finalItem.map((value, index) => {
        return (
          <Carousel.Item key={index}>
          {value}
          </Carousel.Item>
          )
      })}
          </Carousel>
        </div>
        </div>
        </Fade>
      </main>
    );
  }
}

export default Articles;
