import React, {useState} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import TextBox from "../../../../../components/ui/TextBox";
import Button from "../../../../../components/ui/Button";
import Card from "../../../../../components/ui/card/card";
import {useLazyQuery} from "@apollo/react-hooks";
import {AllBorrowers} from "../../../../../graphql/queries/admin/Ciruclation/Borrowers.query";
import UpdateBorrower from ".//UpdateBorrower"
import Profiles from "../../../../../components/admin/Circulations/Borrwer/Profiles";
import BorrowersList from "../../../../../components/admin/Circulations/Borrwer/BorrowersList";


/*const onDocHandler = (e) => {
    /!* alert("hello");*!/
    Router.push("/admin/circulation/Circulations/pret_document/allDoc");
}*/


const predoc = (props) => {


    const [getAllBorrowers, {loading, error, data}] = useLazyQuery(AllBorrowers);

    let [filter, setFilter] = useState("");

    const onSearchHandler = (e) => {
        let filterby
        if (filter ===""){
            filterby="*"
        }
        else{
            filterby=filter
        }
        e.preventDefault();
        console.log("filter :", filterby.valueOf())
        getAllBorrowers({
            variables: {
                full_name: filterby,
            }
        })
        ;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error)
        console.log(data)
    }

    console.log("data",data)
    return <div className="container">
        <div className="row">
            <div className="col s12">
                <form>
                    <Card>
                        <h5>Emprunteurs</h5>

                        <div className="row display-flex">
                            <TextBox
                                label="Chercher avec le nom"
                                type="text"
                                onChange={event => {
                                    setFilter(event.target.value),
                                        onSearchHandler
                                }}
                                value={filter}
                            />
                            <Button
                                onClick={onSearchHandler}
                                rounded={4}>Search</Button>
                        </div>
                    </Card>
                </form>
                {

                    data != null || data !== undefined ? <BorrowersList dataSet={data}/> : ""
                }
                {/*<UpdateBorrower/>*/}
            </div>
        </div>
    </div>


}
predoc.Layout = AdminLayout
export default predoc
