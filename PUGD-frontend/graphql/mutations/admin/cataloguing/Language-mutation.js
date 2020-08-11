import gql from "graphql-tag";

const ADD_LANGUAGE = gql`
mutation(
        $Value :         String,
    ){
      insertOneLanguage(
            Value :         $Value ,             
        )
    }
`;

const UPDATE_LANGUAGE = gql`
mutation(
    $Id :           String!,
    $Value :         String,
  ){
    updateOneLanguage(
    _id :           $Id,
    Value :         $Value,
  )
}
`;

const DELETE_LANGUAGE = gql`
mutation($Id:String!){
  deleteOneLanguage(_id:$Id)
}
`;

module.exports = {
    ADD_LANGUAGE : ADD_LANGUAGE,
    UPDATE_LANGUAGE : UPDATE_LANGUAGE,
    DELETE_LANGUAGE : DELETE_LANGUAGE,
}