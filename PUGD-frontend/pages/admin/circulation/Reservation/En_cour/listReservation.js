import React from 'react'
import Table from "components/ui/Table/Table";
import {FullDate} from "../../../../../shared/_herlpersCirculation/_helpers";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_RESERVATIONS} from "../../../../../graphql/queries/admin/Ciruclation/Reservation.query";

const ListReservation = (props) => {
    const dateFormat = "DD-MM-YYYY"
    const nul = <span style={{color:'#d60e28'}}>No Group finder</span>;
    const  { loading, error, data } = useQuery(GET_ALL_RESERVATIONS);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (data != null || data !== undefined){
        console.log(" data = ", data.GetAllReservation.confirmed)
        /* data.getAllReservation.map((items) =>
                 console.log("lecteur name : ",items.Borrwore.fullname),
             //console.log("Create At : ",moment(items.CreatAt).format("DD-MM-YYYY HH:mm"))
         )*/
    }

    if(error !== null){
        console.log("Error type:\n",error)
    }
    return <div className="row">
        <div className="col s12">
            <Table  Thead={
                <tr>
                    <td></td>
                    <th className="background-image-none center-align">
                        <label>
                            <input type="checkbox" onClick="toggle(this)"/>
                            <span/>
                        </label>
                    </th>
                    <th>Titre</th>
                    <th>Emprunteur </th>
                    <th>Rang</th>
                    <th>réservation</th>
                    <th>retour prevu</th>
                    <th>Fin validité</th>
                    <th>Sélection</th>
                </tr>
            } Tbody={
                data.GetAllReservation.map((res)=>{
                    // eslint-disable-next-line react/jsx-key
                    return <React.Fragment>
                        <tr>
                            <td></td>
                            <td className="center-align contact-checkbox">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="foo"/>
                                    <span/>
                                </label>
                            </td>
                            <td width="250">
                                <div className="chip gradient darken-1-text">

                                    <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                         alt="Materialize"/>
                                    {res.Copy.Record.Title}

                                </div>
                                {/*todo add cote form grahql*/}
                                <span className="display-block chip green lighten-5 green-text">
                                    COTE : 9DEL
                                </span>
                            </td>
                            <td width="250">
                                <div className="chip text-darken-1">
                                    <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                         alt="Materialize"/>
                                    {res.Borrwore.first_name +" "+res.Borrwore.last_name}
                                </div>
                                <span className="task display-block">{res.Borrwore.localisation.Name}</span>
                            </td>

                            <td>{res.Rank}</td>
                            <td className="" width="40">
                                <span className="task-cat teal accent-4 display-block">{FullDate(res.dateres)}</span>
                            </td>
                            {/*TODO fix calcule logique*/}
                            <td >
                                <span className="task-cat red accent-2 display-block">24-05-2020</span>
                            </td>

                            <td>
                                <span className="task-cat red accent-2 display-block">24-05-2020</span>
                            </td>
                            <td>H9</td>
                        </tr>
                    </React.Fragment>
                })
            }/>
        </div>
    </div>

}
// export default withApollo({ssr:true})(AllGroups)

export default ListReservation
