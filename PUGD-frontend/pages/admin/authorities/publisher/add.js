import React from 'react'; 
import Card from '@/components/ui/Card/Card';

import AddPublisherForm from '@/components/admin/authorities/publisher/AddPublisherForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
 

const AuthorPage = () => {

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Catégories" />
            <Card  > 
                    <h4 >Création d'un Publisher</h4>
                    <AddPublisherForm  />
                    <br /><br /> 
            </Card>
        </div>
    );
};

 
import AdminLayout from '@/components/adminLayout';
AuthorPage.Layout = AdminLayout
export default AuthorPage; 
 