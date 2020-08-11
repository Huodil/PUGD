import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import Container from '../../../../components/ui/Container'
import {ADD_LIBRARY} from '../../../../graphql/mutations/admin/cataloguing/Library-mutation.js';
import {useMutation} from "@apollo/react-hooks";
import Router from "next/router";
import Swal from 'sweetalert2'
const AddLibrary = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [AddLibrary] = useMutation(ADD_LIBRARY);
    const onSubmitHandler = ()=>{
      event.preventDefault();

      AddLibrary({
          variables: {
            Name: name,
            Address: address,
          }
      });


      Swal.fire({
        title: 'Success',
        text: "Your Library has been add",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/Library/libraries")
      })


    }

    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Add a new Library</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label >Name of the library*</label>
                      <input className="validate" required  type="text" 
                      onChange={e => setName(e.target.value)} value={name}/>
                    </div>
        
                    <div className="input-field col s12">
                      <textarea  className="materialize-textarea validate" required
                      value={address} onChange={e => setAddress(e.target.value)} />
                      <label >Address of the library *</label>
                    </div>
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit" name="action">Add the library
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
            </form>
              </div>
            </div>
    

        
      </Container>
    );
  };
  AddLibrary.Layout = AdminLayout;
  export default AddLibrary;