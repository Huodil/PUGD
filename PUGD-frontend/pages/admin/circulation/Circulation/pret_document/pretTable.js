import React from 'react'
import {FullDate, splitfunction} from "../../../../../shared/_herlpersCirculation/_helpers";
import Button from "../../../../../components/ui/Button";

class PretTable extends React.Component {
    onClick() {
        console.log("prolongatiaon cliked");
    }
    render() {
        return <React.Fragment>
            <div className="row">
                <div className="col s12 m3 l2">
                    <a href="#" className="float-left">
                        <h5 className="display-inline">
                            {this.props.title}
                        </h5>
                    </a>
                </div>
                <div className="col s12 m9 l7">
                    <Button className="btn waves-effect waves-light blue darken-2 " rounded={5}
                            onClick={this.onClick.bind(this)}
                    >
                        Prolonger
                    </Button>
                </div>
            </div>
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Bare code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Support & COTE</th>
                            <th scope="col">Localisation & Section</th>
                            <th scope="col">Date Pret & Retour Initial</th>
                            <th scope="col">PROLONGATION</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.All_Pret != null || this.props.All_Pret !== undefined ? this.props.All_Pret.map(function Component(props) {
                        return (
                            <tr key={splitfunction(props.copy._id)}>
                                <td><span>{props.copy.BareCode}</span></td>
                                <td>
                                    <div className="chip task display-bloc text-darken-1">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                            alt="Materialize"/>
                                        {props.copy.Record.Title}
                                    </div>
                                </td>
                                <td>

                                <span className="chip center white-text deep-purple  task display-block">
                                    {props.copy.MediaType && props.copy.MediaType.media_types_name}
                                </span>
                                    <span className="chip center teal white-text task display-block">{
                                        props.copy.Cote ? props.copy.Cote : "-"
                                    }</span>
                                </td>
                                <td>
                            <span className="chip center white-text light-blue darken-4 display-block">
                                {props.copy.Section && props.copy.Section.section_name}
                            </span>
                                    <span className="chip center teal white-text task display-block">
                                {props.copy.Localisation && props.copy.Localisation.Name}
                            </span>

                                </td>
                                <td>
                            <span className="chip center whit black-text task display-block">
                                <b>{
                                    FullDate(props.date_init)
                                }</b>
                            </span>

                                    <span className="chip center whit black-text task display-block">
                                <b>{
                                    FullDate(props.date_retour)
                                }</b>
                            </span>
                                </td>
                                <td>

                                    <Button className="btn waves-effect waves-light blue darken-2"
                                            rounded={5}>Prolonger</Button>

                                    <span className="chip center teal white-text task display-block">
                            <b>{FullDate(props.date_prolongement)}</b>
                        </span>
                                </td>

                                {/*<a
                        href="#"
                        className="invoice-action-view mr-4"
                        onClick={(e) => {
                            deleteOnecopy({
                                variables: { _id: splitfunction(item._id) },
                                refetchQueries: [
                                    { query: copy},
                                ],
                            });
                        }}
                    >
                        <i className="material-icons">delete</i>
                    </a>
                    <a
                        href={`/admin/circulation/Circulations/pret_document/UpdateBorrowers?id=${(
                            item._id
                        )}`}
                        className="invoice-action-edit"
                    >
                        <i className="material-icons">edit</i>
                    </a>*/}
                            </tr>
                        );
                    }) : <p></p>}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    }

}

/*const PretTable = (props) => {
    const {All_Pret} = props
    const {title} = props
    let {AllProlonged, setAllProlonged} = useState(false)

    const onHandlerProlongation = () => {
        setAllProlonged = true
        console.log("prolongation : ", AllProlonged)
    }

    return <React.Fragment>
        <div className="row">
            <div className="col s12 m3 l2">
                <a href="#" className="float-left">
                    <h5 className="display-inline">
                        {title}
                    </h5>
                </a>
            </div>
            <div className="col s12 m9 l7">

                <Button className="btn waves-effect waves-light blue darken-2 " rounded={5}
                        onClick={onHandlerProlongation}
                >
                    Prolonger
                </Button>


            </div>


        </div>
        <div>
            <table className="table table-bordered">

                <thead>
                <tr>
                    <th>Bare code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Support & COTE</th>
                    <th scope="col">Localisation & Section</th>
                    <th scope="col">Date Pret & Retour Initial</th>

                    <th scope="col">PROLONGATION</th>


                </tr>
                </thead>
                <tbody>
                {All_Pret != null || All_Pret !== undefined ? All_Pret.map(function Component(props) {
                    return (
                        <tr key={splitfunction(props.copy._id)}>
                            <td><span>{props.copy.BareCode}</span></td>
                            <td>
                                <div className="chip task display-bloc text-darken-1">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2015/11/22/15/09/hummingbird-1056383_1280.jpg"
                                        alt="Materialize"/>
                                    {props.copy.Record.Title}
                                </div>
                            </td>
                            <td>

                                <span className="chip center white-text deep-purple  task display-block">
                                    {props.copy.MediaType && props.copy.MediaType.media_types_name}
                                </span>
                                <span className="chip center teal white-text task display-block">{
                                    props.copy.Cote ? props.copy.Cote : "-"
                                }</span>
                            </td>
                            <td>
                            <span className="chip center white-text light-blue darken-4 display-block">
                                {props.copy.Section && props.copy.Section.section_name}
                            </span>
                                <span className="chip center teal white-text task display-block">
                                {props.copy.Localisation && props.copy.Localisation.Name}
                            </span>

                            </td>
                            <td>
                            <span className="chip center whit black-text task display-block">
                                <b>{
                                    FullDate(props.date_init)
                                }</b>
                            </span>

                                <span className="chip center whit black-text task display-block">
                                <b>{
                                    FullDate(props.date_retour)
                                }</b>
                            </span>
                            </td>
                            <td>

                                <Button className="btn waves-effect waves-light blue darken-2"
                                        rounded={5}>Prolonger</Button>

                                <span className="chip center teal white-text task display-block">
                            <b>{FullDate(props.date_prolongement)}</b>
                        </span>
                            </td>

                            {/!*<a
                        href="#"
                        className="invoice-action-view mr-4"
                        onClick={(e) => {
                            deleteOnecopy({
                                variables: { _id: splitfunction(item._id) },
                                refetchQueries: [
                                    { query: copy},
                                ],
                            });
                        }}
                    >
                        <i className="material-icons">delete</i>
                    </a>
                    <a
                        href={`/admin/circulation/Circulations/pret_document/UpdateBorrowers?id=${(
                            item._id
                        )}`}
                        className="invoice-action-edit"
                    >
                        <i className="material-icons">edit</i>
                    </a>*!/}
                        </tr>
                    );
                }) : <p></p>}
                </tbody>
            </table>
        </div>
    </React.Fragment>
}*/
export default PretTable;
