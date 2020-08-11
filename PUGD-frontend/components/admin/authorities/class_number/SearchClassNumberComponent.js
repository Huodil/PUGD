import React, { useState } from 'react'
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';


import Button from '@/components/ui/Button'; 

import Link from 'next/link';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';

const SearchClassNumberComponent = ({ getClassNumberAllFields, SearchOnly }) => {

    const [All_Fields, setAll_Fields] = useState("")
    const [Status, setStatus] = useState(10)



    const SearchClickHandler = (e, All_Fields, Status) => {
        e.preventDefault();

        getClassNumberAllFields({
            variables: {
                Name: All_Fields
            }
        });
    }

    return (
        <React.Fragment>
            <h4 className="card-title">Recherche : Class Number</h4>
            <Grid>
                <GridElement s={6}>
                    <TextBox label="Class number name"
                        value={All_Fields}
                        onChange={e => { setAll_Fields(e.target.value) }}
                    />
                </GridElement>
                <GridElement s={6}>
                    <SelectBox
                        label="Status"
                        value={Status}
                        onChange={e => { setStatus(e.target.value) }}
                    >
                        <option value={10}>All Statuses</option>
                    </SelectBox>
                </GridElement>

            </Grid>

            <br />
            <Button variant="contained" onClick={(e) => SearchClickHandler(e, All_Fields, Status)}>Rechercher</Button>
            {!SearchOnly &&
                <Link href="/admin/authorities/class_number/add">
                    <Button variant="contained">Ajouter Class Number</Button>
                </Link>
            }


        </React.Fragment>
    )
}
export default SearchClassNumberComponent