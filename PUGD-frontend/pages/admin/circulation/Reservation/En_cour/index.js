import React from 'react'
import AdminLayout from '@/components/adminLayout'
import Card from "@/components/ui/card/card";
import Grid from "@/components/ui/Grid/grid";
import GridElement from "@/components/ui/Grid/GridElement";
import TextBox from "@/components/ui/TextBox";
import Button from "@/components/ui/Button";
import ListReservation from "./listReservation";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {GET_ALL_RESERVATIONS} from "graphql/queries/admin/Ciruclation/Reservation.query";


const resv = () => {
    const NO_RESERVATION = <span style={{color:'#d60e28'}}>No data is finder</span>;



    /*const onSearchHandler = (e) => {

        e.preventDefault();
        GetGroupsByName({
            variables: {
                name: name,
            }
        });
    }*/
    return <div className="container">
        <div className="row">
            <div className="col s12">
                <form>
                    <Card>
                        <div className="row">
                            <div className="card-header">
                                <h4 className="card-title">Resersvation en cour</h4>

                            </div>
                            <p>Code-barres exemplaire pour valider une réservation</p>
                            <Grid>
                                <GridElement s={12} style={{display:"flex"}}>
                                    <TextBox
                                        label="code notice ou examplaire"
                                        type="text"
                                    />
                                    <Button

                                        rounded={4}>Search</Button>

                                </GridElement>
                            </Grid>
                        </div>
                    </Card>
                </form>
                {/*list des Reservation*/}

                    <ListReservation  />


               {/* { data != null || data !== undefined ? <pa>sur </pa> : NO_RESERVATION}*/}
                {/*<ListReservation datamap={data.getAllReservation} />*/}
            </div>
        </div>
    </div>
}
resv.Layout = AdminLayout
export default resv