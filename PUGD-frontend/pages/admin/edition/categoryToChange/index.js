import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import MenuItem from '@material-ui/core/MenuItem';
import {GET_All_CATEGORIES} from "../../../../graphql/queries/admin/Reporting/CategoriesBorrower.queries";
import Card from "../../../../components/ui/card/card";
import {GET_CAT_BORROWERS} from "../../../../graphql/queries/admin/Reporting/borrowers.queries"
import AdminLayout from "../../../../components/adminLayout";
import Button from "../../../../components/ui/Button";
import TableBorrower from "./TableBorrowercat";
import ReportingHeader from "../../../../components/admin/reporting/header/reportingHeader"
import Reporting from "../../../../components/admin/reporting/body/body"
import SelectBox from '../../../../components/ui/SelectBox';
const CatToChange = () => {
    const [categories, setcategories] = useState("") 
     

      const { loading, error, data } = useQuery(GET_All_CATEGORIES)
     
      const { loading1, error1, datai } = useQuery(GET_CAT_BORROWERS, {
        variables: { Category:categories },
      });
      if (loading) return "Loading...";
     
      if (error) return `Error! ${error.message}`;
      //if (error) return `Error! ${error.message}`;
      return (    <Reporting>
        <ReportingHeader ReportingModule="CustomReports" />        
        <div className="col s12">
        <form>
                        <Card>
                            <div className="row">
                                <div className="card-header">
                                    <h4 className="card-title">List des articles par le type de contenu</h4>
                                </div>
                               
                                 {error ? <div l color="danger">{String(error)}   test</div> : null}
                  
               {data == null? (
                null
              ) : (
                <SelectBox
                                  label="Type catégories"
                                  name="catégories"
                                  value={categories}
                                  onChange={event => { setcategories(event.target.value) }}
                              > 
                            { 
                                data.GetAllCategoriesBorrowers.map((item) => (
                                 
                        <option >{item.namecategoriesbrrowers}</option>
                       
                                ))}
                                </SelectBox>
                                )}
                   
                            </div>
                        </Card>
                    </form>
                    {error ? <div l color="danger">{String(error)}   test</div> : null}
                        {datai == null ? (
                    null
                  ) : (
                    <div>
                    <div>hhhhhh</div>
                       <TableBorrower  getborrower={datai.GetBorrowersCategory} ></TableBorrower>
                       </div>
                   ) }
            </div>  
            </Reporting>
      );
    };
    CatToChange.Layout = AdminLayout;
    export default CatToChange;