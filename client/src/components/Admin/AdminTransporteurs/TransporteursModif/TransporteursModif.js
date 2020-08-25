// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './TransporteursModif.css';
import { AiFillDelete, AiTwotoneSetting, AiTwotoneEye } from 'react-icons/ai';

class TransporteursModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      TransportID: window.location.href.split("/")[6],
      allExpeditions: [],
      nameValue: "",
      nameValue2: "",
      descValue: "",
      prixValue: "",
      estimValue: "",
      grammeValue: "",
      europeValue: "",
      asieValue: "",
      afriqueValue: "",
      oceanieValue: "",
      americaValue: "",
    }
    this.addExpe = this.addExpe.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.sendChanges = this.sendChanges.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/expeditions/transporteurs/" + this.state.TransportID).then((res) => {
      this.setState({ allExpeditions: res.data.expeditions })
    })

    axios.get("http://127.0.0.1:8000/transporteurs/" + this.state.TransportID).then((res) => {
      this.setState({ 
        nameValue: res.data.transporteurs.nom,
        grammeValue: res.data.transporteurs.taux_gramme,
        europeValue: res.data.transporteurs.taux_europe,
        asieValue: res.data.transporteurs.taux_asia,
        afriqueValue: res.data.transporteurs.taux_africa,
        oceanieValue: res.data.transporteurs.taux_oceania,
        americaValue: res.data.transporteurs.taux_america,
      })
    })
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-name") {
      this.setState({ nameValue: value })
    } else if (e.target.className === "input-name2") {
      this.setState({ nameValue2: value })
    } else if (e.target.className === "input-description") {
      this.setState({ descValue: value })
    } else if (e.target.className === "input-estimation") {
      this.setState({ estimValue: value })
    } else if (e.target.className === "input-prix") {
      this.setState({ prixValue: value })
    } else if (e.target.className === "input-europe") {
      this.setState({ europeValue: value })
    } else if (e.target.className === "input-asie") {
      this.setState({ asieValue: value })
    } else if (e.target.className === "input-amerique") {
      this.setState({ americaValue: value })
    } else if (e.target.className === "input-afrique") {
      this.setState({ afriqueValue: value })
    } else if (e.target.className === "input-oceanie") {
      this.setState({ oceanieValue: value })
    } else if (e.target.className === "input-gramme") {
      this.setState({ grammeValue: value })
    }
  }

  sendChanges() {
    const data = {
      nom: this.state.nameValue,
      taux_gramme: this.state.grammeValue,
      taux_europe: this.state.europeValue,
      taux_asia: this.state.asieValue,
      taux_africa: this.state.afriqueValue,
      taux_oceania: this.state.oceanieValue,
      taux_america: this.state.americaValue,
    }

    axios.post("http://127.0.0.1:8000/transporteurs/update/" + this.state.TransportID, data).then((res) => {
      this.props.history.push('/admin/transporteurs')
    })
  }

  addExpe() {
    const copy = this.state.allExpeditions.slice();
    const data = {
      transporteurs_id: this.state.TransportID,
      nom: this.state.nameValue2,
      description: this.state.descValue,
      prix: this.state.prixValue,
      estimations: this.state.estimValue,
    }

    axios.post("http://127.0.0.1:8000/expeditions/store", data).then((res) => {
      if (res.data.result === "creation_ok") {
        data["id"] = res.data.id;
        copy.push(data);

        this.setState({ allExpeditions: copy })
      }
    })
  }

  onDelete(e) {
    const copy = this.state.allExpeditions.slice();

    axios.post("http://127.0.0.1:8000/expeditions/delete/" + e.target.attributes.value.value).then((res) => {

      copy.map((item, i) => {
        if (item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })

      this.setState({ allExpeditions: copy })
    })
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div>
          <div>
            <table className="admin-table_categories">
              <tbody>
                <tr className="admin-table_tr">
                  <th>Id</th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Delais</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
                {this.state.allExpeditions.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="admin-table_td_id">{item.id}</td>
                      <td className="admin-table_td">{item.nom}</td>
                      <td className="admin-table_td">{item.description}</td>
                      <td className="admin-table_td">{item.estimations} Jours</td>
                      <td className="admin-table_td">{item.prix} EUR</td>
                      <td className="admin-table_td">
                        <p className="action-icons" value={item.id} onClick={this.onDelete}>Delete</p>
                        <Link to={{ pathname: "/admin/expeditions/modif/" + item.id }}><AiTwotoneSetting className="action-icons" /></Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="admin_modif">
            <div className="modif_article">
              <h3>Modifier la Categorie</h3>
              <div className="div_modif_nom">
                <label>Nom: </label>
                <input className="input-name" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
              </div>
              <div className="div_ajout_nom">
                <label className="transporteurs-label">{"Taux surpoids (>= 500g) :"}</label>
                <input className="input-gramme" onChange={this.handleInputChange} value={this.state.grammeValue} type="text" />
              </div>
              <div className="div_ajout_nom">
                <label className="transporteurs-label">Taux expedisions Europe :</label>
                <input className="input-europe" onChange={this.handleInputChange} value={this.state.europeValue} type="text" />
              </div>
              <div className="div_ajout_nom">
                <label className="transporteurs-label">Taux expedisions Asie :</label>
                <input className="input-asie" onChange={this.handleInputChange} value={this.state.asieValue} type="text" />
              </div>
              <div className="div_ajout_nom">
                <label className="transporteurs-label">Taux expedisions Afrique :</label>
                <input className="input-afrique" onChange={this.handleInputChange} value={this.state.afriqueValue} type="text" />
              </div>
              <div className="div_ajout_nom">
                <label className="transporteurs-label">Taux expedisions Amerique :</label>
                <input className="input-amerique" onChange={this.handleInputChange} value={this.state.americaValue} type="text" />
              </div>
              <div className="div_ajout_nom">
                <label className="transporteurs-label">Taux expedisions Oceanie :</label>
                <input className="input-oceanie" onChange={this.handleInputChange} value={this.state.oceanieValue} type="text" />
              </div>
              <button onClick={this.sendChanges}>Valider</button>
            </div>
            <div className="modif_article">
              <h3>Modifier la Categorie</h3>
              <div className="div_modif_nom">
                <label>Nom: </label>
                <input className="input-name2" onChange={this.handleInputChange} value={this.state.nameValue2} type="text" />
              </div>
              <div className="div_modif_nom">
                <label>Description: </label>
                <input className="input-description" onChange={this.handleInputChange} value={this.state.descValue} type="text" />
              </div>
              <div className="div_modif_nom">
                <label>Delais de livraison: </label>
                <input className="input-estimation" onChange={this.handleInputChange} value={this.state.estimValue} type="text" />
              </div>
              <div className="div_modif_nom">
                <label>Prix: </label>
                <input className="input-prix" onChange={this.handleInputChange} value={this.state.prixValue} type="text" />
              </div>
              <button onClick={this.addExpe}>Ajouter Mode</button>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default TransporteursModif;
