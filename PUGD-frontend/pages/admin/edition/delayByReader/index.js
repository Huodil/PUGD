import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import MenuItem from '@material-ui/core/MenuItem';
import {GET_delays_By_Categories} from "../../../../graphql/queries/admin/Reporting/loans.queries"
import Card from "../../../../components/ui/card/card";
import AdminLayout from "../../../../components/adminLayout";
import Button from "../../../../components/ui/Button";
import Tabledelaygroup from "./delaybygroup";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import SelectBox from '../../../../components/ui/SelectBox';
const delayByReader = () => {
    const [categories, setcategories] = useState("") 
      function splitfunction(e) {
        return e
          .split("(")[1]
          .split(")")[0]
          .replace(/^"(.*)"$/, "$1");
      }
      const { loading, error, data } = useQuery(GET_delays_By_Categories, {
        variables: { CategoriesBorrower:categories },
      });
      //if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" />      
        <Card> <h>Prêts : Retards par lecteur</h></Card>  
        <div className="col s12">
                  <form>
                        <Card>
                            <div className="row">
                                <div className="card-header">
                                    <h4 className="card-title">List des articles par le type de contenu</h4>
                                </div>
                                <SelectBox
                        label="Type catégories des lecteurs"
                        name="catégories"
                        value={categories}
                        onChange={event => { setcategories(event.target.value) }}
                    >
                        <option >All</option>
                        <option >Collectivité</option>
                        <option  >Individuel gratuit</option>
                        <option >Individuel payant</option>
                        <option >Personnel</option>
                    </SelectBox>
                            </div>
                        </Card>
                    </form>
                        {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {data == null ? (
                    null
                  ) : (
                       <Tabledelaygroup  getdelay={data.Getdelaybyborrower} ></Tabledelaygroup>
                   ) }
            </div>  
            </Reporting>
      );
    };
    delayByReader.Layout = AdminLayout;
    export default delayByReader;