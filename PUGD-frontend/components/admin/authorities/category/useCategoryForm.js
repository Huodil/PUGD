import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { INSERT_CATEGORY } from '@/graphql/mutations/admin/authorities/category.mutations';
import Router from "next/router";
const useCategoryForm = (callback) => {


    // Handle the state State of the inputs
    const [inputs, setInputs] = useState({
        Name: "",
        Scope_note: "",
        Comment: "",
        Broader_term: {
            id: "",
            Label: ""
        },
        See: {
            id: "",
            Label: ""
        },
        See_also: [],
        Authority_number: 0,
        URL_thumbnail: "",
        Linked_authorities: [],
    })


    const setInputValue = (newInputs) => {
        console.log("called");


        setInputs({
            Name: newInputs.name,
            Scope_note: newInputs.scope_note,
            Comment: newInputs.comment,
            Broader_term: newInputs.broader_term != null && {
                id: newInputs.broader_term._id,
                Label: newInputs.broader_term.name
            } ||{},
            See: newInputs.see != null && {
                id: newInputs.see._id,
                Label: newInputs.see.name
            }||{},
            See_also: newInputs.see_also.map((category) => {
                return {
                    id: category._id,
                    label: category.name
                }
            }),
            Authority_number: newInputs.authority_number,
            URL_thumbnail: newInputs.url_thumbnail,
            Linked_authorities: newInputs.linked_authorities.map((linked_authority) => {

                return {
                    AuthorityName: "something",
                    Authority_Type: Number(linked_authority.linked_authority_type),
                    Comment: linked_authority.comment,
                    End: linked_authority.end && linked_authority.end > 0 && new Date(Number(linked_authority.end)),
                    Start: linked_authority.start && linked_authority.start > 0 && new Date(Number(linked_authority.start)),
                    id: linked_authority._id,
                }
            }),
        });
    }

    // Handle the state changes of the inputs using the name property
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    // Handle the adding of an authority to inputs.Linked_authorities
    const addLinked_authorities = (authorityType, authority) => {
        setInputs(inputs => ({
            ...inputs, Linked_authorities: [...inputs.Linked_authorities, {
                authorityName: authority.label,
                authorityType,
                linkType: 10,
                comment: "",
                end: null,
                start: null,
                id: authority.id,
            }]
        }));
    }
    const addSee_Also = (category) => {
        setInputs(inputs => ({ ...inputs, See_also: [...inputs.See_also, category] }));
    }

    const setBroader_term = (authority) => {
        setInputs(inputs => (
            {
                ...inputs,
                Broader_term: {
                    id: authority.id,
                    Label: authority.AuthorityName
                }
            }
        )
        )
    }
    const unsetBroader_term = () => {
        setInputs(inputs => (
            {
                ...inputs,
                Broader_term: {
                    id: "",
                    Label: ""
                }
            }
        )
        )
    }

    const setSee = (authority) => {
        setInputs(inputs => (
            {
                ...inputs,
                See: {
                    id: authority.id,
                    Label: authority.AuthorityName
                }
            }
        )
        )
    }
    const unsetSee = () => {
        setInputs(inputs => (
            {
                ...inputs,
                See: {
                    id: "",
                    Label: ""
                }
            }
        )
        )
    }
    // Handle state change of the authority links
    const OnAuthorityLinkChange = (index, authorityLink) => {

        const Linked_authoritiesMutated = [...inputs.Linked_authorities]
        Linked_authoritiesMutated[index] = authorityLink
        setInputs(inputs => ({ ...inputs, Linked_authorities: Linked_authoritiesMutated }));
    }
    // a state containing which callback will be used when an authority is selected in the modal
    const [HandleChosenAuthority, setHandleChosenAuthority] = useState(() => addLinked_authorities)

    // a state containing which authity type is seleced in the modal
    const [ModalAuthorityType, setModalAuthorityType] = useState(0)

    // State of the modal
    const [open, setOpen] = React.useState(false);

    // if the modal is opened to add authority links
    const handleOpen = (authorityType, HandleChoosenAuthority) => {
        setModalAuthorityType(authorityType || 0)
        setHandleChosenAuthority(() => HandleChoosenAuthority || addLinked_authorities)
        setOpen(true);
    };

    // Add an element to 
    const AddAuthority = (authorityType, propertyName, authority) => {
        console.log({ authorityType, propertyName, authority });

        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.push({
            id: authority.id,
            label: authority.label,
        })
        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
    }
    const RemoveAuthority = (propertyName, index) => {
        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.splice(index, 1)
        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
    }
    const setAuthority = (propertyName, propertyTitle, authority) => {
        console.log({ propertyName, propertyTitle, authority });
        setInputs(inputs => ({
            ...inputs, [propertyName]: {
                id: authority.id,
                Label: authority.label
            }
        }));
    }

    const handleClose = () => {
        setOpen(false);
    };
    const [insertCategory] = useMutation(INSERT_CATEGORY, {
        onCompleted: () => {
            Router.push("/admin/authorities/headings")

        },
        onError: (error) => {
            alert(error.message);
        }
    });



    const onAddHandler = (e,
        Name,
        Scope_note,
        Comment,
        Broader_term,
        See,
        See_also,
        Authority_number,
        URL_thumbnail,
        Linked_authorities) => {
        e.preventDefault();

        const category = {
            Name,
            Scope_note,
            Comment,
            See_also: See_also.map((authority) => {
                console.log({ authority });

                return authority.id
            }),
            Authority_number,
            URL_thumbnail,
            Linked_authorities: Linked_authorities.map((authority) => {
                return {
                    Linked_Authority_Id: authority.id,
                    Linked_Authority_Type: authority.authorityType,
                    Start: authority.start,
                    End: authority.end,
                    Comment: authority.comment,
                    LinkType: authority.linkType,
                }
            }),
        }


        if (Broader_term !== "") {
            category.Broader_term = Broader_term
        }
        if (See !== "") {
            category.See = See
        }


        insertCategory({
            variables: category
        });
    }
    return {
        inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        unsetBroader_term,
        unsetSee,
        open,
        onAddHandler,
        setInputValue,
        AddAuthority,
        setAuthority,
        RemoveAuthority
    };
}

export default useCategoryForm 