import React from "react";
import MaterialTable from "material-table-formik";
import {RowLabels} from "./DataTable/RowLables";
import { useRouter} from "next/router";

const ListGroupsComponent = ({Groupes, ...props}) => {
    const Router = useRouter()
    /*const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
        onCompleted: () => {
            updateCache()
        },
        onError: (error) => {
            alert(error.message);
        }
    });*/

    /*const [addToBasket] = useMutation(ADD_TO_BASKET, {
        onCompleted: () => {
            updateCache()
            setOpen(false)
        },
        onError: (error) => {
            alert(error.message);
        }
    });*/
    // State of the modal
    /* const [open, setOpen] = React.useState(false);
     const [selectedItem, setSelectedItem] = React.useState(0);

     const handleClose = () => {
         setOpen(false);
     };*/

    console.log("dataGroups com :", Groupes)
    return (
        <React.Fragment>
            {/*<Table  Thead={
               <tr>
                   <td></td>
                   <td>name Group</td>
                   <td>Responsable</td>
                   <td>Nombre de Member</td>
                   <td>Pret encour</td>
                   <td>Reservation encour</td>
                   <td>Action</td>
               </tr>
           } Tbody={
               Groupes.map(item => {
                   return <tr>item._id</tr>
               })

           }/>*/}

            <MaterialTable minRows={3}
                           options={
                               {
                                   toolbar: false,
                                   paging: true
                               }
                           }

                           onRowClick={(event, rowData) => {
                               console.log(rowData._id);
                               Router.push({
                                   pathname: '/admin/circulation/Circulation/Borrowers/DetailsBorrower',
                                   query: {id:rowData._id}
                               })
                           }}
                           columns={[
                               {
                                   title: 'Name Groupes',
                                   render: rowData => RowLabels(rowData.group,
                                       "", "group")

                               }, {
                                   title: 'Responsable',
                                   render: rowData => RowLabels(rowData.responsable.frist_name,
                                       rowData.responsable.last_name, "persone")
                               }, {
                                   title: 'Emprunteur',
                                   render: rowData => RowLabels(rowData.membersCount)
                               }, {
                                   title: 'Reservations',
                                   render: rowData => RowLabels(rowData.currentReservation)
                               }, {
                                   title: 'prets',
                                   render: rowData => RowLabels(rowData.currentLoan)
                               },
                               {
                                   title: '',
                                   cellStyle: {textAlign: "center"},

                                   /*render: rowData => {
                                       return !HandleElementClick && <React.Fragment>
                                           <RoundButton icon="create" size="30"
                                                        onClick={(e) => {
                                                            Router.push("/admin/authorities/author/modify/[id]", "/admin/authorities/author/modify/" + rowData._id)
                                                        }} />
                                           <RoundButton icon="delete" size="30"
                                                        onClick={(e) => {
                                                            deleteAuthor({
                                                                variables: {
                                                                    Id: rowData._id
                                                                }
                                                            })
                                                        }} />
                                           <RoundButton icon="shopping_basket" size="30"
                                                        onClick={(e) => {
                                                            setSelectedItem(rowData._id)
                                                            setOpen(true)
                                                        }} />
                                       </React.Fragment> || null
                                   }*/
                               },
                           ]}
                           data={Groupes}
                           title="Mots trouvés sous la clé"
            />

        </React.Fragment>
    )
}
export default ListGroupsComponent