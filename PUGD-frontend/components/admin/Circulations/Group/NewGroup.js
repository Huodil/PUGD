/*
import React, {useState} from 'react'
import AdminLayout from '@/components/adminLayout'
import Card from "@/components/ui/card/card";
import Grid from "@/components/ui/Grid/grid";
import GridElement from "@/components/ui/Grid/GridElement";
import TextBox from "@/components/ui/TextBox";
import SelectBox from "@/components/ui/SelectBox";
import Checkbox from "@/components/ui/Checkbox";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import Circulation from "@/components/admin/Circulations/Body/Body";
import CirculationHeader from "@/components/admin/Circulations/Hedar/CirculationHeader";
import {ADD_SUGGESTION} from "@/graphql/mutations/admin/circulation/Suggestion.mutation";
import {GroupsByName} from "@/graphql/queries/admin/Ciruclation/groups.query";
import {GetAllBro} from "@/graphql/queries/admin/Ciruclation/BorrowersList.query";


const NewGroup = () => {
    const { loading, error, data } = useQuery(GetAllBro);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const [name, setName] = useState('')
    const [responsable, setResponsable] = useState('')
    const [libelle, setLibelle] = useState('')
    const [letter, setLetter] = useState('')
    const [mail, setMail] = useState('')
    const [members, setMembers] = useState('')

    const [commentaires, setCommentaires] = useState('')
    const [commentairesGestion, setCommentairesGestion] = useState('')

    const [addGroup] = useMutation(ADD_SUGGESTION,{
        onCompleted(data) {
            const {_id} = data
            console.log("id user is:", _id)
            // Router.push("/");
        }
    });
    const onSubmitHandler = ()=>{
        console.log(titreOrDescriptionFile)

        addGroup({
            variables: {
                name: name,
                Responsable: responsable,
                libelle: libelle,
                letter: letter,
                mail: mail,
                members: members,
            }
        });
    }

    return <Circulation className="container">
        <CirculationHeader CirculationModule="Creé un Group"/>

        <div >
            <form>
                <Card>
                    <div className="row container">
                        <Grid>
                            <GridElement s={12} style={{ display: "flex"}}>
                                {/!*todo check Name Group  if is used  or not*!/}
                                <TextBox Multiline={"input"} label="Nom du Group"
                                         onChange={e => setName(e.target.value)}
                                         value={name}
                                />

                                {/!*<div className="input-field">
                                            <select className="select2 browser-default" multiple="multiple">
                                                <option value="square">Square</option>
                                                <option value="rectangle" selected>Rectangle</option>
                                                <option value="rombo">Rombo</option>
                                                <option value="romboid">Romboid</option>
                                                <option value="trapeze">Trapeze</option>
                                                <option value="traible" selected>Triangle</option>
                                                <option value="polygon">Polygon</option>
                                            </select>
                                        </div>*!/}
                                <SelectBox label={"Responsable du Groups"}>
                                    {data.GetAllBro.map((items)=>(
                                        <option key={items._id} value={items.fullname}>{items.fullname}</option>
                                    ))}
                                </SelectBox>
                            </GridElement>

                            {/!*todo Send Message to Respo Groups*!/}
                            <GridElement s={12}>
                                <TextArea label={"Message"} data-length="120"/>
                            </GridElement>

                            {/!*todo Send Message to Respo Groups*!/}
                            <Grid>
                                <GridElement s={12}>
                                    <Checkbox label={"Ajouter le responsable au groupe "}/>
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox label={"Adresser les lettres de rappel individuelles au responsable de ce groupe ?"}/>
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox label={"Adresser les mails de rappel individuels au responsable de ce groupe ?"}/>
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox label={"Imprimer le nom de ce groupe sur les lettres de rappel individuelles ?"}/>
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox label={"Imprimer le nom de ce groupe sur les lettres de réservation individuelles ?"}/>
                                </GridElement>
                            </Grid>



                        </Grid>
                        <br/>
                        <Button rounded={4}>Anullé</Button>
                        <Button rounded={4}>Submit</Button>
                    </div>

                </Card>
            </form>

        </div>
    </Circulation>
}
NewGroup.Layout = AdminLayout
export default NewGroup
*/
