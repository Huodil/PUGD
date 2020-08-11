import React, {useEffect, useState} from "react";
import AdminLayout from "../../../../adminLayout";
import Button from "../../../../ui/Button";
import Checkbox from "../../../../ui/Checkbox";
import SelectBox from "../../../../ui/SelectBox";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Input from "../../../../ui/Input";
import DatePicker from "../../../../ui/DatePicker/DatePicker";
import {INSERT_BORROWERS} from "../../../../../graphql/mutations/admin/circulation/Borrowers.mutation";
import Radio from "../../../../ui/Radio/Radio";
import ToggleSwitch from "../../../../ui/ToggleSwitch/ToggleSwitch";
import GridElement from "../../../../ui/Grid/GridElement";
import {GET_ALL_GROUPS} from "../../../../../graphql/queries/admin/Ciruclation/groups.query";
import Router from "next/router";
import Grid from '../../../../ui/Grid/Grid';
import {useTranslation} from "react-i18next";
import {GET_LIBRARY_ALL_FIELDS} from "../../../../../graphql/queries/admin/cataloguing/LibraryQuerie";
import {GET_ALL_STATIC_CODES} from "../../../../../graphql/queries/admin/administration/StaticCode.Queries";
import {GET_ALL_CATEGORIES_BORROWERS} from "../../../../../graphql/queries/admin/administration/CategoriesBorrowers.Queries";
import {
    AddDays,
    AddDaysToDate,
    addDaysToDate,
    splitfunction
} from "../../../../../shared/_herlpersCirculation/_helpers";
import {GET_ALL_STATUS_BORROWERS} from "../../../../../graphql/queries/admin/administration/StatusBorrowers.Queries";
import Loading from "../../Shared/Loading";


