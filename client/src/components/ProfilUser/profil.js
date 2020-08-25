import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './ProfilCards';
import Adresse from './ProfilAdresse';
import { Image } from 'react-bootstrap';
import Photo from './photo.jpg';

function ProfileUser() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [changeName, setChangeName] = useState("");
    const [changeEmail, setChangeEmail] = useState("");
    const [abonnement, setAbonnement] = useState("");
    const [dateAbo, setDateAbo] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/getByToken/" + localStorage.token).then(res => {
            console.log(res.data)
            setUserId(res.data.user.id);
            setUserEmail(res.data.user.email);
            setUserName(res.data.user.username);
            setChangeEmail(res.data.user.email);
            setChangeName(res.data.user.username);

            if (res.data.user.annuel != null) {
                setAbonnement("Annuel");
                setDateAbo(res.data.user.annuel_date);
            } else if (res.data.user.mensuel != null) {
                setAbonnement("Mensuel");
                setDateAbo(res.data.user.mensuel_date);
            } else {
                setAbonnement("Aucun");
            }
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function onChangeName(e) {
        let res = e.target.value.trim();
        let val = res.charAt(0).toUpperCase() + res.substring(1).toLowerCase();
        setChangeName(val);
    }

    function onChangeEmail(e) {
        setChangeEmail(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        if (changeName != "" && changeEmail != "") {
            if (changeEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) 
                && changeName.match(/^[a-zA-ZÀ-ÿ]+(([a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/)) {
                const data = {
                    params: {
                        username: changeName,
                        email: changeEmail
                    }
                }
                axios.post("http://127.0.0.1:8000/users/update/" + userId, data).then(res => {
                    console.log(res);
                    window.location.reload();
                }).catch(error => {
                    console.log(error);
                });
            } else {
                alert("Identifiant invalide !");
            }
        } else {
            alert("Remplissez correctement les champs");
        }
    }

    return (
        <main>
            <div className="articles-main_photo">
                <h3 className="compte-title">Mon Compte</h3>
            <Image src={Photo} className="photo-main-compte" fluid />
        </div>
        <Adresse />
        <div className="compte-info">            
            <div className="compte-inline_un">
                <div className="compte-mail-div">
                    <h3 className="compte-info-titre">{userName}</h3>
                    <h3 className="compte-info-titre">{userEmail}</h3>
                </div>
                <div className="compte-inline_deux">
                    <form onSubmit={onSubmit}>
                        <div className="form-input-info">
                            <div className="div_modif_input">
                                <label className="admin-label mt-3">Nom de compte </label>
                                <input className="input-prix" onChange={onChangeName} type="text" value={changeName} />
                            </div>
                        </div>
                        <div className="div_modif_input">
                            <label className="admin-label mt-3">Email </label>
                            <input className="input-prix" onChange={onChangeEmail} type="text" value={changeEmail} />
                        </div>
                        <button className="btn btn-compte">Changer</button>
                    </form> 
                </div> 
            </div>
            <div className="profil-compte-abo">
                <h5 className="compte-abo"><span className="mr-5"><b>Abonnement</b> {abonnement} </span> {abonnement != "Aucun" && <span><b>Expire le</b> {dateAbo} </span> }</h5>
            </div>
        </div>
        <Cards />
    </main>
    )
}

export default ProfileUser;