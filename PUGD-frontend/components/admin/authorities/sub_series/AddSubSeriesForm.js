import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';

import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Button from '@/components/ui/Button';

import SearchAuthorityModal from '../shared/SearchAuthor'

import LinkedAuthorityListView from '../shared/LinkedAuthorityListView';
import useSubSeriesForm from './useSubSeriesForm';
import TextBox from '@/components/ui/TextBox';

const AddSubSeriesForm = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()
        onAddHandler(
            inputs.Name,
            inputs.Issn,
            inputs.Publisher.id,
            inputs.Parent_series.id,
            inputs.Website,
            inputs.Comment,
            inputs.URL_thumbnail,
            inputs.Linked_authorities)
    }
    const {
        inputs,
        open,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        setAuthority,
        unsetPublisher,
        handleOpenParent_series,
        unsetParent_series,
        onAddHandler } = useSubSeriesForm();
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
                <GridElement s={6}>
                    <TextBox required label="ISSN"
                        name="Issn"
                        value={inputs.Issn}
                        onChange={handleInputChange}
                    />
                </GridElement>

            </Grid>
            <Grid>
                <GridElement s={5}>
                    <TextBox label="Publisher"
                        name="Publisher"
                        value={inputs.Publisher.Label}
                        onChange={handleInputChange}
                    />
                </GridElement>

                <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                    <RoundButton icon="add" size="30" 
                    onClick={e => handleOpen(30, ((authoritytype, authority) => setAuthority("Publisher", "name", authority)))}
                    />
                    <RoundButton icon="delete" size="30" onClick={unsetPublisher} />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={5}>
                    <TextBox label="Sub-series of"
                        name="Parent_series"
                        value={inputs.Parent_series.Label}
                        onChange={handleInputChange}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </GridElement>

                <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                    <RoundButton icon="add" size="30" 
                     onClick={e => handleOpen(40, ((authoritytype, authority) => setAuthority("Parent_series", "name", authority)))}
                    />
                    <RoundButton icon="delete" size="30" onClick={unsetParent_series} />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <TextBox label="Website"
                        name="Website"
                        value={inputs.Website}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <TextBox label="Comment"
                        name="Comment"
                        value={inputs.Comment}
                        onChange={handleInputChange}
                        multiline
                        rows="4"
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

            <Button variant="contained">
                Cancel
            </Button>
            <Button variant="contained"
                onClick={onSubmitHandler}>
                Save
            </Button>

            <SearchAuthorityModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={HandleChosenAuthority}
                AuthorityType={ModalAuthorityType === 0 ? undefined : ModalAuthorityType}
            />
        </React.Fragment>
    )
}
export default AddSubSeriesForm