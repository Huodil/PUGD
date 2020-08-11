import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import Table from "../../../../components/ui/Table/Table";
import Button from "../../../../components/ui/Button";
import {useQuery} from "@apollo/react-hooks";
import TableBorrower from "./TablerEndSubscription";
import {GET_BORROWERS_EXPERATION} from "../../../../graphql/queries/admin/reporting/borrowers.queries";
import Card from "../../../../components/ui/card/card";
const EndOfSub = () => {
    const {loading, error, data} = useQuery(GET_BORROWERS_EXPERATION)
    return <Reporting>
        <ReportingHeader ReportingModule="End Of Subscription" />
        <Card> <h>Lecteurs: Abonnement expiré</h></Card>
        <div>
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                    <TableBorrower getborrower={ data.GetBorrowerexpiration} ></TableBorrower>
                   ) }
            </div>  
    </Reporting>

}
EndOfSub.Layout = AdminLayout
export default EndOfSub
