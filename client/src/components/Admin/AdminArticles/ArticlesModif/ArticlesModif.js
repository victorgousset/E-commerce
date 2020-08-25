// Modules //
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Style //
import './ArticlesModif.css';
import { AiTwotoneSetting } from 'react-icons/ai';

class ArticlesModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleID: window.location.href.split("/")[6],
      allCategories: [],
      allCaract: [],
      imgUpload: "",
      nameValue: "",
      priceValue: "",
      cateValue: "",
      descValue: "",
      formatValue: "",
      proprieteValue: "",
      compoValue: "",
      stocksValue: "",
    }
    this.getBase64 = this.getBase64.bind(this);
    this.sendChanges = this.sendChanges.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addFormat = this.addFormat.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.checkReception()
    axios.get("http://127.0.0.1:8000/articles/" + this.state.articleID).then((res) => {
      const copy = this.state.allCaract.slice()

      res.data.details.map((item) => {
        copy.push(item)
      })

      this.setState({
        allCaract: copy,
        nameValue: res.data.article.titre,
        imgUpload: res.data.article.photo,
        cateValue: res.data.article.categories_id,
        descValue: res.data.article.description,
        proprieteValue: res.data.article.proprietes,
        compoValue: res.data.article.compo,
      })
    })

    axios.get("http://127.0.0.1:8000/categories").then((data) => {
      const copy = this.state.allCategories.slice()

      data.data.categories.map((item) => {
        copy.push(item)
      })

      this.setState({ allCategories: copy })
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
      console.log(reader.result);

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
  }

  handleInputChange(e) {
    const value = e.target.value;

    if (e.target.className === "input-name") {
      this.setState({ nameValue: value })
    } else if (e.target.className === "input-price") {
      this.setState({ priceValue: value })
    } else if (e.target.className === "input-desc") {
      this.setState({ descValue: value })
    } else if (e.target.className === "input-format") {
      this.setState({ formatValue: value })
    } else if (e.target.className === "input-compo") {
      this.setState({ compoValue: value })
    } else if (e.target.className === "input-propriete") {
      this.setState({ proprieteValue: value })
    } else if (e.target.className === "input-stock") {
      this.setState({ stocksValue: value })
    }
  }

  handleSelectChange(e) {
    this.setState({ cateValue: e.target.value })
  }

  onDelete(e) {
    const copy = this.state.allCaract.slice();

    axios.post("http://127.0.0.1:8000/detail/delete/" + e.target.attributes.value.value).then((res) => {
      copy.map((item, i) => {
        if (item.id.toString() === res.data.id) {
          copy.splice(i, 1)
        }
      })

      this.setState({ allCaract: copy })
    })
  }

  sendChanges() {
    const sendArticles = {
      params: {
        titre: this.state.nameValue,
        categories_id: this.state.cateValue,
        description: this.state.descValue,
        proprietes: this.state.proprieteValue,
        compo: this.state.compoValue,
        photo: this.state.imgUpload,
      }
    }

    axios.post("http://127.0.0.1:8000/articles/update/" + this.state.articleID, sendArticles).then((res) => {
      this.props.history.push('/admin/articles')
    })
  }

  addFormat() {
    const copy = this.state.allCaract.slice();
    const data = {
      articles_id: this.state.articleID,
      formats: this.state.formatValue,
      prix: this.state.priceValue,
      stocks: this.state.stocksValue
    }

    axios.post("http://127.0.0.1:8000/detail/store", data).then((res) => {
      if (res.data.result === "creation_ok") {
        data["id"] = res.data.id;
        copy.push(data);

        this.setState({ allCaract: copy })
      }
    })
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div className="admin_modif">
          <table className="table-modif_admin">
            <tbody>
              <tr>
                <th>Id</th>
                <th>Id Article</th>
                <th>Format</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Promo</th>
                <th>Actions</th>
              </tr>
              {this.state.allCaract.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.articles_id}</td>
                    <td>{item.format}</td>
                    <td>{item.prix}</td>
                    <td>{item.stocks}</td>
                    <td>{item.promo}</td>
                    <td>
                      <p className="action-icons" value={item.id} onClick={this.onDelete}>Delete</p>
                      <Link to={{ pathname: "/admin/format/modif/" + item.id }}><AiTwotoneSetting className="action-icons" /></Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="modif_article">
            <h3 className="titre-modif">Modifier un Article</h3>
            <div className="div_modif_nom">
              <label className="admin-label">Nom </label>
              <input className="input-name" onChange={this.handleInputChange} value={this.state.nameValue} type="text" />
            </div>
            <div className="div_modif_cate">
              <label className="admin-label">Catégories </label>
              <select value={this.state.cateValue} onChange={this.handleSelectChange}>
                {this.state.allCategories.map((item, i) => {
                  return (
                    <option key={i} value={item.id}>{item.id + " - " + item.nom}</option>
                  )
                })}
              </select>
            </div>
            <div className="div_modif_descr">
              <label className="admin-label">Description </label>
              <input className="input-desc" onChange={this.handleInputChange} value={this.state.descValue} type="text" />
            </div>
            <div className="div_modif_compo">
              <label className="admin-label">Composition </label>
              <input className="input-compo" onChange={this.handleInputChange} value={this.state.compoValue} type="text" />
            </div>
            <div className="caract-format">
              <label className="admin-label">Propriétés </label>
              <input className="input-propriete" onChange={this.handleInputChange} value={this.state.proprieteValue} type="text" />
            </div>
            <div className="div_modif_photo">
              <label className="admin-label">Image </label>
              <input onChange={this.getBase64} type="file" />
            </div>
            <br /><button onClick={this.sendChanges} className="bouton-modif-admin">Valider les Changements</button>
            <br /><br /><br /><h3 className="titre-modif">Ajout de Format: </h3>
            <div className="caract-format">
              <label className="admin-label">Format </label>
              <input className="input-format" onChange={this.handleInputChange} value={this.state.formatValue} type="text" />
            </div>
            <div className="caract-format">
              <label className="admin-label">Prix </label>
              <input className="input-price" onChange={this.handleInputChange} value={this.state.priceValue} type="text" />
            </div>
            <div className="caract-format">
              <label className="admin-label">Quantité </label>
              <input className="input-stock" onChange={this.handleInputChange} value={this.state.stocksValue} type="text" />
            </div>
            <button onClick={this.addFormat} className="bouton-modif-admin">Ajouter Format</button>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default ArticlesModif;