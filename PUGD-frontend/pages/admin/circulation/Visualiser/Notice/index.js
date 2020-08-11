import React, {useState} from 'react'
import AdminLayout from '@/components/adminLayout'
import TextBox from "@/components/ui/TextBox";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/card";
import {useLazyQuery} from "@apollo/react-hooks";
import {EXAMPLAIR_BY_CODE} from "@/graphql/queries/admin/Ciruclation/Examplaire.query";
import ListNotice from "./ListNotice";


const notice = () => {

    const nul = <span style={{color:'#d60e28'}}>No document finder with id : </span>;

    const [GetExamplaireByCodeBar, { loading, error, data }] = useLazyQuery(EXAMPLAIR_BY_CODE);

    const [ISBN, setISBN] = useState('');

    if (loading) {return <div>Loading...</div>;}

    if(error){
        console.log(error)
        console.log(data)
    }
    const onSearchHandler = (e) => {
        e.preventDefault();
        GetExamplaireByCodeBar({
            variables: {

                isbn: ISBN,
            }
        });
    }

    if(data != null || data !== undefined){
        console.log(data.GetExamplaireByCodeBar)
    }
    return <div className="container">
                <div className="row">
                    <div className="col s12">
                        <form>
                            <Card >
                                <h5>Notice </h5>
                                <span>Recherche un ListNotice</span>
                                <div className="row display-flex">
                                    <TextBox
                                        label="Code Bar Notice"
                                        type="text"
                                        onChange={event => { setISBN(event.target.value) }}
                                        value={ISBN}
                                    />
                                    <Button
                                        onClick={onSearchHandler}
                                        rounded={4}>Search</Button>
                                </div>
                            </Card>
                        </form>
                        {  data != null || data !== undefined ?
                            <ListNotice data = {data.GetExamplaireByCodeBar}/>
                            : <p>false</p> }

                    </div>
                </div>
            </div>
}
notice.Layout = AdminLayout
export default notice
