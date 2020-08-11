import React from 'react'
import AdminLayout from '../../../../components/adminLayout'
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import Table from "../../../../components/ui/Table/Table";
import Button from "../../../../components/ui/Button";
const CopyHome = () => {
    return <Reporting>
        <ReportingHeader ReportingModule="Patterns Of Stickers Sheets" />


        <Table
            Thead={
                <tr>
                    <th>Label</th>
                    <th>PageFormat</th>
                    <th>PageOrientation</th>
                </tr>
                    }
                    />

        <Button rounded={2}>
            Add
        </Button>
    </Reporting>

}
CopyHome.Layout = AdminLayout
export default CopyHome
