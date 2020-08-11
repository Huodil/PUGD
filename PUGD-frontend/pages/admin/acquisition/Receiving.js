import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GetOrder } from "@/graphql/queries/acquisition/order";
import { GetAllOrderLines } from "@/graphql/queries/acquisition/orderline";
import { InsertDeliveryLine } from "@/graphql/mutations/acquisition/deliveryline";
import { UpdateOrder } from "@/graphql/mutations/acquisition/order";
import { UpdateOrderLine } from "@/graphql/mutations/acquisition/orderline";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import Container from "@/components/ui/Container";
import MaterialTable from "material-table";
import AdminLayout from "@/components/adminLayout";

const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));
var id1 = ObjectId();
const Receiving = () => {
  const Router = useRouter();
  const [order_line, setOrder_line] = useState([]);

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
  const [insertDeliveryLine] = useMutation(InsertDeliveryLine, {
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

  function splitfunction(e) {
    return e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  }

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
        onSubmit={(values, actions) => {
          let initord = [];
          for (var i = 0; i < order_line.length; i++) {
            if (order_line[i]._id.startsWith("ObjectID")) {
              order_line[i]._id = splitfunction(order_line[i]._id);
            }
            initord.push(order_line[i]._id);
          }

          updateOrder({
            variables: {
              _id: Router.query.id,
              name: values.name,
              order_number: values.order_number,
              status: values.status,
              order_lines: initord,
            },
          });
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);

          alert("Order updated succesfully");
        }}
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
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          setOrder_line(() => {
                            newData.quantityreceived = newData.new_Qt;
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
                        var j =
                          parseInt(oldData.quantityreceived) +
                          parseInt(newData.new_Qt);
                        var r = parseInt(oldData.quantity) - j;

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
                            quantityreceived: j,
                          },
                          refetchQueries: [
                            {
                              query: GetAllOrderLines,
                              variables: { order: Router.query.id },
                            },
                          ],
                        }).then(
                          insertDeliveryLine({
                            variables: {
                              _id: ObjectId(),
                              orderline: a,
                              order: Router.query.id,
                              isbn: newData.isbn,
                              title: newData.title,
                              date: new Date(),
                              newquantity: newData.new_Qt,
                              remainingquantity: r,
                            },
                          }).then(
                            updateOrder({
                              variables: {
                                _id: Router.query.id,
                                received: true,
                              },
                            })
                          )
                        );
                      }),
                  }}
                />
              </div>
            </Grid>
            <br></br>
            <div>
              <Grid>
                <button className="SubmitButton" type="submit">
                  Put On The Bill
                </button>
              </Grid>
            </div>
            <br></br>
          </Form>
        )}
      />
    </Container>
  );
};

Receiving.Layout = AdminLayout;
export default Receiving;
