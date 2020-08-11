import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import { GET_BASKET } from '@/graphql/queries/admin/authorities/basket.queries';
import { useQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';
import Collapsible from '@/components/ui/Collapsible/Collapsible';
import CollapsibleHeader from '@/components/ui/Collapsible/CollapsibleHeader';
import CollapsibleBody from '@/components/ui/Collapsible/CollapsibleBody';
import Table from '@/components/ui/Table/Table';


const SearchBasket = ({ HandleElementClick, open, handleClose, basketType }) => {

    const [baskets, setBaskets] = useState({})

    const { loading, error, data, refetch } = useQuery(
        GET_BASKET,
        {
            onCompleted: (data) => {
                const object = {}
                if (data) {
                    data.basket.forEach(element => {
                        if (element.basket_type === basketType) {
                            if (!object[element.basket_type])
                                object[element.basket_type] = []
                            object[element.basket_type].push(element)
                        }
                    });
                    setBaskets(object);
                }
            },
            onError: err => {
                console.log(err);
            },
        }
    );
    useEffect(() => {
        if (data) refetch().then(({ data }) => {
            const object = {}
            if (data) {
                data.basket.forEach(element => {
                    if (element.basket_type === basketType) {
                        if (!object[element.basket_type])
                            object[element.basket_type] = []
                        object[element.basket_type].push(element)
                    }
                });
                setBaskets(object);
            }
        })
    }, [open])

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className="animate fadeLeft">
                <AuthorityHeader Authority="Paniers Gestion : Selection de panier" />

                {data &&
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
                                                    <td width="33%" onClick={e => { HandleElementClick(basket._id) }}> {basket.basket_name} </td>

                                                    <td width="33%" >{basket.basket_elements.length} elements</td>
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


            </div>


        </Modal>
    );
}
export default SearchBasket