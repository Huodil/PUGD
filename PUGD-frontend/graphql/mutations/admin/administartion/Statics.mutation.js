import gql from "graphql-tag";

const ISERT_STATUS = gql` 
 mutation(
  $status_name:String!,
    $visible_in_opac:Boolean
    $can_borrowed:Boolean,
    $can_reserved:Boolean,
    $label_opac:String
    $OwenId:String
)
{
  InsertOneStatus(
    status_name:$status_name,
    visible_in_opac:$visible_in_opac,
    can_borrowed:$can_borrowed,
    can_reserved:$can_reserved,
    label_opac:$label_opac
    OwenId:$OwenId,
    
    
  )
}

`;

const DELATE_STATUS = gql`
 mutation($id:String!){
    DeleteOneStatus(_id:$id)
 }
`;


module.exports = {
    ISERT_STATUS,
    DELATE_STATUS

}