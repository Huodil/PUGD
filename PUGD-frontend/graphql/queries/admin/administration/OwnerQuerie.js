import gql from 'graphql-tag';


const GET_ALL_OWNERS = gql`
 
query{
    GetAllOwners{
        _id
        owner_name
  }
}
`;
const GET_ONE_OWNER = gql`
query($id:String!){
    GetOneOwner(_id:$id){
        _id
        owner_name
  }
}
`;

module.exports = {
    GET_ALL_OWNERS,
    GET_ONE_OWNER

}
