import React, { useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import Card from '@/components/ui/Card/Card';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_SYNONYM } from '../../../../graphql/queries/admin/authorities/synonym.queries';
import TextBox from '@/components/ui/TextBox';
import Button from '@/components/ui/Button';
import ListSynonymComponent from './ListSynonymsComponent';
const FindSynonymModal = ({ HandleElementClick, open, handleClose, AuthorityType }) => {
    const [word, setWord] = useState("")
    const [getSynonym, { loading, error, data, refetch }] = useLazyQuery(GET_SYNONYM,{
        fetchPolicy:'no-cache'
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
        <Modal
            open={open}
            onClose={handleClose}
        >

            <React.Fragment>
                <Card  >
                    <TextBox
                        label="Recherche : Dictionnaire des synonymes"
                        value={word}
                        onChange={e => {
                            setWord(e.target.value)
                        }}
                    />
                    <Button onClick={SearchClickHandler}>Rechercher</Button>
                </Card>
                <Card  >
                    <h4 className="card-title">Recherche : Synonym</h4>
                    {data && <ListSynonymComponent synonyms={data && data.synonym} HandleElementClick={HandleElementClick} refetch={refetch} />}
                    {/* onclick={
                     HandleElementClick
                   } */}

                </Card>
            </React.Fragment>

        </Modal>
    );
}
export default FindSynonymModal