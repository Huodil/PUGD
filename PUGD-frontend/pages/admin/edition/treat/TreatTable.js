import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import Table from "../../../../components/ui/Table/Table";
import Card from "../../../../components/ui/card/card";
import { graphql } from 'graphql';
import { copyFile } from 'fs';
import { useLazyQuery } from 'react-apollo';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const TreatTable= ({getReservation}) => {
  if (getReservation==null || getReservation==undefined) return null;
  //Object.keys(peopleObj).map(i => peopleObj[i])
  //const data= Object.keys(getdelay).map(i => getdelay[i])
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTableRow: {
        root: {
          '&$selected': {
            backgroundColor: "#ffff#"
          }
        }
      },
      MUIDataTableSelectCell: {
        root: {
          display: 'none'
        }
      },
      MUIDataTableToolbarSelect: {
        title: {
          display: 'none'
        }
      }
    }
  })
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
//const columns = ["Date de reservation", "nom d'emparanteur", "Code bare  d'exemplaire"];
 
 
const options = {
  
  filterType: 'checkbox',
  //textLabels: this.context.translation.dataTables.textLabels,
  selectableRows: true ,// <===== will turn off checkboxes in rows*
  //hasIndex: true /* <-- use numbers for rows*/,
 // customAction: action /* <-- use action button for row */,
  searchBox: true /* <-- search true or false */,
  csv: true /* <-- csv download true or false */,
  //pdf: true,
  indexColumn:
    "fname" /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */,
  printButton: true,
  //selectableRowsOnClick:true,
  //serverSide:true,
 // selectableRowsHideCheckboxes:true,
};
 

  
  return (
    <React.Fragment>
            <div className="col s12">
            <MuiThemeProvider theme={getMuiTheme()}> 
            <MUIDataTable 

  data={monTableau} 
  columns={columns} 
  options={options} 
/>
</MuiThemeProvider>               


</div>
            </React.Fragment>
  )
}


export default TreatTable;
