import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/react-hooks";
import {GET_BRANCH} from "../../../../../graphql/queries/admin/cataloguing/BranchQuerie";
import {GET_LIBRARY_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/LibraryQuerie";
import { UPDATE_BRANCH } from "../../../../../graphql/mutations/admin/cataloguing/Branch-mutation";
import {useRouter} from "next/router";
import Input from "../../../../../components/ui/Input";
import SelectBox from "../../../../../components/ui/SelectBox";
import Container from '../../../../../components/ui/Container'
import Router from "next/router";
import Swal from 'sweetalert2'
const catalogingHome = () => {


    const router = useRouter()
    const id = router.query.id;
    

    const { data: data1 }  = useQuery(GET_BRANCH, {
        variables: {Id: id},
    }); 
    
    if(data1 != null || data1 !== undefined ){
      
      var a = data1.branch.BranchName
  
      var b = data1.branch.BranchZip
      var c = data1.branch.BranchCity
      var d = data1.branch.BranchState
      var e = data1.branch.BranchCountry
      var f = data1.branch.BranchFax
      var g = data1.branch.BranchPhone
      var h = data1.branch.BranchUrl
      var i = data1.branch.BranchIp
      var j = data1.branch.GeoLocation
      var k = data1.branch.Library._id
    }else{
      var a = ''
      var b = ''
      var c = ''
      var d = ''
      var e = ''
      var f = ''
      var g = ''
      var h = ''
      var i = ''
      var j = ''
      var k = ''
    }
    
    
    const { data: data2 }  = useQuery( GET_LIBRARY_ALL_FIELDS);
   
    const [BranchName, setBranchName] = useState(0)

    const [BranchZip, setBranchZip] = useState(0)
    const [BranchCity, setBranchCity] = useState(0)
    const [BranchState, setBranchState] = useState(0)
    const [BranchCountry, setBranchCountry] = useState(0)
    const [BranchFax, setBranchFax] = useState(0)
    const [BranchPhone, setBranchPhone] = useState(0)
    const [BranchUrl, setBranchUrl] = useState(0)
    const [BranchIp, setBranchIp] = useState(0)
    const [GeoLocation, setGeoLocation] = useState(0)
    const [Library, setLibrary] = useState(0)


    useEffect( () => {
      if(BranchName==0){
      setBranchName(a);
      }
      if(BranchZip==0){
        setBranchZip(b);
        }
      if(BranchCity==0){
        setBranchCity(c);
        }
      if(BranchState==0){
        setBranchState(d);
        }
      if(BranchCountry==0){
        setBranchCountry(e);
        }
      if(BranchFax==0){
        setBranchFax(f);
        }
      if(BranchPhone==0){
        setBranchPhone(g);
        }
      if(BranchUrl==0){
        setBranchUrl(h);
        }
      if(GeoLocation==0){
        setGeoLocation(j);
        }
      if(BranchIp==0){
        setBranchIp(i);
        }
      if(Library==0){
        setLibrary(k);
        }
    });

    const [UpdateBranch] = useMutation(UPDATE_BRANCH,{
        onCompleted(data) {
            const {_id} = data
            console.log("id branch is:", _id)
            // Router.push("/");
        }
      });

     

      const onSubmitHandler = ()=>{ 
        event.preventDefault();
      UpdateBranch({
          variables: {
            Id: id,
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
        text: "Your branch has been updated",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/Branch/branches")
      })
      
    }
      
    
    
    if(data1 != null || data1 !== undefined ){
      if(data2 != null || data2 !== undefined ){
      return (
        <Container>
           {/* HTML VALIDATION  */}
        
          
              <div className="card-content">
                <div className="card-title">
                  <div className="row">
                    <div className="col s12 m6 l10">
                      <h4 className="card-title">Update a Branch</h4>
                    </div>
                    <div className="col s12 m6 l2">
                    </div>
                  </div>
                </div>
                <div id="html-view-validations">
                <form onSubmit={onSubmitHandler}>
                    <div className="row">
                      <div className="input-field col s12">
                        <Input required type="text" label="Name of the Branch*"
                        onChange={e => setBranchName(e.target.value)} value={BranchName}/>
                      </div>
  
                      <div className="input-field col s12">
                        <Input required type="number" label="CodeZip of the Branch*"
                        onChange={e => setBranchZip(e.target.value)} value={BranchZip}/>
                      </div>
  
                      <div className="input-field col s12">
  
                        <Input required type="text" label="The City of the Branch*" 
                        onChange={e => setBranchCity(e.target.value)} value={BranchCity}/>
                      </div>
  
  
                      <div className="input-field col s12">
                        <Input  required type="text" label="The State of the Branch*"
                        onChange={e => setBranchState(e.target.value)} value={BranchState}/>
                      </div>
  
  
                      <div className="input-field col s12">
                        <Input label="The country of the Branch*" required type="text" 
                        onChange={e => setBranchCountry(e.target.value)} value={BranchCountry}/>
                      </div>
  
  
                      <div className="input-field col s12">
                        <Input label="Branch Fax"  type="text" 
                        onChange={e => setBranchFax(e.target.value)} value={BranchFax}/>
                      </div>
  
  
                      <div className="input-field col s12">
                        <Input label ="Branch phone number*" required type="text" 
                        onChange={e => setBranchPhone(e.target.value)} value={BranchPhone}/>
                      </div>
  
  
                      <div className="input-field col s12">
                        <Input label="URL of the Branch"  type="text" 
                        onChange={e => setBranchUrl(e.target.value)} value={BranchUrl}/>
                      </div>
  
  
                      <div className="input-field col s12">
                        <Input label="The ip of the Branch"  type="text" 
                        onChange={e => setBranchIp(e.target.value)} value={BranchIp}/>
                      </div>
  
                      <div className="input-field col s12">
                        <Input label="The geolocalisation address of the Branch"  type="text" 
                        onChange={e => setGeoLocation(e.target.value)} value={GeoLocation}/>
                      </div>
          
                  
                      <div className="input-field col s12">
                          <SelectBox  className="validate" label={"Library *"}
                          onChange={e => setLibrary(e.target.value)} required>
                              
                          <option value  disabled >Choose your option </option>
                          
                          
                               
                              {data2.libraries.map((items1) => (
  
                              <option key={items1._id} selected={Library == items1._id}  value={items1._id}> {items1.Name}  </option>
                              
                              ))}
                           
                          
  
                          </SelectBox >
  
                          
                      </div>
                      
                      <div className="input-field col s12">
                        <button className="btn waves-effect waves-light right submit" type="submit" name="action">Update the Branch
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                    </div>
                 </form>
                </div>
              </div>
      
    
          
        </Container>
      );
    }}
  return <div>
loading ...
  </div>
  
    };


  



catalogingHome.Layout = AdminLayout
export default catalogingHome