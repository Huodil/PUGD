import React from "react";


import Icon from "components/ui/Icon/Icon";
import Table from "../../../../../components/ui/Table/Table";

const ResGroup = (props) => {
    const nul = <span style={{color: '#d60e28'}}>No Group finder</span>;
    const show = false;

    return <React.Fragment>

        <div className="row vertical-modern-dashboard">
            {/*Member gorups */}
            <div className="col s12 m8 l8 animate fadeLeft">
                <div className="card">
                    <div className="card-content">
                        <h4 className="card-title mb-0">Member Groups
                            <i
                                className="material-icons float-right">person_add</i>
                        </h4>
                        <p className="medium-small">This month transaction</p>
                        <div className="total-transaction-container">


                            <Table Thead={
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Membre</td>
                                    <td>code-barres</td>
                                    <td>Pret</td>
                                    <td>Reservation</td>
                                </tr>
                            }
                                   Tbody={

                                       props.dataset.members.map((item) => {
                                           // eslint-disable-next-line react/jsx-key
                                           return <React.Fragment>
                                               <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>{item.first_name}</td>
                                                   <td>{item.last_name}</td>
                                                   <td>{item.last_name}</td>
                                                   <td>{item.last_name}</td>
                                               </tr>
                                           </React.Fragment>
                                       })
                                   }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*Cart gorups */}
            <div className="col s12 m4 l4">
                <div className="card recent-buyers-card animate fadeRight">
                    <div className="card-content">
                        <h4 className="card-title mb-0">hello {/*{props.datas.namegroups}*/}
                            <i className="material-icons float-right">more_vert</i>
                            <i className="material-icons float-right">library_books</i>
                            <i className="material-icons float-right">edit</i>
                        </h4>
                        <p className="medium-small pt-2">Create At
                            : {/*{moment(props.datas.CreatAt).format("DD, MMM, YYYY  HH:mm")}*/} </p>
                        <p className="medium-small pt-2">Responsable</p>
                        <ul className="collection mb-0">
                            <li className="collection-item avatar">
                                <img src="../../../app-assets/images/avatar/avatar-5.png" alt=""
                                     className="circle"/>
                                <p className="font-weight-600">respo {/*{props.datas.respgroup}*/}</p>
                                <p className="medium-small">25, January 2019</p>
                                <a href="#!" className="secondary-content"><i
                                    className="material-icons">star_border</i></a>
                            </li>
                        </ul>

                        {/* eslint-disable-next-line react/no-children-prop */}


                        <a className="medium-small mt-5 pl-5">
                            <Icon children={'mail'} style={{color: '#ff4080'}}/>

                            {/*{props.datas.mailRappel ?
                                                // eslint-disable-next-line react/no-children-prop
                                                <Icon children={'mail'} style={{color: '#ff4080'}} />
                                                // eslint-disable-next-line react/no-children-prop
                                                : <Icon style={{color: '#d5d5d5'}} children={"mail"}/>
                                            }*/}
                        </a>
                        <a href="#!" className="medium-small pl-10">
                            <Icon children={"mail"} style={{color: "#ff4080"}}/>
                            {/*{props.datas.letterrappel ?
                                                // eslint-disable-next-line react/no-children-prop
                                                <Icon children={'notifications_active'} style={{color: '#ff4080'}} /> : <Icon style={{color: '#d5d5d5'}} children={"notifications_off"}/>
                                            }*/}

                        </a>
                    </div>
                </div>


            </div>
        </div>

    </React.Fragment>

};
// export default withApollo({ssr:true})(AllGroups)

export default ResGroup;
