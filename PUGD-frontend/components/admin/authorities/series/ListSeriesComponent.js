import React from 'react'

import Icon from '@/components/ui/Icon/Icon';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import Grid from '@/components/ui/Grid/Grid';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_SERIES } from '@/graphql/mutations/admin/authorities/series.mutations';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';
import MaterialTable from "material-table-formik";

const ListSeriesComponent = ({ series, HandleElementClick }) => {
    const [deleteSeries] = useMutation(DELETE_SERIES, {
        onCompleted: () => {
            // updateCache()
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const [addToBasket] = useMutation(ADD_TO_BASKET, {
        onCompleted: () => {
            // updateCache()
            setOpen(false)
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    // State of the modal
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            {!HandleElementClick && <SearchBasket
                handleClose={handleClose}
                open={open}
                basketType="series"
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: "series"
                        }
                    })
                }} />}
            {
                series &&
                series.length > 0 &&
                <MaterialTable
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
                                            if (HandleElementClick) HandleElementClick(10, {
                                                id: rowData._id,
                                                label: rowData.title
                                            })
                                        }}>
                                        <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>subject</Icon>
                                        <div style={{ margin: "auto 0 ", }}>{rowData.title}</div>
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
                                    <RoundButton icon="create" size="30"
                                        onClick={(e) => {
                                            Router.push("/admin/authorities/series/modify/[id]", "/admin/authorities/series/modify/" + rowData._id)
                                        }}
                                    />
                                    <RoundButton icon="delete" size="30"
                                        onClick={(e) => {
                                            deleteSeries({
                                                variables: {
                                                    Id: rowData._id
                                                }
                                            })
                                        }} />
                                    <RoundButton icon="shopping_basket" size="30"
                                        onClick={(e) => {
                                            setSelectedItem(rowData._id)
                                            setOpen(true)
                                        }} />
                                </React.Fragment> || null
                            }
                        },
                    ]}
                    data={series}
                    title="Mots trouvés sous la clé"
                />
                // series.map((row) => (
                //     <Grid key={row._id}>
                //         <GridElement s={10}>
                //             <div className="person-container" >
                //                 <Icon style={{ margin: "auto", width: "30px", color: "gray" }}>folder</Icon>
                //                 <div
                //                     className="person-name"
                //                     onClick={() => {
                //                         if (HandleElementClick) HandleElementClick(40, {
                //                             id: row._id,
                //                             label: row.title
                //                         })
                //                     }}
                //                 > {row.title} </div>
                //             </div>
                //         </GridElement>
                //         <GridElement s={2}>
                //             {!HandleElementClick && <div style={{ display: "flex" }}>
                //                 <RoundButton icon="create" size="30"
                //                     onClick={(e) => {
                //                         Router.push("/admin/authorities/series/modify/[id]", "/admin/authorities/series/modify/" + row._id)
                //                     }}
                //                     style={{ margin: "auto" }} />
                //                 <RoundButton icon="delete" size="30"
                //                     onClick={(e) => {
                //                         deleteSeries({
                //                             variables: {
                //                                 Id: row._id
                //                             }
                //                         })
                //                     }}
                //                     style={{ margin: "auto" }} />
                //                 <RoundButton icon="shopping_basket" size="30"
                //                     onClick={(e) => {
                //                         setSelectedItem(row._id)
                //                         setOpen(true)
                //                     }}
                //                     style={{ margin: "auto" }} />
                //             </div>}

                //         </GridElement>
                //     </Grid>
                // ))
            }
            <style jsx>
                {`
    .person-container{
        height: 35px;
        display: flex;
        justify-content: center;
        width: fit-content;
    }
    .person-name{
        height: 35px;
        display: inline-block;
        margin: auto;
        line-height: 35px;
        width:fit-content;
    }
    `}
            </style>
        </React.Fragment>
    )
}
export default ListSeriesComponent