import React, { useState, useMemo } from "react";
import Router from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GetOrder } from "@/graphql/queries/acquisition/order";
import { GetAllOrderLines } from "@/graphql/queries/acquisition/orderline";
import { UpdateOrder } from "@/graphql/mutations/acquisition/order";
import {
  InsertOrderLine,
  UpdateOrderLine,
  DeleteOrderLine,
} from "@/graphql/mutations/acquisition/orderline";
import { GetAllProviders } from "@/graphql/queries/acquisition/provider";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import Container from "@/components/ui/Container";
import MaterialTable from "material-table-formik";
import AdminLayout from "@/components/adminLayout";

const options = [
  { value: "20/3/2020", label: "20/3/2020" },
  { value: "1/3/2020", label: "1/3/2020" },
];

const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

var OrderID = ObjectId();

const QuotationToCommand = () => {
  const [order_line, setOrder_line] = useState([]);
  const [insertOrderLine] = useMutation(InsertOrderLine, {
    onCompleted: () => {
      window.alert(`Quotation Line inserted !!`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const [updateOrderLine] = useMutation(UpdateOrderLine, {
    onError: (error) => {
      alert(error.message);
    },
  });

  const [updateOrder] = useMutation(UpdateOrder, {
    onError: (error) => {
      alert(error.message);
    },
  });
  const [deleteOrderLine] = useMutation(DeleteOrderLine, {
    onError: (error) => {
      alert(error.message);
    },
  });

  const [insertOrder] = useMutation(InsertOrder, {
    onError: (error) => {
      alert(error.message);
    },
  });
  const { loading, error, data: data_order } = useQuery(GetOrder, {
    variables: { id: Router.query.id },
  });
  const { data: data_lines } = useQuery(GetAllOrderLines, {
    variables: { order: Router.query.id },
  });

  useMemo(() => {
    if (data_lines && data_lines.getAllOrderLines) {
      setOrder_line(data_lines.getAllOrderLines);
    }
  }, [data_lines]);

  const ListPro = [];
  function Providers() {
    const { loading, data, error } = useQuery(GetAllProviders);
    if (loading) return "Loading...";
    if (error) return `couldn't fetch data`;
    for (var i = 0; i < data.getallproviders.length; i++) {
      ListPro.push({
        value: data.getallproviders[i].name,
        label: data.getallproviders[i].name,
      });
    }
  }

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const splitfunction = (e) =>
    e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          id: OrderID,
          quotation_number: data_order.getOrder.quotation_number,
          order_number: "",
          name: "",
          establishement: data_order.getOrder.establishement,
          financial_year: data_order.getOrder.financial_year,
          date: data_order.getOrder.date,
          delivery_address: data_order.getOrder.delivery_address,
          billing_address: data_order.getOrder.billing_address,
          notes: data_order.getOrder.notes,
          status: "pending",
          type: "order",
          provider: data_order.getOrder.provider,
        }}
        validationSchema={Yup.object().shape({
          establishement: Yup.string().required("establishement is required"),
          name: Yup.string().required("name is required"),
          order_number: Yup.string().required("order number is required"),
          financial_year: Yup.string().required("financial year is required"),

          provider: Yup.string().required("provider is required"),
        })}
        onSubmit={(values, actions) => {
          let initord = [];
          for (var i = 0; i < order_line.length; i++) {
            if (order_line[i]._id.startsWith("ObjectID")) {
              order_line[i]._id = splitfunction(order_line[i]._id);
            }
            initord.push(order_line[i]._id);
          }

          insertOrder({
            variables: {
              id: values.id,
              establishement: values.establishement,
              type: values.type,
              financial_year: values.financial_year,
              provider: values.provider,
              date: values.date,
              quotation_number: values.quotation_number,
              order_number: values.order_number,
              name: values.name,
              status: values.status,
              delivery_address: values.delivery_address,
              billing_address: values.billing_address,
              notes: values.notes,
              order_lines: initord,
            },
          }).then(() => {
            let tab = [];
            for (var i = 0; i < data_order.getOrder.orders.length; i++) {
              tab.push(splitfunction(data_order.getOrder.orders[i]));
            }
            tab.push(values.id);

            updateOrder({
              variables: {
                _id: Router.query.id,
                orders: tab,
              },
            });
          });
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);

          alert("Order added succesfully");
        }}
        render={({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Grid>
              <GridElement className="col s12 m6 l4" name="Establishement">
                {touched.establishement && errors.establishement && (
                  <p className="alert alert-danger">{errors.establishement}</p>
                )}
                <Field
                  type="text"
                  name="establishement"
                  placeholder="Enter an establishement"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6 l4" name="Financial-Year">
                {touched.financial_year && errors.financial_year && (
                  <p className="alert alert-danger">{errors.financial_year}</p>
                )}
                <Field
                  type="text"
                  name="financial_year"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6 l4" name="Provider">
                <Field type="text" name="provider" />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement className="col s12 m6 l3" name="Date">
                <Field type="text" name="date" className="form-control" />
              </GridElement>

              <GridElement className="col s12 m6 l3" name="Order number">
                {touched.order_number && errors.order_number && (
                  <p className="alert alert-danger">{errors.order_number}</p>
                )}
                <Field
                  type="text"
                  name="order_number"
                  placeholder="Order Number"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6 l3" name="Name">
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
              <GridElement className="col s12 m6 l3" name="Status">
                <Field type="text" name="status" className="form-control" />
              </GridElement>
            </Grid>

            <Grid>
              <GridElement className="col s12 m6" name="Quotation_number">
                <Field
                  type="text"
                  name="quotation_number"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6" name="Delivery Address">
                {touched.delivery_address && errors.delivery_address && (
                  <p className="alert alert-danger">
                    {errors.delivery_address}
                  </p>
                )}
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
                {touched.billing_address && errors.billing_address && (
                  <p className="alert alert-danger">{errors.billing_address}</p>
                )}
                <Field
                  type="text"
                  name="billing_address"
                  placeholder="Enter billing address"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6" name="Notes">
                {touched.notes && errors.notes && (
                  <p className="alert alert-danger">{errors.notes}</p>
                )}
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
                      title: "discount",
                      field: "discount",
                      type: "numeric",
                    },
                    { title: "status", field: "status" },
                  ]}
                  data={order_line}
                  title="Order Lines"
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          setOrder_line(() => {
                            newData._id = ObjectId();
                            newData.order = OrderID;
                            const order_line1 = [...order_line, newData];
                            return order_line1;
                          });
                          resolve();
                        }, 1000);
                      }).then(() => {
                        insertOrderLine({ variables: newData });
                        console.log(newData);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          setOrder_line(() => {
                            const order_line1 = [
                              ...order_line.filter((x) => x !== oldData),
                              newData,
                            ];
                            return order_line1;
                          });
                          resolve();
                        }, 1000);
                      }).then(() => {
                        var a = splitfunction(newData._id);
                        updateOrderLine({
                          variables: {
                            _id: a,
                            isbn: newData.isbn,
                            title: newData.title,
                            author: newData.author,
                            quantity: newData.quantity,
                            price: newData.price,
                            discount: newData.discount,
                            status: newData.status,
                          },
                        });
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          setOrder_line(() => {
                            const order_line1 = [
                              ...order_line.filter((x) => x !== oldData),
                            ];
                            return order_line1;
                          });
                          resolve();
                        }, 1000);
                      }).then(() => {
                        var a = splitfunction(oldData._id);
                        deleteOrderLine({
                          variables: { _id: a },
                        });
                      }),
                  }}
                />
              </div>
            </Grid>
            <br></br>
            <Grid>
              <button className="SubmitButton" type="submit">
                Submit
              </button>
              <Link href={`/admin/acquisition/AllQuotations`}>
                <button className="SubmitButton"> Annuler</button>
              </Link>
            </Grid>
            <br></br>
          </Form>
        )}
      />
    </Container>
  );
};

QuotationToCommand.Layout = AdminLayout;
export default QuotationToCommand;
