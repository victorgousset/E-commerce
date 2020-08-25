// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components //
import Header from './components/subcomponents/Header/Header';
import Footer from './components/subcomponents/Footer/Footer';
import Accueil from './components/Accueil/Accueil';
import Admin from './components/Admin/Admin';
import Catalogue from './components/Catalogue/Catalogue'
import Articles from './components/Articles/Articles';
import ArticlesDetails from './components/ArticlesDetails/ArticlesDetails';
import ArticlesModif from './components/Admin/AdminArticles/ArticlesModif/ArticlesModif';
import Inscription from './components/Inscription/Inscription';
import Connection from './components/Connection/Connection';
import AdminArticles from './components/Admin/AdminArticles/AdminArticles';
import AdminCategories from './components/Admin/AdminCategories/AdminCategories';
import AdminProducteur from './components/Admin/AdminProducteur/AdminProducteur';
import ProducteurModif from './components/Admin/AdminProducteur/ProducteurModif/ProducteurModif';
import CategoriesModif from './components/Admin/AdminCategories/CategoriesModif/CategoriesModif';
import DetailPanier from './components/DetailPanier/DetailPanier';
import FormatModif from './components/Admin/AdminArticles/ArticlesModif/FormatModif/FormatModif';
import CommandesProducteurs from './components/Admin/AdminCommandes/CommandesProducteurs/CommandesProducteurs';
import HistoriqueProducteurs from './components/Admin/AdminCommandes/CommandesProducteurs/Historique/Historique';
import Searchbar from "./components/subcomponents/Searchbar/Searchbar";
import AdminTransporteurs from './components/Admin/AdminTransporteurs/AdminTransporteurs';
import TransporteursModif from './components/Admin/AdminTransporteurs/TransporteursModif/TransporteursModif';
import ExpeditionsModif from './components/Admin/AdminTransporteurs/TransporteursModif/ExpeditionsModif/ExpeditionsModif';
import Commande from './components/Commande/Commande';
import Recap from './components/RecapCommande/RecapCommande';
import Payment from './components/Payment/Payment';
import Promo from './components/Promo/Promo';
import CommandesClients from './components/Admin/AdminCommandes/CommandesClients/CommandesClients';
import Subscribe from './components/subscribe/subscribe';
import Profil from './components/ProfilUser/profil';
import VosCommandes from './components/VosCommandes/VosCommandes';
import AdminExports from './components/Admin/AdminExports/AdminExports';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUser: true,
      isAdmin: true,
      token: "",
    }
    this.checkReception = this.checkReception.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/check/" + localStorage.token).then((res) => {
      if (res.data.role === "admin") {
        this.setState({ 
          isAdmin: true,
          isUser: false, 
          token: res.data.token,
        })
        localStorage.setItem('token', res.data.token);
      } else if (res.data.role === "user") {
        this.setState({ 
          isUser: true,
          isAdmin: false,
          token: res.data.token,
        })
        localStorage.setItem('token', res.data.token);
      } else if (res.data.role === "guest") {
        this.setState({ 
          isUser: false,
          isAdmin: false,
          token: res.data.token,
        })
        localStorage.setItem('token', res.data.token);
      }
    })
  }
  
  checkReception() {
    axios.get("http://127.0.0.1:8000/commandeProd/test").then((res) => {
    })
  }

  render() {
    return (
      <Router>
        <Header isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />
        <Switch>
          {/* Accueil */}
          <Route path={"/"} exact render={(props) => <Accueil {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />

          {/* Portail Admin */}
          <Route path={"/admin"} exact render={(props) => <Admin {...props} checkReception={this.checkReception} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/articles"} exact render={(props) => <AdminArticles {...props} checkReception={this.checkReception} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/articles/modif/:id"} exact render={(props) => <ArticlesModif checkReception={this.checkReception} {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/categories"} exact render={(props) => <AdminCategories {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/categories/modif/:id"} exact render={(props) => <CategoriesModif {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/producteur"} exact render={(props) => <AdminProducteur {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/producteur/modif/:id"} exact render={(props) => <ProducteurModif {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/commandes/producteur"} exact render={(props) => <CommandesProducteurs {...props} checkReception={this.checkReception} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/format/modif/:id"} exact render={(props) => <FormatModif {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/commandes/producteur/historique"} exact render={(props) => <HistoriqueProducteurs {...props} checkReception={this.checkReception} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/transporteurs"} exact render={(props) => <AdminTransporteurs {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/transporteurs/modif/:id"} exact render={(props) => <TransporteursModif {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/expeditions/modif/:id"} exact render={(props) => <ExpeditionsModif {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/commandes/clients"} exact render={(props) => <CommandesClients {...props} checkReception={this.checkReception} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/admin/exports"} exact render={(props) => <AdminExports {...props} checkReception={this.checkReception} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />


          {/* Articles/Categories */}
          <Route path={"/articles"} exact render={(props) => <Articles {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/catalogue"} exact render={(props) => <Catalogue {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/articles/:id"} exact render={(props) => <ArticlesDetails {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/articles/categorie/:id"} exact render={(props) => <Articles {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/panier"} exact render={(props) => <DetailPanier {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/panier/commande"} exact render={(props) => <Commande {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/panier/commande/recap"} exact render={(props) => <Recap {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/subscribe"} exact render={(props) => <Subscribe {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />


          {/* Login/Register */}
          <Route path={"/register"} exact render={(props) => <Inscription {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/login"} exact render={(props) => <Connection {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/panier"} exact render={(props) => <DetailPanier {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/searchbar"} exact render={(props) => <Searchbar {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/panier/commande/payment"} exact render={(props) => <Payment {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/promo"} exact render={(props) => <Promo {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          {/* Profile */}
          <Route path={"/profile"} exact render={(props) => <Profil {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
          <Route path={"/commande"} exact render={(props) => <VosCommandes {...props} isAdmin={this.state.isAdmin} isUser={this.state.isUser} token={this.state.token} />} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
