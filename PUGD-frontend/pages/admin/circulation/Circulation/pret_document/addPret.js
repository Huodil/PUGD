import { Formik, Form, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import { InsertCopy } from "../../../.././../graphql/mutations/admin/circulation/Copies.mutations";
import { useMutation } from "@apollo/react-hooks";
import GridElement from "@/components/ui/Grid/GridElement";
import Grid from "@/components/ui/Grid/grid";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import Container from "@/components/ui/Container";
import AdminLayout from "@/components/adminLayout";
import Router from "next/router";


const AddCopy = () => {
    const [InsertCopy ] = useMutation(InsertCopy , {
        onError: (error) => {
            alert(error.message);
        },
    });

    return (
        <Container Title="New Document">
            <Formik
                initialValues={{
                    BareCode: "",
                    NewStatus: "",
                    Record: "",
                }}
                validationSchema={Yup.object().shape({
                    BareCode: Yup.string().required("Barecode is required"),
                    NewStatus: Yup.string().required("Status is required"),
                    Record: Yup.string().required("Record is required"),
                })}
                onSubmit={(values, actions) => {
                    InsertCopy({ variables: values });
                    setTimeout(() => {
                        console.log(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                    alert("Document prêter added succesfully");
                    Router.push("/admin/pret_document/index");
                }}
                render={({ errors, touched }) => (
                    <Form>
                        <Grid>
                            <GridElement s={12} m={6} l={4} style={{ display: "flex" }}>
                                {touched.BareCode && errors.BareCode && (
                                    <p className="alert alert-danger">{errors.BareCode}</p>
                                )}
                                <Field
                                    type="text"
                                    name="barecode"
                                    placeholder="Enter le barecode"
                                    className="form-control"
                                />
                            </GridElement>
                            <GridElement>
                                {touched.NewStatus && errors.NewStatus && (
                                    <p className="alert alert-danger">{errors.NewStatus}</p>
                                )}
                                <Field
                                    type="text"
                                    name="statut"
                                    placeholder="Enter Statut"
                                    className="form-control"
                                />
                            </GridElement>
                            <GridElement s={12} m={6} l={2} style={{ display: "flex" }}>
                                {touched.Record && errors.Record && (
                                    <p className="alert alert-danger">{errors.Record}</p>
                                )}

                                <Field
                                    type="text"
                                    name="record"
                                    placeholder="Enter Record"
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

AddCopy.Layout = AdminLayout;
export default AddCopy;
