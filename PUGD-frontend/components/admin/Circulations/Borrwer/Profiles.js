import React from 'react'
import Collapsible from "../../../ui/Collapsible/Collapsible";


const Profiles = ({Borrower,children, ...props}) => {

    console.log("Borrower", Borrower && Borrower)

    let Full_Name = Borrower && Borrower.first_name + " " + Borrower.last_name
    return <React.Fragment>
        <div className="col s12">
            <div className="row">
                <div className="col s12 m7">
                    <div className="display-flex media">
                        <a href="#" className="avatar">
                            <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                 alt="Materialize" className="z-depth-4 circle" height="64" width="64"/>
                        </a>
                        <div className="media-body">
                            <h6 className="media-heading">
                                <span
                                    className="users-view-name">{Full_Name} </span>
                            </h6>

                            <span className="chip chip white-text teal darken-1"
                            >
                                <span className="users-view-id"># {Borrower && Borrower.bar_code}</span>
                            </span>

                            {
                                props && props.total_Pret ?
                                    <span className="chip chip white-text deep-purple darken-4 ">
                                <span className="users-view-id">Pret : {props && props.total_Pret}</span>
                            </span>
                                    : ""
                            }
                            {
                                props && props.total_reservation ?
                                    <span className="chip white-text light-blue darken-4">
                                <span className="users-view-id">Reservation : {props && props.total_reservation}</span>
                            </span> : ""
                            }
                            {
                                props && props.total_retard ?
                                    <span className="chip white-text pink darken-1">
                                <span className="users-view-id">Retard : {props && props.total_retard}</span>
                            </span> : ""
                            }
                        </div>
                    </div>
                </div>
                <div
                    className="col s12 m5 quick-action-btns display-flex justify-content-end align-items-center pt-2">
                    <a href="app-email.html" className="btn-small btn-light-indigo"><i
                        className="material-icons">mail_outline</i></a>
                    <a href="user-profile-page.html" className="btn-small btn-light-indigo">Profile</a>
                    <a href="page-users-edit.html" className="btn-small indigo">Edit</a>
                </div>
            </div>

            <br/>

            {children}
        </div>
    </React.Fragment>

}

export default Profiles



