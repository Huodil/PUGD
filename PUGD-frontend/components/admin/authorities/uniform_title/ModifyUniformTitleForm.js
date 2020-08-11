import React from 'react';
import Button from '@/components/ui/Button';
import { UPDATE_UNIFORM_TITLE } from '@/graphql/mutations/admin/authorities/uniform_title.mutations';
import { GET_UNIFORM_TITLE } from '@/graphql/queries/admin/authorities/uniform_title.queries';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import SearchAuthorityModal from '@/components/admin/authorities/shared/SearchAuthor'
import LinkedAuthorityListView from '@/components/admin/authorities/shared/LinkedAuthorityListView';
import TextBox from '@/components/ui/TextBox';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import useUniformTitleForm from './useUniformTitleForm';
import SelectBox from '@/components/ui/SelectBox';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import MultipleTextinputs from '@/components/admin/authorities/shared/MultipleTextinputs';
import ListUniformTitles from './UniformTitleListComponent';
import authorTypes from "./authorTypes.json"
import keys from "./keys.json"
import formOfWork from "./formOfWork.json"
const ModifyUniformTitleForm = () => {

    const { inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open,
        onAddHandler,
        HandlePropertyChange,
        setInputValue, } = useUniformTitleForm();


    const Router = useRouter()
    const [updateUniformTitle] = useMutation(UPDATE_UNIFORM_TITLE, {
        onCompleted: () => {
            Router.push("/admin/authorities/uniform_title")

        },
        onError: (error) => {
            alert(error.message);
        }
    });
    // const [getUniformTitleAllFields, UniformTitleResponse] = useLazyQuery(GET_UNIFORM_TITLE);


    const UniformTitleQuery = useQuery(GET_UNIFORM_TITLE, {

        variables: {
            Id: Router.query.id
        },
        onError: (error) => {
            console.log(error.message);
        },
        onCompleted: (data) => {
            console.log(data);
            if (data && data.uniform_title && data.uniform_title.length > 0) {

                setInputValue(data.uniform_title[0])

            }
        },
    });
    const onSubmitForm = (event) => {
        event.preventDefault(); 
        onUpdateHandler()
    }
    const onUpdateHandler = () => {
        const uniform_title = {
            Id: Router.query.id,
            Name: inputs.Name,
            Scope_note: inputs.Scope_note,
            Comment: inputs.Comment,
            Authority_number: inputs.Authority_number,
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
            See_also: inputs.See_also.map((authority) => {
                return authority.id
            }
            )
        }
        if (inputs.Broader_term.id !== "") {
            uniform_title.Broader_term = inputs.Broader_term.id
        }
        if (inputs.See.id !== "") {
            uniform_title.See = inputs.See.id
        }

        // console.log({ variables: uniform_title })

        updateUniformTitle({ variables: uniform_title })
    }


    return (
        <React.Fragment>
            <Grid>
                <GridElement s={6}>

                    <SelectBox
                        label="Type of work"
                        name="type"
                        value={inputs.type}
                        onChange={handleInputChange}>
                        <option value={10}>Musicale</option>
                        <option value={20}>Littéraire</option>
                        <option value={30}>Cinématographique</option>
                        <option value={40}>Autre</option>
                    </SelectBox>
                </GridElement>

                <GridElement s={6}>

                    <SelectBox
                        label="Nature of work"
                        name="nature"
                        value={inputs.nature}
                        onChange={handleInputChange}>
                        <option value={10}>Oeuvre</option>
                        <option value={20}>Expresssion</option>
                        <option value={30}>Exécution</option>
                    </SelectBox>
                </GridElement>
            </Grid>

            <Grid>
                <GridElement s={6}>
                    <TextBox required
                        label="Name of uniform title"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>

            {/* **********  Expression Of *************** */}
            <ListUniformTitles
                Title="Expression Of"
                UniformTitles={inputs.expression_of}
                AuthorityNumber={70}
                HandleOpen={handleOpen}
                PropertyName="expression_of"
                ChangeUniformTitle={HandlePropertyChange}>
                <option value={10}>est un abrégé</option>
                <option value={20}>est un arrangement</option>
                <option value={30}>est une révision de</option>
                <option value={40}>est une traduction de</option>
            </ListUniformTitles>

            {/* ********** Has for expression *************** */}
            <ListUniformTitles
                Title="Has expression"
                AuthorityNumber={70}
                UniformTitles={inputs.has_expression}
                HandleOpen={handleOpen}
                PropertyName="has_expression"
                ChangeUniformTitle={HandlePropertyChange}>
                <option value={10}>est un abrégé</option>
                <option value={20}>est un arrangement</option>
                <option value={30}>est une révision de</option>
                <option value={40}>est une traduction de</option>
            </ListUniformTitles>
            {/* ********** Other links *************** */}
            <ListUniformTitles
                Title="Other links"
                UniformTitles={inputs.other_links}
                HandleOpen={handleOpen}
                AuthorityNumber={70}
                PropertyName="other_links"
                ChangeUniformTitle={HandlePropertyChange}>
                <option value={10}>est un abrégé</option>
                <option value={20}>est un arrangement</option>
                <option value={30}>est une révision de</option>
                <option value={40}>est une traduction de</option>
            </ListUniformTitles>

            {/* ********** Authors *************** */}
            <ListUniformTitles
                Title="Authors"
                UniformTitles={inputs.authors}
                HandleOpen={handleOpen}
                AuthorityNumber={10}
                PropertyName="authors"
                ChangeUniformTitle={HandlePropertyChange}>
                {
                    authorTypes.types.map((type, index) => {
                        return <option key={index} value={index}>{type}</option>
                    })
                }
            </ListUniformTitles>

            {/* ********** Interpreters *************** */}
            <ListUniformTitles
                Title="Interpreters"
                UniformTitles={inputs.interpreters}
                HandleOpen={handleOpen}
                AuthorityNumber={10}
                PropertyName="interpreters"
                ChangeUniformTitle={HandlePropertyChange}>
                {
                    authorTypes.types.map((type, index) => {
                        return <option key={index} value={index}>{type}</option>
                    })
                }
            </ListUniformTitles>


            <Grid>
                <GridElement s={6}>
                    <TextBox required
                        label="Form of work(Free hand)"
                        name="form_of_work_text"
                        value={inputs.form_of_work_text}
                        onChange={handleInputChange}
                    />
                </GridElement>
                <GridElement s={6}>
                    <SelectBox
                        label="Form of work"
                        // name="Type_Work"
                        value={inputs.form_of_work_id}
                        onChange={e => {
                            HandlePropertyChange("form_of_work_id", e.target.value)
                        }}
                    >
                        <option value={0}>------------</option>
                        {
                            formOfWork.types.map((type, index) => {
                                return <option key={index} value={index + 1}>{type}</option>
                            })
                        }
                    </SelectBox>
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <DatePicker
                        label="Date of the work"
                        value={inputs.date_of_work && inputs.date_of_work.toISOString().split("T")[0] || ""}
                        onChange={(e) => {
                            e.persist();
                            HandlePropertyChange("date_of_work", new Date(e.target.value))
                        }}
                    />

                </GridElement>
                <GridElement s={6}>
                    <TextBox label="Original place of the work"
                        name="original_place_of_work"
                        value={inputs.original_place_of_work}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>

                <GridElement s={12}>
                    <TextBox label="Subject of the work"
                        name="subject_of_work"
                        value={inputs.subject_of_work}
                        onChange={handleInputChange}
                        Multiline
                    />
                </GridElement>
            </Grid>

            <Grid>
                <GridElement s={6}>

                    <SelectBox
                        label="Targeted Completeness"
                        name="targeted_completeness"
                        value={inputs.targeted_completeness}
                        onChange={handleInputChange}>
                        <option value={0}>--------</option>
                        <option value={20}>Finished work</option>
                        <option value={30}>Infinit work</option>
                    </SelectBox>
                </GridElement>
            </Grid>
            <Grid>

                <GridElement s={12}>
                    <TextBox label="Target audience"
                        name="targeted_audience"
                        value={inputs.targeted_audience}
                        onChange={handleInputChange}

                    />
                </GridElement>
            </Grid>
            <Grid>

                <GridElement s={12}>
                    <TextBox label="History of the work"
                        name="history_of_work"
                        value={inputs.history_of_work}
                        onChange={handleInputChange}
                        Multiline
                    />
                </GridElement>
            </Grid>
            {/* <Grid>

            <GridElement s={12}>
                <TextBox label="Context of the work"
                    name="context_of_work"
                    value={inputs.context_of_work}
                    onChange={handleInputChange}
                    Multiline
                />
            </GridElement>
        </Grid> */}
            <MultipleTextinputs
                Title="Medium of performance (for music)"
                ItemsList={inputs.medium_of_performance}
                onElementChange={
                    (newValue) => HandlePropertyChange("medium_of_performance", newValue)
                }
            />
            <MultipleTextinputs
                Title="Numeric designation (for music)"
                ItemsList={inputs.numeric_designation}
                onElementChange={
                    (newValue) => HandlePropertyChange("numeric_designation", newValue)
                }
            />
            {/* 
        <Grid>
            <h6> Form of Work  &nbsp;
                    <RoundButton icon="add" size="30"

                />
            </h6>
            <GridElement s={6}>
                <TextBox required
                    label="Form of work(Free hand)"
                    name="Name"
                    value={inputs.Name}
                    onChange={handleInputChange}
                />
            </GridElement>
            <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                <RoundButton icon="add" size="30" onClick={handleOpenBroader_term} />
                <RoundButton icon="delete" size="30" onClick={unsetBroader_term} />
            </GridElement>
        </Grid> */}


            <Grid>

                <GridElement s={5}>
                    <TextBox label="Key(Saisie libre)"
                        name="key_text"
                        value={inputs.key_text}
                        onChange={handleInputChange}
                        Multiline
                    />
                </GridElement>
                <GridElement s={7}>
                    <SelectBox
                        label="Key"
                        // name="Type_Work"
                        value={inputs.key_id}
                        onChange={e => {
                            HandlePropertyChange("key_id", e.target.value)
                        }}
                    >
                        <option value={0}>------------</option>
                        {
                            keys.types.map((type, index) => {
                                return <option key={index} value={index + 1}>{type}</option>
                            })
                        }
                    </SelectBox>

                </GridElement>
            </Grid>

            <Grid>
                <GridElement s={6}>
                    <TextBox required
                        label="Coordinate system (cartographic work)"
                        name="coordinate_system"
                        value={inputs.coordinate_system}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <TextBox required
                        label="Equinox (cartographic work)"
                        name="equinox"
                        value={inputs.equinox}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <MultipleTextinputs
                Title="Form subdivision"
                ItemsList={inputs.form_subdivision}
                onElementChange={
                    (newValue) => HandlePropertyChange("form_subdivision", newValue)
                } />

            <Grid>

                <GridElement s={12}>
                    <TextBox label="Other distinctive features"
                        name="other_features"
                        value={inputs.other_features}
                        onChange={handleInputChange}
                        Multiline
                    />
                </GridElement>
            </Grid>
            <Grid>

                <GridElement s={12}>
                    <TextBox label="Comment"
                        name="comment"
                        value={inputs.comment}
                        onChange={handleInputChange}
                        Multiline
                    />
                </GridElement>
            </Grid>
            <Grid>

                <GridElement s={12}>
                    <TextBox label="URL of thumbnail"
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
                Linked_authorities={inputs.linked_authorities}
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
        </React.Fragment >
    )
}
export default ModifyUniformTitleForm
