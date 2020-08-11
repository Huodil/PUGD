import gql from 'graphql-tag';

const GetAllBro = gql`
    query{
        GetAllBro{
            _id,
            fullname,
        }
    }
`;
module.exports = {
    GetAllBro,
}
