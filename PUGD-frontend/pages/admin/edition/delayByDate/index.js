import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_Delay} from "../../../../graphql/queries/admin/Reporting/loans.queries"

import AdminLayout from "../../../../components/adminLayout";

import DelayTable from "./delayTable";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import Card from "../../../../components/ui/card/card";
const DelayByDate= () => {

    
      const { loading, error, data } = useQuery(GET_Delay)
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" /> 
        <Card> <h>Prêts : Retards par date</h></Card>
                <div> 
                    {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                       <DelayTable getDelay={data.GetDelay} ></DelayTable>
                   ) }
            </div>  
            </Reporting>
      );
    };
  DelayByDate.Layout = AdminLayout;
    export default DelayByDate;