/* eslint-disable react/display-name */
import React from 'react'
// import Icon from '@/components/ui/Icon/Icon';
// import GridElement from '@/components/ui/Grid/GridElement';
// import Grid from '@/components/ui/Grid/Grid';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';
import MaterialTable from "material-table-formik";
import typeData from "./types.json"
import Icon from '@/components/ui/Icon/Icon';
const ListAllAuthoitiesComponent = ({ authorities, HandleElementClick, updateCache }) => {
    // const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    //     onCompleted: () => {
    //         updateCache()
    //     },
    //     onError: (error) => {
    //         alert(error.message);
    //     }
    // });

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
    const [basketType, setBasketType] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <SearchBasket
                handleClose={handleClose}
                open={open}
                basketType={basketType}
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: {basketType}
                        }
                    })
                }} />
            {authorities && authorities.length > 0 &&
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
                                            // if (HandleElementClick) HandleElementClick(10, {
                                            //     id: rowData._id,
                                            //     label: rowData.name
                                            // })
                                        }}>
                                        <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>
                                            {typeData[rowData.__typename].icon}
                                        </Icon>
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
                                        <div style={{ margin: "auto 0 ", }}>{typeData[rowData.__typename].type_name.replace("_"," ")}</div>
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
                                            setBasketType(typeData[rowData.__typename].type_name)
                                            setSelectedItem(rowData._id)
                                            setOpen(true)
                                        }} />
                                </React.Fragment> || null
                            }
                        },
                    ]}
                    data={authorities || []}
                    title="Mots trouvés sous la clé"
                />
            }
        </React.Fragment >
    )
}
export default ListAllAuthoitiesComponent