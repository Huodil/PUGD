import React from "react";
import Icon from "../../../../ui/Icon/Icon";
import Card from "../../../../ui/card/Card";
import SelectBox from "../../../../ui/SelectBox";
import OPAC from "./OPAC";
import AddUserTo from "./AddUserTo";
import Address from "./Address";
import SendMessage from "./SendMessage";


const Right_Information = () => {

    return <React.Fragment>

        <div className="col s12 m12 l6">
            <OPAC/>
            <AddUserTo/>
            <SendMessage/>
        </div>

    </React.Fragment>

}
// export default withApollo({ssr:true})(AllGroups)

export default Right_Information