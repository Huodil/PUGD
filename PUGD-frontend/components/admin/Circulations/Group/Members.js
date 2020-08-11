import React, {Component} from "react";
import Table from "../../../ui/Table/Table";
import AdminLayout from "../../../adminLayout";


class Members extends React.Component{

    render() {
        return <React.Fragment>
                 <div className="col s12 m8 l8 animate fadeLeft">
                <div className="card">
                    <div className="card-content">
                        <h4 className="card-title mb-0">les members du Group sont les suivant
                            <i
                                className="material-icons float-right">person_add</i>
                        </h4>
                        <p className="medium-small">This month transaction</p>
                        <div className="total-transaction-container">


                            <Table Thead={
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Membre </td>
                                    <td>code-barres</td>
                                    <td>Pret</td>
                                    <td>Reservation</td>
                                </tr>
                            }
                                   Tbody={

                                       this.props.members.members.map((item)=>{
                                           // eslint-disable-next-line react/jsx-key
                                           return <React.Fragment>
                                               <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>{item.first_name+" "+item.last_name}</td>
                                                   <td>{item.bar_code}</td>
                                                   <td>{item.total_pret}</td>
                                                   <td>{item.total_reservation}</td>
                                               </tr>
                                           </React.Fragment>
                                       })
                                   }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    }

}
Members.Layout = AdminLayout
export default Members