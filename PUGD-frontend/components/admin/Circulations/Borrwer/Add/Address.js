import React from "react";
import SelectBox from "../../../../ui/SelectBox";


const Address = () => {

    return <React.Fragment>

        <ul id="issues-collection" className="collection z-depth-1 animate fadeLeft">
            <li className="collection-item avatar">
                <i className="material-icons blue accent-2 circle">map</i>
                <h6 className="collection-header m-0">Mailing Address</h6>
                <p>bind your informatio Address</p>
            </li>


            <li className="input-field col s6">
                <i className="material-icons prefix">location_on</i>
                <input id="ru1" type="text" className="validate"/>
                <label htmlFor="ru1">Address Ligne 1</label>
            </li>
            <li className="input-field col s6">
                <input id="ru2" type="text" className="validate"/>
                <label htmlFor="ru2">Address Ligne 2</label>
            </li>

            <li className="input-field col s12">
                <i className="material-icons prefix">my_location</i>
                <input id="city" type="text" className="validate"/>
                <label htmlFor="city">Vill</label>
            </li>
            <li className="input-field col s12">
                <i className="material-icons prefix">navigation</i>
                <input id="contry" type="text" className="validate"/>
                <label htmlFor="contry">Pays</label>
            </li>
            <li className="input-field col s12">
                <i className="material-icons prefix">location_searching</i>
                <input id="zip" type="text" className="validate"/>
                <label htmlFor="zip">Code Postal</label>
            </li>

        </ul>

    </React.Fragment>

}
// export default withApollo({ssr:true})(AllGroups)

export default Address

