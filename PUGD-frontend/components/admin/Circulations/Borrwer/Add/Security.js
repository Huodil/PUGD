import React from "react";

export class SecurityInfo extends React.Component{


    render() {
    return <React.Fragment>
        <ul id="" className="collection z-depth-1 animate fadeLeft">
            <li className="collection-item avatar">
                <i className="material-icons red accent-2 circle">security</i>
                <h6 className="collection-header m-0">Policy</h6>
                <p> Secret information </p>
            </li>
            <li className="input-field col s12">
                <i className="material-icons prefix">credit_card</i>
                <input id="code_bar" type="text" className="validate"/>
                <label htmlFor="code_bar">Code Bar</label>
            </li>
        </ul>
    </React.Fragment>

}
}
// export default withApollo({ssr:true})(AllGroups)
