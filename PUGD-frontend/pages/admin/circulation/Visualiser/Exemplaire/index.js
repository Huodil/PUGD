import React, {useState} from 'react'
import AdminLayout from '@/components/adminLayout'
import TextBox from "@/components/ui/TextBox";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/card";
import {useLazyQuery} from "@apollo/react-hooks";
import {EXAMPLAIR_BY_CODE} from "graphql/queries/admin/Ciruclation/Examplaire.query";
import Examplaire from "./Examplaire";
import {FIND_COPY} from "../../../../../graphql/queries/admin/Ciruclation/Examplaire.query";


const visual = () => {
    const NO_Examplair = <span style={{color:'#d60e28'}}>No data is finder</span>;



    const [GetExamplaireByCodeBar, { loading, error, data }] = useLazyQuery(FIND_COPY);

    const [codBar, setCodeBar] = useState('');

    if (loading) {return <div>Loading...</div>;}

    if(error){
        console.log(error)
        console.log(data)
    }
    const onSearchHandler = (e) => {
        e.preventDefault();
        GetExamplaireByCodeBar({
            variables: {
                code: codBar,
            }
        });
    }

    if(data != null || data !== undefined){
        console.log("copies",data.GetExamplaireByCodeBar)
    }
    return <div className="container">
                <div className="row">
                    <div className="col s12">
                        <form>
                            <Card >
                                <h5>Examplaire</h5>
                                <span>Recherche un ListNotice</span>
                                <div className="row display-flex">
                                    <TextBox
                                        label="Code Bar ListNotice"
                                        type="text"
                                        onChange={event => { setCodeBar(event.target.value) }}
                                        value={codBar}
                                    />
                                    <Button
                                        onClick={onSearchHandler}
                                        rounded={4}>Search</Button>

                                </div>
                            </Card>
                        </form>
                        {  data != null || data !== undefined ?
                            <Examplaire dataSet = {data.GetExamplaireByCodeBar}/>
                            : NO_Examplair }

                    </div>
                </div>
    </div>
}
visual.Layout = AdminLayout
export default visual
