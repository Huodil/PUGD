import React from 'react'
import AdminLayout from '@/components/adminLayout'
import Card from "@/components/ui/card/card";
import ListReservation from "./listReservation";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_RESERVATIONS} from "@/graphql/queries/admin/Ciruclation/Reservation.query";

const resv = () => {
    const nul = <span style={{color:'#d60e28'}}>No Reservation with this id finder</span>;

    const  { loading, error, data } = useQuery(GET_ALL_RESERVATIONS);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (data !== null ){
        data.getAllReservation.map((items) =>
                console.log("lecteur name : ",items.Borrwore.fullname),
        )
    }

    if(error !== null){
        console.log(error)
    }

    /*const onSearchHandler = (e) => {

        e.preventDefault();
        GetGroupsByName({
            variables: {
                name: name,
            }
        });
    }*/
    return <div className="container">
        <div className="row">
            <div className="col s12">
                    <Card>
                        <div className="row">
                            <div className="card-header">
                                <h4 className="card-title">Resersvation Depasser</h4>
                            </div>
                        </div>
                    </Card>
                {/*list des Reservation*/}
                <ListReservation datamap={data.getAllReservation} />
            </div>
        </div>
    </div>
}
resv.Layout = AdminLayout
export default resv