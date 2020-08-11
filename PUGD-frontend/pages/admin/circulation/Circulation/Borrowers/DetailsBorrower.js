import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {BORROWER_WITH_PRET_AND_RSV} from "../../../../../graphql/queries/admin/Ciruclation/Borrowers.query";
import React from "react";
import Circulation from "../../../../../components/admin/Circulations/Body/Body";
import CirculationHeader from "../../../../../components/admin/Circulations/Hedar/CirculationHeader";
import Profiles from "../../../../../components/admin/Circulations/Borrwer/Profiles";
import AddPretComponent from "../../../../../components/admin/Circulations/Pret_Document/AddPretComponent";
import PretTable from "../pret_document/pretTable";
import ReservationTable from "../pret_document/reservationTable";
import AdminLayout from "../../../../../components/adminLayout";
import MoreDetails from "../../../../../components/admin/Circulations/Borrwer/infoAndAdress";

const DetailsBorrower = () => {
    const router = useRouter()
    const _id = router.query.id;

    console.log(_id);
    const {data, error, refetch} = useQuery(BORROWER_WITH_PRET_AND_RSV, {
        variables: {id: _id},
    });
    if (error) {
        console.log("error :", error)
    }
    console.log("pret_document/Borrower : \n", data);

    let fullName = ""
    if (data && data.GetBorrowerWithPretAndReservation.Borrower) {
        fullName = data.GetBorrowerWithPretAndReservation.Borrower.first_name + " " + data.GetBorrowerWithPretAndReservation.Borrower.last_name
    }

    return <React.Fragment>
        <Circulation>
            <CirculationHeader Title={"Détails Emprunteur"}/>
            <div className="card">
                <div className="card-content">
                    <h5>Détails Emprunteur</h5>
                    <div className="card-content">
                        <div className="row">
                            <Profiles
                                Borrower={data && data.GetBorrowerWithPretAndReservation.Borrower}
                                total_Pret={data && data.GetBorrowerWithPretAndReservation.All_Pret.length}
                                total_reservation={data && data.GetBorrowerWithPretAndReservation.All_Reservation.length}
                                total_retard={0} //{data && data.GetBorrowerWithPretAndReservation.total_retard.length}
                                children={
                                    <MoreDetails Borrower={data && data.GetBorrowerWithPretAndReservation.Borrower}/>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-panel">
                <AddPretComponent iduser={_id} fullName={fullName} refetch={refetch}/>
            </div>
            {
                data && data && data.GetBorrowerWithPretAndReservation.All_Pret.length !== 0
                    ?
                    <div className="card-panel">
                        <PretTable title="List Pret"
                                   All_Pret={data && data.GetBorrowerWithPretAndReservation.All_Pret}
                                   user={data && data.GetBorrowerWithPretAndReservation.Borrower._id}
                        />
                    </div>

                    : " "
            }
            {
                data && data.GetBorrowerWithPretAndReservation.All_Reservation.length !== 0
                    ? <div className="card-panel">
                        <ReservationTable
                            title={"List Reservation"}
                            reservations={data && data.GetBorrowerWithPretAndReservation.All_Reservation}/>

                    </div> : ""
            }
        </Circulation>
    </React.Fragment>

}
DetailsBorrower.Layout = AdminLayout
export default DetailsBorrower
