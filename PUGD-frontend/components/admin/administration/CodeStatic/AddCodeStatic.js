import React, {useState} from "react";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import {useMutation} from "@apollo/react-hooks";
import {INSERT_OWNER} from "../../../../graphql/mutations/admin/administartion/owen.mutation";
import {ISERT_CODE_STATUS} from "../../../../graphql/mutations/admin/administartion/codeStatic.mutations";

const AddCodeStatic = ({refetch,...props}) => {

    const [name, setName] = useState("")
    const [error] = useState("can't is null")
    const [Add] = useMutation(ISERT_CODE_STATUS,{
        onCompleted: () => {
            refetch()
        }
    });
    const onSubmit = () => {
        Add({variables: {name: name}})
    }
    return <React.Fragment>
        <ul id="issues-collection" className="collection z-depth-1 animate fadeUp">
            <li className="collection-item avatar">
                <i className="material-icons orange darken-4 circle">add</i>
                <h6 className="collection-header m-0">Add Code Static</h6>
                <span>Add new Code Static </span>
            </li>

            <li className="input-field col l6">
                <Input
                    icon="home"
                    className="validate" required
                    label="Add Code Static"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    dataErrorHelper={error}
                />
            </li>
            <li className=" input-field col l6">
                <Button onClick={onSubmit}>Add</Button>
            </li>

        </ul>

    </React.Fragment>
}
export default AddCodeStatic