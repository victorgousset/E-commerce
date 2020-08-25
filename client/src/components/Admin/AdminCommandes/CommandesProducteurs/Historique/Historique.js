// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './Historique.css';
import { AiFillDelete, AiTwotoneSetting, AiTwotoneEye } from 'react-icons/ai';
import { Button, Container, Row, Col } from 'react-bootstrap';

class Historique extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCommandes: [],
    }
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.checkReception()
    axios.get("http://127.0.0.1:8000/commandeProd").then((data) => {
      const copy = this.state.allCommandes.slice()

      data.data.commande.map((item) => {
        copy.push(item)
      })

      this.setState({ allCommandes: copy })
    })
  }

  onDelete(e) {
    const copy = this.state.allCommandes.slice();

    axios.post("http://127.0.0.1:8000/commandeProd/delete/" + e.target.attributes.value.value).then((res) => {

      copy.map((item, i) => {
        if (item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })

      this.setState({ allCommandes: copy })
    })
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div className="admin-categorie">
          <center>
            <Container>
              <Col>
                <h3 className="commandes-admin">Historique des commandes producteurs : </h3><br />
                <table className="admin-table_categories">
                  <tbody>
                    <tr className="admin-table_tr">
                      <th>Id</th>
                      <th>Photo</th>
                      <th>Produits</th>
                      <th>Producteurs</th>
                      <th>Quantites</th>
                      <th>Date de Commande</th>
                      <th>Date de Reception</th>
                      <th>Actions</th>
                    </tr>
                    {this.state.allCommandes.map((item, i) => {
                      if (item.done !== null) {
                        return (
                          <tr key={i}>
                            <td className="admin-table_td_id">{item.id}</td>
                            <td className="admin-table_td"><img className="table-img" src={item.caracteristiques_produits.articles.photo}></img></td>
                            <td className="admin-table_td">{item.caracteristiques_produits.articles.titre + " - " + item.caracteristiques_produits.format}</td>
                            <td className="admin-table_td">{item.caracteristiques_produits.articles.producteurs.nom}</td>
                            <td className="admin-table_td">{item.quantity}</td>
                            <td className="admin-table_td">{item.created_at.split("T")[0]}</td>
                            <td className="admin-table_td">{item.reception_at.split(" ")[0]}</td>
                            <td className="admin-table_td">
                              <p className="action-icons" value={item.id} onClick={this.onDelete}>Supprimer</p>
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table><br />
                <Link to={{ pathname: "/admin/commandes/producteur" }}><button className="admin-button">En cours</button></Link>
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

export default Historique;
