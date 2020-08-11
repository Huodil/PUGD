import React, {useState} from 'react'
import AdminLayout from 'components/adminLayout'
import Grid from 'components/ui/Grid/grid';
import GridElement from 'components/ui/Grid/GridElement';
import TextBox from "components/ui/TextBox";
import Button from "components/ui/Button";

import {useLazyQuery} from "@apollo/react-hooks";
import {GroupsByName} from "graphql/queries/admin/Ciruclation/groups.query";
import Null from "components/admin/Circulations/Handerls/Null";
import Circulation from "components/admin/Circulations/Body/Body";
import CirculationHeader from "components/admin/Circulations/Hedar/CirculationHeader";
import Members from "../../../../../components/admin/Circulations/Group/Members";
import Responsable from "../../../../../components/admin/Circulations/Group/Responsable";
import Loading from "../../../../../components/admin/Circulations/Shared/Loading";
import {GET_ALL_GROUPS} from "../../../../../graphql/queries/admin/Ciruclation/groups.query";
import NoDataFetched from "../../../../../components/admin/Circulations/Shared/NoData";
import Card from "../../../../../components/ui/card/card";
import ListGroupsComponent from "../../../../../components/admin/Circulations/Group/ListGroupes";

const Groups = () => {
    const [GetGroupsByName, {loading: OneLoading, error: oneError, data: OneGroupe}] = useLazyQuery(GroupsByName);
    const [AllGroupes, {loading: Lodinges, error: errAll, data: AllGroupe}] = useLazyQuery(GET_ALL_GROUPS);
    const [name, setName] = useState('');


    const onSearchHandler = (e) => {
        let filterby
        if (name === "") {
            AllGroupes({})
        } else {
            filterby = name
        }
        e.preventDefault();
        GetGroupsByName({
            variables: {
                name: filterby,
            }
        });
    }

    if (Lodinges || OneLoading) {
        return <Loading/>;
    }
    if (OneGroupe != null || AllGroupe != null) {
        console.log("one :", OneGroupe && OneGroupe.GetGroupsByName)
        console.log("all :", AllGroupe && AllGroupe.GetAllGrroups)
    }

    return <Circulation>
        <CirculationHeader Title=" => Group"

                           children={
                               <form>
                                   <div>
                                       <Grid>
                                           <p>Recherche groupe</p>
                                           <GridElement s={12} style={{display: "flex"}}>
                                               <TextBox
                                                   label="Nom du Group"
                                                   type="text"
                                                   onChange={event => {
                                                       setName(event.target.value)
                                                   }}
                                                   value={name}
                                               />
                                               <Button
                                                   onClick={onSearchHandler}
                                                   rounded={4}>Search
                                               </Button>
                                               <Button href="/admin/circulation/Circulation/groups/addGroups"
                                                       rounded={4}>add group</Button>
                                           </GridElement>
                                       </Grid>
                                   </div>
                               </form>
                           }
        />


        {
            AllGroupe && AllGroupe.GetAllGrroups !== undefined && AllGroupe.GetAllGrroups.length > 0 ?
                errAll ? <NoDataFetched/> :
                    <ListGroupsComponent Groupes={AllGroupe && AllGroupe.GetAllGrroups}/>
                : ""
        }
        {

            oneError ? <Null children="No group Finder"/> : (OneGroupe == null || undefined) ?


                //    <ResGroup/> :

                ('')


                : (<React.Fragment>
                        <div className="row vertical-modern-dashboard">
                            <Members members={OneGroupe && OneGroupe.GetGroupsByName}/>
                            <Responsable responsable={OneGroupe && OneGroupe.GetGroupsByName}/>
                        </div>
                    </React.Fragment>
                )

        }

    </Circulation>
}
Groups.Layout = AdminLayout
export default Groups
