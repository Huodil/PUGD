import gql from 'graphql-tag';



const GET_ALL_STATUS = gql`
 
query{
  GetAllStatus {
    _id
    status_name
    can_borrowed
    label_opac, 
  }
}
`;

module.exports = {
     GET_ALL_STATUS,
  
  }
