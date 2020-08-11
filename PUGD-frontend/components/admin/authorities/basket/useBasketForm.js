import { useState } from "react";

const useAuthorForm = (author) => {


    const [inputs, setInputs] = useState(author || { 
        BasketName: "",
        BasketNote: "",
        BasketType: 1,
        BasketColor: "",
        BasketElements: [],
    })

    // Handle the state changes of the inputs using the name property
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

   


    return {
        inputs, 
        handleInputChange
    };
}

export default useAuthorForm 