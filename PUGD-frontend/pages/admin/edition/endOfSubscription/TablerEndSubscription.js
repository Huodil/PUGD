import React from "react"
import MUIDataTable from "mui-datatables";
const TableBorrower= ({getborrower}) => {
  if (getborrower==null || getborrower==undefined) return null;
  var monTableau = Object.values(getborrower).map(function(item) {
    return [ item.bar_code,item.last_name,item.first_name,item.address,item.membershipcanceled,item.status]   ;
});

const columns = [
  {
   name: "Code bare ",
   label: "Code bare",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "Prenom",
   label: "Prenom",
   options: {
    filter: true,
    sort: true,
   }
  },
  
  {
   name: "Nom",
   label: "Nom",
   options: {
    filter: true,
    sort: true,
   }
   
  },
  {
    name: "adresse",
    label: "Adresse",
    options: {
     filter: true,
     sort: true,
    }
    
   },
  
   {
    name: "Date d'expiration",
    label: "Date d'expiration",
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
    name: "Status",
    label: "Status",
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


export default TableBorrower;
