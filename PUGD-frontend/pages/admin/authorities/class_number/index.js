import React from 'react';
import { GET_CLASS_NUMBER } from '@/graphql/queries/admin/authorities/class_number.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchClassNumberComponent from '@/components/admin/authorities/class_number/SearchClassNumberComponent';
import ListClassNumberComponent from '@/components/admin/authorities/class_number/ListClassNumberComponent';
import Card from '@/components/ui/Card/Card';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
const ClassNumberPage = () => {

    const [getClassNumberAllFields, { data, error }] = useLazyQuery(GET_CLASS_NUMBER);
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Class bumber" />
            <Card  >
                <SearchClassNumberComponent getClassNumberAllFields={getClassNumberAllFields} />

            </Card>

            <Card  >
                <h4 className="card-title">Recherche : class number</h4>
                {error ? <div color="danger">{String(error.message)}</div> : null}

                <ListClassNumberComponent class_numbers={data && data.class_number} />

                {data && data.class_number && data.class_number.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};

import AdminLayout from '@/components/adminLayout';
ClassNumberPage.Layout = AdminLayout
export default ClassNumberPage; 