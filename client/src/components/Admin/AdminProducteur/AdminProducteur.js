// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './AdminProducteur.css';
import { AiFillDelete, AiTwotoneSetting, AiTwotoneEye } from 'react-icons/ai';
import { Button, Container, Row, Col } from 'react-bootstrap';

class AdminProducteur extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducteurs: [],
      nameValue: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/producteurs").then((data) => {
      const copy = this.state.allProducteurs.slice()

      data.data.producteurs.map((item) => {
        copy.push(item)
      })

      this.setState({ allProducteurs: copy })
    })
  }

  onDelete(e) {
    const copy = this.state.allProducteurs.slice();

    console.log(e.target.attributes.value.value);
    axios.post("http://127.0.0.1:8000/producteurs/delete/"+ e.target.attributes.value.value).then((res) => {
      
      copy.map((item, i) => {
        if(item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })
  
      this.setState({ allProducteurs: copy })
    })
  }

  sendData() {
    const copy = this.state.allProducteurs.slice();
    const data = {
      nom: this.state.nameValue
    }

    axios.post("http://127.0.0.1:8000/producteurs/store", data).then((res) => {
      if (res.data.result === "creation_ok") {
        data["id"] = res.data.id;
        copy.push(data);

        this.setState({ allProducteurs: copy })
      }
    })
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-name") {
      this.setState({ nameValue: value })
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
                    {this.state.allProducteurs.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="admin-table_td_id">{item.id}</td>
                        <td className="admin-table_td">{item.nom}</td>
                        <td className="admin-table_td">
                          <p className="action-icons" value={item.id} onClick={this.onDelete}>Delete</p>
                          <Link to={{ pathname: "/admin/producteur/modif/" + item.id, state: { nom: item.nom, id: item.id } }}><AiTwotoneSetting className="action-icons" /></Link>
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
                    <h3 className="admin-categories_title">Ajouter un Producteur</h3>
                    <div className="div_ajout_nom">
                      <label className="admin-label">Nom</label>
                      <input className="input-name" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
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

export default AdminProducteur;
