import React from 'react'
import Card from 'components/ui/card/card'
import Table from "../../../ui/Table/Table";
import HavePret from "./HavePret";


const DocumentTable = ({statusDoc,DataSet,...props}) => {
    return (
        <React.Fragment>
            <div className="card-panel">
                <div className="row">
                    <div className="col s12 m7 l7">
                    <a href="#" className="float-left">
                        <h5 className="display-inline">
                            {DataSet && DataSet.Record.Title},
                            {DataSet && DataSet.Record.RecYear}
                        </h5>
                    </a>
                    </div>
                    <div className="col s12 m5 l5">
                        {statusDoc}
                    </div>
                </div>

                <div className="row">
                    <Table Thead={
                        <tr>
                            <th></th>
                            <th>NO.</th>
                            <th>COTE</th>
                            <th>SUPPORT</th>
                            <th>LOCALISATION</th>
                            <th>SECTION</th>
                            <th>STATUT</th>
                            <th>PROPRIÉTAIRE</th>
                        </tr>
                    } Tbody={
                        <tr>
                            <td></td>

                            <td>
                                <a href={"#"}>
                                    {DataSet && DataSet.BareCode}
                                </a>
                            </td>
                            <td><span className="chip  teal-text" >{DataSet && DataSet.Cote}</span></td>
                            <td>{DataSet && DataSet.MediaType.media_types_name}</td>
                            <td>{DataSet && DataSet.Localisation.Name}</td>
                            <td>{DataSet && DataSet.Section.section_name}</td>
                            <td>{DataSet && DataSet.Status.status_name}</td>
                            <td>{DataSet && DataSet.Owner.owner_name}</td>
                        </tr>
                    }/>
                </div>
            </div>

        </React.Fragment>
    )
}
export default DocumentTable
