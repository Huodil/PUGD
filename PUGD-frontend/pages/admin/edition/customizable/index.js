import React from 'react'
import Card from '../../../../components/ui/card/card';
import AdminLayout from '../../../../components/adminLayout'
import Reporting from "../../../../components/admin/reporting/body/body";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader";

const borrowersHome = () => {
    return <Reporting>
     <ReportingHeader> <Card> <h>Etats : Personnalisables</h></Card></ReportingHeader>
        <Card>
        
        <div>
    
        <div id="card-stats" className="pt-0">
        <div className="row">
      <Card style={{width: "40rem",color:"#FFFFFF",border: "1px solid #FFFFF",background:"#AD1457",}}>  
        
      
  <h><a href="customizable/Redactor">Liste des articles selon le rédacteur</a></h>
  </Card>
  <Card style={{width: "40rem",color:"#FFFFFF",border: "1px solid #d93878",background:"#AD1457",}}>
  <h><a href="customizable/DateCreation">Liste des articles par la date de création</a></h>
  </Card>
  <Card style={{width: "40rem",color:"#FFFFFF",border: "1px solid #d93878",background:"#AD1457",}}>
  <h><a href="customizable/Contenttype">Liste des articles par le type de contenu</a></h>
  
</Card>
  
</div>  
</div>
                                         
                                          
                                       
                                        

   
   
    <style jsx>
                {`
    a {
      list-style-type: none;
      margin: 0;
      padding: 0;
    
      ;
    }
    
    h a {
      display: block;
      color: #000;
      padding: 8px 16px;
      text-decoration: none;
    }
    
    
    h a:hover {
      background-color: #880E4F;
      color: white;
    }
    `}
            </style>
        
    
    </div>
    </Card>
        </Reporting>

}
borrowersHome.Layout = AdminLayout
export default borrowersHome
