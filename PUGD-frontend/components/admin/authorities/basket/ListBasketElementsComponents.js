/* eslint-disable react/display-name */
import React from 'react'
import { TAG_ELEMENT_IN_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import { useMutation } from 'react-apollo';
import MaterialTable from "material-table-formik";
import { REMOVE_FROM_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
const ListBasketElementComponent = ({ basketId, basketElements, refetch }) => {
    const [tagBasketElement] = useMutation(TAG_ELEMENT_IN_BASKET, {
        onCompleted: () => {
            refetch && refetch()
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    const updateTag = (rowData, Tag) => {
        tagBasketElement({
            variables: {
                BasketId: basketId,
                ElementId: rowData.element._id,
                Tag
            }
        })
    }
    const [deleteFromBasket] = useMutation(REMOVE_FROM_BASKET, {
        onCompleted: () => {
            refetch && refetch()
            alert("deleted, done !!!!!");
        },
        onError: (error) => {
            alert(error.message);
        }
    });


    return (
        <React.Fragment>
            <MaterialTable
                options={
                    {
                        toolbar: false
                    }
                }
                columns={[
                    { title: 'Basket Element', field: 'element.name' },
                    {
                        title: 'Tagged',
                        cellStyle: { textAlign: "center" },
                        headerStyle: { textAlign: "center" },
                        render: rowData => { 
                            return <React.Fragment>
                                {rowData.element !== null && <label>
                                    <input className="with-gap" name={"check" + rowData.element._id} type="checkbox"
                                        checked={rowData.tag}
                                        onChange={(e) => {
                                            updateTag(rowData, e.target.checked)
                                        }} />
                                    <span></span>
                                </label>}
                            </React.Fragment>
                        }
                    },
                    {
                        title: '',
                        cellStyle: { textAlign: "center" },
                        headerStyle: { textAlign: "center" },
                        render: rowData => {
                            return <React.Fragment>
                                <RoundButton icon="delete_forever" size="30"
                                    // onClick={(e) => {
                                    //     OnAuthorityLinkChange(index, undefined)
                                    // }}
                                    onClick={(e) => {
                                        deleteFromBasket({
                                            variables: {
                                                BasketId: basketId,
                                                ElementId: rowData.element._id
                                            }
                                        })
                                    }}
                                    style={{ margin: "auto" }} />
                            </React.Fragment>
                        }
                    },
                ]}
                // data={Data}
                data={basketElements.filter(elementObject => {
                    return (elementObject.element !== null)
                })}
                title="Mots trouvés sous la clé"
            />
        </React.Fragment>
    )
}
export default ListBasketElementComponent