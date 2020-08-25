// Modules //
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './Admin.css';
import producteurImage from './admin-assets/producter.jpg'
import { Button, Card } from 'react-bootstrap';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    this.props.checkReception()
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <main>
          <Card>
            <div className="admin-features">
              <div className="each-features">
                <Link to={{ pathname: "/admin/articles" }}>
                  <Card.Img variant="top" alt="produit" src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-4-1/1024/open_box4-512.png" />
                  <p className="admin-gestion">Gestion Articles</p>
                </Link>
              </div>
              <div className="each-features">
                <Link to={{ pathname: "/admin/categories" }}>
                  <Card.Img variant="top" alt="categorie" src="https://cdn3.iconfinder.com/data/icons/common-3/100/inbox-2_-512.png" />
                  <p className="admin-gestion">Gestion Categories</p>
                </Link>
              </div>
              <div className="each-features">
                <Link to={{ pathname: "/admin/producteur" }}>
                  <Card.Img variant="top" alt="producteur" src={producteurImage} />
                  <p className="admin-gestion">Gestion Producteurs</p>
                </Link>
              </div>
              <div className="each-features">
                <Link to={{ pathname: "/admin/transporteurs" }}>
                  <Card.Img variant="top" alt="producteur" src="https://image.flaticon.com/icons/svg/57/57490.svg" />
                  <p className="admin-gestion">Gestion Transporteurs</p>
                </Link>
              </div>
              <div className="each-features">
                <Link to={{ pathname: "/admin/commandes/producteur" }}>
                  <Card.Img variant="top" alt="producteur" src="https://mag.aressy.com/wp-content/uploads/2015/03/colis2.jpg" />
                  <p className="admin-gestion">Commandes Producteurs</p>
                </Link>
              </div>
              <div className="each-features">
                <Link to={{ pathname: "/admin/commandes/clients" }}>
                  <Card.Img variant="top" alt="producteur" src="https://cdn0.iconfinder.com/data/icons/iphone-black-people-svg-icons/40/client_list_text_document_user_book_view-512.png" />
                  <p className="admin-gestion">Commandes Clients</p>
                </Link>
              </div>
               <div className="each-features">
                <Link to={{ pathname: "/admin/exports" }}>
                  <Card.Img variant="top" alt="telechargement" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/OOjs_UI_icon_download.svg/1024px-OOjs_UI_icon_download.svg.png" />
                  <p className="admin-gestion">Exports DB (CSV)</p>
                </Link>
              </div>
            </div>
          </Card>
        </main>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default Admin;
