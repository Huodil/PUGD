import React from 'react'
import Table from "@/components/ui/Table/Table";
import moment from "moment";

const ListReservation = (props) => {
    const dateFormat = "DD-MM-YYYY"
    const nul = <span style={{color:'#d60e28'}}>No Group finder</span>;

    const imageClick = () => {
        console.log('Click');
    }
    return <div className="row">
        <div className="col s12">
            <Table  Thead={
                <tr>
                    <td></td>
                    <td>Titre</td>
                    <td>Emprunteur </td>
                    <td>Rang</td>
                    <td>réservation</td>
                    <td>retour prevu</td>
                    <td>Fin validité</td>
                    <td>Sélection</td>
                </tr>
            } Tbody={
                props.datamap.map((res)=>{
                    // eslint-disable-next-line react/jsx-key
                    return <React.Fragment>
                        <tr>
                            <td></td>
                            <td width="250">

                                    <a href="#" className="chip gradient darken-1-text avatar">
                                        <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                             alt="users view avatar" className="z-depth-2 circle"
                                             height="20" width="20"/>
                                             <span>{res.Record.Title}s</span>
                                    </a>
                                   {/* <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                         alt="Materialize"
                                         onClick={() => imageClick()}
                                         id={res.Record._id}
                                    />*/}



                                {/*todo add cote form grahql*/}
                                <span className="display-block chip green lighten-5 green-text">
                                    COTE : 9DEL
                                </span>
                            </td>
                            <td width="250">
                                <div className="chip text-darken-1">
                                    <img src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                         alt="Materialize"/>
                                    {res.Borrwore.fullname}
                                </div>
                                <span className="task display-block"> Bibliothèque PMB Services</span>
                            </td>

                            <td>{res.Rank}</td>
                            <td className="" width="40">
                                <span className="task-cat teal accent-4 display-block">{moment(res.dateres).format(dateFormat)}</span>
                            </td>
                            <td >
                                <span className="task-cat red accent-2 display-block">24-05-2020</span>
                            </td>

                            <td>
                                <span className="task-cat red accent-2 display-block">24-05-2020</span>
                            </td>
                            <td>H9</td>
                        </tr>
                    </React.Fragment>
                })
            }/>
        </div>
    </div>

}
// export default withApollo({ssr:true})(AllGroups)

export default ListReservation