const Formulaire = () => {

    const {t, i18n} = useTranslation();

    const {data: groups} = useQuery(GET_ALL_GROUPS);
    const {data: locations} = useQuery(GET_LIBRARY_ALL_FIELDS);
    const {data: staticCodes} = useQuery(GET_ALL_STATIC_CODES);
    const {data: categoriesBorrowers} = useQuery(GET_ALL_CATEGORIES_BORROWERS);
    const {data: statusBorrowers} = useQuery(GET_ALL_STATUS_BORROWERS);

    if (
        groups !== undefined && groups !== null &&
        locations !== undefined && locations !== null &&
        staticCodes !== undefined && staticCodes !== null &&
        categoriesBorrowers !== undefined && categoriesBorrowers !== null &&
        statusBorrowers !== undefined && statusBorrowers !== null
    ){
        var loaclInit = splitfunction(locations.libraries[0]._id)
        var staticCodesInit = staticCodes.GetAllCodeStatics[0]._id
        var categoriesBorrowersInit = categoriesBorrowers.GetAllCategoriesBorrowers[0]._id
        var statusBorrowersInit = statusBorrowers.GetAllStatusBorrowers[0]._id
    }

    const [bar_code, setBar_code] = useState('')
    const [member_ship_start, setMember_ship_start] = useState(new Date())
    const [member_ship_end, setMember_ship_end] = useState(new Date())

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [profession, setProfession] = useState('')
    const [birth_day, setBirth_day] = useState(new Date())
    const [gender, setGender] = useState('Male')
    const [phone_number, setPhone_number] = useState('')
    const [email, setEmail] = useState('')
    const [sms, setSms] = useState(false)

    const [ru1, setRu1] = useState('')
    const [ru2, setRu2] = useState('')
    const [vill, setVill] = useState('')
    const [contry, setContry] = useState('')

    const [code_postal, setCode_postal] = useState('')
    const [username_opac, setUsername_opac] = useState('')
    const [password_opac, setPassword_opac] = useState('')
    const [lang_opac, setLang_opac] = useState('fr')


    const [message, setMessage] = useState('')
    const [comment, setComment] = useState('')

    // relation table
    let [localisation, setLocalisation] = useState('')
    let [categories, setCategories] = useState('')
    const [group, setGroup] = useState('')
    const [static_code, setStatic_code] = useState('')
    const [statues, setStatues] = useState('')


    const [INSERT] = useMutation(INSERT_BORROWERS, {
        onCompleted(data) {
            console.log("idInsertion : ",data.InsertOneBorrower)
            Router.push("/admin/circulation/Circulation/Borrowers/DetailsBorrower?id="+data.InsertOneBorrower)
        }
    });


    useEffect( () => {
        if ( localisation === undefined || localisation == null || localisation === '' ){
            setLocalisation(loaclInit);
            setStatic_code(staticCodesInit);
            setCategories(categoriesBorrowersInit);
            setStatues(statusBorrowersInit);
        }
    })

    function calculEndMemberShip () {
        let element =  categoriesBorrowers && categoriesBorrowers.GetAllCategoriesBorrowers.
        find(el => el._id === categories)
        console.log("dayes ",element && element.dureeadhesion)
        let dayes = element && element.dureeadhesion
        setMember_ship_end(AddDays(member_ship_start,dayes))

    }


    const onSubmitHandler = () => {
       INSERT({
            variables: {
                barcode: bar_code,
                first_name: first_name,
                last_name: last_name,
                profession: profession,
                birth_day: birth_day,
                gender: gender,
                phone_number: phone_number,
                email: email,
                ru1: ru1,
                ru2: ru2,
                city: vill,
                contry: contry,
                username_opac: username_opac,
                password_opac: password_opac,
                lang_opac: lang_opac,
                message: message,
                comment: comment,
                member_ship_start: member_ship_start,
                localisation: localisation,
                idCategoriesBorrowers: categories,
                idStatusborrowes: statues,
                groupsBorrowers: group,
                static_code: static_code,
            }
        });
    }


    if ( locations !== undefined && groups !== undefined &&
         staticCodes !== undefined && categoriesBorrowers !== undefined &&
         statusBorrowers !== undefined ){

    return (
        <React.Fragment>
            <div className="section">
                <div id="work-collections">
                    <div className="row">
                        <form>
                            <div className="col s12 m12 l6">

                                <ul id="" className="collection z-depth-1 animate fadeLeft">
                                    <li className="collection-item avatar">
                                        <i className="material-icons red accent-2 circle">security</i>
                                        <h6 className="collection-header m-0">Policy</h6>
                                        <p> Secret information </p>
                                    </li>
                                    <li className="input-field col s12 m12 l6">
                                        <Input
                                            icon="credit_card"
                                            label={t("code_bar")}
                                            type="Text"
                                            onChange={e => setBar_code(e.target.value)}
                                            value={bar_code}
                                            required
                                            className="validate"
                                        />
                                    </li>
                                    <li className="input-field col s12 m12 l6">
                                        {/*<ToggleSwitch label="Statues"
                                                      sufix="Account "
                                                      sufixActive="Active"
                                                      sufixDesactive="Désative"
                                                      colorSufix={Active}
                                                      checked={Active}
                                                      onChange={() => {
                                                          console.log(Active);
                                                          setActive(!Active)
                                                      }}
                                        />*/}

                                        <SelectBox

                                            label="Statues"
                                            value={statues}
                                            onChange={e => setStatues(e.target.value)}
                                            defaultValue={statusBorrowers.GetAllStatusBorrowers[0].status_name}
                                        >
                                            {
                                                statusBorrowers.GetAllStatusBorrowers.map(status => (
                                                    <option
                                                        key={status._id}
                                                        value={status._id}
                                                        id={status._id}
                                                    >
                                                        {status.status_name}
                                                    </option>
                                                ))
                                            }
                                        </SelectBox>
                                    </li>
                                    <div className="col s12 ">
                                        <li className="input-field">
                                            <DatePicker label="Debuit d'abonememnt"
                                                        icon="today"
                                                        required
                                                        className="validate"
                                                        value={member_ship_start.toISOString().split("T")[0] || ""}
                                                        onChange={(e) => {
                                                            setMember_ship_start(new Date(e.target.value))
                                                            calculEndMemberShip()
                                                        }}
                                            />
                                        </li>
                                        <li className="input-field ">
                                            <DatePicker label="Fin d'abonememnt"
                                                        icon="today"
                                                        disabled
                                                        value={member_ship_end.toISOString().split("T")[0] || ""}
                                            />
                                        </li>
                                    </div>

                                </ul>

                                <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
                                    <li className="collection-item avatar">
                                        <i className="material-icons cyan accent-5 circle">assignment_ind</i>
                                        <h6 className="collection-header m-0">Principal Name</h6>
                                        <p>Your information </p>
                                    </li>
                                    <li className="input-field col s6 ">
                                        <Input
                                            icon="account_circle"
                                            label="First Name"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setFirst_name(e.target.value)}
                                            value={first_name}
                                        />

                                    </li>
                                    <div className="input-field col s6">
                                        <Input
                                            label="Last Name"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setLast_name(e.target.value)}
                                            value={last_name}
                                        />

                                    </div>
                                    <div className="input-field col s12">
                                        <Input
                                            icon="chat"
                                            label="Profession"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setProfession(e.target.value)}
                                            value={profession}
                                        />

                                    </div>


                                    <div className="input-field col s12 ">
                                        <DatePicker label="Date Brith Day"
                                                    icon="today"
                                                    required
                                                    className="validate"
                                                    value={birth_day.toISOString().split("T")[0] || ""}
                                                    onChange={(e) => {
                                                        e.persist();
                                                        setBirth_day(new Date(e.target.value))
                                                    }}
                                        />

                                    </div>

                                    <div className="col s12 ">
                                        <p>Gender</p>
                                        <p><Radio group="group1"
                                                  defaultChecked
                                                  label="Male" children="gren"
                                                  value="Male"
                                                  checked={gender === 'Male'}
                                                  onChange={e => setGender(e.target.value)}

                                        /></p>
                                        <p><Radio group="group1" label="Female" children="gren"
                                                  value="Female"
                                                  checked={gender === 'Female'}
                                                  onChange={e => setGender(e.target.value)}
                                        /></p>
                                    </div>


                                </ul>

                                <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
                                    <li className="collection-item avatar">
                                        <i className="material-icons deep-purple accent-5 circle">contacts</i>
                                        <h6 className="collection-header m-0">Contact Infomation</h6>
                                        <p>information to contact you</p>
                                    </li>
                                    <li className="input-field col s8 ">
                                        <Input
                                            icon="phone"
                                            label="Phone Number"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setPhone_number(e.target.value)}
                                            value={phone_number}
                                        />
                                    </li>
                                    <li className="input-field col s4">
                                        <Checkbox label="Send SMS"
                                                  onChange={e => setSms(e.target.checked)}
                                                  value={sms}
                                        />
                                    </li>

                                    <div className="input-field col s12">
                                        <Input
                                            icon="email"
                                            label="Email"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                        />

                                    </div>

                                </ul>

                                <ul id="issues-collection" className="collection z-depth-1 animate fadeLeft">
                                    <li className="collection-item avatar">
                                        <i className="material-icons blue accent-2 circle">map</i>
                                        <h6 className="collection-header m-0">Mailing Address</h6>
                                        <p>bind your informatio Address</p>
                                    </li>


                                    <li className=" input-field col l6 m6 s12 ">
                                        <Input
                                            icon="location_on"
                                            label="Address Ligne 1"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setRu1(e.target.value)}
                                            value={ru1}
                                        />
                                    </li>
                                    <li className="input-field col l6 m6 s12  ">
                                        <Input
                                            //todo set icon nnull if is in mode smoll
                                            label="Address Ligne 2"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setRu2(e.target.value)}
                                            value={ru2}
                                        />
                                    </li>

                                    <li className="input-field col l12 m12 s12 ">
                                        <Input
                                            icon="my_location"
                                            label="Vill"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setVill(e.target.value)}
                                            value={vill}
                                        />
                                    </li>
                                    <li className="input-field col s12 m12 l12">
                                        <Input
                                            icon="navigation"
                                            label="Pays"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setContry(e.target.value)}
                                            value={contry}
                                        />
                                    </li>
                                    <li className="input-field col l12 m12 s12">
                                        <Input
                                            icon="location_searching"
                                            label="Code Posta"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setCode_postal(e.target.value)}
                                            value={code_postal}
                                        />
                                    </li>

                                </ul>


                            </div>

                            <div className="col s12 m12 l6">
                                <ul id="issues-collection" className="collection z-depth-1 animate fadeRight ">
                                    <li className="collection-item avatar">
                                        <i className="material-icons  blue-grey darken-4 circle">language</i>
                                        <h6 className="collection-header m-0">OPAC</h6>
                                        <p>Opac Information Connection</p>
                                    </li>
                                    <li className="input-field col l12 m12 s12">
                                        <Input
                                            icon="laptop_mac"
                                            label="Identifent OPAC"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setUsername_opac(e.target.value)}
                                            value={username_opac}
                                        />
                                    </li>
                                    <li className="input-field col l12 m12 s12">
                                        <Input
                                            icon="lock_outline"
                                            label="Mode de pass OPAC"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setPassword_opac(e.target.value)}
                                            value={password_opac}
                                        />
                                    </li>

                                    <div className="input-field col l12 m12 s12">
                                        <SelectBox label={"Langue OPAC"}
                                                   value={lang_opac}
                                                   onChange={e => setLang_opac(e.target.value) }
                                        >
                                            <option value="fr">Français</option>
                                            <option value="en">English</option>
                                        </SelectBox>
                                    </div>
                                </ul>

                                <ul id="projects-collection" className="collection z-depth-1 animate fadeRight">
                                    <li className="collection-item avatar">
                                        <i className="material-icons teal circle">attach_file</i>
                                        <h6 className="collection-header m-0">Send Message</h6>
                                        <p>Send To User</p>
                                    </li>
                                    <li className="input-field col l12 m12 s12 ">
                                        <Input
                                            icon="message_speed"
                                            label="message"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setMessage(e.target.value)}
                                            value={message}
                                        />
                                    </li>

                                    <div className="input-field col l12 m12 s12 ">
                                        <Input
                                            icon="insert_comment"
                                            label="Commentaire"
                                            type="Text"
                                            required
                                            className="validate"
                                            onChange={e => setComment(e.target.value)}
                                            value={comment}
                                        />
                                    </div>

                                </ul>

                                <ul id="issues-collection" className="collection z-depth-1 animate fadeRight">
                                    <li className="collection-item avatar">
                                        <i className="material-icons orange darken-4 circle">add</i>
                                        <h6 className="collection-header m-0">Add</h6>
                                        <p>Add USER TO </p>
                                    </li>
                                </ul>

                                <div className="col l12 m12 s12">
                                    <Grid>
                                        <GridElement s={12}>
                                            <SelectBox
                                                label="Localisation"
                                                value={localisation}
                                                defaultValue={locations.libraries[0].Name}
                                                onChange={e => setLocalisation(e.target.value)}
                                            >
                                                {
                                                    locations.libraries.map(librarie => (
                                                        <option key={splitfunction(librarie._id)}
                                                                value={splitfunction(librarie._id)}
                                                                id={splitfunction(librarie._id)}
                                                        >
                                                            {librarie.Name}
                                                        </option>
                                                    ))
                                                }
                                            </SelectBox>
                                        </GridElement>
                                    </Grid>
                                </div>
                                <div className="col l12 m12 s12">
                                    <Grid>
                                        <GridElement s={12}>
                                            <SelectBox
                                                label="code Static"
                                                value={static_code}
                                                defaultValue={staticCodes.GetAllCodeStatics[0].name}
                                                onChange={e => setStatic_code(e.target.value)}
                                            >


                                                {
                                                     staticCodes.GetAllCodeStatics.map((item) => (
                                                        <option key={item._id}
                                                                value={item._id}
                                                                id={item._id}
                                                        >
                                                            {item.static_name}
                                                        </option>
                                                    ))
                                                }
                                            </SelectBox>
                                        </GridElement>
                                    </Grid>
                                </div>
                                <div className="col l12 m12 s12">

                                    <Grid>

                                        <GridElement s={12}>

                                            <SelectBox label={"Add User To Group"}
                                                       value={group}
                                                       onChange={e => setGroup(e.target.value)}
                                            >

                                                <option>shose a group</option>
                                                {
                                                    groups && groups.GetAllGrroups.map(item => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </SelectBox>
                                        </GridElement>
                                    </Grid>


                                </div>
                                <div className="col l12 m12 s12">
                                    <Grid>
                                        <GridElement s={12}>
                                            <SelectBox label={"Categories Borrowers"}
                                                       defaultValue={categoriesBorrowers.GetAllCategoriesBorrowers[0].name}
                                                       onChange={e => {
                                                           setCategories(e.target.value)
                                                           calculEndMemberShip() }}
                                            >
                                                {
                                                    categoriesBorrowers && categoriesBorrowers.GetAllCategoriesBorrowers.map(
                                                        item => (
                                                            <option key={item._id} value={item._id}>
                                                                {item.name}
                                                            </option>
                                                        )
                                                    )
                                                }
                                            </SelectBox>
                                        </GridElement>
                                    </Grid>
                                </div>


                            </div>

                            <div className="col l12 m12 s12">
                                <div className="float-right"/>
                                <Button onClick={onSubmitHandler} children="Send" className="float-right"/>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )}

    return <Loading/>

}
Formulaire.Layout = AdminLayout
export default Formulaire
