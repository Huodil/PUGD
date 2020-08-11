import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import Container from '../../../../../components/ui/Container'
import {UPDATE_KEYWORD} from '../../../../../graphql/mutations/admin/cataloguing/KeyWord-mutation.js';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_KEYWORD} from "../../../../../graphql/queries/admin/cataloguing/KeyWordQuerie";
import Input from "../../../../../components/ui/Input";
import TextArea from "../../../../../components/ui/TextArea";
import {useRouter} from "next/router";
import Router from "next/router";
import Swal from 'sweetalert2'
const UpdateKeyword = () => {

    const router = useRouter()
    const id = router.query.id;
    const { data: data1 }  = useQuery(GET_KEYWORD, {
        variables: {Id: id},
    });
    if(data1 != null || data1 !== undefined ){
      
        var a = data1.keyword.Word
        var b = data1.keyword.Lang

    }else{
        var a = ''
        var b = ''
    }
    const [Word, setWord] = useState(0)
    const [Lang, setLang] = useState(0)

    useEffect( () => {
        if(Word==0){
            setWord(a);
        }
        if(Lang==0){
            setLang(b);
          }
      });
    const [UpdateKeyword] = useMutation(UPDATE_KEYWORD);
    const onSubmitHandler = ()=>{
    
      event.preventDefault();
        UpdateKeyword({
          variables: {
            Id: id,
            Word: Word,
            Lang: Lang,
          }
      });

      Swal.fire({
        title: 'Success',
        text: "Your keyword has been updated",
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
                    <h4 className="card-title">Update a keyWord</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                    <div className="input-field col s12">
                      <Input label="The Keyword*" required  type="text" 
                      onChange={e => setWord(e.target.value)} value={Word}/>
                    </div>
        
                    <div className="input-field col s12">
                      <TextArea label="Language *" required
                      value={Lang} onChange={e => setLang(e.target.value)} />
                    </div>
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit" name="action">Update the KeyWord
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
  UpdateKeyword.Layout = AdminLayout;
  export default UpdateKeyword;