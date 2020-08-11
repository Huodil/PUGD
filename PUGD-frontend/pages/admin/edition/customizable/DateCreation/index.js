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
import DateTable from "./DateTable";
import ReportingHeader from "../../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../../components/admin/reporting/body/body"
import TextBox from '../../../../../components/ui/TextBox';
const DateCreation = () => {
  
  
    const [YearPublishing, setYearPublishing] = useState() 
      function splitfunction(e) {
        return e
          .split("(")[1]
          .split(")")[0]
          .replace(/^"(.*)"$/, "$1");
      }
    
      const { loading, error, data } = useQuery(getRecord, {
        variables: { YearPublishing: YearPublishing },
      });
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
     
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" />        
        
                <div className="col s12">
                  <form>
      
                        <Card>
                            <div className="row">
                                <div className="card-header">
                                    <h4 className="card-title">list des Articles par la date de création</h4>
    
                                </div>
                               
                                
                                    
                                        <TextBox
                                            label="Date de création "
                                            type="text"
                                           onChange={event => { setYearPublishing(event.target.value) }}
                                            value={YearPublishing}
                                        />
                                        
                                    
                                
                            </div>
                        </Card>
                    </form>
                    
                    
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                  
                       <DateTable  getRecord={data.GetRecord} ></DateTable>
                    
                           
                   ) }
                
            </div>  
            </Reporting>
           
      );
    };
    
    DateCreation.Layout = AdminLayout;
    export default DateCreation;
    