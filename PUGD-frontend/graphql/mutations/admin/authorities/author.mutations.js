import gql from 'graphql-tag';

const INSERT_AUTHOR = gql`
mutation(
  $Author_Type : Int,
  $Name_Auth : String,
  $IndexName_Auth : String,
  $Year_Birth : Int,
  $Year_Death : Int,
  $City_Auth : String,
  $Note_Auth : String,
  $Country_Auth : String,
  $WebSite_Auth : String,
  $ISNI_Auth : String,
  $Subdivision_Auth : String,
  $UrlThumbnail_Auth : String,  
  $Linked_authorities : [AuthorityLinkInputType], 
){
  InsertAuthor(
    Author_Type:$Author_Type,
    Name_Auth:$Name_Auth,
    IndexName_Auth:$IndexName_Auth,
    Year_Birth:$Year_Birth,
    Year_Death:$Year_Death,
    City_Auth:$City_Auth,
    Note_Auth:$Note_Auth,
    Country_Auth:$Country_Auth,
    WebSite_Auth:$WebSite_Auth,
    ISNI_Auth:$ISNI_Auth,
    Subdivision_Auth:$Subdivision_Auth,
    UrlThumbnail_Auth:$UrlThumbnail_Auth
    Linked_authorities:$Linked_authorities
  )
}

`;

const UPDATE_AUTHOR = gql`
mutation(
  $Id: String!,
  $Year_Birth: Int,
  $Year_Death: Int,
  $City_Auth: String,
  $Country_Auth: String,
  $UrlThumbnail_Auth: String,
  $WebSite_Auth: String,
  $ISNI_Auth: String,
  $Subdivision_Auth: String,
  $Author_Type: Int,
  $Name_Auth: String,
  $IndexName_Auth: String,

  ){
  UpdateAuthor(
    Id : $Id,
    City_Auth : $City_Auth,
    Country_Auth : $Country_Auth,
    UrlThumbnail_Auth : $UrlThumbnail_Auth,
    WebSite_Auth : $WebSite_Auth,
    ISNI_Auth : $ISNI_Auth,
    Subdivision_Auth : $Subdivision_Auth,
    Author_Type : $Author_Type,
    Name_Auth : $Name_Auth,
    IndexName_Auth : $IndexName_Auth,
    Year_Birth:$Year_Birth,
    Year_Death:$Year_Death,
  )
}
`;
const DELETE_AUTHOR = gql`
mutation($Id:String!){
  DeleteAuthor(_id:$Id)
}
`;


module.exports = {
  INSERT_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
}
