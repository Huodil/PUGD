import React from 'react'
import AdminLayout from '@/components/adminLayout'
import moment from "moment";
import Icon from "@/components/ui/Icon/Icon";


const info = (props) => {
    const onSearchHandler = (e) => {

    }

    return <React.Fragment>
        {/*Cart gorups */}
                <div className="col s12 m4 l4">
                    <div className="card recent-buyers-card animate fadeLeft">
                        <div className="card-content">
                            <h4 className="card-title mb-0">Group Name :{props.name} <i
                                className="material-icons float-right">library_books</i>
                                <i className="material-icons float-right">edit</i>
                            </h4>
                            <p className="medium-small pt-2">Create At : {moment(props.date).format("DD, MMM, YYYY  HH:mm")} </p>
                            <p className="medium-small pt-2">Responsable</p>
                        <ul className="collection mb-0">
                            <li className="collection-item avatar">
                                <img src="../../../app-assets/images/avatar/avatar-5.png" alt=""
                                     className="circle"/>
                                <p className="font-weight-600">{props.respo}</p>
                                <p className="medium-small">25, January 2019</p>
                                <a href="#!" className="secondary-content"><i
                                    className="material-icons">star_border</i></a>
                            </li>
                        </ul>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <a className="medium-small mt-5 pl-5">
                        {props.email ?
                            <Icon children={'mail'} style={{color: '#ff4080'}} />
                            : <Icon style={{color: '#d5d5d5'}} children={"mail"}/>
                        }
                    </a>
                    <a href="#!" className="medium-small pl-10">
                        {props.notification ?
                            <Icon children={'notifications_active'} style={{color: '#ff4080'}} /> : <Icon style={{color: '#d5d5d5'}} children={"notifications_off"}/>
                        }
                    </a>
                </div>
            </div>
        </div>
           </React.Fragment>
}
info.Layout = AdminLayout
export default info
