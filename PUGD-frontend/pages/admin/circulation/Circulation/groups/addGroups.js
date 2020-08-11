import React, {useState} from 'react'
import AdminLayout from 'components/adminLayout'
import Card from "components/ui/card/card";
import Grid from "components/ui/Grid/grid";
import GridElement from "components/ui/Grid/GridElement";
import TextBox from "components/ui/TextBox";
import SelectBox from "components/ui/SelectBox";

import Checkbox from "components/ui/Checkbox";
import Button from "components/ui/Button";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {ALL_BORROWERS} from "graphql/queries/admin/Ciruclation/Borrowers.query";
import Circulation from "components/admin/Circulations/Body/Body";
import CirculationHeader from "components/admin/Circulations/Hedar/CirculationHeader";
import {splitfunction} from "../../../../../shared/_herlpersCirculation/_helpers";
import {ADD_GROUP} from "../../../../../graphql/mutations/admin/circulation/Groups.mutation";
import  Router from "next/router";

/*// todo add Mebmer filter rapide
class AddGroup extends  React.Component{
    state ={

    }
    render() {
        return <Circulation>
            <CirculationHeader Title="AddOwner New Groups"/>
            <form>
                <Card>
                    <div className="card-content pb-0">
                        <div className="row">
                            <Grid>
                                <GridElement s={12} style={{display: "flex"}}>
                                    {/!*todo check Name Group  if is used  or not*!/}
                                    <TextBox Multiline={"input"} label="Nom du Group"
                                             type="text"
                                             onChange={e => setName(e.target.value)}
                                             value={name}/>

                                    <SelectBox label={"Responsable du Groups"}
                                               value={responsable}
                                               onChange={e => setResponsableGroup(e.target.value)}
                                    >
                                        {data.getAllBorrowers.map((item) => (
                                            <option key={item._id} value={splitfunction(item._id)}>
                                                {item.first_name + " " + item.last_name}

                                            </option>
                                        ))}
                                    </SelectBox>
                                </GridElement>

                                {/!*todo Send Message to Respo Groups*!/}
                                <GridElement s={12}>
                                    <TextBox Multiline label="Message" data-length="120"
                                             type="text"
                                             onChange={e => setMessage(e.target.value)}
                                             value={message}/>
                                </GridElement>

                                {/!*todo Send Message to Respo Groups*!/}
                                <Grid>
                                    <GridElement s={12}>
                                        <Checkbox label={"Ajouter le responsable au groupe "}
                                                  checked={addResponsableToGroup}
                                                  value={responsable}
                                                  onChange={() => setAddResponsableToGroup(!addResponsableToGroup)}
                                        />
                                    </GridElement>
                                    <GridElement s={12}>
                                        <Checkbox
                                            label={"Adresser les lettres de rappel individuelles au responsable de ce groupe ?"}
                                            checked={sendLetterRappelToResponsable}
                                            onChange={() => setSendLetterRappelToResponsable(!sendLetterRappelToResponsable)}
                                        />
                                    </GridElement>
                                    <GridElement s={12}>
                                        <Checkbox
                                            label={"Adresser les mails de rappel individuels au responsable de ce groupe ?"}
                                            checked={sendMailRappelToResponsable}
                                            onChange={() => setSendMailRappelToResponsable(!sendMailRappelToResponsable)}
                                        />
                                    </GridElement>
                                    <GridElement s={12}>
                                        <Checkbox
                                            label={"Adresser les lettres de réservation individuelles au responsable de ce groupe ?"}
                                            checked={sendLetterReservationToResponsable}
                                            onChange={() => setSendLetterReservationToResponsable(!sendLetterReservationToResponsable)}
                                        />
                                    </GridElement>
                                    <GridElement s={12}>
                                        <Checkbox
                                            label={"Adresser les mails de réservation individuels au responsable de ce groupe ?"}
                                            checked={sendMailReservationToResponsable}
                                            onChange={() => setSendMailReservationToResponsable(!sendMailReservationToResponsable)}
                                        />
                                    </GridElement>
                                    <GridElement s={12}>
                                        <Checkbox
                                            label={"Imprimer le nom de ce groupe sur les lettres de rappel individuelles ?"}
                                            checked={imprimeNameGroupOneLetter}
                                            onChange={() => setImprimeNameGroupOneLetter(!imprimeNameGroupOneLetter)}
                                        />
                                    </GridElement>
                                    <GridElement s={12}>
                                        <Checkbox
                                            label={"Imprimer le nom de ce groupe sur les lettres de réservation individuelles ?"}
                                            checked={imprimeNameGroupOneLetterReservation}
                                            onChange={() => setImprimeNameGroupOneLetterReservation(!imprimeNameGroupOneLetterReservation)}
                                        />
                                    </GridElement>
                                </Grid>


                            </Grid>
                            <br/>
                            <Button rounded={4}>Anullé</Button>
                            <Button rounded={4} onClick={onSubmitHandler}>Submit</Button>

                        </div>
                    </div>
                </Card>
            </form>
        </Circulation>
    }
}*/
const addGroups = () => {




    const {loading, error, data} = useQuery(ALL_BORROWERS, {
        variables:{
            filter:""
        }
    });

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [responsable, setResponsableGroup] = useState('')
    const [members, setMembers] = useState([])
    // checkbox
    const [addResponsableToGroup, setAddResponsableToGroup] = useState(false)
    const [sendMailReservationToResponsable, setSendMailReservationToResponsable] = useState(false)
    const [sendMailRappelToResponsable, setSendMailRappelToResponsable] = useState(false)
    const [sendLetterRappelToResponsable, setSendLetterRappelToResponsable] = useState(false)
    const [sendLetterReservationToResponsable, setSendLetterReservationToResponsable] = useState(false)
    const [imprimeNameGroupOneLetter, setImprimeNameGroupOneLetter] = useState(false)
    const [imprimeNameGroupOneLetterReservation, setImprimeNameGroupOneLetterReservation] = useState(false)


    const [AddGroup] = useMutation(ADD_GROUP,{
        onCompleted() {
            Router.reload(window.location.pathname);
        }
    });
    const onSubmitHandler = ()=>{
        console.log("name group", name)

        console.log("add message ", message)
        console.log("add respo id ", responsable.valueOf())
        console.log("------------\n")

        console.log("addResponsableToGroup : ", addResponsableToGroup)
        console.log("sendLetterRappelToResponsable : ", sendLetterRappelToResponsable)
        console.log("sendMailReservationToResponsable : ", sendMailReservationToResponsable)
        console.log("sendMailRappelToResponsable : ", sendMailRappelToResponsable)
        console.log("sendLetterReservationToResponsable : ", sendLetterReservationToResponsable)
        console.log("imprimeNameGroupOneLetter : ", imprimeNameGroupOneLetter)
        console.log("imprimeNameGroupOneLetterReservation: ", imprimeNameGroupOneLetterReservation)

        AddGroup({
            variables: {
                name: name,
                message: message,
                respo: responsable.valueOf(),
                sendLetterRappelToResponsable: sendLetterRappelToResponsable,
                addResponsableToGroup: addResponsableToGroup,
                sendMailReservationToResponsable: sendMailReservationToResponsable,
                sendMailRappelToResponsable: sendMailRappelToResponsable,
                sendLetterReservationToResponsable: sendLetterReservationToResponsable,
                imprimeNameGroupOneLetter: imprimeNameGroupOneLetter,
                imprimeNameGroupOneLetterReservation: imprimeNameGroupOneLetterReservation,
            }
        });
    }


    if (loading) return <di>
        <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
                <div className="circle"/>
            </div>
            <div className="gap-patch">
                <div className="circle"/>
            </div>
            <div className="circle-clipper right">
                <div className="circle"/>
            </div>
        </div>
    </di>;
    if (error) return `Error! ${error.message}`;


    return <Circulation>
        <CirculationHeader Title="AddOwner New Groups"/>
        <form>
            <Card>
                <div className="card-content pb-0">
                    <div className="row">
                        <Grid>
                            <GridElement s={12} style={{display: "flex"}}>
                                {/*todo check Name Group  if is used  or not*/}
                                <TextBox Multiline={"input"} label="Nom du Group"
                                         type="text"
                                         onChange={e => setName(e.target.value)}
                                         value={name}/>

                                <SelectBox label={"Responsable du Groups"}
                                           value={responsable}
                                           onChange={e => setResponsableGroup(e.target.value)}
                                >
                                    <option>chose a responsable </option>
                                    {data.getAllBorrowers.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.first_name + " " + item.last_name}
                                        </option>
                                    ))}
                                </SelectBox>
                            </GridElement>

                            {/*todo Send Message to Respo Groups*/}
                            <GridElement s={12}>
                                <TextBox Multiline label="Message" data-length="120"
                                         type="text"
                                         onChange={e => setMessage(e.target.value)}
                                         value={message}/>
                            </GridElement>

                            {/*todo Send Message to Respo Groups*/}
                            <Grid>
                                <GridElement s={12}>
                                    <Checkbox label={"Ajouter le responsable au groupe "}
                                              checked={addResponsableToGroup}
                                              value={responsable}
                                              onChange={() => setAddResponsableToGroup(!addResponsableToGroup)}
                                    />
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox
                                        label={"Adresser les lettres de rappel individuelles au responsable de ce groupe ?"}
                                        checked={sendLetterRappelToResponsable}
                                        onChange={() => setSendLetterRappelToResponsable(!sendLetterRappelToResponsable)}
                                    />
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox
                                        label={"Adresser les mails de rappel individuels au responsable de ce groupe ?"}
                                        checked={sendMailRappelToResponsable}
                                        onChange={() => setSendMailRappelToResponsable(!sendMailRappelToResponsable)}
                                    />
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox
                                        label={"Adresser les lettres de réservation individuelles au responsable de ce groupe ?"}
                                        checked={sendLetterReservationToResponsable}
                                        onChange={() => setSendLetterReservationToResponsable(!sendLetterReservationToResponsable)}
                                    />
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox
                                        label={"Adresser les mails de réservation individuels au responsable de ce groupe ?"}
                                        checked={sendMailReservationToResponsable}
                                        onChange={() => setSendMailReservationToResponsable(!sendMailReservationToResponsable)}
                                    />
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox
                                        label={"Imprimer le nom de ce groupe sur les lettres de rappel individuelles ?"}
                                        checked={imprimeNameGroupOneLetter}
                                        onChange={() => setImprimeNameGroupOneLetter(!imprimeNameGroupOneLetter)}
                                    />
                                </GridElement>
                                <GridElement s={12}>
                                    <Checkbox
                                        label={"Imprimer le nom de ce groupe sur les lettres de réservation individuelles ?"}
                                        checked={imprimeNameGroupOneLetterReservation}
                                        onChange={() => setImprimeNameGroupOneLetterReservation(!imprimeNameGroupOneLetterReservation)}
                                    />
                                </GridElement>
                            </Grid>


                        </Grid>
                        <br/>
                        <Button rounded={4}>Anullé</Button>
                        <Button rounded={4} onClick={onSubmitHandler}>Submit</Button>

                    </div>
                </div>
            </Card>
        </form>
    </Circulation>

}
addGroups.Layout = AdminLayout
export default addGroups
