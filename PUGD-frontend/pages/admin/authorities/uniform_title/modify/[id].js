import React from 'react';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader';

import ModifyUniformTitleForm from '@/components/admin/authorities/uniform_title/ModifyUniformTitleForm';

import Card from '@/components/ui/Card/Card'; 

// import {parse} from 'graphql';

const ModifyAuthorPage = () => {

    return (
        <div className="animate fadeLeft">
            <AuthorityHeader Authority="UniformTitle" />
            <Card >
                <h5 >Modification d'un UniformTitle</h5>
                <ModifyUniformTitleForm />
                <br /><br />
            </Card>
        </div> || <div>Please provide a valid Id</div>

    );
};
import AdminLayout from '@/components/adminLayout';
ModifyAuthorPage.Layout = AdminLayout
export default ModifyAuthorPage; 

 


//     const GET_AUTHOR = parse(`
//     query(
//       $Id : String,
//       $Author_Type : Int,
//       $Name_Auth : String,
//       $IndexName_Auth : String,
//       $Year_Auth : String,
//       $City_Auth : String,
//       $Note_Auth : String,
//       $Country_Auth : String,
//       $WebSite_Auth : String,
//       $ISNI_Auth : String,
//       $Subdivision_Auth : String,
//       $UrlThumbnail_Auth : String,   
//     ){
//       author(
//         id:$Id,
//         author_type:$Author_Type,
//         name_auth:$Name_Auth,
//         indexname_auth:$IndexName_Auth,
//         year_auth:$Year_Auth,
//         city_auth:$City_Auth,
//         note_auth:$Note_Auth,
//         country_auth:$Country_Auth,
//         website_auth:$WebSite_Auth,
//         isni_auth:$ISNI_Auth,
//         subdivision_auth:$Subdivision_Auth,
//         urlthumbnail_auth:$UrlThumbnail_Auth,
//       ){
//         _id
//         author_type
//         city_auth
//         country_auth
//         indexname_auth
//         isni_auth
//         name_auth
//         note_auth
//         subdivision_auth
//         url_thumbnail_auth
//         website_auth
//         year_auth
//       }
//     }
//   `)