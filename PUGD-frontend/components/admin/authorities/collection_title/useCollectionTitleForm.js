import React, { useState } from "react";
import { INSERT_COLLECTION_TITLE } from '@/graphql/mutations/admin/authorities/collection_title.mutations';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
const useCollectionTitleForm = (callback) => {

    const [insertCollectionTitle] = useMutation(INSERT_COLLECTION_TITLE, {
        onCompleted: () => {
            Router.push("/admin/authorities/collection_title")

        },
        onError: (error) => {
            alert(error.message);
        }
    });



    const onAddHandler = () => {
        const collection_title = {
            Title: inputs.Title,
            Url_thumbnail: inputs.URL_thumbnail,
            Linked_authorities: inputs.Linked_authorities.map((authority) => {
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

        insertCollectionTitle({
            variables: collection_title
        });
    }
    const setInputValue = (newInputs) => {
        setInputs({
            Title: newInputs.title,

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
    // Handle the state State of the inputs
    const [inputs, setInputs] = useState({
        Title: "",
        URL_thumbnail: "",
        Linked_authorities: [],
    })

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

    // Handle state change of the authority links
    const OnAuthorityLinkChange = (index, authorityLink) => {

        const Linked_authoritiesMutated = [...inputs.Linked_authorities]
        Linked_authoritiesMutated[index] = authorityLink
        setInputs(inputs => ({ ...inputs, Linked_authorities: Linked_authoritiesMutated }));
    }
    // a state containing which callback will be used when an authority is selected in the modal
    const [HandleChosenAuthority, setHandleChosenAuthority] = useState(() => addLinked_authorities)

    // a state containing which authity type is selected in the modal
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
            id: authority._id,
            label: authority.label,
        })


        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
    }

    const setAuthority = (propertyName, propertyTitle, authority) => {
        // console.log({propertyName, propertyTitle, authority});

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


    return {
        inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open,
        onAddHandler,
        setInputValue,
        AddAuthority,
        setAuthority
    };
}

export default useCollectionTitleForm 