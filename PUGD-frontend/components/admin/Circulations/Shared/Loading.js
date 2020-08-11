import React, {Component} from "react";


export default class Loading extends Component {
    state = {}

    render() {
        return <React.Fragment>
            <div className="center">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"/>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"/>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}