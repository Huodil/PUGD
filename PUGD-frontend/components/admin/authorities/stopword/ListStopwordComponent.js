/* eslint-disable react/display-name */
import React from 'react'
import { UPDATE_STOPWORD } from '@/graphql/mutations/admin/authorities/stopword.mutations';
import { useMutation } from 'react-apollo';
import MaterialTable from "material-table-formik";
const ListStopwordComponent = ({ stopwords, refetch }) => {
    const [updateStopword] = useMutation(UPDATE_STOPWORD, {
        onCompleted: () => {
            refetch()
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    const updateType = (rowData, type) => {
        updateStopword({
            variables: {
                Id: rowData._id,
                Word: rowData.word,
                Type: type,
            }
        })
    }

    return (
        <React.Fragment>
            <MaterialTable
                options={
                    {
                        toolbar: false
                    }
                }
                columns={[
                    { title: 'LA RECHERCHE DE', field: 'word' },
                    {
                        title: 'MOT VIDE CALCULÉ',
                        cellStyle: {
                            textAlign: "center",
                        },
                        headerStyle: {
                            textAlign: "center",
                        },
                        render: rowData => {
                            return <React.Fragment>
                                <label>
                                    <input className="with-gap"
                                        name={"radio" + rowData._id}
                                        type="radio"
                                        checked={rowData.type === 1}
                                        onChange={(e) => {
                                            updateType(rowData, 1)
                                        }}
                                    />
                                    <span></span>
                                </label>
                            </React.Fragment>
                        }
                    },
                    // { title: 'Soyadı', field: 'surname' },
                    {
                        title: 'MOT VIDE SAISI',
                        cellStyle: { textAlign: "center" },
                        headerStyle: { textAlign: "center" },
                        render: rowData => {
                            return <React.Fragment>
                                <label>
                                    <input className="with-gap" name={"radio" + rowData._id} type="radio"
                                        checked={rowData.type === 2}
                                        onChange={(e) => {
                                            updateType(rowData, 2)
                                        }} />
                                    <span></span>
                                </label>
                            </React.Fragment>
                        }
                    },
                    {
                        title: 'MOT NON VIDE',
                        cellStyle: { textAlign: "center" },
                        headerStyle: { textAlign: "center" },
                        render: rowData => {
                            return <React.Fragment>
                                <label>
                                    <input className="with-gap" name={"radio" + rowData._id} type="radio" checked={rowData.type === 3}

                                        onChange={(e) => {
                                            updateType(rowData, 3)
                                        }} />
                                    <span></span>
                                </label>
                            </React.Fragment>
                        }
                    },
                ]}
                // data={Data}
                data={stopwords}
                title="Mots trouvés sous la clé"
            />
        </React.Fragment>
    )
}
export default ListStopwordComponent