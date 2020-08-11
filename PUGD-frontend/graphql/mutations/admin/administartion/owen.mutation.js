import gql from "graphql-tag";

const INSERT_OWNER = gql`
mutation(
  $name: String!,
){
  InsertOneOwner(
    owner_name : $name
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
const DELETE_OWNER = gql`
mutation($id:String!){
  DeleteOneOwner(_id:$id)
}
`;


module.exports = {
    INSERT_OWNER,
    UPDATE_OWNER,
    DELETE_OWNER,
}