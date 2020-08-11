/* eslint-disable react/display-name */
import React from 'react'
import Icon from '@/components/ui/Icon/Icon';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import Grid from '@/components/ui/Grid/Grid';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_COLLECTION_TITLE } from '@/graphql/mutations/admin/authorities/collection_title.mutations';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';
import MaterialTable from "material-table-formik";
const ListCollectionTitleComponent = ({ collection_titles, HandleElementClick }) => {
    const [deleteCollectionTitle] = useMutation(DELETE_COLLECTION_TITLE, {
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
                basketType="collection_title"
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: "collection_title"
                        }
                    })
                }} />}
            {
                collection_titles && collection_titles.length > 0 &&
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
                                            Router.push("/admin/authorities/collection_title/modify/[id]", "/admin/authorities/collection_title/modify/" + rowData._id)
                                        }}
                                    />
                                    <RoundButton icon="delete" size="30"
                                        onClick={(e) => {
                                            deleteCollectionTitle({
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
                    data={collection_titles}
                    title="Mots trouvés sous la clé"
                />
            }
        </React.Fragment>
    )
}
export default ListCollectionTitleComponent