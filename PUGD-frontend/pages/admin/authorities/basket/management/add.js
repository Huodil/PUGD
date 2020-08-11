import React from 'react';
import AdminLayout from '@/components/adminLayout';

import { INSERT_BASKET } from '@/graphql/mutations/admin/authorities/basket.mutations';
import { useMutation } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';

import Router from 'next/router';
import AddBasketForm from '@/components/admin/authorities/basket/AddBasketForm';
import Card from '@/components/ui/Card/Card';


const AuthorPage = () => {

    const [insertBasket] = useMutation(INSERT_BASKET, {
        onCompleted: () => {
            Router.push("/admin/authorities/basket/management")

        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const onAddHandler = (
        BasketName,
        BasketNote,
        BasketType,
        BasketColor,
        BasketElements,) => {

            const typeLabels = {
                1:"mixte",
                2:"author",
                3:"category",
                4:"publisher",
                5:"series",
                6:"sub_series",
                7:"collection_title",
                8:"uniform_titles",
                9:"class_number",

            }
        insertBasket({
            variables: {
                Basket: {
                    basket_name: BasketName,
                    basket_note: BasketNote,
                    basket_type:  typeLabels[BasketType],
                    basket_color: BasketColor,
                    basket_elements: BasketElements
                }
            }
        });
    }

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Authors" />
            <Card  >
                <h4 >Ajouter un panier</h4>
                <AddBasketForm onAddHandler={onAddHandler} />
                <br /><br />
            </Card>
        </div>
    );
};


AuthorPage.Layout = AdminLayout

export default AuthorPage;
