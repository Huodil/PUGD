import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import Container from '../../../../../components/ui/Container'
import {UPDATE_LIBRARY} from '../../../../../graphql/mutations/admin/cataloguing/Library-mutation.js';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_LIBRARY} from "../../../../../graphql/queries/admin/cataloguing/LibraryQuerie";
import {useRouter} from "next/router";
import Input from "../../../../../components/ui/Input";
import TextArea from "../../../../../components/ui/TextArea";
import Router from "next/router";
import Swal from 'sweetalert2'
const UpdateLibrary = () => {


    const router = useRouter()
    const id = router.query.id;

    const { data: data1 }  = useQuery(GET_LIBRARY, {
        variables: {Id: id},
    }); 
    if(data1 != null || data1 !== undefined ){
      
        var a = data1.library.Name
        var b = data1.library.Address

    }else{
        var a = ''
        var b = ''
    }
    const [name, setName] = useState(0)
    const [address, setAddress] = useState(0)

    useEffect( () => {
        if(name==0){
            setName(a);
        }
        if(address==0){
            setAddress(b);
          }
      });
    const [UpdateLibrary] = useMutation(UPDATE_LIBRARY);

    
    const onSubmitHandler = ()=>{
      event.preventDefault();
      UpdateLibrary({
          variables: {
            Id: id,
            Name: name,
            Address: address,
          }
      });
      Swal.fire({
        title: 'Success',
        text: "Your Library has been updated",
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
                    <h4 className="card-title">Update a Library</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                    <div className="input-field col s12">
                      <Input label="Name of the library*" required type="text" 
                      onChange={e => setName(e.target.value)} value={name}/>
                    </div>
        
                    <div className="input-field col s12">
                      <TextArea label="Address of the library *" required
                      value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit"  name="action">Update the library
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
  UpdateLibrary.Layout = AdminLayout;
  export default UpdateLibrary;