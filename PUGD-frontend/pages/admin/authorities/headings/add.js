import React from 'react';

import AddCategoryForm from '@/components/admin/authorities/category/AddCategoryForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';

import Card from '@/components/ui/Card/Card'; 

const CategoryPage = () => {

    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority="Catégories" />

            <Card  >
                <h4 >Création d'une catégory</h4>
                <AddCategoryForm />
                <br /><br />
            </Card>
        </div>
    );
};



import AdminLayout from '@/components/adminLayout';
CategoryPage.Layout = AdminLayout
export default CategoryPage; 
 