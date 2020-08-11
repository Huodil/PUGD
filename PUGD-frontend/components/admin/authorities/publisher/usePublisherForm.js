import React, { useState } from "react";
import Router from 'next/router';
import { INSERT_PUBLISHER } from '@/graphql/mutations/admin/authorities/publisher.mutations';
import { useMutation } from '@apollo/react-hooks';
const useCategoryForm = (callback) => {


    const [insertPublisher] = useMutation(INSERT_PUBLISHER, {
        onCompleted: () => {
            Router.push("/admin/authorities/publisher")

        },
        onError: (error) => {
            alert(error.message);
        }
    });


    const onAddHandler = (
        Name,
        Address1,
        Address2,
        Post_code,
        Country,
        City,
        Website,
        note,
        url_thumbnail,
        Supplier,
        Linked_authorities) => {


        const publisher = {
            Name,
            Address1,
            Address2,
            Post_code,
            Country,
            City,
            Website,
            note,
            url_thumbnail,
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


        if (Supplier !== "") {
            publisher.Supplier = Supplier
        }



        insertPublisher({
            variables: publisher
        });
    }

    // Handle the state State of the inputs
    const [inputs, setInputs] = useState({
        Name: "",
        Address1: "",
        Address2: "",
        Post_code: "",
        Country: "",
        City: "",
        Website: "",
        note: "",
        url_thumbnail: "",
        Supplier: {
            id: "",
            Label: ""
        },
        Linked_authorities: [],
    })

    const setInputValue = (newInputs) => {
        setInputs({
            Name: newInputs.name,
            Address1: newInputs.address1,
            Address2: newInputs.address2,
            Post_code: newInputs.post_code,
            Country: newInputs.country,
            City: newInputs.city,
            Website: newInputs.website,
            note: newInputs.note,
            url_thumbnail: newInputs.url_thumbnail,

            Supplier: {
                id: newInputs.supplier && newInputs.supplier._id && newInputs.supplier._id || "",
                Label: newInputs.supplier && newInputs.supplier.name || ""
            },
            Linked_authorities: []
            // Linked_authorities: newInputs.linked_authorities.map((linked_authority) => {

            //     return {
            //         AuthorityName: "something",
            //         Authority_Type: Number(linked_authority.linked_authority_type),
            //         Comment: linked_authority.comment,
            //         End: linked_authority.end && linked_authority.end > 0 && new Date(Number(linked_authority.end)),
            //         Start: linked_authority.start && linked_authority.start > 0 && new Date(Number(linked_authority.start)),
            //         id: linked_authority._id,
            //     }
            // }),
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

    const setSupplier = (authority) => {
        setInputs(inputs => (
            {
                ...inputs,
                Supplier: {
                    id: authority.id,
                    Label: authority.AuthorityName
                }
            }
        )
        )
    }
    const unsetSupplier = () => {
        setInputs(inputs => (
            {
                ...inputs,
                Supplier: {
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
        console.log(authorityType);

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
        console.log({ propertyName, propertyTitle, authority });
        setInputs(inputs => ({
            ...inputs, [propertyName]: {
                id: authority.id,
                Label: authority.label
            }
        }));

    }

    // if the modal is opened to set a Supplier
    const handleOpenSupplier = () => {
        setModalAuthorityType(30)
        setHandleChosenAuthority(() => setSupplier)
        setOpen(true);
    };

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
        handleOpenSupplier,
        unsetSupplier,
        open,
        onAddHandler,
        setInputValue,
        AddAuthority,
        setAuthority
    };
}

export default useCategoryForm 