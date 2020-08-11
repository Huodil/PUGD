import React from "react";
import Card from "../../../ui/card/card";
import Table from "../../../ui/Table/Table";
import Button from "../../../ui/Button";
import {useMutation} from "@apollo/react-hooks";
import {INSERT_RESERVATION} from "../../../../graphql/mutations/admin/circulation/Reservation.muatation";
import {useRouter} from "next/router";
import {splitfunction} from "../../../../shared/_herlpersCirculation/_helpers";

const ReservationPrevision = ({search, ...props}) => {
    const Router = useRouter()
    let iduser = Router.query.id
    let copy = search[0]
    /*
    const [startReservation, setStartReservation] = useState(new Date())
    const [endReservation, setEndReservation] = useState(new Date())
    */

    const [addReservation] = useMutation(INSERT_RESERVATION,{
        onCompleted: () => {
            Router.push({
                pathname: '/admin/circulation/Circulation/Borrowers/DetailsBorrower',
                query: {id:iduser}
            })
        }
    })
    const onSubmit = () => {

        console.log("cpy BareCode ", search[0].BareCode)
        console.log("id user ", iduser)
        addReservation({
            variables: {
                copy_code: search[0].BareCode,
                borrower: iduser,
            }
        })
    }
    if (search !== undefined) {
        console.log("id :", search[0]._id)
        /*search.map(item => {
            console.log(item.Record.Title)
            console.log("item :",item)
            console.log("id cp :",item._id)
        })*/
        return (
            <React.Fragment>
                <Card>

                    <div className="pt-0 ">
                        {/*<div className="col m6">
                                    <DatePicker label="debuit de :"
                                                icon="today"
                                                required
                                                className="validate"
                                                value={startReservation}
                                                onChange={(e) => {
                                                    e.persist();
                                                    setStartReservation(e.target.value)
                                                }}
                                    />
                                </div>
                                <div className="col m6">
                                    <DatePicker id="return"
                                        label="jusqu'a le :"
                                                icon="today"
                                                required
                                                className="validate"
                                                value={endReservation.toISOString().split("T")[0] || ""}
                                                onChange={(e) => {
                                                    e.persist();
                                                    setEndReservation(new Date(e.target.value))
                                                }}
                                    />
                                </div>*/}
                        <Table Tbody={
                            <tr key={copy._id}>
                                <td><h6> {copy.BareCode} </h6></td>
                                <td>
                                    <h6> {copy.Record.Title} </h6>
                                </td>
                                <td>
                                    <Button onClick={onSubmit}>Reservé</Button>
                                </td>
                            </tr>
                        }/>
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}
export default ReservationPrevision