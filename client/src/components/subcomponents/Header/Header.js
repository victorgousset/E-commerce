// Modules //
import React from 'react';
import axios from 'axios';
import { NavLink, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


// Components //
import PanierDropdown from "../PanierDropdown/PanierDropdown";

// Style //
import './Header.css';
import Account from '../PanierDropdown/account.png';
import Cart from '../PanierDropdown/cart.png';
import Search from './search.png';
import Logo from './logoDYMed.png';
import { Navbar, Nav, DropdownButton, Dropdown, Image } from 'react-bootstrap';


class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      value: null,
      Articles: [],
      min: 0,
      max: 5,
      searchBy: "nom",
    }
    this.logout = this.logout.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.countClick = this.countClick.bind(this);
  }

  countClick() {
    this.setState({ countClick: this.state.count += 1 })
  }

  logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  ValueChange = event => {
    //event.preventDefault()
    this.setState({ value: event.target.value });
    console.log(this.state.value)

    if (event.target.value.length === 0) {
      this.setState({Articles: []})
    } else {
      if (this.state.searchBy === "prop") {
        axios.post('http://127.0.0.1:8000/search/prop', { value: this.state.value }, {})
            .then(res => {
              const copy = this.state.Articles.slice()
  
              if(res.data.result !== "Aucun résultat") {
                res.data.result.map((item) => {
                  copy.push(item)
                })
                this.setState({ Articles: res.data.result })
              } else {
                this.setState({Articles: []})
              }
  
              console.log(this.state.Articles)
            }).catch(error => {
          console.log(error)
        })
      } else if (this.state.searchBy === "nom") {
        axios.post('http://127.0.0.1:8000/searchbar', { value: this.state.value }, {})
            .then(res => {
              const copy = this.state.Articles.slice()
  
              if(res.data.result !== "Aucun résultat") {
                res.data.result.map((item) => {
                  copy.push(item)
                })
                this.setState({ Articles: res.data.result })
              } else {
                this.setState({Articles: []})
              }
  
              console.log(this.state.Articles)
            }).catch(error => {
          console.log(error)
        })
      }
    }
  }

  handleSelect(e) {
    this.setState({ searchBy: e.target.value })
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <header>
          <input type="text" value={this.state.value} onChange={this.ValueChange} className="Input_searchbar" style={{ width: "370px" }} placeholder="Rechercher..." />
          <select className="search-by" onChange={this.handleSelect}>
            <option value="nom">Nom</option>
            <option value="prop">Propriétés</option>
          </select>
          <div className="result_search">
            {
              this.state.Articles.map((item, i) => {
                if (i >= this.state.min && i <= this.state.max) {
                  return (
                    <ul>
                      <li><img src={item.photo} alt="Photo_produit" width="50" /> <a
                        href={"/articles/" + item.id}>{item.titre}</a></li><br />
                    </ul>
                  )
                }
              })
            }
          </div>
          <Navbar className="nav-header">
            <img
              src={Logo}
              width="120" height="120"
              className="logo"
              alt="logo"
            />
            <Navbar.Brand className="nav-title"><Link className="title-link" to={{ pathname: "/" }}>D.Y.MED</Link></Navbar.Brand>
            <Navbar.Text className="nav-slogan">Le meilleur des remèdes</Navbar.Text>
            <Nav className="mr-auto">
              {/* <a href="/searchbar"><img src={Search} className="search-bar_accueil" /></a> */}
              {/* <Nav.Link className="nav-link" href="/">Accueil</Nav.Link> */}
              <Link to={{ pathname: "/admin" }} className="animation-bar">Portail Admin</Link>
              <Link to={{ pathname: "/catalogue" }} className="animation-bar">Le Grimoire</Link>
              <Link to={{ pathname: "/subscribe" }} className="animation-bar">l'Aventure</Link>

            </Nav>
            <div className="nav-container">
              <div>
                <DropdownButton id="dropdown-basic-button"
                  title={
                    <div>
                      <img className="account-image"
                        src={Account}
                        alt="compte"
                      />
                    </div>
                  }
                >
                  <Dropdown.Item className="drop-compte"><Link to={{ pathname: "/profile" }}>Votre compte</Link></Dropdown.Item>
                  <Dropdown.Item className="drop-compte"><Link to={{ pathname: "/commande" }}>Vos Commandes</Link></Dropdown.Item>
                  <Dropdown.Item className="drop-logout" onClick={this.logout}>Logout</Dropdown.Item>
                </DropdownButton>
              </div>
              <div>
                <DropdownButton
                  onClick={this.countClick}
                  alignRight
                  title={
                    <div>
                      <img className="account-image"
                        src={Cart}
                        alt="panier"
                      />
                    </div>
                  }
                  id="dropdown-menu-align-right"
                >
                  <PanierDropdown token={this.props.token} count={this.state.count} />
                </DropdownButton>
              </div>
            </div>
          </Navbar>
        </header>

      )
    } else if (this.props.isUser === true) {
      return (
        <header>
          <input type="text" value={this.state.value} onChange={this.ValueChange} className="Input_searchbar" style={{ width: "370px" }} placeholder="Rechercher..." />
          <select className="search-by" onChange={this.handleSelect}>
            <option value="nom">Nom</option>
            <option value="prop">Propriétés</option>
          </select>
          <div className="result_search">
            {
              this.state.Articles.map((item, i) => {
                if (i >= this.state.min && i <= this.state.max) {
                  return (
                    <ul>
                      <li><img src={item.photo} alt="Photo_produit" width="50" /> <a
                        href={"/articles/" + item.id}>{item.titre}</a></li><br />
                    </ul>
                  )
                }
              })
            }
          </div>
          <Navbar className="nav-header">
            <img
              src={Logo}
              width="120" height="120"
              className="logo"
              alt="logo"
            />
            <Navbar.Brand className="nav-title"><Link className="title-link" to={{ pathname: "/" }}>D.Y.MED</Link></Navbar.Brand>
            <Navbar.Text className="nav-slogan">Le meilleur des remèdes</Navbar.Text>
            <Nav className="mr-auto">
              {/* <a href="/searchbar"><img src={Search} className="search-bar_accueil" /></a> */}
              {/* <Nav.Link className="nav-link" href="/">Accueil</Nav.Link> */}
              <Link to={{ pathname: "/catalogue" }} className="animation-bar">Le Grimoire</Link>
              <Link to={{ pathname: "/subscribe" }} className="animation-bar">l'Aventure</Link>

            </Nav>
            <div className="nav-container">
              <div>
                <DropdownButton id="dropdown-basic-button"
                  title={
                    <div>
                      <img className="account-image"
                        src={Account}
                        alt="compte"
                      />
                    </div>
                  }
                >
                  <Dropdown.Item href="/profile" className="drop-compte">Votre Compte</Dropdown.Item>
                  <Dropdown.Item href="/commande" className="drop-compte">Vos Commandes</Dropdown.Item>
                  <Dropdown.Item className="drop-logout" onClick={this.logout}>Logout</Dropdown.Item>
                </DropdownButton>
              </div>
              <div>
                <DropdownButton
                  onClick={this.countClick}
                  alignRight
                  title={
                    <div>
                      <img className="account-image"
                        src={Cart}
                        alt="panier"
                      />
                    </div>
                  }
                  id="dropdown-menu-align-right"
                >
                  <PanierDropdown token={this.props.token} count={this.state.count} />
                </DropdownButton>
              </div>
            </div>
          </Navbar>
        </header>
      )
    } else {
      return (
        <header>
          <input type="text" value={this.state.value} onChange={this.ValueChange} className="Input_searchbar" style={{ width: "370px" }} placeholder="Rechercher..." />
          <select className="search-by" onChange={this.handleSelect}>
            <option value="nom">Nom</option>
            <option value="prop">Propriétés</option>
          </select>
          <div className="result_search">
            {
              this.state.Articles.map((item, i) => {
                if (i >= this.state.min && i <= this.state.max) {
                  return (
                    <ul>
                      <li><img src={item.photo} alt="Photo_produit" width="50" /> <a
                        href={"/articles/" + item.id}>{item.titre}</a></li><br />
                    </ul>
                  )
                }
              })
            }
          </div>
          <Navbar className="nav-header">
            <img
              src={Logo}
              width="120" height="120"
              className="logo"
              alt="logo"
            />
            <Navbar.Brand className="nav-title"><Link className="title-link" to={{ pathname: "/" }}>D.Y.MED</Link></Navbar.Brand>
            <Navbar.Text className="nav-slogan">Le meilleur des remèdes</Navbar.Text>
            <Nav className="mr-auto">
              {/* <a href="/searchbar"><img src={Search} className="search-bar_accueil" /></a> */}
              {/* <Nav.Link className="nav-link" href="/">Accueil</Nav.Link> */}
              <Link to={{ pathname: "/catalogue" }} className="animation-bar">Le Grimoire</Link>
            </Nav>
            <div className="nav-container">
              <div>
                <DropdownButton id="dropdown-basic-button"
                  title={
                    <div>
                      <img className="account-image"
                        src={Account}
                        alt="compte"
                      />
                    </div>
                  }
                >
                  <Link className="login-link" to={{ pathname: "/login" }}>Se Connecter</Link><br />
                  <Link className="register-link" to={{ pathname: "/register" }}>Inscrivez Vous</Link>
                </DropdownButton>
              </div>
              <div>
                <DropdownButton
                  onClick={this.countClick}
                  alignRight
                  title={
                    <div>
                      <img className="account-image"
                        src={Cart}
                        alt="panier"
                      />
                    </div>
                  }
                  id="dropdown-menu-align-right"
                >
                  <PanierDropdown token={this.props.token} count={this.state.count} />
                </DropdownButton>
              </div>
            </div>
          </Navbar>
        </header>
      )
    }
  }
}

export default Header;
