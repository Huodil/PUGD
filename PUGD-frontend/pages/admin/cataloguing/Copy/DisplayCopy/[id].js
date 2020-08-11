import React  from 'react'
import AdminLayout from '../../../../../components/adminLayout'
import {useRouter} from "next/router";
import {GET_COPY} from "../../../../../graphql/queries/admin/cataloguing/CopyQuerie";
import {useQuery} from "@apollo/react-hooks";
import Router from 'next/router';
const DisplayCopy = () => {
    const router = useRouter()
    const id = router.query.id;
    const { data: data }  = useQuery(GET_COPY, {
        variables: {Id: id},
        });
        var type



         
        if(data != null || data !== undefined ){
        
        switch(data.copy.Record.Type) {
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
                                    <h4 className="card-title mb-0">Copy details :
                                        <a key={data.copy._id}>{ data.copy.Record.Title}</a>

                                        <a className="mb-6 chip float-right" type="button">
                                            <i className="material-icons">chat</i>
                                        </a>
                                        <a className="mb-6 chip float-right" type="button">
                                            <i className="material-icons">chat</i>
                                        </a>
                                        <a className="mb-6 chip float-right" onClick={(e) => {Router.push("/admin/cataloguing/Copy/DisplayCopy/[id]",
                                             "/admin/cataloguing/Copy/DisplayCopy/" + id)}} type="button">
                                            <i  className="material-icons">edit</i>
                                        </a>
                                    </h4>
                                    <div className="total-transaction-container">

                                        <h6><a href="#" className="mt-5">Authors</a></h6>
                                        <div className="row">
                                          

                                            <div className="chip">{data.copy.Record.Responsibility[0].Author.name_auth} </div>
                                            <div className="chip">{data.copy.Record.Responsibility[0].Function.value} </div>
                                        </div>
                                        <h6><a href="#" className="mt-5">Publisher : </a></h6>
                                        <div className="row">
                                           
                                            <div className="chip">{data.copy.Record.Publishers.name} </div>
                                            
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
                                                    <td>Localisation</td>
                                                    <td>{data.copy.Localisation.Name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Stack</td>
                                                    <td>{data.copy.Stack}</td>
                                                </tr>
                                                <tr>
                                                    <td>Section</td>
                                                    <td>{data.copy.Section.section_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cote</td>

                                                    <td><span
                                                        className="  chip green lighten-5 green-text">{data.copy.Cote}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Statut</td>
                                                    <td>{data.copy.Status.status_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date last borrowed</td>
                                                    <td>{data.copy.DateLastBorrowed}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date last seen</td>
                                                    <td>{data.copy.DateLastSeen}</td>
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
                                    {data.copy.Price} DH
                                    </a>
                                </div>
                                <div className="row chip_value centered-element">
                                    <div className="chip">
                                        <span>P: {data.copy.Record.NbPages}</span>
                                    </div>
                                    <div className="chip">
                                        <span>ISBN : {data.copy.Record.ISBN}</span></div>
                                    <div className="chip">
                                        <span> {data.copy.Record.RecYear}</span>
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


DisplayCopy.Layout = AdminLayout
export default DisplayCopy
