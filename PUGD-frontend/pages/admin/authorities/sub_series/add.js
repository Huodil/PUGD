import React from 'react';
import AddSubSeriesForm from '@/components/admin/authorities/sub_series/AddSubSeriesForm';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'; 
import Card from '@/components/ui/Card/Card';


const AddSubSeries = () => {


    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Sub-series" />
            <Card  >
                <h4 >Création d'une Sub-series</h4>
                <AddSubSeriesForm />
                <br /><br />

            </Card>
        </div>
    );
};

 
import AdminLayout from '@/components/adminLayout';
AddSubSeries.Layout = AdminLayout
export default AddSubSeries; 
 