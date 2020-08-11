import React, {useState , lazy , Suspense} from 'react'
import AdminLayout from 'components/adminLayout'

import TextBox from "components/ui/TextBox";
import Button from "components/ui/Button";
import Table from "components/ui/Table/Table";
import {useLazyQuery} from "@apollo/react-hooks";
import Circulation from "components/admin/Circulations/Body/Body";
import Null from "components/admin/Circulations/Handerls/Null";
import CirculationHeader from "components/admin/Circulations/Hedar/CirculationHeader";
import Profile from "components/admin/Circulations/Borrwer/Add/Profile";
import BtnBadge from "components/ui/ui_badge";
import {FIND_RESERVATION_COPY} from "../../../../../graphql/queries/admin/Ciruclation/Reservation.query";
import DocumentTable from "../../../../../components/admin/Circulations/Retour_Document/DocumentTable";
import ConfirmationPanel from "../../../../../components/admin/Circulations/Reservation/ConfirmatinReservation";
import Loading from "../../../../../components/admin/Circulations/Shared/Loading";
import Profiles from "../../../../../components/admin/Circulations/Borrwer/Profiles";
import SearchDataResult from "../../../../../components/admin/Circulations/Shared/SearchData";
import ConfirmationReservationPanel
    from "../../../../../components/admin/Circulations/Reservation/ConfirmatinReservation";
import NoDataFetched from "../../../../../components/admin/Circulations/Shared/NoData";
import HavePret from "../../../../../components/admin/Circulations/Retour_Document/HavePret";


const traitDoc = () => {

    const [findCopy, { loading, error, data,refetch }] = useLazyQuery(FIND_RESERVATION_COPY,
        {
            fetchPolicy: 'no-cache',
        });

    const [codBar, setCodeBar] = useState('');
    const onSearchHandler = (e) => {

        e.preventDefault();
        findCopy({
            variables: {
                code: codBar,
            }
        });
    }
    if (loading) {
        return <Loading/>;
    }
    if (error) {
        console.log("extraInfo",error.extraInfo)
        console.log("graphQLErrors",error.graphQLErrors)
        console.log("message",error.message)
        console.log("networkError",error.networkError)
        console.log("algorithm",error.algorithm)
        return <React.Fragment>
            <Circulation>
                <CirculationHeader Title="Retour d'Examplaire de Documment"
                                   children={
                                       <div>
                                           <from>
                                               <span>Recherche des document par leur Code-barres</span>
                                               <div className="row">
                                                   <TextBox label={"Search Copies Of Document (Copies) by Code bar "}
                                                            type="text"
                                                            onChange={event => {
                                                                setCodeBar(event.target.value)
                                                            }}
                                                            value={codBar}
                                                   />
                                                   <Button
                                                       onClick={onSearchHandler}
                                                       rounded={4}>Search</Button>
                                               </div>
                                           </from>
                                       </div>
                                   }/>
                <NoDataFetched/>
            </Circulation>

        </React.Fragment>

    }

    //console.log(data.copies)
    if(data != null || data !== undefined){
        console.log(data)
        console.log(data.ValidateReservation)
    }

    return <Suspense fallback={<div>Loading...</div>}>
    <Circulation>
        <CirculationHeader Title="Documents A Traité"
                           children={
                               <from>
                                   <span>Recherche des document par leur Code-barres pour validé ou chercher le reservation emis</span>
                                   <div className="row">
                                       <TextBox label={"Search by Code bar doument"}
                                                type="text"
                                                onChange={event => {setCodeBar(event.target.value)}}
                                                value={codBar}
                                       />
                                       <Button
                                           onClick={onSearchHandler}
                                           rounded={4}>Search</Button>
                                   </div>
                               </from>
                           }/>
                        { data != null || data !== undefined ?

                            <div>

                                {
                                    data.ValidateReservation && data.ValidateReservation.isChecked ?
                                        "":
                                        <ConfirmationReservationPanel
                                            reservationId={data.ValidateReservation && data.ValidateReservation._id}
                                            borrower={data.ValidateReservation && data.ValidateReservation.borrower}
                                            refetch={refetch}
                                        />
                                }

                                <SearchDataResult result={data.ValidateReservation} statusDoc={""}/>
                                <div className="card-panel">
                                    <div className="row">
                                        <Table Thead={
                                            <tr>
                                            </tr>
                                        } Tbody={
                                            <tr>
                                                <tr>
                                                    <td>Statut</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><span className="task-cat teal accent-4">Disponible</span></td>

                                                </tr>
                                                <tr>
                                                    <td>Origine</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Dépôt</td>
                                                </tr>
                                                {
                                                    data.ValidateReservation.lastLoan != null ?

                                                        <tr>
                                                            <td>Emprunteur précédent</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <Profiles Borrower={data.ValidateReservation.lastLoan}/>
                                                            </td>
                                                        </tr>
                                                        : ""
                                                }
                                                <tr>
                                                    <td>Emprunteur précédent</td>
                                                    <td></td>
                                                    <td></td>

                                                    <td>
                                                        <Profile fullname="Dean Stanley"
                                                                 codeBar="32234334"
                                                                 urlProfil="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                                                 children={
                                                                     <div
                                                                         className="col s12 m5 quick-action-btns display-flex justify-content-end align-items-center pt-2">
                                                                         <a href="app-email.html" className="btn-small btn-light-indigo mr-5">Reservation</a>
                                                                         <a href="page-users-edit.html" className="btn-small indigo">
                                                                             <span>Pret</span>
                                                                             <BtnBadge className="display-inline ">2</BtnBadge>
                                                                         </a>

                                                                     </div>
                                                                 }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>prochen Emprenteur </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Profile fullname="Dean Stanley"
                                                                 codeBar="32234334"
                                                                 urlProfil="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                                                 children={
                                                                     <div
                                                                         className="col s12 m5 quick-action-btns display-flex justify-content-end align-items-center pt-2">
                                                                         <a href="app-email.html" className="btn-small btn-light-indigo mr-5">Reservation</a>
                                                                         <a href="page-users-edit.html" className="btn-small indigo">
                                                                             <span>Pret</span>
                                                                             <BtnBadge className="display-inline ">2</BtnBadge>
                                                                         </a>

                                                                     </div>
                                                                 }
                                                        />
                                                    </td>
                                                </tr>
                                            </tr>
                                        }/>
                                    </div>
                                </div>
                            </div>  :


                            ''
                        }
    </Circulation>
    </Suspense>
}
traitDoc.Layout = AdminLayout
export default traitDoc
