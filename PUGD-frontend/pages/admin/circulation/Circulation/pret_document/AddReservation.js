import React, {useRef} from "react";
import AdminLayout from "../../../../../components/adminLayout";
import Circulation from "../../../../../components/admin/Circulations/Body/Body";
import CirculationHeader from "../../../../../components/admin/Circulations/Hedar/CirculationHeader";
import {useRouter} from "next/router";
import FormAuteurAndTilteComponent
    from "../../../../../components/admin/Circulations/Reservation/FormulaireAuteurAndTilte";

const AddReservations = () =>{
    const router = useRouter()
    const fullname = router.query.fullname
    console.log("full name : ", fullname)
    return <React.Fragment>
        <Circulation>
            <CirculationHeader Title={"Add Reservation for Borrower"}/>
            <ul id="issues-collection" className="collection z-depth-1 animate fadeRight">
                <li className="collection-item avatar">
                    <i className="material-icons orange darken-4 circle">add</i>
                    <h5 className="collection-header m-0">Reservation</h5>
                    <p>Création d'une réservation pour le lecteur  :&nbsp;&nbsp;
                        <span className="task-cat teal accent-4">{fullname}</span>
                    </p>
                    <a href={"#"}>Auteur/titre,</a>&nbsp;&nbsp;
                    <a href={"#"}>Catégories/Index. décimale,</a>&nbsp;&nbsp;
                    <a href={"#"}>Termes des catégories,</a>&nbsp;&nbsp;
                    <a href={"#"}>Éditeur/collection,</a>&nbsp;&nbsp;
                    <a href={"#"}>Paniers,</a>&nbsp;&nbsp;
                    <a href={"#"}>Multi-critères.</a>&nbsp;&nbsp;
                </li>
                <FormAuteurAndTilteComponent/>
            </ul>
        </Circulation>

    </React.Fragment>
}

AddReservations.Layout = AdminLayout
export default AddReservations
