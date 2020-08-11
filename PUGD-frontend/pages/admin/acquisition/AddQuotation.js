import React, { useState } from "react";
import Select from "react-select";
import { Formik, Form, Field, FieldArray } from "formik";
import html2canvas from "../../../helpers/html2canvas";
import Router from "next/router";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import * as Yup from "yup";
import { InsertOrder } from "@/graphql/mutations/acquisition/order";
import { InsertOrderLine } from "@/graphql/mutations/acquisition/orderline";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GetAllProviders } from "@/graphql/queries/acquisition/provider";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import MaterialTable from "material-table-formik";
import Container from "@/components/ui/Container";
import ButtonS from "@/components/ui/ButtonSubmit";
import AdminLayout from "@/components/adminLayout";

const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

var OrderID = ObjectId();
var OrderID2 = ObjectId();

const initialFormData = {
  id: OrderID,
  quotation_number: "1",
  establishement: "hahahaa",
  name: "haha",
  financial_year: "10",
  date: new Date(),
  delivery_address: "zaeaze",
  billing_address: "zaeaze",
  notes: "zaeaze",
  status: "pending",
  type: "quotation",
  provider: "zaeaze",
  order_lines: [OrderID2],
};
// $order_lines: [String!]!
const b1 = {
  _id: OrderID2,
  author: "34",
  budget: "B1",
  discount: "3",
  id_record: "1",
  isbn: "Isbn1",
  price: "22",
  quantity: "2",
  status: "Pending",
  title: "Baka Book",
  order: OrderID,
};
const options = [
  { value: "20/3/2020", label: "20/3/2020" },
  { value: "1/3/2020", label: "1/3/2020" },
];
const options1 = [
  { value: "provider1", label: "provider1" },
  { value: "provider2", label: "provider2" },
];
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AddQuotation = () => {
  // const [login, { error, data }] = useLazyQuery(LOGIN_QUERY);
  const [order_line, setOrder_line] = useState([b1]);

  const [insertOrder] = useMutation(InsertOrder, {
    onCompleted: () => {
      window.alert(`Quotation added succesfully!!`);
      Router.push("/admin/acquisition/AllQuotations");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const [insertOrderLine] = useMutation(InsertOrderLine, {
    onError: (error) => {
      alert(error.message);
    },
  });

  const ListPro = [];
  function Hello() {
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
  const printDocument = () => {
    let jsPDF = null;
    if (typeof window !== "undefined") {
      import("jspdf").then((module) => {
        jsPDF = module.default;
      });
    }
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);

      pdf.save("download.pdf");
    });
  };
  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={initialFormData}
        validationSchema={Yup.object().shape({
          establishement: Yup.string().required("establishement is required"),
          name: Yup.string().required("name is required"),
          quotation_number: Yup.string().required("id is required"),
          financial_year: Yup.string().required("financial year is required"),

          provider: Yup.string().required("provider is required"),
        })}
        onSubmit={(values, actions) => {
          new Promise((resolve) => {
            setTimeout(() => {
              for (var i = 0; i < order_line.length; i++) {
                // this.createOrderLine(order_line[i]);
                insertOrderLine({ variables: order_line[i] });
              }
              resolve(order_line);
            }, 2000);
            // eslint-disable-next-line no-unused-vars
          }).then((orderlines) => {
            insertOrder({ variables: values });
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          });
          alert("Adding Quotation..");
        }}
        render={({ values, errors, touched, setFieldValue }) => (
          <div id="divToPrint">
            <ButtonS
              className="SubmitButton"
              onClick={() => {
                printDocument();
              }}
            >
              Print
            </ButtonS>

            <Form>
              <Grid>
                <GridElement className="col s12 m6" name="Quotation number">
                  {touched.quotation_number && errors.quotation_number && (
                    <p className="alert alert-danger">
                      {errors.quotation_number}
                    </p>
                  )}
                  <Field
                    type="text"
                    name="quotation_number"
                    placeholder="quotation Number"
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
                  {touched.establishement && errors.establishement && (
                    <p className="alert alert-danger">
                      {errors.establishement}
                    </p>
                  )}
                  <Field
                    type="text"
                    name="establishement"
                    placeholder="Enter an establishement"
                    className="form-control"
                  />
                </GridElement>
                {Hello()}
                <GridElement className="col s12 m6" name="Provider">
                  {touched.id_Provider && errors.id_Provider && (
                    <p className="alert alert-danger">{errors.id_Provider}</p>
                  )}
                  <Select
                    className="input-field col s12"
                    id="provider"
                    name="provider"
                    options={ListPro}
                    multi={true}
                    selected={values.provider}
                    onChange={(provider) =>
                      setFieldValue("provider", provider.value)
                    }
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
                <GridElement className="col s12 m6" name="Financial Year">
                  {touched.financial_year && errors.financial_year && (
                    <p className="alert alert-danger">
                      {errors.financial_year}
                    </p>
                  )}
                  <Select
                    id="financial_year"
                    name="financial_year"
                    options={options}
                    multi={true}
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
                    <p className="alert alert-danger">
                      {errors.billing_address}
                    </p>
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
              <Grid>
                <br></br>
                <div style={{ width: "100%" }}>
                  <MaterialTable
                    columns={[
                      { title: "id", field: "id_record" },
                      { title: "Isbn", field: "isbn" },
                      {
                        title: "title",
                        field: "title",
                      },
                      {
                        title: "author",
                        field: "author",
                        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
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
                      { title: "budget", field: "budget" },
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
                              values.order_lines.push(newData._id);
                              const order_line1 = [...order_line, newData];
                              return order_line1;
                            });
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            setOrder_line(() => {
                              const order_line1 = [
                                ...order_line.filter((x) => x !== oldData),
                                newData,
                              ];
                              return { order_line1 };
                            });
                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            setOrder_line(() => {
                              const order_line1 = [
                                ...order_line.filter((x) => x !== oldData),
                              ];
                              return { order_line1 };
                            });
                            resolve();
                          }, 1000);
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

                <button className="SubmitButton"> Place an order</button>
              </Grid>
              <br></br>
            </Form>
          </div>
        )}
      />
    </Container>
  );
};

AddQuotation.Layout = AdminLayout;
export default AddQuotation;
