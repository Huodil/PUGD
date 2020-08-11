/*
import React from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {BORROWER_WITH_PRET_AND_RSV} from "../../../../../graphql/queries/admin/Ciruclation/Borrowers.query"
import PretTable from "./pretTable";
import Profiles from "../../../../../components/admin/Circulations/Borrwer/Profiles";
import Circulation from "../../../../../components/admin/Circulations/Body/Body";
import CirculationHeader from "../../../../../components/admin/Circulations/Hedar/CirculationHeader";
import ReservationTable from "./reservationTable";
import AddPretComponent from "../../../../../components/admin/Circulations/Pret_Document/AddPretComponent";


/!*
class Borrower extends React.Component{
    /!*constructor(props) {
        super(props)
        this.state = {
            _id: this.props.router.query.id,
            loaded: false

        };
    }*!/
    static getInitialProps ({ query: { id } }) {
        return { aboutId: id }
    }
    componentDidMount() {


    }


    render() {
        console.log("hello  : id : ", this.props.aboutId)
// todo : visit this
        return <React.Fragment>
            <p>hello </p>
        </React.Fragment>
    }

}
*!/

const Borrower = () => {

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

    let fullName =""
    if(data && data.GetBorrowerWithPretAndReservation.Borrower){
        fullName = data.GetBorrowerWithPretAndReservation.Borrower.first_name +" " +data.GetBorrowerWithPretAndReservation.Borrower.last_name
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
Borrower.Layout = AdminLayout
export default Borrower
*/
