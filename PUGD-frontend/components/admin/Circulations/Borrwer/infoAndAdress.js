import React from "react";
import Collapsible from "../../../ui/Collapsible/Collapsible";


const MoreDetails = ({Borrower,...props}) => {
    return <React.Fragment>
        <Collapsible active>
            <li>
                <div className="collapsible-header">
                    <i className="material-icons">filter_drama</i>Details
                </div>
                <div className=" collapsible-body s12 m12 l12">
                    <div className="row">
                        <ul className="col card-content s6 m6 l4 border-radius-10 grey lighten-4">
                            <li>

                                <p>

                                    <span>{Borrower && Borrower.address ? Borrower.address.rue1 : ""},&nbsp;</span>
                                    <span>{Borrower && Borrower.address.rue2 ? Borrower.address.rue2 : "-"},&nbsp;</span>
                                    <span>{Borrower && Borrower.address.city ? Borrower.address.city : "-"},&nbsp;</span>
                                    <span>{Borrower && Borrower.address.contry ? Borrower.address.contry : "-"},&nbsp;</span>
                                </p>
                                <p>
                                    <b>Téle : </b>
                                    <span>{Borrower && Borrower.phone_number ? Borrower.phone_number : "-"}</span>
                                </p>
                                <p>
                                    <b>Email : </b>
                                    <span>{Borrower && Borrower.email}</span>
                                </p>
                                <p>
                                    <b>Adhésion :</b> <br/>
                                    <b>Début :&nbsp;</b>
                                    <span>{Borrower && Borrower.phone_number ? Borrower.phone_number : "-"}</span>
                                    <br/>
                                    <b>Fain :&nbsp;</b>
                                    <span>{Borrower && Borrower.phone_number ? Borrower.phone_number : "-"}</span>
                                    <br/>

                                </p>
                            </li>
                        </ul>
                        <ul className="col card-content s6 m6 l4 ">
                            <li><b>Profession :</b>&nbsp;{Borrower && Borrower.profession}</li>
                            <li><b>Année de naissance :</b>&nbsp;{Borrower && Borrower.birthday}</li>
                            <li><b>Sexe :</b>&nbsp;{Borrower && Borrower.gender}</li>
                            <br/>
                            <li><b>Code statistique
                                :</b>&nbsp;{Borrower && Borrower.static_code !== null ? Borrower.static_code.static_name : "null"}
                            </li>
                            <li><b>Catégorie
                                :</b>&nbsp;{Borrower && Borrower.categories !== null ? Borrower.categories.name : ""}
                            </li>
                            <li><b>Numéro :</b>&nbsp;{Borrower && Borrower.gender}</li>
                        </ul>
                        <ul className="col card-content s6 m6 l4 border-radius-10 grey lighten-4">
                            <br/>
                            <br/>
                            <li><b>Localisation
                                :</b>&nbsp;{Borrower && Borrower.localisation ? Borrower.localisation.Name : ""}
                            </li>
                            <li><b>Identifiant OPAC :</b>&nbsp;{Borrower && Borrower.username_opac}</li>
                            <li><b>Mots de passe
                                :</b>&nbsp;{Borrower && Borrower.password_opac ? "Un Mots de pass a eté effectié " : "Pas de mots de passe"}
                            </li>
                            <li><b>Inscription validée :</b>&nbsp;{Borrower && Borrower.gender}</li>
                        </ul>

                        <ul className="col card-content s6 m6 l12 ">
                            <br/>
                            <b>Date du dernier emprunt :&nbsp;</b>
                            <span>{Borrower && Borrower.phone_number ? Borrower.phone_number : "-"}</span>
                            <br/>
                            <b>Commentaire : </b>
                            <span>{Borrower && Borrower.comment}</span>
                            <br/>
                            <b>Message : </b>
                            <span>{Borrower && Borrower.message}</span>
                            <br/>
                            <br/>
                            <br/>
                        </ul>

                    </div>
                </div>
            </li>
        </Collapsible>
    </React.Fragment>
}

export default MoreDetails