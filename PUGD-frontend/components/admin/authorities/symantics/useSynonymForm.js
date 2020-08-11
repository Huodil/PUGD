import React, { useState } from "react";
import { INSERT_SYNONYM } from '@/graphql/mutations/admin/authorities/synonym.mutations';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
const useSynonymForm = () => {
    const [insertSynonym] = useMutation(INSERT_SYNONYM, {
        onCompleted: () => {
            Router.push("/admin/authorities/semantic/synonyms")
        },
        onError: (error) => {
            alert(error.message);
        }
    });


    const onAddHandler = () => {
        insertSynonym({
            variables: {
                Word: inputs.word,
                Lead_To: inputs.synonyms.map((synonym) => {
                    return (synonym.id)
                })
            }
        });
    }

    const [inputs, setInputs] = useState({
        word: "",
        synonyms: [],
    })

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const setInputValue = (newInputs) => {
        setInputs({
            word: newInputs.word,
            synonyms: newInputs.leads_to.map((synonym)=>{
                return {
                    id:synonym._id,
                    label:synonym.word
                }
            })
        });
    }

    // State of the modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Add an element to 
    const AddAuthority = (propertyName, authority) => {
        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.push({
            id: authority.id,
            label: authority.label,
        })
        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
        handleClose()
    }
    const RemoveAuthority = (propertyName, index) => {
        const mutatedProperty = [...inputs[propertyName]]
        mutatedProperty.splice(index, 1)
        setInputs(inputs => ({ ...inputs, [propertyName]: mutatedProperty }));
    }
    return {
        inputs,
        onAddHandler,
        handleInputChange,
        handleClose,
        handleOpen,
        open,
        AddAuthority,
        RemoveAuthority,
        setInputValue
    };
}

export default useSynonymForm  