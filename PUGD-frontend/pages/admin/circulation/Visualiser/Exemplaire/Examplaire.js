import React, {useState} from 'react'
import AdminLayout from '@/components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import {EXAMPLAIR_BY_CODE} from "@/graphql/queries/admin/Ciruclation/Examplaire.query";

const Examplaire = (props) => {

    //console.log("Title :",props.dataSet.Record.Title)
    return <React.Fragment>

                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="row vertical-modern-dashboard">

                                <div className="col s12 m8 l8 animate fadeLeft">
                                    <div className="card">
                                        <div className="card-content">
                                            <h4 className="card-title mb-0">Details Examplaire :
                                                <a key={props.dataSet._id}>{props.dataSet && props.dataSet.Record.Title}</a>

                                                <a className="mb-6 chip float-right" type="button">
                                                    <i className="material-icons">chat</i>
                                                </a>
                                                <a className="mb-6 chip float-right" type="button">
                                                    <i className="material-icons">chat</i>
                                                </a>
                                                <a className="mb-6 chip float-right" type="button">
                                                    <i className="material-icons">edit</i>
                                                </a>
                                            </h4>
                                            <div className="total-transaction-container">

                                                <h6><a href="#" className="mt-5">Auteurs</a></h6>
                                                <div className="row">
                                                   {/* {
                                                        // todo complet info
                                                        props.auteurs.map((auteur)=>{
                                                            // eslint-disable-next-line react/jsx-key
                                                            return <React.Fragment>
                                                                <div className="section">
                                                                    <div className="btn chip gradient-45deg-purple-deep-orange white-text">
                                                                        <img src="http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/car_1.png"
                                                                             alt="Materialize"/>
                                                                        {auteur.name}
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        })
                                                    }*/ }

                                                    <div className="chip">Gudule </div>
                                                    <div className="chip">Durual, Christophe </div>
                                                </div>
                                                <h6><a href="#" className="mt-5">Editeur : {}</a></h6>
                                                <div className="row">
                                                    {/* {
                                                        // todo complet info
                                                        props.editeurs.map((editeur)=>{
                                                            // eslint-disable-next-line react/jsx-key
                                                            return <React.Fragment>
                                                                <div className="section">
                                                                    <div className="btn chip gradient-45deg-purple-deep-orange white-text">
                                                                        <img src="http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/car_1.png"
                                                                             alt="Materialize"/>
                                                                        {editeur.name}
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        })
                                                    }*/ }
                                                    <div className="chip">Hachette Jeunesse1 </div>
                                                    <div className="chip">Hachette Jeunesse </div>
                                                </div>
                                                <h6><a href="#" className="mt-5">Type : {}</a></h6>
                                                <div className="row">
                                                    {/* {
                                                        // todo complet info
                                                        props.editeurs.map((editeur)=>{
                                                            // eslint-disable-next-line react/jsx-key
                                                            return <React.Fragment>
                                                                <div className="section">
                                                                    <div className="btn chip gradient-45deg-purple-deep-orange white-text">
                                                                        <img src="http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/car_1.png"
                                                                             alt="Materialize"/>
                                                                        {editeur.name}
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        })
                                                    }*/ }
                                                    <div className="chip">
                                                        <span>texte imprimé</span>
                                                    </div>
                                                </div>
                                            </div>

                                                <table
                                                    className="table responsive-table ">
                                                    <tbody>
                                                        <tr>
                                                            <td>Identifiant de la notice </td>
                                                            <td>80</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Localisation</td>
                                                            <td>Bibliothèque PMB Services</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Section</td>
                                                            <td>Romans Jeunes</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Cote</td>

                                                            <td><span
                                                                className="  chip green lighten-5 green-text">RJ GUD</span></td>
                                                        </tr><tr>
                                                            <td>Statut</td>
                                                            <td>Empruntable

                                                                <br/>
                                                                <span className="task-cat teal accent-4">Disponible</span>
                                                                <span className="task-cat red accent-2">Web API</span>

                                                            </td>
                                                        </tr><tr>
                                                            <td>Code statistique</td>
                                                            <td>Jeunes</td>
                                                        </tr>
                                                    </tbody>
                                                </table>


                                            <h6><a href="#" className="mt-5">Dernier emprenteur</a></h6>

                                            <div className="section">
                                                <div
                                                    className="chip gradient-45deg-purple-deep-orange gradient-shadow white-text">
                                                    <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                                         alt="Materialize"/>
                                                        Gradient color with shadow

                                                </div>
                                                <span > 22/03/2020</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" mt-2 col s12 m4 l4 animate fadeRight">
                                    <div >
                                        {/*for detilals ListNotice*/}


                                        <div className=" chip_button border-non center">
                                            <a className="waves-effect waves-light btn gradient-45deg-red-pink box-shadow">
                                                299 DH
                                            </a>
                                        </div>
                                        <div className="row chip_value centered-element">
                                            <div className="chip">
                                                <span>P: 192</span>
                                            </div>
                                            <div className="chip">
                                                <span>ISBN : 978-2-01-322406-2</span></div>
                                            <div className="chip">
                                                <span> 2007</span>
                                            </div>

                                        </div>
                                        <div>
                                            <img className="responsive-img border-radius-8 "
                                                 src="https://cdn.pixabay.com/photo/2016/11/29/04/45/aged-1867381_1280.jpg"
                                                 alt="new"/>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
    </React.Fragment>
}
Examplaire.Layout = AdminLayout
export default Examplaire
