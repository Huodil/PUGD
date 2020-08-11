import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import TextBox from '@/components/ui/TextBox';
import RoundButton from '@/components/ui/RoundButton/RoundButton';


const SeeAlsoComponent = ({ categories, removeSeeAlso }) => {
    return (
        <React.Fragment>
            {
                categories.map((category, index) => {
                    return <Grid key={index}>
                        <GridElement s={5}>
                            <TextBox label="See also (related term)"
                                defaultValue={category.label}
                            />
                        </GridElement>
                        <GridElement s={1} style={{ display: "flex", height: "84px" }}>
                            <RoundButton icon="delete" size="30" onClick={e=>removeSeeAlso("See_also",index)} style={{ margin: "auto" }} />
                        </GridElement>
                    </Grid>
                })
            }


        </React.Fragment>
    )
}
export default SeeAlsoComponent 