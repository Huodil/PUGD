import React, { useState } from "react";
import { INSERT_AUTHOR } from '@/graphql/mutations/admin/authorities/author.mutations';
// import { UPDATE_AUTHOR } from '@/graphql/mutations/admin/authorities/author.mutations';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
const useAuthorForm = () => {
    const [insertAuthor] = useMutation(INSERT_AUTHOR, {
        onCompleted: () => {
            Router.push("/admin/authorities/author")
        },
        onError: (error) => {
            alert(error.message);
        }
    });


    const onAddHandler = () => {
        console.log(insertAuthor({
            variables: {
                Author_Type: inputs.Author_Type,
                Name_Auth: inputs.Name_Auth,
                IndexName_Auth: inputs.IndexName_Auth,
                Year_Death: inputs.Year_Death,
                Year_Birth: inputs.Year_Birth,
                City_Auth: inputs.City_Auth,
                Note_Auth: inputs.Note_Auth,
                Country_Auth: inputs.Country_Auth,
                WebSite_Auth: inputs.WebSite_Auth,
                ISNI_Auth: inputs.ISNI_Auth,
                Subdivision_Auth: inputs.Subdivision_Auth,
                UrlThumbnail_Auth: inputs.UrlThumbnail_Auth,
                Linked_authorities: inputs.Linked_authorities.map((authority) => {
                    if (authority !== undefined)
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
        })
        );

    }

    const [inputs, setInputs] = useState({
        Author_Type: 30,
        Name_Auth: "Name_Auth",
        IndexName_Auth: "IndexName_Auth",
        Year_Birth: 1995,
        Year_Death: 1995,
        City_Auth: "City_Auth",
        Country_Auth: "Country_Auth",
        WebSite_Auth: "WebSite_Auth",
        ISNI_Auth: "ISNI_Auth",
        UrlThumbnail_Auth: "UrlThumbnail_Auth",
        Note_Auth: "Note_Auth",
        Subdivision_Auth: "Subdivision_Auth",
        Linked_authorities: [],
    })
    // const [inputs, setInputs] = useState({
    //     Author_Type: 10,
    //     Name_Auth: "",
    //     IndexName_Auth: "",
    //     Year_Birth: 0,
    //     Year_Death: 0,
    //     City_Auth: "",
    //     Country_Auth: "",
    //     WebSite_Auth: "",
    //     ISNI_Auth: "",
    //     UrlThumbnail_Auth: "",
    //     Note_Auth: "",
    //     Subdivision_Auth: "",
    //     Linked_authorities: [],
    // })


    // Handle the state changes of the inputs using the name property
    const handleInputChange = (event) => {

        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }
    const setInputValue = (newInputs) => {


        setInputs({
            Author_Type: newInputs.author_type,
            Name_Auth: newInputs.name_auth,
            IndexName_Auth: newInputs.indexname_auth,
            Year_Birth: newInputs.year_birth,
            Year_Death: newInputs.year_death,
            City_Auth: newInputs.city_auth,
            Country_Auth: newInputs.country_auth,
            WebSite_Auth: newInputs.website_auth,
            ISNI_Auth: newInputs.isni_auth,
            UrlThumbnail_Auth: newInputs.urlthumbnail_auth,
            Note_Auth: newInputs.note_auth,
            Subdivision_Auth: newInputs.subdivision_auth,
            Linked_authorities: newInputs.linked_authoritiess.map((linked_authority) => {
                console.log({ linked_authority });

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
    const OnAuthorityLinkChange = (index, newProps) => {

        const Linked_authoritiesMutated = [...inputs.Linked_authorities]
        if (newProps === undefined) {
            Linked_authoritiesMutated[index] = undefined
        }
        else {
            Linked_authoritiesMutated[index] = { ...Linked_authoritiesMutated[index], ...newProps }
        }
        setInputs(inputs => ({ ...inputs, Linked_authorities: Linked_authoritiesMutated }));

    }

    // State of the modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setHandleChosenAuthority(() => addLinked_authorities)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [HandleChosenAuthority, setHandleChosenAuthority] = useState(() => addLinked_authorities)


    return {
        inputs,
        onAddHandler,
        handleInputChange,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open,
        setInputValue
    };
}

export default useAuthorForm  