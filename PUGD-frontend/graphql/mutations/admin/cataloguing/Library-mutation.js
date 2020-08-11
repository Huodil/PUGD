import gql from "graphql-tag";


const ADD_LIBRARY = gql`
mutation(
        $Name :         String,
        $Address :         String,
    ){
      insertOneLibrary(
            Name :         $Name,
            Address :      $Address,             
        )
    }
`;

const UPDATE_LIBRARY = gql`
mutation(
    $Id :           String!,
    $Name :         String,
    $Address :      String,
  ){
    updateOneLibrary(
      _id   :         $Id,
    Name :         $Name,
    Address :      $Address,
  )
}
`;

const DELETE_LIBRARY = gql`
mutation($Id:String!){
  deleteOneLibrary(_id:$Id)
}
`;


module.exports = {
    ADD_LIBRARY : ADD_LIBRARY,
    UPDATE_LIBRARY : UPDATE_LIBRARY,
    DELETE_LIBRARY : DELETE_LIBRARY,
}