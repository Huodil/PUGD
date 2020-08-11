import React, { Component } from "react";
import AdminLayout from "@/components/adminLayout";
import XLSX from "xlsx";
import { make_cols } from "@/components/MakeColumns";
import { SheetJSFT } from "@/components/types";
import { InsertSuggestion } from "@/graphql/mutations/acquisition/suggestion";
import { Mutation } from "react-apollo";
import Router from "next/router";
import Card from "@/components/ui/card/card";
import CardTitle from "@/components/ui/card/cardTitle";
import Button from "@/components/ui/Button";

export class ImportSugg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <CardTitle>
              {" "}
              <h5>Puchase Management : Suggestions</h5>
            </CardTitle>
            <Card>
              <Mutation mutation={InsertSuggestion}>
                {(insertsuggestion) => (
                  <div>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      accept={SheetJSFT}
                      onChange={this.handleChange}
                    />

                    <br />
                    <br></br>
                    <input
                      type="submit"
                      className="SubmitButton"
                      value="Process Triggers"
                      onClick={() => {
                        /* Boilerplate to set up FileReader */
                        const reader = new FileReader();
                        const rABS = !!reader.readAsBinaryString;

                        reader.onload = (e) => {
                          /* Parse data */
                          const bstr = e.target.result;
                          const wb = XLSX.read(bstr, {
                            type: rABS ? "binary" : "array",
                            bookVBA: true,
                          });
                          /* Get first worksheet */
                          const wsname = wb.SheetNames[0];
                          const ws = wb.Sheets[wsname];
                          /* Convert array of arrays */
                          const data = XLSX.utils.sheet_to_json(ws);
                          /* Update state */
                          this.setState({
                            data: data,
                            cols: make_cols(ws["!ref"]),
                          });

                          for (var i = 0; i < this.state.data.length; i++) {
                            this.state.data[i].flag = "new";

                            insertsuggestion({
                              variables: this.state.data[i],
                            });
                          }
                          alert("Suggestion Imported with success");
                          Router.push("/admin/acquisition/ImportedSuggestions");
                        };

                        if (rABS) {
                          reader.readAsBinaryString(this.state.file);
                        } else {
                          reader.readAsArrayBuffer(this.state.file);
                        }
                      }}
                    />
                  </div>
                )}
              </Mutation>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

ImportSugg.Layout = AdminLayout;
export default ImportSugg;
