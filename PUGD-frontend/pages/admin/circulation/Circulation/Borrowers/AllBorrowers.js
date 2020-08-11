import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";


import {GetAllBro} from "@/graphql/queries/admin/Ciruclation/BorrowersList.query";

const AllBorrewors = () => {
    const { loading, error, data } = useQuery(GetAllBro);

    /*     ulisé logrque on'a un button , il ne s'execute pas automatiquement
        const [getGroups, { called, loading, data }] = useLazyQuery(
            GetAllGrroups
        );*/

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log(data === undefined)

    // var cts = this.props.message.createdAt,
    //   cdate = (new Date(cts)).toString();
    if(data != null || data !== undefined){
        data.GetAllBro.map((items) =>

                console.log("lecteur name : ",items.fullname),
            //console.log("Create At : ",moment(items.CreatAt).format("DD-MM-YYYY HH:mm"))
        )
    }
    const nul = <span style={{color:'#d60e28'}}>No Group finder</span>;


    return <div className="row">
        {/*=== get Groups initial pages */}

        <div className="col s12">
            {data == null ? nul : <Table Thead={
                <tr>
                    {/*<!-- data table responsive icons --> */}
                    <th></th>
                    {/*<!-- data table checkbox -->*/}
                    <th></th>
                    <th>
                        <span>name Groups</span>
                    </th>
                    <th>Responsable Group</th>
                    <th>date de Creation</th>
                    <th>Letter Rappel</th>
                    <th>Libelle Rappel</th>
                    <th>Mail RAppel</th>
                </tr>
            } Tbody={
                <tbody>
                {data.GetAllBro.map((items => (
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <a key={items._id} href={`"app-invoice-view.html"${items._id}`}>
                                {items.fullname}
                            </a>
                        </td>
                        <td>
                            <span className="chip lighten-5 red red-text"/>
                        </td>
                        <td>
                            <span className="bullet green"/>
ww                        </td>


                        <td>
                            <div className="invoice-action">
                                <a href="app-invoice-view.html" className="invoice-action-view mr-4">
                                    <i className="material-icons">remove_red_eye</i>
                                </a>
                                <a href="app-invoice-edit.html" className="invoice-action-edit">
                                    <i className="material-icons">edit</i>
                                </a>
                            </div>
                        </td>
                    </tr>
                )))}


                </tbody>
            }/>


            }
        </div>
    </div>

}
// export default withApollo({ssr:true})(AllGroups)

export default AllBorrewors
