import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Table from "@/components/ui/Table/Table";
import { GetFactures } from "@/graphql/queries/acquisition/facture";
import { DeleteFacture } from "@/graphql/mutations/acquisition/facture";
import CardTitle from "@/components/ui/card/cardTitle";
import Card from "@/components/ui/card/card";
import AdminLayout from "@/components/adminLayout";
import Button from "@/components/ui/Button";

const AllBills = () => {
  function splitfunction(e) {
    return e
      .split("(")[1]
      .split(")")[0]
      .replace(/^"(.*)"$/, "$1");
  }
  const [
    deleteFacture,
    { loading: deleting, error: deleteError },
  ] = useMutation(DeleteFacture);

  const { loading, error, data } = useQuery(GetFactures);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <CardTitle>
            <h5>Purchase Management : Bills</h5>
          </CardTitle>
          <Card>
            <div className="col s12">
              {data == null ? (
                nul
              ) : (
                <Table
                  Thead={
                    <tr>
                      <th>N° Bill</th>
                      <th>N° Order</th>
                      <th>Provider</th>
                      <th>Reception Date</th>
                      <th>Status</th>
                    </tr>
                  }
                  Tbody={
                    <tbody>
                      {data.getFactures.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                          <td>
                            <span className="chip lighten-5 red red-text">
                              {item.numFacture}
                            </span>
                          </td>
                          <td>{splitfunction(item.order).substring(0, 8)}</td>
                          <td>{item.provider}</td>
                          <td>{item.date}</td>
                          <td>{item.status}</td>

                          <td>
                            <div className="invoice-action">
                              <a
                                href="#"
                                className="invoice-action-view mr-4"
                                onClick={() => {
                                  deleteFacture({
                                    variables: { _id: splitfunction(item._id) },
                                    refetchQueries: [{ query: GetFactures }],
                                  });
                                }}
                              >
                                <i className="material-icons">delete</i>
                              </a>
                              <a
                                href={`/admin/acquisition/UpdateBill?id=${splitfunction(
                                  item._id
                                )}`}
                                className="invoice-action-edit"
                              >
                                <i className="material-icons">payments</i>
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
            <Button href="/admin/acquisition/AllOrders" rounded={2}>
              Add A Bill
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

AllBills.Layout = AdminLayout;
export default AllBills;
