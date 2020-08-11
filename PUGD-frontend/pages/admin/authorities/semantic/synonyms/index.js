import React, { useState } from 'react';
import { GET_SYNONYM } from '@/graphql/queries/admin/authorities/synonym.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'
import Card from '@/components/ui/Card/Card';
import AdminLayout from '@/components/adminLayout';
import TextBox from '@/components/ui/TextBox';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ListSynonymComponent from '@/components/admin/authorities/symantics/ListSynonymsComponent';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
const SynonymPage = ({ props }) => {

    const [word, setWord] = useState("")
    const [getSynonym, { loading, error, data, refetch }] = useLazyQuery(GET_SYNONYM, {
        fetchPolicy: 'no-cache'
    });
    const SearchClickHandler = (e) => {
        e.preventDefault()
        getSynonym(
            {
                variables: {
                    Word: word
                }
            }
        )
    }
    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority="Sémantique : Dictionnaire des synonymes" />


            <Card  >
                <h6 className="card-title">Recherche : </h6>
                <TextBox
                    label="Recherche : Dictionnaire des synonymes"
                    value={word}
                    onChange={e => {
                        setWord(e.target.value)
                    }}
                />
                <Button onClick={SearchClickHandler}>Rechercher</Button>

                <Link href="/admin/authorities/semantic/synonyms/add">
                    <Button >Créer un mot</Button>
                </Link>

            </Card>

            <Card  >
                <h4 className="card-title">Recherche : Synonym</h4>
                {data && <ListSynonymComponent synonyms={data && data.synonym} />}
                {data && data.synonym && data.synonym.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};



SynonymPage.Layout = AdminLayout
export default SynonymPage  