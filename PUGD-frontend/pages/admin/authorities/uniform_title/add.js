import React from 'react';

import AddUniformTitleForm from '@/components/admin/authorities/uniform_title/AddUniformTitleForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';

import Card from '@/components/ui/Card/Card'; 



const UniformTitlePage = () => {

    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority="Uniform title" />

            <Card  >
                <h4 >Création d'une Uniform title</h4>
                <AddUniformTitleForm />
                <br /><br />
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';
UniformTitlePage.Layout = AdminLayout
export default UniformTitlePage;  