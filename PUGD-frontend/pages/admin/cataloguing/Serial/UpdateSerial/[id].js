import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import Container from '../../../../../components/ui/Container'
import {UPDATE_SERIAL} from '../../../../../graphql/mutations/admin/cataloguing/Serial-mutation';
import {useQuery, useMutation} from "@apollo/react-hooks";
import SelectBox from "../../../../../components/ui/SelectBox";
import Input from "../../../../../components/ui/Input";
import {GET_KEYWORD_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/KeyWordQuerie";
import {GET_LANGUAGE_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/LanguageQuerie";
import {GET_BRANCH_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/BranchQuerie";
import {GET_PUBLISHER} from "../../../../../graphql/queries/admin/authorities/publisher.queries";
import {GET_CLASS_NUMBER} from "../../../../../graphql/queries/admin/authorities/class_number.queries";
import {GET_AUTHOR} from "../../../../../graphql/queries/admin/authorities/author.queries";
import {GET_FUNCTION_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/FunctionQuerie";
import {GET_CATEGORY} from "../../../../../graphql/queries/admin/authorities/category.queries";
import {GET_SERIAL} from "../../../../../graphql/queries/admin/cataloguing/SerialQuerie";
import {useRouter} from "next/router"
import Router from "next/router";
import Swal from 'sweetalert2'
const UpdateSerial = () => {
    const router = useRouter()
    const id = router.query.id;
     
    const { data: data1 }   = useQuery( GET_LANGUAGE_ALL_FIELDS);
    const { data: data2 }  = useQuery( GET_KEYWORD_ALL_FIELDS);
    const { data: data3 }  = useQuery( GET_BRANCH_ALL_FIELDS);
    const { data: data4 }  = useQuery( GET_SERIAL, {variables: {Id: id},});
    const { data: data6 }  = useQuery( GET_PUBLISHER);
    const { data: data8 }  = useQuery( GET_CLASS_NUMBER);
    const { data: data10 }  = useQuery( GET_AUTHOR);
    const { data: data11 }  = useQuery( GET_FUNCTION_ALL_FIELDS);
    const { data: data9 }  = useQuery( GET_CATEGORY);

    if(data4 != null || data4 !== undefined ){
        var issnInitial = data4.serial.ISSN
        var TitleProperInitial = data4.serial.TitleProper
        var OtherTitleInfoInitial = data4.serial.OtherTitleInfo
        var ParallelTitleInitial = data4.serial.ParallelTitle
        var RecYearInitial = data4.serial.RecYear
        var TypeInitial = data4.serial.Type
        var SummaryInitial = data4.serial.Summary
        var VisibleInSerialInitial = data4.serial.ViewSerialCheckIn
        var ViewSerialCheckInInitial = data4.serial.ViewSerialCheckIn
        var NoteOnContentsInitial = data4.serial.NoteOnContents
        var GenetalNoteInitial = data4.serial.GenetalNote
        /*  ***  */
        var LanguageInitial = []
        data4.serial.Language.map((items) => (
          LanguageInitial.push(items._id)
        ))
        /*  ***  */
        var OriginalLanguageInitial = []
        data4.serial.OriginalLanguage.map((items) => (
          OriginalLanguageInitial.push(items._id)
        ))
        /*  ***  */
        var KeyWordsInitial = []
        data4.serial.KeyWords.map((items) => (
            KeyWordsInitial.push(items._id)
        ))
        /*  ***  */
        var BranchesInitial = []
        data4.serial.Branches.map((items) => (
          BranchesInitial.push(items._id)
        ))
        /*  ***  */
        var ClassNumberInitial = []
        data4.serial.ClassNumber.map((items) => (
          ClassNumberInitial.push(items._id)
        ))
        /*  ***  */
        var CategoriesInitial = []
        data4.serial.Category.map((items) => (
          CategoriesInitial.push(items._id)
        ))
        var PublishersInitial = data4.serial.Publishers._id
        var OtherPublishersInitial = data4.serial.OtherPublishers._id
        var AuthorInitial 
        var FunctionInitial 
        
        if(data4.serial.Responsibility != null || data4.serial.Responsibility !== undefined ){
            
            data4.serial.Responsibility.map((items) => (
                AuthorInitial = items.Author._id,
                FunctionInitial = items.Function._id
            ))
            
        }
        

    }else{
        var issnInitial = ''
        var TitleProperInitial = ''
        var OtherTitleInfoInitial = ''
        var ParallelTitleInitial = ''
        var RecYearInitial = ''
        var TypeInitial = ''
        var SummaryInitial = ''
        var VisibleInSerialInitial = false
        var ViewSerialCheckInInitial = false
        var NoteOnContentsInitial = ''
        var GenetalNoteInitial = ''
        var LanguageInitial = []
        var OriginalLanguageInitial = []
        var KeyWordsInitial = []
        var BranchesInitial = []
        var PublishersInitial = ''
        var OtherPublishersInitial = ''
        var ClassNumberInitial = []
        var CategoriesInitial = []
        var AuthorInitial = ''
        var FunctionInitial = ''
    }
 

    const [issn, setIssn] = useState(0)
    const [TitleProper, seTitleProper] = useState(0)
    const [OtherTitleInfo, setOtherTitleInfo] = useState(0)
    const [ParallelTitle, setParallelTitle] = useState(0)
    const [RecYear, setRecYear] = useState(0)
    const [Type, setType] = useState(0)
    const [Summary, setSummary] = useState(0)
    const [VisibleInSerial, setVisibleInSerial] = useState(7)
    const [ViewSerialCheckIn, setViewSerialCheckIn] = useState(7)
    const [NoteOnContents, setNoteOnContents] = useState(0)
    const [GenetalNote, setGenetalNote] = useState(0)
    const [Language, setLanguage] = useState([])
    const [OriginalLanguage, setOriginalLanguage] = useState([])
    const [KeyWords, setKeyWords] = useState([])
    const [Branches, setBranches] = useState([])
    const [Branches1, setBranches1] = useState(0)
    const [Language1, setLanguage1] = useState(0)
    const [KeyWords1, setKeyWords1] = useState(0)
    const [OriginalLanguage1, setOriginalLanguage1] = useState(0)
    const [Publishers, setPublishers] = useState(0)
    const [OtherPublishers, setOtherPublishers] = useState(0)
    const [ClassNumber, setClassNumber] = useState([])
    const [ClassNumber1, setClassNumber1] = useState(0)
    const [Categories, setCategories] = useState([])
    const [Categories1, setCategories1] = useState(0)
    const [Author, setAuthor] = useState(0)
    const [Function, setFunction] = useState(0)

    useEffect( () => {
        if(issn==0){
            setIssn(issnInitial);
        }
        if(TitleProper==0){
            seTitleProper(TitleProperInitial);
        }
        if(TitleProper==0){
            seTitleProper(TitleProperInitial);
        }
        if(OtherTitleInfo ==0){
            setOtherTitleInfo(OtherTitleInfoInitial);
        }
        if(ParallelTitle ==0){
            setParallelTitle(ParallelTitleInitial);
        }
        if(RecYear==0){               
            setRecYear(RecYearInitial);
        }
        if(Type==0){
            setType(TypeInitial);
        }
        if(Summary==0){
            setSummary(SummaryInitial);
        }
        if(VisibleInSerial==7){
            setVisibleInSerial(VisibleInSerialInitial);
        }
        if(ViewSerialCheckIn==7){
            setViewSerialCheckIn(ViewSerialCheckInInitial);
        }
        if(NoteOnContents==0){
            setNoteOnContents(NoteOnContentsInitial);
        }
        if(GenetalNote==0){
            setGenetalNote(GenetalNoteInitial);
        }
        if(Publishers==0){
            setPublishers(PublishersInitial);
        }
        if(OtherPublishers==0){
            setOtherPublishers(OtherPublishersInitial);
        }
        if(Author==0){
            setAuthor(AuthorInitial);
        }
        if(Function==0){
            setFunction(FunctionInitial);
        }
        if(Branches1==0){
          setBranches1(BranchesInitial);
        }
        if(Language1==0){
          setLanguage1(LanguageInitial);
        }
        if(KeyWords1==0){
          setKeyWords1(KeyWordsInitial);
        }
        if(Categories1==0){
          setCategories1(CategoriesInitial);
        }
        if(OriginalLanguage1==0){
          setOriginalLanguage1(OriginalLanguageInitial);
        }
        if(ClassNumber1==0){
          setClassNumber1(ClassNumberInitial);
        }
          });

         
          const p = []
          const m = []
          const n = []
          const o = []

          if(Branches1!=0){    
           Branches1.map((items) => (
           m.push(items.split("\"")[1]))) 
          }
  
          if(Language1!=0){
            Language1.map((items) => (
            n.push(items.split("\"")[1]))) 
          }
  
          if(KeyWords1!=0){
            KeyWords1.map((items) => (
            o.push(items.split("\"")[1]))) 
          }
  
  
          if(OriginalLanguage1!=0){
            OriginalLanguage1.map((items) => (
            p.push(items.split("\"")[1]))) 
          } 
  
          
          let Responsibilities = []
        if (Author!= null && Author!= undefined &&  Function!= null && Function!= undefined){
          if (Author!= 0 &&  Function!= 0) {
            
            Responsibilities[0] = Author +"|" + Function.split("\"")[1] 


            
            
          }}

    const [UpdateSerial] = useMutation(UPDATE_SERIAL);
      
     const onSubmitHandler = ()=>{
      event.preventDefault();
      UpdateSerial({
          variables: {
            Id:id,
            ISSN: issn,
            TitleProper: TitleProper,
            OtherTitleInfo: OtherTitleInfo,
            ParallelTitle: ParallelTitle,
            RecYear: RecYear,
            Type: Type,
            Summary: Summary,
            VisibleInSerial: VisibleInSerial,
            ViewSerialCheckIn: ViewSerialCheckIn,
            NoteOnContents: NoteOnContents,
            GenetalNote: GenetalNote,
            Branches: m,
            KeyWords : o,
            Language : n,
            OriginalLanguage : p,
            Publishers : Publishers,
            OtherPublishers:OtherPublishers,
            ClassNumber:ClassNumber1,
            Responsibility:Responsibilities,
            Category:Categories1, 
          }
      });
      Swal.fire({
        title: 'Success',
        text: "Your Serial has been updated",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        Router.push("/admin/cataloguing/Serial/Serials") 
      })
    }
    
    if(data1 != null || data1 !== undefined ){
      if(data2 != null || data2 !== undefined ){
        if(data3 != null || data3 !== undefined ){
          if(data6 != null || data6 !== undefined ){
            if(data8 != null || data8 !== undefined ){
              if(data10 != null || data10 !== undefined ){
                if(data11 != null || data11 !== undefined ){
                  if(data9 != null || data9 !== undefined ){
                    if(data4 != null || data4 !== undefined ){
    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Update Serial</h4>
                  </div>
                  <div className="col s12 m6 l2">
                  </div>
                </div>
              </div>
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                  <div className="input-field col s6">
                      
                      <SelectBox className="validate" required  type="text" 
                      onChange={e => setType(e.target.value)}>
                       <option value="a" selected={Type == "a"}>printed text</option>
                        <option value="b" selected={Type == "b"}>manuscript text</option>
                        <option value="c" selected={Type == "c"}>musical score - printed</option>
                        <option value="d" selected={Type == "d"}>musical score - manuscript</option>
                        <option value="e" selected={Type == "e"}>cartographic document - printed</option>
                        <option value="f" selected={Type == "f"}>cartographic document - manuscript</option>
                        <option value="g" selected={Type == "g"}>video, projectable document</option>
                        <option value="i" selected={Type == "i"}>sound recording - non musical</option>
                        <option value="j" selected={Type == "j"}>sound recording - musical</option>
                        <option value="k" selected={Type == "k"}>2D graphical document</option>
                        <option value="l" selected={Type == "l"}>electronic document</option>
                        <option value="m" selected={Type == "m"}>multimedia document</option>
                        <option value="r" selected={Type == "r"}>3D object, artifact, ...</option>
                        </SelectBox>
                    </div> </div>

                    
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Title</h6>

                    <div className="input-field col s12">
    
                      <Input label="Title proper *" required type="text" 
                      onChange={e => seTitleProper(e.target.value)} value={TitleProper}/>
                    </div>

                    <div className="input-field col s12">

                      <Input label="Parallel title"   type="text" 
                      onChange={e => setParallelTitle(e.target.value)} value={ParallelTitle}/>
                    </div>

                    <div className="input-field col s12">
           
                      <Input label="Other title information"   type="text" 
                      onChange={e => setOtherTitleInfo(e.target.value)} value={OtherTitleInfo}/>
                    </div> </div>

                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Responsibility</h6>
                    <div className="input-field col s6">
                        <SelectBox onChange={e => setAuthor(e.target.value)} required
                         className="validate" label={"Primary author *"}>
                            
                        <option value disabled >Choose your option</option>
                        { data10.author.map((items) => (

                          <option key={items._id} selected={Author == items._id} value={items._id}> {items.name_auth} </option>

                          )) }
                        </SelectBox >
                    </div>
                    <div className="input-field col s6">
                        <SelectBox  onChange={e => setFunction(e.target.value)} required
                         className="validate" label={"Function *"}>
                            
                        <option value disabled >Choose your option</option>
                        { data11.functions.map((items) => (

                            <option key={items._id} selected={Function == items._id} value={items._id}> {items.value} </option>

                            )) }
                        </SelectBox >
                    </div>
                    </div>

                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >Publishers</h6>

    
              <div className="input-field col s6">
                        <SelectBox  className="validate" 
                        label={"Publisher *"} onChange={e => setPublishers(e.target.value)}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data6.publisher.map((items) => (

                            <option key={items._id} selected={Publishers == items._id} value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                    </div>


                    <div className="input-field col s6">
                        <SelectBox  className="validate" 
                        label={"Other Publisher *"} onChange={e => setOtherPublishers(e.target.value)}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data6.publisher.map((items) => (

                            <option key={items._id} selected={OtherPublishers == items._id} value={items._id}> {items.name} </option>
                            )) }
                        </SelectBox >
                    </div> 

                    <div className="input-field col s12">
              
                      <Input label="Year*" type="number" required onChange={e => setRecYear(e.target.value)} value={RecYear}/>
                    </div>

                    </div>


                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >ISSN</h6>

                    <div className="input-field col s12">
                  
                      <Input label="ISSN*" type="text" required
                      onChange={e => setIssn(e.target.value)} value={issn}/>
                    </div>

                    </div>

                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Notes</h6>
                    <div className="input-field col s12">
                    
                      <Input label="General note*" required  type="text" 
                      onChange={e => setGenetalNote(e.target.value)} value={GenetalNote}/>
                    </div>

                    
                    <div className="input-field col s12">
            
                      <Input label="Note On Contents" type="text" 
                      onChange={e => setNoteOnContents(e.target.value)} value={NoteOnContents}/>
                    </div> 

                    <div className="input-field col s12">
          
                      <Input label="Summary" required  type="text" 
                      onChange={e => setSummary(e.target.value)} value={Summary}/>
                    </div>

                   </div>



                    

                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Indexing</h6>



                    <div className="input-field col s6">
                        <SelectBox  multiple={true} className="validate" label={"KeyWords *"}
                         setInstance={setKeyWords} onChange={e => setKeyWords1(KeyWords.getSelectedValues())} required>
                            
                        <option value disabled >Choose your option</option>
                        {data2.keywords.map((items) => (

                            <option key={items._id} selected={ KeyWordsInitial.includes(items._id) } value={items._id}> {items.Word} </option>

                            )) }
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox  multiple  setInstance={setBranches} className="validate" 
                        label={"Branches *"} onChange={e => setBranches1(Branches.getSelectedValues())}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data3.branches.map((items) => (

                            <option key={items._id} selected={ BranchesInitial.includes(items._id) } value={items._id}> {items.BranchName} </option>

                            )) }
                        </SelectBox >
                    </div>
            

                    <div className="input-field col s6">
                        <SelectBox   multiple setInstance={setClassNumber} className="validate" 
                        label={"Class Numbers *"} onChange={e => setClassNumber1(ClassNumber.getSelectedValues())}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data8.class_number.map((items) => (

                            <option key={items._id} selected={ ClassNumberInitial.includes(items._id) } value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox   multiple required className="validate" setInstance={setCategories}
                         onChange={e => setCategories1(Categories.getSelectedValues())}  label={"Categories *"}>
                            
                        <option value disabled >Choose your option</option>
                        {data9.category_authority.map((items) => (

                        <option key={items._id} selected={ CategoriesInitial.includes(items._id) } value={items._id}> {items.name} </option>

                        )) }
                        </SelectBox >
                    </div>
                    
                    
                    
                     </div>



                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Language of publication</h6>
              
                    <div className="input-field col s6">
                        <SelectBox   multiple  label={"Language *"} className="validate" required 
                         setInstance={setLanguage} onChange={e => setLanguage1(Language.getSelectedValues())}>
                            
                        <option value disabled >Choose your option</option>
                        { data1.languages.map((items) => (

                            <option key={items._id} selected={ LanguageInitial.includes(items._id) } value={items._id}> {items.Value} </option>

                            )) }
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox  multiple className="validate" label={"Original Language *"} required
                        setInstance={setOriginalLanguage} onChange={e => setOriginalLanguage1(OriginalLanguage.getSelectedValues())}>
                            
                        <option value disabled >Choose your option</option>
                        {data1.languages.map((items) => (

                            <option key={items._id} selected={ OriginalLanguageInitial.includes(items._id) } value={items._id}> {items.Value} </option>

                            )) }
                        </SelectBox >
                    </div></div>

              
                    <div className="row" >

        
                    <div className="input-field col s12">
                        <label>
                        <input type="checkbox" defaultChecked={VisibleInSerialInitial}  onChange={e => setVisibleInSerial(!VisibleInSerial)}  />
                        <span>Visible in the serial browser</span>
                        </label>
                        <br />
                    
                    </div>
                    
                    <div className="input-field col s12">
                        <label>
                        <input type="checkbox" defaultChecked={ViewSerialCheckInInitial}  onChange={e => setViewSerialCheckIn(!ViewSerialCheckIn)}  />
                        <span>View serials check-in in OPAC</span>
                        </label>
                    </div>

                    
                   
        
                    
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right submit" type="submit" name="action">Update the Serial
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
              </form>
              </div>
            </div>
    

        
      </Container>
    );
  }}}}}}}}}
  return <div>
loading ...  </div>

  };

  UpdateSerial.Layout = AdminLayout;
  export default UpdateSerial;