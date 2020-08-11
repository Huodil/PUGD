import React, { useState } from 'react';
import AdminLayout from '@/components/adminLayout';
import { GET_BASKET } from '@/graphql/queries/admin/authorities/basket.queries';
import { REMOVE_FROM_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Card from '@/components/ui/Card/Card';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import Table from '@/components/ui/Table/Table';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import { useRouter } from 'next/router';
import ListBasketElementComponent from '../../../../../components/admin/authorities/basket/ListBasketElementsComponents';


// const BasketPage = ({ basket }) => {
const BasketPage = () => {
    const Router = useRouter()
    const { loading, error, data, refetch } = useQuery(
        GET_BASKET,
        {
            variables: {
                Basket: {
                    _id: Router.query.id
                }
            },
        });
console.log(data);

    return (


        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Paniers Gestion : Gestion des paniers" />
            {data && data.basket && data.basket.length > 0 &&
                <React.Fragment>
                    <Card  >
                        <Table
                            Thead={
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                </tr>
                            }
                            Tbody={
                                <tr>
                                    <td>Ce panier contient</td>
                                    <td>{data.basket[0].basket_elements.length}</td>
                                </tr>
                            }
                        />
                    </Card>

                    <Card  >
                        <ListBasketElementComponent
                            basketElements={data.basket[0].basket_elements}
                            basketId={data.basket[0]._id}
                            refetch={refetch}
                        />
                        {/* <Table
                            Tbody={
                                data.basket[0].basket_elements.map((basket_element, index) => {
                                    console.log(index);
                                    if(basket_element.element !== null)
                                    return <tr key={index}>
                                        <td> </td>
                                        <td>{basket_element.element.name}</td>
                                        <td>
                                            <RoundButton icon="delete_forever" size="30"
                                                // onClick={(e) => {
                                                //     OnAuthorityLinkChange(index, undefined)
                                                // }}
                                                onClick={(e) => {
                                                    deleteFromBasket({
                                                        variables: {
                                                            BasketId:data.basket[0]._id,
                                                            ElementId: basket_element.element._id
                                                        }
                                                    })
                                                }}
                                                style={{ margin: "auto" }} /></td>

                                    </tr>
                                })
                            }
                        /> */}
                    </Card>
                </React.Fragment>

            }

        </div>
    );
};


BasketPage.Layout = AdminLayout

export default BasketPage 
