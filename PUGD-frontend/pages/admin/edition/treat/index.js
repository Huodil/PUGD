import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import MenuItem from '@material-ui/core/MenuItem';
import {GET_ReservationTrait} from "../../../../graphql/queries/admin/Reporting/Reservation.queries"
import Card from "../../../../components/ui/card/card";
import AdminLayout from "../../../../components/adminLayout";
import Button from "../../../../components/ui/Button";
import TreatTable from "./TreatTable";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import SelectBox from '../../../../components/ui/SelectBox';

const treat = () => {

    
      const { loading, error, data } = useQuery(GET_ReservationTrait)
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" />  
        <Card> <h>Réservations : A traiter</h></Card>    
        <div></div>  
                <div>
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                       <TreatTable  getReservation={data.GetReservationstrait} ></TreatTable>
                   ) }
            </div>  
            </Reporting>
      );
    };
    treat.Layout = AdminLayout;
    export default treat;