import gql from 'graphql-tag';

const ALL_BORROWERS = gql`
    query{
     GetAllBro{
            _id,
            fullname,
            gender,
            email,
            address,
            birthday
            
          
        }
    }
`;
const BorrowersByName = gql`
    query($fullname: String!){
       GetBorrowersByName(fullname : $fullname){
      
         _id,
            fullname,
            email,
            gender
      
        }
    }
`;
module.exports = {
    ALL_BORROWERS,
    BorrowersByName
}
