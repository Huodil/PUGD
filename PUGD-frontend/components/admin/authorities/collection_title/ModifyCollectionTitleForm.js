import React from 'react';
import Button from '@/components/ui/Button';
import { UPDATE_COLLECTION_TITLE } from '@/graphql/mutations/admin/authorities/collection_title.mutations';
import { GET_COLLECTION_TITLE } from '@/graphql/queries/admin/authorities/collection_title.queries';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import SearchAuthorityModal from '@/components/admin/authorities/shared/SearchAuthor'
import LinkedAuthorityListView from '@/components/admin/authorities/shared/LinkedAuthorityListView';
import useCollectionTitleForm from './useCollectionTitleForm';
import TextBox from '@/components/ui/TextBox';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const ModifyCollectionTitleForm = () => {

    const {
        inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open,
        setInputValue, } = useCollectionTitleForm();



    const Router = useRouter()



    const [updateCollectionTitle] = useMutation(UPDATE_COLLECTION_TITLE, {
        onCompleted: () => {
            Router.push("/admin/authorities/collection_title")
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    // const [getCollectionTitleAllFields, CollectionTitleResponse] = useLazyQuery(GET_COLLECTION_TITLE);


    const CollectionTitleQuery = useQuery(GET_COLLECTION_TITLE, {
        variables: {
            Id: Router.query.id
        },
        onError: (error) => {
            console.log(error.message);
        },
        onCompleted: (data) => {
            console.log(data);

            if (data && data.collection_title && data.collection_title.length > 0) {

                setInputValue(data.collection_title[0])
            }
        },
    });
    const onSubmitForm = (event) => {
        event.preventDefault();
        onUpdateHandler()
    }
    const onUpdateHandler = () => {

        const collection_title = {
            Id: Router.query.id,
            Title: inputs.Title,
            Url_thumbnail: inputs.URL_thumbnail,
            // Linked_authorities: inputs.Linked_authorities.map((authority) => {
            //     return {
            //         Linked_Authority_Id: authority.id,
            //         Linked_Authority_Type: authority.Authority_Type,
            //         Start: authority.Start,
            //         End: authority.End,
            //         Comment: authority.Comment,
            //         LinkType: authority.LinkType,
            //     }
            // }) 
        }
        updateCollectionTitle({ variables: collection_title })



    }


    return (
        <React.Fragment>

            <Grid>
                <GridElement s={6}>
                    <TextBox required label="Title"
                        name="Title"
                        value={inputs.Title}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={12}>
                    <TextBox label="URL of thumbnail"
                        name="URL_thumbnail"
                        value={inputs.URL_thumbnail}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>

            <h5> Linked Auhorities
            &nbsp;
            <RoundButton icon="add" size="30" onClick={e => handleOpen(0)} />
            </h5>
            <LinkedAuthorityListView
                Linked_authorities={inputs.Linked_authorities}
                OnAuthorityLinkChange={OnAuthorityLinkChange} />
            <br />

            <Button variant="contained">Cancel</Button>
            <Button variant="contained"
                onClick={onSubmitForm}>Save</Button>

            <SearchAuthorityModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={HandleChosenAuthority}
                AuthorityType={ModalAuthorityType === 0 ? undefined : ModalAuthorityType}
            />
        </React.Fragment>
    )
}
export default ModifyCollectionTitleForm