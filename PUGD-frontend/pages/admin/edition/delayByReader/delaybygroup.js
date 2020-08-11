import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import Table from "../../../../components/ui/Table/Table";
import Card from "../../../../components/ui/card/card";
import { graphql } from 'graphql';
import { copyFile } from 'fs';
const Tabledelaygroup= ({getdelay}) => {
  if (getdelay==null || getdelay==undefined) return null;
  //Object.keys(peopleObj).map(i => peopleObj[i])
  //const data= Object.keys(getdelay).map(i => getdelay[i])
  
  var monTableau = Object.values(getdelay).map(function(item) {
    return [ item.DateRetour,item.DatePret,item.Borrower.first_name,item.Copy.BareCode,item.Copy.Record.Title,item.Retour]    ;
});
  
const columns = [
  {
   name: "Date de Retour",
   label: "Date de Retour",
   options: {
    filter: true,
    sort: true,
   }
  },
  
  {
    name: "date de prét",
    label: "date de prét",
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
   name: "Code bare  d'exemplaire",
   label: "Code bare  d'exemplaire",
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
    name: "Retour",
    label: "Retour",
    options: {
     filter: true,
     sort: true,
    }
    
   },
 ];

  const options = {
    hasIndex: true, /* <-- use numbers for rows*/
    searchBox: true, /* <-- search true or false */
    csv: true, /* <-- csv download true or false */
    indexColumn: "fname" /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */
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


export default Tabledelaygroup;
