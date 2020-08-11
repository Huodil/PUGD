import React from "react";
import MUIDataTable from "mui-datatables";

const DateTable= ({getRecord}) => {
  
  
  if (getRecord==null || getRecord==undefined) return null;
  var monTableau = Object.values(getRecord).map(function(item) {
    return [  item.Title,item.RecYear,item.Redactor,item.NbPages ]   ;
});
const columns = [
  {
   name: "Title",
   label: "Title",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "Date de création",
   label: "Date de création",
   options: {
    filter: true,
    sort: true,
   }
  },
  
  {
   name: "Rédacteur",
   label: "Rédacteur",
   options: {
    filter: true,
    sort: true,
   }
   
  },
  {
    name: "Nomre des pages",
    label: "Nombre des pages",
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
           < MUIDataTable 
  
  data={monTableau} 
  columns={columns} 
  options={options} 
/>
            
                </div>
            </React.Fragment>
  )
}




export default DateTable;
