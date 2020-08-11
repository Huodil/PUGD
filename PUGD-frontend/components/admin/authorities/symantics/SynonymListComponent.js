import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import TextBox from '@/components/ui/TextBox'; 

const ListSynonyms = ({ Synonyms, HandleOpen, ChangeSynonym, PropertyName, AuthorityNumber }) => {
    return (
        <Grid>
            <GridElement s={12}>
                <h5> Synonyms : &nbsp;
                        <RoundButton icon="add" size="30"
                        onClick={e => HandleOpen(AuthorityNumber, (authoritytype, authority) => {
                            const mutatedProp = [...Synonyms]
                            mutatedProp.push({
                                object: authority.id,
                                label: authority.label,
                                description: 10
                            })
                            ChangeSynonym(PropertyName, mutatedProp)
                        }
                        )}
                    />
                </h5>

                {
                    Synonyms.map((Synonym, index) => {
                        return <Grid key={index}>
                            <GridElement s={7}>
                                <TextBox
                                    label="Synonym"
                                    defaultValue={Synonym.label}
                                />
                            </GridElement>
                            <GridElement s={1} style={{ display: "flex", height: "84px" }}>
                                <RoundButton icon="delete" size="30"
                                    onClick={e => {
                                        const mutatedProp = [...Synonyms]
                                        mutatedProp.splice(index, 1)
                                        ChangeSynonym(PropertyName, mutatedProp)
                                    }}
                                    style={{ margin: "auto" }} />
                            </GridElement>
                        </Grid>
                    })
                }
            </GridElement>
        </Grid>

    )
}
export default ListSynonyms