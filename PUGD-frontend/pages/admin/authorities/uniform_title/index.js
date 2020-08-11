import React from 'react';
import { GET_UNIFORM_TITLE } from '@/graphql/queries/admin/authorities/uniform_title.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchUniformTitleComponent from '@/components/admin/authorities/uniform_title/SearchUniformTitleComponent';
import ListUniformTitleComponent from '@/components/admin/authorities/uniform_title/ListUniformTitleComponent';
import Card from '@/components/ui/Card/Card';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
const UniformTitlePage = () => {

    const [getUniformTitleAllFields, { error, data, refetch }] = useLazyQuery(GET_UNIFORM_TITLE);

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Catégories" />
            <Card  >
                <SearchUniformTitleComponent getUniformTitleAllFields={getUniformTitleAllFields} />
            </Card>

            <Card  >
                <h4 className="card-title">Recherche : UniformTitle</h4>
                {error ? <div color="danger">{String(error.message)}</div> : null}

                <ListUniformTitleComponent uniform_titles={data && data.uniform_title} />

                {data && data.uniform_title && data.uniform_title.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';
UniformTitlePage.Layout = AdminLayout
export default UniformTitlePage;


