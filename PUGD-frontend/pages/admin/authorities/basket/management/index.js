import React, { useState } from 'react';
import AdminLayout from '@/components/adminLayout';
import { GET_BASKET } from '@/graphql/queries/admin/authorities/basket.queries';
import { useQuery } from '@apollo/react-hooks';

import ListBasketComponent from '@/components/admin/authorities/basket/ListBasketComponent';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import Card from '@/components/ui/Card/Card';
import Collapsible from '@/components/ui/Collapsible/Collapsible';
import CollapsibleHeader from '@/components/ui/Collapsible/CollapsibleHeader';
import CollapsibleBody from '@/components/ui/Collapsible/CollapsibleBody';
import Table from '@/components/ui/Table/Table';
import { Button } from 'reactstrap';
import Link from 'next/link';

const AuthorPage = () => {
    const [baskets, setBaskets] = useState({})

    const { loading, error, data } = useQuery(
        GET_BASKET,
        {
            // variables: {
            //     Basket: {
            //         basket_name: "test"
            //     }
            // },
            onCompleted: (data) => {

                const object = {}
                data.basket.forEach(element => {
                    if (!object[element.basket_type])
                        object[element.basket_type] = []
                    object[element.basket_type].push(element)
                });
                setBaskets(object);
            }
        });

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="Paniers Gestion : Gestion des paniers" />

            {error ? <div color="danger">{String(error)}</div> : null}
            {data &&
                <ListBasketComponent Baskets={data.basket} />
            }


            <Card  >
                {
                    Object.keys(baskets).map((basketType) => {
                        return <Collapsible key={basketType}  >
                            <li>
                                <CollapsibleHeader headerHeight="">
                                    Panier : {basketType}
                                </CollapsibleHeader>
                                <CollapsibleBody>
                                    {baskets[basketType] && baskets[basketType].map((basket) => {
                                        return <Table key={basket._id}
                                            Tbody={
                                                <tr >
                                                    <td width="33%"> 
                                                    <Link href="/admin/authorities/basket/management/[id]"
                                                    as={"/admin/authorities/basket/management/"+basket._id}>
                                                    <a>
                                                    {basket.basket_name}
                                                    </a>
                                                    </Link>
                                                     </td>

                                                    <td width="33%">{basket.basket_elements.length} elements</td>
                                                    <td width="33%">
                                                        <div style={{ backgroundColor: basket.basket_color, width: "50px", height: "20px" }}>

                                                        </div>
                                                    </td>

                                                </tr>
                                            }
                                        />

                                    })
                                    }
                                </CollapsibleBody>
                            </li >
                        </Collapsible >
                    })
                }
                <Link href="/admin/authorities/basket/management/add">
                    <Button >Ajouter un panier</Button>
                </Link>
            </Card>

        </div>
    );
};


AuthorPage.Layout = AdminLayout

// export default withApollo({ ssr: true })(AuthorPage);
export default AuthorPage;