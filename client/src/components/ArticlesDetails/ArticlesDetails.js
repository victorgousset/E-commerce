// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './ArticlesDetails.css';
import { Table, Container, Col, Row } from 'react-bootstrap';

class ArticlesDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesDetails: [],
      articlesCate: [],
      allFormat: []
    }
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/articles/" + window.location.href.split("/")[4]).then((data) => {
      console.log(data.data.article);
      
      this.setState({ articlesDetails: data.data.article })

      axios.get("http://127.0.0.1:8000/categories/" + data.data.article.categories_id).then((data) => {
        this.setState({ articlesCate: data.data.categorie })
      })
    })

    axios.get("http://127.0.0.1:8000/detail/articles/" + window.location.href.split("/")[4]).then((data) => {
      this.setState({ allFormat: data.data.details })
    })
  }

  addCart(e) {
    const data = {
      token: this.props.token,
      caracteristiques_produits_id: e.target.value,
      quantity: 1
    }

    axios.post("http://127.0.0.1:8000/cart/store", data).then((res) => {
      console.log(res);
      
    })
  }

  render() {
    return (
    <div>
      <main className="articlesDetails-main">
        <ul className="breadcrumb">
          <li><Link to={{ pathname: "/" }}>Accueil</Link></li>
          <li>{">"}</li>
          <li><Link to={{ pathname: "/catalogue" }}>Catalogue</Link></li>
          <li>{">"}</li>
          <li><Link to={{ pathname: "/articles/categorie/" + this.state.articlesCate.id }}>{this.state.articlesCate.nom}</Link></li>
          <li>{">"}</li>
          <li>{this.state.articlesDetails.titre}</li>
        </ul>
        <div className="article-container1">
          <div className="article_photo_div">
            <img className="article_photo" alt="produit" src={this.state.articlesDetails.photo} />
          </div>
          <div className="article_texte">
            <div className="article_trait">
              <p className="article_nom">{this.state.articlesDetails.titre}</p>
            </div>
            <center>
              <Table className="table-details" >
                <tbody>
                  <tr className="tr-details">
                    <th className="th-article">Format</th>
                    <th className="th-article">Prix</th>
                    <th className="th-article">Disponibilité</th>
                    <th className="th-article">Achat</th>
                  </tr>
                  {this.state.allFormat.map((item, i) => {
                    if (item.promo > 0) {
                      return (
                        <tr key={i} className="tr-key-details">
                          <td className="td-details">{item.format}</td>
                          <td className="td-details">{item.prix } €   - {item.promo}%</td>
                          <td className="td-details">{item.stocks}</td>
                          <td className="td-details">
                            <button className="button-panier" disabled={(item.stocks > 0) ? false : true} style={{cursor: (item.stocks > 0) ? "pointer" : "not-allowed" }} value={item.id} onClick={this.addCart}>Ajouter au Panier</button>
                          </td>
                        </tr>
                      )
                    } else {

                      return (
                        <tr key={i} className="tr-key-details">
                        <td className="td-details">{item.format}</td>
                        <td className="td-details">{item.prix} €</td>
                        <td className="td-details">{item.stocks}</td>
                        <td className="td-details">
                          <button className="button-panier" disabled={(item.stocks > 0) ? false : true} style={{cursor: (item.stocks > 0) ? "pointer" : "not-allowed" }} value={item.id} onClick={this.addCart}>Ajouter au Panier</button>
                        </td>
                      </tr>
                    )
                  }
                  })}
                </tbody>
              </Table>
              <div className="article-desc_full">
                <h3 className="details-title-second">Description</h3>
                <p className="article_desc">{this.state.articlesDetails.description}</p>
              </div>
            </center>
          </div>
        </div>
        </main>
        <div className="article-compo-propri">
          <Container>
            <Row>
              <Col>
                <div className="article-text">
                  <h3 className="details-title-barre">Propriétés</h3>
                  <p className="article_desc">{this.state.articlesDetails.proprietes}</p>
                </div>
              </Col>
              <Col>
                <div className="article-text_compo">
                  <h3 className="details-title-barre">Composition</h3>
                  <p className="article_desc">{this.state.articlesDetails.compo}</p>
                </div>
              </Col>
              <Col>
                <div className="article-text_compo">
                  <h3 className="details-title-barre">Exemple d'utilisation</h3>
                  <p className="article_desc">{this.state.articlesDetails.utilisation}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      
      </div>
    );
  }
}

export default ArticlesDetails;