import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./profil.css";

function Cards() {
    const [allCards, setAllCards] = useState([]);
    const [isTrue, setIsTrue] = useState(false);
    const [numberCard, setNumberCard] = useState("");
    const [titulaire, setTitulaire] = useState("");
    const [userId, setUserId] = useState("");
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token).then(res => {
            setAllCards(res.data.carte_bleues);
            setUserId(res.data.user.id);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function deleteCard(id) {
        axios.post("http://127.0.0.1:8000/carte_bleues/delete/" + id).then(res => {
            console.log(res);
            axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token).then(res => {
                setAllCards(res.data.carte_bleues);
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    }

    function onChange(e) {
        let res = e.target.value.trim();
        let val = res.charAt(0).toUpperCase() + res.substring(1).toLowerCase();
        setTitulaire(val);
    }

    function onnChangeCard(e) {
        setNumberCard(e.target.value);
    }

    function submitCard(e) {
        e.preventDefault();
        let errorTitulaire = false;
        let errorCard = false;
        let errorMonth = false;
        let errorYear = false;
        let date = new Date().getYear();
        let error = {};

        if (titulaire == "" || !titulaire.match(/^[a-zA-ZÀ-ÿ]+(([a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/)) {
            errorTitulaire = true;
            error.titulaire = "Titulaire invalide";
        } else {
            errorTitulaire = false;
            error.titulaire = "";
        }
        if (numberCard.length != 16) {
            errorCard = true;
            error.card = "Numero de carte invalide";
        } else {
            errorCard = false;
        }
        if (month == undefined || month.length === undefined || month == "" || month < 1 || month > 12) {
            errorMonth = true;
            error.month = "Mois invalid";
        } else if (month.length != 2) {
            errorMonth = true;
            error.month = "Mois invalid";
        } else {
            errorMonth = false;
            error.month = "";
        }
        if (year == undefined || year.length === undefined || year == "" || year < (date - 100)) {
            errorYear = true;
            error.year = "Année invalid";
        } else {
            errorYear = false;
            error.year = "";
        }

        if (!errorTitulaire && !errorCard && !errorMonth && !errorYear) {
            const data = {
                token: localStorage.token,
                date: month + "/" + year,
                numero: numberCard,
                titulaire: titulaire
            }
            axios.post("http://127.0.0.1:8000/carte_bleues/store/", data).then(res => {
                console.log(res);
                setIsTrue(false);
                axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token).then(res => {
                    setAllCards(res.data.carte_bleues);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        } else {
            alert(error.titulaire + "\n" + error.card + "\n" + error.month + "\n" + error.year);
        }
    }

    return (
        <main className="profil-carte">
            <h1 className="text-center mt-4 compte-soustitre">Cartes Bancaires</h1>
            <div className="container my-5 fondProfile">
                <div className="btn-div-nouvelle-carte">
                    <button className="btn-nouvelle-carte" onClick={() => setIsTrue(!isTrue)}>Ajouter une Carte</button>
                </div>
                {isTrue &&
                    <div className="divAddCar">
                        <form onSubmit={submitCard} className="FormCard">
                            <div className="">
                                <label className="carte-label">Titulaire de la carte </label>
                                <input className="input-prix" type="text" onChange={onChange} />
                            </div>
                            <div className="">
                                <label className="carte-label">Numero de carte </label>
                                <input className="input-prix" type="number" onChange={onnChangeCard} />
                            </div>
                            <div className="">
                                <label className="carte-label">Date </label>
                                <input className="input-prix dateCard" placeholder="mm" type="number" onChange={(e) => setMonth(e.target.value)} />
                                <span><b> / </b></span>
                                <input className="input-prix dateCard" placeholder="yy" type="number" onChange={(e) => setYear(e.target.value)} />
                            </div>
                            <button className="btn-carte-ajout">Ajouter</button>
                        </form>
                    </div>
                }
                {allCards && allCards.length > 0 ? allCards.map(res =>
                    <div key={res.id} className='divCard'>
                        <div>
                            <h4 className="carte-info-detail"><b className="carte-label">Titulaire </b> {res.titulaire} </h4>
                            <h4 className="carte-info-detail"><b className="carte-label">Date d'expiration </b> {res.date} </h4>
                            <h4 className="carte-info-detail"><b className="carte-label">Numéro </b> {res.numero} </h4>
                        </div>
                        <div>
                            <button className="btn-delete-card" onClick={e => { deleteCard(res.id) }}>Supprimer cette carte</button>
                        </div>
                    </div>
                ) : <h4 className="text-center">Pas encore de carte connue, entrez en une nouvelle !</h4>}
            </div>
        </main>
    )
}

export default Cards;