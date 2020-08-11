import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Button from '@/components/ui/Button';


import SearchAuthorityModal from '../shared/SearchAuthor'
import LinkedAuthorityListView from '../shared/LinkedAuthorityListView';

import usePublisherForm from './usePublisherForm';
import TextBox from '@/components/ui/TextBox';

const AddPublisherForm = () => {

    const {
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
        setAuthority } = usePublisherForm();

    const onSubmitForm = (event) => {
        event.preventDefault();
        onAddHandler(
            inputs.Name,
            inputs.Address1,
            inputs.Address2,
            inputs.Post_code,
            inputs.Country,
            inputs.City,
            inputs.Website,
            inputs.note,
            inputs.url_thumbnail,
            inputs.Supplier.id,
            inputs.Linked_authorities
        )
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
                        defaultValue={inputs.Supplier.Label}
                        // onChange={handleInputChange}
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
export default AddPublisherForm