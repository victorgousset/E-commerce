// Modules //
import React from 'react';
import axios from 'axios';
import PureModal from 'react-pure-modal';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

// Style //
import './Connection.css';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import Photo from './photo.jpg';
import { Image } from 'react-bootstrap';

export default class Connection extends React.Component {
  state = {
    email: '',
    password: '',
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
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/login", { email: this.state.email, password: this.state.password }).then(res => {
      if (res.data.result === "login_ok") {
        localStorage.setItem('token', res.data.token);
        window.location.href = "/";
      } else {
        alert("Email ou mot de passe incorrect.")
      }
    })
  }

  emailChange = (event) => {
    this.setState({ email: event.target.value.trim() });
  }

  passwordChange = (event) => {
    this.setState({ password: event.target.value.trim() });
  }
  // AFFICHAGE //
  render() {
    if (this.props.isUser === false && this.props.isAdmin === false) {
      return (
        <div className="connection_div">
          <div className="articles-main_photo connection_title">
            <h2 className="article-main_title">Connexion</h2>
            <Image src={ Photo } className="photo-main" fluid />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <input type="email" className="Cemail" id="Cemail" placeholder="Votre email" onChange={this.emailChange} />
            </div>
            <div className="form-input">
              <input type="password" className="Cpass" id="Cpass" placeholder="Votre mot de passe" onChange={this.passwordChange} />
            </div>
            <button type="submit" className="submit-Connection">Se connecter</button>
          </form>
          {/* <PureModal onClose={() => {
            console.log('handle closing');
            this.setState({ apivisible: false })
            return true;
          }} isOpen={this.state.apivisible} ref="modal">
            <p className="p-sub">Email ou mot de passe incorrect</p>
            <button className="modalBtn"><Link to={{ pathname: "/register" }}>S'inscrire?</Link></button>
          </PureModal> */}
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}
