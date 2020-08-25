// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './Payment.css';
import { Button, Card, Image, Col, Row, Form } from 'react-bootstrap';
import Photo from './photo.jpg';

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      checked: false,
      redirect: false,
      totalLivraison: 0,
      totalArticles: 0,
      commandesID: [],
      allArticles: [],
      cvvValue: "",
      codeValue: "",
      dateValue: "",
      titulaireValue: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);

  }

  componentDidMount() {
    if (this.props.location.state.data !== undefined) {
      const data = {
        country: this.props.location.state.data.pays,
        expedition: this.props.location.state.data.expedition,
        transporteur: this.props.location.state.data.transporteur,
        user: (this.props.isUser === true || this.props.isAdmin === true) ? true : false,
      }

      axios.post("http://127.0.0.1:8000/cart/shipping/" + localStorage.token, data).then((res) => {
        this.setState({ totalLivraison: res.data.price })
      })

      axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token, data).then((res) => {
        if (res.data.user !== undefined) {
          this.setState({ email: res.data.user.email })
        } else {
          this.setState({ email: this.props.location.state.data.email })
        }
      })
    }

    axios.get("http://127.0.0.1:8000/carte_bleues/user/" + localStorage.token).then((res) => {
      if (res.data.carte) {
        this.setState({
          codeValue: res.data.carte.numero,
          dateValue: res.data.carte.date,
          titulaireValue: res.data.carte.titulaire,
        })
      }
    })

    axios.get("http://127.0.0.1:8000/cart/" + localStorage.token).then((res) => {
      var total = 0;

      res.data.produits.map((item, i) => {
        // total += item.caracteristiques_produits.prix * item.quantity
        total += pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo) * item.quantity
      })

      this.setState({
        allArticles: res.data.produits,
        totalArticles: total,
      })
    })
  }

  createOrder(event) {
    event.preventDefault();
    const copy = this.state.commandesID.slice();

    if (this.state.codeValue.length !== 16 || !/^\d+$/.test(this.state.codeValue)) {
      alert("Veuillez saisir un code valide.")
    } else if (this.state.dateValue.replace(/\//g, '').length !== 4 || !/^\d+$/.test(this.state.dateValue.replace(/\//g, '')) || this.state.dateValue.split("/").length !== 2) {
      alert("Veuillez saisir une date d'expiration valide.")
    } else if (this.state.titulaireValue.split(" ").length !== 2) {
      alert("Veuillez saisir le nom et le prenom du titulaire.")
    } else if (this.state.cvvValue.length !== 3 || !/^\d+$/.test(this.state.cvvValue)) {
      alert("Veuillez saisir un CVV valide.")
    } else {
      const dataCarte = {
        token: localStorage.token,
        numero: this.state.codeValue,
        date: this.state.dateValue,
        titulaire: this.state.titulaireValue,
      }

      if (this.state.checked === true) {
        axios.post("http://127.0.0.1:8000/carte_bleues/store", dataCarte).then((res) => {
        })
      }

      this.state.allArticles.map((item, i) => {
        const data = {
          caracteristiques_produits_id: item.caracteristiques_produits_id,
          expeditions_id: this.props.location.state.data.expedition,
          email: this.state.email,
          status: "En attente de confirmation",
          reception_at: null,
          prix_port: (this.state.totalLivraison === "gratuit") ? 0 : this.state.totalLivraison,
          prix_articles: this.state.totalArticles,
          quantity: item.quantity,
        }

        axios.post("http://127.0.0.1:8000/commandes_clients/store", data).then((res) => {
          copy.push(res.data.id)
        })
      })
      this.setState({
        redirect: true,
        commandesID: copy,
      })
    }
  }

  handleCheckBox() {
    this.setState({ checked: (this.state.checked === true) ? false : true })
  }

  handleChange(e) {
    const value = e.target.value;

    if (e.target.className === "code form-control") {
      this.setState({ codeValue: value })
    } else if (e.target.className === "date form-control") {
      this.setState({ dateValue: value })
    } else if (e.target.className === "name form-control") {
      this.setState({ titulaireValue: value })
    } else if (e.target.className === "crypto form-control") {
      this.setState({ cvvValue: value })
    }
  }

  handleCheckBox() {
    this.setState({ checked: (this.state.checked === true) ? false : true })
  }

  handleChange(e) {
    const value = e.target.value;

    if (e.target.className === "code form-control") {
      this.setState({ codeValue: value })
    } else if (e.target.className === "date form-control") {
      this.setState({ dateValue: value })
    } else if (e.target.className === "name form-control") {
      this.setState({ titulaireValue: value })
    } else if (e.target.className === "crypto form-control") {
      this.setState({ cvvValue: value })
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: "/panier/commande/recap" }} />
    } else {
      if (this.props.location.state === undefined) {
        return (
          <h1 className="page_expire">PAGE EXPIRÉE</h1>
        );
      } else {
        if (this.props.isUser === true || this.props.isAdmin === true) {
          return (
            <div>
              <div className="articles-main_photo">
                <h3 className="coord-title">Coordonnées Bancaires</h3>
                <Image src={Photo} className="photo-main" fluid />
              </div>
              <Row>
                <Col xs={1}></Col>
                <Col xs={5} className="form_paiement">
                  <form>
                    <Row>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">16 Chiffres</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.codeValue} className="code" type="text" placeholder="16 chiffres au recto de la carte" />
                      </Col>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">Date d'expiration</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.dateValue} className="date" type="text" placeholder="MM/YY" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">Nom du titulaire</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.titulaireValue} className="name" type="text" placeholder="Nom et prénom sur la carte bancaire" />
                      </Col>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">Cryptogramme</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.cvvValue} className="crypto" type="text" placeholder="3 chiffres au verso de la carte" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <button className="coord-bouton-banc" onClick={this.createOrder}>Valider</button>
                      </Col>
                      <Col className="each-input-coord-banc">
                        <div className="payement-enrengistre">
                          <input type="checkbox" className="save-adresse" onClick={this.handleCheckBox} />
                          <label for="save-adresse">Enregistrer vos coordonnées bancaires</label>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </Col>
                <Col xs={5}>
                  <Row>
                    <Col>
                      <Card className="payement-panier">
                        <Card className="card_resume">
                          <Card.Body>
                            <Card.Title className="payement-panier-titre">Résumé de la commande</Card.Title>
                            <Card.Text>
                              <ul style={{ listStyle: 'none' }}>
                                {
                                  this.state.allArticles.map((item, i) => {
                                    return (
                                      <li>
                                        <div className="payement-list" style={{ display: 'flex' }}>
                                          <Image className="payement-photo" src={item.caracteristiques_produits.articles.photo} />
                                          <div className="payement-panier-total">
                                            <p className="payement-nom">{item.caracteristiques_produits.articles.titre} - {item.caracteristiques_produits.format}</p>
                                            <p className="payement-quantite">x{item.quantity}</p>
                                            <p className="payement-prix">{pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo)} €</p>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </Card.Text>
                            <div className="payement-total">
                              <Card.Title className="title-fdp">Frais de port: {(this.state.totalLivraison === "gratuit") ? "Offerts" : this.state.totalLivraison + " €"}</Card.Title>
                              <Card.Title className="title-prix">Prix articles: {this.state.totalArticles} €</Card.Title>
                              <Card.Title className="title-total">Total: {(this.state.totalLivraison === "gratuit") ? this.state.totalArticles + 0 : this.state.totalArticles + this.state.totalLivraison} €</Card.Title>
                            </div>
                          </Card.Body>
                        </Card>
                      </Card>
                    </Col>
                    <Col></Col>
                  </Row>
                </Col>
              </Row>
            </div>
          );
        } else {
          return (
            <div>
              <div className="articles-main_photo">
                <h3 className="coord-title">Coordonnées Bancaires</h3>
                <Image src={Photo} className="photo-main" fluid />
              </div>
              <Row>
                <Col xs={1}></Col>
                <Col xs={5} className="form_paiement">
                  <form>
                    <Row>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">16 Chiffres</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.codeValue} className="code" type="text" placeholder="16 chiffres au recto de la carte" />
                      </Col>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">Date d'expiration</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.dateValue} className="date" type="text" placeholder="MM/YY" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">Nom du titulaire</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.titulaireValue} className="name" type="text" placeholder="Nom et prénom sur la carte bancaire" />
                      </Col>
                      <Col className="each-input-coord-banc">
                        <Form.Label className="coord-label-banc">Cryptogramme</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.cvvValue} className="crypto" type="text" placeholder="3 chiffres au verso de la carte" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <button className="coord-bouton-banc" onClick={this.createOrder}>Valider</button>
                      </Col>
                    </Row>
                  </form>
                </Col>
                <Col xs={5}>
                  <Row>
                    <Col>
                      <Card className="payement-panier">
                        <Card className="card_resume">
                          <Card.Body>
                            <Card.Title className="payement-panier-titre">Résumé de la commande</Card.Title>
                            <Card.Text>
                              <ul style={{ listStyle: 'none' }}>
                                {
                                  this.state.allArticles.map((item, i) => {
                                    return (
                                      <li>
                                        <div className="payement-list" style={{ display: 'flex' }}>
                                          <Image className="payement-photo" src={item.caracteristiques_produits.articles.photo} />
                                          <div className="payement-panier-total">
                                            <p className="payement-nom">{item.caracteristiques_produits.articles.titre} - {item.caracteristiques_produits.format}</p>
                                            <p className="payement-quantite">x{item.quantity}</p>
                                            <p className="payement-prix">{pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo)} €</p>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </Card.Text>
                            <div className="payement-total">
                              <Card.Title className="title-fdp">Frais de port: {(this.state.totalLivraison === "gratuit") ? "Offerts" : this.state.totalLivraison + " €"}</Card.Title>
                              <Card.Title className="title-prix">Prix articles: {this.state.totalArticles} €</Card.Title>
                              <Card.Title className="title-total">Total: {(this.state.totalLivraison === "gratuit") ? this.state.totalArticles + 0 : this.state.totalArticles + this.state.totalLivraison} €</Card.Title>
                            </div>
                          </Card.Body>
                        </Card>
                      </Card>
                    </Col>
                    <Col></Col>
                  </Row>
                </Col>
              </Row>
            </div>
          );
        }
      }
    }
  }
}

export default Payment;

function pourcentage(prix, reduc) {
  let result = prix - (prix * reduc) / 100
  return result
}
