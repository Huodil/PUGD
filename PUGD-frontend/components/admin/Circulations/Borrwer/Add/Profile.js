import React from 'react'

const Profile = ({ children,...props }) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col s12 m6">
                    <div className="display-flex media ">
                        <a href="#" className="avatarDean Stanley">
                            <img src={props.urlProfil}
                                 alt="users view avatar" className="z-depth-4 circle"
                                 height="54" width="54"/>
                        </a>
                        <div className="media-body">
                            <h6 className="media-heading">
                                <span className="users-view-name display-block">{props.fullname}</span>
                                {/*<span className="grey-text display-block">Code:</span>*/}
                                <span className="users-view-username grey-text">{props.codeBar}</span>
                            </h6>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </React.Fragment>)
}
export default Profile