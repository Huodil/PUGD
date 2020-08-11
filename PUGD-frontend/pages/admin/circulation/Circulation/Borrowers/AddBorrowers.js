import {useLazyQuery} from "@apollo/react-hooks";
import {GetAllCategoriesBorrowers} from "../../../../../graphql/queries/admin/Ciruclation/GroupsBorrewors";
import React, {useState} from "react";
import Card from "../../../../../components/ui/card/card";
import Grid from "../../../../../components/ui/Grid/grid";
import GridElement from "../../../../../components/ui/Grid/GridElement";
import TextBox from "../../../../../components/ui/TextBox";
import SelectBox from "../../../../../components/ui/SelectBox";
import ToggleSwitch from "../../../../../components/ui/ToggleSwitch/ToggleSwitch";
import DatePicker from "../../../../../components/ui/DatePicker/DatePicker";
import Checkbox from "../../../../../components/ui/Checkbox";
import TextArea from "../../../../../components/ui/TextArea";
import Button from "../../../../../components/ui/Button";
import ButtonPopUp from "../../../../../components/ui/ButtonPopUp";
import AdminLayout from "../../../../../components/adminLayout";

const Add = () => {
    const { loading, error, data } = useLazyQuery(GetAllCategoriesBorrowers);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const [ Active, setActive] = useState(true)
    return <div className="container">
        <div className="row">
            <div className="col s12">
                <Card>
                    <div className="card-content pb-0">
                        <div className="card-header mb-2">
                            <h4 className="card-title">Add Borrowers</h4>
                        </div>
                    </div>
                </Card>
                <form>
                    <Card>
                        <div className="card-content pb-0">
                            <div className="row">

                                <Grid>
                                    {/*todo Account code bar and status Brrowers(Lecteur)*/}

                                    <GridElement s={8} style={{ display: "flex"}}>
                                        {/*todo check code if not used by another Brroweers*/}
                                        <TextBox label="Code Bar"/>
                                        <SelectBox label={"Code statistique"}>
                                            <option value="Communauté de Communes">Communauté de Communes</option>
                                            <option value="Commune">Commune</option>
                                            <option value="Département">Département</option>
                                            <option value="Europe">Europe</option>
                                            <option value="France">France</option>
                                            <option value="Hors europe">Hors europe</option>
                                        </SelectBox>
                                    </GridElement>
                                    <GridElement s={4}>
                                        <ToggleSwitch label="Statues" sufix="Account " sufixActive="Active" sufixDesactive="Désative"
                                                      colorSufix={Active}
                                                      checked={Active}
                                                      onChange={ () =>{console.log(Active);setActive(!Active)}}
                                        />
                                    </GridElement>
                                    {/*todo Information Brrowers(Lecteur)*/}

                                    <GridElement>
                                        <Grid>
                                            <GridElement s={2} >
                                                <SelectBox label={"Professional"}>
                                                    <option value="Mr.">Mr.</option>
                                                    <option value="Mm.">Mm.</option>
                                                </SelectBox>
                                            </GridElement>

                                            <GridElement s={10} style={{ display: "flex"}}>
                                                <TextBox label="Nom" icon="phone"/>
                                                <TextBox label="Prénom" icon="phone"/>
                                                <DatePicker label="Birth Day" icon="phone"/>

                                                <SelectBox label={"Sexe"}>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </SelectBox>
                                            </GridElement>
                                        </Grid>
                                    </GridElement>

                                    {/*todo Contact Brrowers(Lecteur)*/}
                                    <GridElement s={12} >
                                        <Grid>
                                            <GridElement s={7} style={{ display: "flex" }} >
                                                <TextBox label="Email" />
                                                <TextBox label="Telephone" />
                                            </GridElement>
                                            <GridElement s={2}>
                                                <Checkbox label={"Send SMS"}/>
                                            </GridElement>
                                            <GridElement s={3} style={{ display: "flex" }} >
                                                <TextBox label="Autre Telephone" />
                                            </GridElement>
                                        </Grid>

                                    </GridElement>

                                    {/*todo Address Brrowers(Lecteur)*/}
                                    <GridElement s={12} style={{ display: "flex"}}>
                                        <TextBox label="Address (Ligne 1)"/>
                                        <TextBox label="Address (Ligne 2)"/>
                                        <TextBox label="Code Postal"/>
                                        <SelectBox label={"Ville"}>
                                            <option value="Rabat">Rabat</option>
                                            <option value="Tetouan">Tetouan</option>
                                        </SelectBox>
                                        <SelectBox label={"Pays"}>
                                            <option value="Maroc">Maroc</option>
                                            <option value="Spain">Spain</option>
                                        </SelectBox>
                                    </GridElement>

                                    {/*todo Caractéristique Brrowers(Lecteur)*/}

                                    <GridElement s={12} style={{ display: "flex"}}>
                                        <DatePicker label={"Adhésion Debuit"}/>
                                        <DatePicker label={"Adhésion Fin"}/>


                                        <SelectBox label={"Catégorie"}>
                                            {/*{
                                                data.GetAllCategoriesBorrowers.map((_id,namecategoriesbrrowers)=>(
                                                    <option key={_id}
                                                            value={namecategoriesbrrowers}
                                                    >
                                                        {namecategoriesbrrowers}
                                                    </option>
                                                ))
                                            }*/}
                                            <option value="Group1">Group1</option>
                                            <option value="Group2">Group2</option>
                                        </SelectBox>
                                    </GridElement>


                                    {/*todo OPAC Brrowers(Lecteur) Information */}
                                    <GridElement s={12} style={{ display: "flex"}}>
                                        <TextBox label="Identifiant OPAC"/>
                                        <TextBox label="Mot de passe OPAC"/>
                                        <SelectBox label={"Langue OPAC"}>
                                            <option value="Francias">Francias</option>
                                            <option value="English">English</option>
                                        </SelectBox>
                                        <SelectBox label={"Ajouter cet emprunteur à un groupe : "}>

                                            <option value="Group1">Group1</option>
                                            <option value="Group2">Group2</option>
                                        </SelectBox>
                                    </GridElement>

                                    {/*todo Send Message to BorrowersList*/}
                                    <GridElement s={12} style={{ display: "flex"}}>
                                        <TextArea label={"Message"} data-length="120"/>
                                    </GridElement>

                                </Grid>
                                <Button rounded={4}>Anullé</Button>
                                <Button rounded={4}>Submit</Button>

                            </div>
                        </div>
                    </Card>
                </form>
                <ButtonPopUp icon={"add"} hrf={"#"}/>

            </div>
        </div>
    </div>
}
Add.Layout = AdminLayout
export default Add