import React, { useState } from 'react'

import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';

const SearchCategoryComponent = ({ getUniformTitleAllFields, SearchOnly }) => {

    const [name, setName] = useState("")
    const [type, setType] = useState(0)
    const [nature, setNature] = useState(0)
    // const [Status, setStatus] = useState(10)
    const SearchClickHandler = (e) => {
        e.preventDefault(); 
        const search = {
            name
        }
        if (type !== 0)
            search["type"] = type
        if (nature !== 0)
            search["nature"] = nature 
        getUniformTitleAllFields({
            variables: search,
        });
    }

    return (
        <React.Fragment>
            <h4 className="card-title">Recherche : Uniform title</h4>
            <Grid>
                <GridElement s={4}>
                    <TextBox label="Uniform title name"
                        value={name}
                        onChange={e => { setName(e.target.value) }}
                    />
                </GridElement>
                <GridElement s={4}>

                    <SelectBox
                        label="Type of work"
                        value={type}
                        onChange={e => { setType(Number(e.target.value)) }}
                    >
                        <option value={0}>All</option>
                        <option value={10}>Musicale</option>
                        <option value={20}>Littéraire</option>
                        <option value={30}>Cinématographique</option>
                        <option value={40}>Autre</option>
                    </SelectBox>
                </GridElement>
                <GridElement s={4}>
                    <SelectBox
                        label="Nature of work"
                        value={nature}
                        onChange={e => { setNature(Number(e.target.value)) }}
                    >
                        <option value={0}>All</option>
                        <option value={10}>Oeuvre</option>
                        <option value={20}>Expresssion</option>
                        <option value={30}>Exécution</option>
                    </SelectBox>
                </GridElement>


            </Grid>

            <br />
            <Button variant="contained" onClick={SearchClickHandler}>Rechercher</Button>
            {!SearchOnly &&
                <Link href="/admin/authorities/uniform_title/add">

                    <Button >Ajouter Uniform title</Button>
                </Link>
            }



        </React.Fragment>
    )
}


export default SearchCategoryComponent



