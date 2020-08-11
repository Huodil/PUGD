/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { GET_ALL_AUTHORITIES } from '@/graphql/queries/admin/authorities/allAuthorities.queries';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'  
import Card from '@/components/ui/Card/Card';
import i18next from '@/components/admin/localisation/i18nextInit';
import Error_404 from '../../../../components/admin/authorities/shared/404_error';
import NoDataFetched from '@/components/admin/authorities/shared/noData';
import TextBox from '@/components/ui/TextBox';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import MaterialTable from "material-table-formik";
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon/Icon';
import ListAllAuthoitiesComponent from "@/components/admin/authorities/all_auth/ListAllAuthComponent"
const AuthorPage = (props) => {

    const [getAllAuthorities, { error, data, refetch }] = useLazyQuery(GET_ALL_AUTHORITIES);
    const [All_Fields, setAll_Fields] = useState("")
    const SearchClickHandler = (e) => {
        console.log("SearchClickHandler");
        
        e.preventDefault()
        getAllAuthorities({
            variables:{
                all_fields:All_Fields
            }
        })
    }
    console.log(data);
    
    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority={"Recherche : Toutes autorités"} />

            <Card  >
                <h5 className="card-title">Toutes autorités</h5>
                <Grid>
                    <GridElement s={12}>
                        <TextBox
                            label={"Tous les champs"}
                            value={All_Fields}
                            onChange={e => {
                                setAll_Fields(e.target.value);
                            }}
                        />

                    </GridElement>
                    <Button onClick={(e) => SearchClickHandler(e)}>Rechercher</Button>
                </Grid>
            </Card>
            <Card  >
                 
                <ListAllAuthoitiesComponent authorities={data && data.GetAllAuthorities || []}/>
                {/* <MaterialTable
                    options={
                        {
                            toolbar: false
                        }
                    }
                    columns={[
                        {
                            title: 'Name',
                            render: rowData => {
                                return <React.Fragment>
                                    <div style={{ display: "flex" }}
                                        onClick={() => {
                                            // if (HandleElementClick) HandleElementClick(10, {
                                            //     id: rowData._id,
                                            //     label: rowData.name
                                            // })
                                        }}>
                                        <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>person</Icon>
                                        <div style={{ margin: "auto 0 ", }}>{rowData.name}</div>
                                    </div>

                                </React.Fragment>
                            }
                        },
                        {
                            title: 'Type',
                            render: rowData => {
                                return <React.Fragment>
                                    <div style={{ display: "flex" }}
                                        onClick={() => {
                                            // if (HandleElementClick) HandleElementClick(10, {
                                            //     id: rowData._id,
                                            //     label: rowData.name
                                            // })
                                        }}> 
                                        <div style={{ margin: "auto 0 ", }}>{rowData.__typename}</div>
                                    </div>

                                </React.Fragment>
                            }
                        },
                        {
                            title: '',
                            cellStyle: { textAlign: "center" },
                            headerStyle: { textAlign: "center" },
                            render: rowData => {
                          
                                return !HandleElementClick && <React.Fragment>
                                   
                                    <RoundButton icon="shopping_basket" size="30"
                                        onClick={(e) => {
                                            setSelectedItem(rowData._id)
                                            setOpen(true)
                                        }} />
                                </React.Fragment> || null
                            }
                        },
                    ]}
                    data={data && data.GetAllAuthorities || []}
                    title="Mots trouvés sous la clé"
                /> */}

                {/* <ListAuthorComponent authors={data && data.author} updateCache={refetch} mutation={getAuthorAllFields} />
                {error ? <Error_404 Text="An error has occured while fetching data" /> : null}
                {data && data.author && data.author.length === 0 && <NoDataFetched />} */}
            </Card>
        </div>
    );
};
import AdminLayout from '@/components/adminLayout';


AuthorPage.Layout = AdminLayout
export default AuthorPage  