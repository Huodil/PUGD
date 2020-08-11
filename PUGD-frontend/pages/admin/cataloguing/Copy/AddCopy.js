import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import Container from '../../../../components/ui/Container'
import {ADD_COPY} from '../../../../graphql/mutations/admin/cataloguing/Copy-mutation.js';
import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/react-hooks";
import SelectBox from "../../../../components/ui/SelectBox";
import DatePicker from "../../../../components/ui/DatePicker/DatePicker";
import {GET_RECORD_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/RecordQuerie";
import {GET_LIBRARY_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/LibraryQuerie";
import {GET_ALL_SECTIONS} from "../../../../graphql/queries/admin/administration/SectionQueries";
import {GET_ALL_OWNERS} from "../../../../graphql/queries/admin/administration/OwnerQuerie";
import {GET_MEDIATYPES} from "../../../../graphql/queries/admin/administration/MediatypeQuerie";
import {GET_ALL_STATUS} from "../../../../graphql/queries/admin/administration/StatusQuerie";
import {GET_ALL_CODE_STATUS} from "../../../../graphql/queries/admin/administration/codeStatic.Queris";
import Router from "next/router";
import Swal from 'sweetalert2'
const AddCopy = () => {
  const { data: data1 }   = useQuery( GET_RECORD_ALL_FIELDS);
  const { data: data2 }  = useQuery( GET_LIBRARY_ALL_FIELDS);
  const { data: data3 }  = useQuery( GET_ALL_SECTIONS);
  const { data: data4}  = useQuery( GET_ALL_OWNERS);
  const { data: data5 }  = useQuery( GET_MEDIATYPES);
  const { data: data6 }  = useQuery( GET_ALL_STATUS);
  const { data: data7 }  = useQuery( GET_ALL_CODE_STATUS);

    const [BareCode, setBareCode] = useState('')
    const [Price, setPrice] = useState('')
    const [ReplacementPrice, setReplacementPrice] = useState('')
    const [DateLastBorrowed, setDateLastBorrowed] = useState(new Date())
    const [DateLastSeen, setDateLastSeen] = useState(new Date())
    const [Stack, setStack] = useState('')
    const [NoteForLoan, setNoteForLoan] = useState(false)
    const [WithDrawn, setWithDrawn] = useState(false)
    const [Reserves, setReserves] = useState('')
    const [Restricted, setGeoLocation] = useState('')
    const [CopyNumber, setCopyNumber] = useState('')
    const [NewStatus, setNewStatus] = useState('')
    const [Record, setRecord] = useState('')
    const [Localisation, setLocalisation] = useState('')
    const [Cote, setCote] = useState('')
    const [MediaType, setMediaType] = useState('')
    const [CodeStatic, setCodeStatic] = useState('')
    const [Owner, setOwner] = useState('')
    const [Section, setSection] = useState('')
    const [Status, setStatus] = useState('')
    const [AddCopy] = useMutation(ADD_COPY);

    
    const onSubmitHandler = ()=>{
      event.preventDefault();
        AddCopy({
          variables: {
            BareCode : BareCode,
            Price : Price,
            ReplacementPrice : ReplacementPrice,
            DateLastBorrowed : DateLastBorrowed,
            DateLastSeen : DateLastSeen,
            Stack : Stack,
            NoteForLoan : NoteForLoan,
            WithDrawn : WithDrawn,
            Reserves : Reserves,
            Restricted : Restricted,
            CopyNumber  : CopyNumber,
            NewStatus  : NewStatus,
            Record : Record.split("\"")[1],
            Localisation : Localisation.split("\"")[1],
            Cote : Cote,
            Section :          Section,
            Owner :            Owner,
            MediaType :        MediaType,
            Status :           Status,
            CodeStatic : CodeStatic,
          }
      });

      Swal.fire({
        title: 'Success',
        text: "Your copy has been added",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/Copy/copies")
      })

    }
   
    if(data1 != null || data1 !== undefined ){
      if(data2 != null || data2 !== undefined ){
        if(data3 != null || data3 !== undefined ){
          if(data4 != null || data4 !== undefined ){
            if(data5 != null || data5 !== undefined ){
              if(data6 != null || data6 !== undefined ){
                if(data7 != null || data7 !== undefined ){
    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Add a new Copy</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <div className="input-field col s6">
                      <label >Bare Code*</label>
                      <input className="validate" required  type="text" 
                      onChange={e => setBareCode(e.target.value)} value={BareCode}/>
                    </div>


                    <div className="input-field col s6">
                      <label >Cote*</label>
                      <input className="validate" required type="text" 
                      onChange={e => setCote(e.target.value)} value={Cote}/>
                    </div>
 

                    <div className="input-field col s6">
                      <label >Price*</label>
                      <input className="validate" required  type="number"  
                      onChange={e => setPrice(e.target.value)} value={Price}/>
                    </div>

                    <div className="input-field col s6">
                      <label >Replacement Price</label>
                      <input className="validate" required  type="number" 
                      onChange={e => setReplacementPrice(e.target.value)} value={ReplacementPrice}/>
                    </div>


                    <div className="input-field col s6">
                    
                      <DatePicker className="validate" required label="Date Last Borrowed*"
                      onChange={e => setDateLastBorrowed(e.target.value)} />
                    </div>


                    <div className="input-field col s6">
                     
                      <DatePicker className="validate" required label="Date Last Seen"
                      onChange={e => setDateLastSeen(e.target.value)} />
                    </div>
                    </div>
                    <br />
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>


                    <div className="input-field col s12">
                      <label >Stack</label>
                      <input className="validate"  type="text" 
                      onChange={e => setStack(e.target.value)} value={Stack}/>
                    </div>


                    <div className="input-field col s12">
                      <label >Reserves*</label>
                      <input className="validate" required  type="number" 
                      onChange={e => setReserves(e.target.value)} value={Reserves}/>
                    </div>


                    <div className="input-field col s12">
                      <label >Restricted</label>
                      <input className="validate"   type="text" 
                      onChange={e => setGeoLocation(e.target.value)} value={Restricted}/>
                    </div>


                    <div className="input-field col s12">
                      <label >Copy Number *</label>
                      <input className="validate"  type="number" required
                      onChange={e => setCopyNumber(e.target.value)} value={CopyNumber}/>
                    </div>

                    <div className="input-field col s12">
                      <label>New Status</label>
                      <input className="validate"  type="text" 
                      onChange={e => setNewStatus(e.target.value)} value={NewStatus}/>
                    </div>



                    </div>
                    <br />
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
        
                
                    <div className="input-field col s12">
                        <SelectBox className="validate" label={"Record"}
                        onChange={e => setRecord(e.target.value)} required>
                            
                        <option value disabled >Choose your option</option>
                        
                        
                             
                            {data1.records.map((items) => (

                            <option key={items._id}  value={items._id}> {items.Title} </option>
                            
                            ))}
                         
                            </SelectBox >
                            </div>


                            <div className="input-field col s6">
                        <SelectBox className="validate" label={"Code Static"}
                        onChange={e => setCodeStatic(e.target.value)} required>
                            
                        <option value selected disabled >Choose your option</option>
                        
                        
                             
                            {data7.GetAllCodeStatics.map((items) => (

                            <option key={items._id}  value={items._id}> {items.static_name} </option>
                            
                            ))}
                         
                            </SelectBox >
                            </div>


                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Localisation"}
                         onChange={e => setLocalisation(e.target.value)}  required>
                            
                                <option value selected disabled >Choose your option</option>
                                {data2.libraries.map((items) => (

                              <option key={items._id}  value={items._id}> {items.Name} </option>

                              ))}
                              </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Media Type"}
                         onChange={e => setMediaType(e.target.value)}>
                            
                                <option value selected disabled >Choose your option</option>
                                {data5.GetAllMediaTypes.map((items) => (

                                <option key={items._id}  value={items._id}> {items.media_types_name} </option>

                                ))}
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Owner"}
                         onChange={e => setOwner(e.target.value)}>
                            
                                <option value selected disabled >Choose your option</option>
                                {data4.GetAllOwners.map((items) => (

                                <option key={items._id}  value={items._id}> {items.owner_name} </option>

                                ))}
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Section"}
                         onChange={e => setSection(e.target.value)}>
                            
                            <option value selected disabled >Choose your option</option>
                                {data3.GetAllSections.map((items) => (

                                <option key={items._id}  value={items._id}> {items.section_name} </option>

                                ))}
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Status"}
                         onChange={e => setStatus(e.target.value)}>
                            
                          <option value selected disabled >Choose your option</option>
                          {data6.GetAllStatus.map((items) => (

                            <option key={items._id}  value={items._id}> {items.status_name} </option>

                            ))}     
                        </SelectBox >
                    </div>

                    </div>

                            <div className="input-field col s12">
                        <label>
                        <input type="checkbox" onChange={e => setNoteForLoan(!NoteForLoan)}  />
                        <span>Note For Loan</span>
                        </label>
                        <br />
                    
                    </div>
                    
                    <div className="input-field col s12">
                        <label>
                        <input type="checkbox" onChange={e => setWithDrawn(!WithDrawn)}/>
                        <span>With Drawn</span>
                        </label>
                    </div>
                        
                
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit"  name="action">Add the Copy
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  
               </form>
              </div>
            </div>
    

        
      </Container>
    );
}}}}}}}
return <div>
loading ...
</div>

  };

  AddCopy.Layout = AdminLayout;
  export default AddCopy;