import React from "react";
import Icon from "../../../../ui/Icon/Icon";
import Card from "../../../../ui/card/Card";
import SelectBox from "../../../../ui/SelectBox";


const AddUserTo = () => {

    return <React.Fragment>

        <ul id="issues-collection" className="collection z-depth-1 animate fadeRight">
            <li className="collection-item avatar">
                <i className="material-icons orange darken-4 circle">add</i>
                <h6 className="collection-header m-0">Add</h6>
                <p>Add USER TO </p>
            </li>


            <li className="input-field col s12">
                <i className="material-icons prefix">user</i>
                <input id="com" type="text" className="validate"/>
                <label htmlFor="com">Communauté de Communes </label>
            </li>
            <li className="input-field col s12">
                <i className="material-icons prefix">layers</i>
                <input id="cat" type="text" className="validate"/>
                <label htmlFor="cat">Categories</label>
            </li>

            <li className="input-field col s12">
                <i className="material-icons prefix">group</i>
                <input id="group" type="text" className="validate"/>
                <label htmlFor="group">Group</label>
            </li>
        </ul>

    </React.Fragment>

}
// export default withApollo({ssr:true})(AllGroups)

export default AddUserTo