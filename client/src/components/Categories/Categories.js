// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Style //
import './Categories.css';
import { Button, Card } from 'react-bootstrap';

class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      allCategories: []
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/categories/1").then((data) => {
      console.log(data.data);
      
      // const copy = this.state.allCategories.slice()
      // console.log(data);
      // data.data.categories.map((item) => {
      //   copy.push(item)
      // })

      // this.setState({ allCategories: copy })
    })
  }

  render() {
    return (
      <main className="categories-main">
       <h2 className="categories-main_title">Catégories</h2>
       <div className="categories-container">
          {this.state.allCategories.map((item, i) => {
            return (
              <div className="categories">
                <Card>
                  <div key={i} className="categorie">
                    <Card.Img variant="top" alt="categorie" src="https://www.lemonde-des-plantes.com/wp-content/uploads/2015/05/8865865178_a66e9413a0_k-e1431081511427.jpg" />
                    <Card.Body>
                        <Card.Title className="categories-title">
                        <Link to={{ pathname: "/articles/categories/" + item.id }} className="details-categorie">{item.nom}</Link>
                        </Card.Title>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </main>
    );
  }
}

export default Categories;