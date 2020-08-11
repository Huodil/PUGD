/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { GET_STOPWORD } from '@/graphql/queries/admin/authorities/stopword.queries';
import { UPDATE_STOPWORD } from '@/graphql/mutations/admin/authorities/stopword.mutations';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'
import Card from '@/components/ui/Card/Card';
import AdminLayout from '@/components/adminLayout';
import TextBox from '@/components/ui/TextBox';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
import MaterialTable from "material-table-formik";
import ListStopwordComponent from '../../../../../components/admin/authorities/stopword/ListStopwordComponent';
const StopwordPage = ({ props }) => {

    const [word, setWord] = useState("")
    // const [Data, setData] = useState([
    //     { id: '1', word: 'de', type: 1 },
    //     { id: '2', word: 'of', type: 2 },
    //     { id: '3', word: 'then', type: 3 },
    // ])

    const [getStopword, { loading, error, data, refetch }] = useLazyQuery(GET_STOPWORD, {
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            console.log(data);

        }
    });

    const [updateStopword] = useMutation(UPDATE_STOPWORD, {
        onCompleted: () => {
            refetch()
        },
        onError: (error) => {
            alert(error.message);
        }
    });


    const SearchClickHandler = (e) => {
        e.preventDefault()
        getStopword(
            {
                variables: {
                    Word: word
                }
            }
        )
    }
    const updateType = (rowData, type) => {
        updateStopword({
            variables: {
                Id: rowData._id,
                Word: rowData.word,
                Type: type,
            }
        })
    }
    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority="Sémantique : Dictionnaire des mots vides" />


            <Card  >
                <h6 className="card-title">Recherche : </h6>
                <TextBox
                    label="Recherche : Dictionnaire des mots vides"
                    value={word}
                    onChange={e => {
                        setWord(e.target.value)
                    }}
                />
                <Button onClick={SearchClickHandler}>Rechercher</Button>

                <Link href="/admin/authorities/semantic/stopwords/add">
                    <Button >Créer un mot vide</Button>
                </Link>

            </Card>

            <Card  >
                <h4 className="card-title">Recherche : Stopword</h4>
                {/* {data && data.stopword && <div>{JSON.stringify(data.stopword)}</div> */}
                
                {data && data.stopword && data.stopword.length > 0 &&
                <ListStopwordComponent
                    stopwords={data.stopword}
                    refetch={refetch} />
                    }
                {data && data.stopword && data.stopword.length === 0 && <NoDataFetched />}
            </Card>
        </div>
    );
};



StopwordPage.Layout = AdminLayout
export default StopwordPage  