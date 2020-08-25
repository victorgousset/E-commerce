// Modules //
import React, { useState } from 'react';
import axios from 'axios';
import PureModal from 'react-pure-modal';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';


// Style //
import './Inscription.css';
import * as token from "pretty-format";
import 'react-pure-modal/dist/react-pure-modal.min.css';
import Photo from './photo.jpg';
import { Image } from 'react-bootstrap';

export default class Inscription extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confpass: '',
    created_at: '',
    passvisible: false,
    apivisible: false,
    redirect: false,
  }


  //   componentDidMount() {
  //     const cookies = new Cookies()
  //     let id = cookies.get('User_id')
  //     let token = cookies.get('User_token')

  //     axios.post('http://127.0.0.1:8000/verifIsLogin', {id: id, token: token})
  //         .then(res => {
  //             if(res.data.result === "no_login") {
  //                 this.setState({redirect: null});
  //             } else if (res.data.result === "ok_login") {
  //                 this.setState({redirect: true});
  //             }
  //         })

  // } 

  handleSubmit = event => {
    const API = "http://127.0.0.1:8000/register"
    event.preventDefault();

    if (this.state.password === this.state.confpass) {
      const data = {
        username: this.state.username, 
        email: this.state.email, 
        password: this.state.password,
      }
      axios.post('http://127.0.0.1:8000/register', data).then(res => {
          if (res.data.result === "exist") {
            alert("Cette adresse email est deja utilisee.")
          } else {
            this.props.history.push('/login')
          }
        })
    }
    else if (this.state.password !== this.state.confpass) {
      alert("Les mots de passes sont differents.")
    }

    /*
        fetch(API)
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.log(error);
            });*/
  }

  // SETS PARAMS //
  usernameChange = (event) => {
    this.setState({ username: event.target.value.trim() });
  }

  emailChange = (event) => {
    this.setState({ email: event.target.value.trim() });
  }

  passwordChange = (event) => {
    this.setState({ password: event.target.value.trim() });
  }

  confPasswordChange = (event) => {
    this.setState({ confpass: event.target.value.trim() });
  }

  createdChange = () => {
    let tempDate = new Date();
    let date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    this.setState({ created_at: date });
  };



  // AFFICHAGE //
  render() {
    if (this.props.isUser === false && this.props.isAdmin === false) {
      return (
        <div className="inscription_div">
          <div className="articles-main_photo connection_title">
            <h2 className="article-main_title">Connexion</h2>
            <Image src={ Photo } className="photo-main" fluid />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <input type="name" className="Iusername" id="Iusername" placeholder="Votre pseudo" onChange={this.usernameChange} />
            </div>
            <div className="form-input">
              <input type="email" className="Iemail" id="Iemail" placeholder="Votre email" onChange={this.emailChange} />
            </div>
            <div className="form-input">
              <input type="password" className="Ipass" id="Ipass" placeholder="Votre mot de passe" onChange={this.passwordChange} />
            </div>
            <div className="form-input">
              <input type="password" className="IpassConfirm" id="IpassConfirm" placeholder="Confirmer votre mot de passe" onChange={this.confPasswordChange} />
            </div>
            <button type="submit" className="submit-inscription">S'inscrire</button>
          </form>
          {/* <PureModal onClose={() => {
            console.log('handle confpass closing');
            this.setState({ passvisible: false })
            return true;
          }} isOpen={this.state.passvisible} ref="modal">
            <p>Les mots de passes ne correspondent pas !</p>
          </PureModal>
          <PureModal onClose={() => {
            console.log('handle confpass closing');
            this.setState({ apivisible: false })
            return true;
          }} isOpen={this.state.apivisible} ref="modal">
            <p className="p-sub">Hmm... Une erreur.. Seriez-vous deja des notres ?</p>
            <button className="modalBtn"><Link to={{ pathname: "/login" }}>Se connecter ?</Link></button>
          </PureModal> */}
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}
