import React, {useState} from 'react'
import Collapsible from "../../../ui/Collapsible/Collapsible";
import Input from "../../../ui/Input";
import Checkbox from "../../../ui/Checkbox";
import SelectBox from "../../../ui/SelectBox";
import Button from "../../../ui/Button";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_COPIES, GetOneCopyByCode} from "../../../../graphql/queries/admin/Ciruclation/Copies.query";
import ReservationPrevision from "./ReservationPrevisions";
import {useRouter} from "next/router";

const FormAuteurAndTilteComponent = ({...props}) => {
    const Router = useRouter()
    let id = Router.query.id
    console.log("id from query: ",id)


    const [code_bar_copy, setCode_bar_copy] = useState("")
    const [isbnOrId, setIsbnOrId] = useState("")
    const [type, setType] = useState("")
    const [findcopy, {data, error}] = useLazyQuery(GET_COPIES,{
        onCompleted: () => {
            console.log("data after complet",data)
        }});
    const onHandlerSubmit = (e) => {
        console.log("code_bar_copy :", code_bar_copy)
        //console.log("isbnOrId  :", isbnOrId)

        e.preventDefault();
        findcopy({
            variables: {
                code_bar: code_bar_copy,
            }
        });


    }

    if (error) {
        console.log("err : ", error)
    }
    if (data !== null && data !== undefined) {
        console.log("data : ", data)
    }
    return <React.Fragment>
        {
            data === undefined ?
                <div >
                    <Collapsible active style={{marginTop:"0px"}}>
                        <li className="active">
                            <div className="collapsible-header ">
                                <i className="material-icons">filter_drama</i>Auteur/Title
                            </div>
                            <div className="collapsible-body s12 m12 l12">
                                <div className="row">
                                    <div className="input-field col s12 m8 l8">
                                        <Input
                                            icon="users"
                                            className="validate"
                                            label="Tous les champs"
                                        />
                                    </div>
                                    <div className="input-field col s12 m4 l4">
                                        <Checkbox label="Document Numérique"/>
                                    </div>
                                    <div className="input-field col s12 m6 l6">
                                        <Input
                                            icon="users"
                                            className="validate"
                                            label="Titre"
                                        />
                                    </div>
                                    <div className="input-field col s12 m6 l6">
                                        <Input
                                            icon="layers"
                                            className="validate"
                                            label="Auteur"
                                        />
                                    </div>
                                    <div className="input-field col s12 m6 l6">
                                        <Input
                                            icon="layers"
                                            className="validate"
                                            label="Catégorie"
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header">
                                <i className="material-icons">filter_drama</i>
                                Votre saisie peut aussi être une Expression Boolean
                            </div>
                            <div className=" collapsible-body s12 m12 l12">
                                <div className="row">

                                    <div className="input-field col 12 m6 l6">
                                        <SelectBox label="Type de Document"
                                                   className="validate" required
                                                   type="text"
                                                   value={type}
                                                   onChange={e => setType(e.target.value)}
                                        >
                                            <option value="a" selected="selected">printed text</option>
                                            <option value="b">manuscript text</option>
                                            <option value="c">musical score - printed</option>
                                            <option value="d">musical score - manuscript</option>
                                            <option value="e">cartographic document - printed</option>
                                            <option value="f">cartographic document - manuscript</option>
                                            <option value="g">video, projectable document</option>
                                            <option value="i">sound recording - non musical</option>
                                            <option value="j">sound recording - musical</option>
                                            <option value="k">2D graphical document</option>
                                            <option value="l">electronic document</option>
                                            <option value="m">multimedia document</option>
                                            <option value="n">3D object, artifact, ...</option>
                                        </SelectBox>
                                    </div>
                                    <div className="input-field col s12 m6 l6">
                                        <SelectBox label="Statut de notice">
                                            <option>tout les status</option>
                                            <option>sans status particulier(6)</option>
                                        </SelectBox>
                                    </div>

                                    {/*<li className="col card-content s6 m6 l6">
                            <label>Date de publication ou année d'édition</label>

                            <DatePicker label="de :"/>
                            <DatePicker label="Jusqu'à"/>

                        </li>*/}
                                    <div className="input-field col s12 m6 l6">
                                        <Input
                                            className="validate"
                                            label="No. d'exemplaire Ou numéro commercial"
                                            value={code_bar_copy}
                                            onChange={e => setCode_bar_copy(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field col s12 m6 l6">
                                        <Input
                                            className="validate"
                                            label="Identifiant de la notice ou ISBN :"
                                            value={isbnOrId}
                                            onChange={e => setIsbnOrId(e.target.value)}
                                        />
                                    </div>


                                </div>
                            </div>
                        </li>
                        <Button style={{marginTop:"0px"}} onClick={onHandlerSubmit}>Serach</Button>

                    </Collapsible>


                </div> :
            data !== null && data !== undefined ?
                    <ReservationPrevision search={data.copies}/>
                    : " pas de resultat"

        }

    </React.Fragment>

}
export default FormAuteurAndTilteComponent