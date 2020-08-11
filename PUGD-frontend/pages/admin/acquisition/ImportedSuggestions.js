import React, { useState, useMemo } from "react";
import Select from "react-select";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { GetSuggestions } from "@/graphql/queries/acquisition/suggestion";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import MaterialTable from "material-table-formik";
import Container from "@/components/ui/Container";
import ButtonS from "@/components/ui/ButtonSubmit";
import AdminLayout from "@/components/adminLayout";
import Router from "next/router";
import {
  InsertSuggestion,
  UpdateSuggestion,
  DeleteSuggestion,
} from "@/graphql/mutations/acquisition/suggestion";

const ImportedSuggestion = () => {
  const splitfunction = (e) =>
    e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  const [suggestions, setSuggestions] = useState([]);

  const [insertsuggestion] = useMutation(InsertSuggestion, {
    onCompleted: () => {
      window.alert(`Suggestion inserted !!`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const [UpdateSugg] = useMutation(UpdateSuggestion, {
    onError: (error) => {
      alert(error.message);
    },
  });

  const [deletesuggestion] = useMutation(DeleteSuggestion, {
    onError: (error) => {
      alert(error.message);
    },
  });

  const { loading, error, data: suggestions_line } = useQuery(GetSuggestions, {
    variables: { flag: "new" },
  });
  useMemo(() => {
    if (suggestions_line && suggestions_line.getsuggestions) {
      setSuggestions(suggestions_line.getsuggestions);
    }
  }, [suggestions_line]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div style={{ width: "100%", marginTop: "40px" }}>
        <MaterialTable
          columns={[
            { title: "Isbn", field: "isbn" },
            {
              title: "title",
              field: "title",
            },
            {
              title: "author",
              field: "author",
            },
            {
              title: "quantity",
              field: "quantity",
              type: "numeric",
            },
            {
              title: "price",
              field: "price",
              type: "numeric",
            },
            {
              title: "date publication",
              field: "datepublication",
            },
            { title: "comments", field: "comments" },
            { title: "source", field: "source" },
          ]}
          data={suggestions}
          title="Imported Suggestions"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  setSuggestions(() => {
                    newData.flag = "new";
                    const sugg_line = [...suggestions, newData];
                    return sugg_line;
                  });
                  resolve();
                }, 1000);
              }).then(() => {
                insertsuggestion({
                  variables: newData,
                });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  setSuggestions(() => {
                    const sugg_line = [
                      ...suggestions.filter((x) => x !== oldData),
                      newData,
                    ];
                    return sugg_line;
                  });
                  resolve();
                }, 1000);
              }).then(() => {
                UpdateSugg({
                  variables: {
                    _id: splitfunction(newData._id),
                    isbn: newData.isbn,
                    title: newData.title,
                    author: newData.author,
                    quantity: newData.quantity,
                    price: newData.price,
                  },
                });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  setSuggestions(() => {
                    const sugg_line = [
                      ...suggestions.filter((x) => x !== oldData),
                    ];
                    return sugg_line;
                  });
                  resolve();
                }, 1000);
              }).then(() => {
                var a = splitfunction(oldData._id);
                deletesuggestion({
                  variables: { _id: a },
                });
              }),
          }}
        />
        <br></br>
        <button
          className="SubmitButton"
          onClick={() => {
            for (var i = 0; i < suggestions.length; i++) {
              UpdateSugg({
                variables: {
                  _id: splitfunction(suggestions[i]._id),
                  flag: "saved",
                },
              });
            }
            Router.push("/admin/acquisition/AllSuggestions");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

ImportedSuggestion.Layout = AdminLayout;

export default ImportedSuggestion;
