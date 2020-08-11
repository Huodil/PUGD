import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";

import {getRecord} from "../../../../../graphql/queries/admin/Reporting/Record.queries"
//import { GetRecord } from "../../../../graphql/queries/reporting/record.queries";
//import { DeleteProvider } from "../../../graphql/mutations/acquisition/provider";
//import CardTitle from "../../../../components/ui/card/cardTitle";
import Card from "../../../../../components/ui/card/card";
import AdminLayout from "../../../../../components/adminLayout";
import Button from "../../../../../components/ui/Button";
//import TextBox from "../../../../../components/ui/Button";
//import CardContent from '"../../../../../components/ui/card/CardContent';
//import Button from ".././../../components/ui/Button";
import RedactorTable from "./RedactorTable";
import ReportingHeader from "../../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../../components/admin/reporting/body/body"
import TextBox from '../../../../../components/ui/TextBox';
const Redactor = () => {
  
  
    const [Redactor, setRedactor] = useState("") 
      function splitfunction(e) {
        return e
          .split("(")[1]
          .split(")")[0]
          .replace(/^"(.*)"$/, "$1");
      }
    
      const { loading, error, data } = useQuery(getRecord, {
        variables: { Redactor:Redactor },
      });
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
     
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" ><Card> <h>Etats : Personnalisables</h></Card></ReportingHeader>        
        <Card> <h>Portail : Liste des articles selon le rédacteur</h></Card>
                <div className="col s12">
                  <form>
      
                        <Card>
                            <div className="row">
                                <div className="card-header">
                                   
    
                                </div>
                               
                                
                                    
                                        <TextBox
                                            label="Rédacteur "
                                            type="text"
                                           onChange={event => { setRedactor(event.target.value) }}
                                            value={Redactor}
                                        />
                                        
                                    
                                
                            </div>
                        </Card>
                    </form>
                    
                    
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                  
                       <RedactorTable  getRecord={data.GetRecord} ></RedactorTable>
                    
                           
                   ) }
                
            </div>  
            </Reporting>
           
      );
    };
    
    Redactor.Layout = AdminLayout;
    export default Redactor;
    