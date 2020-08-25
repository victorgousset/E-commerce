// Modules // 
import React from 'react'; 
import axios from 'axios'; 
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'; 


// Style // 
import './CommandesClients.css'; 
import { AiFillDelete, AiTwotoneSetting, AiTwotoneEye } from 'react-icons/ai';
import { Button, Container, Row, Col } from 'react-bootstrap'; 

class CommandesClients extends React.Component {
   

    state = {
        allCommandes: [], 
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/commandes_clients').then(response => {
            console.log(response.data);

            this.setState({ allCommandes: response.data.commandes})
        })
    }


    render(){
        if (this.props.isAdmin === true) {
            return(
                <div className="admin-categorie">
                    <center>
                        <Container>
                            <Col>
                                <h3 className="commandes-admin">Commandes Clients </h3><br/>
                                <table className="admin-table_categories">
                                    <tbody>
                                        <tr className="admin-table_tr">
                                           <th>Produit</th> 
                                           <th>Transporteur</th>
                                           <th>Type de livraison</th> 
                                           <th>Email client</th> 
                                           <th>Status de la commande</th> 
                                           <th>Date de Commande</th> 
                                           <th>Frais de port</th> 
                                           <th>Total commande</th> 
                                        </tr>
                                       

                                        {this.state.allCommandes.slice().map((commandes) => (
                                        <tr>
                                            <td>{commandes.caracteristiques_produits.articles.titre}</td>
                                            <td>{commandes.expeditions.transporteurs.nom}</td>
                                            <td>{commandes.expeditions.nom}</td>
                                            <td>{commandes.email}</td>
                                            <td>{commandes.status}</td>
                                            <td>{commandes.reception_at}</td>
                                            <td>{commandes.prix_port}</td>
                                            <td>{commandes.prix_articles}</td>

                                        </tr> ))}
                                    </tbody>
                                </table>
                            </Col>
                        </Container>
                    </center>

                </div>
            )
        }

        else {
            return <Redirect to='/' />
        }
    }
}

export default CommandesClients;
