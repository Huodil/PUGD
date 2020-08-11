import React from 'react';
import Button from '@/components/ui/Button';

import LinkedAuthorityListView from '../shared/LinkedAuthorityListView';
import SearchAuthorityModal from "../shared/SearchAuthor"
import useAuthorForm from './useAuthorForm';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import i18next from '../../../../components/admin/localisation/i18nextInit';
import { useTranslation } from 'react-i18next';
const AddAuthorForm = () => {
    const {
        inputs,
        onAddHandler,
        handleInputChange,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open } = useAuthorForm();
console.log(inputs.Author_Type);

    const onSubmitForm = (event) => {
        event.preventDefault();
        onAddHandler()
    }
    const { t, i18n } = useTranslation();

    return (
        <React.Fragment>
            <div className="row">
                <div className="col s6">

                    <SelectBox
                        label={t("authorType")}
                        name="Author_Type"
                        value={inputs.Author_Type}
                        onChange={handleInputChange}>
                        <option value={10}>{t("person")}</option>
                        <option value={20}>{t("corp")}</option>
                        <option value={30}>{t("convention")}</option>
                    </SelectBox>
                </div>
            </div>
              <div className="row">
                <div className="col s6">
                    <TextBox
                        required
                        label={t("indexName")}
                        name="IndexName_Auth"
                        value={inputs.IndexName_Auth}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col s6">
                    <TextBox
                        required
                        label={t("nonindexName")}
                        name="Name_Auth"
                        value={inputs.Name_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <TextBox
                        label={t("birthYear")}
                        name="Year_Birth"
                        value={inputs.Year_Birth}
                        onChange={handleInputChange}
                        type="number" />
                </div>
                <div className="col s6">
                    <TextBox label={t("deathYear")}
                        type="number"
                        name="Year_Death"
                        value={inputs.Year_Death}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <TextBox
                        label={t("website")}
                        name="WebSite_Auth"
                        value={inputs.WebSite_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>


            {inputs.Author_Type !== "10" && <div className="row">
                <div className="col s6">
                    <TextBox label={t("city")}
                        name="City_Auth"
                        value={inputs.City_Auth}
                        onChange={handleInputChange} />
                </div>
                <div className="col s6">
                    <TextBox label={t("country")}
                        name="Country_Auth"
                        value={inputs.Country_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>}
            <div className="row">
                <div className="col s12">
                    <TextBox label={t("note")}
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
                {inputs.Author_Type !== "10" && <div className="col s6">
                    <TextBox label={t("subdivision")}
                        name="Subdivision_Auth"
                        value={inputs.Subdivision_Auth}
                        onChange={handleInputChange} />

                </div>}

            </div>
            <div className="row">
                <div className="col s12">
                    <TextBox label={t("url_thumbnail")}
                        name="UrlThumbnail_Auth"
                        value={inputs.UrlThumbnail_Auth}
                        onChange={handleInputChange} />
                </div>
            </div>

            <h5> {t("linked_authority")}
            &nbsp;
                <RoundButton icon="add" size="30" onClick={e => handleOpen(0)} />
            </h5>
            <LinkedAuthorityListView
                Linked_authorities={inputs.Linked_authorities}
                OnAuthorityLinkChange={OnAuthorityLinkChange} />

            <Button variant="contained"
                onClick={e => {
                    console.log(i18next.languages)

                    i18next.changeLanguage("fr")
                }
                }>{t("cancel")}</Button>
            <Button variant="contained"
                onClick={onSubmitForm}
            >{t("save")}</Button>


            <SearchAuthorityModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={HandleChosenAuthority} />
        </React.Fragment>
    )
}
export default AddAuthorForm