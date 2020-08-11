import React from 'react';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import GridElement from '@/components/ui/Grid/GridElement';
import TextBox from '@/components/ui/TextBox';
import Grid from '@/components/ui/Grid/Grid';
const MultipleTextinputs = ({ Title = "Title", ItemsList = [], onElementChange }) => {

    const handleInputChange = (e) => {
        const mutatedItemList = [...ItemsList]
        const index = Number(e.target.name)
        mutatedItemList[index] = e.target.value
        onElementChange(mutatedItemList)
    }
    const DeleteAtIndex = (index) => {
        const mutatedItemList = [...ItemsList]
        mutatedItemList.splice(index, 1)
        onElementChange(mutatedItemList);
    }
    const AddString = () => {
        const mutatedItemList = [...ItemsList]
        mutatedItemList.push("")
        onElementChange(mutatedItemList);

    }
    return <React.Fragment>
        <h6>{Title} &nbsp;
            <RoundButton icon="add" size="30"
                onClick={e => {
                    AddString()
                }}
            />
        </h6>
        {
            ItemsList.map((item, index) => {
                return <Grid key={index}>
                    <GridElement s={6}>
                        <TextBox required
                            // label={ElementsTitle}
                            name={index}
                            // value={inputs.Name}
                            onChange={handleInputChange}
                            value={item}
                        />
                    </GridElement>
                    <GridElement s={2} style={{ display: "flex", height: "84px" }}>
                        <RoundButton icon="delete" size="30"
                            onClick={e => DeleteAtIndex(index)}
                        />
                        {index === (ItemsList.length - 1) && <RoundButton icon="add" size="30"
                            onClick={e => {
                                AddString()
                            }}
                        />}

                    </GridElement>
                </Grid>
            })
        }

    </React.Fragment>

}
export default MultipleTextinputs