// Modules //
import React from 'react';
import axios from 'axios';

// Style //
import './subscribe.css';
// import { Button, Container, Row, Col, Carousel, Card, Image, Form } from 'react-bootstrap';
import { Button, Card, Image, Col, Row, Form, Container, Carousel } from 'react-bootstrap';
import Photo from './articles.jpg';


class Subscribe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribed: false,
      checked: false,
      cvvValue: "",
      codeValue: "",
      dateValue: "",
      titulaireValue: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  // TOGGLE
  state = {
    on: false,
  }

  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }

  toggle2 = () => {
    this.setState({
      on2: !this.state.on2
    })
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token).then((res) => {
      if (res.data.user.annuel === 1 || res.data.user.mensuel === 1) {
        this.setState({
          subscribed: true,
        })
      }
    })

    axios.get("http://127.0.0.1:8000/carte_bleues/user/" + localStorage.token).then((res) => {
      if (res.data.carte) {
        this.setState({
          codeValue: res.data.carte.numero,
          dateValue: res.data.carte.date,
          titulaireValue: res.data.carte.titulaire,
        })
      }
    })
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

  createOrder(event) {
    event.preventDefault();

    if (this.state.codeValue.length !== 16 || !/^\d+$/.test(this.state.codeValue)) {
      alert("Veuillez saisir un code valide.")
    } else if (this.state.dateValue.replace(/\//g, '').length !== 4 || !/^\d+$/.test(this.state.dateValue.replace(/\//g, '')) || this.state.dateValue.split("/").length !== 2) {
      alert("Veuillez saisir une date d'expiration valide.")
    } else if (this.state.titulaireValue.split(" ").length !== 2) {
      alert("Veuillez saisir le nom et le prenom du titulaire.")
    } else if (this.state.cvvValue.length !== 3 || !/^\d+$/.test(this.state.cvvValue)) {
      alert("Veuillez saisir un CVV valide.")
    } else {

      if (event.target.className === "coord-bouton-banc addMonth") {
        axios.post("http://127.0.0.1:8000/users/addMonth/" + this.props.token).then((res) => {
          window.location.assign("/")
        })
      } else if (event.target.className === "coord-bouton-banc addYear") {
        axios.post("http://127.0.0.1:8000/users/addYear/" + this.props.token).then((res) => {
          window.location.assign("/")
        })
      }
    }
  }

  render() {
    if (this.state.subscribed === true) {
      return (
        <body>
          <h2 className="article-main_title">Votre abonnement</h2>
          <Image src={ Photo } className="photo-main" fluid />

          <Container>
            <div className="en-tete">
              <h1>Vous Faites déjà parti de l'aventure D.Y.MED !</h1>
            </div>
            <div className="en-tete_below">
              <h3>Grâce à votre abonnement voici les avantages auxquels vous avez droit : </h3>
            </div>

            <table className="table_abo">
              {/* <tr className="abo_row1">
                <th> Votre abonnement actuel : </th>
                <td> annuel</td>
              </tr> */}
              <tr className="abo_row2">
                <th> Vos avantages : </th>
                <td className="avantages">
                  <tr><td><span className="checked_mark">✔</span>Paiement 100% securise</td></tr>
                  <tr><td><span className="checked_mark">✔</span>Livraison gratuite sur tout le site</td></tr>
                  <tr><td><span className="checked_mark">✔</span>Box cadeau de 6 échantillons chaque mois</td></tr>

                </td>
              </tr>
            </table>
            <br/>
            <br/>
            <br/>
          </Container>
        </body>
        
      );
    } else {
      return (
        <body className='body'>
          <h2 className="article-main_title">Nos abonnements</h2>
          <Image src={Photo} className="photo-main" fluid />

          <Container>
            <div className="page"> {/* DIV GLOBAL */}
              <div className="en-tete">  {/* DIV DE PRESENTATION ABONNEMENT */}
                <h1>Rejoignez l'aventure D.Y.MED !</h1>

                <p>Chaque mois, recevez jusqu'à 6 produits choisis par nos experts ainsi que 2 guides d'utilisation pour faire vos créations directement à la maison et ce pour 15€ par mois.</p>
              </div>


              {/* DIV REGROUPEMENT DES 3 TYPES D ABONNEMENT */}

              <Row className="div_abonnement">
                {/* <div className="abonnements"> */}
                <Col xs={4} className="sans_abo">
                  <div className="free_box">
                    <div className="free_box">
                      <h3>Sans abonnement </h3>
                      <p>Pour les utilisateurs <b>occasionnels</b></p>
                      <p>Vous hesitez à vous inscrire ? Profitez de notre site gratuitement </p>
                    </div>


                    <div className="line"></div>

                    <div className="abo_free">
                    <div>
                        <span className="checked_mark">✔</span>
                          <span>Paiement 100% sécurisé </span>
                      </div>
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Livraison gratuite sur tout le site</span>
                      </div>
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Box cadeau de 6 échantillons chaque mois </span>
                      </div>
                      <div className="prix">
                        <h4><b>GRATUIT</b></h4>
                      </div>

                    </div>

                  </div>
                </Col>
                <Col xs={4} className="avec_abo_mensuel" >
                  <div className="mensuel_box">
                    <div className="abo_mensuel">
                      <h3>Abonnement mensuel </h3>
                      <p>Pour les utilisateurs <b>réguliers</b></p>
                      <p>Profitez des avantages de notre abonnement mensuel</p>
                    </div>

                    <div className="line"></div>

                    <div className="avec_abo_mensuel">
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Paiement 100% sécurisé </span>
                      </div>
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Livraison gratuite sur tout le site</span>
                      </div>
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Box cadeau de 6 échantillons chaque mois </span>
                      </div>
                      <div className="prix">
                        <h4><b>15€/mois soit 180€/an</b></h4>
                      </div>

                      <button onClick={this.toggle} className='coord-bouton'>Souscrire</button>
                      {this.state.on && (
                        <form className="sub_carte">
                          <Row>
                            <Col className="each-input-coord-banc">
                              <Form.Label className="coord-label-banc">Numero de carte</Form.Label>
                              <Form.Control onChange={this.handleChange} value={this.state.codeValue} className="code" type="text" placeholder="Numero de carte bancaire" />
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
                              <button className="coord-bouton-banc addMonth" onClick={this.createOrder}>Valider</button>
                            </Col>
                          </Row>
                        </form>
                      )}

                    </div>
                  </div>
                </Col>
                <Col xs={4} className="avec_abo_annuel" >
                  <div className="annuel_box">
                    <div className="abo_annuel">
                      <h3>Abonnement annuel </h3>
                      <p>Pour les utilisateurs <b>réguliers</b></p>
                      <p>Profitez des avantages de notre abonnement annuel</p>
                    </div>

                    <div className="line"></div>


                    <div className="avec_abo_annuel">
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Paiement 100% sécurisé </span>
                      </div>
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Livraison gratuite sur tout le site</span>
                      </div>
                      <div>
                        <span className="checked_mark">✔</span>
                        <span>Box cadeau de 6 échantillons chaque mois </span>
                      </div>
                      <div className="prix">
                        <h4><b>120€/an soit 10€/mois</b></h4>
                      </div>

                      <button onClick={this.toggle2} className='coord-bouton'>Souscrire</button>
                      {this.state.on2 && (
                        <form className="sub_carte">
                          <Row>
                            <Col className="each-input-coord-banc">
                              <Form.Label className="coord-label-banc">Numero de carte</Form.Label>
                              <Form.Control onChange={this.handleChange} value={this.state.codeValue} className="code" type="text" placeholder="Numero de carte bancaire" />
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
                              <button className="coord-bouton-banc addYear" onClick={this.createOrder}>Valider</button>
                            </Col>
                          </Row>
                        </form>
                      )}


                    </div>
                  </div>

                </Col>
                {/* </div> */}
              </Row>
              <p>* Votre abonnement prendra fin chaque mois ou année selon votre type d'abonnement, vous devrez alors vous réabonnez. Les prélèvements ne sont pas automatiques.</p>

            </div>


            {/* DIV REGROUPEMENT DES 3 TYPES D ABONNEMENT */}



          </Container>
        </body>
      );
    }
  }
}

export default Subscribe;