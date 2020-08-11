import React, {useState} from "react";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import {useMutation} from "@apollo/react-hooks";
import {INSERT_OWNER} from "../../../../graphql/mutations/admin/administartion/owen.mutation";

const AddOwner = ({refetch,...props}) => {

    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [Add] = useMutation(INSERT_OWNER,{
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
                <h6 className="collection-header m-0">Add Owner</h6>
                <span>Add new Owner </span>
            </li>

            <li className="input-field col l6">
                <Input
                    icon="home"
                    className="validate" required
                    label="Add Owner"
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
export default AddOwner