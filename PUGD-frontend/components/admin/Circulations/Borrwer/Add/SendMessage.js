import React from "react";
import Checkbox from "../../../../ui/Checkbox";

const SendMessage = () => {

    return <React.Fragment>
        <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
            <li className="collection-item avatar">
                <i className="material-icons teal circle">attach_file</i>
                <h6 className="collection-header m-0">Send Message</h6>
                <p>Send To User</p>
            </li>
            <li className="input-field col s12 ">
                <i className="material-icons prefix">message_speed</i>
                <input id="message" type="text" className="validate"/>
                <label htmlFor="message">message</label>
            </li>

            <div className="input-field col s12 ">
                <i className="material-icons prefix">insert_comment</i>
                <input id="comentair" type="text" className="validate"/>
                <label htmlFor="comentair">Commentaire</label>
            </div>

        </ul>
    </React.Fragment>

}
// export default withApollo({ssr:true})(AllGroups)
export default SendMessage