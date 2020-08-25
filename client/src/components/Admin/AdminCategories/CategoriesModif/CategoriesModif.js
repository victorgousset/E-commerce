// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './CategoriesModif.css';

class CategoriesModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorieID: window.location.href.split("/")[6],
      nameValue: "",
    }
    this.sendChanges = this.sendChanges.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/categories/" + this.state.categorieID).then((res) => {
      this.setState({ nameValue: res.data.categorie.nom })
    })
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-name") {
      this.setState({ nameValue: value })
    }
  }

  sendChanges() {
    const data = {
      nom: this.state.nameValue,
    }
    console.log(data);
    
    axios.post("http://127.0.0.1:8000/categories/update/" + this.state.categorieID).then((res) => {
      this.props.history.push('/admin/categories')
    })
  } 

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div className="admin_modif">
          <div className="modif_article">
            <h3>Modifier la Categorie</h3>
            <div className="div_modif_nom">
              <label>Nom: </label>
              <input className="input-name" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
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

export default CategoriesModif;
