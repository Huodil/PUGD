import React from 'react'; 
import Card from '@/components/ui/Card/Card';


import AddClassNumberForm from '@/components/admin/authorities/class_number/AddClassNumberForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
 

const AddClassNumber = () => {

 
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Class-Number" />
            <Card  >
                <h4 >Création d'une Class-Number</h4>
                <AddClassNumberForm />
                <br /><br />
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';
AddClassNumber.Layout = AdminLayout
export default AddClassNumber; 
 
