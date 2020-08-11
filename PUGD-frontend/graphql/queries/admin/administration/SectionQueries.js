import gql from 'graphql-tag';



const GET_ALL_SECTIONS = gql`
 
query{
    GetAllSections{
        _id
        section_name
  }
}
`;

module.exports = {
    GET_ALL_SECTIONS: GET_ALL_SECTIONS,
  
  }
