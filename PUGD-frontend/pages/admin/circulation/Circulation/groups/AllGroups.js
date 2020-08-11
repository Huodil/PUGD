import React from 'react'
import Checkbox from "@/components/ui/Checkbox";
import {useQuery} from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";
import {GetAllGrroups} from "@/graphql/queries/admin/Ciruclation/groups.query";
import moment from 'moment'
import ChipText from "@/components/ui/Text/ChipText";

const AllGroups = () => {
    const { loading, error, data } = useQuery(GetAllGrroups);



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
        data.GetAllGrroups.map((items)=>

        console.log("lettre groups : ",items.letterrappel),
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
                    {data.GetAllGrroups.map((items => (
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <a key={items.id} href={`"app-invoice-view.html"${items._id}`}>
                                    {items.namegroups}
                                </a>
                            </td>
                            <td>
                                <span className="chip lighten-5 red red-text">{items.respgroup}</span>
                            </td>
                            <td>
                                <span className="bullet green"></span>
                                <small>{moment(items.CreatAt).format("DD-MM-YYYY HH:mm")}</small>
                            </td>
                            <td>
                                {items.letterrappel  === true ?
                                    // eslint-disable-next-line react/no-children-prop
                                    <ChipText children={'Active'} color={'blue'} ligthen={5}/>
                                    :<ChipText children={'Desactive'} color={'red'} ligthen={5}/>}


                            </td>
                            <td>
                                {items.libellegroup  === true ?
                                    // eslint-disable-next-line react/no-children-prop
                                    <ChipText children={'Active'} color={'blue'} ligthen={5}/>
                                    :<ChipText children={'Desactive'} color={'red'} ligthen={5}/>}


                            </td>
                            <td>
                                {items.mailrappel  === true ?
                                    // eslint-disable-next-line react/no-children-prop
                                    <ChipText children={'Active'} color={'blue'} ligthen={5}/>
                                    :<ChipText children={'Desactive'} color={'red'} ligthen={5}/>}


                            </td>

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

export default AllGroups
