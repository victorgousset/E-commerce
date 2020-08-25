// Modules //
import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

// Style //
import './Catalogue.css';
import Photo from './articles.jpg';
import Fade from 'react-reveal/Fade';
import { Button, Card, Image } from 'react-bootstrap';

class Catalogue extends React.Component {
  constructor() {
    super();

    this.state = {
      allCate: [],
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/categories").then((data) => {
      const copy = this.state.allCate.slice()

      data.data.categories.map((item) => {
        copy.push(item)
      })

      this.setState({ allCate: copy })
    })
  }

  render() {
    return (
      <main className="categories-main">
        <div className="articles-main_photo">
          <h2 className="article-main_title">Le Grimoire à Remèdes</h2>
          <Image src={ Photo } className="photo-main" fluid />
        </div>
        <ul className="breadcrumb">
          <li className="bread-li"><Link to={{ pathname: "/" }} className="bread-li">Accueil</Link></li>
          <li className="bread-li"> </li>
          <li className="bread-li">Catalogue</li>
        </ul>
        <Fade bottom cascade>
        <div className="categories-container">
          <div className="categories-catalogue">
            <Card>
              <div className="categorie">
                <Card.Img variant="top" alt="categorie" src="https://cdn.bioalaune.com/img/article/thumb/900x500/15199-alternatives_naturelles_aux_antibiotiques_un_livre_de_medecine_douce_par_christopher_vasey.jpg" />
                  <Card.Body>
                    <Card.Title className="categories-title_catalogue">
                      <Link to={{ pathname: "/articles" }} className="details-categorie">Tous nos Remèdes</Link>
                    </Card.Title>
                  </Card.Body>
              </div>
            </Card>
            </div>
            {this.state.allCate.map((item, i) => {
              return (
                <div key={i} className="categories-catalogue">
                <Card>
                  <div className="categorie">
                    <Card.Img variant="top" alt="categorie" src={item.photo} />
                    <Card.Body>
                      <Card.Title className="categories-title_catalogue">
                        <Link to={{ pathname: "/articles/categorie/" + item.id }} className="details-categorie">{item.nom}</Link>
                      </Card.Title>
                    </Card.Body>
                  </div>
                </Card>
                </div>
              )
              })}
              <div className="categories-catalogue">
                <Card>
                  <div className="categorie">
                    <Card.Img variant="top" alt="categorie" src="data:image/jpeg;base64,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MD9muzx2/wBPP5TFOFd32vFZrv1umdGCh1fTtrN4Ry67zY67zknBYHHljnn16u7HRYJbcGJJzVt0oG4YYKtYAAOBy5/dHVd12KO22kusCVXPYzjcFUJVgA49o2bSp+48/OYj2m71KtMwQaNrG57xbqsbCD0ZF3jmNreXJhM14X3f8O05JTTnLDDF7LLCw9G3NzEyGjRVoqqlaqq42hQAFx0wPKNU1Wlae8Xi15/q3DFUEcmr01tx+7L5C4z54nppR2i1NOXe6uz2gqKKNKmDnD2WB94YbgQqqQQmDjORt2WOP9Tj7rTJ7quIX/7xrs88/XW2a4EcuRrZVGc+e78BO7w7uQpQhrNdcWHnQiab8s78TbMRxi8IwXR903Ck5tS9p9bLXOfiFIB/Ke/oeyWgp516GhT6+Ehb9RGZ7UsuosxkcUUAYAAA6AchOUSSqsREBBiccQJ1nISxARJLAREQESRAsRED4azRVXLstqSxeu2xVsXI6HDDE5afSpWMJWqD0VQo/IT6xAkskAQEsRAREQEkskCySBcTlAREQERECSyRiAliICIiAkliAkkCzlAREQESRmBZMziec5AQLERAksRARJEBLEQEmJYgIiSBZMziec5AQLERAksRARJECwIiAkliBMxLECEzjjMuJygQSxJAsREBESQBECWICJJYCIiAJnDrGJzgQSxJAsREBESQECWICJJYCIkJgWJIgWIiAiIgSWJxVcQLLEQEREBJLBgJJFnKAiIgIiIElgziFgWWIgIiICSWQwBMgE4rPpAREQP/2Q==" />
                    <Card.Body>
                      <Card.Title className="categories-title_catalogue">
                        <Link to="/promo" className="details-categorie">Remèdes en promo</Link>
                      </Card.Title>
                    </Card.Body>
                  </div>
                </Card>
                </div>
        </div>
        </Fade>
      </main>
    );
  }
}

export default Catalogue;
