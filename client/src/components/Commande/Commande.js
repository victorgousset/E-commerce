// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './Commande.css';
import { Button, Col, Card, Image, Spinner } from 'react-bootstrap';
import Photo from './photo.jpg';

class Commande extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allWW: [],
      allModes: [],
      allTransporteurs: [],
      token: "testToken",
      nomValue: "",
      prenomValue: "",
      villeValue: "",
      addresseValue: "",
      postalValue: "",
      transportValue: "",
      expeditionValue: "",
      emailValue: "",
      countryValue: "",
      totalLivraison: "0 €",
      checked: false,
      redirect: false,
    }
    this.checkValid = this.checkValid.bind(this);
    this.coordinatesValidation = this.coordinatesValidation.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.getFraisLivraison = this.getFraisLivraison.bind(this);
    this.handleSelectTransport = this.handleSelectTransport.bind(this);
    this.handleSelectMode = this.handleSelectMode.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      this.setState({ allWW: res.data })
    })

    axios.get("http://127.0.0.1:8000/transporteurs").then((res) => {
      this.setState({ allTransporteurs: res.data.transporteurs })
    })

    axios.get("http://127.0.0.1:8000/expeditions").then((res) => {
      this.setState({ allModes: res.data.expeditions })
    })

    axios.get("http://127.0.0.1:8000/adresses/user/" + localStorage.token).then((res) => {
      if (res.data.adresse) {
        this.setState({
          nomValue: res.data.adresse.nom,
          prenomValue: res.data.adresse.prenom,
          addresseValue: res.data.adresse.adresse,
          villeValue: res.data.adresse.ville,
          countryValue: res.data.adresse.pays,
          postalValue: res.data.adresse.postal,
        })
      }
    })
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-nom coord-input") {
      this.setState({ nomValue: value })
    } else if (e.target.className === "input-prenom coord-input") {
      this.setState({ prenomValue: value })
    } else if (e.target.className === "input-address coord-input") {
      this.setState({ addresseValue: value })
    } else if (e.target.className === "input-city coord-input") {
      this.setState({ villeValue: value })
    } else if (e.target.className === "input-postal coord-input") {
      this.setState({ postalValue: value })
    } else if (e.target.className === "input-email coord-input") {
      this.setState({ emailValue: value })
    }
  }

  handleSelectChange(e) {
    this.setState({
      countryValue: e.target.value,
      totalLivraison: <Spinner animation="border" variant="success" />,
    }, () => {
      this.getFraisLivraison()
    })
  }

  handleSelectTransport(e) {
    this.setState({ transportValue: e.target.value })
  }

  handleCheckBox() {
    this.setState({ checked: (this.state.checked === true) ? false : true })
  }

  handleSelectMode(e) {
    this.setState({
      expeditionValue: e.target.value,
      totalLivraison: <Spinner animation="border" variant="success" />,
    }, () => {
      this.getFraisLivraison()
    })
  }

  getFraisLivraison() {
    const data = {
      country: this.state.countryValue,
      expedition: this.state.expeditionValue,
      transporteur: this.state.transportValue,
      user: (this.props.isUser === true || this.props.isAdmin === true) ? true : false,
    }

    axios.post("http://127.0.0.1:8000/cart/shipping/" + localStorage.token, data).then((res) => {
      this.setState({ totalLivraison: res.data.price + " €" })
    })
  }

  coordinatesValidation() {
    const data = {
      token: localStorage.token,
      nom: this.state.nomValue,
      prenom: this.state.prenomValue,
      pays: this.state.countryValue,
      adresse: this.state.addresseValue,
      ville: this.state.villeValue,
      postal: parseInt(this.state.postalValue),
      expedition: parseInt(this.state.expeditionValue),
      transporteur: this.state.transportValue,
    }

    if (this.state.nomValue === "") {
      alert("Veuillez saisir votre nom.")
    } else if (this.state.prenomValue === "") {
      alert("Veuillez saisir votre prenom.")
    } else if (this.state.addresseValue === "") {
      alert("Veuillez saisir votre adresse.")
    } else if (this.state.villeValue === "") {
      alert("Veuillez saisir votre ville.")
    } else if (this.state.postalValue === "") {
      alert("Veuillez saisir votre code postal.")
    } else if (this.state.expeditionValue === "") {
      alert("Vous devez choisir un mode de livraison.")
    } else {
      if (this.state.checked === true) {
        axios.post("http://127.0.0.1:8000/adresses/store", data).then((res) => {
          this.setState({ 
            redirect: true ,
            data: data,
          })
        })
      } else {
        this.setState({ 
          redirect: true ,
          data: data,
        })
      }
    }
  }

  checkValid() {
    const data = {
      token: localStorage.token,
      email: this.state.emailValue,
      nom: this.state.nomValue,
      prenom: this.state.prenomValue,
      pays: this.state.countryValue,
      adresse: this.state.addresseValue,
      ville: this.state.villeValue,
      postal: parseInt(this.state.postalValue),
      expedition: parseInt(this.state.expeditionValue),
      transporteur: this.state.transportValue,
    }

    if (this.state.nomValue === "") {
      alert("Veuillez saisir votre nom.")
    } else if (this.state.prenomValue === "") {
      alert("Veuillez saisir votre prenom.")
    } else if (this.state.emailValue === "") {
      alert("Veuillez saisir votre email.")
    } else if (this.state.addresseValue === "") {
      alert("Veuillez saisir votre adresse.")
    } else if (this.state.villeValue === "") {
      alert("Veuillez saisir votre ville.")
    } else if (this.state.postalValue === "") {
      alert("Veuillez saisir votre code postal.")
    } else if (this.state.expeditionValue === "") {
      alert("Vous devez choisir un mode de livraison.")
    } else {
      this.setState({ 
        redirect: true,
        data: data,
      })
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: "/panier/commande/payment", state: {data: this.state.data} }} />
    } else {
      if (this.props.isUser === true || this.props.isAdmin === true) {
        return (
          <main>
            <div className="articles-main_photo">
              <h3 className="coord-title">Mes Coordonnées</h3>
              <Image src={Photo} className="photo-main" fluid />
            </div>
            <div className="div-coord">
              <div className="coordonnees">
                <div className="each-input-coord">
                  <label className="coord-label">Nom</label>
                  <input className="input-nom coord-input" onChange={this.handleInputChange} value={this.state.nomValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Prénom</label>
                  <input className="input-prenom coord-input" onChange={this.handleInputChange} value={this.state.prenomValue} type="text" />
                </div>
                <div className="div_modif_cate each-input-coord">
                  <label className="coord-label">Pays</label>
                  <select className="coord-input" onChange={this.handleSelectChange}>
                    <option></option>
                    {this.state.allWW.map((item, i) => {
                      return (
                        <option key={i} selected={(item.name === this.state.countryValue) ? true : false} value={item.name}>{item.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Adresse</label>
                  <input className="input-address coord-input" onChange={this.handleInputChange} value={this.state.addresseValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Ville</label>
                  <input className="input-city coord-input" onChange={this.handleInputChange} value={this.state.villeValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Code Postal</label>
                  <input className="input-postal coord-input" onChange={this.handleInputChange} value={this.state.postalValue} type="text" />
                </div>
                <div>
                  <input type="checkbox" className="save-adresse" onClick={this.handleCheckBox} />
                  <label for="save-adresse">Enregistrer vos coordonnées</label>
                </div>
              </div>
              <div className="envoi-div">
                <div className="select_transport">
                  <label className="envoi-label">Transporteurs </label>
                  <select className="select-envoi" onChange={this.handleSelectTransport}>
                    <option></option>
                    {this.state.allTransporteurs.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>{item.nom}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="select_mode">
                  <label className="envoi-label">Mode d'expédition </label>
                  <select className="select-envoi" onChange={this.handleSelectMode}>
                    <option></option>
                    {this.state.allModes.map((item, i) => {
                      if (item.transporteurs_id === parseInt(this.state.transportValue)) {
                        return (
                          <option key={i} value={item.id}>{item.nom}</option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="envoi-total">
              <p className="envoi-text">Prix Total de Livraison:</p>
              <p className="envoi-prix">{(this.state.totalLivraison === "gratuit €") ? "Offerts" : this.state.totalLivraison}</p>
              <button className="coord-bouton" onClick={this.coordinatesValidation}>Valider</button>
            </div>
          </main>
        );
      } else {
        return (
          <main>
            <div className="articles-main_photo">
              <h3 className="coord-title">Mes Coordonnées</h3>
              <Image src={Photo} className="photo-main" fluid />
            </div>
            <Col>
            <div className="div-coord">
              <div className="coordonnees">
                <div className="each-input-coord">
                  <label className="coord-label">Nom</label>
                  <input className="input-nom coord-input" onChange={this.handleInputChange} value={this.state.nomValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Prénom</label>
                  <input className="input-prenom coord-input" onChange={this.handleInputChange} value={this.state.prenomValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Email</label>
                  <input className="input-email coord-input" onChange={this.handleInputChange} value={this.state.emailValue} type="text" />
                </div>
                <div className="div_modif_cate each-input-coord">
                  <label className="coord-label">Pays</label>
                  <select className="coord-input" onChange={this.handleSelectChange}>
                    <option></option>
                    {this.state.allWW.map((item, i) => {
                      return (
                        <option key={i} value={item.name}>{item.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Adresse</label>
                  <input className="input-address coord-input" onChange={this.handleInputChange} value={this.state.addresseValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Ville</label>
                  <input className="input-city coord-input" onChange={this.handleInputChange} value={this.state.villeValue} type="text" />
                </div>
                <div className="each-input-coord">
                  <label className="coord-label">Code Postal</label>
                  <input className="input-postal coord-input" onChange={this.handleInputChange} value={this.state.postalValue} type="text" />
                </div>
              </div>
              <div className="envoi-div">
                <div className="select_transport">
                  <label className="envoi-label">Transporteurs </label>
                  <select className="select-envoi" onChange={this.handleSelectTransport}>
                    <option></option>
                    {this.state.allTransporteurs.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>{item.nom}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="select_mode">
                  <label className="envoi-label">Mode d'expedition </label>
                  <select className="select-envoi" onChange={this.handleSelectMode}>
                    <option></option>
                    {this.state.allModes.map((item, i) => {
                      if (item.transporteurs_id === parseInt(this.state.transportValue)) {
                        return (
                          <option key={i} value={item.id}>{item.nom}</option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="envoi-total-commande">
              <p className="envoi-text">Prix Total de Livraison:</p>
              <p className="envoi-prix">{(this.state.totalLivraison === "gratuit €") ? "Offerts" : this.state.totalLivraison}</p>
              <button className="coord-bouton" onClick={this.checkValid}>Valider</button>
            </div>
            </Col>
          </main>
        );
      }
    }
  }
}

export default Commande;