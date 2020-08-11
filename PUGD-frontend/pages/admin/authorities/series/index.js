import React from 'react';
import { GET_SERIES_ALL_FIELDS } from '@/graphql/queries/admin/authorities/series.queries';
import { useLazyQuery } from '@apollo/react-hooks';

import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchSeriesComponent from '@/components/admin/authorities/series/SearchSeriesComponent';
import ListSeriesComponent from '@/components/admin/authorities/series/ListSeriesComponent';
import Card from '@/components/ui/Card/Card'
import NoDataFetched from '@/components/admin/authorities/shared/noData';

const SeriesPage = () => {

    const [getSeriesAllFields, { error, data, refetch }] = useLazyQuery(GET_SERIES_ALL_FIELDS);
    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Series" />
            <Card  >
                <SearchSeriesComponent getSeriesAllFields={getSeriesAllFields} />
            </Card>
            <Card  >
                <h4 className="card-title">Recherche : Series</h4>
                {error ? <div color="danger">{String(error.message)}</div> : null}
            
                    <ListSeriesComponent series={data && data.series_all_fields} />
           
                {data && data.series_all_fields && data.series_all_fields.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};



import AdminLayout from '@/components/adminLayout';
SeriesPage.Layout = AdminLayout
export default SeriesPage;
