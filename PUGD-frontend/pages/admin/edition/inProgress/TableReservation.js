import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import Table from "../../../../components/ui/Table/Table";
import Card from "../../../../components/ui/card/card";
import { graphql } from 'graphql';
import { copyFile } from 'fs';
import { useLazyQuery } from 'react-apollo';
const ReservationTable= ({getReservation}) => {
  
  

  if (getReservation==null || getReservation==undefined) return null;
  //Object.keys(peopleObj).map(i => peopleObj[i])
  //const data= Object.keys(getdelay).map(i => getdelay[i])
  
  var monTableau = Object.values(getReservation).map(function(item) {
    return [ item.dateres,item.Borrower.first_name,item.Record.Title,item.Rank];
});
  
const columns = [
  {
   name: "Date de reservation",
   label: "Date de reservation",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "nom d'emparanteur",
   label: "nom d'emparanteur",
   options: {
    filter: true,
    sort: true,
   }
  },
  
  
  {
    name: "Titre d'eemplaire",
    label: "Titre d'exemplaire",
    options: {
     filter: true,
     sort: true,
    }
    
   },
   {
    name: "le rang",
    label: "La rang",
    options: {
     filter: true,
     sort: true,
    }
    
   },
 ];
 const options = {
  hasIndex: true /* <-- use numbers for rows*/,
 // customAction: action /* <-- use action button for row */,
  searchBox: true /* <-- search true or false */,
  csv: true /* <-- csv download true or false */,
  pdf: true,
  indexColumn:
    "fname" /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */,
  printButton: true,
  filterType: 'checkbox',
};
  return (
    <React.Fragment>
            <div className="col s12">
            
            
            <MUIDataTable 
  
  data={monTableau} 
  columns={columns} 
  options={options} 
/>
                
            </div>
            </React.Fragment>
  )
}


export default ReservationTable;
