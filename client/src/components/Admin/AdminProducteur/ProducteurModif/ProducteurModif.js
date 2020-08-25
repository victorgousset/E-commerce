// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './ProducteurModif.css';

class ProducteurModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: "",
    }
    this.sendChanges = this.sendChanges.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-name input-transport") {
      this.setState({ nameValue: value })
    }
  }

  sendChanges() {
    const data = {
      nom: (this.state.nameValue) ? this.state.nameValue : this.props.location.state.nom,
    }
    console.log(data);
    
    axios.post("http://127.0.0.1:8000/producteurs/update/" + this.props.location.state.id,data).then((res) => {
      this.props.history.push('/admin/producteur')
    })
  } 

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div className="admin_modif">
          <div className="modif_article">
            <h3>Modifier le Producteur</h3>
            <div className="div_modif_nom">
              <label>Nom: </label>
              <input className="input-name input-transport" placeholder={this.props.location.state.nom} onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
            </div>
            <button onClick={this.sendChanges}>Valider</button>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default ProducteurModif;
