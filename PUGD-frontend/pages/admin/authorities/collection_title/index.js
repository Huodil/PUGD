import React from 'react';
import { GET_COLLECTION_TITLE } from '@/graphql/queries/admin/authorities/collection_title.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchCollectionTitleComponent from '@/components/admin/authorities/collection_title/SearchCollectionTitleComponent';
import ListCollectionTitleComponent from '@/components/admin/authorities/collection_title/ListCollectionTitleComponent';
import Card from '@/components/ui/Card/Card';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
const CollectionTitlePage = () => {

    const [getCollectionTitleAllFields, { error, data, refetch }] = useLazyQuery(GET_COLLECTION_TITLE);
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Class bumber" />
            <Card  >
                <SearchCollectionTitleComponent getCollectionTitleAllFields={getCollectionTitleAllFields} />
            </Card>

            <Card  >
                <h4 className="card-title">Recherche : collection title</h4>
                {error ? <div color="danger">{String(error.message)}</div> : null}

                <ListCollectionTitleComponent collection_titles={data && data.collection_title} />

                {data && data.collection_title && data.collection_title.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';
CollectionTitlePage.Layout = AdminLayout
export default CollectionTitlePage;
