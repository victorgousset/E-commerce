import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilAdresse() {
    const [userId, setUserId] = useState("");
    const [idAdresse, setIdAdresse] = useState("");
    const [userNom, setUserNom] = useState("");
    const [userPays, setUserPays] = useState("");
    const [userVille, setUserVille] = useState("");
    const [changeNom, setChangeNom] = useState("");
    const [userPrenom, setUserPrenom] = useState("");
    const [userPostal, setUserPostal] = useState("");
    const [changePays, setChangePays] = useState("");
    const [changeVille, setChangeVille] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [changePostal, setChangePostal] = useState("");
    const [changePrenom, setChangePrenom] = useState("");
    const [changeAdress, setChangeAdress] = useState("");
    const [noAdresse, setNoAdresse] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token).then(res => {
            setUserId(res.data.user.id);
            if (res.data.adresses == null) {
                setNoAdresse(true);
            } else {
                setUserNom(res.data.adresses.nom);
                setIdAdresse(res.data.adresses.id);
                setUserPays(res.data.adresses.pays);
                setUserVille(res.data.adresses.ville);
                setUserPostal(res.data.adresses.postal);
                setUserAddress(res.data.adresses.adresse);
                setUserPrenom(res.data.adresses.prenom);

                setChangeNom(res.data.adresses.nom);
                setChangePays(res.data.adresses.pays);
                setChangeVille(res.data.adresses.ville);
                setChangePostal(res.data.adresses.postal);
                setChangeAdress(res.data.adresses.adresse);
                setChangePrenom(res.data.adresses.prenom);
                setNoAdresse(false);
            }

        }).catch(error => {
            console.log(error);
        });
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        let errorNom = false;
        let errorPrenom = false;
        let errorAdress = false;
        let errorVille = false;
        let errorPostal = false;
        let errorPays = false;

        if (changePrenom == "" || !changePrenom.match(/^[a-zA-ZÀ-ÿ]+(([a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/)) {
            errorPrenom = true;
        } else {
            errorPrenom = false;
        }
        if (changeNom == "" || !changeNom.match(/^[a-zA-ZÀ-ÿ]+(([a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/)) {
            errorNom = true;
        } else {
            errorNom = false;
        }
        if (changeAdress == "" || !changeAdress.match(/^[0-9]{1,3}(([,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç']+)*$/)) {
            errorAdress = true;
        } else {
            errorAdress = false;
        }
        if (changeVille == "" || !changeVille.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
            errorVille = true;
        } else {
            errorVille = false;
        }
        if (changePostal == "" || !changePostal.toString().match(/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/)) {
            errorPostal = true;
        } else {
            errorPostal = false;
        }
        if (changePays == "" || !changePays.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
            errorPays = true;
        } else {
            errorPays = false;
        }

        if (!errorPrenom && !errorNom && !errorAdress && !errorVille && !errorPostal && !errorPays) {
            if (noAdresse) {
                const data = {
                    token: localStorage.token,
                    nom: changeNom,
                    prenom: changePrenom,
                    pays: changePays,
                    adresse: changeAdress,
                    ville: changeVille,
                    postal: parseInt(changePostal)
                }
                axios.post("http://127.0.0.1:8000/adresses/store", data).then(res => {
                    console.log(res);
                    window.location.reload();
                }).catch(error => {
                    console.log(error);
                });
            } else {
                const data = {
                    params: {
                        nom: changeNom,
                        prenom: changePrenom,
                        pays: changePays,
                        adresse: changeAdress,
                        ville: changeVille,
                        postal: changePostal
                    }
                }
                axios.post("http://127.0.0.1:8000/adresses/update/" + idAdresse, data).then(res => {
                    console.log(res);
                    window.location.reload();
                }).catch(error => {
                    console.log(error);
                });
            }
        } else {
            alert("Veuillez remplir les champs correctement");
        }
    }

    function deleteAdresse() {
        axios.post("http://127.0.0.1:8000/adresses/delete/" + idAdresse).then(res => {
            console.log(res);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <main className="profil-adresse">
            <h1 className="text-center mt-4 compte-soustitre">Adresse</h1>
            <div className="container d-flex">
                <div className="col-sm-4 compte-info-div">
                    <div>
                        <h3 className="compte-info-each">{userPrenom}</h3>
                        <h3 className="compte-info-each">{userNom}</h3>
                        <h3 className="compte-info-each">{userAddress ? userAddress : "Pas encore d'adresse, entrez-en une !"}</h3>
                        <h3 className="compte-info-each">{userVille}</h3>
                        <h3 className="compte-info-each">{userPostal}</h3>
                        <h3 className="compte-info-each">{userPays}</h3>
                    </div>
                    {userPrenom ? <button className="btn btn-delete-address" onClick={deleteAdresse}>Supprimer l'adresse</button> : null}
                </div>
                <div className="col-sm-8 compte-input-div">
                    <form onSubmit={onSubmit}>
                        <div className="div_ajout_nom">
                            <label className="compte-label mt-3">Prénom </label>
                            <input className="input-prix" onChange={(e) => setChangePrenom(e.target.value)} type="text" value={changePrenom} />
                        </div>
                        <div className="div_ajout_nom">
                            <label className="compte-label mt-3">Nom </label>
                            <input className="input-prix" onChange={(e) => setChangeNom(e.target.value)} type="text" value={changeNom} />
                        </div>
                        <div className="div_ajout_nom">
                            <label className="compte-label mt-3">Adresse </label>
                            <input className="input-prix" onChange={(e) => setChangeAdress(e.target.value)} type="text" value={changeAdress} />
                        </div>
                        <div className="div_ajout_nom">
                            <label className="compte-label mt-3">Ville </label>
                            <input className="input-prix" onChange={(e) => setChangeVille(e.target.value)} type="text" value={changeVille} />
                        </div>
                        <div className="div_ajout_nom">
                            <label className="compte-label mt-3">Code Postal </label>
                            <input className="input-prix" onChange={(e) => setChangePostal(e.target.value)} type="text" value={changePostal} />
                        </div>
                        <div className="div_ajout_nom">
                            <label className="compte-label mt-3">Pays </label>
                            <input className="input-prix" onChange={(e) => setChangePays(e.target.value)} type="text" value={changePays} />
                        </div>
                        <button className="btn btn-adresse">Changer</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default ProfilAdresse;