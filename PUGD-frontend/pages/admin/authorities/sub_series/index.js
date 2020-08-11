import React from 'react';
import { GET_SUB_SERIES_ALL_FIELDS } from '@/graphql/queries/admin/authorities/sub_series.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchSubSeriesComponent from '@/components/admin/authorities/sub_series/SearchSubSeriesComponent';
import ListSubSeriesComponent from '@/components/admin/authorities/sub_series/ListSubSeriesComponent';
import Card from '@/components/ui/Card/Card';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
const CategoryPage = () => {

    const [getSubSeriesAllFields, { error, data, refetch }] = useLazyQuery(GET_SUB_SERIES_ALL_FIELDS);


    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Catégories" />
            <Card  >
                <SearchSubSeriesComponent getSubSeriesAllFields={getSubSeriesAllFields} />

            </Card>

            <Card  >
                <h4 className="card-title">Recherche : Sub-Series</h4>
                {error ? <div color="danger">{String(error.message)}</div> : null}
            
                    <ListSubSeriesComponent sub_series={data && data.sub_series_all_fields} />
           
                {data && data.sub_series_all_fields && data.sub_series_all_fields.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};

import AdminLayout from '@/components/adminLayout';
CategoryPage.Layout = AdminLayout
export default CategoryPage;
