import React, {Component} from "react";
import Table from "../../../ui/Table/Table";
import Icon from "../../../ui/Icon/Icon";
import AdminLayout from "../../../adminLayout";
import Members from "./Members";
import {FullDate} from "../../../../shared/_herlpersCirculation/_helpers";

const Responsable = (props) => {


    return<React.Fragment>
        <div className="col s12 m4 l4">
            <div className="card recent-buyers-card animate fadeRight">
                <div className="card-content">
                    <h4 className="card-title mb-0">{props.responsable && props.responsable.name}
                        <i className="material-icons float-right">more_vert</i>
                        <i className="material-icons float-right">library_books</i>
                        <i className="material-icons float-right">edit</i>
                    </h4>
                    <p className="medium-small pt-2">Create At : {props.responsable.created_at ? FullDate(props.responsable.created_at) : "-" } </p>
                    <p className="medium-small pt-2">Responsable</p>
                    <ul className="collection mb-0">
                        <li className="collection-item avatar">
                            <img src="../../../app-assets/images/avatar/avatar-5.png" alt=""
                                 className="circle"/>
                            <p className="font-weight-600">{props.responsable && props.responsable.responsable.first_name+" "+ props.responsable.responsable.last_name}</p>
                            {/*<p className="medium-small">25, January 2019</p>*/}
                            <p className="medium-small">{props.responsable && FullDate(props.responsable.responsable.birthday)}</p>
                            <p className="medium-small chip">#{props.responsable && props.responsable.responsable.bar_code}</p>
                            <a href="#!" className="secondary-content"><i
                                className="material-icons">star_border</i></a>
                        </li>
                    </ul>

                    <a className="medium-small mt-5 pl-5">
                        <Icon children={'mail'} style={{color: '#ff4080'}} />

                        {/*{props.datas.mailRappel ?
                                                // eslint-disable-next-line react/no-children-prop
                                                <Icon children={'mail'} style={{color: '#ff4080'}} />
                                                // eslint-disable-next-line react/no-children-prop
                                                : <Icon style={{color: '#d5d5d5'}} children={"mail"}/>
                                            }*/}

                    </a>
                    <a href="#!" className="medium-small pl-10">
                        <Icon children={'mail'} style={{color: '#ff4080'}} />
                        {/*{props.datas.letterrappel ?
                                                // eslint-disable-next-line react/no-children-prop
                                                <Icon children={'notifications_active'} style={{color: '#ff4080'}} /> : <Icon style={{color: '#d5d5d5'}} children={"notifications_off"}/>
                                            }*/}

                    </a>
                </div>
            </div>


        </div>


    </React.Fragment>
}
/*class Responsable extends Component{
    render() {
        return<React.Fragment>


                <div className="col s12 m4 l4">
                    <div className="card recent-buyers-card animate fadeRight">
                        <div className="card-content">
                            <h4 className="card-title mb-0">hello fro respo {/!*{props.datas.namegroups}*!/}
                                <i className="material-icons float-right">more_vert</i>
                                <i className="material-icons float-right">library_books</i>
                                <i className="material-icons float-right">edit</i>
                            </h4>
                            <p className="medium-small pt-2">Create At : {/!*{moment(props.datas.CreatAt).format("DD, MMM, YYYY  HH:mm")}*!/} </p>
                            <p className="medium-small pt-2">Responsable</p>
                            <ul className="collection mb-0">
                                <li className="collection-item avatar">
                                    <img src="../../../app-assets/images/avatar/avatar-5.png" alt=""
                                         className="circle"/>
                                    <p className="font-weight-600">respo {/!*{props.datas.respgroup}*!/}</p>
                                    <p className="medium-small">25, January 2019</p>
                                    <a href="#!" className="secondary-content"><i
                                        className="material-icons">star_border</i></a>
                                </li>
                            </ul>

                            <a className="medium-small mt-5 pl-5">
                                <Icon children={'mail'} style={{color: '#ff4080'}} />

                                {/!*{props.datas.mailRappel ?
                                                // eslint-disable-next-line react/no-children-prop
                                                <Icon children={'mail'} style={{color: '#ff4080'}} />
                                                // eslint-disable-next-line react/no-children-prop
                                                : <Icon style={{color: '#d5d5d5'}} children={"mail"}/>
                                            }*!/}

                            </a>
                            <a href="#!" className="medium-small pl-10">
                                <Icon children={'mail'} style={{color: '#ff4080'}} />
                                {/!*{props.datas.letterrappel ?
                                                // eslint-disable-next-line react/no-children-prop
                                                <Icon children={'notifications_active'} style={{color: '#ff4080'}} /> : <Icon style={{color: '#d5d5d5'}} children={"notifications_off"}/>
                                            }*!/}

                            </a>
                        </div>
                    </div>


                </div>


        </React.Fragment>
    }
}*/
Responsable.Layout = AdminLayout
export default Responsable