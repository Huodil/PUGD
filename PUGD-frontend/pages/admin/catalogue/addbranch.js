import React, { useState } from "react";
import AdminLayout from "../../../components/adminLayout";
import Container from "../../../components/ui/Container";
// import { INSERT_BRANCH } from "@../../../graphql/mutations/admin/cataloguing/Branch-mutation.js";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import SelectBox from "../../../components/ui/SelectBox";
// import { GET_LIBRARY_ALL_FIELDS } from "@../../../graphql/queries/admin/cataloguing/LibraryQuerie";
const AddLibrary = () => {
  const { loading, error, data } = useQuery(GET_LIBRARY_ALL_FIELDS);

  const [BranchName, setBranchName] = useState("");
  const [BranchZip, setBranchZip] = useState(null);
  const [BranchCity, setBranchCity] = useState("");
  const [BranchState, setBranchState] = useState("");
  const [BranchCountry, setBranchCountry] = useState("");
  const [BranchFax, setBranchFax] = useState("");
  const [BranchPhone, setBranchPhone] = useState("");
  const [BranchUrl, setBranchUrl] = useState("");
  const [BranchIp, setBranchIp] = useState("");
  const [GeoLocation, setGeoLocation] = useState("");
  const [Library, setLibrary] = useState("");
  const [AddBranch] = useMutation(INSERT_BRANCH, {
    onCompleted(data) {
      const { _id } = data;
      console.log("id branch is:", _id);
      // Router.push("/");
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error1.message}`;
  const onSubmitHandler = () => {
    AddBranch({
      variables: {
        BranchZip: BranchZip,
        BranchName: BranchName,
        BranchCity: BranchCity,
        BranchState: BranchState,
        BranchCountry: BranchCountry,
        BranchFax: BranchFax,
        BranchPhone: BranchPhone,
        BranchUrl: BranchUrl,
        BranchIp: BranchIp,
        GeoLocation: GeoLocation,
        Library: Library,
      },
    });
  };

  console.log(data.libraries);
  if (data != null || data !== undefined) {
    return (
      <Container>
        {/* HTML VALIDATION  */}

        <div className="card-content">
          <div className="card-title">
            <div className="row">
              <div className="col s12 m6 l10">
                <h4 className="card-title">Add a new Branch</h4>
              </div>
              <div className="col s12 m6 l2"></div>
            </div>
          </div>
          <div id="html-view-validations">
            <form className="formValidate0" id="formValidate0" method="get">
              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="uname0">Name of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname0"
                    name="uname0"
                    type="text"
                    onChange={(e) => setBranchName(e.target.value)}
                    value={BranchName}
                  />
                </div>
                ​
                <div className="input-field col s12">
                  <label htmlFor="uname1">CodeZip of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname1"
                    name="uname1"
                    type="text"
                    onChange={(e) => setBranchZip(e.target.value)}
                    value={BranchZip}
                  />
                </div>
                ​
                <div className="input-field col s12">
                  <label htmlFor="uname2">The City of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname2"
                    name="uname2"
                    type="text"
                    onChange={(e) => setBranchCity(e.target.value)}
                    value={BranchCity}
                  />
                </div>
                ​ ​
                <div className="input-field col s12">
                  <label htmlFor="uname3">The State of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname3"
                    name="uname3"
                    type="text"
                    onChange={(e) => setBranchState(e.target.value)}
                    value={BranchState}
                  />
                </div>
                ​ ​
                <div className="input-field col s12">
                  <label htmlFor="uname4">The country of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname4"
                    name="uname4"
                    type="text"
                    onChange={(e) => setBranchCountry(e.target.value)}
                    value={BranchCountry}
                  />
                </div>
                ​ ​
                <div className="input-field col s12">
                  <label htmlFor="uname5">Branch Fax*</label>
                  <input
                    className="validate"
                    required
                    id="uname5"
                    name="uname5"
                    type="text"
                    onChange={(e) => setBranchFax(e.target.value)}
                    value={BranchFax}
                  />
                </div>
                ​ ​
                <div className="input-field col s12">
                  <label htmlFor="uname6">Branch phone number*</label>
                  <input
                    className="validate"
                    required
                    id="uname6"
                    name="uname6"
                    type="text"
                    onChange={(e) => setBranchPhone(e.target.value)}
                    value={BranchPhone}
                  />
                </div>
                ​ ​
                <div className="input-field col s12">
                  <label htmlFor="uname7">URL of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname7"
                    name="uname7"
                    type="text"
                    onChange={(e) => setBranchUrl(e.target.value)}
                    value={BranchUrl}
                  />
                </div>
                ​ ​
                <div className="input-field col s12">
                  <label htmlFor="uname8">The ip of the Branch*</label>
                  <input
                    className="validate"
                    required
                    id="uname8"
                    name="uname8"
                    type="text"
                    onChange={(e) => setBranchIp(e.target.value)}
                    value={BranchIp}
                  />
                </div>
                ​
                <div className="input-field col s12">
                  <label htmlFor="uname9">
                    The geolocalisation address of the Branch*
                  </label>
                  <input
                    className="validate"
                    required
                    id="uname9"
                    name="uname9"
                    type="text"
                    onChange={(e) => setGeoLocation(e.target.value)}
                    value={GeoLocation}
                  />
                </div>
                <div className="input-field col s12">
                  <SelectBox
                    id="uname10"
                    name="uname10"
                    className="validate"
                    label={"Library"}
                    value={Library}
                    onChange={(e) => setLibrary(e.target.value)}
                    required
                  >
                    <option value disabled>
                      Choose your option
                    </option>

                    {data.libraries.map((items) => (
                      <option key={items._id} value={items._id}>
                        {" "}
                        {items.Name}{" "}
                      </option>
                    ))}
                  </SelectBox>
                </div>
                <div className="input-field col s12">
                  <button
                    className="btn waves-effect waves-light right submit"
                    type="submit"
                    onClick={onSubmitHandler}
                    name="action"
                  >
                    Add the Branch
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    );
  }
  return <div>this is the cataloguing module main page</div>;
};

AddLibrary.Layout = AdminLayout;
export default AddLibrary;
