import gql from 'graphql-tag';

const INSERT_BRANCH = gql`
mutation(
  $BranchName :    String,
  $BranchZip :     Int,
  $BranchCity :    String,
  $BranchState :   String,
  $BranchCountry : String,
  $BranchFax :     String,
  $BranchPhone :   String,
  $BranchUrl :     String,
  $BranchIp :      String,
  $GeoLocation :   String,
  $Library : String, 
){
  insertOneBranch(
    BranchName :    $BranchName,
    BranchZip :     $BranchZip,
    BranchCity :    $BranchCity,
    BranchState :   $BranchState,
    BranchCountry : $BranchCountry,
    BranchFax :     $BranchFax,
    BranchPhone :   $BranchPhone,
    BranchUrl :     $BranchUrl,
    BranchIp :      $BranchIp,
    GeoLocation :   $GeoLocation,
    Library :       $Library
  )
}
`;

const UPDATE_BRANCH = gql`
mutation(
  $Id :            String!,
  $BranchName :    String,
  $BranchZip :     Int,
  $BranchCity :    String,
  $BranchState :   String,
  $BranchCountry : String,
  $BranchFax :     String,
  $BranchPhone :   String,
  $BranchUrl :     String,
  $BranchIp :      String,
  $GeoLocation :   String,
  $Library : String, 
  ){
    updateOneBranch(
    _id : $Id,
    BranchName :    $BranchName,
    BranchZip :     $BranchZip,
    BranchCity :    $BranchCity,
    BranchState :   $BranchState,
    BranchCountry : $BranchCountry,
    BranchFax :     $BranchFax,
    BranchPhone :   $BranchPhone,
    BranchUrl :     $BranchUrl,
    BranchIp :      $BranchIp,
    GeoLocation :   $GeoLocation,
    Library : $Library
  )
}
`;

const DELETE_BRANCH = gql`
mutation($Id:String!){
  deleteOneBranch(_id:$Id)
}
`;


module.exports = {
  INSERT_BRANCH : INSERT_BRANCH,
  UPDATE_BRANCH : UPDATE_BRANCH,
  DELETE_BRANCH : DELETE_BRANCH,
}