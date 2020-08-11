import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import Reporting from "../../../../components/admin/reporting/body/body"
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
const borrowersHome = () => {
    return <Reporting>
        <ReportingHeader ReportingModule="Loan Group" />
    </Reporting>


}
borrowersHome.Layout = AdminLayout
export default borrowersHome
