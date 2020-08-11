import React from 'react'
import Icon from '@/components/ui/Icon/Icon';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import { DELETE_SYNONYM } from '@/graphql/mutations/admin/authorities/synonym.mutations'
import { GET_SYNONYM } from '@/graphql/queries/admin/authorities/synonym.queries'
import { useMutation } from 'react-apollo';

const ListSynonymComponent = ({ synonyms, HandleElementClick,  }) => {
    const [deleteSynonym] = useMutation(DELETE_SYNONYM, {
        onCompleted: () => {
            console.log("successfully updated");
        },
        onError: (error) => {
            alert(error.message);
        },
        refetchQueries: [
            {
                query: GET_SYNONYM ,
            variables: {
                    word:"test"
                }
            }
        ],

    });

    return (
        <React.Fragment>
            {
                synonyms.map((row) => (
                    <Grid key={row._id}>
                        <GridElement s={10}>
                            <div className="person-container" >
                                <Icon style={{ margin: "auto", width: "30px", color: "gray" }}>spellcheck</Icon>
                                <div
                                    className="person-name"
                                    onClick={() => {
                                        if (HandleElementClick) HandleElementClick({
                                            id: row._id,
                                            label: row.word
                                        })
                                    }}
                                > {row.word} </div>
                            </div>
                        </GridElement>
                        <GridElement s={2}>
                            {!HandleElementClick && <div style={{ display: "flex" }}>
                                <RoundButton icon="create" size="30"
                                    onClick={(e) => {
                                        Router.push("/admin/authorities/semantic/synonyms/modify/[id]",
                                            "/admin/authorities/semantic/synonyms/modify/" + row._id)
                                    }}
                                    style={{ margin: "auto" }} />
                                <RoundButton icon="delete" size="30"
                                    onClick={(e) => {
                                        deleteSynonym({
                                            variables: {
                                                Id: row._id
                                            },

                                        })
                                        // refetch()
                                    }}
                                    style={{ margin: "auto" }} />
                            </div>}

                        </GridElement>
                    </Grid>

                ))
            }
            <style jsx>
                {`
    .person-container{
        height: 35px;
        display: flex;
        justify-content: center;
        width: fit-content;
    }
    .person-name{
        height: 35px;
        display: inline-block;
        margin: auto;
        line-height: 35px;
        width:fit-content;
    }
    .person-name:hover{
        cursor:pointer
    }
    `}
            </style>
        </React.Fragment>
    )
}
export default ListSynonymComponent