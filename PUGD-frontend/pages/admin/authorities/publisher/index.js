import React from 'react';
import { GET_PUBLISHER_ALL_FIELDS } from '@/graphql/queries/admin/authorities/publisher.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchPublisherComponent from '@/components/admin/authorities/publisher/SearchPublisherComponent';
import ListPublisherComponent from '@/components/admin/authorities/publisher/ListPublisherComponent';
import Card from '@/components/ui/Card/Card' 
import NoDataFetched from '@/components/admin/authorities/shared/noData';

const PublisherPage = () => {

    const [getPublisherAllFields, { error, data, refetch }] = useLazyQuery(GET_PUBLISHER_ALL_FIELDS);
  

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Publishers" />
            <Card  >
                <SearchPublisherComponent getPublisherAllFields={getPublisherAllFields} />

            </Card>

            <Card  >
                <h4 className="card-title">Recherche : Publishers</h4>
                {error ? <div color="danger">{String(error.message)}</div> : null}
            
                    <ListPublisherComponent publishers={data && data.publisher_all_fields} />
               
                {data && data.publisher_all_fields && data.publisher_all_fields.length ===0 && <NoDataFetched />}
            </Card>
        </div>
    );
};


import AdminLayout from '@/components/adminLayout';
PublisherPage.Layout = AdminLayout
export default PublisherPage; 
  