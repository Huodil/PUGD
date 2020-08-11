import React, {Fragment, useState} from 'react'
import AdminLayout from '@/components/adminLayout'
import Card from "@/components/ui/card/card";
import {useMutation} from "@apollo/react-hooks";

import {ADD_SUGGESTION} from "@/graphql/mutations/admin/circulation/Suggestion.mutation";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import CirculationHeader from "@/components/admin/Circulations/Hedar/CirculationHeader";
import CirculationBody from "@/components/admin/Circulations/Body/Body";
import Circulation from "@/components/admin/Circulations/Body/Body";
import Input from "../../../../components/ui/Input";
import Section from "../../../../components/ui/card/Section";
import Router from "next/router";
import Alert from "../../../../components/ui/Alert/Alert";


const Suggestion = () => {
    const [titreOrDescriptionFile, setTitreOrDescriptionFile] = useState('')
    const [auteur, setAuteur] = useState('')
    const [editeur, setEditeur] = useState('')
    const [isbn, setIsbn] = useState('')
    const [prix, setPrix] = useState('')
    const [url, setUrl] = useState('')
    const [datepub, setDatepub] = useState()
    const [pice, setPice] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [commentairesGestion, setCommentairesGestion] = useState('')

    const [addSuggestion, {error}] = useMutation(ADD_SUGGESTION, {
        onCompleted(data) {
            const {_id} = data
            console.log("id user is:", _id)
             Router.push("/");
            return <Alert Title="Success AddOwner" Message="Votre Suggesttion est bien ajouter"/>
        }
    });
    const onSubmitHandler = () => {
        console.log(titreOrDescriptionFile)

        addSuggestion({
            variables: {
                TitreOrDescriptionFile: titreOrDescriptionFile,
                Editeur: editeur,
                Auteur: auteur,
                ISBN: isbn,
                Prix: prix,
                URLAssocier: url,
                DateDePublication: datepub,
                Commentaires: commentaires,
                CommentairesGestion: commentairesGestion,
            }
        });
    }
    return <Circulation>
        <CirculationHeader CirculationModule="Suggestion"/>
        <Section>
            <form>
                <div className="col s12 m12 l12">
                    <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
                        <li className="collection-item avatar">
                            <i className="material-icons yellow darken-3 circle">lightbulb_outline</i>
                            <h6 className="collection-header m-0">Suggestion</h6>
                            <p>Creation de Suggestion</p>
                        </li>
                        <li className="input-field col s12 m6 l4 ">
                            <Input
                                icon="sort"
                                label="Titre/Description du fichier"
                                type="text"
                                className="validate"
                                required
                                onChange={e => setTitreOrDescriptionFile(e.target.value)}
                                value={titreOrDescriptionFile}
                            />
                        </li>
                        <div className="input-field col s12 m6 l4 ">
                            <Input
                                icon="account_circle"
                                label="Editeur"
                                type="text"
                                className="validate"
                                required
                                onChange={e => setEditeur(e.target.value)}
                                value={editeur}
                            />
                        </div>
                        <div className="input-field col s12 m6 l4 ">
                            <Input
                                icon="account_circle"
                                label="Auteur"
                                type="text"
                                className="validate"
                                required
                                onChange={e => setAuteur(e.target.value)}
                                value={auteur}

                            />
                        </div>
                        <div className="input-field col s12 m6 l4 ">
                            <Input
                                icon="filter_center_focus"
                                label="ISBN"
                                type="text"
                                className="validate"
                                required
                                onChange={e => setIsbn(e.target.value)}
                                value={isbn}

                            />
                        </div>
                        <div className="input-field col s12 m6 l4 ">
                            <Input
                                icon="euro_symbol"
                                label="Prix"
                                type="number"
                                className="validate"
                                required
                                onChange={e => setPrix(e.target.value)}
                                value={prix}

                            />
                        </div>
                        <div className="input-field col s12 m6 l4  ">
                            <Input
                                icon="insert_link"
                                label="URL"
                                type="text"
                                className="validate"
                                required
                                onChange={e => setUrl(e.target.value)}
                                value={url}

                            />
                        </div>
                        <div className="input-field col s12 m6 l4  ">
                            <DatePicker label="Date de publication"
                                        icon="today"
                                        className="validate"
                                        required
                                        onChange={e => setDatepub(new Date(e.target.value))}
                                        value={datepub}
                            />
                        </div>
                        <div className="input-field col s12 m6 l4  ">
                            <Input label="Pice Jointé"
                                   icon="link"
                                   className="validate"
                                   required
                                   onChange={e => setPice(e.target.value)}
                                   value={pice}
                            />
                        </div>
                        <div className="input-field col s12 m6 l4  ">
                            <Input

                                icon="chat"
                                label="commentaires"
                                className="materialize-textarea"
                                onChange={e => setCommentaires(e.target.value)}
                                value={commentaires}
                            />
                        </div>
                        <div className="input-field col s12 m12 l12  ">
                            <Input

                                icon="chat"
                                label="Commentaires de Gestion"
                                className="materialize-textarea"
                                onChange={e => setCommentairesGestion(e.target.value)}
                                value={commentairesGestion}
                            />
                        </div>

                        <Button
                            className=" center col s12 m12 l12  "
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onSubmitHandler}
                        >
                            SAVE
                        </Button>

                        {error ? <div>{String(error)}</div> : null}
                    </ul>
                </div>
            </form>
        </Section>
    </Circulation>
}
Suggestion.Layout = AdminLayout
export default Suggestion
