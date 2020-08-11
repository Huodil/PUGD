/* eslint-disable react/display-name */
import React from 'react'
// import Icon from '@/components/ui/Icon/Icon';
// import GridElement from '@/components/ui/Grid/GridElement';
// import Grid from '@/components/ui/Grid/Grid';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_AUTHOR } from '@/graphql/mutations/admin/authorities/author.mutations';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';
import MaterialTable from "material-table-formik";
import { renderLabel } from './authorRenderComponents'
const ListAuthorComponent = ({ authors, HandleElementClick, updateCache }) => {
    const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
        onCompleted: () => {
            updateCache()
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const [addToBasket] = useMutation(ADD_TO_BASKET, {
        onCompleted: () => {
            updateCache()
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
                basketType="author"
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: "author"
                        }
                    })
                }} />}
            {authors && authors.length > 0 &&
                <React.Fragment>
                    <MaterialTable
                        options={
                            {
                                toolbar: false
                            }
                        }
                        columns={[
                            {
                                title: 'Name',
                                render: rowData=>renderLabel(rowData, HandleElementClick)
                            },
                            {
                                title: '',
                                cellStyle: { textAlign: "center" },
                                headerStyle: { textAlign: "center" },
                                render: rowData => {
                                    return !HandleElementClick && <React.Fragment>
                                        <RoundButton icon="create" size="30"
                                            onClick={(e) => {
                                                Router.push("/admin/authorities/author/modify/[id]", "/admin/authorities/author/modify/" + rowData._id)
                                            }} />
                                        <RoundButton icon="delete" size="30"
                                            onClick={(e) => {
                                                deleteAuthor({
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
                        data={authors}
                        title="Mots trouvés sous la clé"
                    />
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default ListAuthorComponent