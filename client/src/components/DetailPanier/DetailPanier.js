// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './DetailPanier.css';
import { Image, Table, Button, Container, Col, Row, Modal, Card } from 'react-bootstrap';
import Photo from './photo.jpg';


class DetailPanier extends React.Component {
    constructor() {
        super();

        this.state = {
            allArticles: [],
            token: 'testToken',
            count: 0,
            totalPrice: 0,
            show: false,
        }

        this.handleShowOrNot = this.handleShowOrNot.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onUp = this.onUp.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onDown = this.onDown.bind(this);
    }

    componentDidMount() {
        let total = 0;
        const requete = "http://127.0.0.1:8000/cart/" + localStorage.token;
        // console.log(requete);

        axios.get(requete).then((data) => {
            if (data.data.result !== "aucun achat trouver") {
                data.data.produits.map((item, i) => {
                    // total += item.caracteristiques_produits.prix * item.quantity
                    total += pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo) * item.quantity
                })

                this.setState({
                    allArticles: data.data.produits,
                    totalPrice: total
                })
            }
        })
    }

    componentDidUpdate(prevState) {
        let total = 0;

        if (prevState.count !== this.state.count) {
            axios.get("http://127.0.0.1:8000/cart/" + localStorage.token).then((data) => {
                if (data.data.result !== "aucun achat trouver") {
                    data.data.produits.map((item, i) => {
                        total += pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo) * item.quantity
                    })

                    this.setState({
                        allArticles: data.data.produits,
                        totalPrice: total
                    })
                }
            })
        }
    }

    onUp(e) {
        let itemId = e.target.attributes.itemid.value;

        const data = {
            quantity: parseInt(e.target.attributes.quantity.value) + 1
        }
        const requete = "http://127.0.0.1:8000/cart/update/" + e.target.attributes.value.value;
        axios.post(requete, data).then((res) => {
            console.log(res);
            const copy = this.state.allArticles.slice();
            copy.map((item) => {
                if (item.id = itemId) {
                    item.quantity += 1
                }
            })
            this.setState({ allArticles: copy })
        })
    }

    onDelete(e) {
        const key = e.target.attributes.itemkey.value
        let itemId = e.target.attributes.itemid.value;


        const requete = "http://127.0.0.1:8000/cart/delete/" + e.target.attributes.itemId.value;
        axios.post(requete).then((res) => {
            console.log(res);
            const copy = this.state.allArticles.slice();
            copy.splice(key, 1)
            console.log(copy.length);

            if (copy.length == 0) {
                this.setState({ allArticles: [], totalPrice: 0 });
            } else {

                copy.map((item) => {
                    if (item.id = itemId) {
                        item.quantity -= 1
                    }
                })
                this.setState({ allArticles: copy })
            }
        })
    }

    onDown(e) {
        let itemId = e.target.attributes.itemid.value;
        let testQuantity = e.target.attributes.quantity.value;
        let requete = '';

        const data = {
            quantity: parseInt(e.target.attributes.quantity.value) - 1
        }
        if (testQuantity > 1) {
            requete = "http://127.0.0.1:8000/cart/update/" + e.target.attributes.value.value;
        } else {
            requete = "http://127.0.0.1:8000/cart/delete/" + e.target.attributes.itemId.value;
        }
        axios.post(requete, data).then((res) => {
            // console.log(res);
            const copy = this.state.allArticles.slice();
            console.log(copy);
            if (copy.length == 1 && copy[0].quantity <= 1) {
                this.setState({ allArticles: [], totalPrice: 0 });
            } else {

                copy.map((item) => {
                    if (item.id = itemId) {
                        item.quantity -= 1
                    }
                })
                this.setState({ allArticles: copy })
            }
        })
    }

    handleShowOrNot() {
        if (this.state.allArticles.length <= 0) {
            alert("Votre panier est vide !")
        } else {
            if (this.props.isUser === false && this.props.isAdmin === false) {
                this.setState({ show: true })
            } else {
                this.props.history.push('/panier/commande');
            }
        }
    }

    handleClose() {
        this.setState({ show: false })
    }

    render() {
        return (
            <div className="panier">
                <div className="articles-main_photo">
                    <h3 className="panier-titre">Mon Panier</h3>
                    <Image src={Photo} className="photo-main" fluid />
                </div>
                <center>
                    <Container>
                        <Row>
                            <div className="panier-total">
                                <Col>
                                    {this.state.allArticles.map((item, i) => {
                                        if (item.caracteristiques_produits.promo > 0) {
                                            return (
                                                <Card className="card-panier-tout text-left">
                                                    <div key={i}>
                                                        <Card.Body>
                                                            <Card.Img className="panier-img" alt="produit" src={item.caracteristiques_produits.articles.photo} />
                                                            <Card.Title className="panier-title">{item.caracteristiques_produits.articles.titre}</Card.Title>
                                                            <Card.Title className="panier-price"><s className="s-barre">{item.quantity * item.caracteristiques_produits.prix} €</s></Card.Title>
                                                            <Card.Title className="panier-price">{
                                                                item.quantity * pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo)
                                                            } €</Card.Title>
                                                            <Card.Subtitle className="panier-format">{item.caracteristiques_produits.format}</Card.Subtitle>
                                                            <Card.Text className="panier-unit">Prix Unitaire : {
                                                                pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo)
                                                            }
                                                            </Card.Text>
                                                            <Card.Text className="panier-quantite">
                                                                Quantité :{item.quantity}
                                                            </Card.Text>
                                                            <Card.Text className="panier-quantite">
                                                                <p className="action-icons-plus" value={item.caracteristiques_produits.id} quantity={item.quantity} itemkey={i} itemID={item.id} onClick={this.onUp}>+</p>
                                                                <p className="action-icons-delete" value={item.caracteristiques_produits.id} itemkey={i} itemID={item.id} onClick={this.onDelete}>Retirer</p>
                                                                <p className="action-icons-moins" value={item.caracteristiques_produits.id} quantity={item.quantity} itemkey={i} itemID={item.id} onClick={this.onDown}>ー</p>
                                                            </Card.Text>
                                                            <Card.Text className="panier-quantite">
                                                                Promo : -{item.caracteristiques_produits.promo}%
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </div>
                                                </Card>
                                            )
                                        } else {
                                            return (
                                                <Card className="card-panier-tout text-left">
                                                    <div key={i}>
                                                        <Card.Body>
                                                            <Card.Img className="panier-img" alt="produit" src={item.caracteristiques_produits.articles.photo} />
                                                            <Card.Title className="panier-title">{item.caracteristiques_produits.articles.titre}</Card.Title>
                                                            <Card.Title className="panier-price">{item.quantity * item.caracteristiques_produits.prix} €</Card.Title>
                                                            <Card.Subtitle className="panier-format">{item.caracteristiques_produits.format}</Card.Subtitle>
                                                            <Card.Text className="panier-unit">Prix Unitaire : {
                                                                pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo)
                                                            }
                                                            </Card.Text>
                                                            <Card.Text className="panier-quantite">
                                                                Quantité :{item.quantity}
                                                            </Card.Text>
                                                            <Card.Text className="panier-quantite">
                                                                <p className="action-icons-plus" value={item.caracteristiques_produits.id} quantity={item.quantity} itemkey={i} itemID={item.id} onClick={this.onUp}>+</p>
                                                                <p className="action-icons-delete" value={item.caracteristiques_produits.id} itemkey={i} itemID={item.id} onClick={this.onDelete}>Retirer</p>
                                                                <p className="action-icons-moins" value={item.caracteristiques_produits.id} quantity={item.quantity} itemkey={i} itemID={item.id} onClick={this.onDown}>ー</p>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </div>
                                                </Card>
                                            )
                                        }
                                    })}
                                </Col>
                                <Col>
                                    <div className="div-prix-total">
                                        <Card>
                                            <p className="prix-total-title">Prix total:</p>
                                            <p className="prix-total-nombre">{this.state.totalPrice} €</p>
                                        </Card>
                                        <button className="panier-button-full" onClick={ this.handleShowOrNot } >Commander !</button>
                                    </div>
                                </Col>
                            </div>
                            <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton className="modal-close">
                                    <Modal.Title className="modal-title">Commande</Modal.Title>
                                </Modal.Header>
                                <Link to={{ pathname: "/login" }}><Button className="modal-connect" variant="primary">Se Connecter</Button></Link>
                                <Link to={{ pathname: "/panier/commande" }}><Button className="modal-guest" variant="secondary">Continuer en tant qu'invité</Button></Link>
                            </Modal>
                        </Row>
                    </Container>
                </center>
            </div>
        );
    }
}

export default DetailPanier;


function pourcentage(prix, reduc) {
    let result = prix - (prix * reduc) / 100
    return result
}