// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './AdminTransporteurs.css';
import { AiFillDelete, AiTwotoneSetting, AiTwotoneEye } from 'react-icons/ai';
import { Button, Container, Row, Col } from 'react-bootstrap';

class AdminTransporteurs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTransporteurs: [],
      nameValue: "",
      grammeValue: "",
      europeValue: "",
      asieValue: "",
      afriqueValue: "",
      oceanieValue: "",
      americaValue: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/transporteurs").then((data) => {
      console.log(data);
      
      const copy = this.state.allTransporteurs.slice()

      data.data.transporteurs.map((item) => {
        copy.push(item)
      })

      this.setState({ allTransporteurs: copy })
    })
  }

  onDelete(e) {
    const copy = this.state.allTransporteurs.slice();

    console.log(e.target.attributes.value.value);
    axios.post("http://127.0.0.1:8000/transporteurs/delete/"+ e.target.attributes.value.value).then((res) => {
      
      copy.map((item, i) => {
        if(item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })
  
      this.setState({ allTransporteurs: copy })
    })
  }

  sendData() {
    const copy = this.state.allTransporteurs.slice();
    const data = {
      nom: this.state.nameValue,
      taux_gramme: this.state.grammeValue,
      taux_europe: this.state.europeValue,
      taux_asia: this.state.asieValue,
      taux_africa: this.state.afriqueValue,
      taux_oceania: this.state.oceanieValue,
      taux_america: this.state.americaValue,
    }

    axios.post("http://127.0.0.1:8000/transporteurs/store", data).then((res) => {
      if (res.data.result === "creation_ok") {
        data["id"] = res.data.id;
        copy.push(data);

        this.setState({ allTransporteurs: copy })
      }
    })
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-name input-transport") {
      this.setState({ nameValue: value })
    } else if (e.target.className === "input-europe input-transport") {
      this.setState({ europeValue: value })
    } else if (e.target.className === "input-asie input-transport") {
      this.setState({ asieValue: value })
    } else if (e.target.className === "input-amerique input-transport") {
      this.setState({ americaValue: value })
    } else if (e.target.className === "input-afrique input-transport") {
      this.setState({ afriqueValue: value })
    } else if (e.target.className === "input-oceanie input-transport") {
      this.setState({ oceanieValue: value })
    } else if (e.target.className === "input-gramme input-transport") {
      this.setState({ grammeValue: value })
    }
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div className="admin-categorie">
        <center>
          <Container>
              <Row>
                <Col>
                <table className="admin-table_categories">
                  <tbody>
                    <tr className="admin-table_tr">
                      <th>Id</th>
                      <th>Nom</th>
                      <th>Actions</th>
                    </tr>
                    {this.state.allTransporteurs.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="admin-table_td_id">{item.id}</td>
                        <td className="admin-table_td">{item.nom}</td>
                        <td className="admin-table_td">
                          <p className="action-icons" value={item.id} onClick={this.onDelete}>Delete</p>
                          <Link to={{ pathname: "/admin/transporteurs/modif/" + item.id }}><AiTwotoneSetting className="action-icons" /></Link>
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table><br/>
                </Col>
                <Col>
                <div className="admin-categories_form">
                  <div>
                    <h3 className="admin-categories_title">Ajouter un Transporteur</h3>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Nom </label>
                      <input className="input-name input-transport" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">{"Taux surpoids (>= 500g) "}</label>
                      <input className="input-gramme input-transport" onChange={this.handleInputChange} value={this.state.grammeValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Taux expedisions Europe </label>
                      <input className="input-europe input-transport" onChange={this.handleInputChange} value={this.state.europeValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Taux expedisions Asie </label>
                      <input className="input-asie input-transport" onChange={this.handleInputChange} value={this.state.asieValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Taux expedisions Afrique </label>
                      <input className="input-afrique input-transport" onChange={this.handleInputChange} value={this.state.afriqueValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Taux expedisions Amerique </label>
                      <input className="input-amerique input-transport" onChange={this.handleInputChange} value={this.state.americaValue} type="text" />
                    </div>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Taux expedisions Oceanie </label>
                      <input className="input-oceanie input-transport" onChange={this.handleInputChange} value={this.state.oceanieValue} type="text" />
                    </div>
                    <br /><button className="admin-button" onClick={this.sendData}>Valider</button>
                  </div>
                </div>
                </Col>
              </Row>
          </Container>
        </center>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default AdminTransporteurs;
