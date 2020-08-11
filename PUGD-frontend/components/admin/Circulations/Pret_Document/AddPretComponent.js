import React, {useState} from "react";
import Button from '@/components/ui/Button';
import {INSERT_ONE_PRET} from "@/graphql/mutations/admin/circulation/Pret.mutation";
import {useMutation} from "@apollo/react-hooks";
import TextBox from "@/components/ui/TextBox";
import Link from "next/link";
import ToggleSwitch from "@/components/ui/ToggleSwitch/ToggleSwitch";

const AddPretComponent = ({fullName,refetch, iduser,...props}) => {
    console.log("full name ",fullName)
    console.log("iduser ",iduser)
    let [AddPret, {loading, error, data}] = useMutation(INSERT_ONE_PRET, {
        onCompleted: () => {
            refetch()
        }
    });
    console.log({refetch})
    let [code, setCode] = useState('');
    const [isExpress, setIsExpress] = useState(false);

    let handlerAddPret = () => {

        console.log("code : ", code)
        console.log("user : ", iduser)
        console.log("isExpress : ", isExpress)


        AddPret({
            variables: {
                copy_code: code,
                idBorrower: iduser,
                isExpress: isExpress,
            }
        })


    }
    return <React.Fragment>

        <div style={{display:"flex" }}>

            <TextBox style ={{margin:"auto",width:"300px"}}
                type="text"
                label="Ajouter un pret"
                value={code}
                onChange={event => {
                    setCode(event.target.value)

                }}
            />
            <ToggleSwitch style ={{margin:"auto"}}
                          label="Pret Express"
                          sufix=""
                          sufixActive="Activé"
                          sufixDesactive="Désactiver"
                          colorSufix={isExpress}
                          checked={isExpress}
                          onChange={() => {
                              console.log(!isExpress);
                              setIsExpress(!isExpress)
                          }}
            />

        <Button
            style = {{margin:"auto"}}
            icon = "send"
            className="btn waves-effect waves-light blue darken-2 center" rounded={5}
            onClick={() => handlerAddPret(false)} >
            Pret
        </Button>

        <Link href={{
            pathname: '/admin/circulation/Circulation/pret_document/AddReservation',
            query: { id:iduser , fullname : fullName}
        }}>
            <Button style = {{margin:"auto"}}
                className="btn waves-effect waves-light blue darken-2 center" rounded={5}
                    icon="add"
            >

                Reservation

            </Button>
        </Link>
        </div>

    </React.Fragment>
}


export default AddPretComponent