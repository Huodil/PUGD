import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import Container from '../../../../../components/ui/Container'
import {UPDATE_COPY} from '../../../../../graphql/mutations/admin/cataloguing/Copy-mutation.js';
import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/react-hooks";
import SelectBox from "../../../../../components/ui/SelectBox";
import DatePicker from "../../../../../components/ui/DatePicker/DatePicker";
import Input from "../../../../../components/ui/Input";
import {GET_RECORD_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/RecordQuerie";
import {GET_LIBRARY_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/LibraryQuerie";
import {GET_ALL_SECTIONS} from "../../../../../graphql/queries/admin/administration/SectionQueries";
import {GET_ALL_OWNERS} from "../../../../../graphql/queries/admin/administration/OwnerQuerie";
import {GET_MEDIATYPES} from "../../../../../graphql/queries/admin/administration/MediatypeQuerie";
import {GET_ALL_STATUS} from "../../../../../graphql/queries/admin/administration/StatusQuerie";
import {GET_COPY} from "../../../../../graphql/queries/admin/cataloguing/CopyQuerie";
import {GET_ALL_CODE_STATUS} from "../../../../../graphql/queries/admin/administration/codeStatic.Queris";
import {useRouter} from "next/router";
import Router from "next/router";
import Swal from 'sweetalert2'
const UpdateCopy = () => {
    const router = useRouter()
    const id = router.query.id;

  
  const { data: data1 }   = useQuery( GET_RECORD_ALL_FIELDS);
  const { data: data2 }  = useQuery( GET_LIBRARY_ALL_FIELDS);
  const { data: data3 }  = useQuery( GET_ALL_SECTIONS);
  const { data: data4}  = useQuery( GET_ALL_OWNERS);
  const { data: data5 }  = useQuery( GET_MEDIATYPES);
  const { data: data6 }  = useQuery( GET_ALL_STATUS);
  const { data: data8 }  = useQuery( GET_ALL_CODE_STATUS);
  const { data: data7 }  = useQuery(GET_COPY, {
    variables: {Id: id},
    });
    if(data7 != null || data7 !== undefined ){
      
        var BareCodeInitial = data7.copy.BareCode
        var PriceInitial= data7.copy.Price
        var ReplacementPriceInitial= data7.copy.ReplacementPrice
        var DateLastBorrowedInitial= data7.copy.DateLastBorrowed
        var DateLastSeenInitial= data7.copy.DateLastSeen
        var StackInitial= data7.copy.Stack
        var NoteForLoanInitial= data7.copy.NoteForLoan
        var WithDrawnInitial= data7.copy.WithDrawn
        var ReservesInitial= data7.copy.Reserves
        var RestrictedInitial= data7.copy.Restricted
        var CopyNumberInitial= data7.copy.CopyNumber
        var NewStatusInitial= data7.copy.NewStatus
        var RecordInitial= data7.copy.Record._id
        var LocalisationInitial= data7.copy.Localisation._id
        var CoteInitial= data7.copy.Cote
        var MediaTypeInitial= data7.copy.MediaType._id
        var OwnerInitial= data7.copy.Owner._id
        var SectionInitial= data7.copy.Section._id
        var StatusInitial= data7.copy.Status._id
        var CodeStaticInitial= data7.copy.CodeStatic._id

    }else{
        var BareCodeInitial = ''
        var PriceInitial= ''
        var ReplacementPriceInitial= ''
        var DateLastBorrowedInitial= ''
        var DateLastSeenInitial= ''
        var StackInitial= ''
        var NoteForLoanInitial= false
        var WithDrawnInitial= false
        var ReservesInitial= ''
        var RestrictedInitial= ''
        var CopyNumberInitial= ''
        var NewStatusInitial= ''
        var RecordInitial= ''
        var LocalisationInitial= ''
        var CoteInitial= ''
        var MediaTypeInitial= ''
        var OwnerInitial= ''
        var SectionInitial= ''
        var StatusInitial= ''
        var CodeStaticInitial= ''
    }

    const [BareCode, setBareCode] = useState(0)
    const [Price, setPrice] = useState(0)
    const [ReplacementPrice, setReplacementPrice] = useState(0)
    const [DateLastBorrowed, setDateLastBorrowed] = useState(0)
    const [DateLastSeen, setDateLastSeen] = useState(0)
    const [Stack, setStack] = useState(0)
    const [NoteForLoan, setNoteForLoan] = useState(7)
    const [WithDrawn, setWithDrawn] = useState(7)
    const [Reserves, setReserves] = useState(0)
    const [Restricted, setRestricted] = useState(0)
    const [CopyNumber, setCopyNumber] = useState(0)
    const [NewStatus, setNewStatus] = useState(0)
    const [Record, setRecord] = useState(0)
    const [Localisation, setLocalisation] = useState(0)
    const [Cote, setCote] = useState(0)
    const [MediaType, setMediaType] = useState(0)
    const [Owner, setOwner] = useState(0)
    const [Section, setSection] = useState(0)
    const [Status, setStatus] = useState(0)
    const [CodeStatic, setCodeStatic] = useState(0)

    useEffect( () => {
      if(CodeStatic==0){
        setCodeStatic(CodeStaticInitial);
    }
        if(BareCode==0){
            setBareCode(BareCodeInitial);
        }
        if(Price==0){
            setPrice(PriceInitial);
        }
        if(ReplacementPrice==0){
            setReplacementPrice(ReplacementPriceInitial);
        }
        if(DateLastBorrowed==0){
            
            setDateLastBorrowed(DateLastBorrowedInitial);
        }
        if(DateLastSeen==0){
            setDateLastSeen(DateLastSeenInitial);
        }
        if(Stack==0){
            setStack(StackInitial);
        }
        if(NoteForLoan==7){
            setNoteForLoan(NoteForLoanInitial);
        }
        if(WithDrawn==7){
            setWithDrawn(WithDrawnInitial);
        }
        if(Reserves==0){
            setReserves(ReservesInitial);
        }
        if(Restricted==0){
            setRestricted(RestrictedInitial);
        }
        if(CopyNumber==0){
            setCopyNumber(CopyNumberInitial);
        }
        if(NewStatus==0){
            setNewStatus(NewStatusInitial);
        }
        if(Record==0){
            setRecord(RecordInitial);
        }
        if(Localisation==0){
            setLocalisation(LocalisationInitial);
        }
        if(Cote==0){
            setCote(CoteInitial);
        }
        if(MediaType==0){
            setMediaType(MediaTypeInitial);
        }
        if(Owner==0){
            setOwner(OwnerInitial);
        }
        if(Section==0){
            setSection(SectionInitial);
        }
        if(Status==0){
            setStatus(StatusInitial);
        }
      });

    const [UpdateCopy] = useMutation(UPDATE_COPY,{
        onCompleted(data) {
            const {_id} = data
            console.log("id branch is:", _id)
            // Router.push("/");
        }
      });
      

      
    
    const onSubmitHandler = ()=>{
      event.preventDefault();  
        UpdateCopy({
          variables: {
            Id: id,
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
            CodeStatic : CodeStatic,
            Section :          Section,
            Owner :            Owner,
            MediaType :        MediaType,
            Status :           Status,
          }
      });
      Swal.fire({
        title: 'Success',
        text: "Your copy has been updated",
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
                if(data8 != null || data8 !== undefined ){
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
       
                      <Input label ="Bare Code*" required  type="text" 
                      onChange={e => setBareCode(e.target.value)} value={BareCode}/>
                    </div>


                    <div className="input-field col s6">
                     
                      <Input label ="Cote*" required type="text" 
                      onChange={e => setCote(e.target.value)} value={Cote}/>
                    </div>
 

                    <div className="input-field col s6">
                    
                      <Input label ="Price*" required  type="number"  
                      onChange={e => setPrice(e.target.value)} value={Price}/>
                    </div>

                    <div className="input-field col s6">
              
                      <Input label ="Replacement Price*" required  type="number" 
                      onChange={e => setReplacementPrice(e.target.value)} value={ReplacementPrice}/>
                    </div>


                    <div className="input-field col s6">
                    
                      <DatePicker  className="validate" required label="Date Last Borrowed*"
                      onChange={e => setDateLastBorrowed(e.target.value)} value={DateLastBorrowed}/>
                    </div>


                    <div className="input-field col s6">
                     
                      <DatePicker  className="validate" required label="Date Last Seen *"
                      onChange={e => setDateLastSeen(e.target.value)} value={DateLastSeen}/>
                    </div>
                    </div>
                    <br />
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>


                    <div className="input-field col s12">
                    
                      <Input label ="Stack"  type="text" 
                      onChange={e => setStack(e.target.value)} value={Stack}/>
                    </div>


                    <div className="input-field col s12">
                    
                      <Input label ="Reserves*"  required type="number" 
                      onChange={e => setReserves(e.target.value)} value={Reserves}/>
                    </div>


                    <div className="input-field col s12">
                   
                      <Input label ="Restricted"   type="text" 
                      onChange={e => setGeoLocation(e.target.value)} value={Restricted}/>
                    </div>


                    <div className="input-field col s12">
          
                      <Input label ="Copy Number*" required type="number" 
                      onChange={e => setCopyNumber(e.target.value)} value={CopyNumber}/>
                    </div>

                    <div className="input-field col s12">
            
                      <Input label ="New Status*" required type="text" 
                      onChange={e => setNewStatus(e.target.value)} value={NewStatus}/>
                    </div>



                    </div>
                    <br />
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
        
                
                    <div className="input-field col s12">
                        <SelectBox className="validate" label={"Record *"}
                        onChange={e => setRecord(e.target.value)} required>
                            
                        <option value disabled >Choose your option</option>
                        
                        
                             
                            {data1.records.map((items) => (

                            <option key={items._id} selected={Record == items._id} 
                             value={items._id}> {items.Title} </option>
                            
                            ))}
                         
                            </SelectBox >
                            </div>

                    
                            <div className="input-field col s6">
                        <SelectBox className="validate" label={"Code Static *"}
                        onChange={e => setCodeStatic(e.target.value)} required>
                            
                        
                        
                        
                             
                            {data8.GetAllCodeStatics.map((items) => (

                            <option key={items._id} selected={CodeStatic == items._id}  value={items._id}> {items.static_name} </option>
                            
                            ))}
                         
                            </SelectBox >
                            </div>


                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Localisation *"}
                         onChange={e => setLocalisation(e.target.value)}  required>
                            
                                <option value  disabled >Choose your option</option>
                                {data2.libraries.map((items) => (

                              <option key={items._id} selected={LocalisationInitial == items._id} 
                               value={items._id}> {items.Name} </option>

                              ))}
                              </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Media Type *"}
                         onChange={e => setMediaType(e.target.value)}>
                            
                                <option value  disabled >Choose your option</option>
                                {data5.GetAllMediaTypes.map((items) => (

                                <option key={items._id} selected={MediaType == items._id} 
                                 value={items._id}> {items.media_types_name} </option>

                                ))}
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Owner *"}
                         onChange={e => setOwner(e.target.value)}>
                            
                                <option value  disabled >Choose your option</option>
                                {data4.GetAllOwners.map((items) => (

                                <option key={items._id} selected={Owner == items._id} 
                                 value={items._id}> {items.owner_name} </option>

                                ))}
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Section *"}
                         onChange={e => setSection(e.target.value)}>
                            
                            <option value  disabled >Choose your option</option>
                                {data3.GetAllSections.map((items) => (

                                <option key={items._id} selected={Section == items._id}
                                 value={items._id}> {items.section_name} </option>

                                ))}
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox className="validate" label={"Status *"}
                         onChange={e => setStatus(e.target.value)}>
                            
                          <option value  disabled >Choose your option</option>
                          {data6.GetAllStatus.map((items) => (

                            <option key={items._id} selected={StatusInitial == items._id}
                             value={items._id}> {items.status_name} </option>

                            ))}     
                        </SelectBox >
                    </div>

                    </div>

                            <div className="input-field col s12">
                        <label>
                        <input type="checkbox" defaultChecked={NoteForLoanInitial}

                        
                        
                         onChange={e => setNoteForLoan(!NoteForLoan)} />
                        <span>Note For Loan</span>
                        </label>
                        <br />
                    
                    </div>
                    
                    <div className="input-field col s12">
                        <label>
                        <input type="checkbox" defaultChecked={WithDrawnInitial} 
                        onChange={e => setWithDrawn(!WithDrawn)} />
                        <span>With Drawn</span>
                        </label>
                    </div>
                        
                
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit"  name="action">Update the Copy
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
loading ...</div>

  };

  UpdateCopy.Layout = AdminLayout;
  export default UpdateCopy;