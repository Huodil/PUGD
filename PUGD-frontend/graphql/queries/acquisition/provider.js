import gql from "graphql-tag";

const GetAllProviders = gql`
  query {
    getallproviders {
      _id
      name
      adress
      phone
      email
    }
  }
`;

const GetOneProvider = gql`
  query($id: String!) {
    getoneprovider(id: $id) {
      _id
      account
      adress
      email
      establishement
      name
      phone
      website
    }
  }
`;

module.exports = {
  GetAllProviders,
  GetOneProvider,
};
