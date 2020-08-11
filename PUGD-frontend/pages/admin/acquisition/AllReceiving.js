/* eslint-disable react/jsx-key */
import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";
import { GetOrdersCours } from "@/graphql/queries/acquisition/order";
import { DeleteProvider } from "@/graphql/mutations/acquisition/provider";
import CardTitle from "@/components/ui/card/cardTitle";
import Card from "@/components/ui/card/card";
import AdminLayout from "@/components/adminLayout";
import Button from "@/components/ui/Button";
const AllReceiving = () => {
  const [
    deleteProvider,
    { loading: deleting, error: deleteError },
  ] = useMutation(DeleteProvider);

  function splitfunction(e) {
    return e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  }

  const { loading, error, data } = useQuery(GetOrdersCours, {
    variables: { type: "order", status: "pending" },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <CardTitle>
            {" "}
            <h5>Purchase Management : Receiving</h5>
          </CardTitle>
          <Card>
            <div className="col s12">
              {data == null ? (
                nul
              ) : (
                <Table
                  Thead={
                    <tr>
                      <th>Order Name</th>
                      <th>Provider</th>
                      <th>Date Order</th>
                      <th>State</th>
                      <th>Actions</th>
                    </tr>
                  }
                  Tbody={
                    <tbody>
                      {data.getOrders.map((item) => (
                        <tr>
                          <td>
                            <span className="chip lighten-5 red red-text">
                              {item.name}
                            </span>
                          </td>
                          <td>{item.provider}</td>
                          <td>{item.date}</td>
                          <td>{item.status}</td>

                          <td>
                            <div className="invoice-action">
                              <a
                                href={`/admin/acquisition/Receiving?id=${splitfunction(
                                  item._id
                                )}`}
                                className="invoice-action-edit"
                              >
                                <i className="material-icons">eject</i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  }
                />
              )}
            </div>
            <Button href="/admin/acquisition/AddProvider" rounded={2}>
              New
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

AllReceiving.Layout = AdminLayout;
export default AllReceiving;
