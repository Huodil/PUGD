import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import GridElement from "../../../../components/ui/Grid/GridElement";
import Grid from "../../../../components/ui/Grid/grid";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader";
import Reporting from "../../../../components/admin/reporting/body/body";
import Card from "../../../../components/ui/Card/card";
import Button from "../../../../components/ui/Button";

const CopyHome = () => {


    
    return <Reporting>
        <div>
            
      
        <ReportingHeader ReportingModule="Configurable states" />
        <Card> <h>Etats paramétrables</h></Card>
       <Card>
            <Grid>
                                       
                
            <div className="title">Liste des états de configuration </div>
            <Card style={{width: "18rem",color:" #ff548e",border: "10px solid #FFFFF",background:"#FFFFFF",}}>
            
           
            
          <ul>list des notices{}</ul>
       
             
               <Grid>
               
               <GridElement s={8} >
                    <Button href="/admin/edition/configurable/AddState" rounded={6}>Modifier</Button>
                     <Button href="/admin/edition/configurable/AddState" rounded={2}>exécuter</Button>
                                        </GridElement>
               </Grid>
            </Card>
            <Button  href="/admin/edition/configurable/AddState" rounded={2}>
             Ajouter uu état
            </Button>
            </Grid>
            </Card>
            
           </div>
           
    </Reporting>

}
CopyHome.Layout = AdminLayout
export default CopyHome
