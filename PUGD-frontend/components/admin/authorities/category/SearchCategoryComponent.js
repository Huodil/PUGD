import React, { useState } from 'react'
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';

const SearchCategoryComponent = ({ getCategoryAllFields, SearchOnly }) => {

    const [All_Fields, setAll_Fields] = useState("")
    // const [Status, setStatus] = useState(10)



    const SearchClickHandler = (e) => {
        e.preventDefault();
        console.log("searching with ",All_Fields);
        
        getCategoryAllFields({
            variables: {
                all_fields: All_Fields
            }
        });
    }

    return (
        <React.Fragment>
            <h4 className="card-title">Recherche : Catégories</h4>
            <Grid>
                <GridElement s={6}>
                    <TextBox label="Category name"
                        value={All_Fields}
                        onChange={e => { setAll_Fields(e.target.value) }}
                    />
                </GridElement>
                {/* <GridElement s={6}>
                    <SelectBox
                        label="Status"
                        name="Author_Type"
                        value={Status}
                        onChange={e => { setStatus(e.target.value) }}
                    >
                        <option value={10}>All Statuses</option>
                    </SelectBox>
                </GridElement> */}

            </Grid>

            <br />
            <Button variant="contained" onClick={SearchClickHandler}>Rechercher</Button>
            {!SearchOnly &&
                <Link href="/admin/authorities/headings/add">
                    <Button >Ajouter Category</Button>
                </Link>
            }



        </React.Fragment>
    )
}


export default SearchCategoryComponent



 