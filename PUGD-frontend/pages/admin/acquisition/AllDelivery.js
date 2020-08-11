/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";
import { GetOrders } from "@/graphql/queries/acquisition/order";
import { GetDeliveryLine } from "@/graphql/queries/acquisition/deliveryline";
import CardTitle from "@/components/ui/card/cardTitle";
import Card from "@/components/ui/card/card";
import AdminLayout from "@/components/adminLayout";
import Button from "@/components/ui/Button";
import Grid from "@/components/ui/Grid/grid";
import GridElement from "@/components/ui/Grid/GridElement";

const AllDelivery = () => {
  const [searchIsbn, setSearchIsbn] = useState("");
  const [searchOrder, setSearchOrder] = useState("");

  const { data: data_order } = useQuery(GetOrders, {
    variables: { type: "order" },
  });
  function Hello(j) {
    if (loading) return "Loading...";
    if (error) return error;
    for (var i = 0; i < data_order.getOrders.length; i++) {
      if (data_order.getOrders[i]._id === j) {
        return data_order.getOrders[i].name;
      }
    }
  }
  const { loading, error, data: data_deliv } = useQuery(GetDeliveryLine);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let filtred = data_deliv.getAllDeliveryLines.filter((item) => {
    return (
      item.isbn.toLowerCase().indexOf(searchIsbn.toLowerCase()) >= 0 &&
      Hello(item.order)
        .toLowerCase()
        .indexOf(searchOrder.toLowerCase()) >= 0
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <CardTitle>
            {" "}
            <h5>Purchase Management : Delivery</h5>
          </CardTitle>

          <Card>
            <div className="container">
              <h6>Search</h6>
              <Grid>
                <GridElement s={12} m={6} style={{ display: "flex" }}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=" by isbn"
                    value={searchIsbn}
                    onChange={(e) => setSearchIsbn(e.target.value)}
                  ></input>
                </GridElement>
                <GridElement s={12} m={6} style={{ display: "flex" }}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=" by order"
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                  ></input>
                </GridElement>
              </Grid>
              {filtred == null ? (
                nul
              ) : (
                <Table
                  Thead={
                    <tr>
                      <th>Order</th>
                      <th>Isbn</th>

                      <th>Date</th>
                      <th>Title</th>
                      <th>Received Quantity</th>
                      <th>Remaining Quantity</th>
                    </tr>
                  }
                  Tbody={
                    <tbody>
                      {filtred.map((item) => (
                        <tr>
                          <td>{Hello(item.order)}</td>
                          <td>
                            <span className="chip lighten-5 red red-text">
                              {item.isbn}
                            </span>
                          </td>

                          <td>{item.date}</td>
                          <td>{item.title}</td>
                          <td>{item.newquantity}</td>

                          <td>{item.remainingquantity}</td>
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

AllDelivery.Layout = AdminLayout;
export default AllDelivery;
