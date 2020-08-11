import React from "react";
import SelectBox from "../../../../ui/SelectBox";
import Checkbox from "../../../../ui/Checkbox";

const Contact = () => {

    return <React.Fragment>
            <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
            <li className="collection-item avatar">
                <i className="material-icons deep-purple accent-5 circle">contacts</i>
                <h6 className="collection-header m-0">Contact Infomation</h6>
                <p>information to contact you</p>
            </li>
            <li className="input-field col s8 ">
                <i className="material-icons prefix">phone</i>
                <input id="phone" type="text" className="validate"/>
                <label htmlFor="phone">phone Number</label>
            </li>
            <li className="input-field col s4  ">
                <Checkbox label="Send SMS"/>
            </li>

            <div className="input-field col s12 ">
                <i className="material-icons prefix">email</i>
                <input id="email" type="text" className="validate"/>
                <label htmlFor="email">email</label>
            </div>

        </ul>
    </React.Fragment>

}
// export default withApollo({ssr:true})(AllGroups)
export default Contact