import React, {useState} from "react";
import AdminLayout from "../../../adminLayout";
import Input from "../../../ui/Input";
import {useTranslation} from "react-i18next";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_ALL_OWNERS} from "../../../../graphql/queries/admin/administration/OwnerQuerie";
import SelectBox from "../../../ui/SelectBox";
import Button from "../../../ui/Button";
import {INSERT_MEDIATYPES} from "../../../../graphql/mutations/admin/administartion/mediaTypes.mutation";
import  Router from "next/router";

const AddMediaTypes = () => {
    const { t,i18n } = useTranslation();
    const {data} = useQuery(GET_ALL_OWNERS)
    const [Add] = useMutation(INSERT_MEDIATYPES,{
        onCompleted: () => {
            console.log("complet")
            Router.push("/admin/administration/MediaTypes")
        }
    });
    const [name, setName] = useState();
    const [d_pret, setD_pret] = useState();
    const [d_reservation, setD_reservation] = useState();
    const [imp_code, setImp_code] = useState();
    const [ownerId, setOwnerId] = useState();

    console.log(data && data.GetAllOwners)

    const onSubmit = () =>{
        console.log(imp_code)
        console.log(name)
        console.log(ownerId)
        Add({
            variables: {
                name: name,
                owner : ownerId,
                international_code : imp_code,
                d_pret: d_pret,
                d_reservation : d_reservation
            }
        })
    }
    if (data !== undefined){
        return <React.Fragment>

            <div id="work-collections">
                <div className="row">
                    <form>
                        <div className="col s12 m12 l12">
                            <ul id="" className="collection z-depth-1 animate fadeLeft">
                                <li className="collection-item avatar">
                                    <i className="material-icons teal darken-2 circle">add</i>
                                    <h6 className="collection-header m-0">Add Media Types</h6>
                                    <p> insert information </p>
                                </li>
                                <li className="input-field col s12 m12 l6">
                                    <Input
                                        icon="credit_card"
                                        label={t("NameMediaType")}
                                        type="Text"
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        required
                                        className="validate"
                                    />
                                </li>
                                <li className="input-field col s12 m12 l6">
                                    <Input
                                        icon="credit_card"
                                        label={t("codeImport")}
                                        type="Text"
                                        onChange={e => setImp_code(e.target.value)}
                                        value={imp_code}
                                        required
                                        className="validate"
                                    />
                                </li>
                            </ul>
                            <div className="input-field col s12 m12 l6">
                                <SelectBox value={ownerId}
                                           onChange={e => setOwnerId(e.target.value)}>
                                    <option>shose your owner</option>
                                    {data && data.GetAllOwners.map(owner => (
                                        <option key={owner._id} value={owner._id}>
                                            {owner.owner_name}
                                        </option>
                                    ))}
                                </SelectBox>
                            </div>
                            <Button onClick={onSubmit}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    }

    return <p>null </p>
}


AddMediaTypes.Layout = AdminLayout

export default AddMediaTypes