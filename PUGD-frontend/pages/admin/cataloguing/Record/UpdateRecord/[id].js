import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import Container from '../../../../../components/ui/Container'
import {UPDATE_RECORD} from '../../../../../graphql/mutations/admin/cataloguing/Record-mutation.js';
import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/react-hooks";
import SelectBox from "../../../../../components/ui/SelectBox";
import Input from "../../../../../components/ui/Input";
import TextArea from "../../../../../components/ui/TextArea";
import {useRouter} from "next/router"
import {GET_KEYWORD_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/KeyWordQuerie";
import {GET_LANGUAGE_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/LanguageQuerie";
import {GET_BRANCH_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/BranchQuerie";
import {GET_SERIES} from "../../../../../graphql/queries/admin/authorities/series.queries";
import {GET_PUBLISHER} from "../../../../../graphql/queries/admin/authorities/publisher.queries";
import {GET_SUB_SERIES} from "../../../../../graphql/queries/admin/authorities/sub_series.queries";
import {GET_UNIFORM_TITLE} from "../../../../../graphql/queries/admin/authorities/uniform_title.queries";
import {GET_CLASS_NUMBER} from "../../../../../graphql/queries/admin/authorities/class_number.queries";
import {GET_CATEGORY} from "../../../../../graphql/queries/admin/authorities/category.queries";
import {GET_AUTHOR} from "../../../../../graphql/queries/admin/authorities/author.queries";
import {GET_FUNCTION_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/FunctionQuerie";
import {GET_RECORD} from "../../../../../graphql/queries/admin/cataloguing/RecordQuerie";
import Router from "next/router";
import Swal from 'sweetalert2'
const UpdateRecord = () => {
   

    const router = useRouter()
    const id = router.query.id;


    const { data: data1 }   = useQuery( GET_LANGUAGE_ALL_FIELDS);
    const { data: data2 }  = useQuery( GET_KEYWORD_ALL_FIELDS);
    const { data: data3 }  = useQuery( GET_BRANCH_ALL_FIELDS);
    const { data: data4 }  = useQuery( GET_SERIES);
    const { data: data5 }  = useQuery( GET_SUB_SERIES);
    const { data: data6 }  = useQuery( GET_PUBLISHER);
    const { data: data7 }  = useQuery( GET_UNIFORM_TITLE);
    const { data: data8 }  = useQuery( GET_CLASS_NUMBER);
    const { data: data9 }  = useQuery( GET_CATEGORY);
    const { data: data10 }  = useQuery( GET_AUTHOR);
    const { data: data11 }  = useQuery( GET_FUNCTION_ALL_FIELDS);
    const { data: data12 }  = useQuery( GET_RECORD, {variables: {Id: id},});


    if(data12 != null || data12 !== undefined ){
        var isbnInitial = data12.record.ISBN
        var TitleInitial = data12.record.Title
        var OtherTitleInitial = data12.record.OtherTitle
        var ParallelTitleInitial = data12.record.ParallelTitle
        var RecYearInitial = data12.record.RecYear
        var TypeInitial = data12.record.Type
        var EditionStatementInitial = data12.record.EditionStatement
        var OtherInformationsInitial = data12.record.OtherInformations
        var FormatInitial = data12.record.Format
        var SummaryInitial = data12.record.Summary
        var NoteOnContentsInitial = data12.record.NoteOnContents
        var ItemStatusInitial = data12.record.ItemStatus
        var IsNewInitial = data12.record.IsNew
        var IsNumInitial = data12.record.IsNum
        var AccMaterialInitial = data12.record.AccMaterial
        var NoteAuthorInitial = data12.record.NoteAuthor
        var NbPageslInitial = data12.record.NbPages
        var PriceInitial = data12.record.Price
        /*  ***  */
        var LanguageInitial = []
        data12.record.Language.map((items) => (
          LanguageInitial.push(items._id)
        ))
        /*  ***  */
        var OriginalLanguageInitial = []
        data12.record.OriginalLanguage.map((items) => (
          OriginalLanguageInitial.push(items._id)
        ))
        /*  ***  */
        var KeyWordsInitial = []
        data12.record.KeyWords.map((items) => (
            KeyWordsInitial.push(items._id)
        ))
        /*  ***  */
        var BranchesInitial = []
        data12.record.Branches.map((items) => (
          BranchesInitial.push(items._id)
        ))
        /*  ***  */
        var ClassNumberInitial = []
        data12.record.ClassNumber.map((items) => (
          ClassNumberInitial.push(items._id)
        ))
        /*  ***  */
        var CategoriesInitial = []
        data12.record.Category.map((items) => (
          CategoriesInitial.push(items._id)
        ))
        /*  ***  */
        var CollectionTitleInitial = []
        data12.record.CollectionTitle.map((items) => (
            CollectionTitleInitial.push(items._id)
          ))
        var FkSeriesInitial = data12.record.FkSeries._id
        var FkSubSeriesInitial = data12.record.FkSubSeries._id

        var PublishersInitial = data12.record.Publishers._id
        var OtherPublishersInitial = data12.record.OtherPublishers._id

        var AuthorInitial 
        var FunctionInitial 
        
        if(data12.record.Responsibility != null || data12.record.Responsibility !== undefined ){
            
            data12.record.Responsibility.map((items) => (
                AuthorInitial = items.Author._id,
                FunctionInitial = items.Function._id
            ))
            
        }
        console.log("author", AuthorInitial)
        console.log("function", FunctionInitial)
        

    }else{
        var isbnInitial = ''
        var TitleInitial = ''
        var OtherTitleInitial = ''
        var ParallelTitleInitial = ''
        var RecYearInitial = 0
        var TypeInitial = ''
        var EditionStatementInitial = ''
        var OtherInformationsInitial = ''
        var FormatInitial = ''
        var SummaryInitial = ''
        var NoteOnContentsInitial = ''
        var ItemStatusInitial = ''
        var IsNewInitial = false
        var IsNumInitial = false
        var AccMaterialInitial = ''
        var NoteAuthorInitial = ''
        var NbPageslInitial = 0
        var LanguageInitial = []
        var OriginalLanguageInitial = []
        var KeyWordsInitial = []
        var BranchesInitial = []
        var PublishersInitial = ''
        var OtherPublishersInitial = ''
        var ClassNumberInitial = []
        var CategoriesInitial = []
        var PriceInitial = 0
        var AuthorInitial = ''
        var FunctionInitial = ''
        var FkSeriesInitial = ''
        var FkSubSeriesInitial = ''
        var CollectionTitleInitial = ''
    }

    const [isbn, setIsbn] = useState(0)
    const [title, setTitle] = useState(0)
    const [OtherTitle, setOtherTitle] = useState(0)
    const [ParallelTitle, setParallelTitle] = useState(0)
    const [RecYear, setRecYear] = useState(0)
    const [Price, setPrice] = useState(0)
    const [Type, setType] = useState(0)
    const [EditionStatement, setEditionStatement] = useState(0)
    const [OtherInformations, setOtherInformations] = useState(0)
    const [Format, setFormat] = useState(0)
    const [Summary, setSummary] = useState(0)
    const [NoteOnContents, setNoteOnContents] = useState(0)
    const [ItemStatus, setItemStatus] = useState(0)
    const [IsNew, setIsNew] = useState(7)
    const [IsNum, setIsNum] = useState(7)
    const [AccMaterial, setAccMaterial] = useState(0)
    const [NoteAuthor, setNoteAuthor] = useState(0)
    const [NbPages, setNbPages] = useState(0)
    const [Language, setLanguage] = useState([])
    const [OriginalLanguage, setOriginalLanguage] = useState([])
    const [KeyWords, setKeyWords] = useState([])
    const [Branches, setBranches] = useState([])
    const [Branches1, setBranches1] = useState(0)
    const [Language1, setLanguage1] = useState(0)
    const [KeyWords1, setKeyWords1] = useState(0)
    const [OriginalLanguage1, setOriginalLanguage1] = useState(0)
    const [Serie, setSerie] = useState(0)
    const [SubSerie, setSubSerie] = useState(0)
    const [Publishers, setPublishers] = useState(0)
    const [OtherPublishers, setOtherPublishers] = useState(0)
    const [ClassNumber, setClassNumber] = useState([])
    const [ClassNumber1, setClassNumber1] = useState(0)
    const [CollectionTitle, setCollectionTitle] = useState([])
    const [CollectionTitle1, setCollectionTitle1] = useState(0)
    const [Categories, setCategories] = useState([])
    const [Categories1, setCategories1] = useState(0)
    const [Author, setAuthor] = useState(0)
    const [Function, setFunction] = useState(0)
    /* **** */

    useEffect( () => {
        if(isbn==0){
            setIsbn(isbnInitial);
        }
        if(title==0){
            setTitle(TitleInitial);
        }
        if(OtherTitle ==0){
            setOtherTitle(OtherTitleInitial);
        }
        if(ParallelTitle ==0){
            setParallelTitle(ParallelTitleInitial);
        }
        if(RecYear==0){               
            setRecYear(RecYearInitial);
        }
        if(Type==0){
            setType(TypeInitial);
            console.log(Type)
        }
        if(Summary==0){
            setSummary(SummaryInitial);
        }
        if(NoteOnContents==0){
          setNoteOnContents(NoteOnContentsInitial);
        }
        if(ItemStatus==0){
          setItemStatus(ItemStatusInitial);
        }
        if(EditionStatement==0){
            setEditionStatement(EditionStatementInitial);
        }
        if(OtherInformations==0){
            setOtherInformations(OtherInformationsInitial);
        }
        if(Format ==0){
            setFormat(FormatInitial);
        }
        if(Price ==0){
            setPrice(PriceInitial);
        }
        if(IsNew==7){
            setIsNew(IsNewInitial);
        }
        if(IsNum ==7){
            setIsNum(IsNumInitial);
        }
        if(AccMaterial==0){
            setAccMaterial(AccMaterialInitial);
        }
        if(NoteAuthor==0){
            setNoteAuthor(NoteAuthorInitial);
        }
        if(NbPages==0){
            setNbPages(NbPageslInitial);
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
        if(Serie==0){
            setSerie(FkSeriesInitial );
          }
        if(SubSerie==0){
        setSubSerie(FkSubSeriesInitial );
        }
        if(CollectionTitle1 ==0){
            setCollectionTitle1(CollectionTitleInitial);
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
  

          
     /* **** */

     /* ******** */
     let Responsibilities = []
        if (Author!= null && Author!= undefined &&  Function!= null && Function!= undefined){
          if (Author!= 0 &&  Function!= 0) {
     Responsibilities[0] = Author +"|" + Function.split("\"")[1]


          }}
     



    const [UpdateRecord] = useMutation(UPDATE_RECORD);
      
    const onSubmitHandler = ()=>{
      
      event.preventDefault();
        UpdateRecord({
          variables: {
            Id:id,
            isbn: isbn,
            title: title,
            OtherTitle: OtherTitle,
            ParallelTitle: ParallelTitle,
            RecYear: RecYear,
            Price : Price,
            Type: Type,
            EditionStatement: EditionStatement,
            OtherInformations: OtherInformations,
            Format: Format,
            Summary: Summary,
            NoteOnContents : NoteOnContents,
            ItemStatus : ItemStatus,
            IsNew: IsNew,
            IsNum: IsNum,
            AccMaterial: AccMaterial,
            NoteAuthor: NoteAuthor,
            NbPages: NbPages,
            Branches: m,
            KeyWords : o,
            Language : n,
            OriginalLanguage : p,
            FkSeries : Serie,
            FkSubSeries : SubSerie,
            Publishers : Publishers,
            OtherPublishers:OtherPublishers,
            CollectionTitle:CollectionTitle1,
            ClassNumber:ClassNumber1,
           Responsibility:Responsibilities,
              Category:Categories1, 
          }
      });
      Swal.fire({
        title: 'Success',
        text: "Your record has been updated",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        //Router.push("/admin/cataloguing/Record/Records")
      })
    }
    
  
   


    if(data1 != null || data1 !== undefined ){
      if(data2 != null || data2 !== undefined ){
        if(data3 != null || data3 !== undefined ){
          if(data4 != null || data4 !== undefined ){
            if(data5 != null || data5 !== undefined ){
              if(data6 != null || data6 !== undefined ){
                if(data7 != null || data7 !== undefined ){
                  if(data8 != null || data8 !== undefined ){
                    if(data9 != null || data9 !== undefined ){
                      if(data10 != null || data10 !== undefined ){
                        if(data11 != null || data11 !== undefined ){
                            if(data12 != null || data12 !== undefined ){
    return (
      <Container>
         {/* HTML VALIDATION  */}
      
        
            <div className="card-content">
              <div className="card-title">
                <div className="row">
                  <div className="col s12 m6 l10">
                    <h4 className="card-title">Update a Record</h4>
                  </div>
                  
                </div>
              </div>
              
              <div id="html-view-validations">
              <form onSubmit={onSubmitHandler}>
                  <div className="row">
                  
                   
                  <div className="input-field col s6">
                      
                      <SelectBox  required
                      onChange={e => setType(e.target.value)} >
                       <option value="a" key="a" selected={Type == "a"}>printed text</option>
                        <option value="b" key="b" selected={Type == "b"}>manuscript text</option>
                        <option value="c" key="c" selected={Type == "c"}>musical score - printed</option>
                        <option value="d" key="d" selected={Type == "d"}>musical score - manuscript</option>
                        <option value="e" key="e" selected={Type == "e"}>cartographic document - printed</option>
                        <option value="f" key="f" selected={Type == "f"}>cartographic document - manuscript</option>
                        <option value="g" key="g" selected={Type == "g"}>video, projectable document</option>
                        <option value="i" key="i" selected={Type == "i"}>sound recording - non musical</option>
                        <option value="j" key="j" selected={Type == "j"}>sound recording - musical</option>
                        <option value="h" key="h" selected={Type == "h"}>sound recording - musical</option>
                        <option value="k" key="k" selected={Type == "k"}>2D graphical document</option>
                        <option value="l" key="l" selected={Type == "l"}>electronic document</option>
                        <option value="m" key="m" selected={Type == "m"}>multimedia document</option>
                        <option value="r" key="r" selected={Type == "r"}>3D object, artifact, ...</option>
                        </SelectBox>
                    </div>

                    <div className="input-field col s12" >
                      
                      <Input className="validate" required  type="text" label="Title proper*"
                      onChange={e => setTitle(e.target.value)} value={title}/>
                    </div>
                   
                    <div className="input-field col s12">
                      <Input className="validate"   type="text" label="Other title information"
                      onChange={e => setOtherTitle(e.target.value)} value={OtherTitle}/>
                    </div>


                    <div className="input-field col s12">
                      <Input className="validate"  type="text" label="Parallel title"
                      onChange={e => setParallelTitle(e.target.value)} value={ParallelTitle}/>
                    </div>
                    </div>
                    
                  
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Responsibility</h6>
                    <div className="input-field col s6">
                        <SelectBox onChange={e => setAuthor(e.target.value)} required className="validate" label={"Primary author *"}>
                            
                        <option value disabled >Choose your option</option>
                        { data10.author.map((items) => (

                          <option key={items._id} selected={Author == items._id}  value={items._id}> {items.name_auth} </option>

                          )) }
                        </SelectBox >
                    </div>
                    <div className="input-field col s6">
                        <SelectBox required onChange={e => setFunction(e.target.value)} className="validate" label={"Function *"}>
                            
                        <option value disabled >Choose your option</option>
                        { data11.functions.map((items) => (

                            <option key={items._id} selected={Function == items._id} value={items._id}> {items.value} </option>

                            )) }
                        </SelectBox >
                    </div>
                   
                    </div>
                    
                   
              <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >Imprint</h6>
              <div className="input-field col s6">
                        <SelectBox className="validate" 
                        label={"Serie *"} onChange={e => setSerie(e.target.value)}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        { data4.series.map((items) => (

                            <option key={items._id} selected={FkSeriesInitial == items._id} value={items._id}> {items.title} </option>

                            )) }
                        </SelectBox >
                    </div>
                    <div className="input-field col s6">
                        <SelectBox  className="validate" required
                        label={"SubSerie *"} onChange={e => setSubSerie(e.target.value)}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data5.sub_series.map((items) => (

                            <option key={items._id} selected={FkSubSeriesInitial == items._id} value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox  className="validate" required
                        label={"Publishers *"} onChange={e => setPublishers(e.target.value)}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data6.publisher.map((items) => (

                            <option key={items._id} selected={PublishersInitial == items._id} value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                    </div>
                    <div className="input-field col s6">
                        <SelectBox  className="validate" required
                        label={"OtherPublishers *"} onChange={e => setOtherPublishers(e.target.value)}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        {data6.publisher.map((items) => (

                            <option key={items._id} selected={OtherPublishers == items._id} value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                        </div>
                        <div className="input-field col s6">
                      <Input type="number" required label="Year*" onChange={e => setRecYear(e.target.value)} value={RecYear}/>
                    </div>
                    <div className="input-field col s6">
                      <Input className="validate" required  type="text" label="Edition Statement*"
                      onChange={e => setEditionStatement(e.target.value)} value={EditionStatement}/>
                    </div>
                        
                        </div>
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >ISBN, EAN, Commercial no.</h6>
              <div className="input-field col s12">

                      <Input className="validate" required type="text" 
                      label="SBN, EAN, Commercial no.*"
                      onChange={e => setIsbn(e.target.value)} value={isbn}/>
                    </div></div>
                   
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >Collation</h6>

              <div className="input-field col s12">
                      <Input type="number" onChange={e => setNbPages(e.target.value)} value={NbPages}
                      label="Extent of item (number of pages, elements...)*" required/>
                    </div>

                    
                    <div className="input-field col s12">
                      <Input className="validate" required type="text" 
                      label="Other properties (illustrations, ...)" 
                      onChange={e => setOtherInformations(e.target.value)} value={OtherInformations}/>
                    </div>

                    <div className="input-field col s12">
  
                      <Input className="validate" required type="text" 
                      label="Format"
                      onChange={e => setFormat(e.target.value)} value={Format}/>
                    </div>

                    <div className="input-field col s12">
                      <Input type="number" onChange={e => setPrice(e.target.value)} required
                      label="Price*" value={Price}/>
                    </div>

                    <div className="input-field col s12">
                      <Input className="validate"  type="text" 
                      value="Accompanying materials"
                      onChange={e => setAccMaterial(e.target.value)} value={AccMaterial}/>
                    </div> </div>

                   


                    
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >Notes</h6>
                    
              <div className="input-field col s12">
                      <TextArea 
                      label="General note*" required
                      onChange={e => setNoteAuthor(e.target.value)} value={NoteAuthor}/>
                    </div> 

                    <div className="input-field col s12">
                      
                      <TextArea  label= "Note On Contents"
                      onChange={e => setNoteOnContents(e.target.value)} value={NoteOnContents}/>
                    </div> 

                    <div className="input-field col s12">
                      <TextArea  label="Summary"
                      onChange={e => setSummary(e.target.value)} value={Summary}/>
                    </div> 
                    
                    
                    </div>

                    
                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >Indexing</h6>
              <div className="input-field col s6">
                        <SelectBox className="validate" label={"KeyWords *"}
                         setInstance={setKeyWords} multiple onChange={e => setKeyWords1(KeyWords.getSelectedValues())} required>
                            
                        <option value disabled >Choose your option</option>
                        { data2.keywords.map((items) => (

                            <option key={items._id} selected={ KeyWordsInitial.includes(items._id) } value={items._id}> {items.Word} </option>

                            )) }
                        </SelectBox >
                    </div>



                    <div className="input-field col s6">
                        <SelectBox   multiple className="validate" setInstance={setCategories} required
                         onChange={e => setCategories1(Categories.getSelectedValues())}  label={"Categories *"}>
                            
                        <option value disabled >Choose your option</option>
                        { data9.category_authority.map((items) => (

                        <option key={items._id} selected={ CategoriesInitial.includes(items._id) } value={items._id}> {items.name} </option>

                        )) }
                        </SelectBox >
                    </div>



                    <div className="input-field col s6">
                        <SelectBox  required multiple setInstance={setBranches} className="validate" 
                        label={"Branches *"} onChange={e => setBranches1(Branches.getSelectedValues())}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        { data3.branches.map((items) => (

                            <option key={items._id} selected={ BranchesInitial.includes(items._id) } value={items._id}> {items.BranchName} </option>

                            )) }
                        </SelectBox >
                    </div>

                    


                 

                    <div className="input-field col s6">
                        <SelectBox  multiple setInstance={setClassNumber} className="validate" required
                        label={"Class Number *"} onChange={e => setClassNumber1(ClassNumber.getSelectedValues())}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        { data8.class_number.map((items) => (

                            <option key={items._id} selected={ ClassNumberInitial.includes(items._id) }  value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                    </div></div>


                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
              <h6  >Uniform Titles</h6>
                    <div className="input-field col s12">
                        <SelectBox multiple required setInstance={setCollectionTitle} className="validate" 
                        label={"Uniform Titles *"} onChange={e => setCollectionTitle1(CollectionTitle.getSelectedValues())}
                         required>
                            
                        <option value disabled >Choose your option</option>
                        { data7.uniform_title.map((items) => (

                            <option key={items._id} selected={ CollectionTitleInitial.includes(items._id) } value={items._id}> {items.name} </option>

                            )) }
                        </SelectBox >
                    </div> </div>


                    <div className="row" style={{backgroundColor: "#F8F8F8"}}>
                    <h6  >Language of publication</h6>
                    <div className="input-field col s6">
                        <SelectBox   multiple label={"Language of publication *"} className="validate" required
                         setInstance={setLanguage} onChange={e => setLanguage1(Language.getSelectedValues())}>
                            
                        <option value disabled >Choose your option</option>
                        {data1.languages.map((items) => (

                            <option key={items._id} selected={ LanguageInitial.includes(items._id) } value={items._id}> {items.Value} </option>

                            )) }
                        </SelectBox >
                    </div>

                    <div className="input-field col s6">
                        <SelectBox   multiple className="validate" label={"Original Language"} required
                        setInstance={setOriginalLanguage} onChange={e => setOriginalLanguage1(OriginalLanguage.getSelectedValues())} required>
                            
                        <option value disabled >Choose your option</option>
                        {data1.languages.map((items) => (

                            <option key={items._id} selected={ OriginalLanguageInitial.includes(items._id) } value={items._id}> {items.Value} </option>

                            )) }
                        </SelectBox >
                    </div></div>




                    <div className="row" >

                    <div className="input-field col s12">
                  
                  <SelectBox className="validate" required  type="text" 
                  onChange={e => setItemStatus(e.target.value)}
                  label="Item Status*">
                
                      <option value="4" selected={ItemStatus == "4"}>Documents numériques (réservés aux abonnés)</option>
                      <option value="3" selected={ItemStatus == "3"}>En commande</option>
                      <option value="5" selected={ItemStatus == "5"}>Invisible à l'OPAC</option>
                      <option value="2" selected={ItemStatus == "2"}>Prêt express</option>
                      <option value="1" selected={ItemStatus == "1"}>Sans statut particulier</option>

                    
                    </SelectBox>
                </div>

                    <div className="input-field col s12">
                        <label>
                        <input type="checkbox" defaultChecked={IsNewInitial} onChange={e => setIsNew(!IsNew)} v={console.log(!IsNew)}  />
                        <span>Is New record</span>
                        </label>
                        <br />
                    
                    </div>
                    
                    <div className="input-field col s12">
                        <label>
                        <input type="checkbox" onChange={e => setIsNum(!IsNum)} defaultChecked={IsNumInitial} v={console.log(!IsNum)} />
                        <span>Is num</span>
                        </label>
                    </div>

                    
                   
        
                
                    <div className="input-field col s12">
                        <button className="btn waves-effect waves-light right submit" onClick={onSubmitHandler} type="submit" name="action">Update the Record
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
              </form>
              </div>
            </div>
    

        
      </Container>
    );
  }}}}}}}}}}}}
  return <div>
loading ...
  </div>
  }; 

  UpdateRecord.Layout = AdminLayout;
  export default UpdateRecord;