import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Collapse from '@material-ui/core/Collapse';
import RoundButton from '@/components/ui/RoundButton/RoundButton';

import TextBox from '../../../../../components/ui/TextBox';
import SelectBox from '../../../../../components/ui/SelectBox';
import Checkbox from '../../../../../components/ui/Checkbox';
import ReportingHeader from "../../../../../components/admin/reporting/header/reportingHeader";
import Reporting from "../../../../../components/admin/reporting/body/body";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GetAllProviders } from "@/graphql/queries/acquisition/provider";
import Card from "../../../../../components/ui/card/card";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import MaterialTable from "material-table-formik";
import Container from "@/components/ui/Container";
import CollapsibleBody from "@/components/ui/Collapsible/CollapsibleBody";
import Collapsible from "@/components/ui/Collapsible/Collapsible";
import CollapsibleHeader from "@/components/ui/Collapsible/CollapsibleHeader";
import AdminLayout from "@/components/adminLayout";
import Variable from "./Variable"
import Router from "next/router";
import Filtre from "./Filter";

const addState = () => {
    
  
   var [categories, setcategories] = useState("") 
  

    var [categories, setcategories] = useState("") 
   // if(categories=="exemplaire ")
    return <Reporting>
        <div>
        <ReportingHeader ReportingModule="Configurable states" /> 
        <Card> <h>Etats paramétrables</h></Card>
        <div className="card-content">
        <Container>
            <Card><div>Ajouter une procédure</div></Card>
            <GridElement s={8} style={{ display: "flex"}}>
                                        {/*todo check code if not used by another Brroweers*/}
                                        <TextBox label="Nome de l'état"/>
                                        <SelectBox label={"Source de données"} value={categories}
                                        onChange={event => { setcategories(event.target.value) }}>
                                       <option value="Choisissez une source de données">Choisissez une source de données</option>
                                            <option value="pret">prêt</option>
                                            <option value="Notice">Notice</option>
                                            <option value="exemplaire">exemplaire</option>
                                            <option value="lecteur">lecteur</option>
                                            <option value="Document numirique">Document numirique</option>
                                            <option value="catégories">catégories</option>
                                        </SelectBox>
                                    </GridElement>     
<div>{categories}</div>         
                                    <TextBox label="commentaire"/>
                                    <GridElement s={15} style={{ display: "flex" ,innerHeight:"12px"}}>  
                           <Collapsible >
            <li>
                           <CollapsibleHeader headerHeight={83}>
                    
                        <GridElement s={6}>
                            <h8>Variables</h8>
                        </GridElement>
                 
                </CollapsibleHeader>
                <CollapsibleBody>
                    
                    <Grid>
                        <GridElement s={12}>
                            <Variable props={categories} />
                        </GridElement>
                    </Grid>
                </CollapsibleBody>
            </li >
           

        </Collapsible >
        <Collapsible >
            <li>
                           <CollapsibleHeader headerHeight={83}>
                    
                        <GridElement s={6} >
                            <h8>filtre</h8>
                        </GridElement>
                 
                </CollapsibleHeader>
                <CollapsibleBody>
                    
                    <Grid>
                        <GridElement s={12}>
                        
                        </GridElement>
                    </Grid>
                </CollapsibleBody>
            </li >
           

        </Collapsible >
        </GridElement>
        <GridElement s={10} style={{ display: "flex"}}>
                                    <Button href="/admin/edition/configurable/AddState" rounded={2}>  enregistrer </Button>
                     <Button href="/admin/edition/configurable/AddState" rounded={2}> Annuler </Button>     
                     </GridElement>
                    
                    
                   
                           </Container>
                    </div>
                 
                   
</div>
                   
    </Reporting>
}

addState.Layout = AdminLayout
export default addState
