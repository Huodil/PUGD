import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";

import {getRecord} from "../../../../../graphql/queries/admin/Reporting/Record.queries"

import Card from "../../../../../components/ui/card/card";
import AdminLayout from "../../../../../components/adminLayout";
import Button from "../../../../../components/ui/Button";


import ContentTable from "./ContentTable";
import ReportingHeader from "../../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../../components/admin/reporting/body/body"
import TextBox from '../../../../../components/ui/TextBox';
const Content = () => {
  
  
    const [Content, setContent] = useState("") 
      function splitfunction(e) {
        return e
          .split("(")[1]
          .split(")")[0]
          .replace(/^"(.*)"$/, "$1");
      }
    
      const { loading, error, data } = useQuery(getRecord, {
        variables: { ContentType:Content },
      });
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
     
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" ><h5>liste des articles par le type de contenu</h5></ReportingHeader>        
        
                <div className="col s12">
                  <form>
      <Card>
                            <div className="row">
                                <div className="card-header">
                                </div>
                                        <TextBox
                                            label="type de contenu"
                                            type="text"
                                           onChange={event => { setContent(event.target.value) }}
                                            value={Content}
                                        />
                            </div>
                        </Card>
                    </form>
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                       <ContentTable  getRecord={data.GetRecord} ></ContentTable>     
                   ) }
                
            </div>  
            </Reporting>
           
      );
    };
    
    Content.Layout = AdminLayout;
    export default Content;
    