import React from 'react'
import AdminLayout from "components/adminLayout";
import Circulation from "components/admin/Circulations/Body/Body";
import CirculationHeader from "components/admin/Circulations/Hedar/CirculationHeader";
import Formulaire from "../../../../../components/admin/Circulations/Borrwer/Add/Formulaire";
import {useTranslation} from "react-i18next";


const AddBorrowers = () => {
    const { t, i18n } = useTranslation();
    return <Circulation>
        <CirculationHeader Title={t("AddBorrower")}/>
        <Formulaire/>
    </Circulation>

}

AddBorrowers.Layout = AdminLayout
export default AddBorrowers