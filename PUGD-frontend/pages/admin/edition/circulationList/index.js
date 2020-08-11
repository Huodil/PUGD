import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import Button from "../../../../components/ui/Button";
import Table from "../../../../components/ui/Table/Table";
const CopyHome = () => {
    return <Reporting>
        <ReportingHeader ReportingModule="Circulation List" />

        <Table
            Thead={
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            }
        />

        <Button rounded={2}>
            Add Template
        </Button>
    </Reporting>

}
CopyHome.Layout = AdminLayout
export default CopyHome
