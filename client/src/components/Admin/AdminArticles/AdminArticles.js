// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './AdminArticles.css';
import { AiFillDelete, AiTwotoneSetting, AiTwotoneEye } from 'react-icons/ai';
import { Button, Container, Row, Col, Carousel } from 'react-bootstrap';

class AdminArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      RuptureArticle: [],
      allArticles: [],
      allCategories: [],
      allProducteur: [],
      imgUpload: null,
      nameValue: "",
      priceValue: "",
      cateValue: "1",
      descValue: "",
      utiliteValue: "",
      formatValue: "",
      proprieteValue: "",
      compoValue: "",
      prodValue: "1",
    }

    this.getBase64 = this.getBase64.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAvant = this.onAvant.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
    this.props.checkReception()
    axios.get("http://127.0.0.1:8000/articles").then((data) => {
      const copy = this.state.allArticles.slice()

      data.data.articles.map((item) => {
        copy.push(item)
      })

      this.setState({ allArticles: copy })
    })

    axios.get("http://127.0.0.1:8000/getRuptureArticle").then((data) => {
      const copy = this.state.RuptureArticle.slice()

      data.data.articles.map((item) => {
        copy.push(item)
      })

      this.setState({ RuptureArticle: copy })
      console.log(data);
    })

    axios.get("http://127.0.0.1:8000/categories").then((data) => {
      const copy = this.state.allCategories.slice()

      data.data.categories.map((item) => {
        copy.push(item)
      })
      this.setState({ allCategories: copy })
    })

    axios.get("http://127.0.0.1:8000/producteurs").then((data) => {
      const copy = this.state.allProducteur.slice()

      data.data.producteurs.map((item) => {
        copy.push(item)
      })

      this.setState({ allProducteur: copy })
    })
  }

  onDelete(e) {
    const copy = this.state.allArticles.slice()

    axios.post("http://127.0.0.1:8000/articles/delete/" + e.target.attributes.value.value).then((res) => {
      copy.map((item, i) => {
        if (item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })

      this.setState({ allArticles: copy })
    })
  }

  onAvant(e) {
    const copy = this.state.allArticles.slice();

    const param = {
      params: {
        devant: 1
      }
    }

    axios.post("http://127.0.0.1:8000/articles/onAvant/" + e.target.attributes.value.value, param).then((res) => {
      copy.map((item, i) => {
        if (item.id.toString() === res.data.id) {
          item.devant = 1
        }
      })

      this.setState({ allArticles: copy })
    })
  }

  sendData() {
    const copy = this.state.allArticles.slice()
    const sendArticles = {
      titre: this.state.nameValue,
      categories_id: this.state.cateValue,
      producteurs_id: this.state.prodValue,
      description: this.state.descValue,
      // utilisation: this.state.utiliteValue,
      compo: this.state.compoValue,
      proprietes: this.state.proprieteValue,
      photo: this.state.imgUpload,
    }
    
    axios.post("http://127.0.0.1:8000/articles/store", sendArticles).then((res) => {
      if (res.data.result === "creation_ok") {
        sendArticles["id"] = res.data.id;
        sendArticles["vues"] = 0
        copy.push(sendArticles);

        this.setState({ allArticles: copy })
      }
    })
  }

  getBase64(e) {
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        imgUpload: reader.result
      })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-admin input-name") {
      this.setState({ nameValue: value })
    } else if (e.target.className === "input-admin input-price") {
      this.setState({ priceValue: value })
    } else if (e.target.className === "input-admin input-desc") {
      this.setState({ descValue: value })
    } else if (e.target.className === "input-admin input-format") {
      this.setState({ formatValue: value })
    } else if (e.target.className === "input-admin input-compo") {
      this.setState({ compoValue: value })
    } else if (e.target.className === "input-admin input-util") {
      this.setState({ utiliteValue: value })
    } else if (e.target.className === "input-admin input-propriete") {
      this.setState({ proprieteValue: value })
    }
  }

  handleSelectChange(e) {
    if (e.target.className === "admin-prod") {
      this.setState({ prodValue: e.target.value })
    } else if (e.target.className === "admin-cate") {
      this.setState({ cateValue: e.target.value })
    }

  }

  render() {
    let paginatedItems = [];
    const finalItem = [];

    if (this.props.isAdmin === true) {
      for (const [i, item] of this.state.allArticles.entries()) {
        paginatedItems.push(
          <tr key={i}>
            <td className="admin-table_td_id">{item.id}</td>
            <td className="admin-table_td">{item.categories_id}</td>
            <td className="admin-table_td">{item.producteurs_id}</td>
            <td className="admin-table_td"><img className="table-img" src={item.photo}></img></td>
            <td className="admin-table_td">{item.titre}</td>
            <td className="admin-table_td"><div className="descriptionReduce">{item.description}</div></td>
            <td className="admin-table_td"><div className="descriptionReduce">{item.proprietes}</div></td>
            <td className="admin-table_td"><div className="descriptionReduce">{item.compo}</div></td>
            <td className="admin-table_td">{item.vues}</td>
            <td className="admin-table_td">
              <p className="action-icons" value={item.id} onClick={this.onDelete}>Delete</p>
              <p className="action-icons" value={item.id} onClick={this.onAvant}>Mettre en avant</p>
              <Link to={{ pathname: "/admin/articles/modif/" + item.id }}>
                <AiTwotoneSetting className="action-icons" />
              </Link>
              <Link to={{ pathname: "/articles/" + item.id }}><AiTwotoneEye className="action-icons" /></Link>
            </td>
          </tr>
        )
        if (paginatedItems.length === 5) {
          finalItem.push(paginatedItems);
          paginatedItems = [];
        }
      }

      finalItem.push(paginatedItems);
      paginatedItems = [];
      console.log(finalItem)

      return (
        <div className="admin-article">
          <center>
            <Container>
              {/* <Row> */}
              <Carousel className="adminp-carousel">
                {finalItem.map((value, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <table className="admin-table_article">
                        <tbody>
                          <tr className="admin-table_tr">
                            <th>ID</th>
                            <th>ID Catégorie</th>
                            <th>ID Producteurs</th>
                            <th>Photo</th>
                            <th>Produit</th>
                            <th>Description</th>
                            <th>Propriétés</th>
                            <th>Composition</th>
                            <th>Vues</th>
                            <th>Actions</th>
                          </tr>
                          {value}
                        </tbody>
                      </table>
                    </Carousel.Item>
                  )
                })}
              </Carousel>
              <Col>
                <br /><br /><h3 className="admin-article_title">Article en rupture de stock</h3><br />
                <table className="admin-table_article">
                  <tbody>
                    <tr className="admin-table_tr">
                      <th>Id</th>
                      <th>Id Catégorie</th>
                      <th>Photo</th>
                      <th>Produit</th>
                      <th>Actions</th>
                    </tr>
                    {this.state.RuptureArticle.map((product, i) => {
                      return (
                        <tr key={i}>
                          <td className="admin-table_td_id">{product.id}</td>
                          <td className="admin-table_td">{product.articles.categories_id}</td>
                          <td className="admin-table_td"><img className="table-img" src={product.articles.photo}></img></td>
                          <td className="admin-table_td">{product.articles.titre} - {product.format}</td>
                          <td className="admin-table_td">
                            <Link to={{ pathname: "/admin/format/modif/" + product.id }} className="admin-commander">Commander</Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Col>
              <Col>
                <div className="admin-article_form">
                  <br /><br /><h3 className="admin-article_title">Ajouter un Article</h3><br />
                  <div className="ajout_article">
                    <div>
                      <div className="div_ajout_cate">
                        <h4 className="admin-article_title_h4">Informations</h4>
                        <label className="admin-label">Catégories: </label>
                        <select className="admin-cate" value={this.state.cateValue} onChange={this.handleSelectChange}>
                          {this.state.allCategories.map((item, i) => {
                            return (
                              <option key={i} value={item.id}>{item.id + " - " + item.nom}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="div_ajout_prod">
                        <label className="admin-label">Producteurs: </label>
                        <select className="admin-prod" value={this.state.prodValue} onChange={this.handleSelectChange}>
                          {this.state.allProducteur.map((item, i) => {
                            return (
                              <option key={i} value={item.id}>{item.id + " - " + item.nom}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="div_ajout_nom">
                        <label className="admin-label">Nom</label>
                        <input className="input-admin input-name" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
                      </div>
                      <div className="div_ajout_descr">
                        <label className="admin-label">Description</label>
                        <input className="input-admin input-desc" onChange={this.handleInputChange} value={this.state.descValue} type="text" />
                      </div>
                      {/* <div className="div_ajout_descr">
                        <label className="admin-label">Utilisation</label>
                        <input className="input-admin input-util" onChange={this.handleInputChange} value={this.state.utiliteValue} type="text" />
                      </div> */}
                      <div className="div_ajout_compo">
                        <label className="admin-label">Composants</label>
                        <input className="input-admin input-compo" onChange={this.handleInputChange} type="text" />
                      </div>
                      <div className="div_ajout_propriete">
                        <label className="admin-label">Propriétés</label>
                        <input className="input-admin input-propriete" onChange={this.handleInputChange} type="text" />
                      </div>
                      <div className="div_ajout_photo">
                        <label className="admin-label">Image</label>
                        <input onChange={this.getBase64} type="file" />
                      </div>
                    </div>
                  </div>
                  <br /><button className="admin-button" onClick={this.sendData}>Valider</button>
                </div>
              </Col>
              {/* </Row> */}
            </Container>
          </center>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default AdminArticles;