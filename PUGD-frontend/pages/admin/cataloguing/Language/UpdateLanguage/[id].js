import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import Container from '../../../../../components/ui/Container'
import {UPDATE_LANGUAGE} from '../../../../../graphql/mutations/admin/cataloguing/Language-mutation.js';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_LANGUAGE} from "../../../../../graphql/queries/admin/cataloguing/LanguageQuerie";
import Input from "../../../../../components/ui/Input";
import {useRouter} from "next/router"
import Router from "next/router";
import Swal from 'sweetalert2'
const UpdateLanguage = () => {
    const router = useRouter()
    const id = router.query.id;
    const { data: data1 }  = useQuery(GET_LANGUAGE, {
        variables: {Id: id},
    });
    if(data1 != null || data1 !== undefined ){
      
        var a = data1.language.Value


    }else{
        var a = ''
    }

    const [Value, setValue] = useState('')

    useEffect( () => {
        if(Value==0){
            setValue(a);
        }
      });

    const [UpdateLanguage] = useMutation(UPDATE_LANGUAGE);
    const onSubmitHandler = ()=>{
    
      event.preventDefault();
        UpdateLanguage({
          variables: {
            Id: id,
            Value: Value,
          
          }
      });
      Swal.fire({
        title: 'Success',
        text: "Your language has been updated",
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
                      <Input label="The Name of the language*" required  type="text" 
                      onChange={e => setValue(e.target.value)} value={Value}/>
                    </div>
        
                
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit" name="action">Update the Language
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
  UpdateLanguage.Layout = AdminLayout;
  export default UpdateLanguage;