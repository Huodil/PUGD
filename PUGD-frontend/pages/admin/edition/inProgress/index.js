import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import MenuItem from '@material-ui/core/MenuItem';
import {GET_Reservation} from "../../../../graphql/queries/admin/Reporting/Reservation.queries"
import Card from "../../../../components/ui/card/card";
import AdminLayout from "../../../../components/adminLayout";
import Button from "../../../../components/ui/Button";
import ReservationTable from "./TableReservation";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import SelectBox from '../../../../components/ui/SelectBox';

const Reservation = () => {

    
      const { loading, error, data } = useQuery(GET_Reservation)
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" />        
        <Card> <h>Réservations :En cours</h></Card>
                <div>
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                       <ReservationTable  getReservation={data.GetAllReservations} ></ReservationTable>
                   ) }
            </div>  
            </Reporting>
      );
    };
    Reservation.Layout = AdminLayout;
    export default Reservation;