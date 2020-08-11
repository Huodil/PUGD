import { useState } from "react";
import { INSERT_STOPWORD } from '@/graphql/mutations/admin/authorities/stopword.mutations';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
const useStopwordForm = () => {
    const [insertStopword] = useMutation(INSERT_STOPWORD, {
        onCompleted: () => {
            Router.push("/admin/authorities/semantic/stopwords")
        },
        onError: (error) => {
            alert(error.message);
        }
    });


    const onAddHandler = () => {
        insertStopword({
            variables: {
                Word: inputs.word,
                Type: 2,
            }
        });
    }

    const [inputs, setInputs] = useState({
        word: "",
    })

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }



    return {
        inputs,
        onAddHandler,
        handleInputChange,
    };
}

export default useStopwordForm  