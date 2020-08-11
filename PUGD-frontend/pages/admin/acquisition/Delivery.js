import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GetOrder } from "@/graphql/queries/acquisition/order";
import { GetAllOrderLines } from "@/graphql/queries/acquisition/orderline";
import { GetDeliveryLine } from "@/graphql/queries/acquisition/deliveryline";

import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import Container from "@/components/ui/Container";
import MaterialTable from "material-table";
import AdminLayout from "@/components/adminLayout";
const Delivery = () => {
  const Router = useRouter();
  const [order_line, setOrder_line] = useState([]);
  const [delivery_line, setDelivery_line] = useState([]);

  const { loading, error, data: data_order } = useQuery(GetOrder, {
    variables: { id: Router.query.id },
  });
  const { data: data_lines } = useQuery(GetAllOrderLines, {
    variables: { order: Router.query.id },
  });
  const { data: data_delivery } = useQuery(GetDeliveryLine, {
    variables: { order: Router.query.id },
  });

  var Listdelivery = [];
  var clone1, clone2;
  // // useManyQueries(preloadPages.map((page) => [
  // //     LIST, { skip: !data, variables: { limit, offset: page * limit } }
  // //   ]))
  // for (var i = 0; i < data_lines.getAllOrderLines.length; i++) {
  //   d = deliveryline(data_lines.getAllOrderLines[i].id);
  //   Listdelivery[i].push(d);
  // }
  //   useEffect(() => {

  //   }, [data_lines, data_delivery]);
  useEffect(() => {
    if (
      data_lines &&
      data_lines.getAllOrderLines 
    )
    {
      
    }

  }, [data_lines, data_delivery]);

  // for (var i = 0; i < data_lines.getAllOrderLines.length; i++) {
  //   for (var j = 0; i < data_delivery.getAllDeliveryLines.length; j++) {
  //     if (
  //       data_delivery.getAllDeliveryLines[j].orderline ==
  //       data_lines.getAllOrderLines[i]._id
  //     )
  //       Listdelivery[i].push(data_delivery.getAllDeliveryLines[j]);
  //   }
  // }

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          id: Router.query.id,
          order_number: data_order.getOrder.order_number,
          establishement: data_order.getOrder.establishement,
          name: data_order.getOrder.name,
          financial_year: data_order.getOrder.financial_year,
          date: new Date(),
          delivery_address: data_order.getOrder.delivery_address,
          billing_address: data_order.getOrder.billing_address,
          notes: data_order.getOrder.notes,
          status: data_order.getOrder.status,
          type: data_order.getOrder.type,
          provider: data_order.getOrder.provider,
        }}
        validationSchema={Yup.object().shape({
          establishement: Yup.string().required("establishement is required"),
          name: Yup.string().required("name is required"),
          order_number: Yup.string().required("order num is required"),
          financial_year: Yup.string().required("financial year is required"),

          provider: Yup.string().required("provider is required"),
        })}
        render={({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Grid>
              <GridElement className="col s12 m6" name="Order number">
                <Field
                  type="text"
                  name="order_number"
                  placeholder="Enter order number"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6" name="Status">
                <Field
                  type="text"
                  name="status"
                  placeholder="pending"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement className="col s12 m6" name="Establishement">
                <Field
                  type="text"
                  name="establishement"
                  placeholder="Enter an establishement"
                  className="form-control"
                />
              </GridElement>
              {/* {Providers()} */}
              {/* {AllOrderLines()} */}
              {/* {if(n==0){Hello();n++}} */}
              <GridElement className="col s12 m6" name="Provider">
                <Field
                  type="text"
                  name="provider"
                  placeholder="Provider"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement className="col s12 m6" name="Name">
                {touched.name && errors.name && (
                  <p className="alert alert-danger">{errors.name}</p>
                )}
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6" name="Financial-Year">
                <Field
                  type="text"
                  name="financial_year"
                  placeholder="financial_year"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement className="col s12 m6" name="Date">
                <DatePicker
                  className="date-control"
                  name="date"
                  showPopperArrow={false}
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                />
              </GridElement>
              <GridElement className="col s12 m6" name="Delivery Address">
                <Field
                  type="text"
                  name="delivery_address"
                  placeholder="Enter delivery address"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement className="col s12 m6" name="Billing Address">
                <Field
                  type="text"
                  name="billing_address"
                  placeholder="Enter billing address"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6" name="Notes">
                <Field
                  type="text"
                  name="notes"
                  placeholder="Enter your notes"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <br></br>
            <Grid>
              <br></br>
              <div style={{ width: "100%" }}>
                <MaterialTable
                  columns={[
                    { title: "Isbn", field: "isbn", editable: "never" },
                    {
                      title: "title",
                      field: "title",
                      editable: "never",
                    },
                    {
                      title: "Ordered Qt",
                      field: "quantity",
                      type: "numeric",
                      editable: "never",
                    },
                    {
                      title: "Received Qt",
                      field: "quantityreceived",
                      type: "numeric",
                      editable: "never",
                    },
                    {
                      title: "Remaining Qt",
                      render: (rowData) =>
                        rowData.quantity - rowData.quantityreceived,
                      type: "numeric",
                    },
                    {
                      title: "New Qt",
                      field: "new_Qt",
                      type: "numeric",
                    },
                  ]}
                  data={order_line}
                  title="Order Lines"
                />
              </div>
            </Grid>
            <br></br>
            <div>
              <Grid>
                <button className="SubmitButton" type="submit">
                  Put On The Bill
                </button>
                {console.log(Listdelivery[0])}
                {/* {console.log(delivery_line.length)} */}
              </Grid>
            </div>
            <br></br>
          </Form>
        )}
      />
    </Container>
  );
};

Delivery.Layout = AdminLayout;
export default Delivery;
