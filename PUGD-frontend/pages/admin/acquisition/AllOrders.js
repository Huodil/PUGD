import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";
import { GetOrders } from "@/graphql/queries/acquisition/order";
import CardTitle from "@/components/ui/card/cardTitle";
import Card from "@/components/ui/card/card";
import AdminLayout from "@/components/adminLayout";
import Button from "@/components/ui/Button";

const AllOrders = () => {
  function splitfunction(e) {
    return e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  }

  const { loading, error, data } = useQuery(GetOrders, {
    variables: { type: "order" },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <CardTitle>
            <h5>Purchase Management : Orders</h5>
          </CardTitle>
          <Card>
            <div className="col s12">
              {data == null ? (
                nul
              ) : (
                <Table
                  Thead={
                    <tr>
                      <th>Establishement</th>
                      <th>Provider</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  }
                  Tbody={
                    <tbody>
                      {data.getOrders.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                          <td>
                            <span className="chip lighten-5 red red-text">
                              {item.establishement}
                            </span>
                          </td>
                          <td>{item.provider}</td>
                          <td>{item.date}</td>
                          <td>{item.status}</td>

                          <td>
                            <div className="invoice-action">
                              <a href="#" className="invoice-action-view mr-4">
                                <i className="material-icons">delete</i>
                              </a>
                              <a
                                href={`/admin/acquisition/UpdateOrders?id=${splitfunction(
                                  item._id
                                )}`}
                                className="invoice-action-edit"
                              >
                                <i className="material-icons">edit</i>
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
            <Button href="/admin/acquisition/AddOrder" rounded={2}>
              New
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

AllOrders.Layout = AdminLayout;
export default AllOrders;
