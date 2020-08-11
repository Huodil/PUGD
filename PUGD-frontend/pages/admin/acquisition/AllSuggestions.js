import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";
import { GetSuggestions } from "@/graphql/queries/acquisition/suggestion";
import CardTitle from "@/components/ui/card/cardTitle";
import Card from "@/components/ui/card/card";
import AdminLayout from "@/components/adminLayout";
import Button from "@/components/ui/Button";
const AllSuggestions = () => {
  function splitfunction(e) {
    return e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  }

  const { loading, error, data } = useQuery(GetSuggestions, {
    variables: { flag: "saved" },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <CardTitle>
            {" "}
            <h5>All Suggestions</h5>
          </CardTitle>

          <Card>
            <div className="container">
              {data == null ? (
                nul
              ) : (
                <Table
                  Thead={
                    <tr>
                      <th>Isbn</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Quantity</th>

                      <th>Source</th>
                    </tr>
                  }
                  Tbody={
                    <tbody>
                      {data.getsuggestions.map((item) => (
                        <tr>
                          <td>
                            <span className="chip lighten-5 red red-text">
                              {item.isbn}
                            </span>
                          </td>

                          <td>{item.title}</td>
                          <td>{item.author}</td>
                          <td>{item.quantity}</td>

                          <td>{item.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  }
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

AllSuggestions.Layout = AdminLayout;
export default AllSuggestions;
