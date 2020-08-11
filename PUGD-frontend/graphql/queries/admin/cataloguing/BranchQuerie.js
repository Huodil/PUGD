import gql from 'graphql-tag';

const GET_BRANCH = gql`
query($Id : String!){
  branch(id:$Id){
    _id
    BranchName
    BranchZip
    BranchCity
    BranchState
    BranchCountry
    BranchFax
    BranchPhone
    BranchUrl
    BranchIp
    GeoLocation
    Library{
      _id
      Name
      Address
    }
  }
}
`;
const GET_BRANCH_ALL_FIELDS = gql`
 
query($BranchName: String){
  branches(BranchName:$BranchName){
    _id
    BranchName
    BranchZip
    BranchCity
    BranchState
    BranchCountry
    BranchFax
    BranchPhone
    BranchUrl
    BranchIp
    GeoLocation
    Library{
      _id
      Name
      Address
    }
  }
}
`;


module.exports = {
  GET_BRANCH: GET_BRANCH,
  GET_BRANCH_ALL_FIELDS: GET_BRANCH_ALL_FIELDS, 

}