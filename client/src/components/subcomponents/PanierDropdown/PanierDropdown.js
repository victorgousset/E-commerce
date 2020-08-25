// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './PanierDropdown.css';
import { Dropdown, Table } from 'react-bootstrap';

class PanierDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PanierContent: [],
      totalPrice: 0,
    }
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    let total = 0;
    
    axios.get("http://127.0.0.1:8000/cart/" + localStorage.token).then((data) => {
      if (data.data.result !== "aucun achat trouver") {
        data.data.produits.map((item, i) => {
          total += pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo) * item.quantity
        })
  
        this.setState({ 
          PanierContent: data.data.produits,
          totalPrice: total
        })
      }
    })
  }

  componentDidUpdate(prevProps) {
    let total = 0;
    
    if (prevProps.count !== this.props.count) {
      axios.get("http://127.0.0.1:8000/cart/" + localStorage.token).then((data) => {
        if (data.data.result !== "aucun achat trouver") {
          data.data.produits.map((item, i) => {
            total += pourcentage(item.caracteristiques_produits.prix, item.caracteristiques_produits.promo) * item.quantity
          })
    
          this.setState({ 
            PanierContent: data.data.produits,
            totalPrice: total
          })
        }
      })
    }
  }

  removeFromCart(e) {
    const copy = this.state.PanierContent.slice();

    axios.post("http://127.0.0.1:8000/cart/delete/" + e.target.attributes.value.value).then((res) => {
      copy.map((item, i) => {
        if(item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })
  
      this.setState({ PanierContent: copy }, () => {
        if (this.state.PanierContent.length === 0) {
          this.setState({ totalPrice: 0 })
        }
      })
    })
  }

  render() {
    return (
      <div>
        <Table className="table-article" >
            {this.state.PanierContent.map((item, i) => {
              return (
                <div key={i} className="dp-key-article">
                  <div className="dp-article"><a href={"/articles/" + item.caracteristiques_produits.articles.id}>{item.caracteristiques_produits.articles.titre + " - " + item.caracteristiques_produits.format}</a></div>
                  <div className="dp-quantite align-top">×{item.quantity}</div>
                  <div className="remove-div">
                    <p className="remove" value={item.id} onClick={this.removeFromCart} title="supprimer">
                      ×
                    </p>
                  </div>
                  <div className="dp-caracteristiques align-bottom">{item.caracteristiques_produits.prix + " EUR"}</div>
                </div>
              )
            })}
        </Table>
        <div style={{ display: "flex" }}>
          <p className="p-total" style={{ marginLeft: 10 }}>Total</p>
          <p className="p-prix" style={{ position: "absolute", right: 10 }}>{this.state.totalPrice + " EUR"}</p>
        </div>
        <Link to={{ pathname: "/panier" }} ><button className="panier-bouton">Voir Panier</button></Link>
      </div>
    )
  }
}

export default PanierDropdown;

function pourcentage(prix, reduc) {
  let result = prix - (prix * reduc) / 100
  return result
}