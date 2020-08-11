import React  from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import {useRouter} from "next/router";
import {GET_SERIAL} from "../../../../../graphql/queries/admin/cataloguing/SerialQuerie";
import {useQuery} from "@apollo/react-hooks";
import Router from 'next/router';
const DisplaySerial = () => {
    const router = useRouter()
    const id = router.query.id;
    const { data: data }  = useQuery(GET_SERIAL, {
        variables: {Id: id},
        });
        var type

        if(data != null || data !== undefined ){
        
        switch(data.serial.Type) {
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

            

        
            return (
                <div className="row">
                <div className="col s12 m12 l12">
                    <div className="row vertical-modern-dashboard">

                        <div className="col s12 m8 l8 animate fadeLeft">
                            <div className="card">
                                <div className="card-content">
                                    <h4 className="card-title mb-0">Serial details :
                                        <a>{ data.serial.TitleProper}</a>

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
                                           

                                            <div className="chip">{data.serial.Responsibility[0].Author.name_auth} </div>
                                            <div className="chip">{data.serial.Responsibility[0].Function.value} </div>
                                        </div>
                                        <h6><a href="#" className="mt-5">Publisher : </a></h6>
                                        <div className="row">
                                            
                                            <div className="chip">{data.serial.Publishers.name} </div>
                                            
                                        </div>
                                        <h6><a href="#" className="mt-5">Type : {}</a></h6>
                                        <div className="row">
                                           
                                            <div className="chip">
                                                <span>{type}</span>
                                            </div>
                                        </div>
                                    </div>

                                        <table
                                            className="table responsive-table ">
                                            <tbody>
                                                <tr>
                                                    <td>Other Title Informations:</td>
                                                    <td>{data.serial.OtherTitleInfo}</td>
                                                </tr>
                                                <tr>
                                                    <td>Parallel title :</td>
                                                    <td>{data.serial.ParallelTitle}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Note On Contents :</td>
                                                    <td>{data.serial.NoteOnContents}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Summary :</td>
                                                    <td>{data.serial.Summary}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>General note :</td>
                                                    <td>{data.serial.GenetalNote}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Other publishers :</td>
                                                    <td>
                                                    
                                                    <span className="  chip green lighten-5 green-text">
                                                   { data.serial.OtherPublishers.name} </span> </td>
                                                </tr>
                                                <tr>
                                                    <td>Languages :</td>
                                                    <td>
                                                    
                                                   { data.serial.Language.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.Value}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Original Languages :</td>
                                                    <td>
                                                    
                                                   { data.serial.OriginalLanguage.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.Value}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Key Words :</td>
                                                    <td>
                                                    
                                                   { data.serial.KeyWords.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.Word}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Categories :</td>
                                                    <td>
                                                    
                                                   { data.serial.Category.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.name}  </span>))} </td>
                                                </tr>
                                                <tr>
                                                    <td>Branches :</td>
                                                    <td>
                                                    
                                                   { data.serial.Branches.map((items) => (
                                                    <span className="  chip green lighten-5 green-text">
                                                    {items.BranchName}  </span>))} </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Class Number :</td>
                                                    <td>
                                                    
                                                   { data.serial.ClassNumber.map((items) => (
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


                                
                                <div className="row chip_value centered-element">
                                    
                                    <div className="chip">
                                        <span>ISSN : {data.serial.ISSN}</span></div>
                                    <div className="chip">
                                        <span> {data.serial.RecYear}</span>
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


DisplaySerial.Layout = AdminLayout
export default DisplaySerial
