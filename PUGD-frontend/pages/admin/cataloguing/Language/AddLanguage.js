import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import Container from '../../../../components/ui/Container'
import {ADD_LANGUAGE} from '../../../../graphql/mutations/admin/cataloguing/Language-mutation.js';
import {useMutation} from "@apollo/react-hooks";
import Router from "next/router";
import Swal from 'sweetalert2'
const AddLanguage = () => {
    const [Value, setValue] = useState('')
    const [AddLanguage] = useMutation(ADD_LANGUAGE);
    const onSubmitHandler = ()=>{
    
      event.preventDefault();
      AddLanguage({
        variables: {
          Value: Value,
        
        }
    });
    Swal.fire({
        title: 'Success',
        text: "Your language has been added",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/Language/Languages")
      })

    

    }

    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Add a new Language</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label >The Name of the language*</label>
                      <input className="validate" required type="text" 
                      onChange={e => setValue(e.target.value)} value={Value}/>
                    </div>
        
                
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit" >Add the Language
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
  AddLanguage.Layout = AdminLayout;
  export default AddLanguage;