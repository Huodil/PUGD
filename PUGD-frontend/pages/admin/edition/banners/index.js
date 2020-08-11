import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import Table from "../../../../components/ui/Table/Table";
import Button from "../../../../components/ui/Button";
const CopyHome = () => {
    return <Reporting>
        <ReportingHeader ReportingModule="Banners" />

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
