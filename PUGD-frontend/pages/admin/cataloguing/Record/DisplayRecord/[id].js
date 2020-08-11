import React  from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import {useRouter} from "next/router";
import {GET_RECORD} from "../../../../../graphql/queries/admin/cataloguing/RecordQuerie";
import {useQuery} from "@apollo/react-hooks";
import Router from 'next/router';
const DisplayRecord = () => {
    const router = useRouter()
    const id = router.query.id;
    const { data: data }  = useQuery(GET_RECORD, {
        variables: {Id: id},
        });
        var type
        var Status

        if(data != null || data !== undefined ){
        
        switch(data.record.Type) {
            case "a":
              type = "printed text"
              break;
            case "b":
                type = "manuscript text"
              break;
              case "c":
                type = "musical score - printed"
                break;
              case "d":
                type = "musical score - manuscript"
              break;
              case "e":
                type = "cartographic document - printed"
              break;
              case "f":
                type = "cartographic document - manuscript"
              break;
              case "g":
                type = "video, projectable document"
              break;
              case "i":
                type = "sound recording - non musical"
              break;
              case "j":
                type = "sound recording - musical"
              break;
              case "k":
                type = "2D graphical document"
                break;
             case "l":
                type = "electronic document"
                break;
                case "m":
                    type = "multimedia document"
                    break;
            case "n":
                type = "3D object, artifact, ..."
                break;
            default:
                type = ""
          }

          switch(data.record.ItemStatus) {
            case "1":
                Status = "Sans statut particulier"
              break;
            case "2":
                Status = "Prêt express"
              break;
              case "3":
                Status = "En commande"
                break;
              case "4":
                Status = "Documents numériques (réservés aux abonnés)"
              break;
              case "5":
                Status = "Invisible à l'OPAC"
              break;
        
            default:
                Status = ""
          }

            

        
            return (
                <div className="row">
                <div className="col s12 m12 l12">
                    <div className="row vertical-modern-dashboard">

                        <div className="col s12 m8 l8 animate fadeLeft">
                            <div className="card">
                                <div className="card-content">
                                    <h4 className="card-title mb-0">Record details :
                                        <a>{ data.record.Title}</a>

                                        <a className="mb-6 chip float-right" type="button">
                                            <i className="material-icons">chat</i>
                                        </a>
                                        <a className="mb-6 chip float-right" type="button">
                                            <i className="material-icons">chat</i>
                                        </a>
                                        <a className="mb-6 chip float-right"  type="button">
                                            <i  className="material-icons">edit</i>
                                        </a>
                                    </h4>
                                    <div className="total-transaction-container">

                                        <h6><a href="#" className="mt-5">Authors</a></h6>
                                        <div className="row">
                                           

                                            <div className="chip">{data.record.Responsibility[0].Author.name_auth} </div>
                                            <div className="chip">{data.record.Responsibility[0].Function.value} </div>
                                        </div>
                                        <h6><a href="#" className="mt-5">Publisher : </a></h6>
                                        <div className="row">
                                            
                                            <div className="chip">{data.record.Publishers.name} </div>
                                            
                                        </div>
                                        <h6><a href="#" className="mt-5">Type : {}</a></h6>
                                        <div className="row">
                                           
                                            <div className="chip">
                                                <span>{type}</span>
                                            </div>
                                        </div>
                                        <h6><a href="#" className="mt-5">Item Status : {}</a></h6>
                                        <div className="row">
                                           
                                            <div className="chip">
                                                <span>{Status}</span>
                                            </div>
                                        </div>
                                    </div>

                                        <table
                                            className="table responsive-table ">
                                            <tbody>
                                                <tr>
                                                    <td>Other Title :</td>
                                                    <td>{data.record.OtherTitle}</td>
                                                </tr>
                                                <tr>
                                                    <td>Parallel title :</td>
                                                    <td>{data.record.ParallelTitle}</td>
                                                </tr>
                                                <tr>
                                                    <td>Editional statements :</td>
                                                    <td>{data.record.EditionStatement}</td>
                                                </tr>
                                                <tr>
                                                    <td>Other informations :</td>

                                                    <td>{data.record.OtherInformations}</td>
                                                </tr>
                                                <tr>
                                                    <td>Format :</td>
                                                    <td>{data.record.Format}</td>
                                                </tr>
                                                <tr>
                                                    <td>Accompanying materials :</td>
                                                    <td>{data.record.AccMaterial}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Summary :</td>
                                                    <td>{data.record.Summary}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>General note :</td>
                                                    <td>{data.record.NoteAuthor}</td>
                                                </tr>

                                                <tr>
                                                    <td>Note On Contents :</td>
                                                    <td>{data.record.NoteOnContents}</td>
                                                </tr>

                                                <tr>
                                                    <td>Series :</td>
                                                    <td>
                                                    <span className="  chip green lighten-5 green-text">
                                                   { data.record.FkSeries.title} </span></td>
                                                </tr>
                                                <tr>
                                                    <td>SubSerie :</td>
                                                    <td>
                                                    <span className="  chip green lighten-5 green-text">
                                                   { data.record.FkSubSeries.name} </span></td>
                                                </tr>
                                                <tr>
                                                    <td>Other publishers :</td>
                                                    <td>
                                                    
                                                    <span className="  chip green lighten-5 green-text">
                                                   { data.record.OtherPublishers.name} </span> </td>
                                                </tr>
                                                <tr>
                                                    <td>Languages :</td>
                                                    <td>
                                                    
                                                   { data.record.Language.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.Value}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Original Languages :</td>
                                                    <td>
                                                    
                                                   { data.record.OriginalLanguage.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.Value}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Key Words :</td>
                                                    <td>
                                                    
                                                   { data.record.KeyWords.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.Word}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Categories :</td>
                                                    <td>
                                                    
                                                   { data.record.Category.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.name}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Branches :</td>
                                                    <td>
                                                    
                                                   { data.record.Branches.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.BranchName}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Uniforme Titles :</td>
                                                    <td>
                                                    
                                                   { data.record.CollectionTitle.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.name}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Class Number :</td>
                                                    <td>
                                                    
                                                   { data.record.ClassNumber.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.name}  </span>))} </td>
                                                </tr>

                                            </tbody>
                                        </table>


                                    
                                </div>
                            </div>
                        </div>
                        <div className=" mt-2 col s12 m4 l4 animate fadeRight">
                            <div >
                                {/*for detilals ListNotice*/}


                                <div className=" chip_button border-non center">
                                    <a className="waves-effect waves-light btn gradient-45deg-red-pink box-shadow">
                                    {data.record.Price} DH
                                    </a>
                                </div>
                                <div className="row chip_value centered-element">
                                    <div className="chip">
                                        <span>P: {data.record.NbPages}</span>
                                    </div>
                                    <div className="chip">
                                        <span>ISBN : {data.record.ISBN}</span></div>
                                    <div className="chip">
                                        <span> {data.record.RecYear}</span>
                                    </div>

                                </div>
                                <div>
                                    <img className="responsive-img border-radius-8 "
                                         src="https://cdn.pixabay.com/photo/2016/11/29/04/45/aged-1867381_1280.jpg"
                                         alt="new"/>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
            
                
        );}
        return <div>
        loading ...</div>

  
}


DisplayRecord.Layout = AdminLayout
export default DisplayRecord
