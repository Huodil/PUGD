import React from 'react';
import Button from '@/components/ui/Button';
import { UPDATE_PUBLISHER } from '@/graphql/mutations/admin/authorities/publisher.mutations';
import { GET_PUBLISHER } from '@/graphql/queries/admin/authorities/publisher.queries';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import SearchAuthorityModal from '@/components/admin/authorities/shared/SearchAuthor'
import LinkedAuthorityListView from '@/components/admin/authorities/shared/LinkedAuthorityListView';
import usePublisherForm from './usePublisherForm';
import TextBox from '@/components/ui/TextBox';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const ModifyPublisherForm = () => {

    const { inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        unsetSupplier,
        open,
        setInputValue, 
        setAuthority} = usePublisherForm();



    const Router = useRouter()



    const [updatePublisher] = useMutation(UPDATE_PUBLISHER, {
        onCompleted: () => {
            Router.push("/admin/authorities/publisher")
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    // const [getPublisherAllFields, PublisherResponse] = useLazyQuery(GET_PUBLISHER);


    const PublisherQuery = useQuery(GET_PUBLISHER, {
        variables: {
            Id: Router.query.id
        },
        onError: (error) => {
            console.log(error.message);
        },
        onCompleted: (data) => {
            console.log(data);
            if (data && data.publisher && data.publisher.length > 0) { 
                setInputValue(data.publisher[0])
            }
        },
    });
    const onSubmitForm = (event) => {
        event.preventDefault();
        onUpdateHandler()
    }
    const onUpdateHandler = () => {

        const publisher = {
            ID: Router.query.id,
            // Supplier: "",
            note: inputs.note,
            Name: inputs.Name,
            Address1: inputs.Address1,
            Country: inputs.Country,
            Address2: inputs.Address2,
            Post_code: inputs.Post_code,
            City: inputs.City,
            url_thumbnail: inputs.url_thumbnail,
            Linked_authorities: inputs.Linked_authorities,

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
        if (inputs.Supplier.id !== "") {
            publisher.Supplier = inputs.Supplier.id
        }


        console.log({ variables: publisher })

        updatePublisher({ variables: publisher })



    }


    return (
        <React.Fragment>

            <Grid>
                <GridElement s={6}>
                    <TextBox required label="Name"
                        name="Name"
                        value={inputs.Name}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <TextBox required label="Address 1"
                        name="Address1"
                        value={inputs.Address1}
                        onChange={handleInputChange}

                    />
                </GridElement>
                <GridElement s={6}>
                    <TextBox required label="Address 2"
                        name="Address2"
                        value={inputs.Address2}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={5}>
                    <TextBox label="Supplier"
                        name="Supplier"
                        value={inputs.Supplier.Label}
                        onChange={handleInputChange}
                    />
                </GridElement>
                <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                    <RoundButton icon="add" size="30"
                        //  onClick={handleOpenSupplier} 
                        onClick={e => handleOpen(30, ((authoritytype, authority) => setAuthority("Supplier", "name", authority)))}

                    />
                    <RoundButton icon="delete" size="30" onClick={unsetSupplier} />

                </GridElement>
            </Grid>

            <Grid>
                <GridElement s={4}>
                    <TextBox label="Country"
                        name="Country"
                        value={inputs.Country}
                        onChange={handleInputChange}
                    />
                </GridElement>
                <GridElement s={4}>
                    <TextBox label="City"
                        name="City"
                        value={inputs.City}
                        onChange={handleInputChange}
                    />
                </GridElement>
                <GridElement s={4}>
                    <TextBox label="Postal code"
                        name="Post_code"
                        value={inputs.Post_code}
                        onChange={handleInputChange}
                    />
                </GridElement>

            </Grid>
            <Grid>
                <GridElement s={12}>
                    <TextBox label="Website"
                        name="Website"
                        value={inputs.Website}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={12}>
                    <TextBox label="note"
                        name="note"
                        value={inputs.note}
                        onChange={handleInputChange}
                        multiline
                        rows="4"
                    />
                </GridElement>
            </Grid>

            <Grid>
                <GridElement s={12}>
                    <TextBox label="url_thumbnail"
                        name="url_thumbnail"
                        value={inputs.url_thumbnail}
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
export default ModifyPublisherForm