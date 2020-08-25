// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './ExpeditionsModif.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

class ExpeditionsModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modeID: window.location.href.split("/")[6],
      nameValue: "",
      prixValue: "",
      descValue: "",
      estimValue: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/expeditions/" + this.state.modeID).then((res) => {
      this.setState({
        nameValue: res.data.expeditions.nom,
        prixValue: res.data.expeditions.prix,
        descValue: res.data.expeditions.description,
        estimValue: res.data.expeditions.estimations,
      })
    })
  }

  sendData() {
    const data = {
      params: {
        format: this.state.formatValue,
        prix: this.state.prixValue,
        stocks: this.state.stockValue,
      }
    }

    axios.post("http://127.0.0.1:8000/detail/update/" + this.state.detailsID, data).then((res) => {
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

    if (e.target.className === "input-nom") {
      this.setState({ nameValue: value })
    } else if (e.target.className === "input-prix") {
      this.setState({ prixValue: value })
    } else if (e.target.className === "input-desc") {
      this.setState({ descValue: value })
    } else if (e.target.className === "input-estim") {
      this.setState({ estimValue: value })
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
                    <h3 className="admin-categories_title">Modifications</h3>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Nom: </label>
                      <input className="input-nom" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Prix: </label>
                      <input className="input-desc" onChange={this.handleInputChange} value={this.state.descValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Delai estime: </label>
                      <input className="input-estim" onChange={this.handleInputChange} value={this.state.estimValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Prix: </label>
                      <input className="input-estim" onChange={this.handleInputChange} value={this.state.prixValue} type="text" />
                    </div>
                    <br /><button className="admin-button" onClick={this.sendData}>Modifier</button>
                  </div>
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

export default ExpeditionsModif;
