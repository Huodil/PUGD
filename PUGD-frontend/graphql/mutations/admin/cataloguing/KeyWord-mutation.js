import gql from "graphql-tag";

const ADD_KEYWORD = gql`
mutation(
        $Word :         String,
        $Lang :         String,
    ){
      insertOneKeyword(
            Word :         $Word ,
            Lang :         $Lang,
                       
        )
    }
`;

const UPDATE_KEYWORD = gql`
mutation(
    $Id :           String!,
    $Word :         String,
    $Lang :         String,
  ){
    updateOneKeyword(
    _id :           $Id,
    Word :         $Word ,
    Lang :         $Lang,
  )
}
`;

const DELETE_KEYWORD = gql`
mutation($Id:String!){
  deleteOneKeyword(_id:$Id)
}
`;


module.exports = {
    ADD_KEYWORD : ADD_KEYWORD,
    UPDATE_KEYWORD : UPDATE_KEYWORD,
    DELETE_KEYWORD : DELETE_KEYWORD,
}