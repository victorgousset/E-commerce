// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './FormatModif.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

class FormatModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsID: window.location.href.split("/")[6],
      articleID: "",
      producteurID: "",
      formatValue: "",
      prixValue: "",
      stockValue: "",
      promoValue: "",
      productName: "",
      receptionDate: "",
      quantityValue: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/detail/" + this.state.detailsID).then((res) => {
      this.setState({
        articleID: res.data.details.articles_id,
        producteurID: res.data.articles.producteurs_id,
        formatValue: res.data.details.format,
        prixValue: res.data.details.prix,
        promoValue: res.data.details.promo,
        stockValue: res.data.details.stocks,
        productName: res.data.articles.titre + " - " + res.data.details.format,
      })
    })
  }

  sendData() {
    const data = {
      params: {
        format: this.state.formatValue,
        prix: this.state.prixValue,
        stocks: this.state.stockValue,
        promo: this.state.promoValue,
      }
    }

    axios.post("http://127.0.0.1:8000/detail/update/" + this.state.detailsID, data).then((res) => {
      // console.log(res.data);
      this.props.history.push('/admin/articles/modif/' + this.state.articleID)
    })
  }

  sendOrder() {
    const data = {
      caracteristiques_produits_id: this.state.detailsID,
      producteurs_id: this.state.producteurID,
      quantity: this.state.quantityValue,
      reception_date: this.state.receptionDate + " " + "00:00:00",
    }

    axios.post("http://127.0.0.1:8000/commandeProd/store", data).then((res) => {
      this.props.history.push('/admin/commandes/producteur')
    })
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-format") {
      this.setState({ formatValue: value })
    } else if (e.target.className === "input-prix") {
      this.setState({ prixValue: value })
    } else if (e.target.className === "input-stock") {
      this.setState({ stockValue: value })
    } else if (e.target.className === "input-date") {
      this.setState({ receptionDate: value })
    } else if (e.target.className === "input-quantity") {
      this.setState({ quantityValue: value })
    } else if (e.target.className === "input-promo") {
      value >= 100 ? this.setState({ promoValue: 99 }) : this.setState({ promoValue: value })
    } 
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div className="admin-categorie">
          <center>
            <Container>
              <Col>
                <div className="admin-categories_form">
                  <div>
                    <h3 className="admin-categories_title">Modifications des {this.state.productName} :</h3>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Format </label>
                      <input className="input-format" onChange={this.handleInputChange} value={this.state.formatValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Prix </label>
                      <input className="input-prix" onChange={this.handleInputChange} value={this.state.prixValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Stocks </label>
                      <input className="input-stock" onChange={this.handleInputChange} value={this.state.stockValue} type="text" />
                    </div>
                    <br /><button className="admin-button" onClick={this.sendData}>Modifier</button>
                  </div>
                  <div>
                    <h3 className="admin-categories_title">Commander des {this.state.productName} :</h3>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Date d'arrivée </label>
                      <input className="input-date" onChange={this.handleInputChange} value={this.state.receptionDate} type="date" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Quantité </label>
                      <input className="input-quantity" onChange={this.handleInputChange} value={this.state.quantityValue} type="text" />
                    </div>
                    <br /><button className="admin-button" onClick={this.sendOrder}>Commander</button>
                  </div>

                  <div className="div_ajout_nom">
                    <label className="admin-label">Promo </label>
                    <input className="input-promo" onChange={this.handleInputChange} value={this.state.promoValue} type="number" min="0" max="100" />
                  </div>
                  <br /><button className="admin-button" onClick={this.sendData}>Modifier</button>
                </div>
              </Col>
            </Container>
          </center>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default FormatModif;
