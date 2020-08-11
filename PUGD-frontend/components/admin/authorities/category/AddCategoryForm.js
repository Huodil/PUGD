import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Button from '@/components/ui/Button';
import SearchAuthorityModal from '../shared/SearchAuthor'
import LinkedAuthorityListView from '../shared/LinkedAuthorityListView';
import useCategoryForm from './useCategoryForm';
import SeeAlsoComponent from './SeeAlsoComponent';
import TextBox from '@/components/ui/TextBox';

const AddCategoryForm = () => {

    const { inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        unsetBroader_term,
        unsetSee,
        open,
        onAddHandler,
        AddAuthority,
        setAuthority,
        RemoveAuthority } = useCategoryForm();

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
                    <TextBox required
                        label="Scope note"
                        name="Scope_note"
                        value={inputs.Scope_note}
                        onChange={handleInputChange}

                    />
                </GridElement>
                <GridElement s={6}>
                    <TextBox required label="Comment"
                        name="Comment"
                        value={inputs.Comment}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={5}>
                    <TextBox label="Broader term"
                        name="Broader_term"
                        value={inputs.Broader_term.Label}
                        onChange={handleInputChange}
                        readonly={true}
                    />
                </GridElement>
                <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                    <RoundButton icon="add" size="30"
                        onClick={e => handleOpen(20, (authoritytype, authority) => setAuthority("Broader_term", "name", authority))}
                    />
                    <RoundButton icon="delete" size="30"
                        onClick={e => setAuthority("Broader_term", "name", {
                            id: "",
                            label: ""
                        })}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={5}>
                    <TextBox label="See (preferred term)"
                        name="See"
                        value={inputs.See.Label}
                        onChange={handleInputChange}
                    />
                </GridElement>
                <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                    <RoundButton icon="add" size="30"
                        // onClick={handleOpenSee} style={{ margin: "auto" }} 
                        onClick={e => handleOpen(20, ((authoritytype, authority) => setAuthority("See", "name", authority)))}
                    />

                    <RoundButton icon="delete" size="30"
                        onClick={e => setAuthority("See", "name", {
                            id: "",
                            label: ""
                        })}
                        style={{ margin: "auto" }} />
                </GridElement>
            </Grid>

            <Grid>
                <GridElement s={12}>
                    <h5> See also &nbsp;
                        <RoundButton icon="add" size="30"
                            onClick={e => handleOpen(20, (authoritytype, authority) => AddAuthority(authoritytype, "See_also", authority))}

                        />
                    </h5>

                    <SeeAlsoComponent categories={inputs.See_also} removeSeeAlso={RemoveAuthority} />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <TextBox label="Authority number"
                        name="Authority_number"
                        value={inputs.Authority_number}
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
                onClick={(e) => onAddHandler(e,
                    inputs.Name,
                    inputs.Scope_note,
                    inputs.Comment,
                    inputs.Broader_term.id,
                    inputs.See.id,
                    inputs.See_also,
                    inputs.Authority_number,
                    inputs.URL_thumbnail,
                    inputs.Linked_authorities)}>Save</Button>

            <SearchAuthorityModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={HandleChosenAuthority}
                AuthorityType={ModalAuthorityType === 0 ? undefined : ModalAuthorityType}
            />
        </React.Fragment>
    )
}
export default AddCategoryForm