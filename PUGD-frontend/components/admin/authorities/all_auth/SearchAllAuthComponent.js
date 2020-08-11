import React, { useState } from 'react'
import Grid from '@/components/ui/Grid/Grid';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';
import GridElement from '@/components/ui/Grid/GridElement';
const SearchAuthorComponent = ({ SearchOnly, getAuthorAllFields }) => {

    const [All_Fields, setAll_Fields] = useState("")
    // const [Index_Name, setIndex_Name] = useState("")
    const [Author_Type, setAuthor_Type] = useState(0)
    const [searchWith, setSearchWith] = useState(10)
    const SearchClickHandler = (e) => {


        e.preventDefault();
        e.stopPropagation();
        const Author = { Author_Type }
        Author_Type !== 0 ? Author.Author_Type = Author_Type : undefined
        searchWith !== 10 ? Author.All_Fields = All_Fields : Author.IndexName_Auth = All_Fields

        console.log(getAuthorAllFields({
            variables: Author
        }));

    }
    return (
        <React.Fragment>
            <h4 className="card-title">Recherche : Auteurs</h4>
            <Grid>
                <GridElement s={6}>
                    <TextBox
                        label={"Search phrase"}
                        value={All_Fields}
                        onChange={e => {
                            setAll_Fields(e.target.value);
                        }}
                    />

                </GridElement>
                <GridElement s={6}>
                    <SelectBox
                        label="Search with"
                        value={searchWith}
                        onChange={e => { setSearchWith(e.target.value) }}
                    >
                        <option value={10}>All Fields</option>
                        <option value={20}>Indexable name(or last name)</option>
                    </SelectBox>
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <SelectBox
                        label="Type Auteur"
                        name="Author_Type"
                        value={Author_Type}
                        onChange={e => { setAuthor_Type(e.target.value) }}
                    >
                        <option value={0}>All</option>
                        <option value={10}>Personne Physique</option>
                        <option value={20}>Collectivité</option>
                        <option value={30}>Congrés</option>
                    </SelectBox>
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
            <Button onClick={(e) => SearchClickHandler(e)}>Rechercher</Button>
            {!SearchOnly &&
                <Link href="/admin/authorities/author/add">
                    <Button >Ajouter Auteur</Button>
                </Link>
            }
        </React.Fragment>
    )
}
export default SearchAuthorComponent