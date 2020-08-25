// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './AdminExports.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

class AdminExports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      name: [],
      exportValue : ""
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}

  componentDidMount(){

    this.props.checkReception();

    axios.get("http://127.0.0.1:8000/export").then((data) => {
      const copy = this.state.response.slice();
      const nameCopy = this.state.name.slice();
      const SERVER = data.data.result[0];
    
      data.data.result[1].map((item) => {
        let getExport = SERVER+item;
        copy.push(getExport);
      })

      data.data.name.map((item) => {
        nameCopy.push(item);
      })
      this.setState({ response: copy});
      this.setState({ name: nameCopy});

      }) 
    }

    handleSelectChange(event) {
      if (event.target.className === "admin-export") {
        this.setState({ exportValue: event.target.value })
      }
    }
    

  render() {
    // if (this.props.isAdmin === true) {
      return (
        <div className="export-div">
          <h3 className="export-title">Exporter vos Documents</h3>
          <p className="export-p">Quelles donnees souhaitez-vous exporter ?</p>
          <p className="export-select">
            <select className="admin-export" value={this.state.exportValue} onChange={this.handleSelectChange}>
              {this.state.response.map((item, i) => {
                return(
                <option key={i} value={item}>{this.state.name[i]}</option>
                )
              })}
            </select>
          </p>
          <a target="_blank" href={this.state.exportValue}><button className="bouton-export">Telecharger</button></a>
        </div>
      )
  //   }
  //  else {
  //     return <Redirect to="/" />
  //   }
  }
}

export default AdminExports;
