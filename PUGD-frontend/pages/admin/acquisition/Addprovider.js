import { Formik, Form, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import { InsertProvider } from "@/graphql/mutations/acquisition/provider";
import { useMutation } from "@apollo/react-hooks";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import Container from "@/components/ui/Container";
import AdminLayout from "@/components/adminLayout";
import Router from "next/router";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const AddProvider = () => {
  const [insertProvider] = useMutation(InsertProvider, {
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <Container Title="New Provider">
      <Formik
        initialValues={{
          establishement: "",
          name: "",
          account: "",
          adress: "",
          phone: "",
          email: "",
          website: "",
        }}
        validationSchema={Yup.object().shape({
          establishement: Yup.string().required("establishement is required"),
          name: Yup.string().required("name is required"),
          account: Yup.string().required("account is required"),
          adress: Yup.string().required("adress is required"),
          phone: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("phone is required"),
          email: Yup.string()
            .email("must be a valid email adress")
            .required("email is required"),
          website: Yup.string().url("must be a url"),
        })}
        onSubmit={(values, actions) => {
          insertProvider({ variables: values });
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
          alert("Provider added succesfully");
          Router.push("/admin/acquisition/AllProviders");
        }}
        render={({ errors, touched }) => (
          <Form>
            <Grid>
              <GridElement s={12} m={6} l={4} style={{ display: "flex" }}>
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
              <GridElement>
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
              <GridElement s={12} m={6} l={2} style={{ display: "flex" }}>
                {touched.account && errors.account && (
                  <p className="alert alert-danger">{errors.account}</p>
                )}

                <Field
                  type="text"
                  name="account"
                  placeholder="Enter an account"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement s={12} m={6} style={{ display: "flex" }}>
                {touched.adress && errors.adress && (
                  <p className="alert alert-danger">{errors.adress}</p>
                )}
                <Field
                  type="text"
                  name="adress"
                  placeholder="Enter en adress"
                  className="form-control"
                />
              </GridElement>
              <GridElement s={12} m={6} style={{ display: "flex" }}>
                {touched.phone && errors.phone && (
                  <p className="alert alert-danger">{errors.phone}</p>
                )}
                <Field
                  type="text"
                  name="phone"
                  placeholder="0670102010 or +212670102010"
                  className="form-control"
                />
              </GridElement>
            </Grid>
            <Grid>
              <GridElement s={12} m={6} style={{ display: "flex" }}>
                {touched.email && errors.email && (
                  <p className="alert alert-danger">{errors.email}</p>
                )}
                <Field
                  type="text"
                  name="email"
                  placeholder="you@yourdomain.com"
                  className="form-control"
                />
              </GridElement>
              <GridElement s={12} m={6} style={{ display: "flex" }}>
                {touched.website && errors.website && (
                  <p className="alert alert-danger">{errors.website}</p>
                )}
                <Field
                  type="text"
                  name="website"
                  placeholder="Http://website"
                  className="form-control"
                />
              </GridElement>
            </Grid>

            <ButtonSubmit className="SubmitButton">Submit</ButtonSubmit>
          </Form>
        )}
      />
    </Container>
  );
};

AddProvider.Layout = AdminLayout;
export default AddProvider;
