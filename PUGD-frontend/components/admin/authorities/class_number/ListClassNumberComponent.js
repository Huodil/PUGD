/* eslint-disable react/display-name */
import React from 'react'

import Icon from '@/components/ui/Icon/Icon';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CLASS_NUMBER } from '@/graphql/mutations/admin/authorities/class_number.mutations';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';
import MaterialTable from "material-table-formik";

const ListClassNumberComponent = ({ class_numbers, HandleElementClick }) => {
    const [deleteClassNumber] = useMutation(DELETE_CLASS_NUMBER, {
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
                basketType="class_number"
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: "class_number"
                        }
                    })
                }} />}
            {
                class_numbers && class_numbers.length > 0 &&
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
                                                label: rowData.name
                                            })
                                        }}>
                                        <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>folder</Icon>
                                        <div style={{ margin: "auto 0 ", }}>{rowData.name}</div>
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
                                            Router.push("/admin/authorities/class_number/modify/[id]", "/admin/authorities/class_number/modify/" + rowData._id)
                                        }}
                                    />
                                    <RoundButton icon="delete" size="30"
                                        onClick={(e) => {
                                            deleteClassNumber({
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
                    data={class_numbers}
                    title="Mots trouvés sous la clé"
                />
                //    class_numbers.map((row) => (
                //         <Grid key={row._id}>
                //             <GridElement s={10}>
                //                 <div className="person-container" >
                //                     <Icon style={{ margin: "auto", width: "30px", color: "gray" }}>folder</Icon>
                //                     <div
                //                         className="person-name"
                //                         onClick={() => {
                //                             if (HandleElementClick) HandleElementClick(80, {
                //                                 id: row._id,
                //                                 label: row.name
                //                             })
                //                         }}
                //                     > {row.name} </div>
                //                 </div>
                //             </GridElement>
                //             <GridElement s={2}>
                //                 {!HandleElementClick && <div style={{ display: "flex" }}>
                //                     <RoundButton icon="create" size="30"
                //                         onClick={(e) => {
                //                             Router.push("/admin/authorities/class_number/modify/[id]", "/admin/authorities/class_number/modify/" + row._id)
                //                         }}
                //                         style={{ margin: "auto" }} />
                //                     <RoundButton icon="delete" size="30"
                //                         onClick={(e) => {
                //                             deleteClassNumber({
                //                                 variables: {
                //                                     Id: row._id
                //                                 }
                //                             })
                //                         }}
                //                         style={{ margin: "auto" }} />
                //                     <RoundButton icon="shopping_basket" size="30"
                //                         onClick={(e) => {
                //                             setSelectedItem(row._id)
                //                             setOpen(true)
                //                         }}
                //                         style={{ margin: "auto" }} />
                //                 </div>}

                //             </GridElement>
                //         </Grid>
                //     ))
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
export default ListClassNumberComponent