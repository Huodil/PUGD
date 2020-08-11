import React from 'react'
import Card from "@/components/ui/card/card";
import TextBox from "@/components/ui/TextBox";
import Button from "@/components/ui/Button";
import AdminLayout from "@/components/adminLayout";


const period = () => {

    return (<div className="container">
                <div className="row">
                    <div className="col s12">
                        <Card>
                            <h5>Circulation des périodiques</h5>
                            <span>Gestion de la circulation</span>
                            <div className="row">
                                <TextBox label={"Code barre du document"}/>
                                <Button rounded={2}>Search</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>)
}
period.Layout = AdminLayout
export default period




//serialcirc
