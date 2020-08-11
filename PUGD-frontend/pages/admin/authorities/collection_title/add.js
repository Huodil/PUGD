import React from 'react'; 
import Card from '@/components/ui/Card/Card';

import AddCollectionTitleForm from '@/components/admin/authorities/collection_title/AddCollectionTitleForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';


const AddCollectionTitle = () => {

   
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Class-Number" />
            <Card  >
                <h4 >Création d'une Class-Number</h4>
                <AddCollectionTitleForm   />
                <br /><br />
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';
AddCollectionTitle.Layout = AdminLayout
export default AddCollectionTitle; 
 