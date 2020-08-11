import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GetOrder } from "@/graphql/queries/acquisition/order";
import { GetAllOrderLines } from "@/graphql/queries/acquisition/orderline";
import { InsertFacture } from "@/graphql/mutations/acquisition/facture";
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

var today = new Date();
var today1 =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

var listlines = [];
var listq = [];
var ttc = 0;
var r = Math.random()
  .toString(36)
  .substring(7);
const Billing = () => {
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

  const [insertFacture] = useMutation(InsertFacture, {
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
          currency: data_order.getOrder.currency,
          financial_year: data_order.getOrder.financial_year,
          date: new Date(),
          delivery_address: data_order.getOrder.delivery_address,
          billing_address: data_order.getOrder.billing_address,
          notes: data_order.getOrder.notes,
          status: data_order.getOrder.status,
          type: data_order.getOrder.type,
          provider: data_order.getOrder.provider,
          payementDate: String(new Date()),
        }}
        validationSchema={Yup.object().shape({
          establishement: Yup.string().required("establishement is required"),
          name: Yup.string().required("name is required"),
          order_number: Yup.string().required("order num is required"),
          financial_year: Yup.string().required("financial year is required"),

          provider: Yup.string().required("provider is required"),
        })}
        onSubmit={(values, actions) => {
          insertFacture({
            variables: {
              id: ObjectId(),
              order: Router.query.id,
              provider: Router.query.provider,
              status: "recieved",
              quantitiesFactured: listq,
              numFacture: r,
              payementDate: values.payementDate,
              total_ttc: ttc,
              currency: Router.query.currency,
              establishement: String(Router.query.establishement),
              date: today1,
              order_lines: listlines,
            },
          });
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);

          alert("Bill added succesfully");
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
              <GridElement className="col s12 m6" name="Currency">
                {touched.currency && errors.currency && (
                  <p className="alert alert-danger">{errors.currency}</p>
                )}
                <Field
                  type="text"
                  name="currency"
                  placeholder="Currency"
                  className="form-control"
                />
              </GridElement>
              <GridElement className="col s12 m6" name="payementDate">
                <DatePicker
                  className="date-control"
                  name="payementDate"
                  showPopperArrow={false}
                  selected={values.date}
                  onChange={(date) => setFieldValue("payementDate", date)}
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
                    {
                      title: "Code",
                      render: (rowData) =>
                        splitfunction(rowData._id).substring(0, 7),
                      editable: "never",
                    },

                    { title: "Isbn", field: "isbn", editable: "never" },
                    {
                      title: "title",
                      field: "title",
                      editable: "never",
                    },
                    {
                      title: "Price",
                      field: "price",
                      type: "numeric",
                      editable: "never",
                    },
                    {
                      title: "Discount",
                      field: "discount",
                      type: "numeric",
                      editable: "never",
                    },
                    {
                      title: "Billed",
                      field: "quantityfactured",
                      type: "numeric",
                      editable: "never",
                    },
                    {
                      title: "To Be Billed",
                      render: (rowData) =>
                        rowData.quantity - rowData.quantityfactured,
                      type: "numeric",
                    },
                    {
                      title: "New Bill",
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
                            newData.quantityfactured = newData.new_Qt;
                            const order_line1 = [
                              ...order_line.filter((x) => x !== oldData),
                              newData,
                            ];
                            return order_line1;
                          });
                          resolve();
                        }, 1000);
                      }).then(() => {
                        var b = true;
                        var a = splitfunction(newData._id);
                        listq.push(newData.new_Qt);
                        ttc += newData.new_Qt * (newData.price * 1.2);
                        for (var i = 0; i < listlines.length; i++) {
                          if (listlines[i] === a) {
                            b = false;
                          }
                        }
                        if (b) listlines.push(a);
                        console.log(listlines);
                        var j =
                          parseInt(oldData.quantityfactured) +
                          parseInt(newData.new_Qt);
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
                            quantityfactured: j,
                          },
                          refetchQueries: [
                            {
                              query: GetAllOrderLines,
                              variables: { order: Router.query.id },
                            },
                          ],
                        }).then(
                          updateOrder({
                            variables: {
                              _id: Router.query.id,
                              factured: true,
                            },
                          })
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
                  Create The Bill
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

Billing.Layout = AdminLayout;
export default Billing;
