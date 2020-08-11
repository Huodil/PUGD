import React from 'react';
import Card from '@/components/ui/Card/Card';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import AddAuthorForm from '@/components/admin/authorities/author/AddAuthorForm';
import i18next from '@/components/admin/localisation/i18nextInit';

const AddAuthorPage = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority={t("authorHeader")} />
            <Card >
                <h4 >{t("createAuthor")}</h4>
                <AddAuthorForm />
                <br /><br />
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';
import { useTranslation } from 'react-i18next';
AddAuthorPage.Layout = AdminLayout
export default AddAuthorPage;
