// Modules //
import React from 'react';
import axios from 'axios';

// Style //
import './Searchbar.css';
import * as token from "pretty-format";
import { Button, Card, Image } from "react-bootstrap";
import {Link} from "react-router-dom";
import Photo from './articles.jpg';
import Fade from 'react-reveal/Fade';




export default class Searchbar extends React.Component {
    state = {
        value: null,
        Articles: []
    }

    ValueChange = event => {
        //event.preventDefault()

        this.setState({ value: event.target.value.trim() });
        console.log(this.state.value)
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

    // AFFICHAGE //
    render() {
        if (this.state.Articles.length === 0) {
            return (
                <div className="div_searchbar">
                    <div className="articles-main_photo">
                        <h2 className="article-main_title">Recherche</h2>
                        <Image src={ Photo } className="photo-main" fluid />
                    </div>
                    <input type="text" className="value_search" placeholder="Nom de l'article" onChange={this.ValueChange} />
                </div>
            )
        } else {
            return (
                <div className="div_searchbar">
                    <div className="articles-main_photo">
                        <h2 className="article-main_title">Resultats</h2>
                        <Image src={ Photo } className="photo-main" fluid />
                    </div>
                    <input type="text" className="value_search" placeholder="Nom de l'article" onChange={this.ValueChange} value={this.state.value} />
                    <h5 className="result-text">Résultats pour : "{this.state.value}"</h5>
                    <ul className="result">
                        {
                                this.state.Articles.map((item, i) => {
                                return (
                                    <div key={i} className="articles">
                                        <Card>
                                            <div className="article">
                                                <Card.Img variant="top" alt="produit" src={item.photo} />
                                                <Card.Body>
                                                    <Card.Title className="articles-title">{item.titre}</Card.Title>
                                                    <Link to={{ pathname: "/articles/" + item.id }} className="details">Details >></Link>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            })

                        }
                    </ul>
                </div>
            )
        }
    }
};
