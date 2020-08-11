import React from 'react';
import Button from '@/components/ui/Button';
import { UPDATE_SUB_SERIES } from '@/graphql/mutations/admin/authorities/sub_series.mutations';
import { GET_SUB_SERIES } from '@/graphql/queries/admin/authorities/sub_series.queries';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import SearchAuthorityModal from '@/components/admin/authorities/shared/SearchAuthor'
import LinkedAuthorityListView from '@/components/admin/authorities/shared/LinkedAuthorityListView';
import useSubSeriesForm from './useSubSeriesForm';
import TextBox from '@/components/ui/TextBox';
import { useMutation, useQuery, } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const ModifySeriesForm = () => {
    const {
        inputs,
        open,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        handleOpenPublisher,
        unsetPublisher,
        handleOpenParent_series,
        unsetParent_series,
        setInputValue, } = useSubSeriesForm();



    const Router = useRouter()



    const [updateSubSeries] = useMutation(UPDATE_SUB_SERIES, {
        onCompleted: () => {
            Router.push("/admin/authorities/sub_series")
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    // const [getSeriesAllFields, SeriesResponse] = useLazyQuery(GET_SERIES);


    const SubSeriesQuery = useQuery(GET_SUB_SERIES, {
        variables: {
            Id: Router.query.id
        },
        onError: (error) => {
            console.log(error.message);
        },
        onCompleted: (data) => {
            console.log(data);

            if (data && data.sub_series && data.sub_series.length > 0) {

                setInputValue(data.sub_series[0])
            }
        },
    });
    const onSubmitForm = (event) => {
        event.preventDefault();
        onUpdateHandler()
    }
    const onUpdateHandler = () => {

        const subSeries = {
            ID: Router.query.id,
            Name: inputs.Name,
            Issn: inputs.Issn,
            Website: inputs.Website,
            Comment: inputs.Comment,
            URL_thumbnail: inputs.URL_thumbnail,
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
        if (inputs.Publisher.id !== "") {
            subSeries.Publisher = inputs.Publisher.id
        }
        if (inputs.Parent_series.id !== "") {
            subSeries.Parent_series = inputs.Parent_series.id
        }

        // console.log(inputs)

        updateSubSeries({ variables: subSeries })




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
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </GridElement>

                <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                    <RoundButton icon="add" size="30" onClick={handleOpenPublisher} />
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
                    <RoundButton icon="add" size="30" onClick={handleOpenParent_series} />
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
                onClick={onSubmitForm}>
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
export default ModifySeriesForm