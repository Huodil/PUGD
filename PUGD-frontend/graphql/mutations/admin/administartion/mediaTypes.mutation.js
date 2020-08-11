import gql from "graphql-tag";

const INSERT_MEDIATYPES = gql`
mutation(
  $name                : String,
  $owner               : String,
  $international_code  : String,
  $d_pret              : Int
  $d_reservation       : Int
  
){
  InsertOneMediaType(
    media_types_name  : $name,
    OwenId            : $owner
    international_code: $international_code,
    dure_pret         : $d_pret,
    dure_reservation  : $d_reservation
  )
}
`;

const UPDATE_OWNER = gql`
mutation(
  $id: String!,
  $name: String,
  ){
  UpdateOneOwner(
    _id : $id,
    owner_name : $name
  )
}
`;
const DELETE_MEDIATYPES= gql`
mutation(
  $id                : String!,
){
  DeleteOneMediaType(
    _id:$id
  )
}
`;


module.exports = {
    INSERT_MEDIATYPES,
    UPDATE_OWNER,
    DELETE_MEDIATYPES,
}