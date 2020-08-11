import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import Container from '../../../../components/ui/Container'
import {ADD_KEYWORD} from '../../../../graphql/mutations/admin/cataloguing/KeyWord-mutation.js';
import {useMutation} from "@apollo/react-hooks";
import Router from "next/router";
import Swal from 'sweetalert2'
const AddKeyword = () => {
    const [Word, setWord] = useState('')
    const [Lang, setLang] = useState('')
    const [AddKeyword] = useMutation(ADD_KEYWORD);
    const onSubmitHandler = ()=>{
    
      event.preventDefault();
      AddKeyword({
          variables: {
            Word: Word,
            Lang: Lang,
          }
      });

      Swal.fire({
        title: 'Success',
        text: "Your keyword has been added",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/KeyWord/KeyWords")
      })
    }

    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Add a new keyWord</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label >The Keyword*</label>
                      <input className="validate" required  type="text" 
                      onChange={e => setWord(e.target.value)} value={Word}/>
                    </div>
        
                    <div className="input-field col s12">
                      <textarea  className="materialize-textarea validate" required
                      value={Lang} onChange={e => setLang(e.target.value)} />
                      <label >Language *</label>
                    </div>
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit"  name="action">Add the KeyWord
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
  AddKeyword.Layout = AdminLayout;
  export default AddKeyword;