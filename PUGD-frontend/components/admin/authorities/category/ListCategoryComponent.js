/* eslint-disable react/display-name */
import React from 'react'
import Icon from '@/components/ui/Icon/Icon';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CATEGORY } from '@/graphql/mutations/admin/authorities/category.mutations';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';
import MaterialTable from "material-table-formik";

const ListCategoryComponent = ({ categories, HandleElementClick }) => {
    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
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
                basketType="category"
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: "category"
                        }
                    })
                }} />}
            {
                categories && categories.length > 0 && 
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
                                        <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>subject</Icon>
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
                                            Router.push("/admin/authorities/headings/modify/[id]", "/admin/authorities/headings/modify/" + rowData._id)
                                        }}
                                    />
                                    <RoundButton icon="delete" size="30"
                                        onClick={(e) => {
                                            deleteCategory({
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
                    data={categories}
                    title="Mots trouvés sous la clé"
                />
            }
            {/* <style jsx>
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
    .person-name:hover{
        cursor:pointer
    }
    `}
            </style> */}
        </React.Fragment>
    )
}
export default ListCategoryComponent