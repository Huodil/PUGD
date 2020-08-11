import React from "react";
import Icon from "../../../../ui/Icon/Icon";
import Card from "../../../../ui/card/Card";
import SelectBox from "../../../../ui/SelectBox";


const OPAC = () => {

    return <React.Fragment>

            <ul id="issues-collection" className="collection z-depth-1 animate fadeRight">
                <li className="collection-item avatar">
                    <i className="material-icons  blue-grey darken-4 circle">language</i>
                    <h6 className="collection-header m-0">OPAC</h6>
                    <p>Opac Information Connection</p>
                </li>


                <li className="input-field col s12">
                    <i className="material-icons prefix">laptop_mac</i>
                    <input id="username_opac" type="text" className="validate"/>
                    <label htmlFor="username_opac">Identifent OPAC</label>
                </li>
                <li className="input-field col s12">
                    <i className="material-icons prefix">lock_outline</i>
                    <input id="passowrd_opac" type="text" className="validate"/>
                    <label htmlFor="passowrd_opac">Mode de pass OPAC</label>
                </li>

                <div className="input-field col s12">
                    <SelectBox label={"Langue OPAC"}>
                        <option value="Francias">Francias</option>
                        <option value="English">English</option>
                    </SelectBox>
                </div>
            </ul>

    </React.Fragment>

}
// export default withApollo({ssr:true})(AllGroups)

export default OPAC