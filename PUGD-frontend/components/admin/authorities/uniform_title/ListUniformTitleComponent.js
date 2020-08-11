import React from 'react'
import Icon from '@/components/ui/Icon/Icon';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_UNIFORM_TITLE } from '@/graphql/mutations/admin/authorities/uniform_title.mutations';
import { ADD_TO_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import SearchBasket from '../basket/SearchBasket';

const ListUniformTitleComponent = ({ uniform_titles, HandleElementClick }) => {
    const [deleteUniformTitle] = useMutation(DELETE_UNIFORM_TITLE, {
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
                basketType="uniform_titles"
                HandleElementClick={id => {
                    addToBasket({
                        variables: {
                            BasketId: id,
                            ElementId: selectedItem,
                            ElementType: "uniform_titles"
                        }
                    })
                }} />}
            {
                uniform_titles && uniform_titles.map((row) => (
                    <Grid key={row._id}>
                        <GridElement s={10}>
                            <div className="person-container" >
                                <Icon style={{ margin: "auto", width: "30px", color: "gray" }}>folder</Icon>
                                <div
                                    className="person-name"
                                    onClick={() => {
                                        if (HandleElementClick) HandleElementClick(70, {
                                            id: row._id,
                                            label: row.name
                                        })
                                    }}
                                > {row.name} </div>
                            </div>
                        </GridElement>
                        <GridElement s={2}>
                            {!HandleElementClick && <div style={{ display: "flex" }}>
                                <RoundButton icon="create" size="30"
                                    onClick={(e) => {
                                        Router.push("/admin/authorities/uniform_title/modify/[id]", "/admin/authorities/uniform_title/modify/" + row._id)
                                    }}
                                    style={{ margin: "auto" }} />
                                <RoundButton icon="delete" size="30"
                                    onClick={(e) => {
                                        deleteUniformTitle({
                                            variables: {
                                                Id: row._id
                                            }
                                        })
                                    }}
                                    style={{ margin: "auto" }} />
                                <RoundButton icon="shopping_basket" size="30"
                                    onClick={(e) => {
                                        setSelectedItem(row._id)
                                        setOpen(true)
                                    }}
                                    style={{ margin: "auto" }} />
                            </div>}

                        </GridElement>
                    </Grid>

                ))
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
    .person-name:hover{
        cursor:pointer
    }
    `}
            </style>
        </React.Fragment>
    )
}
export default ListUniformTitleComponent