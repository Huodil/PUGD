import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';

const ListUniformTitles = ({ Title, UniformTitles, HandleOpen, children, ChangeUniformTitle,PropertyName ,AuthorityNumber}) => {
    return (
        <Grid>
            <GridElement s={12}>
                <h5> {Title} &nbsp;
                        <RoundButton icon="add" size="30"
                        onClick={e => HandleOpen(AuthorityNumber, (authoritytype, authority) => {
                            const mutatedProp = [...UniformTitles]
                            mutatedProp.push({
                                object: authority.id,
                                label: authority.label,
                                description: 10
                            })
                            ChangeUniformTitle(PropertyName, mutatedProp)
                        }
                        )}
                    />
                </h5>

                {
                    UniformTitles.map((UniformTitle, index) => {
                        return <Grid key={index}>
                            <GridElement s={5}>
                                <TextBox
                                    label="Uniform title"
                                    defaultValue={UniformTitle.label}
                                />
                            </GridElement>
                            <GridElement s={5}>
                                <SelectBox
                                    label="Type"
                                    // name="Type_Work"
                                    value={UniformTitle.description}
                                    onChange={e => {
                                        const mutatedProp = [...UniformTitles]
                                        mutatedProp[index] = { ...mutatedProp[index], description: e.target.value }
                                        ChangeUniformTitle(PropertyName, mutatedProp)
                                    }}
                                >
                                    {children}
                                    {/*  */}
                                </SelectBox>
                            </GridElement>
                            <GridElement s={1} style={{ display: "flex", height: "84px" }}>
                                <RoundButton icon="delete" size="30"
                                    onClick={e => {
                                        const mutatedProp = [...UniformTitles]
                                        mutatedProp.splice(index, 1)
                                        ChangeUniformTitle(PropertyName, mutatedProp)
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
export default ListUniformTitles