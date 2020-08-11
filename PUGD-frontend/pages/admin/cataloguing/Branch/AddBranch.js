import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import Container from '../../../../components/ui/Container'
import {INSERT_BRANCH} from '../../../../graphql/mutations/admin/cataloguing/Branch-mutation.js';
import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/react-hooks";
import SelectBox from "../../../../components/ui/SelectBox";
import {GET_LIBRARY_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/LibraryQuerie";
import Router from "next/router";
import Swal from 'sweetalert2'
const AddBranch = () => {
    const { loading, error, data } = useQuery(GET_LIBRARY_ALL_FIELDS);
    
    const [BranchName, setBranchName] = useState('')
    const [BranchZip, setBranchZip] = useState('')
    const [BranchCity, setBranchCity] = useState('')
    const [BranchState, setBranchState] = useState('')
    const [BranchCountry, setBranchCountry] = useState('')
    const [BranchFax, setBranchFax] = useState('')
    const [BranchPhone, setBranchPhone] = useState('')
    const [BranchUrl, setBranchUrl] = useState('')
    const [BranchIp, setBranchIp] = useState('')
    const [GeoLocation, setGeoLocation] = useState('')
    const [Library, setLibrary] = useState('')
    const [AddBranch] = useMutation(INSERT_BRANCH,{
        onCompleted(data) {
            const {_id} = data
            
            // Router.push("/");
        }
      });
      if (loading) return 'Loading...';
    if (error) return `Error! ${error1.message}`;
    const onSubmitHandler = ()=>{
      event.preventDefault();
      AddBranch({
          variables: {
            BranchName: BranchName,
            BranchZip: BranchZip,
            BranchCity: BranchCity,
            BranchState: BranchState,
            BranchCountry: BranchCountry,
            BranchFax: BranchFax,
            BranchPhone: BranchPhone,
            BranchUrl: BranchUrl,
            BranchIp: BranchIp,
            GeoLocation: GeoLocation,
            Library: Library.split("\"")[1],
          }
      });
      Swal.fire({
        title: 'Success',
        text: "Your branch has been added",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/Branch/branches")
      })

    }
    
   
    if(data != null || data !== undefined ){
        
    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Add a new Branch</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label >Name of the Branch*</label>
                      <input className="validate" required  type="text" 
                      onChange={e => setBranchName(e.target.value)} value={BranchName}/>
                    </div>

                    <div className="input-field col s12">
                      <label >CodeZip of the Branch*</label>
                      <input className="validate" required  type="number" 
                      onChange={e => setBranchZip(e.target.value)} value={BranchZip}/>
                    </div>

                    <div className="input-field col s12">
                      <label >The City of the Branch*</label>
                      <input className="validate" required type="text" 
                      onChange={e => setBranchCity(e.target.value)} value={BranchCity}/>
                    </div>


                    <div className="input-field col s12">
                      <label >The State of the Branch*</label>
                      <input className="validate" required  type="text" 
                      onChange={e => setBranchState(e.target.value)} value={BranchState}/>
                    </div>


                    <div className="input-field col s12">
                      <label >The country of the Branch</label>
                      <input className="validate"  type="text" 
                      onChange={e => setBranchCountry(e.target.value)} value={BranchCountry}/>
                    </div>


                    <div className="input-field col s12">
                      <label >Branch Fax</label>
                      <input className="validate"  type="text" 
                      onChange={e => setBranchFax(e.target.value)} value={BranchFax}/>
                    </div>


                    <div className="input-field col s12">
                      <label >Branch phone number*</label>
                      <input className="validate" required  type="text" 
                      onChange={e => setBranchPhone(e.target.value)} value={BranchPhone}/>
                    </div>


                    <div className="input-field col s12">
                      <label >URL of the Branch</label>
                      <input className="validate"  type="text" 
                      onChange={e => setBranchUrl(e.target.value)} value={BranchUrl}/>
                    </div>


                    <div className="input-field col s12">
                      <label >The ip of the Branch</label>
                      <input className="validate"  type="text" 
                      onChange={e => setBranchIp(e.target.value)} value={BranchIp}/>
                    </div>

                    <div className="input-field col s12">
                      <label >The geolocalisation address of the Branch*</label>
                      <input className="validate"  type="text" 
                      onChange={e => setGeoLocation(e.target.value)} value={GeoLocation}/>
                    </div>
        
                
                    <div className="input-field col s12">
                        <SelectBox className="validate" label={"Library *"}
                         onChange={e => setLibrary(e.target.value)} required>
                            
                        <option value selected disabled >Choose your option</option>
                        
                        
                             
                            {data.libraries.map((items) => (

                            <option key={items._id}  value={items._id}> {items.Name} </option>
                            
                            ))}
                         
                        

                        </SelectBox >

                        
                    </div>
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit" name="action">Add the Branch
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
return <div>
loading ...
</div>

  };

  AddBranch.Layout = AdminLayout;
  export default AddBranch;