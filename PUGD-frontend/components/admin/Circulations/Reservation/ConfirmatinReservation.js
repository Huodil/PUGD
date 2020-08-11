import React from "react";
import Card from "../../../ui/card/card";
import Button from "../../../ui/Button";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_RESERVATION} from "../../../../graphql/mutations/admin/circulation/Reservation.muatation";


const ConfirmationReservationPanel = ({refetch,borrower,reservationId, ...props}) => {

    const [valid] = useMutation(UPDATE_RESERVATION)
    console.log("re : ",refetch)
    const onValidReservation = () =>{
        console.log("valid",reservationId)
        valid({variables: {_id: reservationId}})
    }
    return <React.Fragment>
        <Card>
            <div className="row">
                <div className="col s12 m8 l8">
                    <h5 className="red-text "><b>Réservation</b></h5>
                    <p>Ce document est reservé par le lecteur: &nbsp;&nbsp;
                        <span className="chip  teal-text">
                            <b>
                            {borrower && borrower.first_name + " " + borrower.last_name}&nbsp;
                            ( # {borrower && borrower.bar_code} )
                            </b>
                        </span>
                    </p>
                </div>
                <div className="col s12 m4 l4">
                    <Button onClick={onValidReservation}>Validé la Reservation</Button>
                </div>
            </div>
        </Card>
    </React.Fragment>
}
export default ConfirmationReservationPanel