import React from 'react'
import AdminLayout from '@/components/adminLayout'
import Card from '@/components/ui/card/card'
import Grid from '@/components/ui/Grid/grid';
import GridElement from '@/components/ui/Grid/GridElement';
import TextBox from "@/components/ui/TextBox";
import Button from "@/components/ui/Button";
import ButtonPopUp from "@/components/ui/ButtonPopUp";
import AllBorrewors from "./AllBorrowers";

const indexBorrowers = () => {

    return <div className="container">
        <div className="row">
            <div className="col s12">

                <ButtonPopUp icon={"add"} hrf={"#"}/>
                <form>
                    <Card>
                        <div className="row">
                            <div className="card-header">
                                <h4 className="card-title"> List Lecteur (Borrowers)</h4>

                            </div>
                            <p>Recherche groupe</p>
                            <Grid>
                                <GridElement s={12} style={{display:"flex"}}>
                                    <TextBox label="Nom du Group"/>
                                    <Button  rounded={4}>Search</Button>
                                    <Button href="/admin/circulation/groupBrs/addGroups" rounded={4}>add group</Button>
                                </GridElement>
                            </Grid>

                        </div>
                    </Card>
                </form>
                <AllBorrewors/>
            </div>
        </div>
    </div>
}
indexBorrowers.Layout = AdminLayout
export default indexBorrowers
