import React from 'react';
import Card from '@/components/ui/Card/Card';
import AddSeriesForm from '@/components/admin/authorities/series/AddSeriesForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
 

const AuthorPage = () => {
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Series" />
            <Card  >
                <h4 >Création d'une series</h4>
                <AddSeriesForm />
                <br /><br />

            </Card>
        </div>
    );
};

 
import AdminLayout from '@/components/adminLayout';
AuthorPage.Layout = AdminLayout
export default AuthorPage; 
 
 