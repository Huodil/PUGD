import React from "react";
import MUIDataTable from "mui-datatables";
const TableLoans= ({getloans}) => {
  if (getloans==null || getloans==undefined) return null;
  var monTableau = Object.values(getloans).map(function(item) {
    return [ item.Dateretour,item.Borrower.fullname,item.Copy.BareCode,item.Copy.Record.title,item.Date_Loans]   ;
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
    name: "date de prét",
    label: "date de prét",
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
  title={"Employee List"} 
  data={monTableau} 
  columns={columns} 
  options={options} 
/>
                
            </div>
            </React.Fragment>
  )
}


export default TableLoans;
