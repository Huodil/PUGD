import gql from "graphql-tag";

const ISERT_CODE_STATUS = gql`
 mutation($name:String){
  InsertOneCodeStatic(
    static_name:$name
  )
}

`;

const DELATE_CODE_STATUS = gql`
 mutation($id:String!){
  DeleteOneCodeStatic(
    _id:$id
  ) 
}

`;

module.exports = {
    ISERT_CODE_STATUS,
    DELATE_CODE_STATUS

}