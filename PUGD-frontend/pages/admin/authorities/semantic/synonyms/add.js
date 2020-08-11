import React from 'react';
import { GET_AUTHOR } from '@/graphql/queries/admin/authorities/author.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'
import Card from '@/components/ui/Card/Card';
import AdminLayout from '@/components/adminLayout';
import TextBox from '@/components/ui/TextBox';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import useSynonymForm from '../../../../../components/admin/authorities/symantics/useSynonymForm';
import FindSynonymModal from '../../../../../components/admin/authorities/symantics/FindSynonymModal';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
const SynonymPage = (props) => {

    // const [getSynonymes, { error, data, refetch }] = useLazyQuery(GET_SYNONYMES);

    const { inputs,
        onAddHandler,
        handleInputChange,
        handleClose,
        handleOpen,
        open,
        AddAuthority,
        RemoveAuthority, } = useSynonymForm();

    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority="Sémantique : Dictionnaire des synonymes" />


            <Card  >
                <h6 className="card-title">Synonymes du mot </h6>
                <TextBox
                    label="Word"
                    name="word"
                    value={inputs.word}
                    onChange={handleInputChange}
                />
                <Grid>
                    <GridElement s={12}>
                        <h5> Synonyms &nbsp;
                        <RoundButton icon="add" size="30"
                                onClick={e => handleOpen()}
                            />
                        </h5>

                        {
                            inputs.synonyms.map((synonym, index) => {
                                return <Grid key={synonym.id}>
                                    <GridElement s={5}>
                                        <TextBox label="Word"
                                            defaultValue={synonym.label}
                                        />
                                    </GridElement>
                                    <GridElement s={1} style={{ display: "flex", height: "84px" }}>
                                        <RoundButton icon="delete" size="30"
                                            onClick={e => RemoveAuthority("synonyms", index)} style={{ margin: "auto" }}
                                        />
                                    </GridElement>
                                </Grid>
                            })
                        }
                    </GridElement>
                </Grid>


                <Link href="/admin/authorities/semantic/synonyms">
                    <Button >Annuler</Button>
                </Link>
                <Button
                onClick={onAddHandler}
                >Enregister</Button>
            </Card>
            <FindSynonymModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={(word) => AddAuthority("synonyms", word)}
            />
        </div>
    );
};



SynonymPage.Layout = AdminLayout
export default SynonymPage  