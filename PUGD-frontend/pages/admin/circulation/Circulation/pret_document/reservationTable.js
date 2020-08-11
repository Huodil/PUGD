import React from 'react'
import {FullDate, splitfunction} from "../../../../../shared/_herlpersCirculation/_helpers";
import Button from "../../../../../components/ui/Button";
import Link from 'next/link'
import Checkbox from "../../../../../components/ui/Checkbox";


const ReservationTable = (props) => {
    const {reservations} = props
    const {title} = props

    console.log("reservations form ReservationsTable.js ", reservations)

    const onHandlerValidateReservation = () => {

        console.log("onHandlerValidateReservation")
    }

    return <React.Fragment>
        <div className="row">
            <div className="col s12 m6 l4">
                <a href="#" className="float-left">
                    <h5 className="display-inline">
                        {title}
                    </h5>
                </a>
            </div>
            <div className="col s12 m6 l4">

                <Link href="../pret_document/AddReservation">
                    <Button className="btn waves-effect waves-light blue darken-2 center" rounded={5}>
                        <i className="material-icons left">add</i>
                        Ajouter un Reservation
                    </Button>
                </Link>
            </div>
        </div>
        <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Confirmé</th>
                    <th scope="col">Name</th>
                    <th scope="col">COTE</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Date Reservation</th>
                    <th scope="col">Date Retour</th>
                    <th scope="col">Date Validation</th>

                </tr>
                </thead>
                <tbody>
                {reservations != null || reservations !== undefined ? reservations.map(reservation => {
                    return <React.Fragment>
                        <tr key={splitfunction(reservation.copy._id)}>
                            <td>
                                <Checkbox  className="center"/>
                            </td>
                            <td>
                                <div className="chip task display-bloc text-darken-1">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                        alt="Materialize"/>
                                    {reservation.copy.Record.Title}
                                </div>
                            </td>
                            <td>

                                {/*<span className="chip center white-text deep-purple  task display-block">
                                    {reservation.copy.MediaType && reservation.copy.MediaType.media_types_name}
                                </span>*/}
                                <span className="chip center teal white-text task display-block">{
                                    reservation.copy.Cote ? reservation.copy.Cote : "-"
                                }</span>
                            </td>
                            <td>
                                {/*<span className="chip center white-text light-blue darken-4 display-block">
                                {reservation.copy.Section && reservation.copy.Section.section_name}
                            </span>*/}
                                <span className="chip center teal white-text task display-block">
                                {reservation && reservation.rank}
                            </span>

                            </td>
                            <td>
                                <span className="chip center whit black-text task display-block">
                                    <b>{
                                        reservation.date_init ? FullDate(reservation.date_init) : "-" // date reservaion
                                        }
                                    </b>
                                </span>
                            </td>
                            <td>

                                <span className="chip center whit black-text task display-block">
                                    <b>{
                                        reservation.rank === 1 && reservation.date_retour !== null ?
                                            "en ranyon" : FullDate(reservation.date_retour)
                                    }</b>
                                </span>
                            </td>
                            <td>

                                <span className="chip center teal white-text task display-block">
                                    <b>{
                                        reservation.date_prolongement ? FullDate(reservation.date_prolongement) : "-"
                                        }
                                    </b>
                                </span>
                            </td>


                            {/*<a
                        href="#"
                        className="invoice-action-view mr-4"
                        onClick={(e) => {
                            deleteOnecopy({
                                variables: { _id: splitfunction(item._id) },
                                refetchQueries: [
                                    { query: copy},
                                ],
                            });
                        }}
                    >
                        <i className="material-icons">delete</i>
                    </a>
                    <a
                        href={`/admin/circulation/Circulations/pret_document/UpdateBorrowers?id=${(
                            item._id
                        )}`}
                        className="invoice-action-edit"
                    >
                        <i className="material-icons">edit</i>
                    </a>*/}
                        </tr>
                    </React.Fragment>;
                }) : <p></p>}
                </tbody>
            </table>
        </div>
    </React.Fragment>
}
export default ReservationTable;
