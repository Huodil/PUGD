import React from 'react';
import { GET_AUTHOR } from '@/graphql/queries/admin/authorities/author.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'
import SearchAuthorComponent from '@/components/admin/authorities/author/SearchAuthorComponent';
import ListAuthorComponent from '@/components/admin/authorities/author/ListAuthorComponent';
import Card from '@/components/ui/Card/Card';
import i18next from '@/components/admin/localisation/i18nextInit';
import Error_404 from '../../../../components/admin/authorities/shared/404_error';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
import TextBox from '@/components/ui/TextBox';
const AuthorPage = (props) => {

    const [getAuthorAllFields, { error, data, refetch }] = useLazyQuery(GET_AUTHOR);

    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority={i18next.t("authorHeader")} />

            <Card  >
                <SearchAuthorComponent getAuthorAllFields={getAuthorAllFields} />
            </Card>
            <Card  >

                <ListAuthorComponent authors={data && data.author} updateCache={refetch} mutation={getAuthorAllFields} />
                {error ? <Error_404 Text="An error has occured while fetching data" /> : null}
                {data && data.author && data.author.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';


AuthorPage.Layout = AdminLayout
export default AuthorPage  