import React from 'react';
import { GET_CATEGORY_ALL_FIELDS } from '@/graphql/queries/admin/authorities/category.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import SearchCategoryComponent from '@/components/admin/authorities/category/SearchCategoryComponent';
import ListCategoryComponent from '@/components/admin/authorities/category/ListCategoryComponent';
import Card from '@/components/ui/Card/Card';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
const CategoryPage = () => {

    const [getCategoryAllFields, { error, data, refetch }] = useLazyQuery(GET_CATEGORY_ALL_FIELDS);
    console.log(data);

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Catégories" />
            <Card  >
                <SearchCategoryComponent getCategoryAllFields={getCategoryAllFields} />
            </Card>
            <Card  >
                <ListCategoryComponent categories={data && data.category_all_fields} />
                {error ? <div color="danger">{String(error.message)}</div> : null}
                {data && data.category_all_fields && data.category_all_fields.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};

import AdminLayout from '@/components/adminLayout';
CategoryPage.Layout = AdminLayout
export default CategoryPage;
