import React from 'react';

import Button from '@/components/ui/Button';
import { UPDATE_AUTHOR } from '@/graphql/mutations/admin/authorities/author.mutations';
import { GET_AUTHOR } from '@/graphql/queries/admin/authorities/author.queries';
import LinkedAuthorityListView from '@/components/admin/authorities/shared/LinkedAuthorityListView';
import useAuthorForm from './useAuthorForm';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SearchAuthorityModal from "../shared/SearchAuthor"
import i18next from '@/components/admin/localisation/i18nextInit';
import { useRouter } from 'next/router';

const ModifyAuthorForm = () => {
    const {
        inputs,
        handleInputChange,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open,
        setInputValue } = useAuthorForm();

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        onCompleted: () => {
            Router.push("/admin/authorities/author")
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    const Router = useRouter()

    const authorQuery = useQuery(GET_AUTHOR, {
        variables: {
            Id: Router.query.id
        },
        onError: (error) => {
            alert(error.message);
        },
        onCompleted: (data) => {
            if (data && data.author && data.author.length > 0) {
                setInputValue(data.author[0])
            }
        }
    });
    const onSubmitForm = (event) => {
        event.preventDefault();
        onUpdateHandler()
    }
    const onUpdateHandler = () => {
        updateAuthor({
            variables: {
                Id: Router.query.id,
                Author_Type: inputs.Author_Type,
                Name_Auth: inputs.Name_Auth,
                IndexName_Auth: inputs.IndexName_Auth,
                Year_Auth: inputs.Year_Auth,
                City_Auth: inputs.City_Auth,
                Note_Auth: inputs.Note_Auth,
                Country_Auth: inputs.Country_Auth,
                WebSite_Auth: inputs.WebSite_Auth,
                ISNI_Auth: inputs.ISNI_Auth,
                Subdivision_Auth: inputs.Subdivision_Auth,
                UrlThumbnail_Auth: inputs.UrlThumbnail_Auth,
                Linked_authorities: inputs.Linked_authorities.map((authority) => {
                    return {
                        Linked_Authority_Id: authority.id,
                        Linked_Authority_Type: authority.Authority_Type,
                        Start: authority.Start,
                        End: authority.End,
                        Comment: authority.Comment,
                        LinkType: authority.LinkType,
                    }
                })
            }
        })
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col s6">

                    <SelectBox
                        label={i18next.t("authorType")}
                        name="Author_Type"
                        value={inputs.Author_Type}
                        onChange={handleInputChange}>
                        <option value={10}>{i18next.t("person")}</option>
                        <option value={20}>{i18next.t("corp")}</option>
                        <option value={30}>{i18next.t("convention")}</option>
                    </SelectBox>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <TextBox
                        required
                        label={i18next.t("indexName")}
                        name="IndexName_Auth"
                        value={inputs.IndexName_Auth}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col s6">
                    <TextBox
                        required
                        label={i18next.t("nonindexName")}
                        name="Name_Auth"
                        value={inputs.Name_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <TextBox
                        label={i18next.t("birthYear")}
                        name="Year_Birth"
                        value={inputs.Year_Birth}
                        onChange={handleInputChange}
                        type="number" />
                </div>
                <div className="col s6">
                    <TextBox label={i18next.t("deathYear")}
                        type="number"
                        name="Year_Death"
                        value={inputs.Year_Death}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <TextBox
                        label={i18next.t("website")}
                        name="WebSite_Auth"
                        value={inputs.WebSite_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>


            <div className="row">
                <div className="col s6">
                    <TextBox label={i18next.t("city")}
                        name="City_Auth"
                        value={inputs.City_Auth}
                        onChange={handleInputChange} />
                </div>
                <div className="col s6">
                    <TextBox label={i18next.t("country")}
                        name="Country_Auth"
                        value={inputs.Country_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <TextBox label={i18next.t("note")}
                        name="Note_Auth"
                        value={inputs.Note_Auth}
                        onChange={handleInputChange}
                        Multiline />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <TextBox label="ISNI"
                        name="ISNI_Auth"
                        value={inputs.ISNI_Auth}
                        onChange={handleInputChange} />
                </div>
                <div className="col s6">
                    <TextBox label={i18next.t("subdivision")}
                        name="Subdivision_Auth"
                        value={inputs.Subdivision_Auth}
                        onChange={handleInputChange} />

                </div>

            </div>
            <div className="row">
                <div className="col s12">
                    <TextBox label={i18next.t("url_thumbnail")}
                        name="UrlThumbnail_Auth"
                        value={inputs.UrlThumbnail_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>

            <h5> {i18next.t("linked_authority")}
        &nbsp;
            <RoundButton icon="add" size="30" onClick={e => handleOpen(0)} />
            </h5>
            <LinkedAuthorityListView
                Linked_authorities={inputs.Linked_authorities}
                OnAuthorityLinkChange={OnAuthorityLinkChange} />

            <Button variant="contained">{i18next.t("cancel")}</Button>
            <Button variant="contained"
                onClick={onSubmitForm}
            >{i18next.t("save")}</Button>


            <SearchAuthorityModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={HandleChosenAuthority} />
        </React.Fragment>
    )
}
export default ModifyAuthorForm