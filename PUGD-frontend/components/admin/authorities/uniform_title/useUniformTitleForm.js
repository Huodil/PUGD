import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { INSERT_UNIFORM_TITLE } from '@/graphql/mutations/admin/authorities/uniform_title.mutations';
import Router from "next/router";
const useCategoryForm = (callback) => {


    // Handle the state State of the inputs
    const [inputs, setInputs] = useState({
        type: 10,
        nature: 10,
        name: "name",
        expression_of: [],
        has_expression: [],
        other_links: [],
        authors: [],
        interpreters: [],
        form_of_work_text: "FormOfWorkText",
        form_of_work_id: 2,
        date_of_work: new Date(),
        original_place_of_work: "OriginalPlaceOfWork",
        subject_of_work: "SubjectOfWork",
        targeted_completeness: 1,
        targeted_audience: "targeted_audience",
        history_of_work: "history_of_work",
        // context_of_work: "",
        medium_of_performance: ["medium_of_performance","medium_of_performance"],
        numeric_designation: ["numeric_designation","numeric_designation"],
        key_text: "key_text",
        key_id: 2,
        coordinate_system: "coordinate_system",
        equinox: "equinox",
        form_subdivision: ["form_subdivision","form_subdivision"],
        other_features: "other_features",
        comment: "comment",
        url_thumbnail: "url_thumbnail",
        linked_authorities: [],

    })


    const setInputValue = (newInputs) => {
        setInputs({
            type: newInputs.type,
            // name: "",
            expression_of: newInputs.expression_of.map((element) => {
                return {
                    "object": element,
                    "label": "name",
                    "description": 10
                }
            }),
            has_expression: newInputs.has_expression.map((element) => {
                return {
                    "object": element,
                    "label": "name",
                    "description": 10
                }
            }),
            other_links: newInputs.other_links.map((element) => {
                return {
                    "object": element,
                    "label": "name",
                    "description": 10
                }
            }),
            authors: [],
            interpreters: [],
            form_of_work_text: "",
            form_of_work_id: 0,
            date_of_work: new Date(),
            original_place_of_work: "",
            subject_of_work: "",
            targeted_completeness: 0,
            targeted_audience: "",
            history_of_work: "",
            // context_of_work: "",
            medium_of_performance: [],
            numeric_designation: [],
            key_text: "",
            key_id: 0,
            coordinate_system: "",
            equinox: "",
            form_subdivision: [],
            other_features: "",
            comment: "",
            url_thumbnail: "",
            linked_authorities: [],
            nature: newInputs.nature,
            name: newInputs.name,
            // expression_of: newInputs.expression_of,
            // has_expression: newInputs.has_expression,
            // other_links: newInputs.other_links,
            // authors: newInputs.authors,
            // interpreters: newInputs.interpreters,
            // form_of_work_text: newInputs.form_of_work_text,
            // form_of_work_id: newInputs.form_of_work_id,
            // date_of_work: new Date(newInputs.date_of_work),
            // original_place_of_work: newInputs.original_place_of_work,
            // subject_of_work: newInputs.subject_of_work,
            // targeted_completeness: newInputs.targeted_completeness,
            // targeted_audience: newInputs.targeted_audience,
            // history_of_work: newInputs.history_of_work,
            // medium_of_performance: newInputs.medium_of_performance,
            // numeric_designation: newInputs.numeric_designation,
            // key_text: newInputs.key_text,
            // key_id: newInputs.key_id,
            // coordinate_system: newInputs.coordinate_system,
            // equinox: newInputs.equinox,
            // form_subdivision: newInputs.form_subdivision,
            // other_features: newInputs.other_features,
            // comment: newInputs.comment,
            // url_thumbnai: newInputs.url_thumbnail,
            // Linked_authorities: newInputs.linked_authorities.map((linked_authority) => {

            //     return {
            //         AuthorityName: "",
            //         Authority_Type: Number(linked_authority.linked_authority_type),
            //         Comment: linked_authority.comment,
            //         End: linked_authority.end && linked_authority.end > 0 && new Date(Number(linked_authority.end)),
            //         Start: linked_authority.start && linked_authority.start > 0 && new Date(Number(linked_authority.start)),
            //         id: linked_authority._id,
            //     }
            // }),
        });
    }
    // *********** Handeling list of strings***************************//

    const HandlePropertyChange = (propertyName, newValue) => {
        setInputs(inputs => ({ ...inputs, [propertyName]: newValue }));
    }
    const DeleteAtIndex = (propertyName, index) => {
        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.splice(index, 1)
        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
    }
    const AddString = (propertyName) => {
        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.push("")
        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
    }
    // *************************************************************//


    // Handle the state changes of the inputs using the name property
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    // Handle state update of the authority links
    const OnAuthorityLinkChange = (index, authorityLink) => {
        const Linked_authoritiesMutated = [...inputs.Linked_authorities]
        Linked_authoritiesMutated[index] = authorityLink
        setInputs(inputs => ({ ...inputs, Linked_authorities: Linked_authoritiesMutated }));
    }
    // a state containing which callback will be used when an authority is selected in the modal
    const [HandleChosenAuthority, setHandleChosenAuthority] = useState(() => () => { })

    // a state containing which authity type is seleced in the modal
    const [ModalAuthorityType, setModalAuthorityType] = useState(0)

    // State of the modal
    const [open, setOpen] = React.useState(false);

    // Handle the openning of the modal and setting the callback for element click
    const handleOpen = (authorityType, HandleChoosenAuthority) => {
        setModalAuthorityType(authorityType || 0)
        setHandleChosenAuthority(() => HandleChoosenAuthority || addLinked_authorities)
        setOpen(true);
    };

    // Add an element to 
    const AddAuthority = (authorityType, propertyName, authority) => {
        console.log({ authorityType, propertyName, authority });
        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.push(authority)
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


    const addLinked_authorities = (authorityType, authority) => {
        setInputs(inputs => ({
            ...inputs, linked_authorities: [...inputs.linked_authorities, {
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
    const [insertUniformTitle] = useMutation(INSERT_UNIFORM_TITLE, {
        onCompleted: () => {
            Router.push("/admin/authorities/uniform_title")
        },
        onError: (error) => {
            alert(error.message);
        }
    });



    const onAddHandler = () => {
        const uniformTitle = inputs
        console.log("uniformTitle", uniformTitle);
        const arraysOfObjects = ["expression_of", "has_expression", "other_links", "authors", "interpreters"]
        arraysOfObjects.forEach(arr => {


            uniformTitle[arr].forEach((element) => {
                console.log(element);
                console.log(delete element.label);
                console.log(element);

            });
        });
        uniformTitle.linked_authorities = uniformTitle.linked_authorities.map((authorityLink) => {
            return {
                Start: authorityLink.start,
                End: authorityLink.end,
                Comment: authorityLink.comment,
                Linked_Authority_Type: authorityLink.authorityType,
                LinkType: authorityLink.linkType,
                Linked_Authority_Id: authorityLink.id,
            }
        }) 
        insertUniformTitle({
            variables: {
                UniformTitle: uniformTitle
            }
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
        open,
        onAddHandler,
        setInputValue,
        HandlePropertyChange,
        DeleteAtIndex,
        AddString,
        AddAuthority,
        setAuthority
    };
}

export default useCategoryForm 