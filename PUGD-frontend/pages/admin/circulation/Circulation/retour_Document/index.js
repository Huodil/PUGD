import React, {useState} from 'react'
import AdminLayout from 'components/adminLayout'
import TextBox from "components/ui/TextBox";
import Button from "components/ui/Button";
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "components/ui/Table/Table";
import BtnBadge from "components/ui/ui_badge";
import Circulation from "components/admin/Circulations/Body/Body";
import CirculationHeader from "components/admin/Circulations/Hedar/CirculationHeader";
import Profile from "components/admin/Circulations/Borrwer/Add/Profile";
import DocumentTable from "../../../../../components/admin/Circulations/Retour_Document/DocumentTable";
import HavePret from "../../../../../components/admin/Circulations/Retour_Document/HavePret";
import Profiles from "../../../../../components/admin/Circulations/Borrwer/Profiles";
import Loading from "../../../../../components/admin/Circulations/Shared/Loading";
import {RETURN_COPY_FROM_PRET} from "../../../../../graphql/queries/admin/Ciruclation/Copies.query";
import NoDataFetched from "../../../../../components/admin/Circulations/Shared/NoData";
import SearchDataResult from "../../../../../components/admin/Circulations/Shared/SearchData";


const retDoc = () => {
    const [returnCopy, {loading, error, data}] = useLazyQuery(RETURN_COPY_FROM_PRET,{
        fetchPolicy: 'no-cache',
    });
    const [codBar, setCodeBar] = useState('');
    const onSearchHandler = (e) => {
        e.preventDefault();
        returnCopy({
            variables: {
                code: codBar,
            }
        });
    }
    if (data != null || data !== undefined) {
        console.log("data :", data)
        console.log("length :", data.ReturnCopy.length)
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

    return <Circulation>
        <CirculationHeader Title="Retour d'Examplaire de Documment"
                           children={
                               <div>
                                   <from>
                                       <span>Recherche des document par leur Code-barres</span>
                                       <div className="row">
                                           <TextBox label={"Search Copies Of Document (Copies) by Code bar "}
                                                    type="text"
                                                    className ="required"

                                                    value={codBar}
                                                    onChange={event => {
                                                        setCodeBar(event.target.value)
                                                    }}
                                           />
                                           <Button
                                               onClick={onSearchHandler}
                                               rounded={4}>Search</Button>
                                       </div>
                                   </from>
                               </div>
                           }/>

        {data != null || data !== undefined ?

            (
                <div>
                    <SearchDataResult result={data.ReturnCopy} statusDoc={
                        data.ReturnCopy && data.ReturnCopy.isLoan ?
                            <HavePret color="teal" children="Rendue..!"/>
                            : <HavePret color="red" children="Pret introuvable"/>

                    }/>

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
                                        data.ReturnCopy.lastLoan != null ?

                                            <tr>
                                                <td>Emprunteur précédent</td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <Profiles Borrower={data.ReturnCopy.lastLoan}/>
                                                </td>
                                            </tr>
                                            : ""
                                    }
                                    <tr>

                                    </tr>
                                    {
                                        data.ReturnCopy.nextLoan != null ?

                                            <tr>
                                                <td>prochen Emprenteur</td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <Profiles Borrower={data.ReturnCopy.nextLoan}/>
                                                </td>
                                            </tr>
                                            : ""
                                    }
                                    <tr>
                                        <td>prochen Emprenteur</td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Profile fullname="Dean Stanley"
                                                     codeBar="32234334"
                                                     urlProfil="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                                     children={
                                                         <div
                                                             className="col s12 m5 quick-action-btns display-flex justify-content-end align-items-center pt-2">
                                                             <a href="app-email.html"
                                                                className="btn-small btn-light-indigo mr-5">Reservation</a>
                                                             <a href="page-users-edit.html"
                                                                className="btn-small indigo">
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
                </div>) :
            ""
        }


    </Circulation>
}

retDoc.Layout = AdminLayout
export default retDoc
