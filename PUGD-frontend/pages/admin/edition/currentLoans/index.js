import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";

import {GET_LOANS} from "../../../../graphql/queries/admin/Reporting/loans.queries"

import AdminLayout from "../../../../components/adminLayout";

import TableLoans from "./TableLoans";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"

const CurrentLoans= () => {

    
      const { loading, error, data } = useQuery(GET_LOANS)
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" />        
                <div>
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                       <TableLoans getloans={data.getLoans} ></TableLoans>
                   ) }
            </div>  
            </Reporting>
      );
    };
    CurrentLoans.Layout = AdminLayout;
    export default CurrentLoans;