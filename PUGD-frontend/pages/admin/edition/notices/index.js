import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
const CopyHome = () => {
    return <Reporting>
        <ReportingHeader ReportingModule="Notices" />
    </Reporting>

}
CopyHome.Layout = AdminLayout
export default CopyHome
